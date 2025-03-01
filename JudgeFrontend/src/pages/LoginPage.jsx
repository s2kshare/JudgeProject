import { Typography } from "@material-tailwind/react";
import { LoginForm } from "../components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="home bg-blue-gray-50 component w-full h-full min-h-[100vh] px-10 overflow-y-scroll flex-[4_4_0%] items-center">
            <LoginForm />
        </div>
    );
}
