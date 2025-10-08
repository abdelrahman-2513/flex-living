import { Review } from '../interfaces/review';

interface ReviewCardProps {
  review: Review;
  onToggleVisibility?: (id: number, isPublic: boolean) => void;
  showVisibilityToggle?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onToggleVisibility,
  showVisibilityToggle = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'from-green-500 to-emerald-600';
    if (rating >= 7) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-600';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 9) return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
    if (rating >= 7) return 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200';
    return 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200';
  };

  return (
    <div className="group bg-[#FDFBF5] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-[#333333] mb-2 group-hover:text-[#2F5C54] transition-colors">
            {review.listingName}
          </h3>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">{review.guestName}</span>
            <span>•</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(review.submittedAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#2F5C54] px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl shadow-md">
            <div className="text-2xl sm:text-3xl font-semibold text-white">
              {review.averageRating.toFixed(1)}
            </div>
            <div className="text-xs text-white/80 font-medium text-center mt-1">
              {review.averageRating >= 9 ? 'Amazing' : review.averageRating >= 7 ? 'Good' : 'Fair'}
            </div>
          </div>
          {showVisibilityToggle && onToggleVisibility && (
            <button
              onClick={() => onToggleVisibility(review.id, !review.isPublic)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-md ${
                review.isPublic
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              {review.isPublic ? '👁️ Public' : '🔒 Private'}
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">"{review.publicReview}"</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-[#2F5C54] text-white shadow-md">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {review.channel}
        </span>
        <span className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-[#4A7C70] text-white shadow-md">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {review.type}
        </span>
      </div>

      {review.reviewCategories && review.reviewCategories.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs font-medium text-gray-600 mb-3 uppercase tracking-wide">Category Ratings</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
            {review.reviewCategories.map((cat, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <span className="text-xs text-gray-600 capitalize block mb-1">
                  {cat.category.replace(/_/g, ' ')}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#2F5C54]">
                  {cat.rating}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

