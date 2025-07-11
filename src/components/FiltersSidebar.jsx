import { useState, useEffect } from "react";

const ratingOptions = [4, 3, 2];
const allStyles = ["Candid", "Traditional", "Outdoor", "Studio", "Indoor"];
const allCities = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

export default function FiltersSidebar({ filters, setFilters }) {
  const allStyles = ["Candid", "Traditional", "Outdoor", "Studio", "Indoor"];
  const ratingOptions = [4, 3, 2];
  const allCities = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

  const handleStyleChange = (style) => {
    const updatedStyles = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];

    setFilters({ ...filters, styles: updatedStyles });
  };

  return (
    <div className="bg-white rounded shadow-md p-4 mb-6">
      <h3 className="font-bold mb-3">Filters</h3>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">City</label>
        <select
          value={filters.city || ""}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="">All Cities</option>
          {allCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">
          Price Range (₹)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            className="w-1/2 px-2 py-1 border rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="w-1/2 px-2 py-1 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Minimum Rating</label>
        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters({ ...filters, rating: Number(e.target.value) })
          }
          className="w-full px-2 py-1 border rounded"
        >
          <option value={0}>All</option>
          {ratingOptions.map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Styles</label>
        {allStyles.map((style) => (
          <label key={style} className="block text-sm">
            <input
              type="checkbox"
              checked={filters.styles.includes(style)}
              onChange={() => handleStyleChange(style)}
              className="mr-2"
            />
            {style}
          </label>
        ))}
      </div>
    </div>
  );
}
