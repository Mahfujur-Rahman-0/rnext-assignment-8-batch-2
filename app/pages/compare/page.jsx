"use client";
import MovieSearch from "@/app/components/MovieSearch";
import SelectMovie from "@/app/components/SelectMovie";
import UseContextApi from "@/app/context/context";

export default function Compare() {
	const { selectCard, setSelectCard } = UseContextApi();

	const removeMovieCard = (id) => {
		setSelectCard(selectCard.filter((card) => card.id !== id));
	};
	console.log(selectCard);
	return (
		<div className="min-h-screen">
			{/* <!-- Main Content --> */}
			<main className="container mx-auto px-4 pt-24 pb-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Compare Movies</h1>
					<button
						onClick={() =>
							setSelectCard([
								...selectCard,
								{
									id: selectCard.length + "MovieCard",
								},
							])
						}
						className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
					>
						Add Movie +
					</button>
				</div>

				{/* <!-- Movie Comparison Container --> */}
				<div className="grid gap-6 md:grid-cols-2">
					{selectCard.map(({ id, card }) => (
						<SelectMovie
							card={card == undefined ? null : card}
							key={id}
							id={id}
							removeMovieCard={() => removeMovieCard(id)}
						/>
					))}
				</div>
			</main>

			{/* <!-- Movie Search Modal --> */}
			<MovieSearch />
		</div>
	);
}
