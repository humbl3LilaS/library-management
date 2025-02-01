import BookOverview from "@/components/share/client/book-overview";
import BookList from "@/components/share/client/book-list";
import { SAMPLE_BOOKS } from "@/constants/placeholder";
import { getLatestBooks } from "@/actions/get-latest-books";

export default async function Home() {
    const latestBooks = await getLatestBooks();
    return (
        <>
            <BookOverview data={SAMPLE_BOOKS[0]} />
            <BookList
                title={"Latest Books"}
                books={latestBooks}
                className={"py-20"}
            />
        </>
    );
}
