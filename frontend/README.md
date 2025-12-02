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

```
frontend/
├── src/
│   ├── components/
│   │   ├── GameLobby.tsx      # Main lobby component
│   │   └── GameCard.tsx        # Individual game card component
│   ├── App.tsx                 # Main app wrapper
│   └── index.css               # Tailwind imports
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Dependencies
```

## Installation & Setup

1. **Navigate to frontend folder:**
   ```bash
   cd D:\Freelance\frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## Technologies Used

- **React 18+** - UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **PostCSS & Autoprefixer** - CSS processing

## Game Lobby Features

### GameLobby Component
The main component that provides:
- Sticky header with logo and controls
- Horizontal scrolling game gallery
- Dark/Light mode toggle
- Search functionality
- Featured collections section
- Responsive footer

### GameCard Component
Individual game card with:
- Colorful gradient backgrounds
- Game icon and title
- Category badge
- Hover animations and scaling
- Play button with action handler
- Smooth transitions

## Customization

### Adding More Games
Edit the `games` array in `GameLobby.tsx`:
```typescript
const games = [
  { id: 1, title: 'Game Name', category: 'Category', icon: '🎮' },
  // Add more games...
];
```

### Changing Colors
Modify the `gradients` array in `GameCard.tsx` for different card colors.

### Dark Mode
Toggle dark mode using the sun/moon button in the header, or programmatically with the `isDarkMode` state.

## Responsive Breakpoints

- **Mobile:** < 768px - Single column, full-width
- **Tablet:** 768px - 1024px - 2 columns
- **Desktop:** > 1024px - Full layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Integration with game backend API
- [ ] User authentication & profiles
- [ ] Game ratings and reviews
- [ ] Multiplayer features
- [ ] Achievement system
- [ ] Leaderboards

## Notes

- The play button currently shows an alert. Replace with actual navigation using React Router.
- Customize the games array to display real games from your backend.
- Icons can be swapped using any emoji or SVG icons.
- All styling is done with Tailwind CSS for easy customization.

## License

MIT
