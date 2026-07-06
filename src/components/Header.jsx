// Header.jsx - Responsive version
import React, { useContext } from "react"
import UserInfo from "../assets/profile_img.png"
import { auth } from "../utils/firebase"
import AuthContext from "../context/AuthContext"
import { SUPPORTED_LANGUAGES } from "../utils/language"
import LanguageContext from "../context/LanguageContext"
import SearchContext from "../context/SearchContext"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Header = () => {
  const navigate = useNavigate()
  const { authUser } = useContext(AuthContext)
  const { setLanguage } = useContext(LanguageContext)
  const { showSearchPage, setShowSearchPage } = useContext(SearchContext)

  const handleSignOutButton = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => toast.error("Failed to sign out. Please try again."))
  }

  const handleLanguageChange = (e) => setLanguage(e.target.value)
  const handleGptSearchClick = () => setShowSearchPage(!showSearchPage)

  return (
    <div
      className={`absolute border z-30 w-full flex justify-between items-center
        ${
          authUser
            ? "py-3 px-4 sm:py-4 sm:px-8 md:py-6 md:px-10"
            : "py-6 px-6 sm:py-8 sm:px-12 md:py-11 md:px-25"
        }`}
    >
      {/* Logo */}
      <p
        className={
          authUser
            ? "text-red-500 border-b text-2xl  font-serif font-extrabold"
            : ""
        }
      >
        AI - OTT
      </p>

      {/* Auth controls */}
      {authUser && (
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
          {showSearchPage && (
            <select
              onChange={handleLanguageChange}
              className="text-white focus:outline-none focus:ring-0 bg-transparent text-sm sm:text-base"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  className="text-black"
                  key={lang.identifier}
                  value={lang.identifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="text-white bg-transparent border-1 rounded-lg px-2 py-1 mx-1 sm:mx-2 text-xs sm:text-sm cursor-pointer opacity-85 font-bold whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            {!showSearchPage ? "AI Search" : "Home"}
          </button>

          <img
            className="w-6 h-6 sm:w-8 sm:h-8 m-1 rounded"
            src={UserInfo}
            alt="profileIcon"
          />

          <button
            className="font-bold text-white cursor-pointer text-xs sm:text-sm whitespace-nowrap"
            onClick={handleSignOutButton}
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  )
}

export default Header
