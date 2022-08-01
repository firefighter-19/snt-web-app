import { FC, ReactNode } from "react";
import classes from "./Form.module.scss";

interface Props {
  children: ReactNode;
  btnText: string;
  onClick(): void;
}

export const Form: FC<Props> = ({ children, btnText, onClick }) => (
  <form className={classes.form}>
    {children}
    <button
      type="submit"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      {btnText}
    </button>
  </form>
);
