import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [collection, setCollection] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null); 
  const [expandedReviews, setExpandedReviews] = useState({});

  const API_KEY = "0ed57fe834b6ef78ccf55dfd4fab28f0"; 
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRes = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        setMovie(movieRes.data);

        // Fetch Cast
        const castRes = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        setCast(castRes.data.cast);

        // Fetch Reviews
        const reviewsRes = await axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`);
        setReviews(reviewsRes.data.results);

        // Fetch Collection Parts if the movie is part of a collection
        if (movieRes.data.belongs_to_collection) {
          const collectionId = movieRes.data.belongs_to_collection.id;
          const collectionRes = await axios.get(`${BASE_URL}/collection/${collectionId}?api_key=${API_KEY}&language=en-US`);
          setCollection(collectionRes.data);
        }

        // Fetch Recommendations
        const recommendationsRes = await axios.get(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`);
        setRecommendations(recommendationsRes.data.results);

        // Fetch Trailer
        const videosRes = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailer = videosRes.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
        
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const toggleReview = (reviewId) => {
    setExpandedReviews((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  if (!movie) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
<div 
  className="text-white min-h-screen relative" 
  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
  {/* Blur  */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 backdrop-blur-md"></div>
  {/* Movie Banner */}
      <div className="relative w-full h-[500px] flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative p-6 w-full text-left z-10">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2">{movie.release_date}</p>
          <div className="flex items-center gap-2 bg-gray-900 text-yellow-400 px-3 py-1 rounded-lg text-sm font-bold w-fit">
            <span>⭐</span> <span>{movie.vote_average.toFixed(1)}</span>
        </div>

        </div>
      </div>

      

      {/* Movie Info */}
      <div className="mt-8 mx-5 p-6 relative z-10 ">


         {/* Genre */}
         <div className="mt-2 mb-4">
            <h3 className="text-2xl font-semibold">Genres</h3>
            <div className="flex flex-wrap space-x-2 mt-2">
                {movie.genres.map((genre) => (
                <span
                    key={genre.id}
                    className="bg-yellow-500 text-black px-3 py-1 rounded-lg cursor-pointer hover:bg-yellow-600 transition"
                    onClick={() => navigate(`/genre/${genre.id}/${genre.name}`)}
                >
                    {genre.name}
                </span>
                ))}
            </div>
            </div>

        <h2 className="text-2xl font-bold my-2">Overview</h2>
        <p className="text-gray-300 mt-2">{movie.overview}</p>

            {/* Movie Trailer */}
            {trailerKey ? (
                <div className="m-8 flex flex-col justify-center items-center ">
                    <h2 className="text-2xl font-bold p-4">Watch Trailer</h2>
                <iframe
                    className="w-full h-[450px] rounded-lg shadow-lg"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
                </div>
            ) : (
                <p className="text-center text-gray-400 mt-6">No trailer available</p>
            )}
            
            <hr className="m-2"/>
        {/* Cast Section */}
        <h2 className="text-3xl font-bold m-6 text-center p-6 ">Cast</h2>
        <div className="flex overflow-x-auto gap-4 mt-4 p-4 scrollbar-hide">
          {cast.map((actor) => (
            <div key={actor.id} className="min-w-[150px] flex flex-col items-center text-center transform transition duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate(`/actor/${actor.id}`)}>
              <img
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://placehold.co/150?text=No+Image'}
                alt={actor.name}
                className="w-[140px] h-[140px] object-cover rounded-full border-2 border-gray-700 shadow-lg"
              />
              <p className="mt-2 text-sm font-semibold">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>

            <hr className="m-2" />

             {/* Reviews Section */}
             <div className="m-8">
          <h2 className="text-2xl font-bold">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-6 mt-4">
              {reviews.slice(0,5).map((review) => (
                <div key={review.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <p className="text-yellow-400 font-semibold">{review.author}</p>
                  <p className="text-gray-300 mt-2">
                    {expandedReviews[review.id] ? review.content : `${review.content.substring(0, 300)}...`}
                  </p>
                  {review.content.length > 300 && (
                    <button 
                      onClick={() => toggleReview(review.id)}
                      className="text-blue-400 hover:underline mt-2 block"
                    >
                      {expandedReviews[review.id] ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-4">No reviews available.</p>
          )}
        </div>
            

        {/* Movie Collection (Franchise Parts) */}
        {collection &&  (
          
          <div className="mt-8">
            <hr className="m-2" />
            <h2 className="text-2xl font-bold my-4"> {collection.name}</h2>
            <div className="flex overflow-x-auto space-x-6 mt-4 p-2 scrollbar-hide">
              {collection.parts.map((part) => (
                <div key={part.id} className="min-w-[200px] max-w-[220px] cursor-pointer transform transition duration-300 hover:scale-105"
                  onClick={() => navigate(`/movie/${part.id}`)}>
                  <img
                    src={part.poster_path ? `https://image.tmdb.org/t/p/w300${part.poster_path}` : 'https://placehold.co/200x300?text=No+Image'}
                    alt={part.title}
                    className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-center mt-2 font-semibold">{part.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
          <hr className="m-2" />
        {/* Movie Recommendations */}
        {recommendations.length > 0 && (
          <div className="my-8">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
            <div className="flex overflow-x-auto space-x-6 mt-4 p-2 scrollbar-hide">
              {recommendations.map((movie) => (
                <div key={movie.id} className="min-w-[200px] max-w-[220px] cursor-pointer transform transition duration-300 hover:scale-105"
                  onClick={() => navigate(`/movie/${movie.id}`)}>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://placehold.co/200x300?text=No+Image'}
                    alt={movie.title}
                    className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-center mt-2 font-semibold">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MovieDetails;



























