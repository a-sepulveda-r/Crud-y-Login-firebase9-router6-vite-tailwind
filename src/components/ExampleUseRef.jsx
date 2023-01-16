import { forwardRef, useRef } from "react";

const InputText = forwardRef((props, ref) => {
  return (
    <>
      <input type="text" ref={ref} />
    </>
  );
});

const ExampleUseRef = () => {
  const inputFocus = useRef(null);

  const handleClick = () => {
    console.log("me diste click");
    inputFocus.current.focus();
  };

  return (
    <>
      <InputText ref={inputFocus} />
      <button onClick={handleClick}>click ref</button>
    </>
  );
};

export default ExampleUseRef;
