import { Button, Typography } from "@material-tailwind/react";
import { AvatarDropdownComponent } from "./AvatarDropdownComponent";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function TitlePageComponent({ page }) {
    const { user } = useContext(UserContext);

    return (
        <div
            className={
                localStorage.getItem("judge-project-role")
                    ? "flex items-center w-full my-6"
                    : "hidden"
            }
        >
            {user && (
                <>
                    <Typography variant="h1" className="flex-1 mt-6 mb-3">
                        {page}
                    </Typography>
                    <div className="flex-1 gap-3 flex justify-end items-center">
                        <Button variant="filled" size="sm">
                            Submit Lab
                        </Button>
                        <AvatarDropdownComponent />
                    </div>
                </>
            )}
        </div>
    );
}
