import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiBarChart2, FiDroplet, FiClock, FiTrendingUp } from 'react-icons/fi';
import { useFavorites } from '../context/FavoriteContext';
import { useCompare } from '../context/CompareContext';
import { seasonColors, categoryIcons } from '../utils/helpers';

export default function CropCard({ crop, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const fav = isFavorite(crop.id);
  const inCompare = isInCompare(crop.id);
  const colors = seasonColors[crop.season] || seasonColors.Kharif;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:shadow-green-500/5 dark:hover:shadow-green-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top color accent bar */}
      <div className={`h-1.5 ${crop.season === 'Kharif' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : crop.season === 'Rabi' ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{categoryIcons[crop.category] || '🌱'}</span>
              <Link to={`/crop/${crop.id}`} className="text-lg font-bold text-gray-800 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                {crop.name}
              </Link>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 italic">{crop.scientific_name}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleFavorite(crop.id)}
            className="p-1.5"
          >
            <FiHeart
              size={18}
              className={fav ? 'fill-red-500 text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'}
            />
          </motion.button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
            {crop.season}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {crop.category}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <FiClock className="mx-auto text-gray-400 mb-1" size={14} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{crop.crop_duration}d</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <FiTrendingUp className="mx-auto text-gray-400 mb-1" size={14} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Yield</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{crop.expected_yield}q</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <FiDroplet className="mx-auto text-blue-400 mb-1" size={14} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Water</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200">{crop.water_requirement}mm</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/crop/${crop.id}`}
            className="flex-1 text-center py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm"
          >
            View Details
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => inCompare ? removeFromCompare(crop.id) : addToCompare(crop.id)}
            className={`p-2 rounded-xl border transition-all ${
              inCompare
                ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600'
                : 'border-gray-200 dark:border-gray-600 text-gray-400 hover:text-green-500 hover:border-green-300'
            }`}
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <FiBarChart2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
