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
    extraSmall: "book-cover_extra_small",
    small: "book-cover_small",
    medium: "book-cover_medium",
    regular: "book-cover_regular",
    wide: "book-cover_wide",
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
                    alt={"book cover"}
                    fill
                    className={"rounded-sm object-fill"}
                />
            </div>
        </div>
    );
};

export default BookCover;
