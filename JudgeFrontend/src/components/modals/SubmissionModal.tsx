import { Dialog } from "@headlessui/react";

export default function SubmissionModal({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 flex items-center justify-center"
        >
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg z-10">
                <h1 className="text-2xl font-medium mb-4">Lab Submission</h1>
                <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    );
}
