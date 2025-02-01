"use client";
import { cn } from "@/lib/utils";
import BookCoverSvg from "@/components/share/client/book-cover-svg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import { cva, VariantProps } from "class-variance-authority";

const bookCover = cva([], {
    variants: {
        variant: {
            extraSmall: "w-[28.95px] h-10",
            small: "w-[55px] h-[76px]",
            medium: "w-[144px] h-[199px]",
            regular: "xs:w-[174px] w-[114px] xs:h-[239px] h-[169px]",
            wide: "xs:w-[296px] w-[256px] xs:h-[404px] h-[354px]",
        },
    },
    defaultVariants: {
        variant: "regular",
    },
});

type BookCoverVariants = VariantProps<typeof bookCover>;

interface BookCoverProps extends BookCoverVariants {
    className?: string;
    coverColor: string;
    coverUrl: string;
}

const BookCover = ({
    variant,
    coverColor,
    coverUrl,
    className,
}: BookCoverProps) => {
    return (
        <div
            className={cn(
                "relative transition-all duration-300",
                bookCover({ variant }),
                className
            )}
        >
            <BookCoverSvg coverColor={coverColor} />
            <div
                className={"absolute z-10"}
                style={{ left: "12%", width: "87.5%", height: "88%" }}
            >
                <IKImage
                    path={coverUrl}
                    alt={"books cover"}
                    urlEndpoint={config.env.imageKit.endPoint}
                    fill
                    className={" rounded-sm object-fill"}
                />
            </div>
        </div>
    );
};

export default BookCover;
