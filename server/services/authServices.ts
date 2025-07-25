import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "@config/prisma";
import { v4 as uuidv4 } from 'uuid';
import { UnauthorizedError } from '@/lib/errors';
import { RegisterInput } from '@/constants/schemas';

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
		if (existUser.username === username) {
			throw new Error('Username already exists')
		} else if (existUser.email === email) {
			throw new Error('Email already exists')
		} else {
			throw new Error('User already exists')
		}
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

export const generateTokens = (
	userId: string, 
	sessionId: string
) => {
	const accessToken = jwt.sign(
		{ userId, sessionId },
		process.env.EXPRESS_JWT_SECRET!,
		{ expiresIn: '15m' }
	);

	const refreshToken = jwt.sign(
		{ userId, sessionId },
		process.env.EXPRESS_JWT_REFRESH_SECRET!,
		{ expiresIn: '7d' }
	);

	return { accessToken, refreshToken };
} 

export const generateSign = async (
	email: string, 
	password: string
) => {
	// 1. Find user
	const user = await prisma.users.findUnique({
		where: { email },
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

	// 4. Create session with metadata
	const sessionId = uuidv4();
	const { accessToken, refreshToken } = generateTokens(user.id, sessionId);
	
	const session = await prisma.sessions.create({
		data: {
			id: sessionId,
			user_id: user.id,
			token: accessToken,
			expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
			is_valid: true
		}
	});

	return {
		user: {
			id: user.id,
			email: user.email,
			username: user.username
		},
		accessToken,
		refreshToken
	};
}

export const refreshSign = async (refreshToken: string) => {
	try {
		// 1. Verify refresh token
		const decoded = jwt.verify(refreshToken, process.env.EXPRESS_JWT_REFRESH_SECRET!) as {
			userId: string;
			sessionId: string;
		};

		// 2. Check if session exists and is valid
		const session = await prisma.sessions.findUnique({
			where: {
				id: decoded.sessionId,
				is_valid: true,
				expires_at: {
					gt: new Date()
				}
			},
			include: {
				users: {
					select: {
						id: true,
						email: true,
						username: true,
						status: true
					}
				}
			}
		});

		if (!session) {
			throw new UnauthorizedError('Invalid session');
		}

		// 3. Check if user is still active
		if (session.users.status !== 'active') {
			throw new UnauthorizedError('Account is not active');
		}

		// 4. Generate new tokens
		const tokens = generateTokens(session.users.id, session.id);

		// 5. Update session with new token
		await prisma.sessions.update({
			where: { id: session.id },
			data: { 
				token: tokens.accessToken,
				updated_at: new Date()
			}
		});

		return {
			user: {
				id: session.users.id,
				email: session.users.email,
				username: session.users.username
			},
			...tokens
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
		data: { is_valid: false }
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
		where: {
			id: sessionId,
			is_valid: true,
			expires_at: { gt: new Date() }
		},
		include: {
			users: {
				select: {
					id: true,
					email: true,
					username: true,
					status: true
				}
			}
		}
	});

	if (!session) {
		throw new UnauthorizedError('Invalid session');
	}

	if (session.users.status !== 'active') {
		throw new UnauthorizedError('Account is not active');
	}

	return session;
}