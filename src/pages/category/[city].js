import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import FiltersSidebar from '@/components/FiltersSidebar';
import SmartSuggestion from '@/components/SmartSuggestion';
import PhotographerList from '@/components/PhotographerList';

import usePhotographerList from '@/hooks/usePhotographerList';

export default function CategoryPage() {
  const router = useRouter();
  const { city } = router.query;

  const [allPhotographers, setAllPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    rating: 0,
    styles: [],
    sortBy: '',
    city: city || '',
  });

  useEffect(() => {
    if (!city) return;

    const fetchPhotographers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/photographers`);
      } catch (err) {
        console.error('Error fetching photographers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, [city]);

  // Update city in filters when router.city changes
  useEffect(() => {
    if (city) {
      setFilters((prev) => ({ ...prev, city }));
    }
  }, [city]);

  const { filteredPhotographers, visibleCount, setVisibleCount } = usePhotographerList(
    allPhotographers,
    filters,
    search
  );

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden p-2 rounded hover:bg-gray-200 focus:outline-none"
          aria-label="Open Filters"
        >
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-gray-800"></span>
            <span className="block w-5 h-0.5 bg-gray-800"></span>
            <span className="block w-5 h-0.5 bg-gray-800"></span>
          </div>
        </button>
        <h1 className="text-2xl font-bold capitalize">{city} Photographers</h1>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      <SmartSuggestion photographers={allPhotographers} city={city} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        <div className="lg:col-span-1 hidden lg:block">
          <FiltersSidebar filters={filters} setFilters={setFilters} />
          <SortDropdown
            sortBy={filters.sortBy}
            setSortBy={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
          />
        </div>

        <div className="lg:col-span-3">
          <PhotographerList
            loading={loading}
            photographers={filteredPhotographers}
            visibleCount={visibleCount}
            onLoadMore={() => setVisibleCount((v) => v + 6)}
          />
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="w-4/5 bg-white h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters & Sort</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>
            </div>
            <FiltersSidebar filters={filters} setFilters={setFilters} />
            <SortDropdown
              sortBy={filters.sortBy}
              setSortBy={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
            />
          </div>
          <div className="flex-1" onClick={() => setShowFilters(false)}></div>
        </div>
      )}
    </div>
  );
}
