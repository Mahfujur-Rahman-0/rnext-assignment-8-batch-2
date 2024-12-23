"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TopRated() {
	const [TopRated, setTopRated] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/TopRated");
				if (response.ok) {
					const data = await response.json();
					setTopRated(data.results || []);
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
	return (
		<section className="mb-8">
			<h2 className="text-2xl font-bold mb-4">Top Rated</h2>
			<div id="topRatedMovies" className="flex space-x-4 overflow-x-auto pb-4">
				{TopRated?.map((movie) => (
					<div
						key={movie.id}
						className="flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform"
					>
						<a href="/details.html">
							<Image
								width={192}
								height={288}
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt="The Shawshank Redemption"
								className="w-full rounded-lg"
							/>
						</a>
					</div>
				))}
			</div>
		</section>
	);
}
