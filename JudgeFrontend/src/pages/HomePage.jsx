import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import code_stock_footage from "../assets/pexels-code-stock.mp4";

export default function HomePage() {
    return (
        <div className="home px-10 component w-full overflow-y-scroll flex-[4_4_0%] items-center">
            <div className="mt-9 text-end">
                <Button variant="text">Sign In</Button>
            </div>
            <div className="flex items-center justify-start w-full my-6 h-[70vh] overflow-hidden ">
                <div className="absolute top-0 -left-1 w-[120vw] h-[80vh] overflow-hidden opacity-100 -z-10">
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source src={code_stock_footage} type="video/mp4" />
                    </video>
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
        </div>
    );
}
