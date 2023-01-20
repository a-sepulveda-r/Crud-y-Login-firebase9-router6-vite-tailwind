import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

// comdandorafce para hacer un archivo/componente basico de react
const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "example@example.com",
      password: "123456",
      repassword: "123456",
    },
  });

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    try {
      setLoading(true);
      await registerUser(email, password);
      console.log("usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Title title={"Registro de Usuario"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label={"Ingresa tu correo"}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label={"Ingresa tu contraseña"}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>
        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label={"Repite tu contraseña"}
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <Button
          text={"Register"}
          textCenter={"text-xl"}
          type={"submit"}
          loading={loading}
          color="green"
        />
      </form>
    </>
  );
};

export default Register;
