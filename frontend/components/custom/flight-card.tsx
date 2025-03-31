"use client";

import { Plane } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Flight } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

/**
 * Used shadcn example card
 * https://ui.shadcn.com/docs/components/card
 */

export function FlightCard({ flight }: { flight: Flight }) {
	const formattedPrice = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "EUR",
	}).format(flight.lowestTicketPrice);

	const arrival = new Date(flight.arrivalTime);
	const departure = new Date(flight.departureTime);
	const router = useRouter();

	return (
		<Card className="shadow-md gap-2">
			<CardContent>
				<div className="flex flex-col gap-1">
					<div className="text-lg font-semibold">
						{flight.origin} → {flight.destination}
					</div>

					<div className="flex items-center gap-4">
						<div className="grid gap-1">
							<div className="text-muted-foreground text-sm">Departure</div>
							<div className="font-medium">{departure.toDateString()}</div>
							<div className="font-medium">{departure.toLocaleTimeString("en-GB")}</div>
						</div>

						<div className="flex flex-1 items-center px-2">
							<div className="bg-border h-px flex-1"></div>
							<Plane className="text-muted-foreground mx-2 h-4 w-4" />
							<div className="bg-border h-px flex-1"></div>
						</div>

						<div className="grid gap-1 text-right">
							<div className="text-muted-foreground text-sm">Arrival</div>
							<div className="font-medium">{arrival.toDateString()}</div>
							<div className="font-medium">{arrival.toLocaleTimeString("en-GB")}</div>
						</div>
					</div>
					<div className="flex flex-row justify-between">
						<p className="text-muted-foreground text-sm">Distance: {flight.distance} km</p>
						<p className="text-muted-foreground text-sm">Plane: {flight.planeModel}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					className="hover:cursor-pointer"
					onClick={() => {
						router.push(`/flights/${flight.id}`);
					}}
				>
					Starting at {formattedPrice}
				</Button>
			</CardFooter>
		</Card>
	);
}
