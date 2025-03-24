import { Button } from "@material-tailwind/react";
import { JUDGE_FE_VERSION, JUDGE_LOGO, JUDGE_NAME } from "../lib/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "../lib/utils";
import { useEffect, useState } from "react";
import SubmissionModal from "./modals/SubmissionModal";

import { IoHome } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { IoCloudUploadSharp } from "react-icons/io5";
import { motion } from "framer-motion";

export default function AppSidebar({ isOpen }: { isOpen: boolean }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = (location.pathname as AppRoute) || "/";
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? 0 : "-100%" }}
            transition={{
                ease: "easeInOut",
                stiffness: 100,
                damping: 15,
                duration: 0.5,
            }}
            className={`fixed shadow-xl left-0 top-0 p-10 min-w-96 h-full bg-[--col-base-300] z-10 xl:block`}
        >
            <div className="upper-sidebar h-1/6 flex relative items-center justify-center mb-6">
                <img className="w-20 h-20" src={JUDGE_LOGO}></img>
                <h1 className="font-semibold text-2xl">{JUDGE_NAME}</h1>
                <p className="text-xs absolute bottom-1/4 right-1/2 opacity-20">
                    v{JUDGE_FE_VERSION}
                </p>
            </div>
            <div className="mid-sidebar">
                <div className="flex flex-col gap-1">
                    <Button
                        variant="text"
                        className="w-full font-normal text-left flex gap-2 items-center"
                        onClick={() => navigate("/")}
                        disabled={currentPath === "/"}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <IoHome className="h-5 w-5" />
                        Home
                    </Button>
                    <Button
                        variant="text"
                        className="w-full font-normal text-left flex gap-2 items-center"
                        onClick={() => navigate("/history")}
                        disabled={currentPath === "/history"}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <MdHistory className="h-5 w-5" />
                        History
                    </Button>
                    <Button
                        variant="text"
                        className="w-full font-normal text-left flex gap-2 items-center"
                        onClick={() => navigate("/scoreboard")}
                        disabled={currentPath === "/scoreboard"}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <MdLeaderboard className="h-5 w-5" />
                        Scoreboard
                    </Button>
                    <Button
                        variant="text"
                        className="w-full font-normal text-left flex gap-2 items-center"
                        onClick={() => navigate("/dashboard")}
                        disabled={currentPath === "/dashboard"}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <MdDashboard className="h-5 w-5" />
                        Dashboard
                    </Button>
                    <hr className="border-[--col-base-400] my-2 mx-10" />
                    <Button
                        variant="filled"
                        className="w-full font-normal text-left flex gap-2 items-center"
                        onClick={() => setIsSubmitting(true)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    >
                        <IoCloudUploadSharp className="h-5 w-5" />
                        Submit Lab
                    </Button>
                </div>
            </div>
            <div className="low-sidebar"></div>
            <SubmissionModal
                isOpen={isSubmitting}
                setIsOpen={setIsSubmitting}
            />
        </motion.div>
    );
}
