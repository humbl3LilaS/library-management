"use server";

import { AuthErrorCause } from "@/error/AuthError";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const signInWithCredentials = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<{ success: true } | { success: false; cause: AuthErrorCause }> => {
    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            return {
                success: false,
                cause: {
                    reason: "Error Signing In: Invalid Credentials",
                } as AuthErrorCause,
            };
        }
        return { success: true };
    } catch (e: unknown) {
        if (e instanceof CredentialsSignin) {
            return {
                success: false,
                cause: {
                    reason: e.cause?.err?.message ?? "Invalid Credential",
                },
            };
        } else {
            return {
                success: false,
                cause: {
                    reason: "Error during Signing in process",
                } as AuthErrorCause,
            };
        }
    }
};
