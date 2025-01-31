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

export const BookSchema = z.object({
    title: z.string().trim().min(2).max(100),
    author: z.string().trim().min(2).max(100),
    description: z.string().trim().min(2).max(100),
    genre: z.string().trim().min(2).max(50),
    rating: z.coerce.number().min(1).max(5),
    totalCopies: z.coerce.number().int().positive().lte(1000),
    coverUrl: z.string().min(1),
    coverColor: z
        .string()
        .trim()
        .regex(/^#[0-9A-F]{6}$/i),
    videoUrl: z.string().min(1),
    summary: z.string().trim().min(10),
});

export type TBookSchema = Zod.infer<typeof BookSchema>;

export const BookSchemaDefaultValues: TBookSchema = {
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
