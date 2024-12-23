"use client";

import { createContext, useContext, useState } from "react";

const myContext = createContext();

export function ContextProvider({ children }) {
	const [showModal, setShowModal] = useState(false);
	const [selectCard, setSelectCard] = useState([
		{ id: 0 + "MovieCard", card: "" },
	]);
	const [cardId, setCardId] = useState(0);
	const [searchres, setSearchRes] = useState([]);

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
				cardId,
				setCardId,
				searchres,
				setSearchRes,
			}}
		>
			{children}
		</myContext.Provider>
	);
}
export default function UseContextApi() {
	return useContext(myContext);
}
