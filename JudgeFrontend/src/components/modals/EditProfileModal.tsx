import { IoCloudUploadOutline } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import { Button, Input } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function EditProfileModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleSubmit = async () => {};

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center z-10"
        >
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <Dialog.Panel className="bg-white w-1/2 min-w-96 p-6 rounded shadow-lg z-10">
                <h1 className="text-2xl font-medium mb-4">Edit Profile</h1>
                <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex w-full">
                        <div className="w-full flex-1 flex flex-col gap-3">
                            <h1 className=" text-sm font-semibold">
                                Edit User Settings
                            </h1>
                            <Input
                                variant="outlined"
                                label="Username"
                                placeholder="Outlined"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                            <Input
                                variant="outlined"
                                label="Email Address"
                                placeholder="Outlined"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                            <Input
                                variant="outlined"
                                label="First Name"
                                placeholder="Outlined"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                            <Input
                                variant="outlined"
                                label="Last Name"
                                placeholder="Outlined"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                            <hr className="my-3 border-gray-300" />
                            <Input
                                variant="outlined"
                                type="password"
                                label="New Password"
                                placeholder="Outlined"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                            <Input
                                variant="outlined"
                                type="password"
                                label="Re-enter New Password"
                                placeholder="Outlined"
                                crossOrigin={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                            />
                        </div>
                        <motion.div className="w-full flex-1 flex flex-col items-center justify-center">
                            <h1 className="mb-3">Change Profile Picture</h1>
                            <motion.div
                                className="relative hover:cursor-pointer w-52 h-52 flex items-center justify-center rounded-xl overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.img
                                    src="https://picsum.photos/300/300"
                                    alt="Profile Placeholder"
                                    className="object-cover w-full h-full rounded-xl"
                                    animate={{ opacity: 1 }}
                                    whileHover={{ opacity: 0.5 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>
                            <Button
                                placeholder={undefined}
                                onPointerEnterCapture={undefined}
                                onPointerLeaveCapture={undefined}
                                size="sm"
                                className="mt-3 flex gap-2 items-center"
                            >
                                <IoCloudUploadOutline className="h-5 w-5 opacity-90" />{" "}
                                Upload
                            </Button>
                        </motion.div>
                    </div>
                    <div className="options flex justify-between w-full gap-2 mt-4">
                        <Button
                            variant="text"
                            className="flex-1"
                            onClick={() => setIsOpen(false)}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="flex-2"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}
