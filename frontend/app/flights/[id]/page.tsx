import FlightDetails from "@/components/custom/flight-details";
import SeatSelection from "@/components/custom/seat-selection";
import { Flight, Seat } from "@/lib/utils";

export default async function FlightDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const flight: Flight = await getFlight(id);
	const seats: Seat[] = await getSeatsForFlight(id);
	return (
		<div className="flex flex-col items-center gap-4 bg-muted py-6">
			<div className="max-w-[64rem] flex flex-col gap-4">
				{flight && <FlightDetails flight={flight} key={flight.id} />}
				{seats && <SeatSelection seats={seats} />}
			</div>
		</div>
	);
}

async function getFlight(id: string) {
	const API_URL = process.env.API_URL;
	try {
		const response = await fetch(`${API_URL}/flights/${id}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch flight: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

async function getSeatsForFlight(id: string) {
	const API_URL = process.env.API_URL;
	try {
		const response = await fetch(`${API_URL}/flights/${id}/seats`);
		if (!response.ok) {
			throw new Error(`Failed to fetch seats for flight: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
