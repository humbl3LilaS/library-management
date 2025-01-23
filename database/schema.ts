import { date, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);
export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);
export const BOOK_STATUS_ENUM = pgEnum("book_status", ["BORROWED", "RETURNED"]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: text("university_id").notNull().unique(),
    password: text("password").notNull(),
    idCard: text("id_card").notNull(),
    status: STATUS_ENUM("status").default("PENDING"),
    role: ROLE_ENUM("role").default("USER"),
    lastActive: date("last_active").defaultNow(),
    createAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const userInsertSchema = createInsertSchema(users);
export type IUser = Zod.infer<typeof userInsertSchema>;
