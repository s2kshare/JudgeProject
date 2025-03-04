import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Button,
    Typography,
} from "@material-tailwind/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { PaperSelect } from "./selects/PaperSelect";
import SubmitLabModal from "./modals/SubmitLabModal";
import { navigation_links } from "../constants/navigationLinks";
import { UserContext } from "../contexts/UserContext";

export function SidebarComponent() {
    const { user, userHome, isHomeLoading } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {}, [user]);

    if (isHomeLoading) {
        console.log("Loading Home...");
    }

    return (
        <>
            <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 min-h-[100vh] fixed flex-1">
                <div className="mb-2 flex items-center gap-4 p-4">
                    <img
                        src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                        alt="brand"
                        className="h-8 w-8"
                    />
                    <Typography variant="h4">Judge Project</Typography>
                </div>

                <List>
                    <NavLink to="/">
                        <ListItem>
                            <ListItemPrefix>
                                <IoIosHome className="h-5 w-5" />
                            </ListItemPrefix>
                            Home
                        </ListItem>
                    </NavLink>

                    <hr className="my-2 border-blue-gray-50" />

                    {!user ? (
                        <NavLink to="/login">
                            <ListItem>
                                <ListItemPrefix>
                                    <UserCircleIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Login
                            </ListItem>
                        </NavLink>
                    ) : (
                        navigation_links.pages
                            .filter(
                                (link) =>
                                    !link.role ||
                                    (user.role && link.role.includes(user.role))
                            )
                            .map((link) => (
                                <NavLink key={link.path} to={link.path}>
                                    <ListItem>
                                        <ListItemPrefix>
                                            <link.icon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        {link.name}
                                    </ListItem>
                                </NavLink>
                            ))
                    )}

                    <hr className="my-2 border-blue-gray-50" />

                    {user && (
                        <>
                            <PaperSelect />
                            <Button
                                variant="filled"
                                className="h-14"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <span className="flex items-center gap-3 justify-center">
                                    <IoCloudUploadOutline className="h-5 w-5" />
                                    Submit New Lab
                                </span>
                            </Button>
                        </>
                    )}
                </List>
            </Card>

            <SubmitLabModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </>
    );
}
