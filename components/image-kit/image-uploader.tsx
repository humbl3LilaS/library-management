"use client";

import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";
import { authenticator } from "@/image-kit/authenticator";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IKUploadResponse } from "imagekitio-next/src/components/IKUpload/props";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
    onFileChange: (valuePath: string) => void;
    value: string;
    folder: string;
    accept: string;
    className?: {
        button?: string;
        file?: string;
    };
};

const ImageUploader = ({ onFileChange, value, folder, accept, className }: ImageUploaderProps) => {
    const ikUploadRef = useRef<HTMLInputElement | null>(null);

    const { toast } = useToast();
    const onError = () => {
        toast({
            title: "Image upload failed",
            variant: "default",
            duration: 1000,
        });
    };
    const onSuccess = (res: IKUploadResponse) => {
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
            />

            <Button
                className={cn(
                    "flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md text-black",
                    className?.button
                )}
                onClick={onUpload}
            >
                <Image src={"/icons/upload.svg"} alt={"upload-icon"} width={20} height={20} />
                <span className={"font-bold"}>Upload Image</span>
                {value && <span className={"block"}>{value}</span>}
            </Button>

            {value && (
                <IKImage
                    alt={value}
                    path={value}
                    width={500}
                    height={300}
                    className={cn("w-full", className?.file)}
                />
            )}
        </ImageKitProvider>
    );
};

export default ImageUploader;
