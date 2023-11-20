import {
  MdDelete,
  MdCheckCircle,
  MdOutlineEditNote,
  MdOutlineCircle,
} from "react-icons/md";
import { DateTime } from "luxon";
import classNames from "classnames";
import { PropsType } from "./TaskCard.types";

export function TaskCard(props: PropsType) {
  const { task, openInfo } = props;

  const onOpen = () => openInfo(task);

  return (
    <article className="relative justify-center bg-tertiary m-2 sm:m-4  pb-16  shadow">
      <header
        className={classNames(
          " px-4 py-2 ",
          {
            "border-b-4 border-green-100": task.completed,
          },
          { "border-b-4 border-orange-100": !task.completed }
        )}
      >
        <h2 className="h-8 overflow-hidden tracking-widest text-lg text-primary capitalize">
          {task.title}
        </h2>
        <p className="text-xs font-light italic text-gray-400">
          {DateTime.fromISO(`${task.date}`)
            .minus({ seconds: 1 })
            .setLocale("es")
            .toRelative()}
        </p>
      </header>

      <p
        onClick={onOpen}
        className="h-14  overflow-hidden text-ellipsis inline-block px-4 py-2"
      >
        {task.description}
      </p>

      <footer className="flex justify-between my-4 absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
        {task.completed ? (
          <button className="mx-4 text-green-500 text-xl p-1 shadow-xl rounded-full border ">
            <MdCheckCircle />
          </button>
        ) : (
          <button className="mx-4 text-green-500 text-xl p-1 shadow-xl rounded-full border ">
            <MdOutlineCircle />
          </button>
        )}
        <div className="flex justify-around">
          <button className="mx-4 text-primary text-xl p-1 shadow-xl rounded-full border ">
            <MdOutlineEditNote />
          </button>
          <button className="mx-4 text-alert text-xl p-1 shadow-xl rounded-full border ">
            <MdDelete />
          </button>
        </div>
      </footer>
    </article>
  );
}
