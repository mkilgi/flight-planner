"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Used example from shadcn date range picker
 * https://ui.shadcn.com/docs/components/date-picker
 */

interface DateRangePickerProps {
	departureFrom?: string;
	departureTo?: string;
	onDateChange: (range: { departureFrom?: string; departureTo?: string }) => void;
}

export function DateRangePicker({ departureFrom, departureTo, onDateChange }: DateRangePickerProps) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: departureFrom ? new Date(departureFrom) : undefined,
		to: departureTo ? new Date(departureTo) : undefined,
	});

	const handleSelect = (range: DateRange | undefined) => {
		setDate(range);

		let departureFromISO, departureToISO;

		if (range?.from) {
			const from = new Date(range.from);
			from.setUTCHours(0, 0, 0, 0); // Set hours because backend expects full iso date
			departureFromISO = from.toISOString();
		}

		if (range?.to) {
			const to = new Date(range.to);
			to.setUTCHours(23, 59, 59, 999);
			departureToISO = to.toISOString();
		}

		onDateChange({
			departureFrom: departureFromISO,
			departureTo: departureToISO,
		});
	};

	let displayText = "Select departure dates";
	if (date?.from) {
		const fromText = format(date.from, "MMM dd, y");
		displayText = date.to ? `${fromText} – ${format(date.to, "MMM dd, y")}` : fromText;
	}

	return (
		<div className="flex flex-row items-center gap-1">
			<div className="grid gap-2">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								"w-[280px] justify-start text-left font-normal group",
								!date?.from && "text-muted-foreground"
							)}
						>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center">
									<CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
									<span>{displayText}</span>
								</div>
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={handleSelect}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
			</div>
			{date?.from && (
				<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleSelect(undefined)}>
					<X className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
