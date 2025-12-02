import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Gamepad2, Menu, Globe, Moon, Sun, Search } from 'lucide-react';
import GameCard from './GameCard';
import FloatingSidebar from './FloatingSidebar';
import ToastContainer from './ToastContainer';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const GameLobby = ({ games = [] }) => {
  const navigate = useNavigate();
  const { state, toggleDark, addRecent, addNotification, toggleFav, addToast, clearNotifications, removeToast } = useApp();
  const { isDark, favorites, notifications, recentlyPlayed, toasts } = state;
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const addToastMessage = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    addToast({ id, message, type, duration });
  };

  // use context removeToast
  const _removeToast = (id) => { if (removeToast) removeToast(id); };

  const handleGameClick = (gameId) => {
    addRecent(gameId);
    const game = games.find((g) => g.id === gameId);
    addNotification(`Started playing ${game?.title || 'Game'}`);
    addToastMessage(`🎮 Game Started!`, 'success');
    navigate(`/game/${gameId}`);
  };

  const toggleFavorite = (gameId) => {
    toggleFav(gameId);
    const isNowFav = !(favorites || []).includes(gameId);
    addToastMessage(isNowFav ? `✨ Added to Favorites` : `❤️ Removed from Favorites`, isNowFav ? 'success' : 'warning');
  };

  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  // refs + in-view states for scroll-trigger animations
  const gamesRef = useRef(null);
  const featuredRef = useRef(null);
  const [gamesInView, setGamesInView] = useState(false);
  const [featuredInView, setFeaturedInView] = useState(false);

  useEffect(() => {
    const obsOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    let gObs = null;
    let fObs = null;

    if (gamesRef.current) {
      gObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGamesInView(true);
            gObs.disconnect();
          }
        });
      }, obsOptions);
      gObs.observe(gamesRef.current);
    }

    if (featuredRef.current) {
      fObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFeaturedInView(true);
            fObs.disconnect();
          }
        });
      }, obsOptions);
      fObs.observe(featuredRef.current);
    }

    return () => {
      if (gObs) gObs.disconnect();
      if (fObs) fObs.disconnect();
    };
  }, []);

  const navigateToCollection = (name) => {
    navigate(`/collection/${encodeURIComponent(name)}`);
  };

  const handleNotifications = () => {
    if (!notifications || notifications.length === 0) {
      addToastMessage('No notifications yet', 'info');
      return;
    }
    const notificationList = notifications.slice(0, 5).map((n) => n.text).join(', ');
    addToastMessage(`📢 ${notificationList}`, 'info', 4000);
    clearNotifications();
  };

  const handleFavorites = () => {
    if (!favorites || favorites.length === 0) {
      addToastMessage('No favorites yet! Add some games ❤️', 'info');
      return;
    }
    const favList = favorites.slice(0, 3).map((fav) => {
      const g = games.find((gg) => gg.id === fav);
      return g?.title || `Game ${fav}`;
    }).join(', ');
    const more = favorites.length > 3 ? ` +${favorites.length - 3} more` : '';
    addToastMessage(`⭐ Favorites: ${favList}${more}`, 'success', 4000);
  };

  const handleRecent = () => {
    if (!recentlyPlayed || recentlyPlayed.length === 0) {
      addToastMessage('No recently played games', 'info');
      return;
    }
    const recentList = recentlyPlayed.slice(0, 3).map((recent) => {
      const g = games.find((gg) => gg.id === recent);
      return g?.title || `Game ${recent}`;
    }).join(', ');
    const more = recentlyPlayed.length > 3 ? ` +${recentlyPlayed.length - 3} more` : '';
    addToastMessage(`🎮 Recently: ${recentList}${more}`, 'info', 4000);
  };

  const filteredGames = useMemo(() => {
    if (!search) return games;
    const s = search.toLowerCase();
    return games.filter((g) => g.title.toLowerCase().includes(s) || g.category.toLowerCase().includes(s));
  }, [games, search]);

  return (
    <div data-theme={isDark ? 'dark' : 'light'} className={`min-h-screen smooth-transition`} style={{ background: isDark ? '#0D1117' : 'linear-gradient(180deg,#f8fafc,#e6f0ff)' }}>
      <header className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg`} style={{ background: isDark ? 'linear-gradient(135deg,#A46BFF,#3BF4C5)' : 'linear-gradient(135deg,#3BF4C5,#FF4D8D)' }}>
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>GameHub</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <Search className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search games..."
                className={`bg-transparent outline-none ${isDark ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'}`}
              />
            </div>

            <button onClick={() => toggleDark()} className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              <Globe className="w-5 h-5" />
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-lg transition-colors md:hidden ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-slate-800' : 'bg-white'} border-b`}>
          <div className="px-4 py-4 flex items-center justify-between">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-transparent outline-none"
            />
            <button onClick={() => setMenuOpen(false)} className="ml-3 px-3 py-1 bg-blue-500 text-white rounded">Close</button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Discover & Play</h2>
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Click the play button to start your adventure!</p>
        </div>

        <div onScroll={handleScroll} className="overflow-x-auto pb-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
          <div ref={gamesRef} className={`flex gap-6 min-w-max pr-8 games-list ${gamesInView ? 'in-view' : ''}`}>
            {filteredGames.map((game, idx) => (
              <div key={game.id} className="animate-card" style={{ ['--i']: idx }}>
                <GameCard game={game} />
              </div>
            ))}
          </div>
        </div>

        {scrollPosition > 0 && (
          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>👈 Scroll left to see more games</p>
          </div>
        )}

        {/* curved divider */}
        <div className="section-wave mt-12 -mb-6" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20">
            <path d="M0,32 C360,96 1080,-32 1440,32 L1440 120 L0 120 Z" fill={isDark ? '#0f172a' : '#ffffff'} opacity="0.9"></path>
          </svg>
        </div>

        <section ref={featuredRef} className={`mt-16 featured-section ${featuredInView ? 'in-view' : ''}`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Featured Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div onClick={() => navigateToCollection('Action')} role="button" tabIndex={0} className={`p-6 rounded-xl cursor-pointer ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-4xl mb-3">🎮</div>
              <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Action Games</h4>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Fast-paced games to get your adrenaline pumping</p>
            </div>


            <div onClick={() => navigateToCollection('Puzzle')} role="button" tabIndex={0} className={`p-6 rounded-xl cursor-pointer ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-4xl mb-3">🧠</div>
              <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Brain Teasers</h4>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Challenge your mind with puzzles and strategy games</p>
            </div>

            <div onClick={() => navigateToCollection('Simulation')} role="button" tabIndex={0} className={`p-6 rounded-xl cursor-pointer ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-lg transition-shadow`}>
              <div className="text-4xl mb-3">⭐</div>
              <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Trending Now</h4>
              <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Popular games played by millions this week</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating sidebar for quick access */}
      <FloatingSidebar
        games={games}
        onToggleFavorite={toggleFavorite}
      />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts || []} removeToast={_removeToast} />

      {/* Mobile quick actions (bottom) */}
      <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className={`flex items-center gap-3 bg-white/90 dark:bg-slate-800/80 backdrop-blur rounded-full p-2 shadow-lg`}>
          <button onClick={() => { handleNotifications(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          </button>
          <button onClick={() => { handleFavorites(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
          </button>
          <button onClick={() => { handleRecent(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 11-9-9"/><path d="M22 12h-6"/><path d="M12 7v5l3 3"/></svg>
          </button>
        </div>
      </div>

      {/* Smooth transition styles applied locally so toggling dark mode animates */}
      <style>{`
        .smooth-transition, .smooth-transition * {
          transition: background-color 400ms ease, color 400ms ease, box-shadow 300ms ease, border-color 300ms ease;
        }
        .smooth-transition .scrollbar-hide::-webkit-scrollbar { display: none; }
        /* curved section and animated entrance styles */
        .section-wave svg path{ transition: fill 400ms ease; }

        .games-list .animate-card{ opacity: 0; transform: translateY(18px) scale(0.985); transition: opacity 520ms cubic-bezier(.2,.9,.2,1), transform 520ms cubic-bezier(.2,.9,.2,1); }
        .games-list.in-view .animate-card{ opacity: 1; transform: none; }
        .games-list .animate-card{ transition-delay: calc(var(--i) * 70ms); }

        .featured-section{ opacity: 0; transform: translateX(24px); transition: opacity 600ms ease, transform 600ms ease; }
        .featured-section.in-view{ opacity: 1; transform: none; }

        /* subtle floating background shapes for sections */
        .section-blob{ position: absolute; border-radius: 9999px; filter: blur(36px); opacity: .12; }
        /* Responsive: on small screens stack cards vertically instead of horizontal scroll */
        .games-list { display: flex; }
        @media (max-width: 640px) {
          .games-list { display: grid; grid-template-columns: 1fr; gap: 1rem; min-width: 100%; padding-right: 0; }
          .games-list .animate-card { transition: none; transform: none !important; }
        }
      `}</style>

      <footer className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t mt-16`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Games</h5>
              <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li className="hover:text-blue-500 cursor-pointer">Popular</li>
                <li className="hover:text-blue-500 cursor-pointer">New</li>
                <li className="hover:text-blue-500 cursor-pointer">Categories</li>
              </ul>
            </div>
            <div>
              <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Community</h5>
              <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li className="hover:text-blue-500 cursor-pointer">Forum</li>
                <li className="hover:text-blue-500 cursor-pointer">Leaderboard</li>
                <li className="hover:text-blue-500 cursor-pointer">Events</li>
              </ul>
            </div>
            <div>
              <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Support</h5>
              <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li className="hover:text-blue-500 cursor-pointer">Help</li>
                <li className="hover:text-blue-500 cursor-pointer">Contact</li>
                <li className="hover:text-blue-500 cursor-pointer">Status</li>
              </ul>
            </div>
            <div>
              <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h5>
              <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <li className="hover:text-blue-500 cursor-pointer">Privacy</li>
                <li className="hover:text-blue-500 cursor-pointer">Terms</li>
                <li className="hover:text-blue-500 cursor-pointer">Cookies</li>
              </ul>
            </div>
          </div>
          <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} pt-8 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>&copy; 2025 GameHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`\n        .scrollbar-hide::-webkit-scrollbar {\n          display: none;\n        }\n        .scrollbar-hide {\n          -ms-overflow-style: none;\n          scrollbar-width: none;\n        }\n      `}</style>
    </div>
  );
};

export default GameLobby;
