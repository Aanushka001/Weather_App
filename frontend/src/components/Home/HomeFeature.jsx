import React from 'react';
import '../../styles/home.css';

const HomeFeatures = () => {
  return (
    <section className="features-grid">
      <div className="feature-card">
        <h3>Real-Time Weather</h3>
        <p>Get instant weather updates for any location worldwide</p>
      </div>
      <div className="feature-card">
        <h3>Search History</h3>
        <p>Keep track of your previous weather searches</p>
      </div>
      <div className="feature-card">
        <h3>Detailed Reports</h3>
        <p>View comprehensive weather information including temperature, humidity, and wind speed</p>
      </div>
    </section>
  );
};

export default HomeFeatures;
