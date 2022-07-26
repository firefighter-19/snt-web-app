import { ChangeEvent, FC } from "react";

interface Props {
  title: string;
  value: string;
  type: "text" | "password";
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const Input: FC<Props> = ({ title, value, type, onChange }) => (
  <div>
    <p>{title}</p>
    <label htmlFor={title}>
      <input type={type} value={value} onChange={onChange} id={title} />
    </label>
  </div>
);
