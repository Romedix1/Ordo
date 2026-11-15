import { passwordRegex } from "@/schemas/register";
import z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      passwordRegex,
      "Password must contain a lowercase letter, an uppercase letter, a digit and a special character",
    ),
  confirmPassword: z.string(),
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
