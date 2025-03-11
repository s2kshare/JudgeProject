import { Button } from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoExitOutline } from "react-icons/io5";
import { AppRoute, ROUTE_TITLES, capitalizeFirstLetter } from "../lib/utils";
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Navbar({
    navOpen,
    toggleNav,
}: {
    navOpen: boolean;
    toggleNav: () => void;
}) {
    const location = useLocation();
    const currentPath = (location.pathname as AppRoute) || "/";

    return (
        <div className="w-full h-full flex justify-between items-center px-10">
            <div className="nav-left flex gap-2 items-center">
                {/* <div className="flex gap-2 items-center md:hidden">
                    <img className="w-10 h-10" src={JUDGE_LOGO} />
                    <h1>{JUDGE_NAME}</h1>
                </div> */}
                <h1 className="text-3xl font-semibold">
                    {capitalizeFirstLetter(ROUTE_TITLES[currentPath])}
                </h1>
            </div>
            <div className="nav-mid"></div>
            <div className="nav-right">
                <div>
                    <div className="block">
                        <div className="flex items-center gap-4">
                            <UserProfile />
                            <div className="block">
                                <Button
                                    variant="text"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    onClick={toggleNav}
                                >
                                    {navOpen ? (
                                        <IoExitOutline className="w-4 h-4" />
                                    ) : (
                                        <RxHamburgerMenu className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
