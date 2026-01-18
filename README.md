# React + TypeScript + Vite

A modern React application with TypeScript, Material UI, Tailwind CSS, and Zustand.

## Tech Stack

- ⚡ **Vite** - Next generation frontend tooling
- ⚛️ **React 19** - The library for web interfaces
- 🔷 **TypeScript** - JavaScript with syntax for types
- 🎨 **Material UI (MUI)** - React component library
- 💨 **Tailwind CSS** - Utility-first CSS framework
- 🐻 **Zustand** - Lightweight state management

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Fix ESLint errors |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── store/         # Zustand stores
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles & Tailwind
```

## MUI + Tailwind Integration

This project uses both MUI and Tailwind CSS together:
- **MUI** - For complex UI components (buttons, dialogs, forms)
- **Tailwind** - For layout, spacing, and quick styling

Tailwind classes can be applied directly to MUI components via the `className` prop.

## State Management

Zustand stores are located in `src/store/`. The example store demonstrates:
- Persistent state with localStorage
- DevTools integration
- TypeScript typing
