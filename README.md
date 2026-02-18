# Task Manager Dashboard

A lightweight task management dashboard built with **React 19** and **Vite** that allows users to create, organize, and track personal tasks with real-time status updates, filtering, and persistent local storage.

---

## Features

| Feature | Description |
|---|---|
| **Create Tasks** | Add tasks with a required title (max 100 chars) and optional description (max 500 chars). Inline validation prevents empty submissions. |
| **View Tasks** | All tasks are displayed in a vertical list showing title, description, and current status. An empty state message appears when no tasks exist. |
| **Update Status** | Change task status via dropdown — *To Do*, *In Progress*, or *Done*. Color-coded indicators (gray / blue / green) update immediately. |
| **Delete Tasks** | Remove tasks with a confirmation prompt to prevent accidental deletion. |
| **Filter by Status** | Filter tasks by *All*, *To Do*, *In Progress*, or *Done* with live task counts per category. |
| **Local Storage** | Tasks persist automatically in the browser's `localStorage`. No data lost on refresh or browser restart. Handles corrupted storage gracefully. |

---

## Tech Stack

- **Frontend**: React 19, JSX
- **Build Tool**: Vite 7
- **Testing**: Vitest, React Testing Library, jest-dom
- **Linting**: ESLint 9 with React Hooks & React Refresh plugins
- **CI/CD**: GitHub Actions (lint → test → build on push/PR to `main`/`master`)
- **Styling**: Vanilla CSS with CSS custom properties (dark theme)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (v20 recommended)
- npm v9+

### Installation

```bash
# Clone the repository
https://github.com/wisdomska/task_manager.git

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173/`).

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start Vite development server with HMR |
| `build` | `npm run build` | Build for production |
| `preview` | `npm run preview` | Preview production build locally |
| `lint` | `npm run lint` | Run ESLint on all `.js` and `.jsx` files |
| `test` | `npm test` | Run all unit tests once |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `test:coverage` | `npm run test:coverage` | Run tests with coverage report |

---

## Project Structure

```
task_manager/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
├── public/
│   └── vite.svg
├── src/
│   ├── __tests__/
│   │   ├── TaskForm.test.jsx       # 8 tests — form validation, submission, clearing
│   │   ├── TaskItem.test.jsx       # 12 tests — rendering, status, delete/confirm
│   │   ├── TaskList.test.jsx       # 4 tests — empty state, list rendering
│   │   ├── TaskFilter.test.jsx     # 4 tests — rendering, counts, active state
│   │   └── useLocalStorage.test.js # 5 tests — read, write, corrupted data
│   ├── components/
│   │   ├── TaskForm.jsx            # Task creation form with validation
│   │   ├── TaskItem.jsx            # Individual task card with status & delete
│   │   ├── TaskList.jsx            # Task list container with empty state
│   │   └── TaskFilter.jsx          # Status filter buttons with counts
│   ├── hooks/
│   │   └── useLocalStorage.js      # Custom hook for localStorage persistence
│   ├── App.jsx                     # Main app — state management & layout
│   ├── App.css                     # Component & layout styles
│   ├── index.css                   # Global styles, design tokens, typography
│   ├── main.jsx                    # React entry point
│   └── setupTests.js               # Vitest setup (jest-dom matchers)
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite + Vitest configuration
├── eslint.config.js                # ESLint configuration
├── package.json
├── requirements.md                 # Full product backlog & sprint plans
└── README.md
```

---

## Testing

The project has **33 unit tests** across 5 test files:

```bash
# Run all tests
npm test

# Run in watch mode during development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Summary

| Test File | Tests | Covers |
|---|---|---|
| `TaskForm.test.jsx` | 8 | Rendering, empty-title validation, successful submit, form clearing, error dismissal, maxLength |
| `TaskItem.test.jsx` | 12 | Title/description rendering, status dropdown, CSS classes, delete button, confirm/cancel flows |
| `TaskList.test.jsx` | 4 | Empty state (null & empty array), rendering multiple tasks |
| `TaskFilter.test.jsx` | 4 | Filter buttons, task counts, active highlighting, click callback |
| `useLocalStorage.test.js` | 5 | Initial value, reading stored data, writing on change, corrupted data recovery, persistence |

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs automatically on every **push** and **pull request** to `main` or `master`:

1. **Checkout** code
2. **Setup** Node.js 20 with npm cache
3. **Install** dependencies (`npm ci`)
4. **Lint** (`npm run lint`)
5. **Test** (`npm test`)
6. **Build** (`npm run build`)

---

## Sprint History

### Sprint 1 — Core Functionality (8 Story Points)
- ✅ **US1**: Create tasks with title + description (3 SP)
- ✅ **US2**: View all tasks in a list (2 SP)
- ✅ **US3**: Update task status — To Do / In Progress / Done (3 SP)

### Sprint 2 — Features & Persistence (7 Story Points)
- ✅ **US4**: Delete tasks with confirmation (2 SP)
- ✅ **US5**: Filter tasks by status with counts (3 SP)
- ✅ **US6**: Local storage persistence (2 SP)

### Backlog
- ⬜ **US7**: Due dates with overdue indicators (3 SP)

---

## Design

- **Dark theme** with gradient accent colors (purple/violet)
- **Color-coded statuses**: gray (To Do), blue (In Progress), green (Done)
- **Responsive layout**: side-by-side on desktop, stacked on mobile
- **Micro-animations**: hover lift effects, smooth transitions
- **Accessibility**: ARIA labels, keyboard navigable, semantic HTML

---

## License

This project is for educational purposes as part of the **Agile & DevOps in Practice** lab.
