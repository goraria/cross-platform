import { z } from "zod";

// === ADDRESS SCHEMAS ===
export const addressSchema = z.object({
  recipient_name: z.string()
    .min(2, 'Tên người nhận phải có ít nhất 2 ký tự')
    .max(100, 'Tên người nhận không được vượt quá 100 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'),
  recipient_phone: z.string()
    .regex(/^(\+84|84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}$/, 
      'Số điện thoại không hợp lệ'),
  street_address: z.string()
    .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
    .max(255, 'Địa chỉ không được vượt quá 255 ký tự'),
  ward: z.string()
    .min(2, 'Phường/Xã phải có ít nhất 2 ký tự')
    .max(100, 'Phường/Xã không được vượt quá 100 ký tự')
    .optional(),
  district: z.string()
    .min(2, 'Quận/Huyện phải có ít nhất 2 ký tự')
    .max(100, 'Quận/Huyện không được vượt quá 100 ký tự'),
  city: z.string()
    .min(2, 'Tỉnh/Thành phố phải có ít nhất 2 ký tự')
    .max(100, 'Tỉnh/Thành phố không được vượt quá 100 ký tự'),
  country: z.string().default('Vietnam'),
  postal_code: z.string()
    .regex(/^\d{5,6}$/, 'Mã bưu điện phải có 5-6 chữ số')
    .optional(),
  is_default_shipping: z.boolean().default(false),
  is_default_billing: z.boolean().default(false)
});

// === PRODUCT SCHEMAS ===
export const productSchema = z.object({
  name: z.string()
    .min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự')
    .max(255, 'Tên sản phẩm không được vượt quá 255 ký tự'),
  description: z.string()
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(2000, 'Mô tả không được vượt quá 2000 ký tự'),
  short_description: z.string()
    .max(500, 'Mô tả ngắn không được vượt quá 500 ký tự')
    .optional(),
  price: z.number()
    .min(0, 'Giá không được âm')
    .max(999999999, 'Giá không được vượt quá 999,999,999 VNĐ'),
  compare_price: z.number()
    .min(0, 'Giá so sánh không được âm')
    .optional(),
  cost_price: z.number()
    .min(0, 'Giá gốc không được âm')
    .optional(),
  sku: z.string()
    .regex(/^[A-Z0-9-_]+$/, 'SKU chỉ được chứa chữ hoa, số, dấu gạch ngang và gạch dưới')
    .max(50, 'SKU không được vượt quá 50 ký tự')
    .optional(),
  barcode: z.string()
    .regex(/^\d{8,13}$/, 'Mã vạch phải có 8-13 chữ số')
    .optional(),
  weight: z.number()
    .min(0, 'Trọng lượng không được âm')
    .optional(),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0)
  }).optional(),
  stock_quantity: z.number()
    .int('Số lượng tồn kho phải là số nguyên')
    .min(0, 'Số lượng tồn kho không được âm'),
  low_stock_threshold: z.number()
    .int('Ngưỡng tồn kho thấp phải là số nguyên')
    .min(0, 'Ngưỡng tồn kho thấp không được âm')
    .optional(),
  category_id: z.string().uuid('ID danh mục không hợp lệ'),
  brand: z.string()
    .min(2, 'Thương hiệu phải có ít nhất 2 ký tự')
    .max(100, 'Thương hiệu không được vượt quá 100 ký tự')
    .optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url('URL hình ảnh không hợp lệ')).optional(),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  seo_title: z.string().max(60, 'SEO title không được vượt quá 60 ký tự').optional(),
  seo_description: z.string().max(160, 'SEO description không được vượt quá 160 ký tự').optional(),
  slug: z.string()
    .regex(/^[a-z0-9-]+$/, 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang')
    .optional()
});

// === ORDER SCHEMAS ===
export const OrderStatusEnum = z.enum([
  'pending', 'confirmed', 'processing', 'shipped', 
  'delivered', 'cancelled', 'refunded', 'returned'
]);

export const PaymentMethodEnum = z.enum([
  'cod', 'bank_transfer', 'momo', 'zalopay', 
  'vnpay', 'credit_card', 'paypal'
]);

export const PaymentStatusEnum = z.enum([
  'pending', 'paid', 'failed', 'refunded', 'partially_refunded'
]);

export const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number()
    .int('Số lượng phải là số nguyên')
    .min(1, 'Số lượng phải ít nhất là 1'),
  price: z.number()
    .min(0, 'Giá không được âm'),
  discount_amount: z.number()
    .min(0, 'Giảm giá không được âm')
    .default(0)
});

export const orderSchema = z.object({
  shipping_address_id: z.string().uuid('ID địa chỉ giao hàng không hợp lệ'),
  billing_address_id: z.string().uuid('ID địa chỉ thanh toán không hợp lệ').optional(),
  payment_method: PaymentMethodEnum,
  shipping_method: z.string()
    .min(2, 'Phương thức vận chuyển phải có ít nhất 2 ký tự'),
  items: z.array(orderItemSchema)
    .min(1, 'Đơn hàng phải có ít nhất 1 sản phẩm'),
  discount_code: z.string().optional(),
  notes: z.string()
    .max(500, 'Ghi chú không được vượt quá 500 ký tự')
    .optional()
});

// === REVIEW SCHEMAS ===
export const reviewSchema = z.object({
  product_id: z.string().uuid('ID sản phẩm không hợp lệ'),
  order_id: z.string().uuid('ID đơn hàng không hợp lệ'),
  rating: z.number()
    .int('Đánh giá phải là số nguyên')
    .min(1, 'Đánh giá thấp nhất là 1 sao')
    .max(5, 'Đánh giá cao nhất là 5 sao'),
  title: z.string()
    .min(2, 'Tiêu đề phải có ít nhất 2 ký tự')
    .max(100, 'Tiêu đề không được vượt quá 100 ký tự'),
  comment: z.string()
    .min(10, 'Bình luận phải có ít nhất 10 ký tự')
    .max(1000, 'Bình luận không được vượt quá 1000 ký tự'),
  images: z.array(z.string().url()).optional(),
  is_verified_purchase: z.boolean().default(false)
});

// === VOUCHER SCHEMAS ===
export const VoucherTypeEnum = z.enum(['percentage', 'fixed_amount', 'free_shipping']);

export const voucherSchema = z.object({
  code: z.string()
    .min(3, 'Mã voucher phải có ít nhất 3 ký tự')
    .max(20, 'Mã voucher không được vượt quá 20 ký tự')
    .regex(/^[A-Z0-9]+$/, 'Mã voucher chỉ được chứa chữ hoa và số'),
  title: z.string()
    .min(2, 'Tiêu đề phải có ít nhất 2 ký tự')
    .max(100, 'Tiêu đề không được vượt quá 100 ký tự'),
  description: z.string()
    .max(500, 'Mô tả không được vượt quá 500 ký tự')
    .optional(),
  type: VoucherTypeEnum,
  value: z.number()
    .min(0, 'Giá trị không được âm'),
  minimum_order_amount: z.number()
    .min(0, 'Giá trị đơn hàng tối thiểu không được âm')
    .optional(),
  maximum_discount_amount: z.number()
    .min(0, 'Giảm giá tối đa không được âm')
    .optional(),
  usage_limit: z.number()
    .int('Giới hạn sử dụng phải là số nguyên')
    .min(1, 'Giới hạn sử dụng phải ít nhất là 1')
    .optional(),
  usage_limit_per_user: z.number()
    .int('Giới hạn sử dụng/người phải là số nguyên')
    .min(1, 'Giới hạn sử dụng/người phải ít nhất là 1')
    .optional(),
  start_date: z.string().datetime('Ngày bắt đầu không hợp lệ'),
  end_date: z.string().datetime('Ngày kết thúc không hợp lệ'),
  is_active: z.boolean().default(true)
}).refine(
  (data) => new Date(data.end_date) > new Date(data.start_date),
  {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["end_date"]
  }
);

// === SEARCH & FILTER SCHEMAS ===
export const productSearchSchema = z.object({
  q: z.string().optional(), // Search query
  category_id: z.string().uuid().optional(),
  min_price: z.number().min(0).optional(),
  max_price: z.number().min(0).optional(),
  brand: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  in_stock: z.boolean().optional(),
  sort_by: z.enum(['name', 'price', 'rating', 'created_at']).optional(),
  sort_order: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20)
});

export const orderSearchSchema = z.object({
  status: OrderStatusEnum.optional(),
  payment_status: PaymentStatusEnum.optional(),
  payment_method: PaymentMethodEnum.optional(),
  from_date: z.string().datetime().optional(),
  to_date: z.string().datetime().optional(),
  min_total: z.number().min(0).optional(),
  max_total: z.number().min(0).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20)
});

// === TYPE EXPORTS ===
export type AddressInput = z.infer<typeof addressSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type VoucherInput = z.infer<typeof voucherSchema>;
export type ProductSearchInput = z.infer<typeof productSearchSchema>;
export type OrderSearchInput = z.infer<typeof orderSearchSchema>;

export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export type VoucherType = z.infer<typeof VoucherTypeEnum>;
