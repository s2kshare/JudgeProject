import { MdHistory } from "react-icons/md";
import { Avatar, Typography } from "@material-tailwind/react";
import StudentPaperProgressChart from "../components/charts/StudentPaperProgressChart";
import { AvatarDropdownComponent } from "../components/AvatarDropdownComponent";
import SubmissionSuccessChart from "../components/charts/SubmissionSuccessChart";
import SubmissionListComponent from "../components/SubmissionListComponent";

export default function UserHomePage() {
    return (
        <>
            <div className="dashboard flex-1 flex w-full gap-3 mb-3">
                <StudentPaperProgressChart />
                <SubmissionSuccessChart />
            </div>
            <div className="submissions mb-6">
                <Typography
                    variant="h3"
                    className="flex-1 mt-6 mb-3 flex gap-3 items-center"
                >
                    <MdHistory />
                    Recent Submissions
                </Typography>
                <SubmissionListComponent />
            </div>
        </>
    );
}
