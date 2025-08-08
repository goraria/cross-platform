import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "@config/prisma";
import { v4 as uuidv4 } from 'uuid';
import { UnauthorizedError } from '@/lib/errors';
import crypto from 'crypto';
import { RegisterInput } from '@schemas/authSchemas';

export const createUser = async (data: RegisterInput) => {
	const {
		first_name,
		last_name,
		username,
		email,
		password,
		phone_number,
		phone_code,
	} = data;
	// Check if user exists
	const existUser = await prisma.users.findFirst({
		where: {
			OR: [
				{ email },
				{ username }
			]
		}
	})

	if (existUser) {
		throw new Error('User already exists'); // unified to prevent enumeration
	}

	// Generate stronger salt
	const salt = await bcrypt.genSalt(12);
	const passwordHash = await bcrypt.hash(password, salt);

	const newUser = await prisma.users.create({
		data: {
			id: uuidv4(),
			first_name,
			last_name,
			full_name: `${first_name} ${last_name}`,
			username,
			email,
			phone_number,
			phone_code,
			role: "user",
			status: "active", // Đổi thành active thay vì inactive
			password_hash: passwordHash,
			// viewed_profile: 0,
			// impressions: 0,
			created_at: new Date(),
			updated_at: new Date(),
		}
	});

	// const savedUser = await newUser.save();
	return newUser;
};

// Hash utility for refresh token storage (Clerk/Facebook style – do not store plaintext)
const hashToken = (token: string) =>
	crypto.createHash('sha256').update(token).digest('hex');

export const generateTokens = (
	userId: string,
	sessionId: string,
	rememberMe: boolean = false
) => {
	const accessToken = jwt.sign(
		{ userId, sessionId },
		process.env.EXPRESS_JWT_SECRET!,
		{ expiresIn: '15m' }
	);

	const refreshExp = rememberMe ? '30d' : '7d';
	const refreshToken = jwt.sign(
		{ userId, sessionId },
		process.env.EXPRESS_JWT_REFRESH_SECRET!,
		{ expiresIn: refreshExp }
	);

	return { accessToken, refreshToken };
};

interface SessionContextMeta {
	ip?: string;
	userAgent?: string;
}

export const generateSign = async (
	identifier: string,
	password: string,
	rememberMe: boolean = false,
	meta: SessionContextMeta = {}
) => {
	// Normalize identifier
	let ident = (identifier || '').trim();
	const isEmailLike = ident.includes('@');
	if (isEmailLike) ident = ident.toLowerCase();

	// 1. Find user by email OR username
	const user = await prisma.users.findFirst({
		where: {
			OR: isEmailLike ? [ { email: ident } ] : [ { username: ident }, { email: ident.toLowerCase() } ]
		},
		select: {
			id: true,
			email: true,
			username: true,
			password_hash: true,
			status: true
		}
	});

	if (!user) {
		throw new UnauthorizedError('Invalid credentials');
	}

	// 2. Check if user is active
	if (user.status !== 'active') {
		throw new UnauthorizedError('Account is not active');
	}

	// 3. Verify password
	const isValidPassword = await bcrypt.compare(password, user.password_hash);
	if (!isValidPassword) {
		throw new UnauthorizedError('Invalid credentials');
	}

	// 4. Create session with metadata + refresh hash
	const sessionId = uuidv4();
	const { accessToken, refreshToken } = generateTokens(user.id, sessionId, rememberMe);

	await prisma.sessions.create({
		data: {
			id: sessionId,
			user_id: user.id,
			token: accessToken,
			expires_at: new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000),
			is_valid: true,
			refresh_token_hash: hashToken(refreshToken),
			ip_address: meta.ip,
			user_agent: meta.userAgent,
			last_accessed_at: new Date()
		}
	});

	return {
		user: {
			id: user.id,
			email: user.email,
			username: user.username
		},
		accessToken,
		refreshToken,
		sessionId
	};
}

export const refreshSign = async (refreshToken: string, meta: SessionContextMeta = {}) => {
	try {
		// 1. Verify refresh token
		const decoded = jwt.verify(refreshToken, process.env.EXPRESS_JWT_REFRESH_SECRET!) as {
			userId: string;
			sessionId: string;
		};

		// 2. Fetch session and verify validity + refresh hash
		const session = await prisma.sessions.findUnique({
			where: { id: decoded.sessionId },
			include: {
				users: {
					select: { id: true, email: true, username: true, status: true }
				}
			}
		});

		if (!session || !session.is_valid || !session.refresh_token_hash || session.expires_at < new Date()) {
			throw new UnauthorizedError('Invalid session');
		}

		// 3. Compare provided refresh token hash (reuse detection)
		const providedHash = hashToken(refreshToken);
		if (providedHash !== session.refresh_token_hash) {
			// Possible token reuse → revoke all sessions for user
			await prisma.sessions.updateMany({
				where: { user_id: session.user_id, is_valid: true },
				data: { is_valid: false, revoked_at: new Date() }
			});
			throw new UnauthorizedError('Token reuse detected');
		}

		if (session.users.status !== 'active') {
			throw new UnauthorizedError('Account is not active');
		}

		// 4. Rotate: create new session (new sessionId) and invalidate old
		const newSessionId = uuidv4();
		const { accessToken, refreshToken: newRefreshToken } = generateTokens(session.users.id, newSessionId);

		await prisma.$transaction([
			prisma.sessions.update({
				where: { id: session.id },
				data: {
					is_valid: false,
					revoked_at: new Date(),
					replaced_by_session_id: newSessionId
				}
			}),
			prisma.sessions.create({
				data: {
					id: newSessionId,
					user_id: session.users.id,
					token: accessToken,
					expires_at: session.expires_at, // keep original horizon or extend? (keeping)
					is_valid: true,
					refresh_token_hash: hashToken(newRefreshToken),
					ip_address: meta.ip,
					user_agent: meta.userAgent,
					last_accessed_at: new Date()
				}
			})
		]);

		return {
			user: {
				id: session.users.id,
				email: session.users.email,
				username: session.users.username
			},
			accessToken,
			refreshToken: newRefreshToken,
			sessionId: newSessionId
		};
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			throw new UnauthorizedError('Invalid refresh token');
		}
		throw error;
	}
}

export const logoutSign = async (sessionId: string) => {
	await prisma.sessions.update({
		where: { id: sessionId },
		data: { is_valid: false, revoked_at: new Date() }
	});
}

// Utility function để cleanup expired sessions
export const cleanupExpiredSessions = async () => {
	const result = await prisma.sessions.deleteMany({
		where: {
			OR: [
				{ expires_at: { lt: new Date() } },
				{ is_valid: false }
			]
		}
	});
	return result.count;
}

// Utility function để revoke tất cả sessions của user
export const revokeAllUserSessions = async (userId: string) => {
	await prisma.sessions.updateMany({
		where: { user_id: userId },
		data: { is_valid: false }
	});
}

// Utility function để get active sessions của user
export const getUserActiveSessions = async (userId: string) => {
	return await prisma.sessions.findMany({
		where: {
			user_id: userId,
			is_valid: true,
			expires_at: { gt: new Date() }
		},
		select: {
			id: true,
			created_at: true,
			updated_at: true,
			expires_at: true
		},
		orderBy: { created_at: 'desc' }
	});
}

// Utility function để validate session
export const validateSession = async (sessionId: string) => {
	const session = await prisma.sessions.findUnique({
		where: { id: sessionId },
		include: {
			users: { select: { id: true, email: true, username: true, status: true, role: true } }
		}
	});

	if (!session || !session.is_valid || session.expires_at < new Date()) {
		throw new UnauthorizedError('Invalid session');
	}
	if (session.users.status !== 'active') {
		throw new UnauthorizedError('Account is not active');
	}
	// touch last_accessed_at (fire and forget)
	prisma.sessions.update({
		where: { id: session.id },
		data: { last_accessed_at: new Date() }
	}).catch(() => {});
	return session;
};