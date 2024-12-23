import React from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/weatherDashboard.css';

const WeatherDashboard = ({ weatherData, loading, error }) => {
  const { user } = useAuth();

  const renderWeatherInfo = () => {
    if (loading) {
      return <div className="loading">Loading weather data...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (!weatherData) {
      return (
        <div className="no-data">
          Use the search bar above to get weather information for any city
        </div>
      );
    }

    return (
      <div className="weather-info">
        <h2 className="location">{weatherData.location}</h2>
        <div className="weather-details">
          <div className="temperature">{weatherData.temperature}°C</div>
          <div className="condition">{weatherData.condition}</div>
          <div className="details-grid">
            <div className="detail-item">
              <span>Wind:</span> {weatherData.wind} m/s
            </div>
            <div className="detail-item">
              <span>Humidity:</span> {weatherData.humidity}%
            </div>
            <div className="detail-item">
              <span>Pressure:</span> {weatherData.pressure} hPa
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="weather-dashboard-container">
      <div className="weather-dashboard-content">
        <h1 className="weather-dashboard-title">Weather Dashboard</h1>
        {user && (
          <h2 className="welcome-message">
            Welcome {user.username}, explore weather data for any city.
          </h2>
        )}
        {renderWeatherInfo()}
      </div>
    </div>
  );
};

export default WeatherDashboard;