import { Dialog } from "@headlessui/react";
import { PaperSelect } from "../selects/PaperSelect";
import { LabSelect } from "../selects/LabSelect";
import FileInput from "../FileInput";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function SubmissionModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [paper, setPaper] = useState<string | undefined>(undefined);
    const [lab, setLab] = useState<string | undefined>(undefined);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSubmit = async () => {
        // Prepare the data as JSON instead of FormData
        const submissionData = {
            paper: paper ?? "",
            lab: lab ?? "",
            files: files
                ? Array.from(files).map((file) => ({
                      name: file.name,
                      type: file.type,
                      size: file.size,
                  }))
                : [],
        };

        // Log the submission data to verify before sending
        console.log("Submission data ready:", submissionData);

        try {
            // TODO API: Send the submission data to the backend
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Handle paper select change
    const handlePaperChange = (newPaper: string | undefined) => {
        setPaper(newPaper);
    };

    // Handle lab select change
    const handleLabChange = (newLab: string | undefined) => {
        setLab(newLab);
    };

    // Handle file input change
    const handleFileChange = (newFiles: FileList | null) => {
        setFiles(newFiles);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center z-20"
        >
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <Dialog.Panel className="bg-white min-w-96 p-6 rounded shadow-lg z-10">
                <h1 className="text-2xl font-medium mb-4">Lab Submission</h1>
                <div className="flex flex-col gap-4 max-w-96 items-start w-full">
                    <PaperSelect onChange={handlePaperChange} />
                    <LabSelect onChange={handleLabChange} />
                    <FileInput onChange={handleFileChange} />
                    <div className="options flex justify-between w-full gap-2 mt-4">
                        <Button
                            variant="text"
                            onClick={() => setIsOpen(false)}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-[--col-text-200] flex-4"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
