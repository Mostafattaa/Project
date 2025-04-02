import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Toprated = ({movies ,setMovies  ,handlePageChange, currentPage}) => {
  const navigate = useNavigate();
  const [movieTotalPages, setMovieTotalPages] = useState(1);
  

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=0ed57fe834b6ef78ccf55dfd4fab28f0&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
        setMovieTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };

    fetchTopRatedMovies();
  }, [currentPage]);

  return (
    <div className="mx-auto p-5 bg-gray-300 dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Rated Movies</h2>

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

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gradient-to-tr from-gray-600 to-gray-400  hover:from-red-700 hover:to-gray-700           dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr rounded-lg shadow-lg overflow-hidden cursor-pointer  transform transition duration-300 hover:scale-105" onClick={() => navigate(`/movie/${movie.id}`)}>
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
    </div>
  );
};

export default Toprated;