"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface PriceFilterProps {
	value: string;
	onChange: (value: string) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleBlur = () => {
		onChange(localValue);
	};

	return (
		<div className="relative w-[200px]">
			<span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">€</span>
			<Input
				type="number"
				placeholder="Max price"
				className="pl-8 bg-white"
				value={localValue}
				onBlur={handleBlur}
				onChange={(e) => {
					setLocalValue(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						(e.target as HTMLInputElement).blur();
					}
				}}
			/>
		</div>
	);
}
