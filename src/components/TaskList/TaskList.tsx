import { useState, useEffect } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import classNames from "classnames";
import { map, size } from "lodash";
import { Task } from "../../api";
import { ITask } from "../../models";
import { BasicModal, TaskCard, NewTaskForm } from "..";

const task = new Task();

export function TaskList() {
  const items = task.obtain();
  const [tasks, setTasks] = useState(items);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModaLInfo] = useState<any>({});
  const [reload, setReload] = useState(false);

  // useEffect(() => setTasks(items), [reload]);
  useEffect(() => setTasks((prevItems) => task.obtain()), [reload]);

  //function to open or close modal
  const openCloseModal = () => setShowModal(!showModal);

  //to reload tasks
  const onReloadTasks = () => setReload(!reload);

  //function that sets modal info for more detail view and calls open modal function
  const moreInfo = (task: ITask) => {
    setModaLInfo({ title: task.title, children: task.description });
    openCloseModal();
  };

  //updates task list when added task
  if (size(tasks) < size(items)) setTasks(items);

  //calls delete and updates task list
  const onDeleteTask = (id: string) => {
    const response = task.delete(id);
    setTasks(response);
  };

  //updates task
  const onUpdateTask = (task: ITask) => {
    setModaLInfo({
      title: `Editar ${task.title}`,
      children: (
        <NewTaskForm
          close={() => {
            onReloadTasks();
            setShowModal(false);
          }}
          task={task}
        />
      ),
    });
    openCloseModal();
  };

  const onCompleteTask = (data: ITask) => {
    const newData = data;
    newData.completed = !data.completed;
    task.update(newData);
    onReloadTasks();
  };

  //updates task
  const showNewTaskForm = () => {
    setModaLInfo({
      title: "Nueva tarea",
      children: (
        <NewTaskForm
          close={() => {
            onReloadTasks();
            setShowModal(false);
          }}
        />
      ),
    });
    openCloseModal();
  };

  //find number of pending/complete tasks
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  //reusable code for rendering task cards
  const renderTasks = (completed: boolean) => {
    return map(tasks, (task) => {
      if (task.completed === completed) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            openInfo={moreInfo}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
            onCompleteTask={onCompleteTask}
          />
        );
      }
    });
  };

  return (
    <>
      <section className="mx-6 my-3 sm:my-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4">
        {renderTasks(false)}
        {pendingTasks.length === 0 && (
          <div className="col-span-full">
            <p className="text-secondary">
              No hay tareas pendientes.
              <span
                className="mx-2 underline hover:text-primary"
                onClick={() => showNewTaskForm()}
              >
                Crear una nueva
              </span>
              {completedTasks.length !== 0 && (
                <>
                  o
                  <span
                    className="mx-2 underline hover:text-primary"
                    onClick={() => setExpanded(!expanded)}
                  >
                    ver tareas completadas
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </section>
      <section className="m-2 pb-4 border border-2 shadow">
        <header className="px-10 border border-b flex justify-between bg-tertiary ">
          <h2 className="tracking-widest italic text-gray-400 pt-1.5">
            {expanded
              ? "Esconder tareas completadas"
              : "Ver tareas completadas"}
          </h2>
          {expanded ? (
            <button
              className="relative top-2 text-gray-400 text-3xl p-1 bg-white shadow-xl rounded-full border "
              onClick={() => setExpanded(false)}
            >
              <MdExpandLess />
            </button>
          ) : (
            <button
              className="relative top-2 text-gray-400 text-3xl p-1 bg-white shadow-xl rounded-full border  "
              onClick={() => setExpanded(true)}
            >
              <MdExpandMore />
            </button>
          )}
        </header>
        <div
          className={classNames(
            "mx-6 my-3 sm:my-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4",
            {
              hidden: !expanded,
            }
          )}
        >
          {renderTasks(true)}
          {completedTasks.length === 0 && (
            <div className="col-span-full">
              <p className="text-secondary">
                Todavía no tienes tareas completadas.
              </p>
            </div>
          )}
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
