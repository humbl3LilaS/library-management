"use server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { and, eq, ne } from "drizzle-orm";

export const updateUserLastActivity = async (userId: string) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    await db
        .update(users)
        .set({
            lastActive: currentDate,
        })
        .where(and(eq(users.id, userId), ne(users.lastActive, currentDate)))
        .returning();
};
