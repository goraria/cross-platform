import { Router } from "express";
import { login, register, me, cookieToken, refreshToken, logout, checkAccess } from "@controllers/authControllers";
import { issueEmailVerification, confirmEmailVerification, issuePhoneVerification, confirmPhoneVerification, enableMfaInit, enableMfaConfirm, disableMfa, mfaChallenge, confirmEmailVerificationPublicHandler } from '@controllers/verificationControllers';
import { listSessions, revokeSession, revokeAllSessions } from '@controllers/sessionControllers';
import { validateMiddleware } from "@middlewares/validateMiddleware";
import { authRequire } from "@middlewares/authRequire";
import { loginSchema } from "@schemas/authSchemas";
import { authenticate } from "@middlewares/authMiddleware";
import { loginLimiter, registerLimiter, refreshLimiter, emailVerificationLimiter } from "@middlewares/rateLimiter";
import { loginEmailLimiter } from '@middlewares/loginEmailLimiter';
import { csrfProtect, issueCsrfToken } from '@middlewares/csrfMiddleware';
import { softAuth } from '@middlewares/softAuth';
import type { Request, Response, NextFunction } from 'express';

// Prevent caching for sensitive auth state endpoints
const noCache = (_req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	res.setHeader('Surrogate-Control', 'no-store');
	next();
};

const router = Router();

// Apply rate limiting (commented out until express-rate-limit is installed)
// router.post("/register", registerLimiter, register);
// router.post('/login', loginLimiter, validateMiddleware(loginSchema), login);
// router.post('/refresh-token', refreshLimiter, refreshToken);

// Auth core
// Alias lấy CSRF token trong namespace /auth (ngoài root /csrf-token)
router.get('/csrf-token', issueCsrfToken);
router.post("/register", registerLimiter, register);
router.post('/login', loginLimiter, loginEmailLimiter, validateMiddleware(loginSchema), login);
router.post('/refresh-token', refreshLimiter, refreshToken);
// Logout: now idempotent (doesn't require authenticate) to always clear cookies client-side
router.post('/logout', logout);
router.get("/me", noCache, softAuth, me);
// Frontend dynamic access check
router.get('/check-access', softAuth, checkAccess);
// CSRF token issue (public read route, not protected)
// (Mount in app root maybe better; kept here for cohesion)
// router.get('/csrf-token', issueCsrfToken)

// Email verification
router.get('/verification/email/confirm', confirmEmailVerificationPublicHandler); // public link
router.post('/verification/email/send', authRequire, emailVerificationLimiter, csrfProtect, issueEmailVerification);
router.post('/verification/email/confirm', authRequire, csrfProtect, confirmEmailVerification);
// Phone verification
router.post('/verification/phone/send', authRequire, csrfProtect, issuePhoneVerification);
router.post('/verification/phone/confirm', authRequire, csrfProtect, confirmPhoneVerification);
// MFA
router.post('/mfa/enable/init', authRequire, csrfProtect, enableMfaInit);
router.post('/mfa/enable/confirm', authRequire, csrfProtect, enableMfaConfirm);
router.post('/mfa/disable', authRequire, csrfProtect, disableMfa);
router.post('/mfa/challenge', authRequire, csrfProtect, mfaChallenge);

// Session management (device management)
router.get('/sessions', authRequire, listSessions);
router.post('/sessions/:id/revoke', authRequire, revokeSession);
router.post('/sessions/revoke-all', authRequire, revokeAllSessions);

export default router;