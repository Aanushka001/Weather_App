import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, MapPin, ThermometerSun, Wind } from 'lucide-react';
import '../../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (!user?.id) {
        setError('User is not logged in or has no user ID');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/weather/search-history?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setSearchHistory(data);
        } else {
          throw new Error('Unexpected response format: not JSON');
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSearchHistory();
    }
  }, [user]);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <section className="user-info-section">
          <h1 className="profile-header">User Profile</h1>
          <div className="user-details">
            <div className="user-avatar">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <h2>{user?.username}</h2>
              <p>{user?.email}</p>
              <p>Member since: {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        <section className="search-history-section">
          <h2 className="section-header">
            <Clock className="section-icon" />
            Weather Search History
          </h2>

          {loading ? (
            <div className="loading-state">Loading search history...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : searchHistory.length > 0 ? (
            <div className="history-grid">
              {searchHistory.map((entry, index) => (
                <div key={index} className="history-card">
                  <div className="history-card-header">
                    <MapPin className="history-icon" />
                    <h3>{entry.city}</h3>
                    <span className="search-date">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="weather-details">
                    <div className="weather-detail">
                      <ThermometerSun className="weather-icon" />
                      <span>{entry.temperature}°C</span>
                    </div>
                    <div className="weather-detail">
                      <Wind className="weather-icon" />
                      <span>{entry.windSpeed} m/s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No search history available.</p>
              <p>Start searching for weather information to build your history!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
