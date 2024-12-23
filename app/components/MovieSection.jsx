import Image from "next/image";
import TrendingNow from "./TrendingNow";
import PopularMovieDB from "./PopularMovieDB";
import TopRated from "./TopRated";

export default function MovieSection() {
	return (
		<div className="container mx-auto px-4 py-8">
			{/* <!-- Trending Movies --> */}
			<TrendingNow />
			{/* <!-- Popular Movies --> */}
			<PopularMovieDB />
			{/* <!-- Top Rated Movies --> */}
			<TopRated />
		</div>
	);
}
