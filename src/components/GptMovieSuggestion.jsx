import React, { useContext } from "react"
import SearchContext from "../context/SearchContext"
import MovieList from "./MovieList"

const GptMovieSuggestion = () => {

  const { movieSuggestionResult } = useContext(SearchContext)

  if (!movieSuggestionResult?.length) return null

  return (
    <div className="mt-8 pb-10">

      {movieSuggestionResult.map((movieGroup, index) => {

        const title = movieGroup?.[0]?.info?.title

        const movies = movieGroup
          .map((movie) => movie.info)
          .filter(Boolean)

        return (
          <MovieList
            key={index}
            Title={title}
            movies={movies}
          />
        )
      })}

    </div>
  )
}

export default GptMovieSuggestion