import { PropsTypes } from "./BasicModal.types";

export function BasicModal(props: PropsTypes) {
  const { show, close, children } = props;
  console.log(show);
  return (
    <div
      className={`${
        show ? "absolute" : "hidden"
      }   left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-2xl w-10/12 sm:w-8/12 md:1/2`}
    >
      <button
        className="absolute right-4 -top-4 bg-alert text-xs text-white px-1 rounded"
        onClick={close}
      >
        X
      </button>
      {children}
    </div>
  );
}
