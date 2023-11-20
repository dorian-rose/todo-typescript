import {
  MdDelete,
  MdCheckCircle,
  MdOutlineEditNote,
  MdOutlineCircle,
} from "react-icons/md";
import { PropsType } from "./TaskCard.types";

export function TaskCard(props: PropsType) {
  const { task } = props;
  return (
    <article className="relative justify-center bg-tertiary m-2 sm:m-4 pt-2 pb-16 px-4 shadow">
      <header>
        <h2 className="tracking-widest text-lg text-primary">{task.title}</h2>
      </header>
      <body>
        <p>{task.description}</p>
      </body>{" "}
      <footer className="flex justify-center my-4 absolute bottom-0 left-1/2 -translate-x-1/2">
        {task.completed ? (
          <button className="mx-4 text-green-500 text-xl p-1 shadow-xl rounded-full border ">
            <MdCheckCircle />
          </button>
        ) : (
          <button className="mx-4 text-green-500 text-xl p-1 shadow-xl rounded-full border ">
            <MdOutlineCircle />
          </button>
        )}
        <button className="mx-4 text-primary text-xl p-1 shadow-xl rounded-full border ">
          <MdOutlineEditNote />
        </button>
        <button className="mx-4 text-alert text-xl p-1 shadow-xl rounded-full border ">
          <MdDelete />
        </button>
      </footer>
    </article>
  );
}
