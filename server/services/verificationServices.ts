import crypto from 'crypto';
import prisma from '@config/prisma';
import { hashToken, generateVerificationToken, sendEmail, sendSMS, randomNumeric } from './notificationServices';
import { UnauthorizedError, BadRequestError } from '@/lib/errors';
import { authenticator } from 'otplib';

const EMAIL_TOKEN_TTL_MS = 15 * 60 * 1000; // 15m
const PHONE_TOKEN_TTL_MS = 10 * 60 * 1000; // 10m

export async function issueEmailVerification(userId: string, email: string) {
  const { token, hash } = generateVerificationToken();
  await prisma.verification_tokens.create({
    data: {
      user_id: userId,
      token_hash: hash,
      type: 'email_verification',
      expires_at: new Date(Date.now() + EMAIL_TOKEN_TTL_MS)
    }
  });
  const baseUrl = process.env.EMAIL_VERIFY_BASE_URL || process.env.EXPRESS_CLIENT_URL || '';
  const link = `${baseUrl?.replace(/\/$/, '')}/verify-email?token=${token}`;
  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: `<p>Click the button below to verify your email (expires in 15 minutes):</p>
           <p><a href="${link}" style="background:#4f46e5;color:#fff;padding:10px 18px;text-decoration:none;border-radius:6px;display:inline-block">Verify Email</a></p>
           <p>If the button doesn't work, copy this link:<br/><code>${link}</code></p>
           <p>If you did not request this, you can ignore this email.</p>`
  });
  return { token, link }; // token only for dev/logging
}

// Authenticated confirm (user already known)
export async function confirmEmailVerification(userId: string, token: string) {
  return confirmEmailVerificationPublic(token, userId);
}

// Public confirm via token only (used by link)
export async function confirmEmailVerificationPublic(token: string, forcedUserId?: string) {
  const hash = hashToken(token);
  const record = await prisma.verification_tokens.findFirst({
    where: { token_hash: hash, type: 'email_verification', consumed_at: null },
    orderBy: { created_at: 'desc' },
    include: { users: { select: { id: true } } }
  });
  if (!record) throw new BadRequestError('Invalid or consumed token');
  if (record.expires_at < new Date()) throw new BadRequestError('Token expired');
  if (forcedUserId && record.user_id !== forcedUserId) throw new BadRequestError('Token mismatch');
  await prisma.$transaction([
    prisma.users.update({ where: { id: record.user_id }, data: { email_verified_at: new Date() } }),
    prisma.verification_tokens.update({ where: { id: record.id }, data: { consumed_at: new Date() } })
  ]);
  return { userId: record.user_id };
}

export async function issuePhoneVerification(userId: string, phone: string) {
  const code = randomNumeric(6);
  const hash = hashToken(code);
  await prisma.verification_tokens.create({
    data: {
      user_id: userId,
      token_hash: hash,
      type: 'phone_verification',
      expires_at: new Date(Date.now() + PHONE_TOKEN_TTL_MS)
    }
  });
  await sendSMS(phone, `Your verification code is: ${code}`);
  return { code };
}

export async function confirmPhoneVerification(userId: string, code: string) {
  const hash = hashToken(code);
  const record = await prisma.verification_tokens.findFirst({
    where: { user_id: userId, type: 'phone_verification', consumed_at: null },
    orderBy: { created_at: 'desc' }
  });
  if (!record) throw new BadRequestError('No pending phone verification');
  if (record.expires_at < new Date()) throw new BadRequestError('Code expired');
  if (record.token_hash !== hash) throw new BadRequestError('Invalid code');
  await prisma.$transaction([
    prisma.users.update({ where: { id: userId }, data: { phone_verified_at: new Date() } }),
    prisma.verification_tokens.update({ where: { id: record.id }, data: { consumed_at: new Date() } })
  ]);
  return true;
}

// MFA (TOTP)
export function generateMfaSecret() {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri('user', 'App', secret); // NOTE: replace 'user' with dynamic username/email
  return { secret, otpauth };
}

export async function enableMfa(userId: string) {
  const { secret, otpauth } = generateMfaSecret();
  await prisma.users.update({ where: { id: userId }, data: { mfa_secret: secret, mfa_enabled: false } });
  return { secret, otpauth };
}

export async function confirmEnableMfa(userId: string, token: string) {
  const user = await prisma.users.findUnique({ where: { id: userId }, select: { mfa_secret: true } });
  if (!user || !user.mfa_secret) throw new BadRequestError('No pending MFA setup');
  const ok = authenticator.verify({ token, secret: user.mfa_secret });
  if (!ok) throw new BadRequestError('Invalid MFA code');
  await prisma.users.update({ where: { id: userId }, data: { mfa_enabled: true } });
  return true;
}

export async function disableMfa(userId: string, token: string) {
  const user = await prisma.users.findUnique({ where: { id: userId }, select: { mfa_secret: true, mfa_enabled: true } });
  if (!user || !user.mfa_secret || !user.mfa_enabled) throw new BadRequestError('MFA not enabled');
  const ok = authenticator.verify({ token, secret: user.mfa_secret });
  if (!ok) throw new BadRequestError('Invalid MFA code');
  await prisma.users.update({ where: { id: userId }, data: { mfa_secret: null, mfa_enabled: false } });
  return true;
}

export async function verifyMfaChallenge(userId: string, token: string) {
  const user = await prisma.users.findUnique({ where: { id: userId }, select: { mfa_secret: true, mfa_enabled: true } });
  if (!user || !user.mfa_enabled || !user.mfa_secret) throw new UnauthorizedError('MFA not enabled');
  const ok = authenticator.verify({ token, secret: user.mfa_secret });
  if (!ok) throw new UnauthorizedError('Invalid MFA token');
  return true;
}
