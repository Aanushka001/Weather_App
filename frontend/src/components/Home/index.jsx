import React, { useState, useEffect } from 'react';
import WeatherDisplay from '../weather/WeatherDisplay';
import HistorySection from '../weather/HistorySection';
import weatherService from '../../services/weatherService';
import '../../styles/home.css';

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      try {
        const location = await weatherService.getCurrentLocation();
        const weather = await weatherService.getWeather(
          `${location.lat},${location.lon}`
        );
        setCurrentWeather(weather);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="navbar">
          <h1>WeatherApp</h1>
          <nav>
            <a href="#home">Home</a>
            <a href="#weather">Weather</a>
            <button className="profile-btn" onClick={toggleDropdown}>
              Profile
            </button>
          </nav>
        </div>
      </header>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <p className="user-info">abc_909</p>
          <p className="user-info">abc_909@gmail.com</p>
          <button className="logout-btn">Logout</button>
        </div>
      )}
      {loading ? (
        <div className="loading">Loading weather data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="current-weather">
          <WeatherDisplay data={currentWeather} />
          <HistorySection />
        </div>
      )}
    </div>
  );
};

export default Home;
