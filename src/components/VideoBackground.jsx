import React, { useEffect, useState } from "react"
import { API_OPTIONS } from "../utils/constants"
import a from "../assets/TMDB.svg"

const VideoBackground = ({ movieId }) => {
  const [trailerId, setTrailerId] = useState(null)

  useEffect(() => {
    const getMovieVideos = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS,
      )
      const data = await response.json()
      // console.log("data" ,data)

      const trailerData = data.results.filter((video) => {
        return video.type === "Trailer"
      })
      // console.log("trailerData",trailerData)
      const trailer = trailerData.length ? trailerData[0] : data.results[0]
      // console.log("trailer",trailer)
      setTrailerId(trailer?.key)
    }
    getMovieVideos()
  }, [movieId])
  return (
    <>
      {trailerId ? (
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[177.77vh] h-[56.25vw] min-w-full min-h-full
              pointer-events-none scale-140"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&loop=1&playlist=${trailerId}&controls=0&showinfo=0&modestbranding=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-black">
          <img className="w-3xl" src={a} alt="" />
        </div>
      )}
    </>
  )
}

export default VideoBackground
