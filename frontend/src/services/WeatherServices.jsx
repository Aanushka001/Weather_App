const API_BASE_URL = process.env.REACT_APP_WEATHERSTACK_API_BASE_URL || 'https://api.weatherstack.com';
const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;

class WeatherService {
  constructor() {
    if (!API_KEY) {
      console.warn('Weather API key is not configured. Please set REACT_APP_WEATHERSTACK_API_KEY in your environment variables.');
    }
  }

  async getWeather(city) {
    try {
      if (!city) throw new Error('City parameter is required');
      const response = await fetch(
        `${API_BASE_URL}/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
      );
      if (!response.ok) {
        throw new Error('Unable to find weather data. Please try again.');
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error.info || 'WeatherStack API error');
      return {
        city: data.location.name,
        temperature: data.current.temperature,
        description: (data.current.weather_descriptions && data.current.weather_descriptions[0]) || 'No description available',
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        pressure: data.current.pressure || 0,
        visibility: data.current.visibility || 0,
        icon: (data.current.weather_icons && data.current.weather_icons[0]) || '',
        feelsLike: data.current.feelslike,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      throw new Error('Unable to find weather data. Please try again.');
    }
  }

  async getWeatherForecast(city) {
    try {
      if (!city) throw new Error('City parameter is required');
      const currentWeather = await this.getWeather(city);
      const response = await fetch(
        `${API_BASE_URL}/forecast?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
      );
      if (!response.ok) {
        throw new Error('Unable to find weather data. Please try again.');
      }
      const data = await response.json();
      if (data.error) {
        console.error('Error fetching forecast:', data.error.info);
        return { city: currentWeather.city, data: [] };
      }
      if (!data.forecast || typeof data.forecast !== 'object') {
        console.error('Forecast data format is not as expected:', data.forecast);
        return { city: currentWeather.city, data: [] };
      }
      const forecast = Object.keys(data.forecast).map((date) => ({
        date: date,
        maxTemp: data.forecast[date].temperature_max || 'N/A',
        minTemp: data.forecast[date].temperature_min || 'N/A',
        description: (data.forecast[date].weather_descriptions && data.forecast[date].weather_descriptions[0]) || 'No description available',
        humidity: data.forecast[date].humidity || 'N/A',
        windSpeed: data.forecast[date].wind_speed || 'N/A',
      }));
      return { city: currentWeather.city, data: forecast };
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Unable to find weather data. Please try again.');
    }
  }

  async getPastWeather(city) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/historical?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
      );
      if (!response.ok) {
        throw new Error('Unable to find past weather data. Please try again.');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.info || 'WeatherStack API error');
      }
      return {
        temperature: data.history.temperature,
        windSpeed: data.history.wind_speed,
      };
    } catch (error) {
      console.error('Past weather fetch error:', error);
      throw new Error('Unable to find past weather data. Please try again.');
    }
  }

  async getAirQuality(city) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/air_quality?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
      );
      if (!response.ok) {
        throw new Error('Unable to find air quality data. Please try again.');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.info || 'WeatherStack API error');
      }
      return {
        aqi: data.current.air_quality.aqi,
        pm25: data.current.air_quality.pm25,
        pm10: data.current.air_quality.pm10,
        healthRecommendation: data.current.air_quality.health_recommendation,
      };
    } catch (error) {
      console.error('Air quality fetch error:', error);
      throw new Error('Unable to find air quality data. Please try again.');
    }
  }

  async getWeatherAlerts(city) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/alerts?access_key=${API_KEY}&query=${encodeURIComponent(city)}`
      );
      if (!response.ok) {
        throw new Error('Unable to find weather alerts. Please try again.');
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.info || 'WeatherStack API error');
      }
      return data.alerts || [];
    } catch (error) {
      console.error('Weather alerts fetch error:', error);
      throw new Error('Unable to find weather alerts. Please try again.');
    }
  }

  saveSearchHistory(history) {
    try {
      const currentHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
      currentHistory.push(history);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(currentHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }
}

const weatherService = new WeatherService();

export default weatherService;
