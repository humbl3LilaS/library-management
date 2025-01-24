import BookOverview from "@/components/share/book-overview";
import BookList from "@/components/share/book-list";
import { SAMPLE_BOOKS } from "@/constants/placeholder";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth();
    if (!session) {
        redirect("/sign-in");
    }
    return (
        <>
            <BookOverview data={SAMPLE_BOOKS[0]} />
            <BookList title={"Latest Books"} books={SAMPLE_BOOKS} />
        </>
    );
}
