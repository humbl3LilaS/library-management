"use server";

import { AuthErrorCause } from "@/error/auth-error";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { ratelimit } from "@/upstash/ratelimit";
import { headers } from "next/headers";

export const signInWithCredentials = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<{ success: true } | { success: false; cause: AuthErrorCause }> => {
    try {
        //rate limiting
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
