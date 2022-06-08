import { Category } from "./category";

export interface Task {
    id: number;
    name: string;
    startDate?: Date;
    endDate?: Date;
    priority?: number;
    category?: Category;
}