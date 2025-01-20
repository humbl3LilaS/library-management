import { z } from "zod";

export const SignUpSchema = z.object({
    fullName: z.string().min(4),
    email: z.string().email(),
    id: z.coerce.number(),
    password: z.string().min(8),
    idCard: z.custom<File | null>(),
});

export type TSignUpSchema = Zod.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
    email: z.string(),
    password: z.string().email(),
});

export type TSignInSchema = Zod.infer<typeof SignInSchema>;
