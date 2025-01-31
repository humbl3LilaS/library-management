import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/upstash/workflow";

type InitialData = {
    email: string;
    fullName: string;
};

const ONE_DAY = 24 * 60 * 60;
const THREE_DAYS = ONE_DAY * 3;
const THIRTY_DAYS = ONE_DAY * 30;

export const { POST } = serve<InitialData>(async (context) => {
    const { email, fullName } = context.requestPayload;

    await context.run("new-signup", async () => {
        await sendEmail({
            email,
            subject: "Welcome to the platform",
            message: `Welcome ${fullName}!`,
        });
    });
    await context.sleep("wait-for-3-days", THREE_DAYS);

    while (true) {
        const state = await context.run("check-user-state", async () => {
            return await getUserState(email);
        });

        if (state === "non-active") {
            await context.run("send-email-non-active", async () => {
                await sendEmail({
                    email,
                    subject: "Are you still there?",
                    message: `Hey ${fullName}, we miss you`,
                });
            });
        } else if (state === "active") {
            await context.run("send-email-active", async () => {
                await sendEmail({
                    email,
                    subject: "Welcome Back!",
                    message: `Welcome Back ${fullName}!`,
                });
            });
        }

        await context.sleep("wait-for-1-month", THIRTY_DAYS);
    }
});

type UserState = "non-active" | "active" | "not-login";

const getUserState = async (email: string): Promise<UserState> => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) {
        return "non-active";
    }
    const lastActive = new Date(user.lastActive);
    const now = new Date();
    const timeDiff = now.getTime() - lastActive.getTime();
    if (timeDiff > THREE_DAYS * 1000 && timeDiff <= THIRTY_DAYS * 1000) {
        return "non-active";
    }
    return "active";
};
