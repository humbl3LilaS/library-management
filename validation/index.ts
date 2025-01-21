import { z } from "zod";

export const SignUpSchema = z.object({
    fullName: z.string().min(4),
    email: z.string().email(),
    id: z.string(),
    password: z.string().min(8),
    idCard: z.string().nonempty(),
});

export type TSignUpSchema = Zod.infer<typeof SignUpSchema>;

export const SignUpSchemaDefaultValues: TSignUpSchema = {
    fullName: "",
    email: "",
    idCard: "",
    password: "",
    id: "",
};
export const SignInSchema = z.object({
    email: z.string(),
    password: z.string().email(),
});

export type TSignInSchema = Zod.infer<typeof SignInSchema>;
