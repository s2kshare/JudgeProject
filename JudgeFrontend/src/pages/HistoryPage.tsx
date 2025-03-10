import { SubmissionsTable } from "../components/tables/SubmissionsTable";

export default function HistoryPage() {
    return (
        <>
            <h1 className="mb-4">
                Below you can find the history of your lab submissions:
            </h1>
            <SubmissionsTable />
        </>
    );
}
