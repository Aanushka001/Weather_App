const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const WEATHER_API_KEY = 'dad59db55daaab8fb40ed9bb722e4857';

const getWeather = async (city) => {
  try {
    if (!city) {
      throw new Error("City parameter is missing.");
    }
    const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ? errorData.error.info : 'Error fetching weather data');
    }
    const data = await response.json();
    return {
      city: city,
      temperature: data.current.temperature,
      description: data.current.weather_descriptions[0],
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error(error.message || 'Error fetching weather data');
  }
};

const getSearchHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/weather/history`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error fetching search history');
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Error fetching search history');
  }
};

const weatherService = {
  getWeather,
  getSearchHistory,
};

export default weatherService;
