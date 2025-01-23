import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const FilterSidebar = ({
  filters,
  setFilters,
  brands,
  categories,
  onApply,
  onClear,
}) => {
  return (
    <div className="w-64 bg-white p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        
        {/* Brand Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Brand</label>
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full p-2 border rounded-lg"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Categories</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category]
                      : filters.categories.filter((c) => c !== category);
                    setFilters({ ...filters, categories: newCategories });
                  }}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange.min}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, min: e.target.value },
                })
              }
              className="w-1/2 p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange.max}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: { ...filters.priceRange, max: e.target.value },
                })
              }
              className="w-1/2 p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onApply}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={onClear}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;