"use client";
import config from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";

const BookVideo = ({ url }: { url: string }) => {
    return (
        <ImageKitProvider
            publicKey={config.env.imageKit.publicKey}
            urlEndpoint={config.env.imageKit.endPoint}
        >
            <IKVideo
                path={url}
                controls={true}
                className={"w-full rounded-xl"}
            />
        </ImageKitProvider>
    );
};

export default BookVideo;
