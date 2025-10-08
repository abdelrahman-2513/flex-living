import { Review } from '../interfaces/review';

interface StatsOverviewProps {
  reviews: Review[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ reviews }) => {
  const totalReviews = reviews.length;
  const publicReviews = reviews.filter((r) => r.isPublic).length;
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.averageRating, 0) / reviews.length
      : 0;

  const ratingDistribution = {
    excellent: reviews.filter((r) => r.averageRating >= 9).length,
    good: reviews.filter((r) => r.averageRating >= 7 && r.averageRating < 9).length,
    fair: reviews.filter((r) => r.averageRating < 7).length,
  };

  const stats = [
    {
      label: 'Total Reviews',
      value: totalReviews,
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Public Reviews',
      value: publicReviews,
      gradient: 'from-green-500 to-emerald-500',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      label: 'Average Rating',
      value: averageRating.toFixed(1),
      gradient: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
    {
      label: 'Excellent (9+)',
      value: ratingDistribution.excellent,
      gradient: 'from-orange-500 to-red-500',
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="group bg-[#FDFBF5] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#333333]">
                {stat.value}
              </p>
            </div>
            <div className="bg-[#2F5C54] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                {stat.icon}
              </div>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-[#2F5C54] opacity-20"></div>
        </div>
      ))}
    </div>
  );
};

