// Header.jsx - Responsive version
import React, { useContext } from "react"
import UserInfo from "../assets/profile_img.png"
import dropdown from "../assets/caret_icon.svg"
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
      className={`absolute z-30 w-full flex justify-between items-center
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
            ? "text-red-500 sm:border-b  sm:text-2xl  font-serif font-extrabold"
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

          {/* big screen size */}
          <button
            className="hidden sm:block text-white bg-transparent border-1 rounded-lg px-2 py-1 mx-1 sm:mx-2 text-xs sm:text-sm cursor-pointer opacity-85 font-bold whitespace-nowrap"
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
            className="hidden sm:block font-bold text-white cursor-pointer text-xs sm:text-sm whitespace-nowrap"
            onClick={handleSignOutButton}
          >
            (Sign Out)
          </button>

          {/* small screen  */}
          <div className="group relative block sm:hidden">
            <img
              className="w-3.5 cursor-pointer"
              src={dropdown}
              alt="Dropdown"
            />

            <div className="absolute -right-2 top-0 pt-8 hidden group-hover:block z-50">
              <div className="w-36 overflow-hidden rounded-md border border-white/10 bg-black/90 backdrop-blur-sm shadow-2xl">
                <button
                  onClick={handleGptSearchClick}
                  className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  {!showSearchPage ? "AI Search" : "Home"}
                </button>

                <div className="mx-3 border-t border-white/10"></div>

                <button
                  onClick={handleSignOutButton}
                  className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-red-400 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
