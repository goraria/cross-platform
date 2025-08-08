import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '@/lib/errors';

/**
 * accessControl: Intercepts 401 / 403 responses and unify response or redirect.
 * Place early (after auth parsing of cookies) so it wraps subsequent routes.
 */
export const accessControl = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalStatus = res.status.bind(res);
    res.status = (code: number) => {
      if (code === 401 || code === 403) {
        const wantsJson = req.headers.accept?.includes('application/json') || req.path.startsWith('/api');
        if (wantsJson) {
          return originalStatus(code).json({
            success: false,
            error: {
              code: code === 401 ? 'UNAUTHORIZED' : 'FORBIDDEN',
              message: code === 401 ? 'Unauthorized' : 'Forbidden'
            }
          });
        }
        // Redirect for non-API consumers (SPA can catch /error route)
        res.setHeader('Location', `/error?code=${code}`);
        return originalStatus(302) as any;
      }
      return originalStatus(code);
    };

    try {
      next();
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: err.message } });
      }
      if (err instanceof ForbiddenError) {
        return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: err.message } });
      }
      next(err as any);
    }
  };
};

/**
 * requireRoles: Ensure current user has at least one of required roles.
 * Relies on previous middleware attaching req.user with role/roles.
 */
export const requireRoles = (roles: string[]) => {
  const normalized = roles.map(r => r.toLowerCase());
  return (req: Request & { user?: any }, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return next(new UnauthorizedError());
    const userRole: string | undefined = (user.role || user.roles?.[0])?.toLowerCase();
    if (!userRole || !normalized.includes(userRole)) {
      return next(new ForbiddenError('Insufficient role'));
    }
    return next();
  };
};
