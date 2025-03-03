import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import StudentManagement from "../components/dashboard/StudentManagement";
import LabManagement from "../components/dashboard/LabManagement";
import PaperManagement from "../components/dashboard/PaperManagement";
import { UserContext } from "../contexts/UserContext";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("students");
    const { user } = useContext(UserContext);

    const data = [
        {
            label: "Student Management",
            value: "students",
            role: ["Teacher", "Admin"],
            desc: <StudentManagement />,
        },
        {
            label: "Lab Management",
            value: "labs",
            role: ["Teacher", "Admin"],
            desc: <LabManagement />,
        },

        {
            label: "Paper Management",
            value: "papers",
            role: ["Admin"],
            desc: <PaperManagement />,
        },
    ];

    return (
        <Tabs id="custom-animation" value="students">
            <TabsHeader>
                {data.map(({ label, value, role }) => (
                    <Tab
                        key={value}
                        value={value}
                        disabled={!user || !role.includes(user.role)} // Check user role
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
            >
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}
