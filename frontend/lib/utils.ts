import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface Flight {
	id: number;
	origin: string;
	destination: string;
	distance: number;
	departureTime: string;
	arrivalTime: string;
	lowestAvailableTicketPrice: number;
}

export interface FlightsResponse {
	content: Flight[];
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
}
