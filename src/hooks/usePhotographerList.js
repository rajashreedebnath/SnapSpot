
import { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';

export default function usePhotographerList(allPhotographers, filters, search) {
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    let results = allPhotographers;

    // Search
    if (debouncedSearch) {
      const keyword = debouncedSearch.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.location.toLowerCase().includes(keyword) ||
          p.tags.some((tag) => tag.toLowerCase().includes(keyword))
      );
    }

    // Filters
    results = results.filter((p) => {
      const priceMatch =
        (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || p.price <= Number(filters.maxPrice));

      const ratingMatch = p.rating >= filters.rating;

      const styleMatch =
        filters.styles.length === 0 ||
        filters.styles.some((style) => p.styles.includes(style));

      // Optional city filter in filters
      const cityMatch =
        !filters.city || p.location.toLowerCase() === filters.city.toLowerCase();

      return priceMatch && ratingMatch && styleMatch && cityMatch;
    });

    // Sorting
    if (filters.sortBy === 'priceLowHigh') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'ratingHighLow') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'recent') {
      results.sort((a, b) => b.id - a.id);
    }

    setFilteredPhotographers(results);
  }, [debouncedSearch, allPhotographers, filters]);

  useEffect(() => {
    setVisibleCount(6);
  }, [debouncedSearch, filters]);

  return { filteredPhotographers, visibleCount, setVisibleCount };
}
