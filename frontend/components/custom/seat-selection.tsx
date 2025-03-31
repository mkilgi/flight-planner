"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Seat } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SeatSelectionProps {
	seats: Seat[];
	flightId: string;
}

export default function SeatSelection({ seats, flightId }: SeatSelectionProps) {
	const [hasWindow, setHasWindow] = useState(false);
	const [nearExit, setNearExit] = useState(false);
	const [extraLegRoom, setExtraLegRoom] = useState(false);
	const [maxPrice, setMaxPrice] = useState("");
	const [groupSize, setGroupSize] = useState("1");
	const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
	const router = useRouter();
	const ROW_LENGTH = 6;

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
		if (groupSize <= 1) return true;
		if (groupSize > ROW_LENGTH) return false;

		// Find current row boundaries
		const rowStart = Math.floor(seatIndex / ROW_LENGTH) * ROW_LENGTH;
		const rowEnd = rowStart + ROW_LENGTH;

		// Check left and right for seats that are not booked
		let leftCount = 0;
		let rightCount = 0;

		for (let i = seatIndex - 1; i >= rowStart && leftCount < groupSize - 1; i--) {
			if (seats[i].isBooked) break;
			leftCount++;
		}

		for (let i = seatIndex + 1; i < rowEnd && rightCount < groupSize - 1; i++) {
			if (seats[i].isBooked) break;
			rightCount++;
		}

		return leftCount + rightCount + 1 >= groupSize;
	};

	const handleConfirmBooking = async () => {
		try {
			if (!selectedSeat) {
				toast("Unexpected error, no selected seat!");
				return;
			}
			const response = await fetch(`/api/flights/${flightId}/seats/${selectedSeat.seatNumber}/book`, {
				method: "PUT",
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Booking failed");
			}

			toast("Seat booked successfully");

			router.refresh();
		} catch (error) {
			toast(error instanceof Error ? error.message : "Failed to book seat");
		} finally {
			setSelectedSeat(null);
		}
	};

	return (
		<div className=" bg-white p-3 rounded-lg shadow-md border mx-2">
			<div className="flex items-center gap-1">
				<h1 className="text-2xl font-semibold py-2 px-1">Choose your seat</h1>
				<Tooltip>
					<TooltipTrigger className="cursor-pointer">
						<Info className="w-5 h-5 text-black mt-1.5" />
					</TooltipTrigger>
					<TooltipContent className="bg-white p-2 flex flex-col gap-2 text-primary pb-4 border-2">
						<div className="flex items-center gap-2">
							<span className="w-4 h-4 bg-blue-200 rounded"></span> Suggested Seat
						</div>
						<div className="flex items-center gap-2">
							<span className="w-4 h-4 bg-red-200 rounded"></span> Booked Seat
						</div>
						<div className="flex items-center gap-2">
							<span className="w-4 h-4 bg-gray-200 rounded"></span> Available Seat
						</div>
					</TooltipContent>
				</Tooltip>
			</div>

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
						onClick={() => setSelectedSeat(seat)}
						className={`flex flex-col hover:cursor-pointer rounded-lg p-2 text-center ${getSeatColor(
							seat,
							index
						)}`}
					>
						<p className="font-bold">{seat.seatNumber}</p>
						<p className="text-sm">{seat.price}€</p>
						{seat.isBooked && <div className="text-xs text-red-600 hidden sm:inline-block">Booked</div>}
					</div>
				))}
			</div>
			{selectedSeat && (
				<Dialog open={!!selectedSeat} onOpenChange={() => setSelectedSeat(null)}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{selectedSeat.isBooked ? "Seat Unavailable" : "Confirm Seat Booking"}
							</DialogTitle>
						</DialogHeader>
						<p>
							{selectedSeat.isBooked
								? `Seat ${selectedSeat.seatNumber} is already booked. Please select another seat.`
								: `Do you want to book seat ${selectedSeat.seatNumber} for ${selectedSeat.price}€?`}
						</p>
						<DialogFooter>
							{selectedSeat.isBooked ? (
								<Button onClick={() => setSelectedSeat(null)}>OK</Button>
							) : (
								<Button onClick={handleConfirmBooking}>Confirm</Button>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</div>
	);
}
