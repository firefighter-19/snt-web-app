import { FC } from "react";
import classes from "./Error.module.scss";

interface Props {
  message: string;
}

export const Error: FC<Props> = ({ message }) => <p className={classes.error}>{message}</p>;
