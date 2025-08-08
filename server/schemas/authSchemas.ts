import { z } from "zod";

// === PHONE NUMBER VALIDATION FOR VIETNAM ===
const VIETNAM_PHONE_REGEX = /^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}$/;
const VIETNAM_PHONE_CLEAN_REGEX = /^(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}$/;

// Transform function để clean phone number
const cleanVietnamesePhone = (phone: string): string => {
  // Remove all non-digits and +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // Convert +84 to 0
  if (cleaned.startsWith('+84')) {
    cleaned = '0' + cleaned.slice(3);
  } else if (cleaned.startsWith('84')) {
    cleaned = '0' + cleaned.slice(2);
  }
  
  return cleaned;
};

// === EMAIL VALIDATION ===
const emailSchema = z.string()
  .email('Email không hợp lệ')
  .min(5, 'Email phải có ít nhất 5 ký tự')
  .max(255, 'Email không được vượt quá 255 ký tự')
  .toLowerCase()
  .trim();

// === PASSWORD VALIDATION ===
const passwordSchema = z.string()
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  .max(128, 'Mật khẩu không được vượt quá 128 ký tự')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Mật khẩu phải chứa ít nhất: 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt');

// === USERNAME VALIDATION ===
const usernameSchema = z.string()
  .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
  .max(30, 'Tên đăng nhập không được vượt quá 30 ký tự')
  .regex(/^[a-zA-Z0-9_.-]+$/, 'Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới, dấu chấm và dấu gạch ngang')
  .toLowerCase()
  .trim();

// === NAME VALIDATION ===
const nameSchema = z.string()
  .min(2, 'Tên phải có ít nhất 2 ký tự')
  .max(50, 'Tên không được vượt quá 50 ký tự')
  .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng')
  .trim();

// === PHONE VALIDATION (chấp nhận mọi đầu số 01-09) ===
// Cho phép: 0 + (1-9) + 8 hoặc 9 số tiếp theo (10 hoặc 11 số tổng cộng)
const GENERIC_VN_PHONE_REGEX = /^0[1-9][0-9]{8,9}$/;
const phoneSchema = z.string()
  .min(10, 'Số điện thoại phải có ít nhất 10 số')
  .max(11, 'Số điện thoại không được vượt quá 11 số')
  .transform(cleanVietnamesePhone)
  .refine(
    (phone) => GENERIC_VN_PHONE_REGEX.test(phone),
    'Số điện thoại không hợp lệ (yêu cầu dạng 0x và tổng 10-11 số)'
  );

// Update dùng cùng logic (có thể tách nếu cần sau này)
const phoneUpdateSchema = phoneSchema;

// === ENUMS ===
export const UserRoleEnum = z.enum(['user', 'admin', 'manager', 'staff']);
export const UserStatusEnum = z.enum(['active', 'inactive', 'suspended', 'pending']);
export const GenderEnum = z.enum(['male', 'female', 'other', 'prefer_not_to_say']);

// === BASE SCHEMAS ===

// Login Schema (identifier = email hoặc username)
export const loginSchema = z.object({
  identifier: z.string()
    .min(3, 'Ít nhất 3 ký tự')
    .max(255, 'Tối đa 255 ký tự')
    .trim()
    .refine(val => {
      const isEmail = /@/.test(val) && /.+@.+\..+/.test(val);
      const isUsername = /^[a-zA-Z0-9_.-]{3,30}$/.test(val);
      return isEmail || isUsername;
    }, 'Phải là email hoặc username hợp lệ'),
  password: z.string()
    .min(1, 'Mật khẩu không được để trống')
    .max(128, 'Mật khẩu không được vượt quá 128 ký tự'),
  remember_me: z.boolean().optional().default(false)
});

// Register Schema
export const registerSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirm_password: z.string(),
  phone_number: phoneSchema,
  phone_code: z.string().min(1).default('+84'),
  terms_accepted: z.boolean()
    .refine((val) => val === true, 'Bạn phải đồng ý với điều khoản sử dụng'),
  newsletter_subscription: z.boolean().optional().default(false)
}).refine((data) => data.password === data.confirm_password, {
  message: "Xác nhận mật khẩu không khớp",
  path: ["confirm_password"]
});

// Update Profile Schema (all fields optional for PATCH)
export const updateProfileSchema = z.object({
  first_name: nameSchema.optional(),
  last_name: nameSchema.optional(),
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  phone_number: phoneUpdateSchema.optional(),
  phone_code: z.string().min(1).default('+84').optional(),
  bio: z.string()
    .max(500, 'Tiểu sử không được vượt quá 500 ký tự')
    .optional(),
  date_of_birth: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày sinh phải có định dạng YYYY-MM-DD')
    .optional(),
  gender: GenderEnum.optional(),
  avatar_url: z.string().url('URL avatar không hợp lệ').optional(),
  cover_url: z.string().url('URL cover không hợp lệ').optional()
});

// Change Password Schema
export const changePasswordSchema = z.object({
  current_password: z.string()
    .min(1, 'Mật khẩu hiện tại không được để trống'),
  new_password: passwordSchema,
  confirm_new_password: z.string()
}).refine((data) => data.new_password === data.confirm_new_password, {
  message: "Xác nhận mật khẩu mới không khớp",
  path: ["confirm_new_password"]
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: emailSchema
});

// Reset Password Schema
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token không hợp lệ'),
  new_password: passwordSchema,
  confirm_password: z.string()
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Xác nhận mật khẩu không khớp",
  path: ["confirm_password"]
});

// Create User Schema (Admin only)
export const createUserSchema = z.object({
  first_name: nameSchema,
  last_name: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone_number: phoneSchema,
  phone_code: z.literal('+84').default('+84'),
  role: UserRoleEnum.default('user'),
  status: UserStatusEnum.default('active'),
  bio: z.string().max(500).optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  gender: GenderEnum.optional()
});

// Update User Schema (Admin only)
export const updateUserSchema = z.object({
  first_name: nameSchema.optional(),
  last_name: nameSchema.optional(),
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  phone_number: phoneSchema.optional(),
  role: UserRoleEnum.optional(),
  status: UserStatusEnum.optional(),
  bio: z.string().max(500).optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  gender: GenderEnum.optional(),
  avatar_url: z.string().url().optional(),
  cover_url: z.string().url().optional()
});

// === TYPE EXPORTS ===
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type UserRole = z.infer<typeof UserRoleEnum>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type Gender = z.infer<typeof GenderEnum>;

// === VALIDATION HELPERS ===
export const validateVietnamesePhone = (phone: string): boolean => {
  const cleaned = cleanVietnamesePhone(phone);
  return VIETNAM_PHONE_REGEX.test(cleaned);
};

export const formatVietnamesePhone = (phone: string): string => {
  const cleaned = cleanVietnamesePhone(phone);
  // Format: 0xxx xxx xxx
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return cleaned;
};

// === ERROR MESSAGES ===
export const ValidationMessages = {
  REQUIRED: 'Trường này là bắt buộc',
  INVALID_EMAIL: 'Email không hợp lệ',
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 8 ký tự',
  PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp',
  USERNAME_INVALID: 'Tên đăng nhập không hợp lệ',
  NAME_INVALID: 'Tên chỉ được chứa chữ cái',
  TERMS_NOT_ACCEPTED: 'Bạn phải đồng ý với điều khoản sử dụng'
} as const;
