// // import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
// // import { Gamepad2, Menu, Globe, Moon, Sun, Search, ChevronDown } from 'lucide-react';
// // import GameCard from './GameCard';
// // import FloatingSidebar from './FloatingSidebar';
// // import ToastContainer from './ToastContainer';
// // import { useNavigate } from 'react-router-dom';
// // import { useApp } from '../context/AppContext';
// // import { useTranslation } from 'react-i18next';

// // const GameLobby = ({ games = [] }) => {
// //   const navigate = useNavigate();
// //   const { t, i18n } = useTranslation();
// //   const { state, toggleDark, addRecent, addNotification, toggleFav, addToast, clearNotifications, removeToast, setCurrency, setUserId } = useApp();
// //   const { isDark, favorites, notifications, recentlyPlayed, toasts, currency, userId } = state;
// //   const [search, setSearch] = React.useState('');
// //   const [menuOpen, setMenuOpen] = React.useState(false);
// //   const [selectedCategory, setSelectedCategory] = React.useState('all');
// //   const [langDropdown, setLangDropdown] = React.useState(false);
// //   const [currencyDropdown, setCurrencyDropdown] = React.useState(false);
// //   const [userDropdown, setUserDropdown] = React.useState(false);

// //   const categories = [
// //     { id: 'all', label: t('all') },
// //     { id: 'casual', label: t('casual') },
// //     { id: 'pg_soft', label: t('pg_soft') },
// //     { id: 'pp', label: t('pp') },
// //     { id: 'hacksaw', label: t('hacksaw') },
// //     { id: 'revenge', label: t('revenge') },
// //     { id: 'bgaming', label: t('bgaming') },
// //     { id: 'allstars', label: t('allstars') },
// //     { id: 'others', label: t('others') },
// //   ];

// //   const currencies = ['USD', 'EUR', 'INR', 'GBP', 'BTC'];

// //   const generateId = (prefix = 'user') => {
// //     const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
// //     return `${prefix.toUpperCase()}_${rand}`;
// //   };

// //   const handleCopyUserId = async () => {
// //     try {
// //       if (!userId) return;
// //       await navigator.clipboard.writeText(userId);
// //       addToastMessage(`${t('copy')} ✅`);
// //     } catch (e) {
// //       addToastMessage('Copy failed', 'warning');
// //     }
// //   };

// //   const handleGenerateUserId = () => {
// //     const id = generateId('uid');
// //     setUserId(id);
// //     addToastMessage(t('generate_new_id'), 'success');
// //     setUserDropdown(false);
// //   };

// //   const addToastMessage = useCallback((message, type = 'info', duration = 3000) => {
// //     const id = Date.now();
// //     addToast({ id, message, type, duration });
// //   }, [addToast]);

// //   // use context removeToast
// //   const _removeToast = useCallback((id) => { if (removeToast) removeToast(id); }, [removeToast]);

// //   const handleGameClick = useCallback((gameId) => {
// //     addRecent(gameId);
// //     const game = games.find((g) => g.id === gameId);
// //     addNotification(`Started playing ${game?.title || 'Game'}`);
// //     addToastMessage(`🎮 Game Started!`, 'success');
// //     navigate(`/game/${gameId}`);
// //   }, [addRecent, addNotification, addToastMessage, games, navigate]);

// //   const toggleFavorite = useCallback((gameId) => {
// //     toggleFav(gameId);
// //     const isNowFav = !(favorites || []).includes(gameId);
// //     addToastMessage(isNowFav ? `✨ Added to Favorites` : `❤️ Removed from Favorites`, isNowFav ? 'success' : 'warning');
// //   }, [toggleFav, favorites, addToastMessage]);

// //   // refs + in-view states for scroll-trigger animations
// //   const gamesRef = useRef(null);
// //   const featuredRef = useRef(null);
// //   const [gamesInView, setGamesInView] = useState(false);
// //   const [featuredInView, setFeaturedInView] = useState(false);

// //   useEffect(() => {
// //     const obsOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
// //     let gObs = null;
// //     let fObs = null;

// //     if (gamesRef.current) {
// //       gObs = new IntersectionObserver((entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setGamesInView(true);
// //             gObs.disconnect();
// //           }
// //         });
// //       }, obsOptions);
// //       gObs.observe(gamesRef.current);
// //     }

// //     if (featuredRef.current) {
// //       fObs = new IntersectionObserver((entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setFeaturedInView(true);
// //             fObs.disconnect();
// //           }
// //         });
// //       }, obsOptions);
// //       fObs.observe(featuredRef.current);
// //     }

// //     return () => {
// //       if (gObs) gObs.disconnect();
// //       if (fObs) fObs.disconnect();
// //     };
// //   }, []);

// //   const navigateToCollection = useCallback((name) => {
// //     navigate(`/collection/${encodeURIComponent(name)}`);
// //   }, [navigate]);

// //   const handleNotifications = useCallback(() => {
// //     if (!notifications || notifications.length === 0) {
// //       addToastMessage('No notifications yet', 'info');
// //       return;
// //     }
// //     const notificationList = notifications.slice(0, 5).map((n) => n.text).join(', ');
// //     addToastMessage(`📢 ${notificationList}`, 'info', 4000);
// //     clearNotifications();
// //   }, [notifications, addToastMessage, clearNotifications]);

// //   const handleFavorites = useCallback(() => {
// //     if (!favorites || favorites.length === 0) {
// //       addToastMessage('No favorites yet! Add some games ❤️', 'info');
// //       return;
// //     }
// //     const favList = favorites.slice(0, 3).map((fav) => {
// //       const g = games.find((gg) => gg.id === fav);
// //       return g?.title || `Game ${fav}`;
// //     }).join(', ');
// //     const more = favorites.length > 3 ? ` +${favorites.length - 3} more` : '';
// //     addToastMessage(`⭐ Favorites: ${favList}${more}`, 'success', 4000);
// //   }, [favorites, games, addToastMessage]);

// //   const handleRecent = useCallback(() => {
// //     if (!recentlyPlayed || recentlyPlayed.length === 0) {
// //       addToastMessage('No recently played games', 'info');
// //       return;
// //     }
// //     const recentList = recentlyPlayed.slice(0, 3).map((recent) => {
// //       const g = games.find((gg) => gg.id === recent);
// //       return g?.title || `Game ${recent}`;
// //     }).join(', ');
// //     const more = recentlyPlayed.length > 3 ? ` +${recentlyPlayed.length - 3} more` : '';
// //     addToastMessage(`🎮 Recently: ${recentList}${more}`, 'info', 4000);
// //   }, [recentlyPlayed, games, addToastMessage]);

// //   const filteredGames = useMemo(() => {
// //     let filtered = games;
    
// //     // Filter by category
// //     if (selectedCategory !== 'all') {
// //       filtered = filtered.filter((g) => (g.category || '').toLowerCase() === selectedCategory);
// //     }
    
// //     // Filter by search
// //     if (search) {
// //       const s = search.toLowerCase();
// //       filtered = filtered.filter((g) => g.title.toLowerCase().includes(s) || (g.category || '').toLowerCase().includes(s));
// //     }
    
// //     return filtered;
// //   }, [games, search, selectedCategory]);

// //   return (
// //     <div data-theme={isDark ? 'dark' : 'light'} className={`min-h-screen smooth-transition`} style={{ background: isDark ? '#0D1117' : 'linear-gradient(180deg,#f8fafc,#e6f0ff)' }}>
// //       <header className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b sticky top-0 z-50 shadow-md`}>
// //         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className={`p-2 rounded-lg transform transition-transform hover:translate-y-1 active:translate-y-1`} style={{ background: isDark ? 'linear-gradient(135deg,#A46BFF,#3BF4C5)' : 'linear-gradient(135deg,#3BF4C5,#FF4D8D)' }}>
// //               <Gamepad2 className="w-6 h-6 text-white" />
// //             </div>
// //             <h1 className={`text-2xl font-bold mr-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>GameHub</h1>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
// //               <Search className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
// //               <input
// //                 type="text"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 placeholder={t('search_games')}
// //                 className={`bg-transparent outline-none ${isDark ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'}`}
// //               />
// //             </div>

// //             <button onClick={() => toggleDark()} className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 ${isDark ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
// //               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
// //             </button>

// //             <div className="relative">
// //               <button onClick={() => setLangDropdown(!langDropdown)} className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 flex items-center gap-1 ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
// //                 <Globe className="w-5 h-5" />
// //                 <ChevronDown className="w-3 h-3" />
// //               </button>
// //               {langDropdown && (
// //                 <div className={`absolute right-0 top-full mt-2 rounded-lg shadow-lg z-50 ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
// //                   {['en', 'es', 'fr'].map((lang) => (
// //                    <button
// //   key={lang}
// //   onClick={() => {
// //     i18n.changeLanguage(lang);
// //     setLangDropdown(false);
// //   }}
// //   className={`
// //     group relative flex items-center justify-between w-full 
// //     text-left px-4 py-2 text-sm font-medium
// //     transition-all duration-300 overflow-hidden
// //     first:rounded-t-lg last:rounded-b-lg

// //     ${i18n.language === lang 
// //       ? 'bg-blue-500 text-white' 
// //       : isDark 
// //         ? 'text-slate-200' 
// //         : 'text-slate-700'
// //     }

// //     hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 
// //     hover:text-white
// //   `}
// // >
// //   {/* LEFT HIGHLIGHT BAR */}
// //   <span 
// //     className="
// //       absolute left-0 top-0 h-full w-1 bg-orange-500 
// //       scale-y-0 group-hover:scale-y-100 
// //       transition-transform duration-300 origin-top
// //     "
// //   />

// //   {/* FLAG + LANGUAGE NAME */}
// //   <div className="flex items-center gap-3 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
// //     <span className="text-lg">
// //       {{
// //         en: "🇺🇸",
// //         hi: "🇮🇳",
// //         fr: "🇫🇷",
// //         es: "🇪🇸",
// //         de: "🇩🇪",
// //       }[lang] || "🌐"}
// //     </span>

// //     <span>{lang.toUpperCase()}</span>
// //   </div>

// //   {/* CHECKMARK IF ACTIVE */}
// //   {i18n.language === lang && (
// //     <span className="text-white text-sm opacity-100 transition-opacity duration-300">
// //       ✔
// //     </span>
// //   )}
// // </button>

// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Currency selector */}
// //             {/* <div className="relative">
// //               <button onClick={() => setCurrencyDropdown(!currencyDropdown)} className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 flex items-center gap-1 ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
// //                 <span className="font-semibold">{currency || 'USD'}</span>
// //                 <ChevronDown className="w-3 h-3" />
// //               </button>
// //               {currencyDropdown && (
// //                 <div className={`absolute right-0 top-full mt-2 rounded-lg shadow-lg z-50 ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
// //                   {currencies.map((c) => (
// //                     <button
// //                       key={c}
// //                       onClick={() => { setCurrency(c); setCurrencyDropdown(false); addToastMessage(`${t('currency')}: ${c}`, 'success'); }}
// //                       className={`block w-full text-left px-4 py-2 hover:bg-linear-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
// //                     >
// //                       {c}
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div> */}
// //             <div className="relative">
// //   <button
// //     onClick={() => setCurrencyDropdown(!currencyDropdown)}
// //     className={`
// //       p-2 rounded-xl flex items-center gap-2 font-semibold
// //       transition-all duration-300 transform 
// //       hover:-translate-y-0.5 active:translate-y-0.5
// //       shadow-sm
// //       ${isDark 
// //         ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' 
// //         : 'bg-white text-slate-700 hover:bg-slate-100'}
// //     `}
// //   >
// //     <span>{currency || 'USD'}</span>
// //     <ChevronDown
// //       className={`
// //         w-4 h-4 transition-transform duration-300
// //         ${currencyDropdown ? 'rotate-180' : 'rotate-0'}
// //       `}
// //     />
// //   </button>

// //   {currencyDropdown && (
// //     <div
// //       className={`
// //         absolute right-0 top-full mt-2 w-36 rounded-xl overflow-hidden 
// //         shadow-xl border z-50
// //         animate-in fade-in zoom-in-95 duration-200
// //         ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
// //       `}
// //     >
// //       {currencies.map((c) => (
// //        <button
// //   key={c}
// //   onClick={() => {
// //     setCurrency(c);
// //     setCurrencyDropdown(false);
// //     addToastMessage(`${t('currency')}: ${c}`, 'success');
// //   }}
// //   className={`
// //     block w-full text-left px-4 py-2 text-sm font-medium
// //     transition-all duration-300
// //     hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white
// //     ${isDark ? 'text-slate-200 hover:text-white' : 'text-slate-700'}
// //   `}
// // >
// //   {c}
// // </button>

// //       ))}
// //     </div>
// //   )}
// // </div>


// //             {/* User ID menu */}
// //             <div className="relative">
// //               <button onClick={() => setUserDropdown(!userDropdown)} className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 flex items-center gap-2 ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
// //                 <span className="text-sm font-medium">{userId || 'Guest'}</span>
// //                 <ChevronDown className="w-3 h-3" />
// //               </button>
// //               {userDropdown && (
// //                 <div className={`absolute right-0 top-full mt-2 rounded-lg shadow-lg z-50 ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
// //                   <div className={`px-4 py-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
// //                     <div className="text-sm mb-2">{t('userid')}: <strong className="ml-2">{userId || '—'}</strong></div>
// //                     <div className="flex gap-2">
// //                       <button onClick={handleCopyUserId} className={`px-3 py-1 rounded ${isDark ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-800'}`}>{t('copy')}</button>
// //                       <button onClick={handleGenerateUserId} className={`px-3 py-1 rounded ${isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>{t('generate_new_id')}</button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             <button onClick={() => setMenuOpen(!menuOpen)} className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 md:hidden ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
// //               <Menu className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Mobile menu */}
// //       {menuOpen && (
// //         <div className={`md:hidden ${isDark ? 'bg-slate-800' : 'bg-white'} border-b`}>
// //           <div className="px-4 py-4 flex items-center justify-between">
// //             <input
// //               type="text"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder={t('search_games')}
// //               className="w-full bg-transparent outline-none"
// //             />
// //             <button onClick={() => setMenuOpen(false)} className="ml-3 px-3 py-1 bg-blue-500 text-white rounded">Close</button>
// //           </div>
// //         </div>
// //       )}

// //       <main className="max-w-7xl mx-auto px-4 py-12">
// //         <div className="mb-8">
// //           <h2 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('discover_play')}</h2>
// //           <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Click the play button to start your adventure!</p>
// //         </div>

// //         {/* Category Filter Tabs */}
// //         <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
// //           <div className="flex gap-2 min-w-max">
// //             {categories.map((cat) => (
// //               <button
// //                 key={cat.id}
// //                 onClick={() => setSelectedCategory(cat.id)}
// //                 className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
// //                   selectedCategory === cat.id
// //                     ? `bg-linear-to-r ${isDark ? 'from-purple-600 to-cyan-600' : 'from-purple-500 to-cyan-500'} text-white font-semibold shadow-lg`
// //                     : `${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`
// //                 }`}
// //               >
// //                 {cat.label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Vertical Game Grid */}
// //         <div ref={gamesRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 games-list ${gamesInView ? 'in-view' : ''}`}>
// //           {filteredGames.length > 0 ? (
// //             filteredGames.map((game, idx) => (
// //               <div key={game.id} className="animate-card" style={{ ['--i']: idx }}>
// //                 <GameCard game={game} />
// //               </div>
// //             ))
// //           ) : (
// //             <div className={`col-span-full text-center py-12 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
// //               <p className="text-lg">{t('no_games')}</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* curved divider */}
// //         <div className="section-wave mt-12 -mb-6" aria-hidden="true">
// //           <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-20">
// //             <path d="M0,32 C360,96 1080,-32 1440,32 L1440 120 L0 120 Z" fill={isDark ? '#0f172a' : '#ffffff'} opacity="0.9"></path>
// //           </svg>
// //         </div>

// //         {/* Featured Collections section disabled for now */}
// //         {false && (
// //           <section ref={featuredRef} className={`mt-16 featured-section ${featuredInView ? 'in-view' : ''}`}>
// //             <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Featured Collections</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //               <div onClick={() => navigateToCollection('Action')} role="button" tabIndex={0} className={`p-6 rounded-xl cursor-pointer ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-lg transition-shadow`}>
// //                 <div className="text-4xl mb-3">🎮</div>
// //                 <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Action Games</h4>
// //                 <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Fast-paced games to get your adrenaline pumping</p>
// //               </div>
// //               <div onClick={() => navigateToCollection('Puzzle')} role="button" tabIndex={0} className={`p-6 rounded-xl cursor-pointer ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-lg transition-shadow`}>
// //                 <div className="text-4xl mb-3">🧠</div>
// //                 <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Brain Teasers</h4>
// //                 <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Challenge your mind with puzzles and strategy games</p>
// //               </div>
// //               <div onClick={() => navigateToCollection('Simulation')} role="button" tabIndex={0} className={`p-6 rounded-xl cursor-pointer ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'} hover:shadow-lg transition-shadow`}>
// //                 <div className="text-4xl mb-3">⭐</div>
// //                 <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Trending Now</h4>
// //                 <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Popular games played by millions this week</p>
// //               </div>
// //             </div>
// //           </section>
// //         )}
// //       </main>

// //       {/* Floating sidebar for quick access - disabled for now */}
// //       {false && (
// //         <FloatingSidebar
// //           games={games}
// //           onToggleFavorite={toggleFavorite}
// //         />
// //       )}

// //       {/* Toast notifications */}
// //       <ToastContainer toasts={toasts || []} removeToast={_removeToast} />

// //       {/* Mobile quick actions (bottom) */}
// //       <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
// //         <div className={`flex items-center gap-3 bg-white/90 dark:bg-slate-800/80 backdrop-blur rounded-full p-2 shadow-lg`}>
// //           <button onClick={() => { handleNotifications(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md">
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
// //           </button>
// //           <button onClick={() => { handleFavorites(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md">
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
// //           </button>
// //           <button onClick={() => { handleRecent(); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md">
// //             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 11-9-9"/><path d="M22 12h-6"/><path d="M12 7v5l3 3"/></svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Smooth transition styles applied locally so toggling dark mode animates */}
// //       <style>{`
// //         .smooth-transition, .smooth-transition * {
// //           transition: background-color 400ms ease, color 400ms ease, box-shadow 300ms ease, border-color 300ms ease;
// //         }
// //         .smooth-transition .scrollbar-hide::-webkit-scrollbar { display: none; }
// //         /* curved section and animated entrance styles */
// //         .section-wave svg path{ transition: fill 400ms ease; }

// //         .games-list .animate-card{ opacity: 0; transform: translateY(18px) scale(0.985); transition: opacity 520ms cubic-bezier(.2,.9,.2,1), transform 520ms cubic-bezier(.2,.9,.2,1); }
// //         .games-list.in-view .animate-card{ opacity: 1; transform: none; }
// //         .games-list .animate-card{ transition-delay: calc(var(--i) * 70ms); }

// //         .featured-section{ opacity: 0; transform: translateX(24px); transition: opacity 600ms ease, transform 600ms ease; }
// //         .featured-section.in-view{ opacity: 1; transform: none; }

// //         /* subtle floating background shapes for sections */
// //         .section-blob{ position: absolute; border-radius: 9999px; filter: blur(36px); opacity: .12; }
// //       `}</style>

// //       {/* <footer className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-t mt-16`}>
// //         <div className="max-w-7xl mx-auto px-4 py-8">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
// //             <div>
// //               <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Games</h5>
// //               <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
// //                 <li className="hover:text-blue-500 cursor-pointer">Popular</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">New</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Categories</li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Community</h5>
// //               <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
// //                 <li className="hover:text-blue-500 cursor-pointer">Forum</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Leaderboard</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Events</li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Support</h5>
// //               <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
// //                 <li className="hover:text-blue-500 cursor-pointer">Help</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Contact</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Status</li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h5 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Legal</h5>
// //               <ul className={`space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
// //                 <li className="hover:text-blue-500 cursor-pointer">Privacy</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Terms</li>
// //                 <li className="hover:text-blue-500 cursor-pointer">Cookies</li>
// //               </ul>
// //             </div>
// //           </div>
// //           <div className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'} pt-8 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
// //             <p>&copy; 2025 GameHub. All rights reserved.</p>
// //           </div>
// //         </div>
// //       </footer> */}

// //       <style>{`\n        .scrollbar-hide::-webkit-scrollbar {\n          display: none;\n        }\n        .scrollbar-hide {\n          -ms-overflow-style: none;\n          scrollbar-width: none;\n        }\n      `}</style>
// //     </div>
// //   );
// // };

// // export default GameLobby;









































// // import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
// // import {
// //   Gamepad2,
// //   Menu,
// //   Globe,
// //   Moon,
// //   Sun,
// //   Search,
// //   ChevronDown,
// //   User,
// // } from 'lucide-react';
// // import GameCard from './GameCard';
// // import FloatingSidebar from './FloatingSidebar';
// // import ToastContainer from './ToastContainer';
// // import { useNavigate } from 'react-router-dom';
// // import { useApp } from '../context/AppContext';
// // import { useTranslation } from 'react-i18next';

// // const GameLobby = ({ games = [] }) => {
// //   const navigate = useNavigate();
// //   const { t, i18n } = useTranslation();
// //   const {
// //     state,
// //     toggleDark,
// //     addRecent,
// //     addNotification,
// //     toggleFav,
// //     addToast,
// //     clearNotifications,
// //     removeToast,
// //     setCurrency,
// //   } = useApp();

// //   const {
// //     isDark,
// //     favorites,
// //     notifications,
// //     recentlyPlayed,
// //     toasts,
// //     currency,
// //     userId,
// //   } = state;

// //   const [search, setSearch] = useState('');
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState('all');
// //   const [langDropdown, setLangDropdown] = useState(false);
// //   const [currencyDropdown, setCurrencyDropdown] = useState(false);
// //   const [userDropdown, setUserDropdown] = useState(false);

// //   const categories = [
// //     { id: 'all', label: t('all') },
// //     { id: 'casual', label: t('casual') },
// //     { id: 'pg_soft', label: t('pg_soft') },
// //     { id: 'pp', label: t('pp') },
// //     { id: 'hacksaw', label: t('hacksaw') },
// //     { id: 'revenge', label: t('revenge') },
// //     { id: 'bgaming', label: t('bgaming') },
// //     { id: 'allstars', label: t('allstars') },
// //     { id: 'others', label: t('others') },
// //   ];

// //   const currencies = ['USD', 'EUR', 'INR', 'GBP', 'BTC'];

// //   // ---- FLAGS / LABELS ----
// //   const languageMeta = {
// //     en: { label: 'EN', flag: '🇺🇸' },
// //     es: { label: 'ES', flag: '🇪🇸' },
// //     fr: { label: 'FR', flag: '🇫🇷' },
// //     hi: { label: 'HI', flag: '🇮🇳' },
// //     de: { label: 'DE', flag: '🇩🇪' },
// //   };

// //   const currentLangMeta =
// //     languageMeta[i18n.language] ||
// //     {
// //       label: (i18n.language || 'EN').toUpperCase(),
// //       flag: '🌐',
// //     };

// //   const currencyMeta = {
// //     USD: { label: 'USD', flag: '🇺🇸' },
// //     EUR: { label: 'EUR', flag: '🇪🇺' },
// //     INR: { label: 'INR', flag: '🇮🇳' },
// //     GBP: { label: 'GBP', flag: '🇬🇧' },
// //     BTC: { label: 'BTC', flag: '₿' },
// //   };

// //   const currentCurrencyMeta =
// //     currencyMeta[currency || 'USD'] || { label: currency || 'USD', flag: '💱' };

// //   // ---- TOAST HELPER ----
// //   const addToastMessage = useCallback(
// //     (message, type = 'info', duration = 3000) => {
// //       const id = Date.now();
// //       addToast({ id, message, type, duration });
// //     },
// //     [addToast]
// //   );

// //   const _removeToast = useCallback(
// //     (id) => {
// //       if (removeToast) removeToast(id);
// //     },
// //     [removeToast]
// //   );

// //   // ---- COPY USER ID ----
// //   const handleCopyUserId = async () => {
// //     try {
// //       if (!userId) return;
// //       await navigator.clipboard.writeText(userId);
// //       addToastMessage(`${t('copy')} ✅`, 'success');
// //     } catch (e) {
// //       addToastMessage('Copy failed', 'warning');
// //     }
// //   };

// //   // ---- GAME ACTIONS ----
// //   const handleGameClick = useCallback(
// //     (gameId) => {
// //       addRecent(gameId);
// //       const game = games.find((g) => g.id === gameId);
// //       addNotification(`Started playing ${game?.title || 'Game'}`);
// //       addToastMessage(`🎮 Game Started!`, 'success');
// //       navigate(`/game/${gameId}`);
// //     },
// //     [addRecent, addNotification, addToastMessage, games, navigate]
// //   );

// //   const toggleFavorite = useCallback(
// //     (gameId) => {
// //       toggleFav(gameId);
// //       const isNowFav = !(favorites || []).includes(gameId);
// //       addToastMessage(
// //         isNowFav ? `✨ Added to Favorites` : `❤️ Removed from Favorites`,
// //         isNowFav ? 'success' : 'warning'
// //       );
// //     },
// //     [toggleFav, favorites, addToastMessage]
// //   );

// //   // ---- INTERSECTION OBSERVER ----
// //   const gamesRef = useRef(null);
// //   const featuredRef = useRef(null);
// //   const [gamesInView, setGamesInView] = useState(false);
// //   const [featuredInView, setFeaturedInView] = useState(false);

// //   useEffect(() => {
// //     const obsOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
// //     let gObs = null;
// //     let fObs = null;

// //     if (gamesRef.current) {
// //       gObs = new IntersectionObserver((entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setGamesInView(true);
// //             gObs.disconnect();
// //           }
// //         });
// //       }, obsOptions);
// //       gObs.observe(gamesRef.current);
// //     }

// //     if (featuredRef.current) {
// //       fObs = new IntersectionObserver((entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setFeaturedInView(true);
// //             fObs.disconnect();
// //           }
// //         });
// //       }, obsOptions);
// //       fObs.observe(featuredRef.current);
// //     }

// //     return () => {
// //       if (gObs) gObs.disconnect();
// //       if (fObs) fObs.disconnect();
// //     };
// //   }, []);

// //   const navigateToCollection = useCallback(
// //     (name) => {
// //       navigate(`/collection/${encodeURIComponent(name)}`);
// //     },
// //     [navigate]
// //   );

// //   const handleNotifications = useCallback(() => {
// //     if (!notifications || notifications.length === 0) {
// //       addToastMessage('No notifications yet', 'info');
// //       return;
// //     }
// //     const notificationList = notifications
// //       .slice(0, 5)
// //       .map((n) => n.text)
// //       .join(', ');
// //     addToastMessage(`📢 ${notificationList}`, 'info', 4000);
// //     clearNotifications();
// //   }, [notifications, addToastMessage, clearNotifications]);

// //   const handleFavorites = useCallback(() => {
// //     if (!favorites || favorites.length === 0) {
// //       addToastMessage('No favorites yet! Add some games ❤️', 'info');
// //       return;
// //     }
// //     const favList = favorites
// //       .slice(0, 3)
// //       .map((fav) => {
// //         const g = games.find((gg) => gg.id === fav);
// //         return g?.title || `Game ${fav}`;
// //       })
// //       .join(', ');
// //     const more =
// //       favorites.length > 3 ? ` +${favorites.length - 3} more` : '';
// //     addToastMessage(`⭐ Favorites: ${favList}${more}`, 'success', 4000);
// //   }, [favorites, games, addToastMessage]);

// //   const handleRecent = useCallback(() => {
// //     if (!recentlyPlayed || recentlyPlayed.length === 0) {
// //       addToastMessage('No recently played games', 'info');
// //       return;
// //     }
// //     const recentList = recentlyPlayed
// //       .slice(0, 3)
// //       .map((recent) => {
// //         const g = games.find((gg) => gg.id === recent);
// //         return g?.title || `Game ${recent}`;
// //       })
// //       .join(', ');
// //     const more =
// //       recentlyPlayed.length > 3 ? ` +${recentlyPlayed.length - 3} more` : '';
// //     addToastMessage(`🎮 Recently: ${recentList}${more}`, 'info', 4000);
// //   }, [recentlyPlayed, games, addToastMessage]);

// //   // ---- FILTERED GAMES ----
// //   const filteredGames = useMemo(() => {
// //     let filtered = games;

// //     if (selectedCategory !== 'all') {
// //       filtered = filtered.filter(
// //         (g) => (g.category || '').toLowerCase() === selectedCategory
// //       );
// //     }

// //     if (search) {
// //       const s = search.toLowerCase();
// //       filtered = filtered.filter(
// //         (g) =>
// //           g.title.toLowerCase().includes(s) ||
// //           (g.category || '').toLowerCase().includes(s)
// //       );
// //     }

// //     return filtered;
// //   }, [games, search, selectedCategory]);

// //   return (
// //     <div
// //       data-theme={isDark ? 'dark' : 'light'}
// //       className="min-h-screen smooth-transition"
// //       style={{
// //         background: isDark
// //           ? '#0D1117'
// //           : 'linear-gradient(180deg,#f8fafc,#e6f0ff)',
// //       }}
// //     >
// //       {/* HEADER */}
// //       <header
// //         className={`${
// //           isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
// //         } border-b sticky top-0 z-50 shadow-md`}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
// //           {/* LEFT: LOGO */}
// //           <div className="flex items-center gap-3">
// //             <div
// //               className={`p-2 rounded-lg transform transition-transform hover:translate-y-1 active:translate-y-1`}
// //               style={{
// //                 background: isDark
// //                   ? 'linear-gradient(135deg,#A46BFF,#3BF4C5)'
// //                   : 'linear-gradient(135deg,#3BF4C5,#FF4D8D)',
// //               }}
// //             >
// //               <Gamepad2 className="w-6 h-6 text-white" />
// //             </div>
// //             <h1
// //               className={`text-2xl font-bold mr-2 ${
// //                 isDark ? 'text-white' : 'text-slate-900'
// //               }`}
// //             >
// //               GameHub
// //             </h1>
// //           </div>

// //           {/* RIGHT SECTION */}
// //           <div className="flex items-center gap-3 md:gap-4">
// //             {/* SEARCH (DESKTOP) */}
// //             <div
// //               className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
// //                 isDark ? 'bg-slate-700' : 'bg-slate-100'
// //               }`}
// //             >
// //               <Search
// //                 className={`w-4 h-4 ${
// //                   isDark ? 'text-slate-400' : 'text-slate-500'
// //                 }`}
// //               />
// //               <input
// //                 type="text"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 placeholder={t('search_games')}
// //                 className={`bg-transparent outline-none ${
// //                   isDark
// //                     ? 'text-white placeholder-slate-400'
// //                     : 'text-slate-900 placeholder-slate-500'
// //                 }`}
// //               />
// //             </div>

// //             {/* DARK MODE */}
// //             <button
// //               onClick={() => toggleDark()}
// //               className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 ${
// //                 isDark
// //                   ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
// //                   : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
// //               }`}
// //             >
// //               {isDark ? (
// //                 <Sun className="w-5 h-5" />
// //               ) : (
// //                 <Moon className="w-5 h-5" />
// //               )}
// //             </button>

// //             {/* LANGUAGE DROPDOWN */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setLangDropdown(!langDropdown)}
// //                 className={`
// //                   px-2 md:px-3 py-2 rounded-xl flex items-center gap-1.5 md:gap-2
// //                   text-sm font-medium
// //                   transition-all duration-300 transform 
// //                   hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm
// //                   ${
// //                     isDark
// //                       ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
// //                       : 'bg-white text-slate-700 hover:bg-slate-100'
// //                   }
// //                 `}
// //               >
// //                 <span className="text-lg">{currentLangMeta.flag}</span>
// //                 <span className="hidden sm:inline">
// //                   {currentLangMeta.label}
// //                 </span>
// //                 <ChevronDown
// //                   className={`w-3 h-3 transition-transform duration-300 ${
// //                     langDropdown ? 'rotate-180' : 'rotate-0'
// //                   }`}
// //                 />
// //               </button>

// //               {langDropdown && (
// //                 <div
// //                   className={`absolute right-0 top-full mt-2 rounded-lg shadow-lg z-50 ${
// //                     isDark ? 'bg-slate-700' : 'bg-white'
// //                   }`}
// //                 >
// //                   {['en', 'es', 'fr'].map((lang) => (
// //                     <button
// //                       key={lang}
// //                       onClick={() => {
// //                         i18n.changeLanguage(lang);
// //                         setLangDropdown(false);
// //                       }}
// //                       className={`
// //                         group relative flex items-center justify-between w-full 
// //                         text-left px-4 py-2 text-sm font-medium
// //                         transition-all duration-300 overflow-hidden
// //                         first:rounded-t-lg last:rounded-b-lg
// //                         ${
// //                           i18n.language === lang
// //                             ? 'bg-blue-500 text-white'
// //                             : isDark
// //                             ? 'text-slate-200'
// //                             : 'text-slate-700'
// //                         }
// //                         hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 
// //                         hover:text-white
// //                       `}
// //                     >
// //                       <span
// //                         className="
// //                           absolute left-0 top-0 h-full w-1 bg-orange-500 
// //                           scale-y-0 group-hover:scale-y-100 
// //                           transition-transform duration-300 origin-top
// //                         "
// //                       />
// //                       <div className="flex items-center gap-3 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
// //                         <span className="text-lg">
// //                           {languageMeta[lang]?.flag || '🌐'}
// //                         </span>
// //                         <span>{(languageMeta[lang]?.label || lang).toUpperCase()}</span>
// //                       </div>
// //                       {i18n.language === lang && (
// //                         <span className="text-white text-sm opacity-100 transition-opacity duration-300">
// //                           ✔
// //                         </span>
// //                       )}
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* CURRENCY DROPDOWN */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setCurrencyDropdown(!currencyDropdown)}
// //                 className={`
// //                   p-2 rounded-xl flex items-center gap-2 font-semibold
// //                   transition-all duration-300 transform 
// //                   hover:-translate-y-0.5 active:translate-y-0.5
// //                   shadow-sm
// //                   ${
// //                     isDark
// //                       ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
// //                       : 'bg-white text-slate-700 hover:bg-slate-100'
// //                   }
// //                 `}
// //               >
// //                 <span className="text-lg">{currentCurrencyMeta.flag}</span>
// //                 <span className="text-sm">{currentCurrencyMeta.label}</span>
// //                 <ChevronDown
// //                   className={`
// //                     w-4 h-4 transition-transform duration-300
// //                     ${currencyDropdown ? 'rotate-180' : 'rotate-0'}
// //                   `}
// //                 />
// //               </button>

// //               {currencyDropdown && (
// //                 <div
// //                   className={`
// //                     absolute right-0 top-full mt-2 w-40 rounded-xl overflow-hidden 
// //                     shadow-xl border z-50
// //                     ${
// //                       isDark
// //                         ? 'bg-slate-800 border-slate-700'
// //                         : 'bg-white border-slate-200'
// //                     }
// //                   `}
// //                 >
// //                   {currencies.map((c) => (
// //                     <button
// //                       key={c}
// //                       onClick={() => {
// //                         setCurrency(c);
// //                         setCurrencyDropdown(false);
// //                         addToastMessage(`${t('currency')}: ${c}`, 'success');
// //                       }}
// //                       className={`
// //                         block w-full text-left px-4 py-2 text-sm font-medium
// //                         flex items-center gap-2
// //                         transition-all duration-300
// //                         hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white
// //                         ${
// //                           isDark
// //                             ? 'text-slate-200 hover:text-white'
// //                             : 'text-slate-700'
// //                         }
// //                       `}
// //                     >
// //                       <span>{(currencyMeta[c] || {}).flag || '💱'}</span>
// //                       <span>{(currencyMeta[c] || {}).label || c}</span>
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>

// //             {/* USER PROFILE ICON + USERID DROPDOWN */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setUserDropdown(!userDropdown)}
// //                 className={`
// //                   w-9 h-9 md:w-10 md:h-10 rounded-full 
// //                   flex items-center justify-center
// //                   transition-all duration-300 transform 
// //                   hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm
// //                   ${
// //                     isDark
// //                       ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
// //                       : 'bg-white text-slate-700 hover:bg-slate-100'
// //                   }
// //                 `}
// //                 aria-label="User menu"
// //               >
// //                 <User className="w-4 h-4 md:w-5 md:h-5" />
// //               </button>

// //               {userDropdown && (
// //                 <div
// //                   className={`
// //                     absolute right-0 top-full mt-2 w-72 rounded-xl overflow-hidden 
// //                     shadow-xl border z-50
// //                     ${
// //                       isDark
// //                         ? 'bg-slate-900 border-slate-700'
// //                         : 'bg-white border-slate-200'
// //                     }
// //                   `}
// //                 >
// //                   <div className="px-4 py-3">
// //                     <p
// //                       className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
// //                         isDark ? 'text-slate-400' : 'text-slate-500'
// //                       }`}
// //                     >
// //                       {t('userid') || 'User ID'}
// //                     </p>
// //                     <div
// //                       className={`text-xs sm:text-sm font-mono break-all mb-3 ${
// //                         isDark ? 'text-slate-100' : 'text-slate-800'
// //                       }`}
// //                     >
// //                       {userId || '—'}
// //                     </div>
// //                     <button
// //                       onClick={handleCopyUserId}
// //                       disabled={!userId}
// //                       className={`
// //                         w-full px-3 py-2 rounded-lg text-sm font-medium
// //                         flex items-center justify-center gap-2
// //                         ${
// //                           isDark
// //                             ? 'bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500'
// //                             : 'bg-slate-100 text-slate-800 hover:bg-slate-200 disabled:bg-slate-100 disabled:text-slate-400'
// //                         }
// //                       `}
// //                     >
// //                       {t('copy') || 'Copy'} ID
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* MOBILE MENU BUTTON */}
// //             <button
// //               onClick={() => setMenuOpen(!menuOpen)}
// //               className={`p-2 rounded-lg transition-all transform hover:translate-y-1 active:translate-y-1 md:hidden ${
// //                 isDark
// //                   ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
// //                   : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
// //               }`}
// //             >
// //               <Menu className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </header>

// //       {/* MOBILE SEARCH */}
// //       {menuOpen && (
// //         <div
// //           className={`md:hidden ${
// //             isDark ? 'bg-slate-800' : 'bg-white'
// //           } border-b`}
// //         >
// //           <div className="px-4 py-4 flex items-center justify-between">
// //             <input
// //               type="text"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               placeholder={t('search_games')}
// //               className="w-full bg-transparent outline-none"
// //             />
// //             <button
// //               onClick={() => setMenuOpen(false)}
// //               className="ml-3 px-3 py-1 bg-blue-500 text-white rounded"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* MAIN */}
// //       <main className="max-w-7xl mx-auto px-4 py-12">
// //         <div className="mb-8">
// //           <h2
// //             className={`text-4xl font-bold mb-2 ${
// //               isDark ? 'text-white' : 'text-slate-900'
// //             }`}
// //           >
// //             {t('discover_play')}
// //           </h2>
// //           <p
// //             className={`text-lg ${
// //               isDark ? 'text-slate-400' : 'text-slate-600'
// //             }`}
// //           >
// //             Click the play button to start your adventure!
// //           </p>
// //         </div>

// //         {/* CATEGORY TABS */}
// //         <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
// //           <div className="flex gap-2 min-w-max">
// //             {categories.map((cat) => (
// //               <button
// //                 key={cat.id}
// //                 onClick={() => setSelectedCategory(cat.id)}
// //                 className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
// //                   selectedCategory === cat.id
// //                     ? `bg-linear-to-r ${
// //                         isDark
// //                           ? 'from-purple-600 to-cyan-600'
// //                           : 'from-purple-500 to-cyan-500'
// //                       } text-white font-semibold shadow-lg`
// //                     : `${
// //                         isDark
// //                           ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
// //                           : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
// //                       }`
// //                 }`}
// //               >
// //                 {cat.label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* GAME GRID */}
// //         <div
// //           ref={gamesRef}
// //           className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 games-list ${
// //             gamesInView ? 'in-view' : ''
// //           }`}
// //         >
// //           {filteredGames.length > 0 ? (
// //             filteredGames.map((game, idx) => (
// //               <div
// //                 key={game.id}
// //                 className="animate-card"
// //                 style={{ ['--i']: idx }}
// //               >
// //                 <GameCard game={game} />
// //               </div>
// //             ))
// //           ) : (
// //             <div
// //               className={`col-span-full text-center py-12 ${
// //                 isDark ? 'text-slate-400' : 'text-slate-600'
// //               }`}
// //             >
// //               <p className="text-lg">{t('no_games')}</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Curved divider (unchanged) */}
// //         <div className="section-wave mt-12 -mb-6" aria-hidden="true">
// //           <svg
// //             viewBox="0 0 1440 80"
// //             preserveAspectRatio="none"
// //             className="w-full h-20"
// //           >
// //             <path
// //               d="M0,32 C360,96 1080,-32 1440,32 L1440 120 L0 120 Z"
// //               fill={isDark ? '#0f172a' : '#ffffff'}
// //               opacity="0.9"
// //             ></path>
// //           </svg>
// //         </div>

// //         {/* Featured section still disabled */}
// //         {false && (
// //           <section
// //             ref={featuredRef}
// //             className={`mt-16 featured-section ${
// //               featuredInView ? 'in-view' : ''
// //             }`}
// //           >
// //             {/* ... your existing featured cards ... */}
// //           </section>
// //         )}
// //       </main>

// //       {/* Optional FloatingSidebar disabled */}
// //       {false && <FloatingSidebar games={games} onToggleFavorite={toggleFavorite} />}

// //       {/* TOASTS */}
// //       <ToastContainer toasts={toasts || []} removeToast={_removeToast} />

// //       {/* MOBILE QUICK ACTIONS */}
// //       <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
// //         <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-800/80 backdrop-blur rounded-full p-2 shadow-lg">
// //           <button
// //             onClick={() => {
// //               handleNotifications();
// //             }}
// //             className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md"
// //           >
// //             <svg
// //               className="w-5 h-5"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="1.5"
// //             >
// //               <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
// //             </svg>
// //           </button>
// //           <button
// //             onClick={() => {
// //               handleFavorites();
// //             }}
// //             className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md"
// //           >
// //             <svg
// //               className="w-5 h-5"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="1.5"
// //             >
// //               <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
// //             </svg>
// //           </button>
// //           <button
// //             onClick={() => {
// //               handleRecent();
// //             }}
// //             className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-700 shadow-md"
// //           >
// //             <svg
// //               className="w-5 h-5"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="currentColor"
// //               strokeWidth="1.5"
// //             >
// //               <path d="M21 12a9 9 0 11-9-9" />
// //               <path d="M22 12h-6" />
// //               <path d="M12 7v5l3 3" />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>

// //       {/* LOCAL STYLES */}
// //       <style>{`
// //         .smooth-transition, .smooth-transition * {
// //           transition: background-color 400ms ease, color 400ms ease, box-shadow 300ms ease, border-color 300ms ease;
// //         }
// //         .smooth-transition .scrollbar-hide::-webkit-scrollbar { display: none; }
// //         .scrollbar-hide::-webkit-scrollbar { display: none; }
// //         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

// //         .section-wave svg path{ transition: fill 400ms ease; }

// //         .games-list .animate-card{
// //           opacity: 0;
// //           transform: translateY(18px) scale(0.985);
// //           transition: opacity 520ms cubic-bezier(.2,.9,.2,1), transform 520ms cubic-bezier(.2,.9,.2,1);
// //         }
// //         .games-list.in-view .animate-card{ opacity: 1; transform: none; }
// //         .games-list .animate-card{ transition-delay: calc(var(--i) * 70ms); }

// //         .featured-section{ opacity: 0; transform: translateX(24px); transition: opacity 600ms ease, transform 600ms ease; }
// //         .featured-section.in-view{ opacity: 1; transform: none; }

// //         .section-blob{ position: absolute; border-radius: 9999px; filter: blur(36px); opacity: .12; }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default GameLobby;






// // import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
// // import {
// //   Gamepad2,
// //   Menu,
// //   Globe,
// //   Moon,
// //   Sun,
// //   Search,
// //   ChevronDown,
// //   User,
// // } from 'lucide-react';
// // import GameCard from './GameCard';
// // import FloatingSidebar from './FloatingSidebar';
// // import ToastContainer from './ToastContainer';
// // import { useNavigate } from 'react-router-dom';
// // import { useApp } from '../context/AppContext';
// // import { useTranslation } from 'react-i18next';

// // const GameLobby = ({ games = [] }) => {
// //   const navigate = useNavigate();
// //   const { t, i18n } = useTranslation();
// //   const {
// //     state,
// //     toggleDark,
// //     addRecent,
// //     addNotification,
// //     toggleFav,
// //     addToast,
// //     clearNotifications,
// //     removeToast,
// //     setCurrency,
// //   } = useApp();

// //   const {
// //     isDark,
// //     favorites,
// //     notifications,
// //     recentlyPlayed,
// //     toasts,
// //     currency,
// //     userId,
// //   } = state;

// //   const [search, setSearch] = useState('');
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [selectedCategory, setSelectedCategory] = useState('all');
// //   const [langDropdown, setLangDropdown] = useState(false);
// //   const [currencyDropdown, setCurrencyDropdown] = useState(false);
// //   const [userDropdown, setUserDropdown] = useState(false);

// //   // ---------------------- CATEGORIES -----------------------
// //   const categories = [
// //     { id: 'all', label: t('all') },
// //     { id: 'casual', label: t('casual') },
// //     { id: 'pg_soft', label: t('pg_soft') },
// //     { id: 'pp', label: t('pp') },
// //     { id: 'hacksaw', label: t('hacksaw') },
// //     { id: 'revenge', label: t('revenge') },
// //     { id: 'bgaming', label: t('bgaming') },
// //     { id: 'allstars', label: t('allstars') },
// //     { id: 'others', label: t('others') },
// //   ];

// //   // ---------------------- LANGS -----------------------
// //   const languageMeta = {
// //     en: { label: 'EN', flag: '🇺🇸' },
// //     es: { label: 'ES', flag: '🇪🇸' },
// //     fr: { label: 'FR', flag: '🇫🇷' },
// //     hi: { label: 'HI', flag: '🇮🇳' },
// //     de: { label: 'DE', flag: '🇩🇪' },
// //   };

// //   const currentLangMeta =
// //     languageMeta[i18n.language] ||
// //     { label: (i18n.language || 'EN').toUpperCase(), flag: '🌐' };

// //   // ---------------------- CURRENCIES -----------------------
// //   const currencies = ['USD', 'EUR', 'INR', 'GBP', 'BTC'];
// //   const currencyMeta = {
// //     USD: { label: 'USD', flag: '🇺🇸' },
// //     EUR: { label: 'EUR', flag: '🇪🇺' },
// //     INR: { label: 'INR', flag: '🇮🇳' },
// //     GBP: { label: 'GBP', flag: '🇬🇧' },
// //     BTC: { label: 'BTC', flag: '₿' },
// //   };

// //   const currentCurrencyMeta =
// //     currencyMeta[currency || 'USD'] || { label: currency || 'USD', flag: '💱' };

// //   // ---------------------- TOAST HANDLER -----------------------
// //   const addToastMessage = useCallback(
// //     (message, type = 'info', duration = 3000) => {
// //       const id = Date.now();
// //       addToast({ id, message, type, duration });
// //     },
// //     [addToast]
// //   );

// //   const _removeToast = useCallback(
// //     (id) => removeToast && removeToast(id),
// //     [removeToast]
// //   );

// //   // ---------------------- COPY USER ID -----------------------
// //   const handleCopyUserId = async () => {
// //     try {
// //       if (!userId) return;
// //       await navigator.clipboard.writeText(userId);
// //       addToastMessage(`${t('copy')} ✅`, 'success');
// //     } catch {
// //       addToastMessage('Copy failed', 'warning');
// //     }
// //   };

// //   // ---------------------- CLICK GAME -----------------------
// //   const handleGameClick = useCallback(
// //     (gameId) => {
// //       addRecent(gameId);
// //       const game = games.find((g) => g.id === gameId);
// //       addNotification(`Started playing ${game?.title || 'Game'}`);
// //       addToastMessage(`🎮 Game Started!`, 'success');
// //       navigate(`/game/${gameId}`);
// //     },
// //     [addRecent, addNotification, addToastMessage, games, navigate]
// //   );

// //   // ---------------------- FAVORITE -----------------------
// //   const toggleFavorite = useCallback(
// //     (gameId) => {
// //       toggleFav(gameId);
// //       const isNowFav = !(favorites || []).includes(gameId);
// //       addToastMessage(
// //         isNowFav ? '✨ Added to Favorites' : '❤️ Removed from Favorites',
// //         isNowFav ? 'success' : 'warning'
// //       );
// //     },
// //     [toggleFav, favorites, addToastMessage]
// //   );

// //   // ---------------------- INTERSECTION OBSERVER -----------------------
// //   const gamesRef = useRef(null);
// //   const [gamesInView, setGamesInView] = useState(false);

// //   useEffect(() => {
// //     const obs = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             setGamesInView(true);
// //             obs.disconnect();
// //           }
// //         });
// //       },
// //       { threshold: 0.15 }
// //     );

// //     gamesRef.current && obs.observe(gamesRef.current);
// //     return () => obs.disconnect();
// //   }, []);

// //   // ---------------------- FILTERED GAMES -----------------------
// //   const filteredGames = useMemo(() => {
// //     let list = games;

// //     if (selectedCategory !== 'all') {
// //       list = list.filter(
// //         (g) => (g.category || '').toLowerCase() === selectedCategory
// //       );
// //     }

// //     if (search) {
// //       const s = search.toLowerCase();
// //       list = list.filter(
// //         (g) =>
// //           g.title.toLowerCase().includes(s) ||
// //           (g.category || '').toLowerCase().includes(s)
// //       );
// //     }

// //     return list;
// //   }, [games, selectedCategory, search]);

// //   // =====================================================================
// //   //                              RETURN UI
// //   // =====================================================================
// //   return (
// //     <div
// //       data-theme={isDark ? 'dark' : 'light'}
// //       className="min-h-screen"
// //       style={{
// //         background: isDark
// //           ? '#0D1117'
// //           : 'linear-gradient(180deg,#f8fafc,#e6f0ff)',
// //       }}
// //     >
// //       {/* ====================== NAVBAR ======================= */}
// //       <header
// //         className={`${
// //           isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
// //         } border-b sticky top-0 z-50 shadow-md`}
// //       >
// //         <div className="flex items-center justify-between px-4 py-4 w-full">

// //           LEFT LOGO
// //           <div className="flex items-center gap-3">
// //             <div
// //               className="p-2 rounded-lg"
// //               style={{
// //                 background: isDark
// //                   ? 'linear-gradient(135deg,#A46BFF,#3BF4C5)'
// //                   : 'linear-gradient(135deg,#3BF4C5,#FF4D8D)',
// //               }}
// //             >
// //               <Gamepad2 className="w-6 h-6 text-white" />
// //             </div>
// //             <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
// //               GameHub
// //             </h1>
// //           </div>

// //           {/* RIGHT NAV BUTTONS */}
// //           <div className="flex items-center gap-3 md:gap-4">
// //             {/* Search Desktop */}
// //             <div
// //               className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
// //                 isDark ? 'bg-slate-700' : 'bg-slate-100'
// //               }`}
// //             >
// //               <Search className={isDark ? 'text-slate-400' : 'text-slate-600'} />
// //               <input
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 placeholder={t('search_games')}
// //                 className={`bg-transparent outline-none ${
// //                   isDark ? 'text-white' : 'text-black'
// //                 }`}
// //               />
// //             </div>

// //             {/* Mode */}
// //             <button
// //               onClick={toggleDark}
// //               className={`p-2 rounded-lg ${
// //                 isDark ? 'bg-slate-700 text-yellow-300' : 'bg-slate-200 text-black'
// //               }`}
// //             >
// //               {isDark ? <Sun /> : <Moon />}
// //             </button>

// //             {/* Language */}
// // <div className="relative">
// //   <button
// //     onClick={() => setLangDropdown(!langDropdown)}
// //     className="px-3 py-2 rounded-lg flex items-center gap-2 font-medium
// //                bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
// //                text-white shadow-md hover:opacity-90 transition"
// //   >
// //     <span>{currentLangMeta.flag}</span>
// //     <ChevronDown className="w-3 h-3" />
// //   </button>

// //   {langDropdown && (
// //     <div
// //       className="absolute right-0 mt-2 min-w-[130px]
// //                  bg-gradient-to-b from-white to-gray-200
// //                  dark:from-slate-800 dark:to-slate-900
// //                  rounded-lg shadow-xl border border-gray-300 dark:border-slate-700"
// //     >
// //       {['en', 'es', 'fr'].map((lang) => (
// //         <button
// //           key={lang}
// //           onClick={() => {
// //             i18n.changeLanguage(lang);
// //             setLangDropdown(false);
// //           }}
// //           className="block px-4 py-2 w-full text-left 
// //                      hover:bg-gradient-to-r hover:from-purple-600 
// //                      hover:to-blue-600 hover:text-white
// //                      text-gray-900 dark:text-gray-100
// //                      rounded-md transition"
// //         >
// //           {languageMeta[lang].flag} {languageMeta[lang].label}
// //         </button>
// //       ))}
// //     </div>
// //   )}
// // </div>


// //             {/* Currency */}
// // <div className="relative">
// //   <button
// //     onClick={() => setCurrencyDropdown(!currencyDropdown)}
// //     className="px-3 py-2 rounded-lg flex items-center gap-2 font-medium
// //                bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500
// //                text-white shadow-md hover:opacity-90 transition"
// //   >
// //     <span>{currentCurrencyMeta.flag}</span>
// //     <ChevronDown className="w-3 h-3" />
// //   </button>

// //   {currencyDropdown && (
// //     <div
// //       className="absolute right-0 mt-2 min-w-[130px]
// //                  bg-gradient-to-b from-white to-gray-200
// //                  dark:from-slate-800 dark:to-slate-900
// //                  rounded-lg shadow-xl border border-gray-300 dark:border-slate-700"
// //     >
// //       {currencies.map((c) => (
// //         <button
// //           key={c}
// //           onClick={() => {
// //             setCurrency(c);
// //             setCurrencyDropdown(false);
// //             addToastMessage(`Currency set to ${c}`, 'success');
// //           }}
// //           className="block px-4 py-2 w-full text-left 
// //                      hover:bg-gradient-to-r hover:from-purple-600 
// //                      hover:to-blue-600 hover:text-white
// //                      text-gray-900 dark:text-gray-100
// //                      rounded-md transition"
// //         >
// //           {currencyMeta[c].flag} {currencyMeta[c].label}
// //         </button>
// //       ))}
// //     </div>
// //   )}
// // </div>

// //             {/* User */}
// //            <div className="relative">
// //   <button
// //     onClick={() => setUserDropdown(!userDropdown)}
// //     className="w-10 h-10 rounded-full flex items-center justify-center
// //                bg-linear-to-r from-purple-500 via-blak-500 to-blue-500
// //                text-white shadow-md hover:opacity-90 transition"
// //   >
// //     <User className="w-5 h-5" />
// //   </button>

// //   {userDropdown && (
// //     <div
// //       className="absolute right-0 mt-2 w-64 p-4 rounded-lg shadow-xl
// //                  bg-linear-to-b from-white to-gray-200
// //                  dark:from-slate-800 dark:to-slate-900
// //                  border border-gray-300 dark:border-slate-700"
// //     >
// //       <p className="text-xs text-gray-600 dark:text-gray-300 uppercase">User ID</p>

// //       <p className="text-sm break-all mt-1 mb-3 
// //                     text-gray-900 dark:text-gray-100">
// //         {userId || '-'}
// //       </p>

// //       <button
// //         onClick={handleCopyUserId}
// //         className="w-full py-2 rounded-lg font-medium
// //                    bg-linear-to-r from-purple-600 to-blue-600
// //                    text-white shadow hover:opacity-90 transition"
// //       >
// //         Copy ID
// //       </button>
// //     </div>
// //   )}
// // </div>


// //             {/* Mobile menu */}
// //             <button
// //               onClick={() => setMenuOpen(!menuOpen)}
// //               className={`md:hidden p-2 rounded-lg ${
// //                 isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'
// //               }`}
// //             >
// //               <Menu />
// //             </button>
// //           </div>

// //         </div>
// //       </header>

// //       {/* ===================== MAIN CONTENT (FIXED FULL WIDTH) ===================== */}
// //       <main className="w-full px-4 sm:px-6 lg:px-10 py-10">

// //         {/* Heading */}
// //         <div>
// //           <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
// //             {t('discover_play')}
// //           </h2>
// //           <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
// //             Click the play button to start your adventure!
// //           </p>
// //         </div>

// //         {/* Category */}
// //         <div className="flex gap-3 overflow-x-auto mt-6 pb-2 scrollbar-hide">
// //           {categories.map((cat) => (
// //             <button
// //               key={cat.id}
// //               onClick={() => setSelectedCategory(cat.id)}
// //               className={`px-4 py-2 rounded-full whitespace-nowrap ${
// //                 selectedCategory === cat.id
// //                   ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold'
// //                   : isDark
// //                   ? 'bg-slate-700 text-white'
// //                   : 'bg-slate-200 text-black'
// //               }`}
// //             >
// //               {cat.label}
// //             </button>
// //           ))}
// //         </div>

// //         {/* GAME GRID — FULL WIDTH FIXED HERE */}
// //         <div
// //           ref={gamesRef}
// //           className={`w-full grid 
// //             grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
// //             gap-6 mt-10 games-list ${
// //               gamesInView ? 'in-view' : ''
// //             }`}
// //         >
// //           {filteredGames.length ? (
// //             filteredGames.map((game, idx) => (
// //               <div key={game.id} className="animate-card" style={{ ['--i']: idx }}>
// //                 <GameCard game={game} />
// //               </div>
// //             ))
// //           ) : (
// //             <p
// //               className={`col-span-full text-center mt-10 ${
// //                 isDark ? 'text-slate-400' : 'text-slate-600'
// //               }`}
// //             >
// //               {t('no_games')}
// //             </p>
// //           )}
// //         </div>
// //       </main>

// //       {/* TOASTS */}
// //       <ToastContainer toasts={toasts} removeToast={_removeToast} />

// //       {/* ANIMATIONS */}
// //       <style>{`
// //         .games-list .animate-card {
// //           opacity: 0;
// //           transform: translateY(15px);
// //           transition: all 0.4s ease;
// //         }
// //         .games-list.in-view .animate-card {
// //           opacity: 1;
// //           transform: translateY(0);
// //         }
// //         .games-list .animate-card {
// //           transition-delay: calc(var(--i) * 60ms);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default GameLobby;





// import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
// import {
//   Menu,
//   Globe,
//   Moon,
//   Sun,
//   Search,
//   ChevronDown,
//   User,
// } from 'lucide-react';
// import GameCard from './GameCard';
// import FloatingSidebar from './FloatingSidebar';
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
//     clearNotifications,
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
//   const [menuOpen, setMenuOpen] = useState(false);
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

//   // ---------------------- INTERSECTION OBSERVER -----------------------
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

//     gamesRef.current && obs.observe(gamesRef.current);
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

//           {/* ============== LEFT LOGO (UPDATED WITH PNG) ============== */}
//           <div className="flex items-center gap-3">
//             <div
//               // className="p-2 rounded-lg flex items-center justify-center"
//               // style={{
//               //   background: isDark
//               //     ? 'linear-gradient(135deg,#A46BFF,#3BF4C5)'
//               //     : 'linear-gradient(135deg,#3BF4C5,#FF4D8D)',
//               // }}
//             >
//               <img
//                 src="/images/100.png"   // ⭐ Place logo file in public/logo.png
//                 alt="logo"
//                 className="w-30 h-30 object-contain"
//               />
//             </div>
//             <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
//               Zenvy Gamming
//             </h1>
//           </div>

//           {/* ================= RIGHT NAV BUTTONS ================= */}
//           <div className="flex items-center gap-3 md:gap-4">
            
//             {/* Search Desktop */}
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

//             {/* Mode */}
//             <button
//               onClick={toggleDark}
//               className={`p-2 rounded-lg ${
//                 isDark ? 'bg-slate-700 text-yellow-300' : 'bg-slate-200 text-black'
//               }`}
//             >
//               {isDark ? <Sun /> : <Moon />}
//             </button>

//             {/* Language */}
//             <div className="relative">
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

//             {/* Currency */}
//             <div className="relative">
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

//             {/* User */}
//             <div className="relative">
//               <button
//                 onClick={() => setUserDropdown(!userDropdown)}
//                 className="w-10 h-10 rounded-full flex items-center justify-center
//                            bg-linear-to-r from-purple-500 via-blak-500 to-blue-500
//                            text-white shadow-md hover:opacity-90 transition"
//               >
//                 <User className="w-5 h-5" />
//               </button>

//               {userDropdown && (
//                 <div
//                   className="absolute right-0 mt-2 w-64 p-4 rounded-lg shadow-xl
//                              bg-linear-to-b from-white to-gray-200
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
//                                bg-linear-to-r from-purple-600 to-blue-600
//                                text-white shadow hover:opacity-90 transition"
//                   >
//                     Copy ID
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className={`md:hidden p-2 rounded-lg ${
//                 isDark ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black'
//               }`}
//             >
//               <Menu />
//             </button>
//           </div>

//         </div>
//       </header>

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

//         {/* GAME GRID */}
//         <div
//           ref={gamesRef}
//           className={`w-full grid 
//             grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
//             gap-6 mt-10 games-list ${
//               gamesInView ? 'in-view' : ''
//             }`}
//         >
//           {filteredGames.length ? (
//             filteredGames.map((game, idx) => (
//               <div key={game.id} className="animate-card" style={{ ['--i']: idx }}>
//                 <GameCard game={game} />
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

//       {/* ANIMATIONS */}
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
//       `}</style>
//     </div>
//   );
// };

// export default GameLobby;

/* 100% FULLY RESPONSIVE GAME LOBBY */
import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  Menu,
  Globe,
  Moon,
  Sun,
  Search,
  ChevronDown,
  User,
} from "lucide-react";
import GameCard from "./GameCard";
import ToastContainer from "./ToastContainer";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";

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
    clearNotifications,
    removeToast,
    setCurrency,
  } = useApp();

  const {
    isDark,
    favorites,
    notifications,
    recentlyPlayed,
    toasts,
    currency,
    userId,
  } = state;

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [langDropdown, setLangDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const categories = [
    { id: "all", label: t("all") },
    { id: "casual", label: t("casual") },
    { id: "pg_soft", label: t("pg_soft") },
    { id: "pp", label: t("pp") },
    { id: "hacksaw", label: t("hacksaw") },
    { id: "revenge", label: t("revenge") },
    { id: "bgaming", label: t("bgaming") },
    { id: "allstars", label: t("allstars") },
    { id: "others", label: t("others") },
  ];

  const languageMeta = {
    en: { label: "EN", flag: "🇺🇸" },
    es: { label: "ES", flag: "🇪🇸" },
    fr: { label: "FR", flag: "🇫🇷" },
    hi: { label: "HI", flag: "🇮🇳" },
    de: { label: "DE", flag: "🇩🇪" },
  };

  const currentLangMeta =
    languageMeta[i18n.language] ||
    { label: (i18n.language || "EN").toUpperCase(), flag: "🌐" };

  const currencies = ["USD", "EUR", "INR", "GBP", "BTC"];
  const currencyMeta = {
    USD: { label: "USD", flag: "🇺🇸" },
    EUR: { label: "EUR", flag: "🇪🇺" },
    INR: { label: "INR", flag: "🇮🇳" },
    GBP: { label: "GBP", flag: "🇬🇧" },
    BTC: { label: "BTC", flag: "₿" },
  };

  const currentCurrencyMeta =
    currencyMeta[currency || "USD"] || { label: currency || "USD", flag: "💱" };

  const addToastMessage = useCallback(
    (message, type = "info", duration = 3000) => {
      const id = Date.now();
      addToast({ id, message, type, duration });
    },
    [addToast]
  );

  const _removeToast = useCallback(
    (id) => removeToast && removeToast(id),
    [removeToast]
  );

  const handleCopyUserId = async () => {
    try {
      if (!userId) return;
      await navigator.clipboard.writeText(userId);
      addToastMessage(`${t("copy")} ✅`, "success");
    } catch {
      addToastMessage("Copy failed", "warning");
    }
  };

  const handleGameClick = useCallback(
    (gameId) => {
      addRecent(gameId);
      const game = games.find((g) => g.id === gameId);
      addNotification(`Started playing ${game?.title || "Game"}`);
      addToastMessage(`🎮 Game Started!`, "success");
      navigate(`/game/${gameId}`);
    },
    [addRecent, addNotification, addToastMessage, games, navigate]
  );

  const toggleFavorite = useCallback(
    (gameId) => {
      toggleFav(gameId);
      const isNowFav = !(favorites || []).includes(gameId);
      addToastMessage(
        isNowFav ? "✨ Added to Favorites" : "❤️ Removed from Favorites",
        isNowFav ? "success" : "warning"
      );
    },
    [toggleFav, favorites, addToastMessage]
  );

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

    gamesRef.current && obs.observe(gamesRef.current);
    return () => obs.disconnect();
  }, []);

  const filteredGames = useMemo(() => {
    let list = games;

    if (selectedCategory !== "all") {
      list = list.filter(
        (g) => (g.category || "").toLowerCase() === selectedCategory
      );
    }

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(s) ||
          (g.category || "").toLowerCase().includes(s)
      );
    }

    return list;
  }, [games, selectedCategory, search]);

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      className="min-h-screen"
      style={{
        background: isDark
          ? "#0D1117"
          : "linear-gradient(180deg,#f8fafc,#e6f0ff)",
      }}
    >
      {/* NAVBAR */}
      <header
        className={`${
          isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
        } border-b sticky top-0 z-50 shadow-md`}
      >
        <div className="flex items-center justify-between px-4 py-3 w-full">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/images/100.png"
              alt="logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <h1
              className={`text-xl sm:text-2xl font-bold ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Zenvy Gaming
            </h1>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Search Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            >
              <Search />
            </button>

            {/* Search Desktop */}
            <div
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg ${
                isDark ? "bg-slate-700" : "bg-slate-100"
              }`}
            >
              <Search className={isDark ? "text-slate-400" : "text-slate-600"} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("search_games")}
                className={`bg-transparent outline-none ${
                  isDark ? "text-white" : "text-black"
                }`}
              />
            </div>

            {/* Dark Mode */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            >
              {isDark ? <Sun className="text-yellow-300" /> : <Moon />}
            </button>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="px-3 py-2 rounded-lg flex items-center gap-2 font-medium
                bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                text-white shadow-md hover:opacity-90 transition"
              >
                <span>{currentLangMeta.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {langDropdown && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 
                  rounded-lg shadow-xl border border-gray-300 dark:border-slate-700"
                >
                  {["en", "es", "fr"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        i18n.changeLanguage(lang);
                        setLangDropdown(false);
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-purple-600 
                      hover:text-white transition rounded-md"
                    >
                      {languageMeta[lang].flag} {languageMeta[lang].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdown(!currencyDropdown)}
                className="px-3 py-2 rounded-lg flex items-center gap-2 font-medium
                bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                text-white shadow-md hover:opacity-90 transition"
              >
                <span>{currentCurrencyMeta.flag}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdown && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 
                  rounded-lg shadow-xl border border-gray-300 dark:border-slate-700"
                >
                  {currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        addToastMessage(`Currency set to ${c}`, "success");
                        setCurrencyDropdown(false);
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-purple-600 
                      hover:text-white transition rounded-md"
                    >
                      {currencyMeta[c].flag} {currencyMeta[c].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="w-10 h-10 rounded-full flex items-center justify-center
                bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md hover:opacity-90"
              >
                <User className="w-5 h-5" />
              </button>

              {userDropdown && (
                <div
                  className="absolute right-0 mt-2 w-64 p-4 rounded-lg shadow-xl
                  bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-300 uppercase">
                    User ID
                  </p>

                  <p className="text-sm break-all mt-1 mb-3">
                    {userId || "-"}
                  </p>

                  <button
                    onClick={handleCopyUserId}
                    className="w-full py-2 rounded-lg font-medium
                    bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
                  >
                    Copy ID
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-200 dark:bg-slate-700"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SEARCH DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden px-4 py-3 bg-slate-100 dark:bg-slate-800">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark ? "bg-slate-700" : "bg-white"
            }`}
          >
            <Search className={isDark ? "text-slate-300" : "text-slate-600"} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("search_games")}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className="w-full px-4 sm:px-6 lg:px-10 py-10">

        {/* Heading */}
        <h2
          className={`text-3xl sm:text-4xl font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {t("discover_play")}
        </h2>
        <p className={isDark ? "text-slate-400" : "text-slate-600"}>
          Click the play button to start your adventure!
        </p>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto mt-6 pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold"
                  : isDark
                  ? "bg-slate-700 text-white"
                  : "bg-slate-200 text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GAME GRID */}
        <div
          ref={gamesRef}
          className={`w-full grid
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-5 sm:gap-6 mt-10 games-list ${
              gamesInView ? "in-view" : ""
            }`}
        >
          {filteredGames.length ? (
            filteredGames.map((game, idx) => (
              <div key={game.id} className="animate-card" style={{ ["--i"]: idx }}>
                <GameCard game={game} />
              </div>
            ))
          ) : (
            <p
              className={`col-span-full text-center mt-10 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {t("no_games")}
            </p>
          )}
        </div>
      </main>

      {/* TOASTS */}
      <ToastContainer toasts={toasts} removeToast={_removeToast} />

      {/* ANIMATIONS */}
      <style>{`
        .games-list .animate-card {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }
        .games-list.in-view .animate-card {
          opacity: 1;
          transform: translateY(0);
        }
        .games-list .animate-card {
          transition-delay: calc(var(--i) * 60ms);
        }
      `}</style>
    </div>
  );
};

export default GameLobby;
