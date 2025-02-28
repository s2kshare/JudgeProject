import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion"; // Use framer-motion instead of motion/react
import SubmitLabForm from "../forms/SubmitLabForm";

export default function SubmitLabModal({ isOpen, setIsOpen }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50"
                >
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <SubmitLabForm />
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
