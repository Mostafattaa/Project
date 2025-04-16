import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen">
    <div
      className=" relative h-full flex items-center justify-center bg-contain bg-center"
      style={{ backgroundImage: `url('/cinema.jpg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 flex flex-col gap-6 items-center justify-center text-center px-4">
        <h1 className="text-9xl font-extrabold text-white">404</h1>
        <p className="text-white text-3xl sm:text-4xl">Error Founding this page!</p>

        <div className="flex flex-wrap gap-4 justify-center">
          <span
            className="text-2xl text-white hover:text-red-500 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Go Back
          </span>

          <Button

            className="hover:bg-red-800 bg-red-500  dark:bg-purple-600 dark:hover:bg-purple-700 px-6 py-2 text-white"
            onClick={() => navigate("/home")}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notfound;
