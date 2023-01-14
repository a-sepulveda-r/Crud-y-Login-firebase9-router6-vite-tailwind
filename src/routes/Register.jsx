import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserProvider";

// comdandorafce para hacer un archivo/componente basico de react
const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "example@example.com",
    },
  });

  const onSubmit = async ({ email, password }) => {
    console.log(email, password);
    try {
      await registerUser(email, password);
      console.log("usuario creado");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("email", {
            message: "usuario ya registrado",
          });
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "formato email no valido",
          });
          break;

        default:
          console.log("ocurrio un error en el server");
          break;
      }
    }
  };
  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "formato de email incorrecto",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength: {
              value: 6,
              message: "Minímo 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "Escribe algo, no seas 🤡";
                }
                return true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">registrar</button>
      </form>
    </>
  );
};

export default Register;
