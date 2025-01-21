import { NextResponse } from "next/server";
import { imagekit } from "@/image-kit";

export const GET = async () => {
    return NextResponse.json(imagekit.getAuthenticationParameters());
};
