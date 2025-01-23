import NextAuth, { User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials?.email.toString()))
                    .limit(1);

                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(
                    credentials.password.toString(),
                    user.password
                );
                if (!isPasswordValid) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.fullName,
                } as User;
            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ token, session }) {
            if (token.id) {
                session = {
                    ...session,
                    user: {
                        ...session.user,
                        id: token.id.toString(),
                        name: token.name as string,
                    },
                };
            }

            return session;
        },
    },
});
