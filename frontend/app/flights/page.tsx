import FlightFilters from "@/components/custom/flight-filters";
import FlightsList from "@/components/custom/flights-list";
import { Suspense } from "react";

export default function FlightsSearchPage() {
	return (
		<div className="flex flex-col items-center gap-3">
			<Suspense>
				<FlightFilters />
			</Suspense>
			<Suspense>
				<FlightsList />
			</Suspense>
		</div>
	);
}
