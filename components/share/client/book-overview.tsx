import Image from "next/image";
import BookCover from "@/components/share/client/book-cover";
import { IBook } from "@/database/schema";
import BookBorrowBtn from "@/feature/client/books/componenets/book-borrow-btn";

const BookOverview = ({ data }: { data: IBook }) => {
    return (
        <section className={"book-overview"}>
            <div className={"flex flex-1 flex-col gap-5"}>
                <h1>{data.title}</h1>

                {/*Book Info*/}
                <div className={"book-info"}>
                    <p>
                        By{" "}
                        <span className={"font-semibold text-light-200"}>
                            {data.author}
                        </span>
                    </p>
                    <p>
                        Category&nbsp;
                        <span className={"font-semibold text-light-200"}>
                            {data.genre}
                        </span>
                    </p>
                    <div className={"flex flex-row gap-1"}>
                        <Image
                            src={"/icons/star.svg"}
                            alt={"start"}
                            width={22}
                            height={22}
                        />
                        <p>{data.rating}</p>
                    </div>
                </div>

                {/*Book Availability*/}
                <div className={"book-copies"}>
                    <p>
                        Total Books: <span>{data.totalCopies}</span>
                    </p>
                    <p>
                        Available Books <span>{data.availableCopies}</span>
                    </p>
                </div>

                {/* Book Description */}
                <p className={"book-description"}>{data.description}</p>

                <BookBorrowBtn />
            </div>
            <div className={"relative flex flex-1 justify-center"}>
                <div className="relative">
                    <BookCover
                        variant={"wide"}
                        className={"z-10"}
                        coverColor={data.coverColor}
                        coverUrl={data.coverUrl}
                    />
                </div>
                <div className="absolute right-16 top-10 rotate-12 opacity-40 max-sm:hidden">
                    <BookCover
                        variant={"wide"}
                        coverColor={data.coverColor}
                        coverUrl={data.coverUrl}
                    />
                </div>
            </div>
        </section>
    );
};

export default BookOverview;
