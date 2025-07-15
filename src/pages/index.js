import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SortDropdown from '@/components/SortDropdown';
import FiltersSidebar from '@/components/FiltersSidebar';
import SmartSuggestion from '@/components/SmartSuggestion';
import PhotographerList from '@/components/PhotographerList';
import { usePhotographer } from '@/context/PhotographerContext';

export default function HomePage() {
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

  return (
    <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-screen">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden btn-primary"
          aria-label="Open Filters"
        >
          <div className="space-y-1">
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </div>
        </button>

        <h1 className="text-2xl font-bold">All Photographers</h1>
      </div>

      <SmartSuggestion photographers={allPhotographers} city="Recommended" />
      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        <div className="lg:col-span-1 hidden lg:block">
          <SortDropdown
            sortBy={filters.sortBy}
            setSortBy={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
          />
          <FiltersSidebar filters={filters} setFilters={setFilters} />
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
        <div className={`fixed inset-0 z-50`}>
          <div className="transform bg-blue-100 h-full w-4/5 p-4 overflow-y-auto fixed top-0 left-0 z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters & Sort</h2>
              <button onClick={() => setShowFilters(false)} className="text-xl font-bold text-gray-600 hover:text-black">×</button>
            </div>
            <FiltersSidebar filters={filters} setFilters={setFilters} />
            <SortDropdown
              sortBy={filters.sortBy}
              setSortBy={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
            />
          </div>
          <div onClick={() => setShowFilters(false)} className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}
    </div>
  );
}
