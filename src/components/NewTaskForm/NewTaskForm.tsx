import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
// import { FormEvent } from "react";
import { Inputs, PropTypes } from "./NewTaskForm.types";
import { Task } from "../../api";

const taskActions = new Task();

export function NewTaskForm(props: PropTypes) {
  const { close } = props;
  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  //comments left for future reference, in case of capturing form data by hand
  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Formulario enviado");
  // };

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    taskActions.create(data);
    reset();
    close();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-tertiary  m-2 border border-primary shadow-lg rounded-xl z-20 pb-4  "
    >
      <h2 className="mt-5 text-primary text-lg text-center sm:text-xl">
        Nueva Tarea
      </h2>
      <input
        {...register("title", { required: "Título es requerido" })}
        type="text"
        placeholder="Título de la tarea"
        // className="font-light mt-2 w-10/12 m-auto block border border-1 rounded-3xl px-4 py-2 focus:outline-none focus:border-primary "
        className={classNames(
          "font-light mt-2 w-10/12 m-auto block border border-1 rounded-3xl px-4 py-2 focus:outline-none focus:border-primary",
          { "focus:border-alert border-alert bg-red-100": errors.title }
        )}
      />
      <p className="font-thin italic text-alert px-20 text-sm">
        {errors.title?.message}
      </p>
      <textarea
        {...register("description")}
        placeholder="Descripción de la tarea"
        className="font-light mt-2 w-10/12 m-auto block border border-1 rounded-3xl px-4 py-2 focus:outline-none focus:border-primary "
      />

      <button
        className="mt-8 w-10/12 m-auto block bg-primary text-tertiary shadow-md rounded-3xl px-4 py-2 focus:outline-none focus:border-primary hover:text-secondary hover:bg-tertiary hover:border hover:border-1  hover:border-secondary"
        type="submit"
      >
        Crear
      </button>
    </form>
  );
}
