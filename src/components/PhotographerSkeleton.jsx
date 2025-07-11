export default function PhotographerSkeleton() {
  return (
    <div className="border rounded shadow animate-pulse p-4">
      <div className="bg-gray-300 h-40 w-full mb-4 rounded" />
      <div className="h-4 bg-gray-300 rounded mb-2 w-2/3" />
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-1" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="mt-4 h-8 bg-gray-300 rounded" />
    </div>
  );
}
