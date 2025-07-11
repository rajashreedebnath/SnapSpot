import PhotographerCard from "@/components/PhotographerCard";
import PhotographerSkeleton from "@/components/PhotographerSkeleton";

export default function PhotographerList({
  loading,
  photographers,
  visibleCount,
  onLoadMore,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PhotographerSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (photographers.length === 0) {
    return <p className="text-red-600">No photographers found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {photographers.slice(0, visibleCount).map((photographer) => (
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </div>

      {visibleCount < photographers.length && (
        <div className="flex justify-center mt-6">
          <button onClick={onLoadMore} className="btn-primary px-6">
            Load More
          </button>
        </div>
      )}
    </>
  );
}
