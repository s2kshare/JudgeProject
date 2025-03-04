import React, { useState, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { motion } from "motion/react";
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Typography,
} from "@material-tailwind/react";
import { LabSelect } from "../selects/LabSelect";
import { PaperSelect } from "../selects/PaperSelect";

export default function SubmitLabForm() {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(""); // State for selected paper
    const [selectedLab, setSelectedLab] = useState(""); // State for selected lab

    const handleSubmission = (e) => {
        e.preventDefault();

        // Capture the selected paper, lab, and files before submission
        console.log("Selected Paper:", selectedPaper);
        console.log("Selected Lab:", selectedLab);
        console.log("Submitted Files:", files);

        // Here you can implement further logic to submit the form
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            console.log("Dropped files:", files);
            setFiles(files);
        }
    };

    const handleFileChange = (e) => {
        console.log("Imported Files:", e.target.files);
        setFiles(e.target.files);
    };

    const openFileExplorer = () => {
        fileInputRef.current.click();
    };

    return (
        <Card className="w-full">
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
                        <PaperSelect
                            setSelectedPaper={setSelectedPaper} // Pass handler to update paper selection
                        />
                    </div>
                    <div>
                        <LabSelect
                            selectedPaper={selectedPaper} // Pass handler to update lab selection
                            selectedLab={selectedLab}
                            setSelectedLab={setSelectedLab}
                        />
                    </div>
                    <div>
                        <div
                            onDrop={handleFileDrop}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                            onClick={openFileExplorer}
                            className="h-40 flex items-center justify-center cursor-pointer"
                        >
                            <motion.div
                                layout
                                whileHover={{
                                    scale: 0.95,
                                    backgroundColor: "#f3f4f6",
                                }}
                                className="flex items-center justify-center w-full h-full border-2 border-blue-gray-100 bg-blue-gray-50 rounded-md"
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
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <Button size="lg" onClick={handleSubmission}>
                        Submit
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}
