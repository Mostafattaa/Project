import { Typography } from "@material-tailwind/react";

const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
    <div className="">
      <div className="flex pt-5 flex-row  items-center justify-center gap-y-6   bg-gradient-to-tl  p-4 from-blue-900 via-cyan-500  to-black text-white  py-6 text-center md:justify-between">
      <Typography  className="font-normal">
        <img src="./movie.png" width={100} alt="" /> 
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            License
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contribute
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
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