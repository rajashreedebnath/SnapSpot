import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PhotographerProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;

    const fetchPhotographer = async () => {
      try {
        const res = await axios.get(`${API_URL}/photographers/${id}`);
        setPhotographer(res.data);
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  const handleSendInquiry = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowInquiry(false);
    }, 2000);
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!photographer) return <p className="p-4 text-red-500">Photographer not found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-full md:w-1/3 h-auto rounded shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-1">{photographer.name}</h1>
          <p className="text-gray-600">{photographer.location}</p>
          <p className="mt-2 text-green-700 font-medium">₹{photographer.price} onwards</p>
          <p className="text-yellow-600">⭐ {photographer.rating}</p>
          <p className="mt-3 text-gray-700">{photographer.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {photographer.styles.map((style) => (
              <span key={style} className="text-sm bg-blue-100 px-3 py-1 rounded">
                {style}
              </span>
            ))}
            {photographer.tags.map((tag) => (
              <span key={tag} className="text-sm bg-gray-200 px-3 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowInquiry(true)}
            className="mt-6 btn-primary"
          >
            Send Inquiry
          </button>
        </div>
      </div>

      {/* Portfolio Gallery */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Portfolio</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photographer.portfolio.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`portfolio-${index}`}
              className="w-full h-40 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        <div className="space-y-4">
          {photographer.reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
              <p className="font-semibold">{review.name} ⭐ {review.rating}</p>
              <p className="text-sm text-gray-600">{review.date}</p>
              <p className="mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            {!submitted ? (
              <>
                <h2 className="text-lg font-bold mb-2">Send Inquiry</h2>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full mb-2 p-2 border rounded"
                  disabled={submitted}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full mb-2 p-2 border rounded"
                  disabled={submitted}
                />
                <textarea
                  placeholder="Message"
                  className="w-full mb-2 p-2 border rounded h-24"
                  disabled={submitted}
                ></textarea>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => setShowInquiry(false)}
                    className="px-4 py-2 text-gray-700 border rounded"
                    disabled={submitted}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInquiry}
                    className="px-4 py-2 btn-primary"
                    disabled={submitted}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <p className="text-green-600 text-center text-lg">Inquiry submitted</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
