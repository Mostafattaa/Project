import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from 'react-icons/fa';

const Series = ({ tvSeries, setTvSeries, currentPage, tvgenres, selectedGenre, setCurrentPage, setSelectedGenre, handleGenreSelect, handlePageChange }) => {
  const [tvTotalPages, setTvTotalPages] = useState(1);
  const navigate = useNavigate();
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ1N2ZlODM0YjZlZjc4Y2NmNTVkZmQ0ZmFiMjhmMCIsIm5iZiI6MTc0MTkyODI3My42ODEsInN1YiI6IjY3ZDNiNzUxYmY0ODE4ODU0YzY0ZWY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeI-lDwnYLGcUQv_Ml8HxB5ouN7kfIf8uUr3BfXnKNU";

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const genreParam = selectedGenre ? `&with_genres=${selectedGenre}` : "";
        const response = await axios.get(`${API_BASE_URL}/discover/tv?page=${currentPage}${genreParam}`, {
          headers: { accept: "application/json", Authorization: API_TOKEN },
        });

        if (response.data.results.length > 0) {
          setTvSeries(response.data.results);
          setTvTotalPages(response.data.total_pages);
          console.log(response.data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching TV Series:", error);
      }
    };

    fetchSeries();
  }, [currentPage, selectedGenre]); 

  return (
    <div className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white p-6">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-6">TV Shows</h1>

    
      <div className="flex justify-center m-8 space-x-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>
        <span className="text-lg font-bold text-black dark:text-white">
          Page {currentPage} of {tvTotalPages || "..."}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === tvTotalPages}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${currentPage === tvTotalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </button>
      </div>

      {/* Genre Selection */}
      <div className="flex gap-4 justify-center flex-wrap mb-6">
        {tvgenres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              handleGenreSelect(genre.id);
            }}
            className={`px-2 py-2 rounded-lg transition duration-300 ease-in-out text-black dark:text-white text-sm font-semibold 
              ${selectedGenre === genre.id ? "bg-red-500" : "bg-gray-500 dark:bg-purple-800"}
              hover:bg-red-500 dark:hover:bg-red-800`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* TV Series Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {tvSeries.map((series) => (
          <div
            key={series.id}
            className="bg-gradient-to-tr from-gray-600 to-gray-400 hover:from-red-700 hover:to-gray-700 dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => navigate(`/tv/${series.id}`)}
          >

             <div className="absolute top-2 right-2 z-10 p-2 bg-gray-800/40 rounded-full backdrop-blur-md hover:bg-white/30 transition">
             <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
             </div>
            
            <img
              src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : "https://placehold.co/300x450?text=No+Image"}
              alt={series.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{series.name}</h2>
              <p className="text-sm text-gray-400">{series.first_air_date}</p>
              <div className="mt-2 text-yellow-400 font-bold">⭐ {series.vote_average}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center m-8 space-x-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Previous
        </button>
        <span className="text-lg font-bold text-black dark:text-white">
          Page {currentPage} of {tvTotalPages || "..."}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === tvTotalPages}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${currentPage === tvTotalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Series;
