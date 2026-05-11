import React, { useContext, useRef, useState } from "react"
import lang from "../utils/language"
import LanguageContext from "../context/LanguageContext"
import ai from "../services/ai"
import { API_OPTIONS } from "../utils/constants"
import SearchContext from "../context/SearchContext"
import stringSimilarity from "string-similarity"
import { normalizeMovieTitle } from "../utils/normalizeMovieTitle"

const GptSearchBar = () => {
  const { language } = useContext(LanguageContext)
  const [movieSearching, setMovieSearching] = useState(false)
  const searchText = useRef(null)
  const { setMovieSuggestionResult } = useContext(SearchContext)

  //seach movie return from ai suggestion
  const searchMovieTMDB = async (movieName) => {
    if (!movieName) return
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en&page=1';`,
      API_OPTIONS, //passing metadata
    )

    const tmdbResults = await response.json()
    console.log("movieName", movieName, tmdbResults.results)

    const bestMatch = tmdbResults.results
      .map((movie) => ({
        info: movie,
        score: stringSimilarity.compareTwoStrings(
          normalizeMovieTitle(movieName),
          normalizeMovieTitle(movie.title),
        ),
      }))
      .filter((movie) => movie.score > 0.6)
      .sort((a, b) => b.score - a.score)
    
    console.log("bestMatch", bestMatch) //type : [{title : {}, score : number}]
    return bestMatch
  }

  //handleGptSearchClick
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setMovieSearching(true)
      if (!searchText.current.value) return alert("INPUT REQUIRED")
      // const result = await ai.getMovieSuggestions(searchText.current.value)
      const result = {
        movies: [
          "Baahubali: The Beginning",
          "Kantara",
          "Krrish",
          "RRR",
          "Thugs of Hindostan",
        ],
      }
      if (result.movies.length === 0) {
        alert("API LIMIT EXIDED")
        return
      }
      // suggested movie result from gen AI
      console.log("5 movie names", result.movies) //[movie1, movie2]

      //suggested movie info from tmdb
      const movieData = result.movies.map((movieName) =>
        searchMovieTMDB(movieName),
      )
      const tmdbResult = await Promise.all(movieData)
      console.log("tmdbResult", tmdbResult)
      setMovieSuggestionResult(tmdbResult)
    } catch (err) {
      console.log(err)
    } finally {
      setMovieSearching(false)
    }
  }

  //clear
  const handleClear = () => {
    if (!searchText.current.value) return
    searchText.current.value = ""
    setMovieSuggestionResult([])
  }

  return (
    <div className="pt-24 md:pt-32 px-4 flex justify-center">
      <form
        className="w-full md:w-3/4 lg:w-1/2 bg-black/80 backdrop-blur-sm grid grid-cols-12 rounded-xl"
        onSubmit={handleSubmit}
      >
        {/* Input Container */}
        <div className="col-span-8 md:col-span-9 relative m-2 md:m-4">
          <input
            type="text"
            ref={searchText}
            className="w-full p-3 md:p-4 rounded-lg outline-none bg-white pr-10"
            placeholder={lang[language].searchPlaceholder}
          />

          {/* Clear Button */}
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
          >
            ✕
          </button>
        </div>

        {/* Submit Button */}
        <button
          className={`
        col-span-4 md:col-span-3
        m-2 md:m-4
        rounded-lg
        text-white
        font-semibold
        transition-all
        ${movieSearching ? "bg-red-300" : "bg-red-700 hover:bg-red-800"}
      `}
          type="submit"
        >
          {movieSearching ? lang[language].processing : lang[language].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
