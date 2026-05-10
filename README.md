# Comeback - Recovery Companion App

A beautiful, mobile-first rehab tracking application built with React, TypeScript, and Tailwind CSS.

## Features

- 🏥 **Personalized Recovery Plans** - Curated exercise programs for ankle, knee, and shoulder injuries
- 📊 **Progress Tracking** - Visual charts and recovery score tracking
- 🔥 **Streak System** - Stay motivated with daily streak tracking
- 🏆 **Achievements & Badges** - Earn rewards as you progress
- 📱 **Mobile-First Design** - Optimized for touch interactions
- 💾 **Offline Support** - Works without internet connection

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Routing**: React Router v6
- **State**: Local Storage + React Query
- **UI Components**: Radix UI + Custom Components
- **Build**: Vite
- **Mobile**: Capacitor (for native apps)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/
│   ├── rehab/          # Core app components
│   │   ├── tabs/       # Tab screens (Home, Progress, Profile, etc.)
│   │   ├── AppShell.tsx
│   │   ├── BottomNav.tsx
│   │   └── ...
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and data
│   ├── rehab-data.ts  # Exercise plans and app state
│   └── utils.ts
├── pages/              # Route pages
└── assets/             # Images and static files
```

## Deployment

### GitHub Pages

1. Update `vite.config.ts` with your repository name
2. Run `npm run build`
3. Deploy the `dist` folder to GitHub Pages

### Android App

Coming soon! Instructions for building with Capacitor.

## License

MIT
