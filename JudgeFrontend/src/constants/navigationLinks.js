import { MdDashboard } from "react-icons/md";

export const navigation_links = {
    pages: [
        {
            name: "Dashboard",
            path: "/dashboard",
            role: ["Teacher", "Admin"],
            icon: MdDashboard, // Store as a component reference
        },
    ],
};
