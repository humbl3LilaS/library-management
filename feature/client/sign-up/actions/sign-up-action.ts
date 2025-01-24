import { IUser, users } from "@/database/schema";
import { AuthErrorCause, IAuthError } from "@/error/AuthError";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signInWithCredentials } from "@/feature/client/sign-in/actions/sign-in-action";

export const signUp = async (
    params: Omit<IUser, "id">
): Promise<{ success: true } | { success: false; cause: AuthErrorCause }> => {
    try {
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
                } as AuthErrorCause,
            };
        }

        await signInWithCredentials({ email: params.email, password: hashedPassword });
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
                } as AuthErrorCause,
            };
        }
    }
};
