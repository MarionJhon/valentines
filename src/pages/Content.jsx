import { useState, useRef, useEffect } from "react";
import Heart from "../components/Heart";
import Inaasam from "../assets/sounds/Inaasam.mp3";
import Kusapiling from "../assets/sounds/Kusapiling.mp3";
import ParangPelikula from "../assets/sounds/Parang-Pelikula.mp3";
import SoEasy from "../assets/sounds/So-Easy.mp3";
import Uuwian from "../assets/sounds/Uuwian.mp3";
import Tahanan from "../assets/sounds/Tahanan.mp3";

const ContentPage = () => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!selectedPicture) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      return;
    }
    const audio = new Audio(selectedPicture.soundTrack);
    audioRef.current = audio;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [selectedPicture]);

  const pictures = [
    {
      picture: "/src/assets/pictures/pic1.jpg",
      label: "Picture 1",
      description:
        "You make my heart smile every single day. Happy Valentine’s.",
      soundTrack: Inaasam,
    },
    {
      picture: "/src/assets/pictures/pic2.jpg",
      label: "Picture 2",
      description: "With you, everything feels warmer, brighter, and right.",
      soundTrack: Kusapiling,
    },
    {
      picture: "/src/assets/pictures/pic3.jpg",
      label: "Picture 3",
      description: "My favorite place is wherever you are.",
      soundTrack: ParangPelikula,
    },
    {
      picture: "/src/assets/pictures/pic4.jpg",
      label: "Picture 4",
      description: "Loving you is the easiest thing I’ve ever done.",
      soundTrack: SoEasy,
    },
    {
      picture: "/src/assets/pictures/pic5.jpg",
      label: "Picture 5",
      description: "You’re my today, my tomorrow, and my always.",
      soundTrack: Uuwian,
    },
    {
      picture: "/src/assets/pictures/pic6.jpg",
      label: "Picture 6",
      description: "Every heartbeat whispers your name. Happy Valentine’s Day.",
      soundTrack: Tahanan,
    },
  ];

  return (
    <main className="relative flex min-h-screen justify-center items-center overflow-hidden bg-linear-to-br from-pink-200 to-red-200">
      <Heart />
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-pink-700 mb-4 sm:mb-6 text-center px-2"
            style={{ fontFamily: "'Great Vibes',cursive", fontWeight: 600 }}
          >
            Happy Valentine's Day Palangga 💖
          </p>
          <p
            className="text-sm sm:text-sm md:text-sm lg:text-lg text-pink-700 mb-4 sm:mb-6 text-center px-2"
            style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 600 }}
          >
            Click every picture 👆
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-pink-200 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-pink-200 to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee">
              {[...pictures, ...pictures].map((pic, idx) => (
                <div key={idx} className="shrink-0 px-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPicture(pic)}
                    className="overflow-hidden rounded-2xl border-2 border-pink-200/50 bg-white/60 shadow-xl backdrop-blur-sm w-48 sm:w-56 md:w-64 text-left cursor-pointer hover:border-pink-400/70 hover:shadow-2xl transition-all duration-300"
                  >
                    <img
                      src={pic.picture}
                      alt={pic.label}
                      className="w-full aspect-3/4 object-cover block pointer-events-none"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPicture && (
        <div
          className="lightbox-backdrop fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPicture(null)}
          role="dialog"
          aria-modal="true"
          aria-label="View picture"
        >
          <div
            className="lightbox-content max-w-4xl w-full flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="lightbox-message text-center text-xl sm:text-2xl md:text-3xl text-pink-800 max-w-2xl px-4"
              style={{ fontFamily: "'Quicksand',sans-serif", fontWeight: 600 }}
            >
              {selectedPicture.description}
            </p>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-200/50 bg-white/90">
              <img
                src={selectedPicture.picture}
                alt={selectedPicture.label}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto object-contain block"
              />
            </div>
            <div
              className="beat-bars flex items-end justify-center gap-1 sm:gap-1.5 h-8"
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
            <button
              type="button"
              onClick={() => setSelectedPicture(null)}
              className="mt-1 sm:mt-2 px-6 py-2 rounded-full bg-white/90 text-pink-700 border-2 border-pink-200/50 shadow-lg hover:bg-pink-100/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContentPage;
