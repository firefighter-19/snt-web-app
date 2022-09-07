import { FC } from "react";
import { useForm } from "react-hook-form";
import { Error } from "src/components/common/Error/Error";
// import { Select } from "src/components/common/Select/Select";
import { Container } from "src/components/Container/Container";
import { Form } from "src/components/Form/Form";
import { Input } from "src/components/common/Input/Input";
import { Register } from "src/graphql/dto/registerUser";
// import { getRegistered } from "./getRegistered";

// enum RegisterFields {
//   NAME = "Имя",
//   LAST_NAME = "Фамилия",
//   EMAIL = "Электронный адрес",
//   PASSWORD = "Пароль",
//   SITE_NUMBER = "Номер участка",
// }

export const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      siteNumber: [],
    },
  });

  const onSubmit = (data: Register) => {
    console.log(data);
  };

  const getSiteNumbers = () => {
    // TODO Temporary
    const sites = [];
    for (let i = 1; i <= 73; i++) {
      sites.push(i);
    }
    return sites;
  };

  return (
    <Container>
      <Form btnText="Зарегистрироваться" onClick={handleSubmit(onSubmit)}>
        <Input
          title="Электронный адрес"
          label="email"
          type="email"
          required
          register={register}
          pattern={{
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неверный формат электронного адреса",
          }}
        />
        {errors.email?.type === "required" && <Error message="Не указан электронный адрес!" />}
        {errors.email?.message && <Error message={`${errors.email.message}!`} />}
        <Input
          title="Пароль"
          label="password"
          type="password"
          autoComplete="true"
          required
          register={register}
          minLength={7}
        />
        <Input title="Имя" label="name" type="text" required register={register} />
        <Input title="Фамилия" label="lastName" type="text" required register={register} />
        {/* <Select options={getSiteNumbers()} /> */}
      </Form>
    </Container>
  );
};
