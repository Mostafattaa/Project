 import React, { useState, useEffect, useRef } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
 import axios from 'axios';
 import { FaHeart } from 'react-icons/fa';

 import { Carousel } from '@material-tailwind/react';
 const Home = ({ movies, recentMovies, popularMovies, nowPlaying, tvSeries, trending }) => {
  
   const carouselRef = useRef(null);
   const navigate = useNavigate();
   const [scrollPosition, setScrollPosition] = useState(0);
   const scrollSpeed = 1;
   const autoScrollRef = useRef(null);
 
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
  
     <div className='flex flex-col justify-center items-center space-y-6 pt-8 pb-8 bg-gray-300 dark:bg-gray-900'>

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
              <div   key={index} className="relative w-60 h-auto bg-gradient-to-tr from-gray-600 to-gray-400  hover:from-red-700 hover:to-gray-700   dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr text-white p-4 rounded-lg shadow-lg flex flex-col justify-between flex-none cursor-pointer  transform transition duration-300 hover:scale-105"   onClick={() => navigate(`/movie/${movie.id}`)}>
                 <div className='absolute top-2 left-2 bg-black text-yellow-400 text-xs px-2 py-1 rounded-lg'>⭐ {movie.vote_average}</div>
                 
                  {/* Heart Icon (Top-Right Corner) */}
                  <div className="absolute top-2 right-2 z-10 p-2 bg-gray-800/40 rounded-full backdrop-blur-md hover:bg-white/30 transition">
                        <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
                      </div>
                 
                 
                 <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/150?text=No+Image'} alt={movie.title} className='w-full h-72 object-cover rounded-md mt-2' />
                 <div className='text-center px-2'>
                   <h2 className='text-lg font-semibold leading-tight'>{movie.title || movie.name}</h2>
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
     <div className=' bg-gray-300 dark:bg-gray-900 pt-4'>
    
       <Carousel
       transition={{ type: "fade", duration: 1 }} 
       autoplay={true}
       loop={true}
       className="w-full h-[550px] "
       navigation={false}
    
     >
       {trending.map((movie, index) => (
         <div
           key={index}
           className="relative w-full h-full flex  items-end bg-gradient-to-tr from-gray-600 to-gray-400  hover:from-red-700 hover:to-gray-700   dark:from-gray-900 dark:to-gray-700 dark:hover:from-purple-800 dark:hover:to-gray-800 dark:hover:bg-gradient-to-tr text-white rounded-lg shadow-lg cursor-pointer "
           onClick={() => navigate(`/movie/${movie.id}`)}
         >
           <div className='flex flex-row justify-center'>

             {/* Heart Icon (Top-Right Corner) */}
                      <div className="absolute top-2 right-2 z-10 p-2 bg-gray-400/40 rounded-full backdrop-blur-md hover:bg-white/30 transition">
                        <FaHeart className="w-5 h-5 text-white hover:text-red-500 transition-colors duration-200" />
                      </div>
            
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
      {renderCarousel("Trending", trending)}
      {renderCarousel("Now Playing", nowPlaying)}
      {renderCarousel("Top Rated Movies", movies)}
      {renderCarousel("Popular Movies", popularMovies)}
      {renderCarousel("Upcoming Movies", recentMovies)}
      {renderCarousel("Popular TV Series", tvSeries)}
     </div>
   );
 };
 export default Home;





