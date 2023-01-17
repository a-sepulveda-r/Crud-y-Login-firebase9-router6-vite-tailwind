const FormError = ({ error }) => {
  return (
    <>
      {error && (
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          <span class="font-medium">Oops! </span>
          {error.message}
        </p>
      )}
    </>
  );
};

export default FormError;
