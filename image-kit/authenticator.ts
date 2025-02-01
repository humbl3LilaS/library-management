import config from "@/lib/config";

export const authenticator = async () => {
    const response = await fetch(`${config.env.apiEndPoint}/api/imagekit`);

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Request failed with status ${response.status}: ${errorText}`
        );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
};
