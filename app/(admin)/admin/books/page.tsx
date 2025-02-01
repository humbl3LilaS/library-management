import { Button } from "@/components/ui/button";
import Link from "next/link";

const BookPage = () => {
    return (
        <section className={"w-full p-7 rounded-2xl bg-white shadow-sm"}>
            <div
                className={"flex flex-wrap items-center justify-between gap-4"}
            >
                <h2 className={"text-xl font-semibold"}>All Books</h2>
                <Button
                    asChild={true}
                    className={
                        "bg-primary-admin text-white hover:bg-primary-admin/80 transition-colors duration-500"
                    }
                >
                    <Link href={"/admin/books/new"}>+ Create New Book</Link>
                </Button>
            </div>
            <div className={"w-full mt-7 overflow-hidden"}>
                <p>Book Table</p>
            </div>
        </section>
    );
};

export default BookPage;
