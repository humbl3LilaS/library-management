const config = {
    env: {
        apiEndPoint: process.env.NEXT_PUBLIC_API_END_POINT!,
        imageKit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGE_KIT_PUBLIC_KEY!,
            privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
            endPoint: process.env.NEXT_PUBLIC_IMAGE_KIT_URL_ENDPOINT!,
        },
    },
};

export default config;
