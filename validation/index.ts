import { z } from "zod";
import { IBookInsert, IUserInsert } from "@/database/schema";

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

export const BookSchemaDefaultValues: IBookInsert = {
    title: "",
    author: "",
    description: "",
    genre: "",
    rating: 0,
    totalCopies: 0,
    coverUrl: "",
    coverColor: "#FFFFFF",
    videoUrl: "",
    summary: "",
};
