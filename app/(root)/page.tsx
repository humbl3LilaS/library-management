import BookOverview from "@/components/home/book-overview";
import BookList from "@/components/home/book-list";
import { SAMPLE_BOOKS } from "@/constants/placeholder";

export default function Home() {
    return (
        <>
            <BookOverview data={SAMPLE_BOOKS[0]} />
            <BookList title={"Latest Books"} books={SAMPLE_BOOKS} />
        </>
    );
}
