"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { borrowBook } from "@/feature/client/books/actions/borrow-book-action";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const BookBorrowBtn = () => {
    const params = useParams();
    const bookId = params.slug as string;
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onBorrow = async () => {
        setIsSubmitting(true);
        const session = await getSession();
        if (!session) {
            return toast({
                title: "Failed to Borrow Book",
                description: "User not authorized",
                variant: "destructive",
            });
        }
        const res = await borrowBook({ bookId, userId: session?.user?.id });
        if (!res.success) {
            return toast({
                title: "Failed to Borrow Book",
                description: res.cause.reason,
                variant: "destructive",
            });
        }
        toast({
            title: " Success",
            description: "Successfully Borrow the Book",
        });
        setIsSubmitting(false);
    };
    return (
        <Button className={"book-overview_btn"} onClick={onBorrow}>
            {isSubmitting ? (
                <Loader2 className={"animate-spin"} />
            ) : (
                <Image
                    src={"/icons/book.svg"}
                    alt={"books"}
                    width={20}
                    height={20}
                />
            )}
            <span className={"font-bebas-neue text-xl text-bark-100"}>
                {isSubmitting ? "Borrowing Book" : "Borrow"}
            </span>
        </Button>
    );
};

export default BookBorrowBtn;
