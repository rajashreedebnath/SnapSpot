import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import FiltersSidebar from '@/components/FiltersSidebar';
import SmartSuggestion from '@/components/SmartSuggestion';
import PhotographerList from '@/components/PhotographerList';
import { usePhotographer } from '@/context/PhotographerContext';

export default function CategoryPage() {
  const router = useRouter();
  const { city } = router.query;

  const {
    allPhotographers,
    loading,
    filters,
    setFilters,
    search,
    setSearch,
    filteredPhotographers,
    visibleCount,
    setVisibleCount
  } = usePhotographer();

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (city) {
      setFilters((prev) => ({ ...prev, city }));
    }
  }, [city]);

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
