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

//   const handleCardActivate = () => {
//     addRecent(game.id);
//     addNotification(`Started playing ${game.title}`);
//     addToast({
//       id: Date.now(),
//       message: '🎮 Game Started!',
//       type: 'success',
//       duration: 3000,
//     });
//     navigate(`/game/${game.id}`);
//   };

//   const toggleFavorite = (e) => {
//     e.stopPropagation();
//     toggleFav(game.id);

//     const isNowFav = !isFavorite;

//     addToast({
//       id: Date.now(),
//       message: isNowFav ? '✨ Added to Favorites' : '❤️ Removed from Favorites',
//       type: isNowFav ? 'success' : 'warning',
//       duration: 2500,
//     });
//   };

//   return (
//     <div
//       className="
//         group
//         w-full max-w-sm mx-auto
//         h-64 xs:h-72 sm:h-80 md:h-72 lg:h-80 xl:h-96
//         cursor-pointer select-none
//       "
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//       onClick={handleCardActivate}
//     >
//       <div
//         className={`
//           relative w-full h-full rounded-xl overflow-hidden
//           shadow-md md:shadow-lg
//           transition-transform duration-300
//           ${isHover ? 'md:scale-105' : 'md:scale-100'}
//         `}
//         style={{
//           backgroundImage: `url(${game.photo})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Dark Overlay (always a bit dark on mobile, stronger on hover for md+) */}
//         <div
//           className={`
//             absolute inset-0
//             bg-black/40
//             transition-all duration-300
//             ${isHover ? 'md:bg-black/60' : 'md:bg-black/25'}
//           `}
//         />

//         {/* Main Top Content */}
//         <div
//   className={`
//     absolute inset-0
//     p-3 sm:p-4 md:p-5
//     z-10 flex flex-col justify-between
//     transition-all duration-300

//     ${isHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
//   `}
// >
//   <div className="flex justify-between items-start gap-2">
//     <div className="text-white drop-shadow-lg max-w-[70%]">
//       <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
//         {game.title}
//       </h3>
//       <span
//         className="
//           mt-2 inline-block
//           px-2.5 sm:px-3 py-1
//           bg-white/25 backdrop-blur-md
//           rounded-full text-xs sm:text-sm font-medium
//         "
//       >
//         {game.category}
//       </span>
//     </div>

//     <button
//       onClick={toggleFavorite}
//       className="
//         p-1.5 sm:p-2 rounded-full
//         bg-white/30 backdrop-blur-md
//         transition-transform duration-200
//         hover:scale-110 active:scale-95
//       "
//     >
//       <Heart
//         className="w-5 h-5 sm:w-6 sm:h-6"
//         style={{
//           fill: isFavorite ? '#FF4D8D' : 'none',
//           color: isFavorite ? '#FF4D8D' : '#fff',
//         }}
//       />
//     </button>
//   </div>
// </div>


//         {/* Bottom Stats + Button */}
//         <div
//           className={`
//             absolute inset-x-0 bottom-0
//             px-3 sm:px-4 md:px-6
//             pb-3 sm:pb-4 md:pb-6 pt-3
//             bg-black/75 backdrop-blur-md
//             z-20
//             transition-all duration-300
//             /* Mobile: always visible */
//             opacity-100 translate-y-0
//             /* Desktop: visible only on hover */
//             ${isHover ? 'md:opacity-100 md:translate-y-0' : 'md:opacity-0 md:translate-y-4 md:pointer-events-none'}
//           `}
//         >
//           <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 text-white text-xs sm:text-sm">
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-300">
//                 Players Online
//               </p>
//               <p className="text-sm sm:text-base md:text-lg font-bold">
//                 {(game.playersOnline || 0).toLocaleString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-300">Max Win</p>
//               <p className="text-sm sm:text-base md:text-lg font-bold">
//                 {game.maxWin || '—'}
//               </p>
//             </div>
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-300">Volatility</p>
//               <p
//                 className={`
//                   text-sm sm:text-base md:text-lg font-bold
//                   ${
//                     game.volatility === 'High'
//                       ? 'text-red-400'
//                       : game.volatility === 'Medium'
//                       ? 'text-yellow-400'
//                       : 'text-green-400'
//                   }
//                 `}
//               >
//                 {game.volatility || '—'}
//               </p>
//             </div>
//             <div>
//               <p className="text-[10px] sm:text-xs text-gray-300">RTP</p>
//               <p className="text-sm sm:text-base md:text-lg font-bold">
//                 {game.rtp || '—'}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleCardActivate();
//             }}
//             className="
//               w-full group/play relative overflow-hidden
//               bg-gradient-to-r from-blue-300 to-blue-500
//               hover:from-blue-400 hover:to-blue-600
//               text-white font-semibold
//               py-2 sm:py-2.5
//               rounded-lg sm:rounded-xl
//               transition-all duration-300
//               shadow-md hover:shadow-lg
//               flex items-center justify-center gap-2
//               hover:scale-[1.03] active:scale-[0.97]
//             "
//           >
//             {/* Glow layer */}
//             <span className="
//               absolute inset-0
//               bg-gradient-to-r from-blue-400 to-blue-600
//               opacity-0 group-hover/play:opacity-20
//               blur-xl transition-all duration-300
//             " />

//             {/* Shine animation */}
//             <span
//               className="
//                 absolute -left-full top-0 w-full h-full
//                 bg-white/20 transform skew-x-[-20deg]
//                 group-hover/play:left-full
//                 transition-all duration-700
//               "
//             />

//             <Play className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
//             <span className="tracking-wide text-xs sm:text-sm md:text-base">
//               Play Now
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(GameCard);



import React, { useState } from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';

const GameCard = ({ game }) => {
  const { t } = useTranslation();
  const { state, toggleFav, addRecent, addNotification, addToast } = useApp();
  const isFavorite = (state.favorites || []).includes(game.id);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleCardActivate = () => {
    addRecent(game.id);
    addNotification(`Started playing ${game.title}`);
    addToast({
      id: Date.now(),
      message: '🎮 Game Started!',
      type: 'success',
      duration: 3000,
    });
    navigate(`/game/${game.id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    toggleFav(game.id);

    const isNowFav = !isFavorite;

    addToast({
      id: Date.now(),
      message: isNowFav ? '✨ Added to Favorites' : '❤️ Removed from Favorites',
      type: isNowFav ? 'success' : 'warning',
      duration: 2500,
    });
  };

  return (
    <div
      className="
        group
        w-full max-w-sm mx-auto
        h-64 xs:h-72 sm:h-80 md:h-72 lg:h-80 xl:h-96
        cursor-pointer select-none
      "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onTouchStart={() => setIsHover(true)}
      onTouchEnd={() => setIsHover(false)}
      onClick={handleCardActivate}
    >
      <div
        className={`
          relative w-full h-full rounded-xl overflow-hidden
          shadow-md md:shadow-lg
          transition-transform duration-300
          ${isHover ? 'md:scale-105' : 'md:scale-100'}
        `}
        style={{
          backgroundImage: `url(${game.photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <div
          className={`
            absolute inset-0
            bg-black/40
            transition-all duration-300
            ${isHover ? 'md:bg-black/60' : 'md:bg-black/25'}
          `}
        />

        {/* TOP OVERLAY CONTENT — Visible ONLY on hover */}
        <div
          className={`
            absolute inset-0
            p-3 sm:p-4 md:p-5
            z-10 flex flex-col justify-between
            transition-all duration-300

            ${isHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="text-white drop-shadow-lg max-w-[70%]">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2">
                {game.title}
              </h3>

              <span
                className="
                  mt-2 inline-block
                  px-2.5 sm:px-3 py-1
                  bg-white/25 backdrop-blur-md
                  rounded-full text-xs sm:text-sm font-medium
                "
              >
                {game.category}
              </span>
            </div>

            <button
              onClick={toggleFavorite}
              className="
                p-1.5 sm:p-2 rounded-full
                bg-white/30 backdrop-blur-md
                transition-transform duration-200
                hover:scale-110 active:scale-95
              "
            >
              <Heart
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{
                  fill: isFavorite ? '#FF4D8D' : 'none',
                  color: isFavorite ? '#FF4D8D' : '#fff',
                }}
              />
            </button>
          </div>
        </div>

        {/* BOTTOM STATS — Visible ONLY on hover */}
        <div
          className={`
            absolute inset-x-0 bottom-0
            px-3 sm:px-4 md:px-6
            pb-3 sm:pb-4 md:pb-6 pt-3
            bg-black/75 backdrop-blur-md
            z-20
            transition-all duration-300

            ${isHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          `}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 text-white text-xs sm:text-sm">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">Players Online</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">
                {(game.playersOnline || 0).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">Max Win</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">
                {game.maxWin || '—'}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">Volatility</p>
              <p
                className={`
                  text-sm sm:text-base md:text-lg font-bold
                  ${
                    game.volatility === 'High'
                      ? 'text-red-400'
                      : game.volatility === 'Medium'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }
                `}
              >
                {game.volatility || '—'}
              </p>
            </div>

            <div>
              <p className="text-[10px] sm:text-xs text-gray-300">RTP</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">
                {game.rtp || '—'}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardActivate();
            }}
            className="
              w-full group/play relative overflow-hidden
              bg-gradient-to-r from-blue-300 to-blue-500
              hover:from-blue-400 hover:to-blue-600
              text-white font-semibold
              py-2 sm:py-2.5
              rounded-lg sm:rounded-xl
              transition-all duration-300
              shadow-md hover:shadow-lg
              flex items-center justify-center gap-2
              hover:scale-[1.03] active:scale-[0.97]
            "
          >
            <span
              className="
                absolute inset-0
                bg-gradient-to-r from-blue-400 to-blue-600
                opacity-0 group-hover/play:opacity-20
                blur-xl transition-all duration-300
              "
            />

            <span
              className="
                absolute -left-full top-0 w-full h-full
                bg-white/20 transform skew-x-[-20deg]
                group-hover/play:left-full
                transition-all duration-700
              "
            />

            <Play className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            <span className="tracking-wide text-xs sm:text-sm md:text-base">Play Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);
