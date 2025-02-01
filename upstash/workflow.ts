import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
    token: config.env.upstash.qstashToken,
});

type SendEmailPayload = {
    email: string;
    subject: string;
    message: string;
};
export const sendEmail = async ({
    email,
    subject,
    message,
}: SendEmailPayload) => {
    await qstashClient.publishJSON({
        api: {
            name: "email",
            provider: resend({
                token: config.env.resend.token,
            }),
        },
        body: {
            from: "PaleEdelweiss <noti@noti.pale-edelweiss.tech>",
            to: [email],
            subject,
            html: message,
        },
    });
};
