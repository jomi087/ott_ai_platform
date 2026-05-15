import React from "react"

const MovieCard = ({ posterPath }) => {

  if (!posterPath) return null

  return (
    <div className="min-w-[140px] md:min-w-[180px] h-[210px] md:h-[270px] rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0">

      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="movie-poster"
        className="w-full h-full object-cover"
      />

    </div>
  )
}


const MovieList = ({ Title, movies }) => {

  if (!movies?.length) return null

  return (
    <div className="px-4 sm:px-8 mb-10">

      <h1 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {Title}
      </h1>

      <div className="flex overflow-x-auto scrollbar-none gap-4 pb-2">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            posterPath={movie.poster_path}
          />
        ))}

      </div>

    </div>
  )
}

export default MovieList