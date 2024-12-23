"use client";

import { useEffect, useState } from "react";
import DETnav from "./DETnav";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

export default function NavChecker() {
	const router = usePathname();
	const isMovieRoute = router.includes("/movie");

	const [similar, setSimilar] = useState();

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
			{!isMovieRoute ? (
				<NavBar setValue={setValue} value={value} similar={similar?.results} />
			) : (
				<DETnav />
			)}
		</>
	);
}
