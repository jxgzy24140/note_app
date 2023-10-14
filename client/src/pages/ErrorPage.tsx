import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <div>Oops!!!</div>
      <h1>An unexpected has occured</h1>
      <p>{error.statusText}</p>
    </>
  );
};

export default ErrorPage;
