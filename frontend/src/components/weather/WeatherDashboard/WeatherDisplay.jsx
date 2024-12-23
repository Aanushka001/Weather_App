import React from 'react';
import { Sun, Cloud, Wind, Droplets } from 'lucide-react';
import '../../../styles/weather.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const getWeatherIcon = () => {
    if (weatherData.description.toLowerCase().includes('sun')) {
      return <Sun className="weather-icon" />;
    }
    return <Cloud className="weather-icon" />;
  };

  return (
    <div className="weather-container">
      <div className="weather-hero">
        <div className="weather-search">
          <input 
            type="text" 
            placeholder="Search city"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
        
        <div className="current-weather">
          <div className="weather-main">
            <h1>{weatherData.city}</h1>
            <div className="temp-display">
              <span className="temperature">{weatherData.temperature}°C</span>
              <span className="weather-desc">{weatherData.description}</span>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <Wind className="weather-icon" />
              <span>Wind: {weatherData.windSpeed} m/s</span>
            </div>
            <div className="detail-item">
              <Droplets className="weather-icon" />
              <span>Humidity: {weatherData.humidity}%</span>
            </div>
            <div className="detail-item">
              <Cloud className="weather-icon" />
              <span>Pressure: {weatherData.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Display the appropriate weather icon here */}
      <div className="weather-icon-display">
        {getWeatherIcon()}
      </div>

      <div className="forecast-section">
        <h2>8-Day Forecast</h2>
        <div className="forecast-grid">
          {weatherData.forecast?.map((day, index) => (
            <div key={index} className="forecast-card">
              <span className="forecast-day">{day.date}</span>
              <span className="forecast-temp">{day.temp}°C</span>
              <span className="forecast-desc">{day.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
