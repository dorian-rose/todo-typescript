import { ITask } from "../../models";

export type Inputs = {
  title: string;
  description: string;
};

export type PropTypes = {
  close: () => void;
  task?: ITask;
};
