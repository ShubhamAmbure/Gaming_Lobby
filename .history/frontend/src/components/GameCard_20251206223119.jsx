
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
      message: isNowFav
        ? '✨ Added to Favorites'
        : '❤️ Removed from Favorites',
      type: isNowFav ? 'success' : 'warning',
      duration: 2500,
    });
  };

  return (
    <div
      className="w-full h-72 cursor-pointer select-none"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleCardActivate}
    >
      <div
        className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 
        ${isHover ? 'scale-105 shadow-2xl' : 'scale-100'}`}
        style={{
          backgroundImage: `url(${game.photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay */}
        <div
          className={`absolute inset-0 transition-all duration-300 
          ${isHover ? 'bg-black/60' : 'bg-black/25'}`}
        />

        {/* Top Content */}
        <div
          className={`absolute inset-0 p-5 z-10 flex flex-col justify-between
          transition-all duration-300
          ${isHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex justify-between items-start">
            <div className="text-white drop-shadow-lg">
              <h3 className="text-2xl font-bold">{game.title}</h3>
              <span className="mt-2 inline-block px-3 py-1 bg-white/25 
                backdrop-blur-md rounded-full text-sm font-medium">
                {game.category}
              </span>
            </div>

            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full bg-white/30 backdrop-blur-md transition-all duration-200 hover:scale-125"
            >
              <Heart
                className="w-6 h-6"
                style={{
                  fill: isFavorite ? '#FF4D8D' : 'none',
                  color: isFavorite ? '#FF4D8D' : '#fff',
                }}
              />
            </button>
          </div>
        </div>

        {/* Bottom Hover Stats */}
        <div
          className={`absolute inset-x-0 bottom-0 p-6 bg-black/70 backdrop-blur-md z-20
          transition-all duration-300
          ${isHover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <div className="grid grid-cols-2 gap-4 mb-4 text-white">
            <div>
              <p className="text-xs text-gray-300">Players Online</p>
              <p className="text-lg font-bold">{(game.playersOnline || 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-300">Max Win</p>
              <p className="text-lg font-bold">{game.maxWin || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-300">Volatility</p>
              <p
                className={`text-lg font-bold ${
                  game.volatility === 'High'
                    ? 'text-red-400'
                    : game.volatility === 'Medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}
              >
                {game.volatility || '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-300">RTP</p>
              <p className="text-lg font-bold">{game.rtp || '—'}</p>
            </div>
          </div>

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
    hover:scale-[1.06] active:scale-[0.97]
  "
>
  {/* Glow layer */}
  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300"></span>

  {/* Shine animation */}
  <span className="
    absolute -left-full top-0 w-full h-full 
    bg-white/20 transform skew-x-[-20deg]
    group-hover:left-full
    transition-all duration-700
  "></span>

  <Play className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
  <span className="tracking-wide">Play Now</span>
</button>


        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);
