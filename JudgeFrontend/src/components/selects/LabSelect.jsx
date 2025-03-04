import { Select, Option } from "@material-tailwind/react";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";

export function LabSelect({ selectedPaper, selectedLab, setSelectedLab }) {
    const { user, userHome, isHomeLoading } = useContext(UserContext);
    const [labs, setLabs] = useState([]); // Store labs for the selected paper

    useEffect(() => {
        // When selectedPaper changes, filter labs and select the first one
        if (selectedPaper && userHome?.papers) {
            const paper = userHome.papers.find(
                (p) => p.paperName === selectedPaper
            );
            if (paper && paper.labs?.length > 0) {
                console.log(paper.labs);
                setLabs(paper.labs); // Filter labs based on selected paper

                // Only set the first lab if selectedLab is not already set
                if (!selectedLab) {
                    setSelectedLab(paper.labs[0].labName); // Automatically select the first lab
                    console.log("Loading >> Selected " + selectedLab);
                }
            }
        }
    }, [selectedPaper, userHome, selectedLab, setSelectedLab]); // Trigger when selectedPaper, userHome, or selectedLab changes

    if (isHomeLoading) {
        return <div>Loading Home...</div>;
    }

    return (
        <div className="w-full">
            <Select
                label="Select Lab"
                variant="standard"
                onChange={(val) => setSelectedLab(val)} // Update the selected lab
            >
                {labs.length > 0 ? (
                    labs.map((lab, index) => (
                        <Option key={index} value={lab.labName}>
                            {lab.labNumber}: {lab.labName}
                        </Option>
                    ))
                ) : (
                    <Option disabled>No labs available for this paper</Option>
                )}
            </Select>
        </div>
    );
}
