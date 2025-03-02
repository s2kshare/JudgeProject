import { Button, Typography } from "@material-tailwind/react";
import { AvatarDropdownComponent } from "./AvatarDropdownComponent";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { QueryClient } from "../../node_modules/@tanstack/query-core/src/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function TitlePageComponent({ page }) {
    const QueryClient = useQueryClient();
    const user = QueryClient.getQueryData(["user"]);

    if (!user) return null;

    const variants = {
        close: {
            y: "100%",
        },
        open: {
            y: "0%",
        },
    };

    return (
        <motion.div
            variants={variants}
            className="flex items-center w-full my-6 overflow-hidden"
            initial="close"
            animate="open"
            exit={"close"}
            transition={{ duration: 0.5 }}
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
        </motion.div>
    );
}
