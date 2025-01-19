import { IBook } from "@/types/index.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/home/book-cover";

const BookOverview = ({ data }: { data: IBook }) => {
    return (
        <section className={"book-overview"}>
            <div className={"flex flex-1 flex-col gap-5"}>
                <h1>{data.title}</h1>

                {/*Book Info*/}
                <div className={"book-info"}>
                    <p>
                        By <span className={"font-semibold text-light-200"}>{data.author}</span>
                    </p>
                    <p>
                        Category&nbsp;
                        <span className={"font-semibold text-light-200"}>{data.genre}</span>
                    </p>
                    <div className={"flex flex-row gap-1"}>
                        <Image src={"/icons/star.svg"} alt={"start"} width={22} height={22} />
                        <p>{data.rating}</p>
                    </div>
                </div>

                {/*Book Availability*/}
                <div className={"book-copies"}>
                    <p>
                        Total Books: <span>{data.total_copies}</span>
                    </p>
                    <p>
                        Available Books <span>{data.available_copies}</span>
                    </p>
                </div>

                {/* Book Description */}
                <p className={"book-description"}>{data.description}</p>

                <Button className={"book-overview_btn"}>
                    <Image src={"/icons/book.svg"} alt={"book"} width={20} height={20} />
                    <span className={"font-bebas-neue text-xl text-bark-100"}>Borrow</span>
                </Button>
            </div>
            <div className={"relative flex flex-1 justify-center"}>
                <div className="relative">
                    <BookCover
                        variant={"wide"}
                        className={"z-10"}
                        coverColor={data.color}
                        coverUrl={data.cover}
                    />
                </div>
                <div className="absolute right-16 top-10 rotate-12 opacity-40 max-sm:hidden">
                    <BookCover variant={"wide"} coverColor={data.color} coverUrl={data.cover} />
                </div>
            </div>
        </section>
    );
};

export default BookOverview;
