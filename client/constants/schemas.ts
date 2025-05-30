import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
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
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirm_password: z.string()
    .min(8, 'Confirm password must be at least 8 characters')
    .max(100, 'Confirm password must be less than 100 characters'),
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be less than 100 characters'),
  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be less than 100 characters'),
  phone_number: z.string()
    .min(8, 'Phone number must be at least 8 digits')
    .max(20, 'Phone number must be less than 20 digits')
    .regex(/^[0-9+]+$/, 'Phone number can only contain numbers and +'),
  phone_code: z.string()
    .min(2, 'Phone code is required')
    .max(8, 'Phone code is too long'),
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

// import * as z from "zod";
// import { PropertyTypeEnum } from "@/lib/constants";
//
// export const propertySchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   pricePerMonth: z.coerce.number().positive().min(0).int(),
//   securityDeposit: z.coerce.number().positive().min(0).int(),
//   applicationFee: z.coerce.number().positive().min(0).int(),
//   isPetsAllowed: z.boolean(),
//   isParkingIncluded: z.boolean(),
//   photoUrls: z
//     .array(z.instanceof(File))
//     .min(1, "At least one photo is required"),
//   amenities: z.string().min(1, "Amenities are required"),
//   highlights: z.string().min(1, "Highlights are required"),
//   beds: z.coerce.number().positive().min(0).max(10).int(),
//   baths: z.coerce.number().positive().min(0).max(10).int(),
//   squareFeet: z.coerce.number().int().positive(),
//   propertyType: z.nativeEnum(PropertyTypeEnum),
//   address: z.string().min(1, "Address is required"),
//   city: z.string().min(1, "City is required"),
//   state: z.string().min(1, "State is required"),
//   country: z.string().min(1, "Country is required"),
//   postalCode: z.string().min(1, "Postal code is required"),
// });
//
// export type PropertyFormData = z.infer<typeof propertySchema>;
//
// export const applicationSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
//   message: z.string().optional(),
// });
//
// export type ApplicationFormData = z.infer<typeof applicationSchema>;
//
// export const settingsSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
// });
//
// export type SettingsFormData = z.infer<typeof settingsSchema>;
//
// //////////////////////////////////////////////////////////
//
// // Course Editor Schemas
// export const courseSchema = z.object({
//   courseTitle: z.string().min(1, "Title is required"),
//   courseDescription: z.string().min(1, "Description is required"),
//   courseCategory: z.string().min(1, "Category is required"),
//   coursePrice: z.string(),
//   courseStatus: z.boolean(),
// });
//
// export type CourseFormData = z.infer<typeof courseSchema>;
//
// // Chapter Schemas
// export const chapterSchema = z.object({
//   title: z.string().min(2, "Title must be at least 2 characters"),
//   content: z.string().min(10, "Content must be at least 10 characters"),
//   video: z.union([z.string(), z.instanceof(File)]).optional(),
// });
//
// export type ChapterFormData = z.infer<typeof chapterSchema>;
//
// // Section Schemas
// export const sectionSchema = z.object({
//   title: z.string().min(2, "Title must be at least 2 characters"),
//   description: z.string().min(10, "Description must be at least 10 characters"),
// });
//
// export type SectionFormData = z.infer<typeof sectionSchema>;
//
// // Guest Checkout Schema
// export const guestSchema = z.object({
//   email: z.string().email("Invalid email address"),
// });
//
// export type GuestFormData = z.infer<typeof guestSchema>;
//
// // Notification Settings Schema
// export const notificationSettingsSchema = z.object({
//   courseNotifications: z.boolean(),
//   emailAlerts: z.boolean(),
//   smsAlerts: z.boolean(),
//   notificationFrequency: z.enum(["immediate", "daily", "weekly"]),
// });
//
// export type NotificationSettingsFormData = z.infer<
//   typeof notificationSettingsSchema
// >;
//


// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

// export function ProfileForm() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//     },
//   })

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values)
//   }
// }
