export async function FatchingData(MovieId) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${MovieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
		{
			next: {
				revalidate: 0,
			},
		}
	);

	if (!response.ok) {
		throw new Error("Fetch Error...");
	}

	const data = await response.json();

	return data;
}
export async function GET(req) {
	const { searchParams } = new URL(req.url);

	const id = searchParams.get("id");
	console.log(id);
	try {
		const data = await FatchingData(id);

		const FinalData = new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});

		return FinalData;
	} catch (error) {
		// Return an error response if fetching fails
		return new Response(
			JSON.stringify({ error: "Failed to fetch data", details: error.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}
