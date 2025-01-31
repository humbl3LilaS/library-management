"use server";

import { AuthErrorCause } from "@/error/auth-error";
import { books, IBookInsert } from "@/database/schema";
import { db } from "@/database/drizzle";

export const addNewBook = async (
    payload: IBookInsert
): Promise<{ success: true } | { success: false; cause: AuthErrorCause }> => {
    try {
        const [book] = await db
            .insert(books)
            .values({ ...payload })
            .returning();
        if (!book) {
            return {
                success: false,
                cause: {
                    reason: "Error Creating New Book",
                },
            };
        }
        return { success: true };
    } catch (e: unknown) {
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
                reason: "Error crating new book",
            },
        };
    }
};
