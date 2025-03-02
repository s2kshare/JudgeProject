import { Outlet } from "react-router-dom";
import { SidebarComponent } from "../components/SidebarComponent";
import TitlePageComponent from "../components/TitlePageComponent";
import { useLocationService } from "../components/services/LocationContextType";
import { motion } from "framer-motion";

const Layout = () => {
    const { path } = useLocationService();

    return (
        <div className="App w-full flex min-h-[100vh]">
            <SidebarComponent />
            <div className="w-full max-w-[20rem]"></div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="home bg-blue-gray-50 w-full h-full min-h-[100vh] px-10 overflow-y-scroll flex-[4_4_0%]"
            >
                <TitlePageComponent page={path} />
                <Outlet />
            </motion.div>
        </div>
    );
};

export default Layout;
