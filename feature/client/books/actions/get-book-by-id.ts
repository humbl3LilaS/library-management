"use server";
import { db } from "@/database/drizzle";
import { books, IBook } from "@/database/schema";
import { eq } from "drizzle-orm";

type Cause = {
    reason: string;
};

export const getBookById = async (
    id: string
): Promise<
    { success: true; data: IBook } | { success: false; cause: Cause }
> => {
    try {
        const [book] = await db
            .select()
            .from(books)
            .where(eq(books.id, id))
            .limit(1);
        if (!book) {
            return {
                success: false,
                cause: {
                    reason: "Invalid Book Id",
                },
            };
        }
        return {
            success: true,
            data: book,
        };
    } catch (e) {
        if (e instanceof Error) {
            return {
                success: false,
                cause: {
                    reason: e.message,
                },
            };
        }
        return {
            success: false,
            cause: {
                reason: "Error retrieving book from database",
            },
        };
    }
};
