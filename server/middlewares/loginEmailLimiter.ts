import { Request, Response, NextFunction } from 'express';

// In-memory map: replace with Redis in production
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15m
const MAX_ATTEMPTS = 5;

export function loginEmailLimiter(req: Request, res: Response, next: NextFunction) {
  const emailRaw = req.body?.email || '';
  const email = emailRaw.toLowerCase();
  if (!email) return next();
  const key = email;
  const now = Date.now();
  const rec = attempts.get(key);
  if (!rec) {
    attempts.set(key, { count: 1, first: now });
    return next();
  }
  if (now - rec.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: now });
    return next();
  }
  rec.count += 1;
  if (rec.count > MAX_ATTEMPTS) {
    return res.status(429).json({ success: false, message: 'Too many login attempts for this email. Try later.' });
  }
  next();
}

export function resetLoginEmailAttempts(email: string) {
  attempts.delete(email.toLowerCase());
}
