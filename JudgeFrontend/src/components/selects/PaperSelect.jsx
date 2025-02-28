import { Select, Option } from "@material-tailwind/react";

export function PaperSelect() {
    return (
        <div className="w-full">
            <Select label="Select Paper" variant="standard">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
            </Select>
        </div>
    );
}
