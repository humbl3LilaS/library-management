import { getBookById } from "@/feature/client/books/actions/get-book-by-id";
import { notFound } from "next/navigation";
import BookOverview from "@/components/share/client/book-overview";
import BookVideo from "@/feature/client/books/componenets/book-video";

const BookDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const book = await getBookById(slug);

    if (!book.success) {
        return notFound();
    }
    return (
        <>
            <BookOverview data={book.data} />
            <div className={"pt-16 pb-20 text-white"}>
                <section>
                    <h3
                        className={
                            "text-primary text-xl font-semibold mb-5 md:text-2xl lg:text-3xl"
                        }
                    >
                        Video
                    </h3>
                    <BookVideo url={book.data.videoUrl} />
                </section>
                <section
                    className={"mt-6  font-ibm-plex-sans  md:mt-8 lg:mt-10"}
                >
                    <h3
                        className={
                            "text-primary font-semibold md:text-2xl lg:text-3xl"
                        }
                    >
                        Summary
                    </h3>
                    <div
                        className={
                            "my-5 text-xl flex flex-col gap-y-1 md:gap-y-2 "
                        }
                    >
                        {book.data.summary.split("\n").map((line, idx) => (
                            <p key={idx}>{line}</p>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default BookDetailPage;
