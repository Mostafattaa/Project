import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
 import { useEffect,useState,useParams } from "react";
import Series from "./pages/Series";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetails from "./pages/SeriesDetails";
import Genre from "./pages/Genre";
import Actor from "./pages/Actor"; 
import SeasonDetails from "./pages/SeasonDetails";
import TvGenre from "./pages/TvGenre"; 
import NowPlaying from "./pages/NowPlaying";
import Toprated from "./pages/Toprated";
import Upcoming from "./pages/Upcoming";
import Airingtoday from "./pages/Airingtoday";
import Ontheair from "./pages/Ontheair";
import Populartv from "./pages/Populartv";
import Toptv from "./pages/Toptv";
import Contactus from "./pages/Contactus";
import  axios  from "axios";
import Trending from "./pages/Trending";


const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ1N2ZlODM0YjZlZjc4Y2NmNTVkZmQ0ZmFiMjhmMCIsIm5iZiI6MTc0MTkyODI3My42ODEsInN1YiI6IjY3ZDNiNzUxYmY0ODE4ODU0YzY0ZWY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeI-lDwnYLGcUQv_Ml8HxB5ouN7kfIf8uUr3BfXnKNU ";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "0ed57fe834b6ef78ccf55dfd4fab28f0";


const App = () => {
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
const [populartvSeries, setPopularTvSeries] = useState([]);
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
/*
// Fetch Movies
// const fetchMovie = async (currentPage, genreId = null) => {
//   try {
//     const genreParam = genreId ? `&with_genres=${genreId}` : "";
//     const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?page=${currentPage}${genreParam}`, {
//       headers: { accept: "application/json", Authorization:  API_TOKEN },
//     });
  
//       setMovies(response.data.results);
//       setMovieTotalPages(response.data.total_pages);

    
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//   }
// };
 
// const fetchGenre = async (currentPage,genreId) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${currentPage}`);
//     setMovies(res.data.results);
//     setTotalPages(res.data.total_pages)
//   } catch (error) {
//     console.error("Error fetching movies:", error);
//   }
// };


// Fetch Genres
// const fetchGenres = async () => {
//   try {
//     const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`, {
//       headers: { accept: "application/json", Authorization: API_TOKEN },
//     });
//     setGenres(response.data.genres);
//   } catch (error) {
//     console.error("Error fetching genres:", error);
//   }
// };

*/

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


//fetch series
// const fetchSeries = async (currentPage, genreID = null) => {
//   try {
//     const genreParam = genreID ? `&with_genres=${genreID}` : "";
//     const response = await axios.get(`${API_BASE_URL}/discover/tv?page=${currentPage}${genreParam}`, {
//       headers: { accept: "application/json", Authorization: API_TOKEN },
//     });
//     if (response.data.results.length > 0) {
//       setTvSeries(response.data.results);
//       setTvTotalPages(response.data.total_pages);
//     }
//   } catch (error) {
//     console.error("Error fetching TV Series:", error);
//   }
// };

// const fetchPopulartv = async () => {
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/tv/popular?page=${currentPage}`, 
//       {
//         headers: { accept: "application/json", Authorization: API_TOKEN },
//       }
//     );
//     setTvSeries(response.data.results);
//     setTvTotalPages(response.data.total_pages);
//   } catch (error) {
//     console.error("Error fetching popular TV series:", error);
//   }
// };


useEffect(() => {
  localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre));
  localStorage.setItem("currentPage", JSON.stringify(currentPage));
}, [selectedGenre, currentPage]); // Runs when currentPage or selectedGenre changes
/*
// Runs only once on mount

// useEffect(() => {
//   fetchTVGenres();
//   fetchGenres();
  

// }, []); // Runs only once when the app starts*/

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
     <Header />

     <Routes>
        <Route   index path=""                        element={<Home                    movies={movies}  recentMovies={recentMovies} popularMovies={popularMovies}  nowPlaying={nowPlaying}  tvSeries={tvSeries}    trending={trending} />}/>
        
        <Route   path="/home"                         element={<Home                    movies={movies}  recentMovies={recentMovies} popularMovies={popularMovies}  nowPlaying={nowPlaying}  tvSeries={tvSeries}    trending={trending}/>}/>

        <Route  path="/login"                         element={<Login />}/>
        
        <Route  path="/sign-up"                       element={<Signup />}/>
        
        <Route  path="/movies"                        element={<Movies                 movies={movies} currentPage={currentPage} setMovies={setMovies} genres={genres} setGenres={setGenres} selectedGenre={selectedGenre} setCurrentPage={setCurrentPage} setSelectedGenre={setSelectedGenre} handleGenreSelect={handleGenreSelect} handlePageChange={handlePageChange} />}/>
        
        <Route  path="/series"                        element={<Series                 tvSeries={tvSeries} setTvSeries={setTvSeries} currentPage={currentPage} tvgenres={tvgenres} selectedGenre={selectedGenre} setCurrentPage={setCurrentPage} setSelectedGenre={setSelectedGenre} handleGenreSelect={handleGenreSelect} handlePageChange={handlePageChange}/>}/>
        
        <Route  path="/movie/:id"                     element={<MovieDetails />} />
        
        <Route  path="/tv/:id"                        element={<SeriesDetails />} />
        
        <Route  path="/genre/:genreId/:genreName"     element={<Genre                  movies={movies}  setMovies={setMovies} movieTotalPages={movieTotalPages} setMovieTotalPages={setMovieTotalPages} currentPage={currentPage} handlePageChange={handlePageChange} />} /> {/* Updated name */}
        
        <Route  path="/actor/:actorId"                element={<Actor                  actor={actor} setActor={setActor} tvShows={tvShows} setTvShows={setTvShows} socialLinks={socialLinks} setSocialLinks={setSocialLinks} movies={movies} setMovies={setMovies}/>} /> {/* Add Actor Route */}
        
        <Route  path="/tv/:id/season/:seasonNumber"   element={<SeasonDetails />} />
        
        <Route  path="/tvgenre/:genreId/:genreName"   element={<TvGenre />} />
        
        <Route  path="/now-playing"                   element={<NowPlaying             movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/trending"                      element={<Trending               movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/top-rated"                     element={<Toprated               movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/upcoming"                      element={<Upcoming               movies={movies}  setMovies={setMovies}  currentPage={currentPage} handlePageChange={handlePageChange}/>} />
        
        <Route  path="/airing-today"                  element={<Airingtoday            tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage} setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/on-the-air"                    element={<Ontheair               tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage}  setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/popular-tv"                    element={<Populartv              tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage} tvTotalPages={tvTotalPages} setTvTotalPages={setTvTotalPages}  setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/top-rated-tv"                  element={<Toptv                  tvSeries={tvSeries}   setTvSeries={setTvSeries} currentPage={currentPage}  setCurrentPage={setCurrentPage}  handlePageChange={handlePageChange}/>} />
        
        <Route  path="/contact-us"                    element={<Contactus />} />







        <Route  path="*" element={<Notfound />}/>
     </Routes>

     <Footer /> 
    </div>
  )
}

export default App