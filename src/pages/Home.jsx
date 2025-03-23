import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import axios from 'axios';
import { Carousel } from '@material-tailwind/react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollSpeed = 1;
  const autoScrollRef = useRef(null);

  const fetchMovies = async (url, setter) => {
        const KEY= import.meta.env.MOVKEY
    try {
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${KEY}`
        }
      });
      setter([...response.data.results, ...response.data.results, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMovies('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', setNowPlaying);
    fetchMovies('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', setMovies);
    fetchMovies('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', setPopularMovies);
    fetchMovies('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', setRecentMovies);
    fetchMovies('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', setTvSeries);
  }, []);

  useEffect(() => {
    autoScrollRef.current = setInterval(() => {
      setScrollPosition((prev) => (prev - scrollSpeed) % (movies.length * 250));
    }, 30);
    return () => clearInterval(autoScrollRef.current);
  }, [movies]);

  const handleScroll = (direction) => {
    clearInterval(autoScrollRef.current);
    setScrollPosition((prev) => prev + direction * 250);
    autoScrollRef.current = setInterval(() => {
      setScrollPosition((prev) => (prev - scrollSpeed) % (movies.length * 250));
    }, 30);
  };
  const renderCarousel = (title, items) => (
    
    <div className='flex flex-col justify-center items-center space-y-6 pt-8 pb-8 bg-cyan-100 dark:bg-gray-900'>
  
      <h1 className='text-2xl font-bold dark:text-white'>{title}</h1>
      <div className='flex flex-row mt-4 justify-center items-start space-x-2'>
        <button className='bg-yellow-800 text-white p-2 rounded-full shadow-lg' onClick={() => handleScroll(1)}>
          <MdNavigateBefore size={20} />
        </button>
        <button className='bg-yellow-800 text-white p-2 rounded-full shadow-lg' onClick={() => handleScroll(-1)}>
          <MdNavigateNext size={20} />
        </button>
      </div>
      <div className='w-full overflow-hidden'>
        <div className='w-full mt-3'>
          <div ref={carouselRef} className='flex space-x-4' style={{ transform: `translateX(${scrollPosition}px)`, transition: 'transform 0.1s linear' }}>
            {items.map((movie, index) => (
             <div   key={index} className="relative w-60 h-auto bg-gradient-to-bl from-cyan-600 to-purple-800 dark:from-gray-900 dark:to-gray-700 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between flex-none cursor-pointer"   onClick={() => navigate(`/movie/${movie.id}`)}>
                <div className='absolute top-2 right-2 bg-black text-yellow-400 text-xs px-2 py-1 rounded-lg'>⭐ {movie.vote_average}</div>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/150?text=No+Image'} alt={movie.title} className='w-full h-72 object-cover rounded-md mt-2' />
                <div className='text-center px-2'>
                  <h2 className='text-lg font-semibold leading-tight'>{movie.title}</h2>
                  <p className='text-xs text-gray-400 mt-1'>{movie.release_date}</p>
                  <p className='text-sm mt-1'>{movie.overview.length > 100 ? movie.overview.substring(0, 60) + '...' : movie.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=' bg-cyan-100 dark:bg-gray-900 pt-4'>
      
      <Carousel
      transition={{ type: "fade", duration: 1 }} 
      autoplay={true}
      loop={true}
      className="w-full h-[550px] "
      navigation={false}
    >
      {nowPlaying.map((movie, index) => (
        <div
          key={index}
          className="relative w-full h-full flex  items-end bg-gradient-to-bl from-cyan-600 to-purple-800 dark:from-gray-800 dark:to-gray-600 text-white rounded-lg shadow-lg cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <div className='flex flex-row justify-center'>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : 'https://placehold.co/1280x720?text=No+Image'}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-none"/>

          <div className="absolute inset-0 bg-black bg-opacity-40 "></div>

          <div className="relative p-6 w-full text-left z-10 ">
            <div className="absolute top-4 right-4 bg-black text-yellow-400 text-sm px-3 py-1 rounded-lg">
              ⭐ {movie.vote_average}
            </div>

            <h2 className="text-3xl font-semibold mr-4 stroke-black shadow-black">{movie.title}</h2>
            <p className="text-xl text-gray-300 mt-1">{movie.release_date}</p>
            <p className="text-sm text-center mt-2">
              {movie.overview}
            </p>
          </div>  
          </div>
        </div>
      ))}
    </Carousel>
      {renderCarousel('Now Playing', nowPlaying)}
      {renderCarousel('Top Rated Movies', movies)}
      {renderCarousel('Popular Movies', popularMovies)}
      {renderCarousel('Upcoming Movies', recentMovies)}
      {renderCarousel('Popular TV Series', tvSeries)}
    </div>
  );
};

export default Home;