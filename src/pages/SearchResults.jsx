import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';

const SearchResults = ({searchTMDB}) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/multi',
            params: {query: query, include_adult: 'false', language: 'en-US', page: '1'},
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ1N2ZlODM0YjZlZjc4Y2NmNTVkZmQ0ZmFiMjhmMCIsIm5iZiI6MTc0MTkyODI3My42ODEsInN1YiI6IjY3ZDNiNzUxYmY0ODE4ODU0YzY0ZWY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeI-lDwnYLGcUQv_Ml8HxB5ouN7kfIf8uUr3BfXnKNU'
            }
          };
          
          axios
            .request(options)
            .then(res => {
                setResults(res.data.results)
            })
            .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div className="p-6  bg-gray-300 dark:bg-gray-900  text-black dark:text-white">
      <h2 className="text-2xl mb-4 text-center">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {results.length > 0 ? (
          results.map((movie, index) => (
           <div   key={index}   className="relative bg-gradient-to-tr from-gray-600 to-gray-400 hover:from-red-700 hover:to-gray-700 dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"onClick={() => navigate(`/movie/${movie.id}`)}>

               {/* Heart Icon (Top-Right Corner) */}
               <div className="absolute top-2 right-2 z-10 p-2 bg-gray-400/40 rounded-full backdrop-blur-md hover:bg-white/30 transition">
                 <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
               </div>
               
              
               <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'https://placehold.co/300x450?text=No+Image'                 }
                 alt={movie.title}
                 className="w-full h-80 object-cover"/>

               {/* Movie Details */}
               <div className="p-4">
                 <h2 className="text-lg font-semibold">{movie.title || movie.name}</h2>
                 <p className="text-sm text-gray-400">{movie.release_date}</p>
                 <p className="text-sm mt-1"> {movie.overview && movie.overview.length > 100 ? movie.overview.substring(0, 60) + '...': movie.overview} </p>
                 <div className="mt-2 text-yellow-400 font-bold">⭐ {movie.vote_average}</div>
               </div>
            </div> ))) : 
            ( <p>No results found.</p>  )}
                     </div>
    </div>
  );
};

export default SearchResults;
