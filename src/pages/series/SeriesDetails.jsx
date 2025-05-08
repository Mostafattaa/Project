import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeriesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const API_TOKEN     =import.meta.env.API_TOKEN
  const BASE_URL      =import.meta.env.BASE_URL
  const API_KEY       =import.meta.env.API_KEY

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const seriesRes = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
        setSeries(seriesRes.data);

        const castRes = await axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
        setCast(castRes.data.cast);

        const reviewsRes = await axios.get(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}&language=en-US`);
        setReviews(reviewsRes.data.results);

        const recommendationsRes = await axios.get(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US`);
        setRecommendations(recommendationsRes.data.results);

        const videosRes = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailer = videosRes.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching series details:", error);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  if (!series) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="text-white min-h-screen relative" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 backdrop-blur-md"></div>
      <div className="relative w-full h-[500px] flex items-end bg-cover bg-center" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative p-6 w-full text-left z-10">
          <h1 className="text-4xl font-bold">{series.name}</h1>
          <p className="text-gray-300 mt-2">{series.first_air_date}</p>
          <div className="flex items-center gap-2 bg-gray-900 text-yellow-400 px-3 py-1 rounded-lg text-sm font-bold w-fit">
            <span>⭐</span> <span>{series.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 mx-5 p-6 relative z-10">
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="text-gray-300 mt-2">{series.overview}</p>

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Genres</h3>
          <div className="flex space-x-2 mt-2">
          {series.genres.map((genre) => (
                <span 
                    key={genre.id} 
                    className="bg-yellow-500 text-black px-3 py-1 rounded-lg cursor-pointer hover:bg-yellow-600 transition" 
                    onClick={() => navigate(`/tvgenre/${genre.id}/${genre.name}`)}
                    >
                    {genre.name}
                </span>
                ))}
        
          </div>
        </div>

        {trailerKey ? (
          <div className="m-8 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold p-4">Watch Trailer</h2>
            <iframe className="w-full h-[450px] rounded-lg shadow-lg" src={`https://www.youtube.com/embed/${trailerKey}`} title="Series Trailer" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6">No trailer available</p>
        )}

        <h2 className="text-2xl font-bold mt-6">Seasons</h2>
        <div className="flex overflow-x-auto gap-4 mt-4 p-4 scrollbar-hide">
          {series.seasons.map((season) => (
            <div key={season.id} className="min-w-[200px] max-w-[220px] cursor-pointer transform transition duration-300 hover:scale-105" onClick={() => navigate(`/tv/${id}/season/${season.season_number}`)}>
              <img src={season.poster_path ? `https://image.tmdb.org/t/p/w300${season.poster_path}` : 'https://placehold.co/200x300?text=No+Image'} alt={season.name} className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
              <p className="text-sm text-center mt-2 font-semibold">{season.name}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-6">Cast</h2>
        <div className="flex overflow-x-auto gap-4 mt-4 p-4 scrollbar-hide">
          {cast.map((actor) => (
            <div key={actor.id} className="min-w-[150px] flex flex-col items-center text-center transform transition duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate(`/actor/${actor.id}`)}>
              <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://placehold.co/150?text=No+Image'} alt={actor.name} className="w-[140px] h-[140px] object-cover rounded-full border-2 border-gray-700 shadow-lg" />
              <p className="mt-2 text-sm font-semibold">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>

        {recommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <div className="flex overflow-x-auto space-x-6 mt-4 p-2 scrollbar-hide">
              {recommendations.map((series) => (
                <div key={series.id} className="min-w-[200px] max-w-[220px] cursor-pointer transform transition duration-300 hover:scale-105" onClick={() => navigate(`/tv/${series.id}`)}>
                  <img src={series.poster_path ? `https://image.tmdb.org/t/p/w300${series.poster_path}` : 'https://placehold.co/200x300?text=No+Image'} alt={series.name} className="w-full h-[300px] object-cover rounded-lg shadow-lg" />
                  <p className="text-sm text-center mt-2 font-semibold">{series.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesDetails;
