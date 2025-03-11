import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavList = () => {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={Link}
        to="/home"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        Home
      </Typography>
      <Typography
        as={Link}
        to="/movies"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        Movies
      </Typography>
      <Typography
        as={Link}
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        About Us
      </Typography>
    </ul>
  );
};
const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <div>
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as={Link}
            to="/home"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            MOVIES
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <FaXmark className="h-6 w-6" strokeWidth={2} />
            ) : (
              <FaBars className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
