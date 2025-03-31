"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Seat } from "@/lib/utils";

interface SeatSelectionProps {
	seats: Seat[];
}

export default function SeatSelection({ seats }: SeatSelectionProps) {
	const [hasWindow, setHasWindow] = useState(false);
	const [nearExit, setNearExit] = useState(false);
	const [extraLegRoom, setExtraLegRoom] = useState(false);
	const [maxPrice, setMaxPrice] = useState("");
	const [groupSize, setGroupSize] = useState("2");

	const getSeatColor = (seat: Seat, index: number) => {
		if (seat.isBooked) return "bg-red-200";

		const matchesFilters =
			(!hasWindow || seat.hasWindow) &&
			(!nearExit || seat.nearExit) &&
			(!extraLegRoom || seat.extraLegRoom) &&
			(!maxPrice || seat.price <= Number(maxPrice)) &&
			findAdjacentSeats(seats, index, Number(groupSize));

		return matchesFilters ? "bg-blue-200" : "bg-gray-200";
	};

	const findAdjacentSeats = (seats: Seat[], seatIndex: number, groupSize: number) => {
		// TODO: some simplea lgorithm to check adjacent seats
		return true;
	};

	return (
		<div className=" bg-white p-3 rounded-md shadow-md mx-2">
			<h1 className="text-2xl font-semibold py-2 px-1">Choose your seat</h1>
			<div className="mb-6 flex flex-wrap items-center gap-4">
				<div className="flex items-center space-x-2">
					<Checkbox
						id="hasWindow"
						checked={hasWindow}
						onCheckedChange={(checked) => setHasWindow(!!checked)}
					/>
					<Label htmlFor="hasWindow">Window Seat</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox id="nearExit" checked={nearExit} onCheckedChange={(checked) => setNearExit(!!checked)} />
					<Label htmlFor="nearExit">Near Exit</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Checkbox
						id="extraLegRoom"
						checked={extraLegRoom}
						onCheckedChange={(checked) => setExtraLegRoom(!!checked)}
					/>
					<Label htmlFor="extraLegRoom">Extra Legroom</Label>
				</div>

				<div className="flex items-center space-x-2">
					<Label htmlFor="maxPrice">Max Price (€)</Label>
					<Input
						id="maxPrice"
						type="number"
						className="w-32"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
				</div>

				<div className="flex items-center space-x-2">
					<Label htmlFor="groupSize">Group Size</Label>
					<Input
						id="groupSize"
						type="number"
						className="w-32"
						value={groupSize}
						onChange={(e) => setGroupSize(e.target.value)}
					/>
				</div>
			</div>

			{/* Seats grid */}
			<div className="grid grid-cols-6 gap-4">
				{seats.map((seat, index) => (
					<div
						key={seat.seatNumber}
						className={`flex flex-col  rounded-lg p-2 text-center ${getSeatColor(seat, index)}`}
					>
						<p className="font-bold">{seat.seatNumber}</p>
						<p className="text-sm">{seat.price}€</p>
						{seat.isBooked && <div className="text-xs text-red-600 hidden sm:inline-block">Booked</div>}
					</div>
				))}
			</div>
		</div>
	);
}
