import { User } from "./user";
import { Task } from "./task";
import { Category } from "./category";

export interface AboutUser {
    id: number;
    user: User;
    listOfTasks: Task[];
    listOfCategories: Category[];
}