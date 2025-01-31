import { IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { authenticator } from "@/image-kit/authenticator";
import config from "@/lib/config";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IKUploadResponse } from "imagekitio-next/src/components/IKUpload/props";
import { Loader2 } from "lucide-react";

type VideoUploaderProps = {
    onFileChange: (valuePath: string) => void;
    value: string;
    folder: string;
    accept: string;
};

const VideoUploader = ({ onFileChange, value, folder, accept }: VideoUploaderProps) => {
    const ikUploadRef = useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();
    const onError = () => {
        setUploading(false);
        toast({
            title: "Video upload failed",
            variant: "default",
            duration: 1000,
        });
    };
    const onSuccess = (res: IKUploadResponse) => {
        setUploading(false);
        onFileChange(res.filePath);
        toast({
            title: "Video uploaded successfully",
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

    const onValidate = (file: File) => {
        if (file.size > 50 * 1024 * 1024) {
            toast({
                title: "File size too large",
                description: "Please upload a file that is less than 50MB in size",
                variant: "destructive",
            });
            return false;
        }
        return true;
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
                validateFile={onValidate}
                onUploadStart={() => setUploading(true)}
                folder={folder}
                accept={accept}
            />

            <Button
                className={
                    "flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md text-black"
                }
                onClick={onUpload}
            >
                {uploading ? (
                    <Loader2 className={"animate-spin"} />
                ) : (
                    <Image src={"/icons/upload.svg"} alt={"upload-icon"} width={20} height={20} />
                )}
                <span className={"font-bold"}>
                    {uploading ? "Uploading Video" : "Upload Video"}
                </span>
                {value && <span className={"block"}>{value}</span>}
            </Button>

            {value && <IKVideo path={value} controls={true} className={"h-96 w-full rounded-xl"} />}
        </ImageKitProvider>
    );
};
export default VideoUploader;
