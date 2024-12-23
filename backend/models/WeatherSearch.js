import pool from '../config/database.js';

class WeatherSearch {
  static async create(userId, city, temperature, description, humidity, windSpeed) {
    try {
      const [result] = await pool.execute(
        `INSERT INTO weather_searches 
         (user_id, city, temperature, weather_description, humidity, wind_speed, search_date) 
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [userId, city, temperature, description, humidity, windSpeed]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating weather search:', error);
      throw new Error('Failed to save weather search');
    }
  }
  static async getUserSearchHistory(userId, limit = 10) {
    try {
      const [rows] = await pool.execute(
        `SELECT 
          id, city, temperature, weather_description AS description, humidity, wind_speed AS windSpeed, search_date AS timestamp
         FROM weather_searches 
         WHERE user_id = ? 
         ORDER BY search_date DESC 
         LIMIT ?`,
        [userId, limit]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching user search history:', error);
      throw new Error('Failed to fetch search history');
    }
  }
  static async deleteSearch(userId, searchId) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM weather_searches WHERE id = ? AND user_id = ?',
        [searchId, userId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting search:', error);
      throw new Error('Failed to delete search');
    }
  }
}

export default WeatherSearch;
