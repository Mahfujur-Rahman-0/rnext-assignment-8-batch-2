"use client";
import Image from "next/image";
import Link from "next/link";

export default function NavBar({ setValue, value, similar }) {
	console.log(similar);
	return (
		<nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
			<div className="container mx-auto px-4 py-6 flex justify-between items-center">
				<div className="flex items-center">
					<Link href="/" className="text-red-600 text-4xl font-bold">
						MOVIE DB
					</Link>
					<div className="ml-8 space-x-4">
						<Link href="/" className="text-white hover:text-gray-300">
							Home
						</Link>
						<Link
							href="/pages/compare"
							className="text-white hover:text-gray-300"
						>
							Compare Movies
						</Link>

						<Link
							href="/pages/watchList"
							className="text-white hover:text-gray-300"
						>
							Watch Later
						</Link>
					</div>
				</div>
				<div className="relative">
					<input
						onChange={(e) => setValue(e.target.value)}
						value={value}
						type="text"
						id="searchInput"
						placeholder="Search movies..."
						className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
					/>
					<div
						id="searchResults"
						className=" w-full mt-2 bg-black bg-opacity-90 rounded-lg"
					>
						{similar?.map((movie) => (
							<Link key={movie.id} href={`/movie/${movie.id}`}>
								<div
									onClick={() => {
										setValue("");
									}}
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
							</Link>
						))}
					</div>
				</div>
			</div>
		</nav>
	);
}
