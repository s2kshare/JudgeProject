import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import code_stock_footage from "../assets/pexels-code-stock.mp4";
import { useNavigate } from "react-router-dom";
import DeveloperCard from "../components/DeveloperCard";

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="home px-10 component w-full overflow-y-scroll flex-[4_4_0%] items-center">
            <div className="mt-9 text-end">
                <Button variant="text" onClick={() => navigate("/login")}>
                    Sign In
                </Button>
            </div>
            <div className="flex items-center justify-start w-full my-6 h-[60vh] overflow-hidden ">
                <div className="absolute top-0 -left-1 w-[120vw] h-[70vh] overflow-hidden opacity-100 -z-10 bg-deep-orange-500">
                    {/* <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source src={code_stock_footage} type="video/mp4" />
                    </video> */}
                </div>
                <div className="">
                    <Typography variant="h1" className="flex-1 mt-6">
                        Judge Project
                    </Typography>
                    <Typography
                        variant="p"
                        className=" italic flex-1 mt-3 mb-3"
                    >
                        "Code. Submit. Succeed. – Automated Grading Made
                        Simple."
                    </Typography>
                </div>
            </div>
            <div className="wrapper flex">
                <div className="home-footer-left flex-[2_2_0%]">
                    <Typography variant="h3">
                        Welcome to the Judge System
                    </Typography>
                    <Typography variant="p">
                        The Judge System is an automated platform designed for
                        students to submit code assignments and receive instant
                        feedback. Teachers use this system to manage lab
                        assignments and review student submissions, while
                        administrators oversee users, labs, and assessments.
                    </Typography>
                </div>
                <div className="home-footer-right flex-1">
                    <DeveloperCard />
                </div>
            </div>
        </div>
    );
}
