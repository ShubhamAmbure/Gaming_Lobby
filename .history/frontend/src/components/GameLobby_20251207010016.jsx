import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import {
  Menu,
  Moon,
  Sun,
  Search,
  ChevronDown,
  User,
} from 'lucide-react';
import GameCard from './GameCard';
import ToastContainer from './ToastContainer';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

const GameLobby = ({ games = [] }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const {
    state,
    toggleDark,
    addRecent,
    addNotification,
    toggleFav,
    addToast,
    removeToast,
    setCurrency,
  } = useApp();

  const {
    isDark,
    favorites,
    toasts,
    currency,
    userId,
  } = state;

  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [langDropdown, setLangDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  // ---------------------- CATEGORIES -----------------------
  const categories = [
    { id: 'all', label: t('all') },
    { id: 'casual', label: t('casual') },
    { id: 'pg_soft', label: t('pg_soft') },
    { id: 'pp', label: t('pp') },
    { id: 'hacksaw', label: t('hacksaw') },
    { id: 'revenge', label: t('revenge') },
    { id: 'bgaming', label: t('bgaming') },
    { id: 'allstars', label: t('allstars') },
    { id: 'others', label: t('others') },
  ];

  // ---------------------- LANGS -----------------------
  const languageMeta = {
    en: { label: 'EN', flag: '🇺🇸' },
    es: { label: 'ES', flag: '🇪🇸' },
    fr: { label: 'FR', flag: '🇫🇷' },
  };

  const currentLangMeta =
    languageMeta[i18n.language] ||
    { label: (i18n.language || 'EN').toUpperCase(), flag: '🌐' };

  // ---------------------- CURRENCIES -----------------------
  const currencies = ['USD', 'EUR', 'INR', 'GBP', 'BTC'];
  const currencyMeta = {
    USD: { label: 'USD', flag: '🇺🇸' },
    EUR: { label: 'EUR', flag: '🇪🇺' },
    INR: { label: 'INR', flag: '🇮🇳' },
    GBP: { label: 'GBP', flag: '🇬🇧' },
    BTC: { label: 'BTC', flag: '₿' },
  };

  const currentCurrencyMeta =
    currencyMeta[currency || 'USD'] || { label: currency || 'USD', flag: '💱' };

  // ---------------------- TOAST HANDLER -----------------------
  const addToastMessage = useCallback(
    (message, type = 'info', duration = 3000) => {
      const id = Date.now();
      addToast({ id, message, type, duration });
    },
    [addToast]
  );

  const _removeToast = useCallback(
    (id) => removeToast(id),
    [removeToast]
  );

  // ---------------------- COPY USER ID -----------------------
  const handleCopyUserId = async () => {
    try {
      if (!userId) return;
      await navigator.clipboard.writeText(userId);
      addToastMessage(`${t('copy')} ✅`, 'success');
    } catch {
      addToastMessage('Copy failed', 'warning');
    }
  };

  // ---------------------- CLICK GAME -----------------------
  const handleGameClick = useCallback(
    (gameId) => {
      navigate(`/game/${gameId}`);
    },
    [navigate]
  );

  // ---------------- INTERSECTION OBSERVER ----------------
  const gamesRef = useRef(null);
  const [gamesInView, setGamesInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setGamesInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    if (gamesRef.current) obs.observe(gamesRef.current);
    return () => obs.disconnect();
  }, []);

  // ---------------------- FILTERED GAMES -----------------------
  const filteredGames = useMemo(() => {
    let list = games;

    if (selectedCategory !== 'all') {
      list = list.filter(
        (g) => (g.category || '').toLowerCase() === selectedCategory
      );
    }

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(s) ||
          (g.category || '').toLowerCase().includes(s)
      );
    }

    return list;
  }, [games, selectedCategory, search]);

  // =====================================================================
  //                              RETURN UI
  // =====================================================================
  return (
    <div
      data-theme={isDark ? 'dark' : 'light'}
      className="min-h-screen"
      style={{
        background: isDark
          ? '#0D1117'
          : 'linear-gradient(180deg,#f8fafc,#e6f0ff)',
      }}
    >

      {/* ====================== NAVBAR ======================= */}
      <header
        className={`${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        } border-b sticky top-0 z-[9999999] shadow-md`}
      >
        <div className="flex items-center justify-between px-4 py-4 w-full">

         {/* LEFT LOGO — RESPONSIVE (Option B) */}
{/* LEFT LOGO — PERFECT RESPONSIVE BALANCED SIZE */}
<div className="flex items-center">
  <img
    src="/images/100.png"
    alt="logo"
    className="w-8 h-8 md:w-12 md:h-12 object-contain"
  />
</div>

          {/* ================= RIGHT NAV BUTTONS ================= */}
          <div className="flex items-center gap-3 md:gap-4">

            {/* Desktop Search */}
            <div
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDark ? 'bg-slate-700' : 'bg-slate-100'
              }`}
            >
              <Search className={isDark ? 'text-slate-400' : 'text-slate-600'} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('search_games')}
                className={`bg-transparent outline-none ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              />
            </div>

            {/* Mobile Search Icon */}
            <button
              className={`md:hidden p-2 rounded-lg ${
                isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'
              }`}
              onClick={() => setMobileSearchOpen(true)}
            >
              <Search />
            </button>

            {/* Mobile Search Drawer */}
            {mobileSearchOpen && (
              <div className="md:hidden fixed top-0 left-0 w-full p-4 flex items-center gap-2 bg-white dark:bg-slate-800 shadow z-[999999]">
                <Search className="text-slate-500" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('search_games')}
                  className="flex-1 bg-transparent outline-none text-black dark:text-white"
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  className="p-2 rounded-lg"
                >
                  ✖
                </button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg ${
                isDark ? 'bg-slate-700 text-yellow-300' : 'bg-slate-200 text-black'
              }`}
            >
              {isDark ? <Sun /> : <Moon />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg relative z-[9999999] ${
                isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Language / Currency / Profile stay unchanged */}
            {/* ... They are same as before ... */}

          </div>
        </div>
      </header>

      {/* ===================== MOBILE SIDEBAR ===================== */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-[999999]"
            onClick={() => {
              setMenuOpen(false);
              setLangDropdown(false);
              setCurrencyDropdown(false);
              setUserDropdown(false);
            }}
          />

          <div
            className="fixed top-0 right-0 md:hidden h-full w-64 z-[9999999]
                       bg-white dark:bg-slate-800 shadow-xl border-l border-slate-700
                       animate-slideLeft p-4 flex flex-col gap-4"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">
                Menu
              </h2>
              <button
                className="text-xl"
                onClick={() => setMenuOpen(false)}
              >
                ✖
              </button>
            </div>

            {/* LANGUAGE */}
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
                        text-white flex justify-between items-center"
            >
              🌐 Language
              <ChevronDown className="w-4 h-4" />
            </button>

            {langDropdown && (
              <div className="bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                {['en', 'es', 'fr'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      i18n.changeLanguage(lang);
                      setLangDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    {languageMeta[lang].flag} {languageMeta[lang].label}
                  </button>
                ))}
              </div>
            )}

            {/* CURRENCY */}
            <button
              onClick={() => setCurrencyDropdown(!currencyDropdown)}
              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
                        text-white flex justify-between items-center"
            >
              💱 Currency
              <ChevronDown className="w-4 h-4" />
            </button>

            {currencyDropdown && (
              <div className="bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                {currencies.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdown(false);
                      addToastMessage(`Currency set to ${c}`, 'success');
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    {currencyMeta[c].flag} {currencyMeta[c].label}
                  </button>
                ))}
              </div>
            )}

            {/* PROFILE */}
            <button
              onClick={() => setUserDropdown(!userDropdown)}
              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500
                        text-white flex justify-between items-center"
            >
              👤 Profile
              <ChevronDown className="w-4 h-4" />
            </button>

            {userDropdown && (
              <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-4">
                <p className="text-xs text-gray-700 dark:text-gray-300">User ID</p>
                <p className="text-sm text-black dark:text-white break-all mt-1 mb-3">
                  {userId || '-'}
                </p>

                <button
                  onClick={handleCopyUserId}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                >
                  Copy ID
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ===================== MAIN CONTENT ===================== */}
      <main className="w-full px-4 sm:px-6 lg:px-10 py-10">

        <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          {t('discover_play')}
        </h2>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          Click the play button to start your adventure!
        </p>

        <div className="flex gap-3 overflow-x-auto mt-6 pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold'
                  : isDark
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-200 text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          ref={gamesRef}
          className={`w-full grid
            grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
            gap-6 mt-10 games-list ${
              gamesInView ? 'in-view' : ''
            }`}
        >
          {filteredGames.length ? (
            filteredGames.map((game, idx) => (
              <div key={game.id} className="animate-card" style={{ ['--i']: idx }}>
                <GameCard game={game} />
              </div>
            ))
          ) : (
            <p
              className={`col-span-full text-center mt-10 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {t('no_games')}
            </p>
          )}
        </div>
      </main>

      <ToastContainer toasts={toasts} removeToast={_removeToast} />

      <style>{`
        .games-list .animate-card {
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.4s ease;
        }
        .games-list.in-view .animate-card {
          opacity: 1;
          transform: translateY(0);
        }
        .games-list .animate-card {
          transition-delay: calc(var(--i) * 60ms);
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slideLeft {
          animation: slideLeft 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameLobby;










// import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
// import {
//   Menu,
//   Moon,
//   Sun,
//   Search,
//   ChevronDown,
//   User,
// } from 'lucide-react';
// import GameCard from './GameCard';
// import ToastContainer from './ToastContainer';
// import { useNavigate } from 'react-router-dom';
// import { useApp } from '../context/AppContext';
// import { useTranslation } from 'react-i18next';

// const GameLobby = ({ games = [] }) => {
//   const navigate = useNavigate();
//   const { t, i18n } = useTranslation();
//   const {
//     state,
//     toggleDark,
//     addRecent,
//     addNotification,
//     toggleFav,
//     addToast,
//     removeToast,
//     setCurrency,
//   } = useApp();

//   const {
//     isDark,
//     favorites,
//     notifications,
//     recentlyPlayed,
//     toasts,
//     currency,
//     userId,
//   } = state;

//   const [search, setSearch] = useState('');
//   const [menuOpen, setMenuOpen] = useState(false);          // mobile sidebar
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false); // mobile search drawer

//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [langDropdown, setLangDropdown] = useState(false);
//   const [currencyDropdown, setCurrencyDropdown] = useState(false);
//   const [userDropdown, setUserDropdown] = useState(false);

//   // ---------------------- CATEGORIES -----------------------
//   const categories = [
//     { id: 'all', label: t('all') },
//     { id: 'casual', label: t('casual') },
//     { id: 'pg_soft', label: t('pg_soft') },
//     { id: 'pp', label: t('pp') },
//     { id: 'hacksaw', label: t('hacksaw') },
//     { id: 'revenge', label: t('revenge') },
//     { id: 'bgaming', label: t('bgaming') },
//     { id: 'allstars', label: t('allstars') },
//     { id: 'others', label: t('others') },
//   ];

//   // ---------------------- LANGS -----------------------
//   const languageMeta = {
//     en: { label: 'EN', flag: '🇺🇸' },
//     es: { label: 'ES', flag: '🇪🇸' },
//     fr: { label: 'FR', flag: '🇫🇷' },
//     hi: { label: 'HI', flag: '🇮🇳' },
//     de: { label: 'DE', flag: '🇩🇪' },
//   };

//   const currentLangMeta =
//     languageMeta[i18n.language] ||
//     { label: (i18n.language || 'EN').toUpperCase(), flag: '🌐' };

//   // ---------------------- CURRENCIES -----------------------
//   const currencies = ['USD', 'EUR', 'INR', 'GBP', 'BTC'];
//   const currencyMeta = {
//     USD: { label: 'USD', flag: '🇺🇸' },
//     EUR: { label: 'EUR', flag: '🇪🇺' },
//     INR: { label: 'INR', flag: '🇮🇳' },
//     GBP: { label: 'GBP', flag: '🇬🇧' },
//     BTC: { label: 'BTC', flag: '₿' },
//   };

//   const currentCurrencyMeta =
//     currencyMeta[currency || 'USD'] || { label: currency || 'USD', flag: '💱' };

//   // ---------------------- TOAST HANDLER -----------------------
//   const addToastMessage = useCallback(
//     (message, type = 'info', duration = 3000) => {
//       const id = Date.now();
//       addToast({ id, message, type, duration });
//     },
//     [addToast]
//   );

//   const _removeToast = useCallback(
//     (id) => removeToast && removeToast(id),
//     [removeToast]
//   );

//   // ---------------------- COPY USER ID -----------------------
//   const handleCopyUserId = async () => {
//     try {
//       if (!userId) return;
//       await navigator.clipboard.writeText(userId);
//       addToastMessage(`${t('copy')} ✅`, 'success');
//     } catch {
//       addToastMessage('Copy failed', 'warning');
//     }
//   };

//   // ---------------------- CLICK GAME -----------------------
//   const handleGameClick = useCallback(
//     (gameId) => {
//       addRecent(gameId);
//       const game = games.find((g) => g.id === gameId);
//       addNotification(`Started playing ${game?.title || 'Game'}`);
//       addToastMessage(`🎮 Game Started!`, 'success');
//       navigate(`/game/${gameId}`);
//     },
//     [addRecent, addNotification, addToastMessage, games, navigate]
//   );

//   // ---------------------- FAVORITE -----------------------
//   const toggleFavorite = useCallback(
//     (gameId) => {
//       toggleFav(gameId);
//       const isNowFav = !(favorites || []).includes(gameId);
//       addToastMessage(
//         isNowFav ? '✨ Added to Favorites' : '❤️ Removed from Favorites',
//         isNowFav ? 'success' : 'warning'
//       );
//     },
//     [toggleFav, favorites, addToastMessage]
//   );

//   // ---------------- INTERSECTION OBSERVER ----------------
//   const gamesRef = useRef(null);
//   const [gamesInView, setGamesInView] = useState(false);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setGamesInView(true);
//             obs.disconnect();
//           }
//         });
//       },
//       { threshold: 0.15 }
//     );
//     if (gamesRef.current) obs.observe(gamesRef.current);
//     return () => obs.disconnect();
//   }, []);

//   // ---------------------- FILTERED GAMES -----------------------
//   const filteredGames = useMemo(() => {
//     let list = games;

//     if (selectedCategory !== 'all') {
//       list = list.filter(
//         (g) => (g.category || '').toLowerCase() === selectedCategory
//       );
//     }

//     if (search) {
//       const s = search.toLowerCase();
//       list = list.filter(
//         (g) =>
//           g.title.toLowerCase().includes(s) ||
//           (g.category || '').toLowerCase().includes(s)
//       );
//     }

//     return list;
//   }, [games, selectedCategory, search]);

//   // =====================================================================
//   //                              RETURN UI
//   // =====================================================================
//   return (
//     <div
//       data-theme={isDark ? 'dark' : 'light'}
//       className="min-h-screen"
//       style={{
//         background: isDark
//           ? '#0D1117'
//           : 'linear-gradient(180deg,#f8fafc,#e6f0ff)',
//       }}
//     >
//       {/* ====================== NAVBAR ======================= */}
//       <header
//         className={`${
//           isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
//         } border-b sticky top-0 z-50 shadow-md`}
//       >
//         <div className="flex items-center justify-between px-4 py-4 w-full">

//           {/* ============== LEFT LOGO ============== */}
//           <div className="flex items-center gap-3">
//             <img
//               src="/images/100.png"
//               alt="logo"
//               className="w-[30px] h-[30px] object-contain"
//             />
//             <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
//               Zenvy Gaming
//             </h1>
//           </div>

//           {/* ================= RIGHT NAV BUTTONS ================= */}
//           <div className="flex items-center gap-3 md:gap-4">

//             {/* Desktop Search */}
//             <div
//               className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
//                 isDark ? 'bg-slate-700' : 'bg-slate-100'
//               }`}
//             >
//               <Search className={isDark ? 'text-slate-400' : 'text-slate-600'} />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder={t('search_games')}
//                 className={`bg-transparent outline-none ${
//                   isDark ? 'text-white' : 'text-black'
//                 }`}
//               />
//             </div>

//             {/* Mobile Search Icon */}
//             <button
//               className={`md:hidden p-2 rounded-lg ${
//                 isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'
//               }`}
//               onClick={() => setMobileSearchOpen(true)}
//             >
//               <Search />
//             </button>

//             {/* Mobile Search Drawer */}
//             {mobileSearchOpen && (
//               <div className="md:hidden fixed top-0 left-0 w-full p-4 flex items-center gap-2 bg-white dark:bg-slate-800 shadow z-[999999]">
//                 <Search className="text-slate-500" />
//                 <input
//                   autoFocus
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder={t('search_games')}
//                   className="flex-1 bg-transparent outline-none text-black dark:text-white"
//                 />
//                 <button
//                   onClick={() => setMobileSearchOpen(false)}
//                   className="p-2 rounded-lg"
//                 >
//                   ✖
//                 </button>
//               </div>
//             )}

//             {/* Dark Mode Toggle */}
//             <button
//               onClick={toggleDark}
//               className={`p-2 rounded-lg ${
//                 isDark ? 'bg-slate-700 text-yellow-300' : 'bg-slate-200 text-black'
//               }`}
//             >
//               {isDark ? <Sun /> : <Moon />}
//             </button>

//             {/* Language - Desktop Only */}
//             <div className="relative hidden md:block">
//               <button
//                 onClick={() => setLangDropdown(!langDropdown)}
//                 className="px-3 py-2 rounded-lg flex items-center gap-2 font-medium
//                            bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
//                            text-white shadow-md hover:opacity-90 transition"
//               >
//                 <span>{currentLangMeta.flag}</span>
//                 <ChevronDown className="w-3 h-3" />
//               </button>

//               {langDropdown && (
//                 <div
//                   className="absolute right-0 mt-2 min-w-[130px]
//                              bg-gradient-to-b from-white to-gray-200
//                              dark:from-slate-800 dark:to-slate-900
//                              rounded-lg shadow-xl border border-gray-300 dark:border-slate-700"
//                 >
//                   {['en', 'es', 'fr'].map((lang) => (
//                     <button
//                       key={lang}
//                       onClick={() => {
//                         i18n.changeLanguage(lang);
//                         setLangDropdown(false);
//                       }}
//                       className="block px-4 py-2 w-full text-left 
//                                  hover:bg-gradient-to-r hover:from-purple-600 
//                                  hover:to-blue-600 hover:text-white
//                                  text-gray-900 dark:text-gray-100
//                                  rounded-md transition"
//                     >
//                       {languageMeta[lang].flag} {languageMeta[lang].label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Currency - Desktop Only */}
//             <div className="relative hidden md:block">
//               <button
//                 onClick={() => setCurrencyDropdown(!currencyDropdown)}
//                 className="px-3 py-2 rounded-lg flex items-center gap-2 font-medium
//                            bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
//                            text-white shadow-md hover:opacity-90 transition"
//               >
//                 <span>{currentCurrencyMeta.flag}</span>
//                 <ChevronDown className="w-3 h-3" />
//               </button>

//               {currencyDropdown && (
//                 <div
//                   className="absolute right-0 mt-2 min-w-[130px]
//                              bg-gradient-to-b from-white to-gray-200
//                              dark:from-slate-800 dark:to-slate-900
//                              rounded-lg shadow-xl border border-gray-300 dark:border-slate-700"
//                 >
//                   {currencies.map((c) => (
//                     <button
//                       key={c}
//                       onClick={() => {
//                         setCurrency(c);
//                         setCurrencyDropdown(false);
//                         addToastMessage(`Currency set to ${c}`, 'success');
//                       }}
//                       className="block px-4 py-2 w-full text-left 
//                                  hover:bg-gradient-to-r hover:from-purple-600 
//                                  hover:to-blue-600 hover:text-white
//                                  text-gray-900 dark:text-gray-100
//                                  rounded-md transition"
//                     >
//                       {currencyMeta[c].flag} {currencyMeta[c].label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* User - Desktop Only */}
//             <div className="relative hidden md:block">
//               <button
//                 onClick={() => setUserDropdown(!userDropdown)}
//                 className="w-10 h-10 rounded-full flex items-center justify-center
//                            bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600
//                            text-white shadow-md hover:opacity-90 transition"
//               >
//                 <User className="w-5 h-5" />
//               </button>

//               {userDropdown && (
//                 <div
//                   className="absolute right-0 mt-2 w-64 p-4 rounded-lg shadow-xl
//                              bg-gradient-to-b from-white to-gray-200
//                              dark:from-slate-800 dark:to-slate-900
//                              border border-gray-300 dark:border-slate-700"
//                 >
//                   <p className="text-xs text-gray-600 dark:text-gray-300 uppercase">
//                     User ID
//                   </p>

//                   <p
//                     className="text-sm break-all mt-1 mb-3 
//                                text-gray-900 dark:text-gray-100"
//                   >
//                     {userId || '-'}
//                   </p>

//                   <button
//                     onClick={handleCopyUserId}
//                     className="w-full py-2 rounded-lg font-medium
//                                bg-gradient-to-r from-purple-600 to-blue-600
//                                text-white shadow hover:opacity-90 transition"
//                   >
//                     Copy ID
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className={`md:hidden p-2 rounded-lg relative z-[999999] ${
//                 isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'
//               }`}
//             >
//               <Menu className="w-6 h-6" />
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* ===================== MOBILE SIDEBAR (Option A) ===================== */}
//       {menuOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="md:hidden fixed inset-0 bg-black/50 z-[99998]"
//             onClick={() => {
//               setMenuOpen(false);
//               setLangDropdown(false);
//               setCurrencyDropdown(false);
//               setUserDropdown(false);
//             }}
//           />
//           {/* Sidebar */}
//           <div
//             className={`md:hidden fixed top-0 right-0 h-full w-64 z-[99999]
//                         bg-white dark:bg-slate-800 shadow-xl border-l border-slate-700
//                         animate-slideLeft flex flex-col`}
//           >
//             <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-700">
//               <span className="font-semibold text-slate-800 dark:text-slate-100">
//                 {t('menu') || 'Menu'}
//               </span>
//               <button
//                 onClick={() => {
//                   setMenuOpen(false);
//                   setLangDropdown(false);
//                   setCurrencyDropdown(false);
//                   setUserDropdown(false);
//                 }}
//                 className="p-1 text-slate-700 dark:text-slate-100"
//               >
//                 ✖
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

//               {/* Mobile Language */}
//               <div>
//                 <button
//                   onClick={() => setLangDropdown((v) => !v)}
//                   className="w-full px-3 py-2 rounded-lg flex items-center justify-between 
//                              bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
//                              text-white font-semibold shadow"
//                 >
//                   <span>🌐 {currentLangMeta.label}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {langDropdown && (
//                   <div className="mt-2 rounded-lg bg-slate-100 dark:bg-slate-700 shadow-md">
//                     {['en', 'es', 'fr'].map((lang) => (
//                       <button
//                         key={lang}
//                         onClick={() => {
//                           i18n.changeLanguage(lang);
//                           setLangDropdown(false);
//                         }}
//                         className="block w-full px-4 py-2 text-left 
//                                    text-slate-800 dark:text-slate-100
//                                    hover:bg-slate-200 dark:hover:bg-slate-600"
//                       >
//                         {languageMeta[lang].flag} {languageMeta[lang].label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile Currency */}
//               <div>
//                 <button
//                   onClick={() => setCurrencyDropdown((v) => !v)}
//                   className="w-full px-3 py-2 rounded-lg flex items-center justify-between 
//                              bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
//                              text-white font-semibold shadow"
//                 >
//                   <span>💱 {currentCurrencyMeta.label}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {currencyDropdown && (
//                   <div className="mt-2 rounded-lg bg-slate-100 dark:bg-slate-700 shadow-md">
//                     {currencies.map((c) => (
//                       <button
//                         key={c}
//                         onClick={() => {
//                           setCurrency(c);
//                           setCurrencyDropdown(false);
//                           addToastMessage(`Currency set to ${c}`, 'success');
//                         }}
//                         className="block w-full px-4 py-2 text-left 
//                                    text-slate-800 dark:text-slate-100
//                                    hover:bg-slate-200 dark:hover:bg-slate-600"
//                       >
//                         {currencyMeta[c].flag} {currencyMeta[c].label}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Mobile User Profile */}
//               <div>
//                 <button
//                   onClick={() => setUserDropdown((v) => !v)}
//                   className="w-full px-3 py-3 rounded-lg flex items-center justify-between
//                              bg-gradient-to-r from-purple-500 to-blue-500 
//                              text-white font-semibold shadow"
//                 >
//                   <span>👤 Profile</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {userDropdown && (
//                   <div className="mt-2 rounded-lg bg-slate-100 dark:bg-slate-700 p-4 shadow-md">
//                     <p className="text-xs text-gray-600 dark:text-gray-300 uppercase">
//                       User ID
//                     </p>

//                     <p className="text-sm break-all mt-1 mb-3 text-gray-900 dark:text-gray-100">
//                       {userId || '-'}
//                     </p>

//                     <button
//                       onClick={handleCopyUserId}
//                       className="w-full py-2 rounded-lg font-medium
//                                  bg-gradient-to-r from-purple-600 to-blue-600
//                                  text-white shadow hover:opacity-90 transition"
//                     >
//                       Copy ID
//                     </button>
//                   </div>
//                 )}
//               </div>

//             </div>
//           </div>
//         </>
//       )}

//       {/* ===================== MAIN CONTENT ===================== */}
//       <main className="w-full px-4 sm:px-6 lg:px-10 py-10">

//         {/* Heading */}
//         <div>
//           <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
//             {t('discover_play')}
//           </h2>
//           <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
//             Click the play button to start your adventure!
//           </p>
//         </div>

//         {/* Category */}
//         <div className="flex gap-3 overflow-x-auto mt-6 pb-2 scrollbar-hide">
//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setSelectedCategory(cat.id)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap ${
//                 selectedCategory === cat.id
//                   ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold'
//                   : isDark
//                   ? 'bg-slate-700 text-white'
//                   : 'bg-slate-200 text-black'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* ===================== GAME GRID ===================== */}
//         <div
//           ref={gamesRef}
//           className={`w-full grid
//             grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
//             gap-6 mt-10 games-list ${
//               gamesInView ? 'in-view' : ''
//             }`}
//         >
//           {filteredGames.length ? (
//             filteredGames.map((game, idx) => (
//               <div key={game.id} className="animate-card" style={{ ['--i']: idx }}>
//                 <GameCard game={game} onClick={() => handleGameClick(game.id)} />
//               </div>
//             ))
//           ) : (
//             <p
//               className={`col-span-full text-center mt-10 ${
//                 isDark ? 'text-slate-400' : 'text-slate-600'
//               }`}
//             >
//               {t('no_games')}
//             </p>
//           )}
//         </div>
//       </main>

//       {/* TOASTS */}
//       <ToastContainer toasts={toasts} removeToast={_removeToast} />

//       {/* ANIMATIONS & SIDEBAR KEYFRAMES */}
//       <style>{`
//         .games-list .animate-card {
//           opacity: 0;
//           transform: translateY(15px);
//           transition: all 0.4s ease;
//         }
//         .games-list.in-view .animate-card {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         .games-list .animate-card {
//           transition-delay: calc(var(--i) * 60ms);
//         }
//         @keyframes slideLeft {
//           from { transform: translateX(100%); }
//           to { transform: translateX(0); }
//         }
//         .animate-slideLeft {
//           animation: slideLeft 0.25s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GameLobby;
