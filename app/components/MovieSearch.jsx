"use client";

import UseContextApi from "../context/context";

export default function MovieSearch() {
	const { showModal, setShowModal } = UseContextApi();
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
						type="text"
						placeholder="Type movie name..."
						className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
					/>
					<div className="max-h-96 overflow-y-auto"></div>
				</div>
			</div>
		</>
	);
}
