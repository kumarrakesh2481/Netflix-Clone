# Simple Netflix Clone

A fully responsive Netflix clone built with React (Vite), Tailwind CSS, and the OMDB API.

## Features

- **Authentication System**:
  - Sign Up & Login pages with validation.
  - Password hashing simulation using `crypto-js`.
  - JWT token simulation stored in `localStorage`.
  - Protected routes (Dashboard is only accessible after login).
  - Logout functionality.

- **Dashboard**:
  - Search movies using the OMDB API.
  - Debounced search for optimal performance.
  - Responsive Grid Layout for movie cards.
  - Detailed modal view for selected movies.
  - Infinite scroll (simulation) or pagination is handled via search? (Currently single page search).

- **UI/UX**:
  - Netflix-inspired dark theme.
  - Hover animations and transitions.
  - Loading skeletons/spinners.
  - Toast notifications for user feedback.

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router v6
- **State Management**: Context API
- **API Handling**: Axios
- **Icons**: Lucide React
- **Utils**: Crypto-JS, React Hot Toast

## Setup Instructions

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    The project uses `.env` file for API keys. It is already included in the project root:
    ```
    VITE_OMDB_API_KEY=7c8640a3
    VITE_OMDB_BASE_URL=https://www.omdbapi.com/
    ```

4.  **Run the Application**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, MovieCard, etc.)
├── context/          # Context providers (AuthContext)
├── hooks/            # Custom hooks (useDebounce)
├── pages/            # Page components (Login, Signup, Dashboard)
├── services/         # API service functions
├── App.jsx           # Main application component with routes
└── main.jsx          # Entry point
```

## Authentication Testing

Since there is no backend, you can sign up with any valid email and password (minimum 8 characters, 1 uppercase, 1 lowercase, 1 number).
Passwords are hashed before storage in `localStorage`.
If you refresh the page, your session persists until you log out.

Default Search: "Avengers"
