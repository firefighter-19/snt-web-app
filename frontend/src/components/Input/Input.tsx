import { ChangeEvent, FC } from "react";

interface Props {
  title: string;
  value?: string | number | null;
  defaultValue?: string | number;
  type: "text" | "password" | "number" | "email";
  placeholder?: string | number | null;
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
  required?: boolean;
  autoComplete?: "true";
  pattern?: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export const Input: FC<Props> = ({
  title,
  value,
  type,
  defaultValue,
  placeholder,
  minValue,
  maxValue,
  maxLength,
  required,
  autoComplete,
  pattern,
  onChange,
}) => (
  <div>
    <label htmlFor={title}>{title}</label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      id={title}
      title={title}
      defaultValue={defaultValue}
      placeholder={placeholder?.toString() || ""}
      min={minValue}
      max={maxValue}
      maxLength={maxLength}
      required={required}
      autoComplete={autoComplete}
      pattern={pattern}
    />
  </div>
);
