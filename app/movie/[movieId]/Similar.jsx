"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Similar() {
	const router = usePathname();
	const movieId = router.replace("/movie/", "");
	const [similar, setSimilar] = useState([]);
	useEffect(() => {
		const controller = new AbortController();

		const signal = controller.signal;

		const fetchMovies = async () => {
			try {
				const response = await fetch(`/api/Similar?id=${movieId}`, {
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
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold mb-4">More Like This</h2>

			<div className="flex space-x-4 overflow-x-auto pb-4">
				{similar?.results?.map((movie) => (
					<div
						key={movie.id}
						className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
					>
						<Link href={`/movie/${movie.id}`}>
							<Image
								width={192}
								height={288}
								src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
								alt={movie.title}
								className="w-full rounded-lg"
							/>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
