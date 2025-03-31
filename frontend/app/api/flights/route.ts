import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const backendUrl = new URL(`${API_URL}/flights`);

	searchParams.forEach((value, key) => {
		backendUrl.searchParams.append(key, value);
	});

	try {
		const response = await fetch(backendUrl.toString());
		const data = await response.json();

		// console.log(data);
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
