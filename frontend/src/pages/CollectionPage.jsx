import React from 'react';
import GameCard from '../components/GameCard';
import { useParams, useNavigate } from 'react-router-dom';

const CollectionPage = ({ games }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const filtered = (games || []).filter((g) => g.category.toLowerCase() === (name || '').toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Collection: {name}</h2>
          <button onClick={() => navigate(-1)} className="px-3 py-2 rounded bg-slate-200">Back</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p className="text-slate-600">No games found in this collection.</p>
          ) : (
            filtered.map((g) => (
              <GameCard key={g.id} game={g} onPlay={() => navigate(`/game/${g.id}`)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
