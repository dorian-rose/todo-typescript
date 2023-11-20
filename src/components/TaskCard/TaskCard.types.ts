import { ITask } from "../../models";

export type PropsType = {
  task: ITask;
  openInfo: (task: ITask) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: ITask) => void;
};
