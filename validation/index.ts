import { z } from "zod";

export const SignUpSchema = z.object({
    fullName: z.string().min(4),
    email: z.string().email(),
    universityId: z.string(),
    password: z.string().min(8),
    idCard: z.string().nonempty(),
});

export type TSignUpSchema = Zod.infer<typeof SignUpSchema>;

export const SignUpSchemaDefaultValues: TSignUpSchema = {
    fullName: "",
    email: "",
    idCard: "",
    password: "",
    universityId: "",
};
export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type TSignInSchema = Zod.infer<typeof SignInSchema>;
