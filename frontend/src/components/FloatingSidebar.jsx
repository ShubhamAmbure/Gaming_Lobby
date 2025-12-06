import React from 'react';
import { Bell, Star, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FloatingSidebar = ({ games = [], onToggleFavorite }) => {
  const { state, clearNotifications, addToast } = useApp();
  const { notifications = [], favorites = [], recentlyPlayed = [], isDark } = state;

  const notifCount = notifications.length;
  const favCount = favorites.length;
  const recentCount = recentlyPlayed.length;

  const getGameTitle = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    return game?.title || `Game ${gameId}`;
  };

  const handleNotifications = () => {
    if (!notifications || notifications.length === 0) {
      addToast({ id: Date.now(), message: 'No notifications yet', type: 'info' });
      return;
    }
    const notificationList = notifications.slice(0, 5).map((n) => n.text).join(', ');
    addToast({ id: Date.now(), message: `📢 ${notificationList}`, type: 'info', duration: 4000 });
    clearNotifications();
  };

  const handleFavorites = () => {
    if (!favorites || favorites.length === 0) {
      addToast({ id: Date.now(), message: 'No favorites yet! Add some games ❤️', type: 'info' });
      return;
    }
    const favList = favorites.slice(0, 3).map((fav) => getGameTitle(fav)).join(', ');
    const more = favorites.length > 3 ? ` +${favorites.length - 3} more` : '';
    addToast({ id: Date.now(), message: `⭐ Favorites: ${favList}${more}`, type: 'success', duration: 4000 });
  };

  const handleRecent = () => {
    if (!recentlyPlayed || recentlyPlayed.length === 0) {
      addToast({ id: Date.now(), message: 'No recently played games', type: 'info' });
      return;
    }
    const recentList = recentlyPlayed.slice(0, 3).map((recent) => getGameTitle(recent)).join(', ');
    const more = recentlyPlayed.length > 3 ? ` +${recentlyPlayed.length - 3} more` : '';
    addToast({ id: Date.now(), message: `🎮 Recently: ${recentList}${more}`, type: 'info', duration: 4000 });
  };

  return (
    <div style={{ zIndex: 60 }} className="fixed right-6 top-1/3 hidden md:flex flex-col gap-3">
      <button title={`Notifications (${notifCount})`} onClick={handleNotifications} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-105 relative`} style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff', color: isDark ? '#ffffff' : '#0d1117', boxShadow: isDark ? 'none' : '0 6px 20px rgba(13,17,23,0.08)' }}>
        <Bell className="w-5 h-5" />
        {notifCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: '#FF4D8D', color: '#fff', borderRadius: 9999, padding: '4px 8px', fontSize: 11, fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{notifCount}</span>}
      </button>
      <button title={`Favorites (${favCount})`} onClick={handleFavorites} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-105 relative`} style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff', color: isDark ? '#ffffff' : '#0d1117', boxShadow: isDark ? 'none' : '0 6px 20px rgba(13,17,23,0.08)' }}>
        <Star className="w-5 h-5" />
        {favCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: '#3BF4C5', color: '#000', borderRadius: 9999, padding: '4px 8px', fontSize: 11, fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{favCount}</span>}
      </button>
      <button title={`Recently Played (${recentCount})`} onClick={handleRecent} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform hover:scale-105 relative`} style={{ background: isDark ? 'rgba(255,255,255,0.08)' : '#ffffff', color: isDark ? '#ffffff' : '#0d1117', boxShadow: isDark ? 'none' : '0 6px 20px rgba(13,17,23,0.08)' }}>
        <Clock className="w-5 h-5" />
        {recentCount > 0 && <span style={{ position: 'absolute', top: -8, right: -8, background: '#F7E85E', color: '#000', borderRadius: 9999, padding: '4px 8px', fontSize: 11, fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{recentCount}</span>}
      </button>
    </div>
  );
};

export default React.memo(FloatingSidebar);
