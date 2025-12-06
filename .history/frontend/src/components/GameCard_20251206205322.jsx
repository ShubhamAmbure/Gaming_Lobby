// import React, { useState } from 'react';
// import { Play, Heart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { useApp } from '../context/AppContext';

// const GameCard = ({ game }) => {
//   const { t } = useTranslation();
//   const { state, toggleFav, addRecent, addNotification, addToast } = useApp();
//   const isFavorite = (state.favorites || []).includes(game.id);
//   const [isHover, setIsHover] = useState(false);
//   const navigate = useNavigate();

//   const gradientVars = [
//     ['#3BF4C5', '#A46BFF'],
//     ['#FF4D8D', '#FF914D'],
//     ['#A46BFF', '#FF4D8D'],
//     ['#FF914D', '#F7E85E'],
//     ['#3BF4C5', '#FF4D8D'],
//   ];

//   const pick = gradientVars[game.id % gradientVars.length];
//   const bgStyle = {
//     background: `linear-gradient(135deg, ${pick[0]} 0%, ${pick[1]} 100%)`,
//   };

//   const handleCardActivate = () => {
//     addRecent(game.id);
//     addNotification(`Started playing ${game.title}`);
//     addToast({ id: Date.now(), message: '🎮 Game Started!', type: 'success', duration: 3000 });
//     navigate(`/game/${game.id}`);
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     toggleFav(game.id);
//     const isNowFav = !isFavorite;
//     addToast({ id: Date.now(), message: isNowFav ? '✨ Added to Favorites' : '❤️ Removed from Favorites', type: isNowFav ? 'success' : 'warning', duration: 2500 });
//   };

//   return (
//     <div
//       className="w-full h-72 group cursor-pointer"
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//       onClick={handleCardActivate}
//       tabIndex={0}
//       onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardActivate(); } }}
//     >
//       <div
//         className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
//           isHover ? 'scale-105 shadow-2xl' : 'scale-100'
//         }`}
//         style={bgStyle}
//       >
//         {/* Animated background dots */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -left-6 -top-6 w-40 h-40 rounded-full opacity-20 blur-3xl animate-blob" />
//           <div className="absolute right-4 bottom-4 w-24 h-24 rounded-full opacity-10 blur-2xl animate-blob animation-delay-2000" />
//         </div>

//         {/* Main card content */}
//         <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
//           <div className="flex justify-between items-start">
//             <div className="text-white">
//               <div className="text-5xl sm:text-6xl mb-3 opacity-90">{game.icon}</div>
//               <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
//               <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
//                 {game.category}
//               </span>
//             </div>
//             <button
//               onClick={toggleFavorite}
//               className="p-2 rounded-full transition-all duration-200 hover:scale-125"
//               style={{ background: 'rgba(255,255,255,0.18)' }}
//               aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
//             >
//               <Heart
//                 className="w-6 h-6"
//                 style={{
//                   fill: isFavorite ? '#FF4D8D' : 'none',
//                   color: isFavorite ? '#FF4D8D' : '#ffffff',
//                 }}
//               />
//             </button>
//           </div>

//           <div className="flex items-center justify-between">
//             <p className="text-white/80 text-sm font-medium">Click to play</p>
//             {/* <button
//               onClick={(e) => { e.stopPropagation(); handleCardActivate(); }}
//               className="font-bold py-3 px-5 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg flex items-center gap-2"
//               style={{ background: '#ffffff', color: '#0d1117' }}
//             >
//               <Play className="w-5 h-5 fill-current" />
//               <span>{t('play').toUpperCase()}</span>
//             </button> */}
//           </div>
//         </div>

//         {/* Hover overlay with stats */}
//         <div
//           className={`absolute inset-0 bg-black/75 backdrop-blur-sm z-20 transition-all duration-300 ease-in-out flex flex-col justify-end p-6 rounded-xl ${
//             isHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
//           }`}
//         >
//           {/* Stats grid */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div className="text-white">
//               <p className="text-xs text-gray-300 mb-1">Players Online</p>
//               <p className="text-lg font-bold">{(game.playersOnline || 0).toLocaleString()}</p>
//             </div>
//             <div className="text-white">
//               <p className="text-xs text-gray-300 mb-1">Max Win</p>
//               <p className="text-lg font-bold">{game.maxWin || '—'}</p>
//             </div>
//             <div className="text-white">
//               <p className="text-xs text-gray-300 mb-1">Volatility</p>
//               <p className={`text-lg font-bold ${
//                 game.volatility === 'High' ? 'text-red-400' :
//                 game.volatility === 'Medium' ? 'text-yellow-400' :
//                 'text-green-400'
//               }`}>
//                 {game.volatility || '—'}
//               </p>
//             </div>
//             <div className="text-white">
//               <p className="text-xs text-gray-300 mb-1">RTP</p>
//               <p className="text-lg font-bold">{game.rtp || '—'}</p>
//             </div>
//           </div>

//           {/* Play Now button */}
//           <button
//             onClick={(e) => { e.stopPropagation(); handleCardActivate(); }}
//             className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
//           >
//             <Play className="w-5 h-5 fill-current" />
//             Play Now
//           </button>
//         </div>

//         {/* Gradient overlay for text contrast */}
//         <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
//       </div>

//       <style>{`
//         .animate-blob {
//           animation: blob 6s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(10px, -10px) scale(1.05); }
//           66% { transform: translate(-5px, 8px) scale(0.95); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default React.memo(GameCard);




import React, { useState } from "react";
import { Play, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";

const GameCard = ({ game }) => {
  const { t } = useTranslation();
  const { state, toggleFav, addRecent, addNotification, addToast } = useApp();
  const isFavorite = (state.favorites || []).includes(game.id);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const isMobile = window.innerWidth <= 768; // disable hover effects on mobile

  const handleCardActivate = () => {
    addRecent(game.id);
    addNotification(`Started playing ${game.title}`);
    addToast({
      id: Date.now(),
      message: "🎮 Game Started!",
      type: "success",
      duration: 3000,
    });
    navigate(`/game/${game.id}`);
  };

  const toggleFavoriteHandler = (e) => {
    e.stopPropagation();
    toggleFav(game.id);
    const isNowFav = !isFavorite;

    addToast({
      id: Date.now(),
      message: isNowFav
        ? "✨ Added to Favorites"
        : "❤️ Removed from Favorites",
      type: isNowFav ? "success" : "warning",
      duration: 2500,
    });
  };

  return (
    <div
      className="
        w-full 
        h-64 sm:h-72 md:h-80 
        cursor-pointer select-none
      "
      onMouseEnter={() => !isMobile && setIsHover(true)}
      onMouseLeave={() => !isMobile && setIsHover(false)}
      onClick={handleCardActivate}
    >
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 
        ${isHover ? "scale-105 shadow-2xl" : "scale-100"}`}
        style={{
          backgroundImage: `url(${game.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 
          ${isHover ? "bg-black/60" : "bg-black/30"}`}
        />

        {/* Title + Category */}
        <div
          className={`
            absolute inset-0 p-4 sm:p-5 z-10 
            flex flex-col justify-between
            transition-all duration-300
            ${isHover || isMobile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <div className="flex justify-between items-start">
            <div className="text-white drop-shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                {game.title}
              </h3>

              <span
                className="
                  mt-2 inline-block px-2.5 sm:px-3 py-1 
                  bg-white/20 backdrop-blur-md 
                  rounded-full text-xs sm:text-sm font-medium
                "
              >
                {game.category}
              </span>
            </div>

            {/* Favorite Button */}
            <button
              onClick={toggleFavoriteHandler}
              className="
                p-1.5 sm:p-2 rounded-full 
                bg-white/30 backdrop-blur-md 
                transition-all duration-200 hover:scale-125
              "
            >
              <Heart
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{
                  fill: isFavorite ? "#FF4D8D" : "none",
                  color: isFavorite ? "#FF4D8D" : "#fff",
                }}
              />
            </button>
          </div>
        </div>

        {/* Bottom Stats → visible on hover (desktop) or always on mobile */}
        <div
          className={`
            absolute inset-x-0 bottom-0 p-4 sm:p-6 
            bg-black/70 backdrop-blur-md z-20
            transition-all duration-300
            ${isHover || isMobile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
          `}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 text-white">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">Players Online</p>
              <p className="text-base sm:text-lg font-bold">
                {(game.playersOnline || 0).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">Max Win</p>
              <p className="text-base sm:text-lg font-bold">{game.maxWin || "—"}</p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">Volatility</p>
              <p
                className={`text-base sm:text-lg font-bold ${
                  game.volatility === "High"
                    ? "text-red-400"
                    : game.volatility === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {game.volatility || "—"}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">RTP</p>
              <p className="text-base sm:text-lg font-bold">{game.rtp || "—"}</p>
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardActivate();
            }}
            className="
              w-full group relative overflow-hidden
              bg-gradient-to-r from-blue-300 to-blue-500
              hover:from-blue-400 hover:to-blue-600
              text-white font-semibold py-2.5 rounded-xl
              transition-all duration-300
              shadow-md hover:shadow-blue-500/40
              flex items-center justify-center gap-2
              hover:scale-105 active:scale-95
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />

            <span className="absolute -left-full top-0 w-full h-full bg-white/20 transform skew-x-[-20deg] group-hover:left-full transition-all duration-700" />

            <Play className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            <span className="tracking-wide text-sm sm:text-base">Play Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);
