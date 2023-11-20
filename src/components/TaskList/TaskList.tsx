import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import classNames from "classnames";
import { map, size } from "lodash";
import { Task } from "../../api";
import { ITask } from "../../models";
import { BasicModal, TaskCard } from "..";

const task = new Task();

export function TaskList() {
  const items = task.obtain();
  const [tasks, setTasks] = useState(items);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModaLInfo] = useState<any>({});

  const openCloseModal = () => setShowModal(!showModal);

  const moreInfo = (task: ITask) => {
    setModaLInfo({ title: task.title, children: task.description });
    openCloseModal();
  };

  if (size(tasks) < size(items)) setTasks(items);

  const renderTasks = (completed: boolean) => {
    return map(tasks, (task) => {
      if (task.completed === completed) {
        return <TaskCard key={task.id} task={task} openInfo={moreInfo} />;
      }
    });
  };
  return (
    <>
      <section className="mx-6 my-3 sm:my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {renderTasks(false)}
      </section>
      <section className="m-2 shadow">
        <header className="px-10 border border-2 flex justify-between bg-tertiary ">
          <h2 className="tracking-widest italic text-gray-400">
            Tareas completadas
          </h2>
          {expanded ? (
            <button
              className="text-gray-400 text-2xl px-0.5 shadow-xl rounded-full border "
              onClick={() => setExpanded(false)}
            >
              <MdExpandMore />
            </button>
          ) : (
            <button
              className="text-gray-400 text-2xl px-0.5 shadow-xl rounded-full border "
              onClick={() => setExpanded(true)}
            >
              <MdExpandLess />
            </button>
          )}
        </header>
        <div
          className={classNames(
            "mx-6 my-3 sm:my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
            {
              hidden: !expanded,
            }
          )}
        >
          {renderTasks(true)}
        </div>
      </section>
      <BasicModal
        show={showModal}
        close={openCloseModal}
        title={modalInfo?.title || ""}
        children={modalInfo.children}
        // children={<NewTaskForm close={openCloseModal} />}
      />
    </>
  );
}
