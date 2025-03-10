import logo from "../assets/gavel-svgrepo-com.svg";
import OverviewElement from "../components/dashboard/OverviewElement";

export const JUDGE_FE_VERSION = "0.0.1";
export const JUDGE_NAME = "Judge Project";
export const JUDGE_LOGO = logo;

export const JUDGE_ADMIN_TABS = [
    {
        label: "Overview",
        value: "overview",
        desc: `This page will hold information about the project and overall insights of the applications state.`,
        element: <OverviewElement />,
    },
    {
        label: "Manage Users",
        value: "users",
        desc: `Because it's about motivating the doers. Because I'm here
  to follow my dreams and inspire other people to follow their dreams, too.`,
        element: <>Not Hehe</>,
    },
    {
        label: "Manage Papers",
        value: "papers",
        desc: `We're not always in the position that we want to be at.
  We're constantly growing. We're constantly making mistakes. We're
  constantly trying to express ourselves and actualize our dreams.`,
        element: <>Not Hehe</>,
    },
    {
        label: "Manage Labs",
        value: "labs",
        desc: `Because it's about motivating the doers. Because I'm here
  to follow my dreams and inspire other people to follow their dreams, too.`,
        element: <>Not Hehe</>,
    },
    {
        label: "Manage Submissions",
        value: "submissions",
        desc: `We're not always in the position that we want to be at.
  We're constantly growing. We're constantly making mistakes. We're
  constantly trying to express ourselves and actualize our dreams.`,
        element: <>Not Hehe</>,
    },
];
