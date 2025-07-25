// server/types/auth.ts
export interface AuthSession {
  id: string;
  user_id: string;
  is_valid: boolean;
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
  token?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'user' | 'admin' | 'manager';
  created_at: Date;
  updated_at: Date;
}

export interface JwtPayload {
  userId: string;
  sessionId: string;
  iat?: number;
  exp?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  phone_number?: string;
  phone_code?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: Pick<AuthUser, 'id' | 'email' | 'username' | 'first_name' | 'last_name'>;
  accessToken?: string;
  refreshToken?: string;
}

export interface TokenRefreshResponse {
  success: boolean;
  message: string;
  user: Pick<AuthUser, 'id' | 'email' | 'username'>;
  accessToken: string;
  refreshToken: string;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: Pick<AuthUser, 'id' | 'email' | 'username'>;
      authSession?: { id: string };
    }
  }
}
