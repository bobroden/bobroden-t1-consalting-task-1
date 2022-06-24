import { Task } from "./task";

export interface User {
    id?: number;
    login: string;
    password: string;
    listOfTasks: Task[];
    listOfCategories: string[];
}