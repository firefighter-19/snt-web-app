import { FC } from "react";
import { useForm } from "react-hook-form";
import { Register } from "src/graphql/dto/registerUser";
import { Error } from "src/components/common/Error/Error";
import { Container } from "../../components/Container/Container";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/common/Input/Input";
import { useAuth } from "../../hooks/useAuth";

export const Login: FC = () => {
  const { getUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: Register) => {
    getUser({
      variables: {
        data: {
          email: data.email,
          password: data.password,
        },
      },
    });
  };
  return (
    <Container>
      <Form btnText="Войти" onClick={handleSubmit(onSubmit)}>
        <Input
          title="Электронный адрес"
          label="email"
          register={register}
          type="text"
          pattern={{
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Неверный формат электронного адреса",
          }}
        />
        {errors.email?.type === "required" && <Error message="Не указан электронный адрес!" />}
        {errors.email?.message && <Error message={`${errors.email.message}!`} />}
        <Input title="Пароль" label="password" register={register} type="password" autoComplete="true" />
      </Form>
    </Container>
  );
};
