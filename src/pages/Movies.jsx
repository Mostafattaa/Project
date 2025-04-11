import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Movies = ({ movies, currentPage, setMovies, genres,setGenres, selectedGenre, setCurrentPage, setSelectedGenre, handleGenreSelect, handlePageChange }) => {
  const navigate = useNavigate();
  const [movieTotalPages, setMovieTotalPages] = useState(1);
  
  const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ1N2ZlODM0YjZlZjc4Y2NmNTVkZmQ0ZmFiMjhmMCIsIm5iZiI6MTc0MTkyODI3My42ODEsInN1YiI6IjY3ZDNiNzUxYmY0ODE4ODU0YzY0ZWY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeI-lDwnYLGcUQv_Ml8HxB5ouN7kfIf8uUr3BfXnKNU ";


  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : "";
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?page=${currentPage}${genreParam}`,
          {
            headers: { accept: "application/json", Authorization: API_TOKEN },
          }
        );

        setMovies(response.data.results);
        setMovieTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovie();
  }, [currentPage, selectedGenre]);

  useEffect(() => {
  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          headers: { 
            accept: "application/json", 
            Authorization: API_TOKEN 
          },
        }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  fetchGenres();
}, []);
  

  return (
    <div className="bg-gray-300 dark:bg-gray-900 min-h-screen text-black dark:text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Movies</h1>
      <div className="flex justify-center m-8 space-x-4">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-lg font-bold">Page {currentPage} of {movieTotalPages || '...'}</span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === movieTotalPages}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${currentPage === movieTotalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>

      <div className="flex gap-4 justify-center flex-wrap mb-6">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              handleGenreSelect(genre.id);
            }}
            className={`px-2 py-2 rounded-lg transition duration-300 ease-in-out text-black dark:text-white text-sm font-semibold 
              ${selectedGenre === genre.id ? 'bg-red-500' : 'bg-gray-500 dark:bg-purple-800'}
              hover:bg-red-500 dark:hover:bg-red-800`}
                      >
            {genre.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gradient-to-tr from-gray-600 to-gray-400 hover:from-red-700 hover:to-gray-700 dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105" onClick={() => navigate(`/movie/${movie.id}`)}>
           
            {/* Heart Icon (Top-Right Corner) */}
          <div className="absolute top-2 right-2 z-10 p-2 bg-gray-400/40 rounded-full backdrop-blur-md hover:bg-white/30 transition">
            <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
          </div>
           
            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/300x450?text=No+Image'} alt={movie.title} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
              <p className='text-sm mt-1'>{movie.overview.length > 100 ? movie.overview.substring(0, 60) + '...' : movie.overview}</p>
              <div className="mt-2 text-yellow-400 font-bold">⭐ {movie.vote_average}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;

