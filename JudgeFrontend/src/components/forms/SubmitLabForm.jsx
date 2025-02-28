import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { motion } from "motion/react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Select,
    Option,
} from "@material-tailwind/react";
import { LabSelect } from "../selects/LabSelect";
import { PaperSelect } from "../selects/PaperSelect";

function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
}

export default function SubmitLabForm() {
    const [type, setType] = useState("card");
    const [cardNumber, setCardNumber] = useState("");

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("hehe");
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            console.log("Dropped files:", files);
        }
    };

    return (
        <Card className="w-full max-w-[32rem]">
            <CardHeader
                color="gray"
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center px-4 py-8 text-center"
            >
                <div className="mb-4 h-20 p-6 text-white">
                    <IoCloudUploadOutline className="h-12 w-12" />
                </div>
                <Typography variant="h5" color="white">
                    Lab Submission
                </Typography>
            </CardHeader>
            <CardBody>
                <form className="mt-0 flex flex-col gap-4">
                    <div>
                        <PaperSelect />
                    </div>
                    <div>
                        <LabSelect />
                    </div>
                    <div>
                        <div
                            onDrop={handleFileDrop}
                            onDragOver={(e) => e.preventDefault()} // Prevent default behavior here too
                            onDragEnter={() => {
                                console.log("entered");
                            }}
                            onDragExit={() => {
                                console.log("exited");
                            }}
                            className="h-40 flex items-center justify-center"
                        >
                            <motion.div
                                layout
                                whileHover={{
                                    scale: 0.95,
                                    backgroundColor: "#f3f4f6",
                                }}
                                className="flex hover:cursor-pointer items-center justify-center w-full h-full border-2 border-blue-gray-100 bg-blue-gray-50 rounded-md"
                            >
                                <Typography
                                    variant="h6"
                                    className="flex flex-col items-center"
                                >
                                    <IoCloudUploadOutline size={24} />
                                    Upload Lab Files
                                </Typography>
                            </motion.div>
                        </div>
                    </div>
                    <Button size="lg">Submit</Button>
                </form>
            </CardBody>
        </Card>
    );
}
