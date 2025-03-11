import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";

// Pass an onChange prop to allow the parent component to manage the state
export function PaperSelect({
    onChange,
}: {
    onChange: (value: string | undefined) => void;
}) {
    const [value, setValue] = useState<string | undefined>("react");

    // Ensure the onChange handler handles both 'string' and 'undefined' values
    const handleChange = (val: string | undefined) => {
        setValue(val); // Update internal state
        onChange(val); // Pass the value (string or undefined) to the parent component
    };

    return (
        <div className="w-full">
            <Select
                label="Select Paper"
                value={value}
                onChange={(e) => handleChange(e)} // Trigger handleChange on change
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <Option value="html">Material Tailwind HTML</Option>
                <Option value="react">Material Tailwind React</Option>
                <Option value="vue">Material Tailwind Vue</Option>
                <Option value="angular">Material Tailwind Angular</Option>
                <Option value="svelte">Material Tailwind Svelte</Option>
            </Select>
        </div>
    );
}
