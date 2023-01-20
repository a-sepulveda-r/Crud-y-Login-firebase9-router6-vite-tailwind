import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternUrl } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>loading getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };
  const handleClickDelete = async (nanoid) => {
    console.log("clickDelete");
    await deleteData(nanoid);
  };
  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy({ [nanoid]: true });
  };
  return (
    <>
      <Title title={"Home"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="https://www.instagram.com/?hl=es"
          {...register("url", {
            required,
            pattern: patternUrl,
          })}
          label={"Ingresa tu url"}
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>
        {newOriginID ? (
          <Button
            type="submit"
            color="yellow"
            text="Editar URL"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            color="green"
            text="Añadir URL"
            loading={loading.addData}
          />
        )}

        <button type="submit"></button>
      </form>
      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mt-4"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL} {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>
          <div className="flex space-x-2">
            <Button
              type="button"
              color="red"
              text="Delete"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              type="button"
              color="yellow"
              text="Edit"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              type="button"
              color="pink"
              text={copy[item.nanoid] ? "Copied" : "Copy"}
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
