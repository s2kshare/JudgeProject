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
import {
    Cog6ToothIcon,
    PowerIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        action: () => console.log("My Profile clicked"),
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        action: () => console.log("Edit Profile clicked"),
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        action: (e, navigate) => {
            e.preventDefault();
            console.log("Signing out");
            localStorage.removeItem("judge-project-uid");
            localStorage.removeItem("judge-project-role");
            navigate("/");
        },
    },
];

export function AvatarDropdownComponent() {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center rounded-full p-0"
                >
                    <Avatar
                        variant="circular"
                        size="md"
                        alt="tania andrew"
                        withBorder={true}
                        color="blue-gray"
                        className=" p-0.5"
                        src="https://docs.material-tailwind.com/img/face-2.jpg"
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon, action }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={(e) => {
                                action(e, navigate);
                                closeMenu();
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
