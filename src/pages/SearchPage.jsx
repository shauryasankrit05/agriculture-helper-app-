import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX, FiHeart } from 'react-icons/fi';
import CropCard from '../components/CropCard';
import VoiceSearch from '../components/VoiceSearch';
import { CropCardSkeleton } from '../components/Skeleton';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { useFavorites } from '../context/FavoriteContext';
import { searchCrops, getCategories, getSeasons } from '../utils/searchEngine';
import crops from '../data/crops.json';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ season: 'All', category: 'All' });
  const [showFavOnly, setShowFavOnly] = useState(false);
  const { favorites } = useFavorites();

  const handleVoiceResult = useCallback((text) => {
    setQuery(text);
  }, []);

  const { isListening, isSupported, startListening, stopListening } = useVoiceSearch(handleVoiceResult);

  let results = searchCrops(crops, query, filters);
  if (showFavOnly) {
    results = results.filter(c => favorites.includes(c.id));
  }

  const categories = getCategories(crops);
  const seasons = getSeasons();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">
          🔍 Search Crops
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Find detailed information for {crops.length} crops • Search in English or Hindi
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-6"
      >
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search crops... Try "Rice", "धान", "Paddy"'
            className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
        <VoiceSearch
          isListening={isListening}
          isSupported={isSupported}
          onStart={startListening}
          onStop={stopListening}
        />
      </motion.div>

      {/* Voice feedback */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 text-center"
        >
          🎤 Listening... Speak a crop name
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        {/* Season pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Season:</span>
          {seasons.map(s => (
            <button
              key={s}
              onClick={() => setFilters(p => ({ ...p, season: s }))}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filters.season === s
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category:</span>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilters(p => ({ ...p, category: c }))}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filters.category === c
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Favorites filter */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFavOnly(!showFavOnly)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              showFavOnly
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50'
            }`}
          >
            <FiHeart size={14} className={showFavOnly ? 'fill-current' : ''} />
            Favorites Only
          </button>
          <span className="text-sm text-gray-400">
            {results.length} crop{results.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </motion.div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((crop, i) => (
            <CropCard key={crop.id} crop={crop} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-6xl mb-4">🌾</p>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">No crops found</h3>
          <p className="text-gray-400">Try a different search term or adjust your filters</p>
        </motion.div>
      )}
    </div>
  );
}
