import { FC } from "react";
import { UseFormRegister, ValidationRule } from "react-hook-form";
import { Register } from "../../../graphql/dto/registerUser";
import classes from "./Input.module.scss";

interface Props {
  title: string;
  label: keyof Register;
  value?: string | number | null;
  defaultValue?: string | number;
  type: "text" | "password" | "number" | "email";
  placeholder?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  autoComplete?: "true";
  pattern?: ValidationRule<RegExp>;
  register: UseFormRegister<Register>;
}

export const Input: FC<Props> = ({
  title,
  label,
  type,
  placeholder,
  min,
  max,
  minLength,
  maxLength,
  required,
  autoComplete,
  pattern,
  register,
}) => (
  <div className={classes.custom__input_container}>
    <label htmlFor={title} className={classes.custom__label}>
      {title}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(label, {
        required,
        pattern,
        min,
        max,
        minLength,
        maxLength,
      })}
      autoComplete={autoComplete}
    />
  </div>
);
