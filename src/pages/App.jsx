import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import Valentines from "../assets/sounds/Valentine.mp3";

function App() {
  const [position, setPosition] = useState(null); // null = next to Yes; { top, left } = run away
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(Valentines);
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseEnter = () => {
    // Calculate new random coordinates (e.g., between 0% and 90% of the container)
    // Adjust the multiplier (0.9 here) to keep the whole button on screen
    const newTop = Math.random() * 90;
    const newLeft = Math.random() * 90;

    setPosition({
      top: `${newTop}%`,
      left: `${newLeft}%`,
    });
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-br from-pink-200 to-red-200 px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      {isMusicPlaying && (
        <div
          className="beat-bars fixed bottom-6 left-[calc(50%-6rem)] sm:left-[calc(50%-7rem)] z-20 flex items-end justify-center gap-1 sm:gap-1.5 h-8"
          aria-hidden
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span
              key={i}
              className="beat-bar w-1 sm:w-1.5 rounded-full bg-pink-400/80"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
        title={isMusicPlaying ? "Pause music" : "Play music"}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-20
          w-16 h-16 rounded-full
          bg-white/70 backdrop-blur-md
          border-2 border-pink-300
          shadow-xl flex items-center justify-center
          text-pink-600 hover:bg-white/90
          transition-all duration-300
          ${isMusicPlaying ? "animate-heartbeat shadow-pink-400" : ""}
        `}
      >
        {isMusicPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M6.75 5.25h2.25v13.5H6.75zM15 5.25h2.25v13.5H15z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7"
          >
            <path d="M8 5.14v14l11-7-11-7z" />
          </svg>
        )}
      </button>
      {isMusicPlaying && (
        <div
          className="beat-bars fixed bottom-6 left-[calc(50%+2.2rem)] sm:left-[calc(50%+2.2rem)] z-20 flex items-end justify-center gap-1 sm:gap-1.5 h-8"
          aria-hidden
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span
              key={i}
              className="beat-bar w-1 sm:w-1.5 rounded-full bg-pink-400/80"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}
      <div className="w-full max-w-md flex justify-center">
        <img
          src="/src/assets/heart.png"
          alt="heart icon"
          className="w-28 sm:w-36 md:w-44 lg:w-50 animate-float"
        />
      </div>
      <div className="w-full max-w-md space-y-3 sm:space-y-5 bg-white/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-3 border-pink-200/50 flex flex-col items-center text-center">
        <h1
          className="greetings text-2xl sm:text-3xl md:text-4xl text-pink-700 leading-tight"
          style={{ fontFamily: "'Great Vibes',cursive", fontWeight: 500 }}
        >
          Hi my palangga, Cheena Ramos 💖
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl text-pink-600"
          style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 600 }}
        >
          Would you accept my Valentine’s card?
        </p>
        <div className="pt-1 sm:pt-3">
          <p
            id="yes-no-prompt"
            className="text-base sm:text-lg md:text-xl text-pink-400"
            style={{ fontFamily: "'Dancing Script',cursive" }}
          >
            Yes or No
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-4 items-center min-h-14 relative">
        <button
          onClick={() => navigate("/content")}
          aria-describedby="yes-no-prompt"
          className="bg-linear-to-br from-pink-900 to-pink-900/50 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xl sm:text-2xl shadow-2xl hover:shadow-red-600 active:scale-95 transition-all duration-200 flex items-center gap-2 touch-manipulation"
        >
          YES
        </button>
        {position === null ? (
          <button
            aria-describedby="yes-no-prompt"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseEnter}
            onTouchStart={handleMouseEnter}
            onTouchMove={handleMouseEnter}
            className="bg-linear-to-br from-pink-100 to-pink-900/50 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xl sm:text-2xl shadow-2xl transition-none touch-manipulation select-none"
          >
            NO
          </button>
        ) : null}
      </div>

      {position !== null && (
        <button
          aria-describedby="yes-no-prompt"
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseEnter}
          onTouchStart={handleMouseEnter}
          onTouchMove={handleMouseEnter}
          className="absolute bg-linear-to-br from-pink-100 to-pink-900/50 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full text-xl sm:text-2xl shadow-2xl transition-none touch-manipulation select-none"
          style={{ top: position.top, left: position.left }}
        >
          NO
        </button>
      )}
    </main>
  );
}

export default App;
