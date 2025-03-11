import React, { useState } from "react";
import { motion } from "framer-motion";

// Accept an onChange prop from the parent component to handle the selected files
interface FileInputProps {
    onChange: (files: FileList | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const droppedFiles = e.dataTransfer.files;
        setFiles(droppedFiles);
        onChange(droppedFiles); // Notify the parent component
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles) {
            setFiles(selectedFiles);
            onChange(selectedFiles); // Notify the parent component
        }
    };

    const renderFileNames = () => {
        if (!files) return null;
        return Array.from(files).map((file, index) => (
            <div key={index}>{file.name}</div>
        ));
    };

    return (
        <motion.div
            className={`file-input ${dragging ? "dragging h-32" : "h-32"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1.05 }}
            style={{
                border: "2px dashed var(--col-base-300)",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                width: "100%",
                backgroundColor: dragging ? "var(--col-base-100)" : "#f9f9f9",
            }}
        >
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
            />
            <label htmlFor="file-upload">
                <motion.div
                    className="upload-text flex items-center justify-center w-full h-full"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {files && files.length > 0
                        ? "Files selected"
                        : "Drag & Drop or Click to Upload"}
                </motion.div>
            </label>
            {renderFileNames()}
        </motion.div>
    );
};

export default FileInput;
