import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSearchReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/weather/reports', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setReports(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('The weather reports endpoint was not found. Please check the server or endpoint.');
        } else {
          setError('Unable to fetch weather reports. Please try again later.');
        }
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Weather Search Reports</h2>
      {error && <p>{error}</p>}
      {reports.length === 0 && !error && <p>No reports available.</p>}
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <p>User: {report.user.username}</p>
            <p>City: {report.city}</p>
            <p>Temperature: {report.temperature}°C</p>
            <p>Description: {report.description}</p>
            <p>Humidity: {report.humidity}%</p>
            <p>Wind Speed: {report.windSpeed} m/s</p> {/* Added wind speed */}
            <p>Visibility: {report.visibility} km</p> {/* Added visibility */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherSearchReport;
