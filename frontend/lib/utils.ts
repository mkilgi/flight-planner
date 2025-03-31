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
	planeModel: string;
	lowestTicketPrice: number;
}

export interface FlightsResponse {
	content: Flight[];
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
}

export type Seat = {
	seatNumber: string;
	hasWindow: boolean;
	nearExit: boolean;
	extraLegroom: boolean;
	isBooked: boolean;
	price: number;
};
