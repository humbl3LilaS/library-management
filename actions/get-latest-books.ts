"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

export const getLatestBooks = async () => {
    try {
        const latestUpdate = await db
            .select()
            .from(books)
            .limit(10)
            .orderBy(desc(books.createdAt));
        if (!latestUpdate) {
            return [];
        }
        return latestUpdate;
    } catch (e) {
        console.log(e);
        return [];
    }
};
