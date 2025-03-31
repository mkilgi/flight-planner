"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

/**
 * Used shadcn example combobox
 * https://ui.shadcn.com/docs/components/combobox
 */

interface CityComboboxProps {
	value: string;
	onValueChange: (value: string) => void;
	cities: string[];
	placeholder: string;
	className?: string;
}

export function CityCombobox({ value, onValueChange, cities, placeholder, className }: CityComboboxProps) {
	return (
		<div className={cn("flex items-center gap-1", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className="w-[200px] justify-between text-muted-foreground font-normal"
					>
						{value || placeholder}
						<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder={placeholder} />
						<CommandList>
							<CommandEmpty>No city found.</CommandEmpty>
							<CommandGroup>
								{cities.map((city) => (
									<CommandItem key={city} value={city} onSelect={() => onValueChange(city)}>
										{city}
										<Check
											className={cn(
												"ml-auto h-4 w-4",
												value === city ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{value && (
				<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onValueChange("")}>
					<X className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
