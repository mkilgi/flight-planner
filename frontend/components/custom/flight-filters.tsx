"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CityCombobox } from "./city-filter-box";

const CITIES = ["Tallinn", "Helsinki", "Riga", "Berlin"]; // TODO

/**
 * Flight fliters push filtering params to url and flights-list reacts to url changes
 */

export default function FlightFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateParam = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
			<CityCombobox
				value={searchParams.get("origin") || ""}
				onValueChange={(value) => updateParam("origin", value)}
				cities={CITIES}
				placeholder="Select origin..."
			/>

			<CityCombobox
				value={searchParams.get("destination") || ""}
				onValueChange={(value) => updateParam("destination", value)}
				cities={CITIES}
				placeholder="Select destination..."
			/>
		</div>
	);
}
