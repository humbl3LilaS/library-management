import { IBook } from "@/types/index.types";
import Link from "next/link";
import BookCover from "@/components/share/client/book-cover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const BookCard = ({ data }: { data: IBook }) => {
    return (
        <article className={cn(data.isLoaned && "max-sm:col-span-2")}>
            <Link
                href={`/books/${data.id}`}
                className={cn(data.isLoaned && "max-sm:w-full max-sm:flex flex-col items-center")}
            >
                <BookCover coverColor={data.color} coverUrl={data.cover} />
            </Link>
            <div
                className={cn(
                    "mt-4",
                    data.isLoaned && "xs:max-w-40 max-sm:max-w-28 max-sm:mx-auto"
                )}
            >
                <h3 className={"book-title"}>
                    <Link href={`/books/${data.id}`}>{data.title}</Link>
                </h3>
                <p className={"book-genre"}>{data.genre}</p>
            </div>
            {data.isLoaned && (
                <div className={"mt-3 w-full"}>
                    <div className={"book-loaned"}>
                        <Image
                            src={"/icons/calendar.svg"}
                            alt={"calendar"}
                            width={18}
                            height={18}
                            className={"object-contain"}
                        />
                        <p className={"text-light-100"}>11 days left to return</p>
                    </div>
                    <Button className={"book-btn"}>Download receipt</Button>
                </div>
            )}
        </article>
    );
};

export default BookCard;
