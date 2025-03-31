import FlightsList from "@/components/custom/flights-list";
import { Suspense } from "react";

export default function FlightsSearchPage() {
	return (
		<div>
			<Suspense>
				<FlightsList />
			</Suspense>
		</div>
	);
}
