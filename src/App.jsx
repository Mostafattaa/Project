import { Route, Routes, useNavigate ,useLocation } from "react-router-dom";
import { useEffect,useState,useParams } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contactus from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";
///////////////////////////////////////////
import Home from "./pages/Home";
import Actor from "./pages/Actor"; 
import Notfound from "./pages/Notfound";
import Movies from "./pages/movies/Movies";
import MovieDetails from "./pages/movies/MovieDetails";
import NowPlaying from "./pages/movies/NowPlaying";
import Toprated from "./pages/movies/Toprated";
import Upcoming from "./pages/movies/Upcoming";
import Trending from "./pages/movies/Trending";
import Genre from "./pages/movies/Genre";
////////////////////////////////////////////////
import Series from "./pages/series/Series";
import SeriesDetails from "./pages/series/SeriesDetails";
import SeasonDetails from "./pages/series/SeasonDetails";
import TvGenre from "./pages/series/TvGenre"; 
import Airingtoday from "./pages/series/Airingtoday";
import Ontheair from "./pages/series/Ontheair";
import Populartv from "./pages/series/Populartv";
import Toptv from "./pages/series/Toptv";
import  axios  from "axios";
import SearchResults from "./pages/SearchResults";


const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ1N2ZlODM0YjZlZjc4Y2NmNTVkZmQ0ZmFiMjhmMCIsIm5iZiI6MTc0MTkyODI3My42ODEsInN1YiI6IjY3ZDNiNzUxYmY0ODE4ODU0YzY0ZWY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeI-lDwnYLGcUQv_Ml8HxB5ouN7kfIf8uUr3BfXnKNU ";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_API_KEY;


//Marcelinooooooooooo

///mostafa backend api
const API_UBASE_URL = "https://moviedb-blond.vercel.app/api/auth";

const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top
    }, [pathname]);
  
    return null;
  };

const App = () => {
  //Marcelinooooooooo

const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("logged") === "true");
const [signError, setSignError] = useState("");
const [loginError, setLoginError] = useState("");

const navigate = useNavigate();



const logout = () => {
  setUser(null);
  setIsLoggedIn(false);
  localStorage.removeItem("id");
  localStorage.removeItem("logged");
  navigate('/home'); 
};

  
  //Mostafa backend integration

const registerNewUser = async (signName, signEmail, signPass) => {
  try {
    const response = await axios.post(`${API_UBASE_URL}/register`, {
      name: signName,
      email: signEmail,
      password: signPass
    });
    if (response.status === 201) {
      navigate('/login');
    } else {
      setSignError("Failed to register user");
    }
  } catch (error) {
    const msg = error.response?.data?.data?.message || "Registration failed";
    setSignError(msg);
    console.log("Error registering user:", error);
  }
};



const validateUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_UBASE_URL}/login`, {
      email,
      password
    });
    if (response.status === 201) {
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("logged", true);
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      setLoginError("Invalid email or password");
    }
  } catch (error) {
    const msg = error.response?.data?.data?.message || "Login failed";
    setLoginError(msg);
    console.log("Error validating user:", error);
  }
};

useEffect(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  };

},[])
  //home page
const [movies, setMovies] = useState([]);
const [recentMovies, setRecentMovies] = useState([]);
const [popularMovies, setPopularMovies] = useState([]);
const [nowPlaying, setNowPlaying] = useState([]);
const [tvSeries, setTvSeries] = useState([]);
const [trending, setTrending] = useState([]);

const fetchMovies = async (url, setter) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
       Authorization: API_TOKEN
      },

    });
    setter([...response.data.results]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//Marcelino
const searchTMDB = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "application/json",
          Authorization: API_TOKEN
        },
      });
  const data = await response.json();
  return data.results;
}
catch (error) {
  console.error("Error searching TMDB:", error);
  return [];
};
};

useEffect(() => {
  fetchMovies("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", setNowPlaying);
  fetchMovies("https://api.themoviedb.org/3/trending/movie/day?language=en-US", setTrending);
  fetchMovies("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", setMovies);
  fetchMovies("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", setPopularMovies);
  fetchMovies("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", setRecentMovies);
  fetchMovies("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", setTvSeries);
}, []);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const [currentPage, setCurrentPage] = useState(() => {
  return localStorage.getItem("currentPage") ? JSON.parse(localStorage.getItem("currentPage")) : 1;
});

const [movieTotalPages, setMovieTotalPages] = useState(1);
  const [tvTotalPages, setTvTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
const [tvgenres, setTvGenres] = useState([]);
const [selectedGenre, setSelectedGenre] = useState(() => {
  return localStorage.getItem("selectedGenre") ? JSON.parse(localStorage.getItem("selectedGenre")) : null;
});


const fetchTVGenres = async () => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/genre/tv/list", {
      headers: { accept: "application/json", Authorization: API_TOKEN },
    });
    setTvGenres(response.data.genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};




useEffect(() => {
  localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre));
  localStorage.setItem("currentPage", JSON.stringify(currentPage));
}, [selectedGenre, currentPage]); 


useEffect(() => {
  fetchTVGenres();
}, []);


const handlePageChange = (direction) => {
  setCurrentPage((prev) => {
    const newPage = direction === "next" ? prev + 1 : Math.max(prev - 1, 1);
    localStorage.setItem("currentPage", JSON.stringify(newPage));
    return newPage;
  });
};

const handleGenreSelect = (genreId) => {
  setSelectedGenre(genreId);
  setCurrentPage(1);
  localStorage.setItem("selectedGenre", JSON.stringify(genreId));
  localStorage.setItem("currentPage", JSON.stringify(1));
};
//////////////////actor/////////////////////////
const [actor, setActor] = useState(null);
  const [tvShows, setTvShows] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});

  return (
    <div>
     <Header isLoggedIn={isLoggedIn} logout={logout} />
     <ScrollToTop />

     <Routes>
        <Route   index path=""                        element={<Home                    movies={movies}  recentMovies={recentMovies} popularMovies={popularMovies}  nowPlaying={nowPlaying}  tvSeries={tvSeries}    trending={trending}  isLoggedIn={isLoggedIn}/>}/>
        
        <Route   path="/home"                         element={<Home                    movies={movies}  recentMovies={recentMovies} popularMovies={popularMovies}  nowPlaying={nowPlaying}  tvSeries={tvSeries}    trending={trending} isLoggedIn={isLoggedIn}/>}/>

        <Route  path="/login"                         element={<Login                   validateUser={validateUser} isLoggedIn={isLoggedIn} loginError={loginError} setLoginError={setLoginError} />}/>
        
        <Route  path="/sign-up"                       element={<Signup                  registerNewUser={registerNewUser} isLoggedIn={isLoggedIn} signError={signError} setSignError={setSignError} />}/>
        
        <Route  path="/movies"                        element={<Movies                  movies={movies} currentPage={currentPage} setMovies={setMovies} genres={genres} setGenres={setGenres} selectedGenre={selectedGenre} setCurrentPage={setCurrentPage} setSelectedGenre={setSelectedGenre} handleGenreSelect={handleGenreSelect} handlePageChange={handlePageChange} />}/>
        
        <Route  path="/series"                        element={<Series                  tvSeries={tvSeries} setTvSeries={setTvSeries} currentPage={currentPage} tvgenres={tvgenres} selectedGenre={selectedGenre} setCurrentPage={setCurrentPage} setSelectedGenre={setSelectedGenre} handleGenreSelect={handleGenreSelect} handlePageChange={handlePageChange}/>}/>
        
        <Route  path="/movie/:id"                     element={<MovieDetails />} />
        
        <Route  path="/tv/:id"                        element={<SeriesDetails />} />
        
        <Route  path="/genre/:genreId/:genreName"     element={<Genre                  movies={movies}  setMovies={setMovies} movieTotalPages={movieTotalPages} setMovieTotalPages={setMovieTotalPages} currentPage={currentPage} handlePageChange={handlePageChange} />} /> 
        
        <Route  path="/actor/:actorId"                element={<Actor                  actor={actor}    setActor={setActor} tvShows={tvShows} setTvShows={setTvShows} socialLinks={socialLinks} setSocialLinks={setSocialLinks} movies={movies} setMovies={setMovies} isLoggedIn={isLoggedIn}/>} /> 
        
        <Route  path="/tv/:id/season/:seasonNumber"   element={<SeasonDetails />} />
        
        <Route  path="/tvgenre/:genreId/:genreName"   element={<TvGenre                 tvSeries={tvSeries} setTvSeries={setTvSeries} currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/now-playing"                   element={<NowPlaying             movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/trending"                      element={<Trending               movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/top-rated"                     element={<Toprated               movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/upcoming"                      element={<Upcoming               movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/airing-today"                  element={<Airingtoday            tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage} setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}  />} />
        
        <Route  path="/on-the-air"                    element={<Ontheair               tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage}  setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/popular-tv"                    element={<Populartv              tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage} tvTotalPages={tvTotalPages} setTvTotalPages={setTvTotalPages}  setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/top-rated-tv"                  element={<Toptv                  tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage}  setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/contact-us"                    element={<Contactus />} />

        <Route path="/about-us"                       element={<Aboutus />} />

        <Route path="/search"                         element={<SearchResults searchTMDB={searchTMDB} />} />

        <Route  path="*" element={<Notfound />}/>
     </Routes>

     <Footer /> 
    </div>
  )
}

export default App