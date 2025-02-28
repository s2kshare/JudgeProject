import { Select, Option } from "@material-tailwind/react";

export function LabSelect() {
    return (
        <div className="w-full">
            <Select label="Select Lab" variant="standard">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
            </Select>
        </div>
    );
}
