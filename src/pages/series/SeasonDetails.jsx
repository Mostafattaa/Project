import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeasonDetails = () => {
  const { id, season_number } = useParams();
  const navigate = useNavigate();
  const [season, setSeason] = useState(null);
  const [cast, setCast] = useState([]);

  const API_TOKEN     =import.meta.env.API_TOKEN
  const BASE_URL      =import.meta.env.BASE_URL
  const API_KEY       =import.meta.env.API_KEY

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      try {
        const seasonRes = await axios.get(
          `${BASE_URL}/tv/${id}/season/${season_number}?api_key=${API_KEY}&language=en-US`
        );
        setSeason(seasonRes.data);

        const castRes = await axios.get(
          `${BASE_URL}/tv/${id}/season/${season_number}/credits?api_key=${API_KEY}&language=en-US`
        );
        setCast(castRes.data.cast);
      } catch (error) {
        console.error("Error fetching season details:", error);
      }
    };

    fetchSeasonDetails();
  }, [id, season_number]);

  if (!season) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold">{season.name}</h1>
      <p className="text-gray-900 dark:text-gray-300 mt-2">{season.air_date}</p>
      <p className="text-gray-900 dark:text-gray-300 mt-4">{season.overview}</p>

      <h2 className="text-2xl font-bold mt-6">Episodes</h2>
      <div className="mt-4">
        {season.episodes.map((episode) => (
          <div key={episode.id} className="dark:bg-gray-800 bg-gray-700 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold">Episode {episode.episode_number}: {episode.name}</h3>
            <p className="text-gray-400">{episode.overview}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6">Cast</h2>
      <div className="flex overflow-x-auto gap-4 mt-4 p-4 scrollbar-hide">
        {cast.map((actor) => (
          <div key={actor.id} className="min-w-[150px] flex flex-col items-center text-center transform transition duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate(`/actor/${actor.id}`)}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://placehold.co/150?text=No+Image'}
              alt={actor.name}
              className="w-[140px] h-[140px] object-cover rounded-full border-2 border-gray-700"
            />
            <p className="mt-2 text-sm font-semibold">{actor.name}</p>
            <p className="text-xs text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetails;
