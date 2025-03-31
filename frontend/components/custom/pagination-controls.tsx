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
import { useCallback } from "react";

interface PaginationControlsProps {
	flightsResponse: FlightsResponse;
}

export function PaginationControls({ flightsResponse }: PaginationControlsProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const { number: pageNumber, totalPages } = flightsResponse;

	const goToPage = useCallback(
		(page: number) => {
			if (page < 0 || page >= totalPages) return;
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", page.toString());
			router.push(`${pathname}?${params.toString()}`);
		},
		[searchParams, pathname, router, totalPages]
	);

	// show first, last and 5 closest pages
	let startPage = Math.max(0, pageNumber - 2);
	let endPage = startPage + 4;

	if (endPage >= totalPages) {
		endPage = totalPages - 1;
		startPage = Math.max(0, endPage - 4);
	}

	const hasPreviousPages = startPage > 0;
	const hasNextPages = endPage < totalPages - 1;

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem className="hover:cursor-pointer">
					<PaginationPrevious onClick={() => goToPage(pageNumber - 1)} aria-disabled={pageNumber <= 0} />
				</PaginationItem>

				{hasPreviousPages && (
					<>
						<PaginationItem className="hover:cursor-pointer">
							<PaginationLink onClick={() => goToPage(0)}>1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</>
				)}

				{Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
					<PaginationItem key={page} className="hover:cursor-pointer">
						<PaginationLink isActive={page === pageNumber} onClick={() => goToPage(page)}>
							{page + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				{hasNextPages && (
					<>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem className="hover:cursor-pointer">
							<PaginationLink onClick={() => goToPage(totalPages - 1)}>{totalPages}</PaginationLink>
						</PaginationItem>
					</>
				)}

				<PaginationItem className="hover:cursor-pointer">
					<PaginationNext
						onClick={() => goToPage(pageNumber + 1)}
						aria-disabled={pageNumber >= totalPages - 1}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
