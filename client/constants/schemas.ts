// Import shared schemas
export * from "@shared/schemas/auth.schemas";
export * from "@shared/schemas/business.schemas";

// Client-specific schemas can be added here if needed
import { z } from "zod";

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
