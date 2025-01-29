"use server";
import { IUser, users } from "@/database/schema";
import { AuthErrorCause, IAuthError } from "@/error/AuthError";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signInWithCredentials } from "@/feature/client/sign-in/actions/sign-in-action";
import { ratelimit } from "@/upstash/ratelimit";
import { headers } from "next/headers";
import { workflowClient } from "@/upstash/workflow";

export const signUp = async (
    params: Omit<IUser, "id">
): Promise<{ success: true } | { success: false; cause: AuthErrorCause }> => {
    try {
        // rate limiting
        const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return {
                success: false,
                cause: {
                    reason: "Too Many Actions",
                    redirect: true,
                },
            };
        }

        const [existingUser] = await db.select().from(users).where(eq(users.email, params.email));
        if (existingUser) {
            throw new IAuthError("Existing User Email", {
                cause: {
                    reason: "Existing User Email",
                    field: ["email"],
                },
            });
        }

        const hashedPassword = await hash(params.password, 10);
        const new_user = await db
            .insert(users)
            .values({
                ...params,
                password: hashedPassword,
            })
            .returning();

        if (!new_user) {
            return {
                success: false,
                cause: {
                    reason: "Error Creating new user",
                },
            };
        }
        await workflowClient.trigger({
            url: `${process.env.NEXT_PUBLIC_API_END_POINT}/api/workflow/onboarding`,
            body: {
                email: params.email,
                fullName: new_user[0].fullName,
            },
        });
        await signInWithCredentials({ email: params.email, password: params.password });
        return { success: true };
    } catch (e: unknown) {
        if (e instanceof IAuthError) {
            return {
                success: false,
                cause: e.cause || {
                    reason: e.message,
                },
            };
        } else {
            return {
                success: false,
                cause: {
                    reason: "Error Signing Up",
                },
            };
        }
    }
};
