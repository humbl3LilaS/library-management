import { z } from "zod";
import { IUserInsert } from "@/database/schema";

export const SignUpSchemaDefaultValues: IUserInsert = {
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
