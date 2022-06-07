import { Category } from "./category";

export interface Task {
    id: number;
    name: string;
    endDate?: Date;
    priority?: number;
    category?: Category;
}