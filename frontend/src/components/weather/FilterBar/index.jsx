import React from 'react';
import FilterControls from  '../../weather/FilterBar/FiltrControls.jsx';
import '../../../styles/weather.css';

const FilterBar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <h3>Filter History</h3>
      <FilterControls filters={filters} onFilterChange={onFilterChange} />
    </div>
  );
};

export default FilterBar;
