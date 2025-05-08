import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';

const Populartv = ({tvSeries,setTvSeries, currentPage, tvTotalPages ,setTvTotalPages,handlePageChange,setCurrentPage}) => {
  const navigate = useNavigate();
  const API_TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQ1N2ZlODM0YjZlZjc4Y2NmNTVkZmQ0ZmFiMjhmMCIsIm5iZiI6MTc0MTkyODI3My42ODEsInN1YiI6IjY3ZDNiNzUxYmY0ODE4ODU0YzY0ZWY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yeI-lDwnYLGcUQv_Ml8HxB5ouN7kfIf8uUr3BfXnKNU ";

  useEffect(()=>{
  const fetchPopulartv = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?page=${currentPage}`, 
        {
          headers: { accept: "application/json", Authorization: API_TOKEN },
        }
      );
      setTvSeries(response.data.results);
      setTvTotalPages(response.data.total_pages);
      }  catch (error) {
      console.error("Error fetching popular TV series:", error);
      }
      };
      fetchPopulartv();
      },[currentPage])
  return (
    <div className=" mx-auto p-5 bg-gray-300 dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Shows</h2>

     <div className="flex justify-center m-8 space-x-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-bold text-black dark:text-white">
          Page {currentPage} of {tvTotalPages || "..."}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === tvTotalPages}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${
            currentPage === tvTotalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6">
        {tvSeries.map((series) => (
          <div key={series.id} className="bg-gradient-to-tr from-gray-600 to-gray-400  hover:from-red-700 hover:to-gray-700           dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr rounded-lg shadow-lg overflow-hidden cursor-pointer  transform transition duration-300 hover:scale-105" onClick={() => navigate(`/tv/${series.id}`)}>
          
          <div className="absolute top-2 right-2 z-10 p-2 bg-gray-800/40 rounded-full backdrop-blur-md hover:bg-white/30 transition">
             <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
           </div>
          
          <img src={series.poster_path ? `https://image.tmdb.org/t/p/w500${series.poster_path}` : 'https://placehold.co/300x450?text=No+Image'} alt={series.name} className="w-full h-80 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{series.name}</h2>
            <p className="text-sm text-gray-400">{series.first_air_date}</p>
            <p className='text-sm mt-1'>{series.overview.length > 100 ? series.overview.substring(0, 60) + '...' : series.overview}</p>
            

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
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-bold text-black dark:text-white">
          Page {currentPage} of {tvTotalPages || "..."}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === tvTotalPages}
          className={`px-2 py-2 bg-yellow-700 rounded-lg ${
            currentPage === tvTotalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default Populartv;