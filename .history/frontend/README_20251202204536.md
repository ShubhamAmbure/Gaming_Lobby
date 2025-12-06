# Game Lobby - React + Tailwind CSS

A modern, fully responsive game lobby application built with React, TypeScript, and Tailwind CSS. Features horizontal scrolling games, dark mode toggle, and a clean UI design.

## Features

✨ **Key Features:**
- **Brand Logo Header** - Sleek header with GameHub logo and navigation
- **Horizontal Scrolling Games** - Smooth scrolling game cards with hover effects
- **Play Button Redirect** - Click play button to initiate game launch
- **Dark Mode Toggle** - Switch between light and dark themes
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Modern UI** - Beautiful gradients, shadows, and animations
- **Featured Collections** - Showcase different game categories
- **Search & Global Controls** - Built-in search and global settings

## Project Structure
# GameHub (Frontend)

A modern, responsive Game Lobby built with React, Vite and Tailwind CSS (v4).

This repository contains the frontend UI for GameHub — a polished game discovery lobby with animated neon cards, play actions, favorites, notifications, and responsive layouts.

## Quickstart

1. Install dependencies:

```powershell
cd frontend
npm install
```

2. Start the dev server:

```powershell
npm run dev
```

3. Open http://localhost:5173

## Key folders

- `frontend/src/` — application source
  - `components/` — reusable UI components
  - `pages/` — route pages
  - `context/` — global app context (`AppContext.jsx`)
  - `index.jsx` — app entry (wrapped with `AppProvider`)
- `frontend/public/` — static assets

## Architecture

- Vite + React + Tailwind v4 for fast dev and small bundles.
- `AppContext` (React Context + useReducer) manages shared state: `darkMode`, `favorites`, `notifications`, `recentlyPlayed`, `toasts`.
- Toast system provides centered, accessible messages for actions.

## What I cleaned up

- Added `.gitignore` to avoid committing `node_modules` and build artifacts.
- Removed tracked build artifacts from the repo (committed separately).

## Next recommended improvements

- Persist `favorites` and `recentlyPlayed` to `localStorage`.
- Replace alert placeholders with sliding panels / modals.
- Optionally migrate to Redux for larger-scale state management.

## Contact / Notes

If you'd like, I can:
- Remove `node_modules` from the repo history (requires history rewrite).
- Refactor all components to use `AppContext` instead of prop drilling.
- Produce a one-page presentation (PRESENTATION.md) summarizing the code.

---

