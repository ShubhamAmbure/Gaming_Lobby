import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GamePage = ({ games, isDarkMode = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const gameId = Number(id);
  const game = (games || []).find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game not found</h2>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-blue-600 text-white rounded">Back to Lobby</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8" style={{ background: isDarkMode ? '#0D1117' : 'linear-gradient(180deg,#f8fafc,#e6f0ff)', color: '#ffffff' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">{game.title}</h1>
            <p className="mt-2" style={{ color: '#9CA3AF' }}>Category: {game.category}</p>
          </div>
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded" style={{ background: '#ffffff', color: '#0d1117' }}>Back</button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8 }} className="p-6 shadow">
          <p className="mb-4" style={{ color: '#9CA3AF' }}>This is a placeholder page for <strong style={{ color: '#ffffff' }}>{game.title}</strong>. Replace this with the actual game iframe or logic.</p>
          <div className="w-full h-60 rounded flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}>
            <span style={{ color: '#9CA3AF' }}>Game area (iframe / canvas) goes here</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
