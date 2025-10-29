import { z } from "zod"

export const signUpSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(6, "Password must at least 6 characters long.")
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required."),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
