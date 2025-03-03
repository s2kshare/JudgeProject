import React, { useContext } from "react";
import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography,
} from "@material-tailwind/react";
import {
    Cog6ToothIcon,
    PowerIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

export function AvatarDropdownComponent() {
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout(); // Calls logout mutation from context
        } catch (error) {
            console.error(error.message);
            toast.error("Logout failed");
        }
    };

    const profileMenuItems = [
        {
            label: "My Profile",
            icon: UserCircleIcon,
        },
        {
            label: "Edit Profile",
            icon: Cog6ToothIcon,
        },
        {
            label: "Sign Out",
            icon: PowerIcon,
            action: handleLogout, // Directly using handleLogout
        },
    ];

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center justify-center rounded-full w-10 h-10 bg-blue-gray-300 hover:bg-blue-gray-200 p-0.5"
                >
                    <h1 className="text-white hover:text-black transition-colors w-full h-full flex items-center justify-center">
                        T
                    </h1>
                    {/* <Avatar
                        variant="circular"
                        size="md"
                        alt="tania andrew"
                        withBorder={true}
                        color="blue-gray"
                        className=" p-0.5"
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                    /> */}
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, action }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={(e) => {
                                if (action) action(e);
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${
                                    isLastItem ? "text-red-500" : ""
                                }`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}
