import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import "../index.css"
import AuthContext from "../context/AuthContext"
import Header from "../components/Header"
import { API_OPTIONS } from "../utils/constants"
import VideoTitle from "../components/VideoTitle"
import VideoBackground from "../components/VideoBackground"
import MovieList from "../components/MovieList"
import GptSearch from "./GptSearch"
import SearchContext from "../context/SearchContext"

const Browse = () => {
  const { authUser } = useContext(AuthContext)
  const { showSearchPage } = useContext(SearchContext)

  const navigate = useNavigate()

  const [movies, setMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedmovies, setTopRatedmovies] = useState([])
  const [upComming, setUpComming] = useState([])

  useEffect(() => {
    if (!authUser) {
      navigate("/") // Redirect to login if not authenticated
    }
  }, [authUser, navigate])

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS, //passing metadata
        )
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
        toast.error(error.message)
      }
    }

    const getPopularMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=2",
          API_OPTIONS, //passing metadata
        )
        const data = await response.json()
        setPopularMovies(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
        toast.error(error.message)
      }
    }

    const getTopRatedmovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?page=2",
          API_OPTIONS, //passing metadata
        )
        const data = await response.json()
        setTopRatedmovies(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
        toast.error(error.message)
      }
    }

    const getUpcomingMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?page=1",
          API_OPTIONS, //passing metadata
        )
        const data = await response.json()
        setUpComming(data.results)
      } catch (error) {
        console.error("Error fetching movies:", error)
        toast.error(error.message)
      }
    }

    getNowPlayingMovies()
    getPopularMovies()
    getTopRatedmovies()
    getUpcomingMovies()
  }, [])
  const mainMovie = movies?.[0] || {}

  if (movies.length === 0) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-screen bg-black/95">
          <div className="w-16 h-16 border-4 border-white  border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-white">Loading...</p>
        </div>
      </>
    )
  }

  return showSearchPage ? (
    <div className="">
      <Header />
      <GptSearch />
    </div>
  ) : (
    // Browse page - Responsive version
    <>
      <div className="relative h-[56vw] min-h-[320px] max-h-screen overflow-hidden">
        <VideoBackground movieId={mainMovie.id} />

        <div className="absolute inset-0 z-20">
          <Header />
          <VideoTitle
            movieName={mainMovie.original_title}
            info={mainMovie.overview}
          />
        </div>
      </div>

      <div className="bg-black">
        <div className="-mt-10 sm:-mt-22 md:-mt-24 relative z-30">
          <MovieList Title={"Now Playing"} movies={movies} />
          <MovieList Title={"Up-Coming"} movies={upComming} />
          <MovieList Title={"Popular"} movies={popularMovies} />
          <MovieList Title={"Top Rated"} movies={topRatedmovies} />
        </div>
      </div>
    </>
  )
}

export default Browse
