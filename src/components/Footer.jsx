import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <div className="">
      <div className="flex p-5 flex-row  items-center justify-center gap-y-6   bg-gradient-to-tl  p-4dark:bg-gradient-to-tr  dark:from-black dark:via-purple-800  dark:to-black  from-red-900 via-red-500 to-black  text-white  py-6 text-center md:justify-between">
      <Typography  className="font-normal">
        <img src="./movie.png" width={100} alt="" /> 
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as={Link}
            to="/about-us"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as={Link}
            to="/movies"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Movies
          </Typography>
        </li>
        <li>
          <Typography
            as={Link}
            to="/series"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Series
          </Typography>
        </li>
        <li>
          <Typography
            as={Link}
            to="/contact-us"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </div>
    </div>
  )
}

export default Footer