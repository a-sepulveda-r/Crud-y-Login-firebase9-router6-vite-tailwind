export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "formato de email incorrecto",
    },
    minLength: {
      value: 6,
      message: "Minímo 6 caracteres",
    },

    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "Escribe algo, no seas 🤡";
        }
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};
