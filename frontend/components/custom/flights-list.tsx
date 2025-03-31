"use client";

import { FlightsResponse } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FlightCard } from "./flight-card";

export default function FlightsList() {
	const searchParams = useSearchParams();
	const [flightsResponse, setFlightsResponse] = useState<FlightsResponse | null>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFlights = async () => {
			try {
				const params = new URLSearchParams(searchParams.toString());

				const response = await fetch(`/api/flights?${params.toString()}`);

				if (!response.ok) {
					setError(response.statusText);
					return;
				}

				const data = await response.json();

				setFlightsResponse(data);
			} catch (error) {
				setError(error instanceof Error ? error.message : "An unknown error occurred");
				console.error("Failed to fetch flights:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFlights();
	}, [searchParams]);

	if (error) {
		return (
			<div className="w-full max-w-[64rem] text-red-500 p-4 border border-red-200 rounded-lg">Error: {error}</div>
		);
	}

	if (loading) return <div>Loading flights...</div>;

	return (
		<div className="w-full max-w-[64rem]">
			<div className="flex flex-col gap-4 mx-2">
				{error ? (
					<p>error</p>
				) : (
					flightsResponse?.content.map((flight) => <FlightCard key={flight.id} flight={flight} />)
				)}
			</div>
		</div>
	);
}
