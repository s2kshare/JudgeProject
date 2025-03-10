import { Lab } from "./LabType";

export interface Paper {
    id: number;
    name: string;
    code: string;

    teacherID: number;
    labs: Lab[];
}

export type PaperPreview = Pick<Paper, "id" | "name" | "code">;
