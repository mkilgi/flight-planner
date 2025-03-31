import { Flight } from "@/lib/utils";
import { Clock, Plane, Ruler } from "lucide-react";

interface FlightDetailsProps {
	flight: Flight;
}

export default function FlightDetails({ flight }: FlightDetailsProps) {
	const arrival = new Date(flight.arrivalTime);
	const departure = new Date(flight.departureTime);
	return (
		<div className="border rounded-lg p-4 bg-background mx-2 shadow-md">
			<div className="grid gap-6">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<h2 className="text-2xl font-bold">
							{flight.origin} → {flight.destination}
						</h2>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					<div className="flex items-start gap-3">
						<Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
						<div>
							<h3 className="font-medium">Departure</h3>
							<p className="text-lg">{departure.toDateString()}</p>
							<p className="text-lg">{departure.toLocaleTimeString("en-GB")}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
						<div>
							<h3 className="font-medium">Arrival</h3>
							<p className="text-lg">{arrival.toDateString()}</p>
							<p className="text-lg">{arrival.toLocaleTimeString("en-GB")}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Plane className="h-5 w-5 text-muted-foreground mt-1" />
						<div>
							<h3 className="font-medium">Plane</h3>
							<p className="text-lg">{flight.planeModel}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Ruler className="h-5 w-5 text-muted-foreground mt-1" />
						<div>
							<h3 className="font-medium">Distance</h3>
							<p className="text-lg">{flight.distance} km</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
