// TODO: Replace fields relevant to BE Models

export interface LabSubmission {
    id: number;
    result: "pending" | "success" | "incorrect" | "error";
    source_code: string;
    labID: number;
    output?: string;
    error?: string;
    exit_code?: number;
    submittedAt: Date;
}
