export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Sort By</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-2 py-1 border rounded"
      >
        <option value="">Default</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="ratingHighLow">Rating: High to Low</option>
        <option value="recent">Recently Added</option>
      </select>
    </div>
  );
}
