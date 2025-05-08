import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "@config/prisma";
import { v4 as uuidv4 } from 'uuid';
import { UnauthorizedError } from '@/lib/errors';

export const createUser = async (userData: any) => {
	const user = await prisma.users.create({
		data: userData
	});
	return user;
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
			password_hash: true
		}
	});

	if (!user) {
		throw new UnauthorizedError('Invalid credentials');
	}

	// 2. Verify password
	const isValidPassword = await bcrypt.compare(password, user.password_hash);
	if (!isValidPassword) {
		throw new UnauthorizedError('Invalid credentials');
	}

	// 3. Generate tokens first
  const { accessToken, refreshToken } = generateTokens(user.id, uuidv4());

  // 4. Create new session with the generated token
  const session = await prisma.sessions.create({
    data: {
      id: uuidv4(),
      user_id: user.id,
      token: accessToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
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
		const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
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
				user: {
					select: {
						id: true,
						email: true,
						username: true
					}
				}
			}
		});

		if (!session) {
			throw new UnauthorizedError('Invalid session');
		}

		// 3. Generate new tokens
		const tokens = generateTokens(session.user.id, session.id);

		return {
			user: session.user,
			...tokens
		};
	} catch (error) {
		throw new UnauthorizedError('Invalid refresh token');
	}
}

export const logoutSign = async (sessionId: string) => {
	await prisma.sessions.update({
		where: { id: sessionId },
		data: { is_valid: false }
	});
}