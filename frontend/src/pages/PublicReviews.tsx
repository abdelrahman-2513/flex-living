import { useEffect, useState } from 'react';
import { useReviewStore } from '../stores/reviewStore';
import { ReviewCard } from '../components/ReviewCard';

export const PublicReviews: React.FC = () => {
  const { publicReviews, listings, isLoading, fetchPublicReviews, fetchListings } =
    useReviewStore();
  const [selectedListing, setSelectedListing] = useState<string>('');

  useEffect(() => {
    fetchListings();
    fetchPublicReviews();
  }, []);

  useEffect(() => {
    fetchPublicReviews(selectedListing || undefined);
  }, [selectedListing]);

  const averageRating =
    publicReviews.length > 0
      ? publicReviews.reduce((sum, r) => sum + r.averageRating, 0) / publicReviews.length
      : 0;

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero Section */}
      <div className="relative bg-[#2F5C54] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-2 mb-6">
              <span className="text-white/90 font-medium">⭐ Guest Experiences</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 drop-shadow-lg">
              Guest Reviews
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 font-medium">
              See what our guests have to say about their stay
            </p>
          </div>
          
          {publicReviews.length > 0 && (
            <div className="flex justify-center items-center gap-8 bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl animate-fadeIn">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-2">{averageRating.toFixed(1)}</div>
                <div className="text-xs sm:text-sm opacity-90 font-medium">out of 10</div>
              </div>
              <div className="border-l-2 border-white/30 h-20"></div>
              <div>
                <div className="flex gap-1 sm:gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
                        i < Math.floor(averageRating / 2)
                          ? 'text-yellow-300 fill-current drop-shadow-lg'
                          : 'text-white/30 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg opacity-90 font-medium">
                  Based on {publicReviews.length} {publicReviews.length === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#FDFBF5] rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 animate-fadeIn">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F5C54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Filter by Property</span>
          </label>
          <select
            value={selectedListing}
            onChange={(e) => setSelectedListing(e.target.value)}
            className="w-full md:w-96 px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5C54] focus:border-transparent text-sm sm:text-base md:text-lg font-medium shadow-sm hover:shadow-md transition-all bg-white"
          >
            <option value="">🏠 All Properties</option>
            {listings.map((listing) => (
              <option key={listing} value={listing}>
                {listing}
              </option>
            ))}
          </select>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#2F5C54] absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading amazing reviews...</p>
          </div>
        ) : publicReviews.length === 0 ? (
          <div className="bg-[#FDFBF5] rounded-2xl shadow-lg p-16 text-center border border-gray-200 animate-fadeIn">
            <div className="bg-[#2F5C54] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-[#333333] text-lg sm:text-xl font-semibold mb-2">No public reviews available yet</p>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              Check back soon for amazing guest feedback
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {publicReviews.map((review, index) => (
              <div key={review.id} style={{ animationDelay: `${index * 50}ms` }}>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

