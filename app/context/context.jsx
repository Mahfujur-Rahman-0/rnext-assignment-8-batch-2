"use client";

import { createContext, useContext, useState } from "react";

const myContext = createContext();

export function ContextProvider({ children }) {
	const [showModal, setShowModal] = useState(false);
	const [selectCard, setSelectCard] = useState([{ id: 0 + "MovieCard" }]);
	const [watchLaterList, setWatchLaterList] = useState([
		{ id: 0 + "watchLaterList" },
	]);
	return (
		<myContext.Provider
			value={{
				showModal,
				setShowModal,
				selectCard,
				setSelectCard,
				watchLaterList,
				setWatchLaterList,
			}}
		>
			{children}
		</myContext.Provider>
	);
}
export default function UseContextApi() {
	return useContext(myContext);
}
