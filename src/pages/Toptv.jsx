import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';

const Toptv = ({tvSeries, setTvSeries,currentPage,handlePageChange}) => {
  const navigate = useNavigate();
   const [tvTotalPages, setTvTotalPages] = useState(1);
 
  useEffect(() => {
    const fetchOntheair = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=0ed57fe834b6ef78ccf55dfd4fab28f0&page=${currentPage}`
        );
        const data = await response.json();
        setTvSeries(data.results);
        setTvTotalPages(data.total_pages)
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchOntheair();
  }, [currentPage]);

  return (
    <div className=" mx-auto p-5 bg-gray-300 dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Top Rated Shows</h2>

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

export default Toptv;
