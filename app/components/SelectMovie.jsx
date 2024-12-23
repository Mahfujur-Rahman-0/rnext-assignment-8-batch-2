"use client";
import { useEffect, useState } from "react";
import UseContextApi from "../context/context";
import Image from "next/image";

export default function SelectMovie({ removeMovieCard, id, card }) {
	const { showModal, setShowModal, setCardId } = UseContextApi();

	const [TopRated, setTopRated] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		const signal = controller.signal;

		const fetchMovies = async () => {
			try {
				const response = await fetch(`/api/TopRatedDetail?id=${card?.id}`, {
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
					console.log("error", err);
				}
			}
		};

		fetchMovies();
		return () => {
			controller.abort();
		};
	}, [card?.id]);

	return (
		<div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
			<div className="flex justify-end mb-4">
				<button
					onClick={() => removeMovieCard()}
					className="text-gray-400 hover:text-white"
				>
					✕
				</button>
			</div>
			<div
				className={`flex-grow flex-col items-center justify-center ${
					!card ? "flex" : "hidden"
				}`}
			>
				<button
					onClick={() => (setShowModal(!showModal), setCardId(id))}
					className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
				>
					Select Movie
				</button>
			</div>
			{/*  This is the hidden div that will be displayed when the button is clicked after api call*/}
			<div className={`${!card ? "hidden" : "block"}`}>
				<div className="grid grid-cols-5 gap-8">
					<div className="col-span-2 h-full">
						<Image
							width={264}
							height={396}
							src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
							alt="Snowden"
							className="w-full rounded-lg mb-4 object-contain max-h-full"
						/>
						<h2 className="text-xl font-bold mb-2 text-center">
							{TopRated.title}
						</h2>
					</div>
					<div className="w-full space-y-4 col-span-3">
						<div className="bg-zinc-800 p-3 rounded">
							<span className="text-gray-400">Rating:</span>
							<span className="float-right">
								{card?.vote_average?.toFixed(1)}/10
							</span>
						</div>
						<div className="bg-zinc-800 p-3 rounded">
							<span className="text-gray-400">Release Year:</span>
							<span className="float-right ">
								{card?.release_date?.split("-")[0]}
							</span>
						</div>
						<div className="bg-zinc-800 p-3 rounded">
							<span className="text-gray-400">Runtime:</span>
							<span className="float-right">{TopRated?.runtime} min</span>
						</div>
						<div className="bg-zinc-800 p-3 rounded">
							<span className="text-gray-400">Budget:</span>
							<span className="float-right">${TopRated?.budget}M</span>
						</div>
						<div className="bg-zinc-800 p-3 rounded">
							<span className="text-gray-400">Revenue:</span>
							<span className="float-right">${TopRated?.revenue}M</span>
						</div>
						<div className="bg-zinc-800 p-3 rounded">
							<span className="text-gray-400">Genres:</span>
							<div className="mt-2 flex flex-wrap gap-2">
								{TopRated?.genres?.map((genre) => (
									<span
										key={genre.id}
										className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
									>
										{genre.name}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
