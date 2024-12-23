export default async function FatchingData() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_TMDB_API_URL}trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Fetch Error...");
	}

	return response.json();
}

export async function GET() {
	try {
		const data = await FatchingData();
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: "Failed to fetch data", details: error.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
