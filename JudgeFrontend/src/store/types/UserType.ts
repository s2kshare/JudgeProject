export interface User {
    id: number;
    username: string;
    email: string;
    role: "Student" | "Teacher" | "Admin";
}

export type UserPreview = Pick<User, "id" | "username" | "role">;
