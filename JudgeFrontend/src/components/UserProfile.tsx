import React, { useState } from "react";
import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import EditProfileModal from "./modals/EditProfileModal";

export default function UserProfile() {
    const [isOpeningProfile, setIsOpeningProfile] = useState(false);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();

        // TODO API: Implement logout
    };

    const handleProfile = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpeningProfile(true);
        // TODO: Implement profile modal
    };

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
                    onClick={handleProfile}
                >
                    Edit Profile
                </MenuItem>
                <hr className="my-3 border-[--col-base-400]" />
                <MenuItem
                    className="text-red-300"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    onClick={handleLogout}
                >
                    Logout
                </MenuItem>
            </MenuList>
            <EditProfileModal
                isOpen={isOpeningProfile}
                setIsOpen={setIsOpeningProfile}
            />
        </Menu>
    );
}
