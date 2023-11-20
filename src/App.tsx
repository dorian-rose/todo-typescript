import { useState } from "react";
import { NavBar, NewTaskForm, BasicModal, TaskList } from "./components";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const openCloseModal = () => setShowModal(!showModal);

  return (
    <div>
      <NavBar openCloseModal={openCloseModal} />
      <TaskList />
      <BasicModal
        show={showModal}
        close={openCloseModal}
        title="Tarea Nueva"
        children={<NewTaskForm close={openCloseModal} />}
      />
      {/* <NewTaskForm /> */}
    </div>
  );
}
