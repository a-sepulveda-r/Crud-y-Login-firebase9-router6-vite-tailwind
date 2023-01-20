import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    try {
      setLoading(true);
      await loginUser(email, password);
      console.log("usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    } finally {
      // el finally se ejecuta siempre aunque sea falsa la verificacion
      setLoading(false);
    }
  };

  return (
    <>
      <Title title={"Login"} />
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
        <Button
          text={"Login"}
          textCenter={"text-xl"}
          type={"submit"}
          loading={loading}
        />
      </form>
    </>
  );
};

export default Login;
