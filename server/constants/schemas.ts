// Import shared schemas
export * from "./schemas";

// Server-specific schemas can be added here if needed
import { z } from "zod";

// Example: Server-only validation schemas
export const serverConfigSchema = z.object({
  port: z.number().int().min(1000).max(65535),
  environment: z.enum(['development', 'production', 'test']),
  database_url: z.string().url(),
  jwt_secret: z.string().min(32),
  jwt_refresh_secret: z.string().min(32)
});

// File upload schema
export const fileUploadSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string().regex(/^(image|video|document)\//),
  size: z.number().max(10 * 1024 * 1024), // 10MB max
  destination: z.string(),
  filename: z.string(),
  path: z.string()
});

// Admin schemas
export const adminUserUpdateSchema = z.object({
  role: z.enum(['user', 'admin', 'manager', 'staff']).optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'pending']).optional(),
  permissions: z.array(z.string()).optional()
});

export type ServerConfig = z.infer<typeof serverConfigSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;
export type AdminUserUpdate = z.infer<typeof adminUserUpdateSchema>;