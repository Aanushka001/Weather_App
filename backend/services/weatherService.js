import fetch from 'node-fetch';  
const WEATHER_API_KEY = process.env.WEATHER_API_KEY; 
const WEATHER_API_URL = 'http://api.weatherstack.com/current';

const getWeatherData = async (city) => {
  try {
    if (!city) {
      throw new Error('City parameter is missing.');
    }

    const url = `${WEATHER_API_URL}?access_key=${WEATHER_API_KEY}&query=${encodeURIComponent(city)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching weather data from WeatherStack');
    }

    const data = await response.json();

    if (!data || !data.current) {
      throw new Error('No weather data found.');
    }

    // Return the structured weather data
    return {
      city: data.location.name,
      temperature: data.current.temperature,
      description: data.current.weather_descriptions[0],
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      timestamp: data.current.observation_time,
    };
  } catch (error) {
    console.error('Error in weatherService.js:', error.message);
    throw new Error(error.message || 'Error fetching weather data');
  }
};

export default { getWeatherData };
