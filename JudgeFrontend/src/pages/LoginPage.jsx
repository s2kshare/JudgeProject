import { Typography } from "@material-tailwind/react";
import { LoginForm } from "../components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="home bg-blue-gray-50 component w-full h-full min-h-[100vh] px-10 overflow-y-scroll flex-[4_4_0%] items-center">
            <div className="flex items-center w-full my-6">
                <Typography variant="h1" className="flex-1 mt-6 mb-3">
                    Judge Project
                </Typography>
                <div className="flex-1 gap-3 flex justify-end items-center"></div>
            </div>
            <LoginForm />
        </div>
    );
}
