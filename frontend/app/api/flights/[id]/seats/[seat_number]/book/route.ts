import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string; seat_number: string }> }) {
	const API_URL = process.env.API_URL;
	const { id, seat_number } = await params;

	try {
		const response = await fetch(`${API_URL}/flights/${id}/seats/${seat_number}/book`, {
			method: "PUT",
		});

		if (!response.ok) {
			const error = await response.json();
			return NextResponse.json(error, { status: response.status });
		}

		return NextResponse.json(await response.json());
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
