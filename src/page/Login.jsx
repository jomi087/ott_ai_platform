// Login.jsx - Responsive version
import { useContext, useEffect, useRef, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { emailpasswordvalidation, namevalidation } from "../utils/validation"
import AuthContext from "../context/AuthContext"
import { auth, db } from "../utils/firebase"
import { BG_IMG } from "../utils/constants"

const Login = () => {
  const [signInForm, setSignInForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser) navigate("/browse")
  }, [authUser, navigate])

  const toggleForm = () => setSignInForm(!signInForm)

  const handleButtonClick = async (event) => {
    event.preventDefault()

    let error = null

    if (!signInForm) {
      error = namevalidation(nameInputRef.current?.value)
    }

    if (!error) {
      error = emailpasswordvalidation(
        emailInputRef.current?.value,
        passwordInputRef.current?.value,
      )
    }

    if (error) {
      toast.error(error)
      return
    }

    try {
      setLoading(true)

      if (!signInForm) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailInputRef.current?.value,
          passwordInputRef.current?.value,
        )

        const user = userCredential.user

        await updateProfile(user, {
          displayName: nameInputRef.current?.value,
        })

        await setDoc(doc(db, "users", user.uid), {
          name: nameInputRef.current?.value,
          email: user.email,
        })
      } else {
        await signInWithEmailAndPassword(
          auth,
          emailInputRef.current?.value,
          passwordInputRef.current?.value,
        )

        navigate("/browse")
      }
    } catch (error) {
      toast.error(error.code.split("/")[1])
    } finally {
      setLoading(false)
    }
  }

  const autoFill = () => {
    emailInputRef.current.value = "dummy1@gmail.com"
    passwordInputRef.current.value = "1111111111"
  }

  return (
    <div className="relative min-h-screen w-screen">
      <Header />

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={BG_IMG}
          alt="bg-img"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better readability on mobile */}
        <div className="absolute inset-0 bg-black/40 sm:bg-black/20" />
      </div>

      {/* Form container */}
      <div
        className={`relative flex justify-center items-center min-h-screen px-4 sm:px-6
        ${signInForm ? "pt-16 sm:pt-18" : "pt-14 sm:pt-12"}`}
      >
        <form className="bg-black/80 text-white p-6 sm:p-8 rounded-lg w-full max-w-sm sm:max-w-md shadow-lg">
          <h1 className="font-bold text-2xl sm:text-3xl pb-5 sm:pb-6 text-start">
            {signInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!signInForm && (
            <input
              type="text"
              ref={nameInputRef}
              placeholder="Full Name"
              className="p-3 my-2 w-full bg-gray-700 rounded border border-gray-600
                focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
            />
          )}

          <input
            type="text"
            ref={emailInputRef}
            placeholder="Email Address"
            className="p-3 my-2 w-full bg-gray-700 rounded border border-gray-600
              focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
          />

          <input
            type="password"
            ref={passwordInputRef}
            placeholder="Password"
            className="p-3 my-2 w-full bg-gray-700 rounded border border-gray-600
              focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
          />

          <button
            disabled={loading}
            className={`p-3 my-4 w-full rounded font-semibold transition-all duration-300
            ${ loading ? "bg-red-400 opacity-70 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 active:bg-red-800"}`}
            onClick={handleButtonClick}
          >
            {signInForm ? "Sign In" : "Sign Up"}
          </button>

          <p className="text-gray-400 text-center mt-3 text-sm sm:text-base cursor-pointer hover:underline">
            Forgot password
          </p>

          {signInForm && (
            <div className="flex justify-between mt-3 text-gray-400 text-sm sm:text-base">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" onClick={autoFill} />{" "}
                auto fill
              </label>
            </div>
          )}

          <p className="mt-4 text-gray-400 text-start text-sm sm:text-base">
            {signInForm ? "New to OTT ? " : "Already registered! "}
            <span
              className="text-white cursor-pointer hover:underline hover:text-blue-400"
              onClick={toggleForm}
            >
              {signInForm ? "Sign up now" : "Sign in"}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
