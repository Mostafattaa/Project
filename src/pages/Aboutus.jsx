import React from 'react'

const Aboutus = () => {
  return (
    <div className=" bg-gray-300 dark:bg-gray-900   p-12  flex flex-col flex-wrap jusitfy-center gap-4">
    <h1 className="text-4xl font-bold dark:text-purple-500 text-red-500">About Us</h1>
    <hr className="border-t border-gray-700  " />

    <p className="text-lg dark:text-gray-300 text-gray-800 mb-4">
      Welcome to <span className="text-red-400 dark:text-purple-500 font-extrabold">TvMovies</span> – your ultimate destination for discovering the world of cinema. Our platform brings together movies and TV shows from around the globe, powered by the <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" className="text-blue-400 underline hover:text-blue-200">TMDB API</a>.
    </p>

    <p className="text-lg dark:text-gray-300 text-gray-800 mb-4">
      Whether you're into action-packed thrillers, heartfelt dramas, or binge-worthy series, we’ve got it all. Our app helps you:
    </p>

    <ul className="list-disc list-inside dark:text-gray-300 text-gray-800 mb-6 space-y-2 ">
      <li>Explore trending and top-rated movies and TV shows</li>
      <li>Dive into genres like Action, Comedy, Drama, Horror, and more</li>
      <li>View detailed movie info including cast, crew, and collections</li>
      <li>Discover actors and explore their filmography</li>
      <li>Track movie ratings, release dates, and overviews</li>
    </ul>

    <p className="text-lg dark:text-gray-300 text-gray-800 mb-4">
      <span className="text-red-400 dark:text-purple-500 font-semibold">TvMovies</span> is designed with performance, simplicity, and visual appeal in mind —  powered entirely by open movie data from TMDB.
    </p>

    <p className="text-lg dark:text-gray-300 text-gray-800">
      Have questions, suggestions, or just want to say hi? Feel free to reach out through our contact page. Happy watching! 🍿
    </p>
  </div>
  )
}

export default Aboutus