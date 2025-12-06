import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameLobby from './components/GameLobby';
import GamePage from './pages/GamePage';
import CollectionPage from './pages/CollectionPage';
import './index.css';

// We'll keep the games list centralized here so pages can access the same data.
const games = [
  { id: 1, title: 'Space Runner', category: 'casual', icon: '🚀', photo: '/images/ig1.jpg', playersOnline: 1203, maxWin: '5000x', volatility: 'High', rtp: '96.5%' },
  { id: 2, title: 'Puzzle Quest', category: 'casual', icon: '🧩', photo: '/images/ig2.png', playersOnline: 856, maxWin: '3000x', volatility: 'Medium', rtp: '95.2%' },
  { id: 3, title: 'Dragon Slayer', category: 'pg_soft', icon: '🐉', photo: '/images/ig3.jpg', playersOnline: 2140, maxWin: '8000x', volatility: 'High', rtp: '96.8%' },
  { id: 4, title: 'Card Master', category: 'pp', icon: '🃏', photo: '/images/ig14.jpg', playersOnline: 645, maxWin: '2500x', volatility: 'Low', rtp: '94.1%' },
  { id: 5, title: 'Bounce Ball', category: 'casual', icon: '⚽', photo: '/images/ig5.jpg', playersOnline: 412, maxWin: '1500x', volatility: 'Low', rtp: '93.5%' },
  { id: 6, title: 'Treasure Hunt', category: 'hacksaw', icon: '🗺️', photo: '/images/ig17.jpg', playersOnline: 1834, maxWin: '6000x', volatility: 'High', rtp: '97.1%' },
  { id: 7, title: 'Code Challenge', category: 'casual', icon: '💻', photo: '/images/ig15.png', playersOnline: 523, maxWin: '2000x', volatility: 'Medium', rtp: '94.8%' },
  { id: 8, title: 'Racing Thunder', category: 'revenge', icon: '🏎️', photo: '/images/ig16.jpg', playersOnline: 1956, maxWin: '7500x', volatility: 'High', rtp: '96.9%' },
  { id: 9, title: 'Monster Fight', category: 'bgaming', icon: '👾', photo: '/images/ig9.jpg', playersOnline: 1342, maxWin: '4500x', volatility: 'Medium', rtp: '95.6%' },
  { id: 10, title: 'Farm Life', category: 'pp', icon: '🌾', photo: '/images/ig10.jpg', playersOnline: 756, maxWin: '3200x', volatility: 'Medium', rtp: '95.0%' },
  
  { id: 11, title: 'Sky Jumper', category: 'allstars', icon: '🪂', photo: '/images/ig10.jpg', playersOnline: 2034, maxWin: '5500x', volatility: 'Medium', rtp: '96.2%' },
  { id: 12, title: 'Word Wizard', category: 'casual', icon: '🔤', photo: '/images/ig2.png', playersOnline: 634, maxWin: '2200x', volatility: 'Low', rtp: '94.3%' },
  { id: 13, title: 'City Builder', category: 'pg_soft', icon: '🏙️', photo: '/images/ig4.png', playersOnline: 1123, maxWin: '4800x', volatility: 'High', rtp: '96.7%' },
  { id: 14, title: 'Stealth Ops', category: 'hacksaw', icon: '🥷', photo: '/images/ig9.jpg', playersOnline: 1567, maxWin: '6200x', volatility: 'High', rtp: '97.3%' },
  { id: 15, title: 'Ocean Explorer', category: 'revenge', icon: '🌊', photo: '/images/ig8.jpg', playersOnline: 982, maxWin: '5100x', volatility: 'High', rtp: '96.5%' },
  
  { id: 16, title: 'Battle Cards', category: 'pp', icon: '🛡️', photo: '/images/ig7.jpg', playersOnline: 1245, maxWin: '3800x', volatility: 'Medium', rtp: '95.4%' },
  { id: 17, title: 'Maze Runner', category: 'casual', icon: '🌀', photo: '/images/ig1.jpg', playersOnline: 701, maxWin: '2800x', volatility: 'Low', rtp: '94.6%' },
  { id: 18, title: 'Speed Drift', category: 'allstars', icon: '🏁', photo: '/images/ig2.png', playersOnline: 1889, maxWin: '7000x', volatility: 'High', rtp: '96.8%' },
  { id: 19, title: 'Alien Defense', category: 'bgaming', icon: '👾', photo: '/images/ig3.jpg', playersOnline: 1456, maxWin: '5300x', volatility: 'High', rtp: '96.4%' },
  { id: 20, title: 'Garden Life', category: 'others', icon: '🌿', photo: '/images/ig4.png', playersOnline: 543, maxWin: '1800x', volatility: 'Low', rtp: '93.8%' },
  { id: 16, title: 'Battle Cards', category: 'pp', icon: '🛡️', photo: '/images/ig11.jpg', playersOnline: 1245, maxWin: '3800x', volatility: 'Medium', rtp: '95.4%' },
  { id: 17, title: 'Maze Runner', category: 'casual', icon: '🌀', photo: '/images/ig12.jpg', playersOnline: 701, maxWin: '2800x', volatility: 'Low', rtp: '94.6%' },
  { id: 18, title: 'Speed Drift', category: 'allstars', icon: '🏁', photo: '/images/ig13.jpg', playersOnline: 1889, maxWin: '7000x', volatility: 'High', rtp: '96.8%' },
  { id: 19, title: 'Alien Defense', category: 'bgaming', icon: '👾', photo: '/images/ig1.jpg', playersOnline: 1456, maxWin: '5300x', volatility: 'High', rtp: '96.4%' },
  { id: 20, title: 'Garden Life', category: 'others', icon: '🌿', photo: '/images/ig3.jpg', playersOnline: 543, maxWin: '1800x', volatility: 'Low', rtp: '93.8%' },
];


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLobby games={games} />} />
        <Route path="/game/:id" element={<GamePage games={games} />} />
        <Route path="/collection/:name" element={<CollectionPage games={games} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
