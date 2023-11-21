import { v4 as uuidv4 } from "uuid";
import { filter } from "lodash";
import { TaskTypes } from "./tasks.types";
import { ITask } from "../../models";

const TASKS = "tasks";

export class Task {
  //constructor() {}
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

  delete(id: string): Array<ITask> {
    const tasks = this.obtain();
    const result = filter(tasks, (task) => {
      return task.id !== id;
    });
    localStorage.setItem(TASKS, JSON.stringify(result));
    return result;
  }

  update(task: ITask) {
    const tasks = this.obtain();

    const result = filter(tasks, (item) => {
      if (item.id === task.id) {
        item.title = task.title;
        item.description = task.description;
        item.completed = task.completed;
      }
      return tasks;
    });
    localStorage.setItem(TASKS, JSON.stringify(result));
  }
}
