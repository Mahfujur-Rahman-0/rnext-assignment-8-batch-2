"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TrendingNow() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch("/api/TrendingNowApi");
				if (response.ok) {
					const data = await response.json();
					setMovies(data.results || []);
				} else {
					throw new Error("Failed to fetch movies");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();
	}, []);
	if (loading) {
		return (
			<div className="w-[60px] h-[50px] ">
				<div className="loadingtext">
					<p>Loading</p>
				</div>
			</div>
		);
	}
	console.log(movies);
	return (
		<section className="mb-8">
			<h2 className="text-2xl font-bold mb-4">Trending Now</h2>
			<div
				id="trendingMovies"
				className="flex px-2 space-x-4 overflow-x-auto pb-4"
			>
				{movies?.map((movie) => (
					<div
						key={movie.id}
						className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
					>
						<a href="/">
							<Image
								width={192}
								height={288}
								filll
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt="Smile 2"
								className="w-full rounded-lg"
							/>
							<div className="mt-2">
								<h3 className="text-light text-sm font-bold truncate">
									{movie.original_title
										? movie.original_title
										: movie.original_name}
								</h3>
								<p className="text-primary text-xs">
									{movie.release_date
										? movie.release_date
										: movie.first_air_date}
								</p>
							</div>
						</a>
					</div>
				))}
			</div>
		</section>
	);
}
