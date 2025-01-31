import { IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { authenticator } from "@/image-kit/authenticator";
import config from "@/lib/config";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IKUploadResponse } from "imagekitio-next/src/components/IKUpload/props";

type VideoUploaderProps = {
    onFileChange: (valuePath: string) => void;
    value: string;
    folder: string;
    accept: string;
};

const VideoUploader = ({ onFileChange, value, folder, accept }: VideoUploaderProps) => {
    const ikUploadRef = useRef<HTMLInputElement | null>(null);
    const [progress, setProgress] = useState(0);

    const { toast } = useToast();
    const onError = () => {
        toast({
            title: "Video upload failed",
            variant: "default",
            duration: 1000,
        });
    };
    const onSuccess = (res: IKUploadResponse) => {
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
                onUploadStart={() => setProgress(0)}
                onUploadProgress={({ loaded, total }) => {
                    const percent = Math.round((loaded / total) * 100);
                    setProgress(percent);
                }}
                folder={folder}
                accept={accept}
            />

            <Button
                className={
                    "flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md text-black"
                }
                onClick={onUpload}
            >
                <Image src={"/icons/upload.svg"} alt={"upload-icon"} width={20} height={20} />
                <span className={"font-bold"}>Upload Video</span>
                {value && <span className={"block"}>{value}</span>}
            </Button>

            {progress > 0 && progress !== 100 && (
                <div className="w-full rounded-full bg-green-200">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>
            )}

            {value && <IKVideo path={value} controls={true} className={"h-96 w-full rounded-xl"} />}
        </ImageKitProvider>
    );
};
export default VideoUploader;
