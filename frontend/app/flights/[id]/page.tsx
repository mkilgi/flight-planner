import { Flight } from "@/lib/utils";

export default async function FlightDetailsPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const flight: Flight = await getFlight(id);
	return (
		<div className="flex flex-col items-center gap-2">
			<p>{flight.id}</p>
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
