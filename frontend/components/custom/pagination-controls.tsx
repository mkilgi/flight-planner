"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { FlightsResponse } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
	flightsResponse: FlightsResponse;
}

export function PaginationControls({ flightsResponse }: PaginationControlsProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const pageNumber = flightsResponse.number;
	const totalPages = flightsResponse.totalPages;

	const goToPage = (page: number) => {
		if (page < 0 || page >= totalPages) return;
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem className="hover:cursor-pointer">
					<PaginationPrevious onClick={() => goToPage(pageNumber - 1)} />
				</PaginationItem>
				{[...Array(totalPages)].map((_, index) => (
					<PaginationItem key={index} className="hover:cursor-pointer">
						<PaginationLink isActive={index === pageNumber} onClick={() => goToPage(index)}>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{totalPages > 5 && <PaginationEllipsis />}
				<PaginationItem className="hover:cursor-pointer">
					<PaginationNext onClick={() => goToPage(pageNumber + 1)} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
