import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Rate limiting cho login attempts
export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // 5 attempts per window per IP
	message: {
		error: 'Too many login attempts',
		message: 'Please try again after 15 minutes'
	},
	standardHeaders: true,
	legacyHeaders: false,
	// Skip successful requests
	skipSuccessfulRequests: true,
	// Custom key generator để track theo IP + email
	keyGenerator: (req: Request) => {
		return `${req.ip}:${req.body.email || 'anonymous'}`;
	}
});

// Rate limiting cho registration
export const registerLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 3, // 3 registrations per hour per IP
	message: {
		error: 'Too many registration attempts',
		message: 'Please try again after 1 hour'
	},
	standardHeaders: true,
	legacyHeaders: false
});

// Rate limiting cho refresh token
export const refreshLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 10, // 10 refresh attempts per 5 minutes
	message: {
		error: 'Too many refresh attempts',
		message: 'Please try again after 5 minutes'
	},
	standardHeaders: true,
	legacyHeaders: false
});

// Rate limiting cho password reset
export const passwordResetLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 3, // 3 password reset attempts per hour
	message: {
		error: 'Too many password reset attempts',
		message: 'Please try again after 1 hour'
	},
	standardHeaders: true,
	legacyHeaders: false
});
