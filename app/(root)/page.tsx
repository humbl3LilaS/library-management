import BookOverview from "@/components/share/book-overview";
import BookList from "@/components/share/book-list";
import { SAMPLE_BOOKS } from "@/constants/placeholder";
import config from "@/lib/config";

export default function Home() {
    console.log(config);
    return (
        <>
            <BookOverview data={SAMPLE_BOOKS[0]} />
            <BookList title={"Latest Books"} books={SAMPLE_BOOKS} className={"py-20"} />
        </>
    );
}
