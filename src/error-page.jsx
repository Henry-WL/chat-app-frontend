import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col justify-center content-center h-screen">
      <h1 className="text-3xl font-bold m-2">Oops!</h1>
      <p className="p-5">Sorry, an unexpected error has occurred.</p>
      <p className="font-light">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}