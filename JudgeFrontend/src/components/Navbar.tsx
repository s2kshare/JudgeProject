import { Button } from "@material-tailwind/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoExitOutline } from "react-icons/io5";
import { JUDGE_LOGO, JUDGE_NAME } from "../lib/constants";
import { Avatar, Typography } from "@material-tailwind/react";
import { AppRoute, ROUTE_TITLES, capitalizeFirstLetter } from "../lib/utils";
import { useLocation } from "react-router-dom";

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
                <div className="flex gap-2 items-center md:hidden">
                    <img className="w-10 h-10" src={JUDGE_LOGO} />
                    <h1>{JUDGE_NAME}</h1>
                </div>
                <h1 className="text-3xl font-semibold">
                    {capitalizeFirstLetter(ROUTE_TITLES[currentPath])}
                </h1>
            </div>
            <div className="nav-mid"></div>
            <div className="nav-right">
                <div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-4">
                            <Avatar
                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                variant="rounded"
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                            <div>
                                <Typography
                                    variant="h6"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                >
                                    Username
                                </Typography>
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="font-normal"
                                    placeholder={undefined}
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                >
                                    Year Level
                                </Typography>
                            </div>
                            <div className="block md:hidden">
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
