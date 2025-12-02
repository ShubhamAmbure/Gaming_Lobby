import React, { createContext, useReducer, useContext } from 'react';

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
    case 'ADD_FAV':
      return { ...state, favorites: [action.payload, ...state.favorites.filter((id) => id !== action.payload)].slice(0, 50) };
    case 'REMOVE_FAV':
      return { ...state, favorites: state.favorites.filter((id) => id !== action.payload) };
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
    default:
      return state;
  }
}

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
