import React, { useContext, useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { UserContext } from "../../contexts/UserContext";

export function PaperSelect({ setSelectedPaper = () => {} }) {
    const { user, userHome, isHomeLoading } = useContext(UserContext);
    const [value, setValue] = useState("");

    // Set the default value when userHome is loaded
    useEffect(() => {
        if (userHome?.papers?.length > 0) {
            setValue(userHome.papers[0].paperName); // Set the first paper's name as the default value
            setSelectedPaper(userHome.papers[0].paperName);
        }
    }, [userHome]); // Runs when userHome is updated

    if (isHomeLoading) {
        return <div>Loading Home...</div>;
    }

    const handlePaperChange = (val) => {
        setValue(val);
        setSelectedPaper(val);
    };

    return (
        <div className="w-full my-1">
            <Select
                label="Select Paper"
                value={value}
                onChange={handlePaperChange}
            >
                {userHome?.papers?.length > 0 ? (
                    userHome.papers.map((paper, index) => (
                        <Option key={index} value={paper.paperName}>
                            {paper.paperName}
                        </Option>
                    ))
                ) : (
                    <Option disabled>No papers available</Option>
                )}
            </Select>
        </div>
    );
}
