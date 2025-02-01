"use client";

import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { authenticator } from "@/image-kit/authenticator";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IKUploadResponse } from "imagekitio-next/src/components/IKUpload/props";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";

export const imageUploader = cva(
    ["flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md "],
    {
        variants: {
            variant: {
                light: [
                    "text-white bg-primary-admin hover:bg-primary-admin/80 transition-colors duration-500",
                ],
                dark: ["text-black"],
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);

type ImageUploaderVarient = VariantProps<typeof imageUploader>;

interface ImageUploaderProps extends ImageUploaderVarient {
    onFileChange: (valuePath: string) => void;
    value: string;
    folder: string;
    accept: string;
}

const ImageUploader = ({
    onFileChange,
    value,
    folder,
    accept,
    variant,
}: ImageUploaderProps) => {
    const ikUploadRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();
    const onError = () => {
        setUploading(false);
        toast({
            title: "Image upload failed",
            variant: "default",
            duration: 1000,
        });
    };
    const onSuccess = (res: IKUploadResponse) => {
        setUploading(false);
        onFileChange(res.filePath);
        toast({
            title: "Image uploaded successfully",
            description: `${value} uploaded`,
            duration: 1000,
        });
    };

    const onUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (ikUploadRef.current) {
            ikUploadRef.current.click();
        }
    };

    return (
        <ImageKitProvider
            publicKey={config.env.imageKit.publicKey}
            urlEndpoint={config.env.imageKit.endPoint}
            authenticator={authenticator}
        >
            <IKUpload
                className="hidden"
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                folder={folder}
                accept={accept}
                onUploadStart={() => setUploading(true)}
            />

            <Button
                onClick={onUpload}
                className={cn(imageUploader({ variant }))}
            >
                {uploading ? (
                    <Loader2 className={"animate-spin"} />
                ) : (
                    <Image
                        src={"/icons/upload.svg"}
                        alt={"upload-icon"}
                        width={20}
                        height={20}
                    />
                )}
                <span className={"font-bold"}>
                    {uploading ? "Uploading Image" : "Upload Image"}
                </span>
                {value && <span className={"block"}>{value}</span>}
            </Button>

            {value && (
                <IKImage
                    alt={value}
                    path={value}
                    width={500}
                    height={300}
                    className={"w-full"}
                />
            )}
        </ImageKitProvider>
    );
};

export default ImageUploader;
