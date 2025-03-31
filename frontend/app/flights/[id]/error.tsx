"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center pt-[6rem] gap-4">
			<h2 className="text-2xl font-bold">Something went wrong!</h2>
			<Button onClick={() => reset()} variant="destructive" className="mt-4">
				Try Again
			</Button>
			<Button asChild variant="secondary">
				<Link href="/flights">Browse All Flights</Link>
			</Button>
		</div>
	);
}
