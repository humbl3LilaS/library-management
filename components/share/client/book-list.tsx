import { cn } from "@/lib/utils";
import BookCard from "@/components/share/client/book-card";
import { IBook } from "@/database/schema";

type BookListProps = {
    title: string;
    books: IBook[];
    className?: string;
};

const BookList = ({ title, books, className }: BookListProps) => {
    return (
        <section className={cn(className)}>
            <h2 className={"font-bebas-neue text-4xl text-light-100"}>
                {title}
            </h2>
            <div
                className={
                    "mt-10  grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                }
            >
                {books.map((book) => (
                    <BookCard data={book} key={book.id} />
                ))}
            </div>
        </section>
    );
};

export default BookList;
