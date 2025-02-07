"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

type UserRole = Unauthorized | "ADMIN";
type Unauthorized = "NOT-LOGIN" | "NOT-VERIFIED" | "USER";

export const checkUserRole = async (): Promise<UserRole> => {
    const session = await auth();
    if (!session) {
        return "NOT-LOGIN";
    }
    const [user] = await db
        .select({ role: users.role, status: users.status })
        .from(users)
        .where(eq(users.id, session.user?.id))
        .limit(1);
    if (!user) {
        return "USER";
    }
    if (user.status !== "APPROVED") {
        return "NOT-VERIFIED";
    }
    return user.role;
};
