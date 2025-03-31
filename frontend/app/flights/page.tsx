import FlightsList from "@/components/custom/flights-list";
import { Suspense } from "react";

export default function FlightsSearchPage() {
	return (
		<div className="flex flex-col items-center">
			<Suspense>
				<FlightsList />
			</Suspense>
		</div>
	);
}
