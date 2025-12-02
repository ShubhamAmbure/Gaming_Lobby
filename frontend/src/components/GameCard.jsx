import React, { useRef, useState, useEffect } from 'react';
import { Play, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game, isDarkMode, onPlay, isFavorite = false, onToggleFavorite }) => {
  // neon gradient pairs using hex values
  const gradientVars = [
    ['#3BF4C5', '#A46BFF'],
    ['#FF4D8D', '#FF914D'],
    ['#A46BFF', '#FF4D8D'],
    ['#FF914D', '#F7E85E'],
    ['#3BF4C5', '#FF4D8D'],
  ];

  const pick = gradientVars[game.id % gradientVars.length];
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [transformStyle, setTransformStyle] = useState({});

  const bgStyle = {
    background: `linear-gradient(135deg, ${pick[0]} 0%, ${pick[1]} 100%)`,
    boxShadow: isHover ? '0 6px 30px rgba(58, 244, 197, 0.18)' : undefined,
  };

  useEffect(() => {
    let raf = null;
    const el = cardRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top; // y position within the element.
      const px = (x / rect.width) - 0.5; // -0.5 -> 0.5
      const py = (y / rect.height) - 0.5;

      const rotY = px * 12; // degrees
      const rotX = -py * 8;
      const transZ = 20;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setTransformStyle({
          transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${transZ}px)`,
        });
      });
    };

    const handleLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTransformStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)' }));
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const navigate = useNavigate();

  const handleCardActivate = () => {
    if (onPlay) return onPlay();
    navigate(`/game/${game.id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite();
  };

  return (
    <div
      ref={cardRef}
      className="shrink-0 w-full sm:w-64 md:w-72 lg:w-80 h-64 group cursor-pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleCardActivate}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardActivate(); } }}
      aria-hidden="false"
    >
      <div
        ref={innerRef}
        className={`relative w-full h-full rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 ${isHover ? 'shadow-2xl' : ''}`}
        style={{ transformStyle: 'preserve-3d', transition: 'box-shadow 220ms ease, transform 400ms ease', ...transformStyle, ...bgStyle }}
      >
        {/* animated subtle background dots / particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-6 -top-6 w-40 h-40 rounded-full opacity-20 blur-3xl animate-blob" />
          <div className="absolute right-4 bottom-4 w-24 h-24 rounded-full opacity-10 blur-2xl animate-blob animation-delay-2000" />
        </div>

        {/* preview overlay (GIF / video) */}
        <div className={`absolute inset-0 z-10 rounded-2xl overflow-hidden transition-opacity duration-400 ${isHover ? 'opacity-100' : 'opacity-0'}`}>
          {game.preview ? (
            <img src={game.preview} alt={`${game.title} preview`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
                <span className="text-white/80">{game.icon}</span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
          <div className="flex justify-between items-start">
            <div className="text-white">
              <div className={`text-5xl sm:text-6xl mb-3 opacity-90 transform-gpu ${isHover ? 'translate-y-0 scale-105' : 'translate-y-0'} transition-transform duration-400`}>{game.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {game.category}
              </span>
            </div>
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full transition-all duration-200 hover:scale-125"
              style={{ background: 'rgba(255,255,255,0.18)' }}
              aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
            >
              <Heart
                className="w-6 h-6"
                style={{
                  fill: isFavorite ? '#FF4D8D' : 'none',
                  color: isFavorite ? '#FF4D8D' : '#ffffff',
                }}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm font-medium">Click to play</p>
            <button
              onClick={(e) => { e.stopPropagation(); if (onPlay) onPlay(); else navigate(`/game/${game.id}`); }}
              className="font-bold py-3 px-5 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg flex items-center gap-2 neon-btn-hover"
              style={{ background: '#ffffff', color: '#0d1117' }}
            >
              <Play className="w-5 h-5 fill-current" />
              <span>PLAY</span>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
      </div>

      {/* Component-local styles to avoid changing global CSS */}
      <style>{`
        .animate-blob{
          animation: blob 6s infinite;
        }
        .animation-delay-2000{animation-delay:2s}
        @keyframes blob{
          0%{transform:translate(0px,0px) scale(1)}
          33%{transform:translate(10px, -10px) scale(1.05)}
          66%{transform:translate(-5px, 8px) scale(0.95)}
          100%{transform:translate(0px,0px) scale(1)}
        }
        .transition-opacity.duration-400{transition:opacity 400ms ease}
      `}</style>
    </div>
  );
};

export default GameCard;
