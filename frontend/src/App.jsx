import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameLobby from './components/GameLobby';
import GamePage from './pages/GamePage';
import CollectionPage from './pages/CollectionPage';
import './index.css';

// We'll keep the games list centralized here so pages can access the same data.
const games = [
  { id: 1, title: 'Space Runner', category: 'Action', icon: '🚀' },
  { id: 2, title: 'Puzzle Quest', category: 'Puzzle', icon: '🧩' },
  { id: 3, title: 'Dragon Slayer', category: 'RPG', icon: '🐉' },
  { id: 4, title: 'Card Master', category: 'Strategy', icon: '🃏' },
  { id: 5, title: 'Bounce Ball', category: 'Casual', icon: '⚽' },
  { id: 6, title: 'Treasure Hunt', category: 'Adventure', icon: '🗺️' },
  { id: 7, title: 'Code Challenge', category: 'Puzzle', icon: '💻' },
  { id: 8, title: 'Racing Thunder', category: 'Racing', icon: '🏎️' },
  { id: 9, title: 'Monster Fight', category: 'Action', icon: '👾' },
  { id: 10, title: 'Farm Life', category: 'Simulation', icon: '🌾' },
  { id: 11, title: 'Sky Jumper', category: 'Casual', icon: '🪂' },
  { id: 12, title: 'Word Wizard', category: 'Puzzle', icon: '🔤' },
  { id: 13, title: 'City Builder', category: 'Simulation', icon: '🏙️' },
  { id: 14, title: 'Stealth Ops', category: 'Action', icon: '🥷' },
  { id: 15, title: 'Ocean Explorer', category: 'Adventure', icon: '🌊' },
  { id: 16, title: 'Battle Cards', category: 'Strategy', icon: '🛡️' },
  { id: 17, title: 'Maze Runner', category: 'Puzzle', icon: '🌀' },
  { id: 18, title: 'Speed Drift', category: 'Racing', icon: '🏁' },
  { id: 19, title: 'Alien Defense', category: 'Action', icon: '👽' },
  { id: 20, title: 'Garden Life', category: 'Simulation', icon: '🌿' },
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
