import { ChangeEvent, FC, useState } from "react";
import { Container } from "../../components/Container/Container";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { Register } from "../../graphql/dto/registerUser";
import { getRegistered } from "./getRegistered";

enum RegisterFields {
  NAME = "Имя",
  LAST_NAME = "Фамилия",
  EMAIL = "Электронный адрес",
  PASSWORD = "Пароль",
  SITE_NUMBER = "Номер участка",
}

export const Registration: FC = () => {
  const [registerFields, setRegisterFields] = useState<Register>({
    email: "",
    password: "",
    name: "",
    lastName: "",
    siteNumber: null,
  });

  const { register } = getRegistered({
    email: registerFields.email.trim(),
    password: registerFields.password.trim(),
    name: registerFields.name.trim(),
    lastName: registerFields.lastName.trim(),
    siteNumber: Number(registerFields.siteNumber),
  });

  const changeData = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, title } = target;

    const field = {
      [RegisterFields.NAME]: "name",
      [RegisterFields.LAST_NAME]: "lastName",
      [RegisterFields.EMAIL]: "email",
      [RegisterFields.PASSWORD]: "password",
      [RegisterFields.SITE_NUMBER]: valid ? "siteNumber" : "",
    };
    setRegisterFields((prevState) => ({ ...prevState, [field[title as keyof typeof field]]: value }));
  };

  return (
    <Container>
      <Form btnText="Зарегистрироваться" onClick={() => console.log(registerFields)}>
        <Input title="Электронный адрес" value={registerFields.email} onChange={changeData} type="email" required />
        <Input
          title="Пароль"
          value={registerFields.password}
          onChange={changeData}
          type="password"
          autoComplete="true"
          required
        />
        <Input title="Имя" value={registerFields.name} onChange={changeData} type="text" required />
        <Input title="Фамилия" value={registerFields.lastName} onChange={changeData} type="text" required />
        <Input title="Номер участка" value={registerFields.siteNumber} onChange={changeData} type="text" required />
      </Form>
    </Container>
  );
};
