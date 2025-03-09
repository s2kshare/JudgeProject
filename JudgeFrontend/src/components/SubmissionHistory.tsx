import { SubmissionsTable } from "./tables/SubmissionsTable";

export default function SubmissionHistory() {
    return (
        <>
            <h1 className="text-2xl font-medium mb-4">Submission History</h1>
            <SubmissionsTable />
        </>
    );
}
