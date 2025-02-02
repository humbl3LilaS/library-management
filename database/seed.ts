import { SEED_DATA } from "@/database/seed-data";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { imagekit } from "@/image-kit";

export const uploadToImageKit = async (
    url: string,
    fileName: string,
    folder: string
) => {
    try {
        const res = await imagekit.upload({
            file: url,
            fileName,
            folder,
        });
        return res.filePath;
    } catch (e) {
        console.log("error", e);
    }
};

const seed = async () => {
    try {
        console.log("Seeding Data....");
        await db.delete(books);
        const new_books = SEED_DATA.map(async (item) => {
            const coverUrl = await uploadToImageKit(
                item.coverUrl,
                `${item.title}.jpg`,
                "/books/covers"
            );

            const videoUrl = await uploadToImageKit(
                item.videoUrl,
                `${item.title}.mp4`,
                "/books/video"
            );
            if (!coverUrl || !videoUrl) {
                throw new Error("Upload Image Failed");
            }
            return db
                .insert(books)
                .values({
                    ...item,
                    coverUrl,
                    videoUrl,
                })
                .returning();
        });
        await Promise.all(new_books);
        console.log("Seeing Complete");
    } catch (e) {
        if (e instanceof Error) {
            console.log("Seeding Failed: " + e.message);
        }
        console.log("Seeding Failed");
    }
};

try {
    await seed();
} catch (e) {
    console.log(e);
}
