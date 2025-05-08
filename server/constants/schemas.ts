import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
})

export const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  email: z.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirm_password: z.string()
    .min(8, 'Confirm password must be at least 6 characters')
    .max(100, 'Confirm password must be less than 100 characters'),
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be less than 100 characters'),
  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be less than 100 characters'),
  phone_number: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[0-9+]+$/, 'Phone number can only contain numbers and +')
    .refine((val) => {
      // Kiểm tra định dạng số điện thoại Việt Nam
      const vietnamPhoneRegex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/
      return vietnamPhoneRegex.test(val)
    }, 'Invalid Vietnamese phone number format'),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"]
})

export const createUserSchema = z.object({
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]),
  status: z.enum(["active", "inactive"]),
  created_at: z.date(),
  updated_at: z.date(),
  phone_number: z.string().min(10).max(10),
  // viewed_profile: z.number(),
  // impressions: z.number(),
  // friends: z.array(z.string()),
  // location: z.string(),
  // occupation: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>