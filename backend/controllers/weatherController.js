import fetch from 'node-fetch';
import pool from '../config/database.js';
import WeatherSearch from '../models/WeatherSearch.js';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = 'http://api.weatherstack.com';
const API_KEY = process.env.WEATHERSTACK_API_KEY;

const checkApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.info || 'Error fetching data from the external API');
  }
  return response.json();
};

export const getWeather = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const response = await fetch(`${API_URL}/current?access_key=${API_KEY}&query=${encodeURIComponent(city)}`);
    const data = await checkApiResponse(response);

    if (!data || !data.current) {
      return res.status(404).json({ message: `Weather data not found for ${city}` });
    }

    const userId = req.user.id;

    await WeatherSearch.create(
      userId,
      city,
      data.current.temperature,
      data.current.weather_descriptions[0],
      data.current.humidity,
      data.current.wind_speed
    );

    res.json({
      success: true,
      data: {
        city,
        temperature: data.current.temperature,
        description: data.current.weather_descriptions[0],
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in getWeather:', error.message);
    res.status(500).json({ message: 'Error fetching weather data', error: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    let query = `
      SELECT 
        id, city, temperature, weather_description AS description, 
        humidity, wind_speed AS windSpeed, search_date AS timestamp 
      FROM weather_searches 
      WHERE user_id = ?`;
    const params = [userId];

    if (date) {
      query += ` AND DATE(search_date) = ?`;
      params.push(date);
    }

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await WeatherSearch.deleteSearch(userId, id);

    if (!result) {
      return res.status(404).json({ message: 'Record not found or unauthorized' });
    }

    res.json({ success: true, message: 'Search history record deleted successfully' });
  } catch (error) {
    console.error('Error in deleteSearchHistory:', error.message);
    res.status(500).json({ message: 'Error deleting search history', error: error.message });
  }
};

export const getWeatherForecast = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    const response = await fetch(`${API_URL}/forecast?access_key=${API_KEY}&query=${encodeURIComponent(city)}`);
    const data = await checkApiResponse(response);

    if (!data || !data.forecast) {
      return res.status(404).json({ message: `Forecast data not found for ${city}` });
    }

    res.json({
      success: true,
      data: data.forecast,
    });
  } catch (error) {
    console.error('Error in getWeatherForecast:', error.message);
    res.status(500).json({ message: 'Error fetching weather forecast', error: error.message });
  }
};
