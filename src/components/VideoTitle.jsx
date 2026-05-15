const VideoTitle = ({ movieName, info }) => {
  return (
    <div className="h-full space-y-4 md:space-y-0 flex flex-col justify-center px-4 sm:px-8 md:px-10 text-white bg-gradient-to-r from-black via-black/60 to-transparent">
      <h1 className="text-sm sm:text-xl lg:text-2xl w-1/2  font-bold opacity-60 sm:opacity-70 hover:opacity-95">
        {movieName}
      </h1>

      <p className="hidden md:block py-6 md:w-1/2 lg:w-1/3 text-sm opacity-65">{info}</p>

      <div className="hidden md:block">
        <button className="bg-white text-black font-mono p-2 text-lg font-semibold rounded-lg opacity-70 hover:opacity-85">
          ▶ Play
        </button>

        <button className="mx-3 bg-gray-600 text-white font-mono p-2 text-lg font-semibold rounded-lg opacity-70 hover:opacity-95">
          More Info
        </button>
      </div>

      <div className="block md:hidden ">
        <button className="bg-white text-black font-mono px-2 py-1 font-semibold rounded-lg opacity-70 hover:opacity-85">
          Play
        </button>

        <button className="mx-3 bg-gray-600 text-white font-mono px-2 py-1 font-semibold rounded-lg opacity-70 hover:opacity-95">
          Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
