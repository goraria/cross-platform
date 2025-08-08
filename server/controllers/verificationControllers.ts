import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '@middlewares/authRequire';
import { issueEmailVerification as issueEmail, confirmEmailVerification as confirmEmail, confirmEmailVerificationPublic, issuePhoneVerification as issuePhone, confirmPhoneVerification as confirmPhone, enableMfa, confirmEnableMfa, disableMfa as disableMfaSvc, verifyMfaChallenge } from '@/services/verificationServices';
import prisma from '@config/prisma';
import { BadRequestError } from '@/lib/errors';

export const issueEmailVerification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const user = await prisma.users.findUnique({ where: { id: req.userId }, select: { email: true, email_verified_at: true } });
    if (!user) throw new BadRequestError('User not found');
    if (user.email_verified_at) return res.json({ success: true, message: 'Email already verified' });
    // Cooldown: find last unconsumed token
    const last = await prisma.verification_tokens.findFirst({
      where: { user_id: req.userId, type: 'email_verification', consumed_at: null },
      orderBy: { created_at: 'desc' }
    });
    const COOLDOWN_MS = 60 * 1000; // 60s
    if (last && Date.now() - last.created_at.getTime() < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - (Date.now() - last.created_at.getTime())) / 1000);
      await prisma.verification_email_logs.create({
        data: {
          user_id: req.userId,
            email: user.email,
            ip_address: req.ip,
            user_agent: req.headers['user-agent'],
            status: 'cooldown',
            note: `Retry in ${wait}s`
        }
      });
      return res.status(429).json({ success: false, message: `Please wait ${wait}s before requesting another email` });
    }
    const { token } = await issueEmail(req.userId, user.email);
    await prisma.verification_email_logs.create({
      data: {
        user_id: req.userId,
        email: user.email,
        ip_address: req.ip,
        user_agent: req.headers['user-agent'],
        status: 'sent'
      }
    });
    res.json({ success: true, message: 'Verification email sent' }); // token hidden
  } catch (e) { next(e); }
};

export const confirmEmailVerification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const { token } = req.body;
    await confirmEmail(req.userId, token);
    res.json({ success: true, message: 'Email verified' });
  } catch (e) { next(e); }
};

export const confirmEmailVerificationPublicHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.query.token as string;
    if (!token) return res.status(400).send('Missing token');
    await confirmEmailVerificationPublic(token);
    // Optional redirect to frontend success page
    const successUrl = process.env.EMAIL_VERIFY_SUCCESS_URL || '/email-verified';
    // If expecting JSON (e.g., X-Requested-With), return JSON instead
    if ((req.headers.accept || '').includes('application/json')) {
      return res.json({ success: true, message: 'Email verified' });
    }
    res.redirect(successUrl);
  } catch (e: any) {
    // Optional redirect to failure page
    const failUrl = process.env.EMAIL_VERIFY_FAIL_URL || '/email-verify-failed';
    if ((req.headers.accept || '').includes('application/json')) {
      return res.status(400).json({ success: false, message: e.message || 'Verification failed' });
    }
    res.redirect(failUrl);
  }
};

export const issuePhoneVerification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const user = await prisma.users.findUnique({ where: { id: req.userId }, select: { phone_number: true, phone_verified_at: true } });
    if (!user || !user.phone_number) throw new BadRequestError('No phone');
    if (user.phone_verified_at) return res.json({ success: true, message: 'Phone already verified' });
    const { code } = await issuePhone(req.userId, user.phone_number);
    res.json({ success: true, message: 'Verification code sent', devCode: process.env.EXPRESS_ENV !== 'production' ? code : undefined });
  } catch (e) { next(e); }
};

export const confirmPhoneVerification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const { code } = req.body;
    await confirmPhone(req.userId, code);
    res.json({ success: true, message: 'Phone verified' });
  } catch (e) { next(e); }
};

export const enableMfaInit = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const { secret, otpauth } = await enableMfa(req.userId);
    res.json({ success: true, secret, otpauth });
  } catch (e) { next(e); }
};

export const enableMfaConfirm = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const { token } = req.body;
    await confirmEnableMfa(req.userId, token);
    res.json({ success: true, message: 'MFA enabled' });
  } catch (e) { next(e); }
};

export const disableMfa = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const { token } = req.body;
    await disableMfaSvc(req.userId, token);
    res.json({ success: true, message: 'MFA disabled' });
  } catch (e) { next(e); }
};

export const mfaChallenge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new BadRequestError('No user');
    const { token } = req.body;
    await verifyMfaChallenge(req.userId, token);
    res.json({ success: true, message: 'MFA challenge passed' });
  } catch (e) { next(e); }
};
