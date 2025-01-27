import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/upstash/redis";

export const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});
