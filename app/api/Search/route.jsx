export async function FatchingData(MovieName) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_TMDB_API_URL}search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${MovieName}`,
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

	const query = searchParams.get("query");

	try {
		const data = await FatchingData(query);

		const FinalData = new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});

		return FinalData;
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
