import { useRouter } from "next/router";
import Image from "next/image";

export default function PhotographerCard({ photographer }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer">
      <Image
        src={photographer.profilePic}
        alt={photographer.name}
        width={400}
        height={192}
        className="w-full object-cover rounded mb-3"
        style={{ height: "12rem" }}
      />
      <h3 className="text-lg font-semibold">{photographer.name}</h3>
      <p className="text-sm text-gray-600">{photographer.location}</p>
      <p className="text-sm font-medium text-green-700">
        ₹{photographer.price} onwards
      </p>
      <p className="text-yellow-600 text-sm">⭐ {photographer.rating}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {photographer.tags.map((tag) => (
          <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => router.push(`/profile/${photographer.id}`)}
        className="btn-primary mt-4 w-full"
      >
        View Profile
      </button>
    </div>
  );
}
