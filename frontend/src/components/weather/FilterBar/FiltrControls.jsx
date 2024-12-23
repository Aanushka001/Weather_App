import React from 'react';
import '../../../styles/weather.css';

const FilterControls = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="filter-controls">
      <input
        type="text"
        name="city"
        value={filters.city}
        onChange={handleChange}
        placeholder="Filter by city"
        className="filter-input"
      />
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="filter-input"
      />
    </div>
  );
};

export default FilterControls;
