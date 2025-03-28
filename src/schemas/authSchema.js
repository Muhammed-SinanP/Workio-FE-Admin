import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export const passwordChangeSchema = z
  .object({
    password: z.string().min(4, "Current password is required."),
    newPassword: z
      .string()
      .min(4, "Password must include atleast 4 characters."),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "Current and new passwords can't be same.",
    path: ["newPassword"],
  });

export const passwordResetSchema = z
  .object({
    password: z.string().min(4, "Password must include atleast 4 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });


export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email address.")
});