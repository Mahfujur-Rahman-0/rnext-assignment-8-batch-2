"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cradits from "./cradits";
import Similar from "./Similar";
import { useRouter } from "next/navigation";

export default function MovieId() {
	const router = usePathname();
	const NotFoundRouter = useRouter();
	const movieId = router.replace("/movie/", "");

	const [TopRated, setTopRated] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		const signal = controller.signal;

		const fetchMovies = async () => {
			try {
				const response = await fetch(`/api/TopRatedDetail?id=${movieId}`, {
					signal,
				});

				if (response.ok) {
					const data = await response.json();

					setTopRated(data || []);
				} else {
					throw new Error("Failed to fetch movies");
				}
			} catch (err) {
				if (err.name !== "AbortError") {
					NotFoundRouter.replace("/404");
					return null;
				}
			}
		};

		fetchMovies();
		return () => {
			controller.abort();
		};
	}, [movieId]);
	console.log(TopRated);
	return (
		<>
			{/* <!-- Movie Details Section --> */}

			<div id="movieDetails" className="min-h-screen pt-20 mb-8">
				<div className="relative h-screen">
					<div className="absolute inset-0">
						<Image
							fill
							placeholder="blur"
							blurDataURL={`https://image.tmdb.org/t/p/w500${TopRated?.backdrop_path}`}
							src={`https://image.tmdb.org/t/p/w500${TopRated?.backdrop_path}`}
							alt="Smile 2"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
					</div>

					<div className="relative container mx-auto px-4 pt-32">
						<div className="flex flex-col md:flex-row gap-8">
							<div className="md:w-1/3">
								<Image
									width={590}
									height={649}
									placeholder="blur"
									blurDataURL={`https://image.tmdb.org/t/p/w500${TopRated?.poster_path}`}
									src={`https://image.tmdb.org/t/p/w500${TopRated?.poster_path}`}
									alt={TopRated?.original_title}
									className="w-full rounded-lg shadow-lg"
								/>
							</div>

							<div className="md:w-2/3">
								<h1 className="text-4xl font-bold mb-4">
									{TopRated?.original_title}
								</h1>

								<div className="flex items-center mb-4 space-x-4">
									<span className="text-green-500">
										{TopRated?.release_date}
									</span>
									<span>| </span>
									<span>{TopRated.runtime} min</span>
								</div>

								<p className="text-lg mb-6">{TopRated?.overview}</p>

								<div className="mb-6">
									<h3 className="text-gray-400 mb-2">Genres</h3>
									<div className="flex flex-wrap gap-2">
										{TopRated?.genres?.map((genre) => (
											<span
												key={genre.id}
												className="px-3 py-1 bg-gray-800 rounded-full text-sm"
											>
												{genre.name}
											</span>
										))}
									</div>
								</div>

								<Cradits />

								<div className="mb-6">
									<div className="flex flex-wrap gap-4">
										<div className="text-center">
											<button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
												>
													<path stroke="none" d="M0 0h24v24H0z" fill="none" />
													<path d="M14 3v4a1 1 0 0 0 1 1h4" />
													<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
													<path d="M12 11l0 6" />
													<path d="M9 14l6 0" />
												</svg>
												Add to Wacth List
											</button>
										</div>

										<div className="text-center">
											<button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
												>
													<path stroke="none" d="M0 0h24v24H0z" fill="none" />
													<path d="M7 12l5 5l10 -10" />
													<path d="M2 12l5 5m5 -5l5 -5" />
												</svg>
												Added to Wacth List
											</button>
										</div>
									</div>
								</div>

								<div className="mb-6">
									<h3 className="text-gray-400 mb-2">Share on social media</h3>
									<div className="flex flex-wrap gap-4">
										<button className="text-center cursor-pointer">
											<Image
												width={32}
												height={32}
												src="http://facebook.com/favicon.ico"
												alt="Facebook"
												className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
											/>
											<p className="text-sm">Facebook</p>
										</button>

										<button className="text-center cursor-pointer">
											<Image
												width={32}
												height={32}
												src="http://x.com/favicon.ico"
												alt="Facebook"
												className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
											/>
											<p className="text-sm">X</p>
										</button>

										<button className="text-center cursor-pointer">
											<Image
												width={32}
												height={32}
												src="http://linkedin.com/favicon.ico"
												alt="Facebook"
												className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
											/>
											<p className="text-sm">Linkedin</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Similar Movies Section --> */}
			<Similar />
		</>
	);
}
