import z from "zod";

export const ResendEmailSchema = z.object({
  email: z.email("Invalid email address"),
});

export type ResendEmailValues = z.infer<typeof ResendEmailSchema>;
