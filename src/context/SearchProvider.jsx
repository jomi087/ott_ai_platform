import { useState } from "react"
import SearchContext from "./SearchContext"

const SearchProvider = ({ children }) => {
  const [showSearchPage, setShowSearchPage] = useState(false)
  const [movieSuggestionResult, setMovieSuggestionResult] = useState([])
  return (
    <SearchContext.Provider
      value={{
        showSearchPage,
        setShowSearchPage,
        movieSuggestionResult,
        setMovieSuggestionResult, 
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
