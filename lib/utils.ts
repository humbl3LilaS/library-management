import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const parseUserAlisa = (name: string) => {
    const arr = name.split(" ");
    if (arr.length >= 2) {
        return arr[0].charAt(0).toUpperCase() + arr[1].charAt(0).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
};
