import logo from "../../assets/logo.png";
import { PropsTypes } from "./NavBar.types";

export function NavBar(props: PropsTypes) {
  const { openCloseModal } = props;

  return (
    <nav className="flex justify-between px-10 py-6 shadow-b shadow-md">
      <div className="flex">
        <div className="hidden xs:block w-16 rounded">
          <img className="rounded w-full" src={logo} alt="todo logo" />
        </div>
        <h1 className="pt-1 xs:pt-2.5 xs:ps-4 italic text-primary tracking-wide">
          To Do Task Manager
        </h1>
      </div>
      <button
        className="block shadow w-fit -top-6 text-xs sm:text-base py-1 px-3.5 sm:px-5 sm:py-2.5
            rounded-full text-white bg-primary border border-4 border-tertiary hover:border  hover:border-secondary hover:bg-tertiary hover:text-secondary "
        onClick={openCloseModal}
      >
        Crear tarea
      </button>
    </nav>
  );
}
