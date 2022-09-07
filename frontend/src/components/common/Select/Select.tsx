import { FC } from "react";
import classes from "./Select.module.scss";

interface Props {
  options: number[];
  value?: string | number | readonly string[] | undefined;
  multiple?: boolean;
  required?: boolean;
}

export const Select: FC<Props> = ({ options, multiple, value, required }) => (
  <div className={classes.custom__select_container}>
    <select multiple={multiple} value={value} required={required}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
