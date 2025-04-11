
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; 

const Actor = ({movies, setMovies, tvShows,setTvShows,actor,setActor ,socialLinks,setSocialLinks, isLoggedIn} ) => {
  const { actorId } = useParams();
  
  const navigate = useNavigate();

  const API_KEY = "0ed57fe834b6ef78ccf55dfd4fab28f0";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        //  Actor info
        const actorRes = await axios.get(`${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=en-US`);
        setActor(actorRes.data);

        //  Movies of the Actor
        const moviesRes = await axios.get(`${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}&language=en-US`);
        setMovies(moviesRes.data.cast);

        //  TV Shows of the Actor
        const tvRes = await axios.get(`${BASE_URL}/person/${actorId}/tv_credits?api_key=${API_KEY}&language=en-US`);
        setTvShows(tvRes.data.cast);

        //  Social Media Links
        const socialRes = await axios.get(`${BASE_URL}/person/${actorId}/external_ids?api_key=${API_KEY}`);
        setSocialLinks({
          twitter: socialRes.data.twitter_id ? `https://twitter.com/${socialRes.data.twitter_id}` : null,
          instagram: socialRes.data.instagram_id ? `https://instagram.com/${socialRes.data.instagram_id}` : null,
          facebook: socialRes.data.facebook_id ? `https://facebook.com/${socialRes.data.facebook_id}` : null,
        });
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchActorDetails();
  }, [actorId]);

  if (!actor) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="dark:text-white  text-black min-h-screen  bg-gray-300 dark:bg-gray-900 p-6">
      {/* Actor info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img 
          src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'https://placehold.co/300x450?text=No+Image'}
          alt={actor.name}
          className="w-[300px] h-[450px] object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold">{actor.name}</h1>
          <p className="dark:text-gray-400 text-black mt-2">{actor.birthday} {actor.deathday ? ` - ${actor.deathday}` : ''}</p>
          <p className="dark:text-gray-300 text-black mt-4">{actor.biography || "No biography available."}</p>

          {/* Social Media  */}
          <div className="flex gap-4 mt-4">
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl hover:text-blue-600">
                <FaTwitter />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 text-2xl hover:text-pink-600">
                <FaInstagram />
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-800">
                <FaFacebook />
              </a>
            )}
          </div>
        </div>
      </div>
              
      {/* Actor Movies */}
      {movies.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-8">Movies</h2>
          <hr className="m-2 border-black dark:border-white border-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {movies.map((movie,index) => (
              <div 
              key={`${movie.id}-${index}`}  //  unique key
              className="cursor-pointer transition transform hover:scale-105"
              onClick={() => isLoggedIn ? navigate(`/movie/${movie.id}`): navigate("/login") } 
              >
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://placehold.co/200x300?text=No+Image'} 
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-black text-yellow-400 text-sm px-3 py-1 rounded-lg">
              ⭐ {movie.vote_average}
            </div>
                <p className="text-sm text-center mt-2 font-semibold">{movie.title}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Actor TV Shows */}
      {tvShows.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-8">TV Shows</h2>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {tvShows.map((show,index) => (
              <div 
              key={`${show.id}-${index}`}  //  unique key
              className="cursor-pointer transition transform hover:scale-105"
              onClick={() => isLoggedIn ? navigate(`/tv/${show.id}`) : navigate("/login") } 
              >
                <img 
                  src={show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : 'https://placehold.co/200x300?text=No+Image'} 
                  alt={show.name}
                  className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-black text-yellow-400 text-sm px-2 py-1 rounded-lg">
              ⭐ {show.vote_average}
            </div>
                <p className="text-sm text-center mt-2 font-semibold">{show.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Actor;
