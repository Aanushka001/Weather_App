import React, { useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import HistorySection from './components/weather/HistorySection';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { useAuth } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import Profile from './components/auth/Profile.jsx';
import weatherService from './services/weatherService';
import './styles/App.css';

const App = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserWeather = async () => {
        try {
          const data = await weatherService.getWeather('London');
          console.log("Fetched weather data for London:", data);
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      };

      fetchUserWeather();
    }
  }, [user]);

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <nav className="navbar">
          <div className="nav-left">
            <NavLink to="/" className="nav-brand">
              WeatherApp
            </NavLink>
          </div>

          <form className="search-form">
            <input
              type="text"
              className="search-input"
              placeholder="Search city..."
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

          <div className="nav-tabs">
            <NavLink to="/weather" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
              Weather
            </NavLink>
            {user && (
              <>
                <NavLink to="/history" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
                  History
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? 'tab active' : 'tab')}>
                  Profile
                </NavLink>
              </>
            )}
          </div>

          <div className="nav-right">
            {user ? (
              <button onClick={handleSignOut} className="auth-btn">
                Sign Out
              </button>
            ) : (
              <div className="auth-buttons">
                <NavLink to="/signin" className="auth-btn">
                  Sign In
                </NavLink>
                <NavLink to="/signup" className="auth-btn">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <main className="main-content">
          {!user ? (
            <div className="welcome-message">
              <h1>Welcome to the WeatherApp!</h1>
              <p>Please sign in to get started.</p>
            </div>
          ) : (
            <>
              <div className="welcome-message">
                <h1>Welcome back, {user.name}!</h1>
                <p>Explore your weather data and profile.</p>
              </div>
              <Routes>
                <Route path="/weather" element={<div>Weather content here</div>} />
                <Route
                  path="/"
                  element={<div>Welcome to the app! Please select an option from the menu.</div>}
                />
                {user && (
                  <>
                    <Route path="/history" element={<HistorySection userId={user.id} />} />
                    <Route path="/profile" element={<Profile />} />
                  </>
                )}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
