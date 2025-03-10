import React from "react";
import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";

export default function UserProfile() {
    return (
        <Menu>
            <MenuHandler>
                <Button
                    variant="text"
                    className="flex gap-2"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    <Avatar
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                        alt="avatar"
                        variant="rounded"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                    />
                    <div>
                        <Typography
                            className="text-start"
                            variant="h6"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        >
                            Username
                        </Typography>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal text-start text-xs"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        >
                            Year Level
                        </Typography>
                    </div>
                </Button>
            </MenuHandler>
            <MenuList
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <MenuItem
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    Edit Profile
                </MenuItem>
                <hr className="my-3 border-[--col-base-400]" />
                <MenuItem
                    className="text-red-300"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
