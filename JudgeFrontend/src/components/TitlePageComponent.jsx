import { Button, Typography } from "@material-tailwind/react";
import { AvatarDropdownComponent } from "./AvatarDropdownComponent";

export default function TitlePageComponent({ page }) {
    return (
        <div className="flex items-center w-full my-6">
            <Typography variant="h1" className="flex-1 mt-6 mb-3">
                {page}
            </Typography>
            <div className="flex-1 gap-3 flex justify-end items-center">
                <Button variant="filled" size="sm">
                    Submit Lab
                </Button>
                <AvatarDropdownComponent />
            </div>
        </div>
    );
}
