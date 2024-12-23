"use client";

import DETnav from "./DETnav";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

export default function NavChecker() {
	const router = usePathname();
	const isMovieRoute = router.includes("/movie");
	return <>{!isMovieRoute ? <NavBar /> : <DETnav />}</>;
}
