// Archivo: src/components/Transactions/TransactionFilters.jsx
import { useState, useEffect } from 'react';

const TransactionFilters = ({ categories, onFilterChange, resultsCount }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category_id: '',
  });

  // Debounce para la búsqueda (espera 500ms después de que el usuario deje de escribir)
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.search]);

  // Para tipo y categoría, aplicar inmediatamente
  useEffect(() => {
    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type, filters.category_id]);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category_id: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: '',
      category_id: '',
    });
  };

  const hasActiveFilters = filters.search || filters.type || filters.category_id;

  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="Search by description or amount..."
        value={filters.search}
        onChange={handleSearchChange}
      />

      <select value={filters.type} onChange={handleTypeChange}>
        <option value="">All Types</option>
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
      </select>

      <select value={filters.category_id} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          className="btn btn-secondary"
          onClick={handleClearFilters}
          style={{ padding: '10px 15px' }}
        >
          Clear Filters
        </button>
      )}

      {resultsCount !== null && (
        <span style={{ color: '#9fa6ad', fontSize: '0.9rem', marginLeft: '10px' }}>
          {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
        </span>
      )}
    </div>
  );
};

export default TransactionFilters;