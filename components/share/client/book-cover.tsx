import { cn } from "@/lib/utils";
import Image from "next/image";
import BookCoverSvg from "@/components/share/client/book-cover-svg";

type BookCoverVariants = "extraSmall" | "small" | "medium" | "regular" | "wide";

type BookCoverProps = {
    variant?: BookCoverVariants;
    className?: string;
    coverColor?: string;
    coverUrl?: string;
};

const variantStyles: Record<BookCoverVariants, string> = {
    extraSmall: "books-cover_extra_small",
    small: "books-cover_small",
    medium: "books-cover_medium",
    regular: "books-cover_regular",
    wide: "books-cover_wide",
};

const BookCover = ({
    variant = "regular",
    coverColor = "#012b48",
    coverUrl = "https://placehold.co/400x600.png",
    className,
}: BookCoverProps) => {
    return (
        <div
            className={cn(
                "relative transition-all duration-300",
                variantStyles[variant],
                className
            )}
        >
            <BookCoverSvg coverColor={coverColor} />
            <div className={"absolute z-10"} style={{ left: "12%", width: "87.5%", height: "88%" }}>
                <Image
                    src={coverUrl}
                    alt={"books cover"}
                    fill
                    className={"rounded-sm object-fill"}
                />
            </div>
        </div>
    );
};

export default BookCover;
