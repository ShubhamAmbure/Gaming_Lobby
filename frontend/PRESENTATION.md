# Presentation Notes — GameHub Frontend

Goal: Give a concise, impressive demo to your senior highlighting architecture, UX decisions, and next steps.

1) Elevator pitch (15s)
- "GameHub is a modern web lobby for discovering and launching browser games. It uses Vite + React + Tailwind and focuses on responsive UX, smooth animations and a clear component architecture."

2) Screens to demo (30s each)
- Lobby: show header, horizontal game carousel, play button
- Card interactions: 3D tilt, hover preview, add favorite
- Floating sidebar: quick access to notifications, favorites, recent
- Game page: placeholder area + back button

3) Architecture (60s)
- File structure: `components/`, `pages/`, `context/`, `utils/`
- `AppContext` for global state (dark mode, favorites, notifications, toasts)
- `ToastContainer` for accessible toasts (centered, timed, dismissible)

4) Key implementation details (60s)
- Tailwind v4 used for rapid styling with inline hex palette for neon look
- IntersectionObserver for scroll-triggered animations
- 3D tilt from mouse movement with requestAnimationFrame for performance
- Responsive layout: horizontal carousel on desktop, stacked cards on mobile

5) Next steps & roadmap (30s)
- Persist state in `localStorage`
- Replace alert placeholders with real panels
- Add backend integration for dynamic games
- Consider Redux only if state complexity increases

6) Q&A / Live code walkthrough
- Point to `src/context/AppContext.jsx` and `src/components/GameLobby.jsx`

----

Include this file when you demo — it gives a clear script to follow and highlights technical decisions.
