import { forwardRef } from "react";

const FormInput = forwardRef(
  ({ type, placeholder, onChange, onBlur, name, children }, ref) => {
    return (
      // el children sirve para devolver un component anidado, en este caso el FormError seria hijo del FormInput
      <>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
        {children}
      </>
    );
  }
);

export default FormInput;
