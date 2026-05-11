import React, { useState } from "react"
import GptSearchBar from "../components/GptSearchBar"
import GptMovieSuggestion from "../components/GptMovieSuggestion"
import { BG_IMG } from "../utils/constants"

const GptSearch = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      {/* Blur Placeholder */}
      {!loaded && (
        <div className="fixed inset-0 bg-zinc-900 animate-pulse"></div>
      )}

      {/* Background Image */}
      <img
        src={BG_IMG}
        alt="bg-img"
        onLoad={() => setLoaded(true)}
        className={`
          fixed inset-0 w-full h-full object-cover
          transition-all duration-500 ease-in-out
          ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}
        `}
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearch
