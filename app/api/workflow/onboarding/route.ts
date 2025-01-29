import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/upstash/workflow";

type InitialData = {
    email: string;
    fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = ONE_DAY_IN_MS * 3;
const THIRTY_DAYS_IN_MS = ONE_DAY_IN_MS * 30;

export const { POST } = serve<InitialData>(async (context) => {
    const { email, fullName } = context.requestPayload;

    await context.run("new-signup", async () => {
        await sendEmail({
            email,
            subject: "Welcome to the platform",
            message: `Welcome ${fullName}!`,
        });
    });
    await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS);

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

        await context.sleep("wait-for-1-month", THIRTY_DAYS_IN_MS);
    }
});

type UserState = "non-active" | "active" | "not-login";

const getUserState = async (email: string): Promise<UserState> => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) {
        return "non-active";
    }
    const lastActive = new Date(user.lastActive);
    const timeDiff = new Date().getTime() - lastActive.getTime();
    if (timeDiff > THREE_DAYS_IN_MS && timeDiff <= THIRTY_DAYS_IN_MS) {
        return "non-active";
    }
    return "active";
};
