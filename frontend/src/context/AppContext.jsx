import React, { createContext, useReducer, useContext, useEffect } from 'react';

const STORAGE_KEY = 'gaming_lobby:v1';

const initialState = {
  isDark: false,
  favorites: [],
  notifications: [],
  recentlyPlayed: [],
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DARK':
      return { ...state, isDark: !state.isDark };
    case 'SET_DARK':
      return { ...state, isDark: !!action.payload };
    case 'ADD_FAV':
      return { ...state, favorites: [action.payload, ...state.favorites.filter((id) => id !== action.payload)].slice(0, 50) };
    case 'REMOVE_FAV':
      return { ...state, favorites: state.favorites.filter((id) => id !== action.payload) };
    case 'TOGGLE_FAV': {
      const exists = state.favorites.includes(action.payload);
      return exists
        ? { ...state, favorites: state.favorites.filter((id) => id !== action.payload) }
        : { ...state, favorites: [action.payload, ...state.favorites].slice(0, 50) };
    }
    case 'ADD_RECENT':
      return { ...state, recentlyPlayed: [action.payload, ...state.recentlyPlayed.filter((id) => id !== action.payload)].slice(0, 10) };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [{ id: Date.now(), text: action.payload }, ...state.notifications].slice(0, 20) };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };
    case 'SET_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

function loadStateFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return { ...initialState, ...parsed };
  } catch (e) {
    console.warn('Failed to load app state from storage', e);
    return initialState;
  }
}

function saveStateToStorage(state) {
  try {
    const toSave = {
      favorites: state.favorites || [],
      recentlyPlayed: state.recentlyPlayed || [],
      isDark: !!state.isDark,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('Failed to save app state to storage', e);
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    // lazy initializer reads from localStorage
    try {
      return loadStateFromStorage();
    } catch (e) {
      return initialState;
    }
  });

  // Persist selected parts of state to localStorage
  useEffect(() => {
    saveStateToStorage(state);
  }, [state.favorites, state.recentlyPlayed, state.isDark]);

  // helper actions
  const toggleDark = () => dispatch({ type: 'TOGGLE_DARK' });
  const setDark = (val) => dispatch({ type: 'SET_DARK', payload: !!val });
  const addFav = (id) => dispatch({ type: 'ADD_FAV', payload: id });
  const removeFav = (id) => dispatch({ type: 'REMOVE_FAV', payload: id });
  const toggleFav = (id) => dispatch({ type: 'TOGGLE_FAV', payload: id });
  const addRecent = (id) => dispatch({ type: 'ADD_RECENT', payload: id });
  const addNotification = (text) => dispatch({ type: 'ADD_NOTIFICATION', payload: text });
  const clearNotifications = () => dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  const addToast = (toast) => dispatch({ type: 'ADD_TOAST', payload: toast });
  const removeToast = (id) => dispatch({ type: 'REMOVE_TOAST', payload: id });

  const value = {
    state,
    dispatch,
    toggleDark,
    setDark,
    addFav,
    removeFav,
    toggleFav,
    addRecent,
    addNotification,
    clearNotifications,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
