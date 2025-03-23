import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
const App = () => {
  return (
    <div>
     <Header />
  

     <Routes>
        <Route  index path="" element={<Home />}/>
        <Route   path="/home" element={<Home />}/>
        <Route  path="/login" element={<Login />}/>
        <Route  path="/sign-up" element={<Signup />}/>
        <Route  path="/movies" element={<Movies />}/>
        <Route  path="*" element={<Notfound />}/>
     </Routes>

     <Footer /> 
    </div>
  )
}

export default App