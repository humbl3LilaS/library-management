import {
    date,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const STATUS_ENUM = pgEnum("status", [
    "PENDING",
    "APPROVED",
    "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);
export const BORROW_STATUS_ENUM = pgEnum("book_status", [
    "BORROWED",
    "RETURNED",
]);

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: text("university_id").notNull().unique(),
    password: text("password").notNull(),
    idCard: text("id_card").notNull(),
    status: STATUS_ENUM("status").default("PENDING").notNull(),
    role: ROLE_ENUM("role").default("USER").notNull(),
    lastActive: date("last_active").defaultNow().notNull(),
    createAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const books = pgTable("books", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    genre: varchar("genre", { length: 255 }).notNull(),
    rating: integer("rating").notNull(),
    coverUrl: text("cover_url").notNull(),
    coverColor: varchar("cover_color", { length: 255 }).notNull(),
    description: text("description").notNull(),
    totalCopies: integer("total_copies").notNull().default(1),
    availableCopies: integer("available_copies").notNull().default(0),
    videoUrl: text("video_url").notNull(),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const borrowRecords = pgTable("borrow_records", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id")
        .references(() => users.id)
        .notNull(),
    bookId: uuid("book_id").references(() => books.id),
    borrowDate: timestamp("borrow_date", { withTimezone: true })
        .defaultNow()
        .notNull(),
    dueDate: date("due_date").notNull(),
    returnDate: date("return_date"),
    status: BORROW_STATUS_ENUM("STATUS_ENUM").default("BORROWED").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

// Zod Schemas
export const userInsertSchema = createInsertSchema(users, {
    fullName: (schema) => schema.min(5).max(30),
    email: (schema) => schema.email(),
    password: (schema) => schema.min(8),
}).omit({
    id: true,
    lastActive: true,
    createAt: true,
    status: true,
    role: true,
});

export type IUserInsert = Zod.infer<typeof userInsertSchema>;

export const bookInsertSchema = createInsertSchema(books, {
    title: z.string().trim().min(2).max(100),
    author: z.string().trim().min(2).max(100),
    description: z.string().trim().min(2).max(100),
    genre: z.string().trim().min(2).max(50),
    rating: z.coerce.number().min(1).max(5),
    totalCopies: z.coerce.number().int().positive().lte(1000),
    coverUrl: z.string().min(1),
    coverColor: z
        .string()
        .trim()
        .regex(/^#[0-9A-F]{6}$/i),
    videoUrl: z.string().min(1),
    summary: z.string().trim().min(10),
});

export const bookSchema = createSelectSchema(books);

export type IBook = Zod.infer<typeof bookSchema>;
export type IBookInsert = Zod.infer<typeof bookInsertSchema>;

export const borrowRecordsSchema = createSelectSchema(borrowRecords);
export type IBorrowRecord = Zod.infer<typeof borrowRecordsSchema>;
