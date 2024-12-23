"use client";

import { useEffect, useState } from "react";
import UseContextApi from "../context/context";
import Image from "next/image";

export default function MovieSearch() {
	const { showModal, setShowModal, setSelectCard, cardId } = UseContextApi();

	const [similar, setSimilar] = useState([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		const signal = controller.signal;

		const fetchMovies = async () => {
			try {
				const response = await fetch(`/api/Search?query=${value}`, {
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
	}, [value]);

	return (
		<>
			{/* <!-- Movie Search Modal --> */}
			<div
				onClick={() => setShowModal(!showModal)}
				className={`fixed inset-0 bg-black bg-opacity-80  items-center justify-center z-50 ${
					showModal ? "flex" : "hidden"
				} `}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl"
				>
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold">Search Movie </h2>
						<button
							onClick={() => setShowModal(!showModal)}
							className="text-gray-400 hover:text-white"
						>
							✕
						</button>
					</div>
					<input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						type="text"
						placeholder="Type movie name..."
						className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
					/>
					<div class="max-h-96 overflow-y-auto">
						{similar?.results?.map((movie) => (
							<div
								onClick={() => {
									setSelectCard((prevItems) =>
										prevItems.map((item) =>
											item.id == cardId ? { ...item, card: movie } : item
										)
									);

									setShowModal(!showModal);
									setValue("");
								}}
								key={movie.id}
								class="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
							>
								<Image
									width={64}
									height={96}
									placeholder="blur"
									blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									class="w-16 h-24 object-cover rounded"
								/>
								<div>
									<h3 class="font-bold">{movie.title}</h3>
									<p class="text-sm text-gray-400">{movie.release_date}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
