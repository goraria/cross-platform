import { Request, Response, NextFunction } from 'express';
import prisma from '@config/prisma';
import { AuthRequest } from '@middlewares/authRequire';
import { BadRequestError, UnauthorizedError } from '@/lib/errors';

// List active sessions for current user (device management)
export const listSessions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new UnauthorizedError();
  const sessionsRaw = await prisma.sessions.findMany({
      where: { user_id: req.userId },
      select: {
        id: true,
        is_valid: true,
        expires_at: true,
        created_at: true,
        updated_at: true,
        revoked_at: true,
        replaced_by_session_id: true,
        ip_address: true,
        user_agent: true,
        last_accessed_at: true
      },
      orderBy: { created_at: 'desc' }
    });
  const sessions = sessionsRaw.map(s => ({ ...s, isCurrent: s.id === req.sessionId }));
  res.json({ success: true, sessions });
  } catch (err) { next(err); }
};

// Revoke a single session
export const revokeSession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new UnauthorizedError();
    const { id } = req.params;
    const session = await prisma.sessions.findUnique({ where: { id } });
    if (!session || session.user_id !== req.userId) {
      throw new BadRequestError('Session not found');
    }
    if (!session.is_valid) {
      return res.json({ success: true, message: 'Session already revoked' });
    }
    await prisma.sessions.update({
      where: { id },
      data: { is_valid: false, revoked_at: new Date() }
    });
    res.json({ success: true, message: 'Session revoked' });
  } catch (err) { next(err); }
};

// Revoke all other sessions except current
export const revokeAllSessions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) throw new UnauthorizedError();
    const currentSessionId = req.sessionId;
    await prisma.sessions.updateMany({
      where: {
        user_id: req.userId,
        is_valid: true,
        NOT: currentSessionId ? { id: currentSessionId } : undefined
      },
      data: { is_valid: false, revoked_at: new Date() }
    });
    res.json({ success: true, message: 'Other sessions revoked' });
  } catch (err) { next(err); }
};
