import config from "@/lib/config";
import ImageKit from "imagekit";

export const imagekit = new ImageKit({
    publicKey: config.env.imageKit.publicKey,
    urlEndpoint: config.env.imageKit.endPoint,
    privateKey: config.env.imageKit.privateKey,
});
