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
    <div className="p-6">
      <h2 className="text-2xl mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {results.length > 0 ? (
          results.map((movie, index) => (
            <div   key={index} className="relative w-60 h-auto bg-gradient-to-tr from-gray-600 to-gray-400  hover:from-red-700 hover:to-gray-700   dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr text-white p-4 rounded-lg shadow-lg flex flex-col justify-between flex-none cursor-pointer  transform transition duration-300 hover:scale-105"   onClick={() => navigate(`/movie/${movie.id}`)}>
                             <div className='absolute top-2 left-2 bg-black text-yellow-400 text-xs px-2 py-1 rounded-lg'>⭐ {movie.vote_average}</div>
                             
                              {/* Heart Icon (Top-Right Corner) */}
                              <div className="absolute top-2 right-2 z-20 p-2 bg-gray-800/40 rounded-full backdrop-blur-md hover:bg-white/30 transition" onClick={() => isLoggedIn ? navigate(`/movie/${movie.id}`): navigate("/login") } >
                                    <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
                                  </div>
                             
                             
                             <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/150?text=No+Image'} alt={movie.title} className='w-full h-72 object-cover rounded-md mt-2' />
                             <div className='text-center px-2'>
                               <h2 className='text-lg font-semibold leading-tight'>{movie.title || movie.name}</h2>
                               <p className='text-xs text-gray-400 mt-1'>{movie.release_date}</p>
                               <p className='text-sm mt-1'>{movie.overview && movie.overview.length > 100 ? movie.overview.substring(0, 60) + '...' : movie.overview}</p>
                             </div>
                           </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
        </div>
    </div>
  );
};

export default SearchResults;
