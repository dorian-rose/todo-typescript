import { v4 as uuidv4 } from "uuid";
import { TaskTypes } from "./tasks.types";
import { ITask } from "../../models";

const TASKS = "tasks";

export class Task {
  constructor() {}
  create(params: TaskTypes.Create) {
    const newData: ITask = {
      id: uuidv4(),
      completed: false,
      date: new Date(),
      ...params,
    };
    const storedTasks = this.obtain();
    storedTasks.push(newData);
    const saveData = JSON.stringify(storedTasks);
    localStorage.setItem(TASKS, saveData);
  }

  obtain(): Array<ITask> {
    const data = localStorage.getItem(TASKS);
    if (!data) return [];
    return JSON.parse(data);
  }
}
