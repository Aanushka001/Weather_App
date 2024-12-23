import React from 'react';
import '../../styles/weather.css';

const HistorySection = ({ history = [], filters = {} }) => {
  const filteredHistory = history.filter((item) => {
    const matchesCity = !filters.city || item.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesDate = !filters.date || new Date(item.created_at).toLocaleDateString().includes(filters.date);
    return matchesCity && matchesDate;
  });

  return (
    <section className="history-section">
      <h3>Search History</h3>
      {filteredHistory.length === 0 ? (
        <p className="no-history">No search history available</p>
      ) : (
        <ul className="history-list">
          {filteredHistory.map((item) => (
            <li key={item.id || Math.random()} className="history-item">
              <div className="history-details">
                <span className="city">{item.city}</span>
                <span className="temp">{item.temperature}°C</span>
                <span className="desc">{item.description}</span>
                <span className="date">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default HistorySection;
