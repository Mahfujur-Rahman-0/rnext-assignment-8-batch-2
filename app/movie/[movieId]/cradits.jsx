"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cradits() {
	const router = usePathname();
	const movieId = router.replace("/movie/", "");
	const [cradits, setCradits] = useState([]);
	useEffect(() => {
		const controller = new AbortController();

		const signal = controller.signal;

		const fetchMovies = async () => {
			try {
				const response = await fetch(`/api/Cradit?id=${movieId}`, {
					signal,
				});

				if (response.ok) {
					const data = await response.json();

					setCradits(data || []);
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
		<div className="mb-6">
			<h3 className="text-gray-400 mb-2">Cast</h3>
			<div className="flex flex-wrap gap-4">
				{cradits?.cast?.splice(0, 4).map((cast) => (
					<div key={cast.credit_id} className="text-center">
						<Image
							width={96}
							height={96}
							placeholder="blur"
							blurDataURL={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
							src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
							alt={cast.original_name}
							className="w-24 h-24 rounded-full object-cover mb-2"
						/>
						<p className="text-sm">{cast.original_name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
