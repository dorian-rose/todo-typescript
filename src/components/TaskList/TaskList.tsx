import { useState } from "react";
import { map } from "lodash";
import { Task } from "../../api";
import { TaskCard } from "../TaskCard";

const task = new Task();

export function TaskList() {
  const items = task.obtain();
  const [tasks, setTasks] = useState(items);
  return (
    <section className="mx-6 my-6 sm:my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {map(tasks, (task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}
