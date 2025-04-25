import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(...inputs));
}

/**
 * Limits a value to a maximum absolute value while preserving its sign
 * @param value The value to limit
 * @param maxAbsValue The maximum absolute value
 * @returns The limited value
 */
export const limitWithSign = (value: number, maxAbsValue: number): number => {
	return Math.abs(value) > maxAbsValue ? maxAbsValue * Math.sign(value) : value;
};
