import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkflowClient({
    baseUrl: process.env.UPSTASH_QSTASH_URL!,
    token: process.env.UPSTASH_QSTASH_TOKEN!,
});

const qstashClient = new QStashClient({
    token: process.env.UPSTASH_QSTASH_TOKEN!,
});

type SendEmailPayload = {
    email: string;
    subject: string;
    message: string;
};
export const sendEmail = async ({ email, subject, message }: SendEmailPayload) => {
    await qstashClient.publishJSON({
        api: {
            name: "email",
            provider: resend({
                token: process.env.RESEND_API_KEY!,
            }),
        },
        body: {
            from: "Pale Edelweiss <noti.pale-edelweiss.tech>",
            to: [email],
            subject,
            html: message,
        },
    });
};
