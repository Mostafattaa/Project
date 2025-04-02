import { FaBars, FaChevronDown} from "react-icons/fa";
import { MdDarkMode, MdLightMode , MdLogin  } from "react-icons/md";
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
  { title: "All Movies",      path: "/movies" },
  { title: "Top Rated",       path: "/top-rated" },
  { title: "Now Playing",     path: "/now-playing" }, 
  { title: "Trending Movies", path: "/trending" },
  { title: "Upcoming Movies", path: "/upcoming" },
];


const navListSeries = [
  { title: "Airing Today" ,path: "/airing-today"},
  { title: "On The Air" ,path: "/on-the-air"  },
  { title: "Popular Shows" ,path: "/popular-tv"       },
  { title: "Top Rated Shows" ,path: "/top-rated-tv"    },

];

const NavDropdown = ({ title, items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = items.map(({ title, path }, key) => (
    <Link to={path} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <Typography variant="h6" color="blue-gray" className="flex items-center text-sm font-bold">
          {title}
        </Typography>
      </MenuItem>
    </Link>
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
            
            <FaChevronDown strokeWidth={2.5} className={`hidden h-3 w-3 transition-transform lg:block  ${isMenuOpen ? "rotate-180" : ""}`} />
            <FaChevronDown strokeWidth={2.5} className={`block h-3 w-3 transition-transform lg:hidden  ${isMobileMenuOpen ? "rotate-180" : ""}`} />
          </ListItem>
        </Typography>
      </MenuHandler>
      
      <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
        <ul className="grid grid-cols-2 gap-y-2 outline-none outline-0">{renderItems}</ul>
      </MenuList>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </Menu>
  );
};

const NavList = () => (
  
  <List className="mt-4  p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 ">
    <Typography as={Link} to="/home" variant="small" color="white" className="font-medium">
      <ListItem className="flex items-center gap-2 py-2 pr-4  text-white">Home</ListItem>
    </Typography> 
    <NavDropdown title="Movies" items={navListMenuItems} />
    <NavDropdown title="Series" items={navListSeries} />
    
    <Typography as={Link} to="/contact-us" variant="small" color="blue-gray" className="font-medium">
      <ListItem className="flex items-center gap-2 py-2 pr-4  text-white">Contact Us</ListItem>
    </Typography>
  </List>
);

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const [theme,setTheme]= useState(true)

  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setTheme(false)
    
  };
  
  
  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setTheme(true)
  };
  return (
    <div>
      <Navbar className="mx-auto max-w-screen-4xl px-4 py-2  dark:bg-gradient-to-tr  dark:from-black dark:via-purple-800  dark:to-black bg-gradient-to-tr from-red-900 via-red-500 to-black  border-none rounded-none" >

        <div className="flex items-center justify-between text-white">
          <Typography as={Link} to="/home" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2 hover:text-blue-200">
            <img src="./movie.png" width={100} alt="" />
            
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
          
          <Typography as={Link} to="/login" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            <MdLogin className="text-2xl text-white" />
          </Typography>
          <Typography as="span" to="/home" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
          {theme  ?  <MdDarkMode onClick={setDarkTheme} className="text-2xl text-white "/>
:            <MdLightMode onClick={setLightTheme} className="text-2xl text-white "/>
}
          </Typography> 

          </div>
          
          <IconButton variant="text" color="blue-gray" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
            {openNav ? <FaXmark className="h-6 w-6" strokeWidth={2} /> : <FaBars className="h-6 w-6" strokeWidth={2} />}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap  justify-center items-center gap-2 lg:hidden">
          <Typography as={Link} to="/login" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            <MdLogin className="text-3xl text-white" />
          </Typography>
            <Typography as="span" to="/home" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            {theme  ?  <MdDarkMode onClick={setDarkTheme} className="text-2xl text-white "/>
:            <MdLightMode onClick={setLightTheme} className="text-3xl text-white "/>
}          </Typography>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
