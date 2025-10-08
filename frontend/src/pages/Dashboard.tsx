import { useEffect } from 'react';
import { useReviewStore } from '../stores/reviewStore';
import { ReviewCard } from '../components/ReviewCard';
import { FilterBar } from '../components/FilterBar';
import { StatsOverview } from '../components/StatsOverview';

export const Dashboard: React.FC = () => {
  const {
    reviews,
    listings,
    channels,
    filters,
    isLoading,
    error,
    fetchReviews,
    fetchListings,
    fetchChannels,
    setFilters,
    toggleReviewVisibility,
    clearFilters,
  } = useReviewStore();

  useEffect(() => {
    fetchReviews();
    fetchListings();
    fetchChannels();
  }, []);

  const handleToggleVisibility = async (id: number, isPublic: boolean) => {
    try {
      await toggleReviewVisibility(id, isPublic);
    } catch (error) {
      console.error('Failed to update visibility:', error);
    }
  };


  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 animate-fadeIn">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-[#2F5C54] rounded-2xl p-3 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#333333]">
                Reviews Dashboard
              </h1>
              <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                Manage and monitor property reviews across all channels
              </p>
            </div>
          </div>
        </div>

        <StatsOverview reviews={reviews} />

        <FilterBar
          filters={filters}
          listings={listings}
          channels={channels}
          onFilterChange={setFilters}
          onClearFilters={clearFilters}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 shadow-sm animate-fadeIn flex items-center space-x-3">
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#2F5C54] absolute top-0 left-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-[#FDFBF5] rounded-2xl shadow-lg p-16 text-center border border-gray-200 animate-fadeIn">
            <div className="bg-[#2F5C54] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-[#333333] text-xl font-semibold mb-2">No reviews found</p>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div key={review.id} style={{ animationDelay: `${index * 50}ms` }}>
                <ReviewCard
                  review={review}
                  onToggleVisibility={handleToggleVisibility}
                  showVisibilityToggle={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

