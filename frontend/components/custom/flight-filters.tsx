"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CityCombobox } from "./city-filter-box";
import { DateRangePicker } from "./date-range-filter";
import { PriceFilter } from "./price-filter";

const CITIES = [
	"Tallinn",
	"Helsinki",
	"Riga",
	"Vilnius",
	"Oslo",
	"Stockholm",
	"Copenhagen",
	"Warsaw",
	"Berlin",
	"Prague",
	"Amsterdam",
	"Paris",
	"London",
	"Edinburgh",
	"Dublin",
	"Vienna",
	"Budapest",
	"Bratislava",
	"Munich",
	"Belgrade",
	"Bucharest",
	"Zagreb",
	"Rome",
	"Milan",
	"Barcelona",
	"Madrid",
	"Lisbon",
	"Athens",
	"Marseille",
	"Hamburg",
	"Kyiv",
	"Odessa",
	"Minsk",
	"Sofia",
	"Istanbul",
]; // :)

/**
 * Flight fliters push filtering params to url and flights-list reacts to url changes
 */

export default function FlightFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateParam = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete("page");

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`?${params.toString()}`, { scroll: false });
	};

	const handleDateChange = (range: { departureFrom?: string; departureTo?: string }) => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete("page");
		params.delete("departureFrom");
		params.delete("departureTo");

		if (range.departureFrom) params.set("departureFrom", range.departureFrom);
		if (range.departureTo) params.set("departureTo", range.departureTo);

		router.push(`?${params.toString()}`, { scroll: false });
	};

	return (
		<div className="flex flex-col items-center gap-2 md:flex-row bg-muted w-full justify-center py-4">
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

			<DateRangePicker
				departureFrom={searchParams.get("departureFrom") || undefined}
				departureTo={searchParams.get("departureTo") || undefined}
				onDateChange={handleDateChange}
			/>

			<PriceFilter
				value={searchParams.get("maxPrice") || ""}
				onChange={(value) => updateParam("maxPrice", value)}
			/>
		</div>
	);
}
