import { useState, useEffect } from 'react';
import { ReviewFilters } from '../interfaces/review';

interface FilterBarProps {
  filters: ReviewFilters;
  listings: string[];
  channels: string[];
  onFilterChange: (filters: ReviewFilters) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  listings,
  channels,
  onFilterChange,
  onClearFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<ReviewFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key: keyof ReviewFilters, value: string) => {
    const newFilters = {
      ...localFilters,
      [key]: value || undefined,
    };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };

  return (
    <div className="bg-[#FDFBF5] rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 animate-fadeIn">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-[#2F5C54] rounded-xl p-2 shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#333333]">
          Filters
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#2F5C54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Listing</span>
          </label>
          <select
            value={localFilters.listingName || ''}
            onChange={(e) => handleChange('listingName', e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5C54] focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md"
          >
            <option value="">All Listings</option>
            {listings.map((listing) => (
              <option key={listing} value={listing}>
                {listing}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#2F5C54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span>Channel</span>
          </label>
          <select
            value={localFilters.channel || ''}
            onChange={(e) => handleChange('channel', e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5C54] focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md"
          >
            <option value="">All Channels</option>
            {channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#2F5C54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>Min Rating</span>
          </label>
          <select
            value={localFilters.rating || ''}
            onChange={(e) => handleChange('rating', e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5C54] focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md"
          >
            <option value="">Any Rating</option>
            <option value="9">⭐ 9+ Excellent</option>
            <option value="8">⭐ 8+ Very Good</option>
            <option value="7">⭐ 7+ Good</option>
            <option value="6">⭐ 6+ Fair</option>
          </select>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#2F5C54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Start Date</span>
          </label>
          <input
            type="date"
            value={localFilters.startDate || ''}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5C54] focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#2F5C54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>End Date</span>
          </label>
          <input
            type="date"
            value={localFilters.endDate || ''}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F5C54] focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      <div className="flex gap-1 mt-6">
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-[#2F5C54] text-white rounded-lg hover:bg-[#4A7C70] transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center space-x-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Apply Filters</span>
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center space-x-2 text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

