import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Simple stateless double-submit CSRF token (for cookie-based auth)
// Client flow:
// 1. GET /csrf-token -> server sets csrf_token cookie (httpOnly: false) and returns value in body
// 2. Subsequent mutating requests send header 'x-csrf-token' matching cookie value

const CSRF_COOKIE = 'csrf_token';
const CSRF_HEADER = 'x-csrf-token';

export const issueCsrfToken = (req: Request, res: Response) => {
  const token = crypto.randomBytes(32).toString('hex');
  // For SPA on different origin (e.g. localhost:3000 -> API 8080) SameSite:'strict' will block cookie
  // Use lax by default; allow override via CSRF_SAMESITE env; in production if using cross-site set to 'none' + secure
  const sameSiteEnv = (process.env.CSRF_SAMESITE || 'lax').toLowerCase();
  const sameSite: any = ['strict', 'lax', 'none'].includes(sameSiteEnv) ? sameSiteEnv : 'lax';
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false, // must be readable by frontend JS to echo in header
    sameSite,
    secure: process.env.EXPRESS_ENV === 'production' && sameSite === 'none' ? true : process.env.EXPRESS_ENV === 'production',
    maxAge: 2 * 60 * 60 * 1000,
    path: '/',
  });
  res.json({ csrfToken: token });
};

export const csrfProtect = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) return next();
  // (Đã bật lại bảo vệ) – Không còn whitelist mặc định.
  // Nếu muốn tạm bỏ qua các đường dẫn nhất định: đặt env CSRF_WHITELIST="/auth/register,/auth/login".
  const envWhitelist = (process.env.CSRF_WHITELIST || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (envWhitelist.length) {
    const whitelist = new Set(envWhitelist);
    if (whitelist.has(req.path)) return next();
  }

  const cookieToken = req.cookies?.[CSRF_COOKIE];
  const headerToken = req.header(CSRF_HEADER);
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    if (process.env.EXPRESS_ENV !== 'production') {
      // Development diagnostics to help debug why token invalid
      // eslint-disable-next-line no-console
      console.warn('[CSRF] Invalid token:', {
        method,
        path: req.path,
        cookiePresent: !!cookieToken,
        headerPresent: !!headerToken,
        match: cookieToken === headerToken,
        origin: req.headers.origin,
        referer: req.headers.referer,
        sameSiteHint: 'If cookie missing on cross-site request, lower SameSite to lax/none.'
      });
    }
  return res.status(403).json({ success: false, code: 'CSRF_INVALID', message: 'CSRF token invalid' });
  }
  next();
};
