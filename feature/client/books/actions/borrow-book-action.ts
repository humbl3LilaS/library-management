"use server";

import { books, borrowRecords, IBorrowRecord } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { addDays } from "date-fns";

type Cause = {
    reason: string;
};

export const borrowBook = async ({
    userId,
    bookId,
}: {
    userId: string;
    bookId: string;
}): Promise<
    { success: true; data: IBorrowRecord } | { success: false; cause: Cause }
> => {
    try {
        const [book] = await db
            .select({
                availableCopies: books.availableCopies,
            })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (!book) {
            return {
                success: false,
                cause: {
                    reason: "Invalid BookId",
                },
            };
        }

        if (book.availableCopies < 1) {
            return {
                success: false,
                cause: {
                    reason: "No More available Copies",
                },
            };
        }

        await db
            .update(books)
            .set({ availableCopies: book.availableCopies - 1 });

        const [borrowRecord] = await db
            .insert(borrowRecords)
            .values({
                userId,
                bookId,
                dueDate: addDays(new Date(), 7).toISOString().slice(0, 10),
            })
            .returning();

        if (!borrowRecord) {
            return {
                success: false,
                cause: {
                    reason: "Error Inserting Borrow Records into database",
                },
            };
        }
        return { success: true, data: borrowRecord };
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
                reason: "An Error Occurred While Borrowing the book.",
            },
        };
    }
};
