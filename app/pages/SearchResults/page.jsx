"use client";

import UseContextApi from "@/app/context/context";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchResults() {
	const { searchres } = UseContextApi();
	const [similar, setSimilar] = useState();

	useEffect(() => {
		const controller = new AbortController();

		const signal = controller.signal;

		const fetchMovies = async () => {
			try {
				const response = await fetch(`/api/Search?query=${searchres}`, {
					signal,
				});

				if (response.ok) {
					const data = await response.json();

					setSimilar(data || []);
				} else {
					throw new Error("Failed to fetch movies");
				}
			} catch (err) {
				if (err.name !== "AbortError") {
					console.log(err.message);
				}
			}
		};

		fetchMovies();
		return () => {
			controller.abort();
		};
	}, [searchres]);
	console.log(similar);
	return (
		// <!-- Main Content -->
		<main class="container mx-auto px-4 pt-24 pb-8">
			{/* <!-- Search Stats --> */}
			<div class="mb-6">
				<h1 class="text-2xl font-bold">
					Search Results for {`"${searchres}"`}
				</h1>
				<p class="text-gray-400">Found {similar?.results?.length} results</p>
			</div>

			{/* <!-- Filters and Sort Section --> */}
			<div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
				{/* <!-- Movie Card 1 --> */}
				{similar?.results.map((movie) => (
					<Link
						key={movie.id}
						href={`/movie/${movie.id}`}
						class="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
					>
						<Image
							width={294}
							height={441}
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt="Avatar: The Way of Water"
							class="w-full aspect-[2/3] object-cover"
						/>
						<div class="p-4">
							<h3 class="font-bold mb-2">{movie.title}</h3>
							<div class="flex justify-between text-sm text-gray-400">
								<span>{movie.release_date.split("-")[0]}</span>
								<span>⭐ {movie.vote_average.toFixed(1)}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
