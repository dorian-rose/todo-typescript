import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
// import { FormEvent } from "react";
import { Inputs, PropTypes } from "./NewTaskForm.types";
import { Task } from "../../api";

const taskActions = new Task();

export function NewTaskForm(props: PropTypes) {
  const { close, task } = props;

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
    if (task) {
      const newData = {
        ...task,
        title: data.title,
        description: data.description,
      };
      taskActions.update(newData);
    } else {
      taskActions.create(data);
    }
    reset();
    close();
  };
  return (
    <form className="rounded-3xl p-2 " onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title", { required: "Título es requerido" })}
        type="text"
        defaultValue={task ? task.title : ""}
        placeholder={task ? "" : "Título de la tarea"}
        // className="font-light mt-2 w-10/12 m-auto block border border-1 rounded-3xl px-4 py-2 focus:outline-none focus:border-primary "
        className={classNames(
          "shadow-inner font-light pt-2 w-10/12 m-auto block border border-1 rounded-3xl px-4 py-2 focus:outline-none focus:border-primary",
          { "focus:border-alert border-alert bg-red-100": errors.title }
        )}
      />
      <p className="font-thin italic text-alert px-20 text-sm">
        {errors.title?.message}
      </p>
      <textarea
        {...register("description")}
        defaultValue={task ? task.description : ""}
        placeholder="Descripción de la tarea"
        className="shadow-inner font-light mt-2 w-10/12 m-auto block border border-1 rounded-3xl px-4 py-2 focus:outline-none focus:border-primary "
      />

      <button
        className="mt-8 w-10/12 m-auto block bg-primary text-tertiary shadow-md rounded-3xl px-4 py-2 focus:outline-none focus:border-primary hover:text-secondary hover:bg-tertiary hover:border hover:border-1  hover:border-secondary"
        type="submit"
      >
        {task ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
