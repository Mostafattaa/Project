import { FaBars, FaChevronDown} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const navListMenuItems = [
  { title: "Action" },
  { title: "Horror" },
  { title: "Scientific" },
  { title: "Drama" },
  { title: "Romantic" },
  { title: "Classic" },
];

const navListSeries = [
  { title: "Ramadan 2025" },
  { title: "Horror" },
  { title: "Scientific" },
  { title: "Drama" },
  { title: "Romantic" },
  { title: "Classic" },
];

const NavDropdown = ({ title, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = items.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-900 p-2 "></div>
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} offset={{ mainAxis: 20 }} placement="bottom" allowHover>
      <MenuHandler>
        <Typography as={Link} to={`/${title.toLowerCase()}`} variant="small" className="font-medium">
          <ListItem
            className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
          >
            {title}
            <FaChevronDown strokeWidth={2.5} className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""}`} />
            <FaChevronDown strokeWidth={2.5} className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
        <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">{renderItems}</ul>
      </MenuList>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Menu>
  );
};

const NavList = () => (
  <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
    <Typography as={Link} to="/home" variant="small" color="blue-gray" className="font-medium">
      <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
    </Typography>
    <NavDropdown title="Movies" items={navListMenuItems} />
    <NavDropdown title="Series" items={navListSeries} />
    <Typography as={Link} to="/contact" variant="small" color="blue-gray" className="font-medium">
      <ListItem className="flex items-center gap-2 py-2 pr-4">Contact Us</ListItem>
    </Typography>
  </List>
);

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <div>
      <Navbar className="mx-auto max-w-screen-4xl px-4 py-2 ">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography as={Link} to="/home" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            MOVIES
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <Button variant="text" size="sm" color="blue-gray">
              Log In
            </Button>
            <Button variant="gradient" size="sm">
              Sign In
            </Button>
          </div>
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
            {openNav ? <FaXmark className="h-6 w-6" strokeWidth={2} /> : <FaBars className="h-6 w-6" strokeWidth={2} />}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Log In
            </Button>
            <Button variant="gradient" size="sm" fullWidth>
              Sign In
            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
