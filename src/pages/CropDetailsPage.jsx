import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiBarChart2, FiArrowLeft, FiDroplet, FiClock, FiSun, FiTrendingUp } from 'react-icons/fi';
import SeedInfo from '../components/SeedInfo';
import TemperatureGuide from '../components/TemperatureGuide';
import FertilizerGuide from '../components/FertilizerGuide';
import CropCalendar from '../components/CropCalendar';
import { useFavorites } from '../context/FavoriteContext';
import { useCompare } from '../context/CompareContext';
import { seasonColors, categoryIcons } from '../utils/helpers';
import crops from '../data/crops.json';

const tabs = [
  { id: 'overview', label: 'Overview', icon: '📋' },
  { id: 'seeds', label: 'Seeds', icon: '🌱' },
  { id: 'temperature', label: 'Temperature', icon: '🌡️' },
  { id: 'fertilizers', label: 'Fertilizers', icon: '🧪' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
];

export default function CropDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCompare, isInCompare } = useCompare();

  const crop = crops.find(c => c.id === id);
  if (!crop) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">🚫</p>
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">Crop not found</h2>
        <Link to="/search" className="text-green-500 hover:underline mt-4 inline-block">← Back to search</Link>
      </div>
    );
  }

  const fav = isFavorite(crop.id);
  const inCompare = isInCompare(crop.id);
  const colors = seasonColors[crop.season] || seasonColors.Kharif;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/search" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors text-sm">
          <FiArrowLeft /> Back to Search
        </Link>
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleFavorite(crop.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              fav ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <FiHeart size={16} className={fav ? 'fill-current' : ''} />
            {fav ? 'Favorited' : 'Favorite'}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCompare(crop.id)}
            disabled={inCompare}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              inCompare ? 'bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-200 dark:border-green-800' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-green-300'
            }`}
          >
            <FiBarChart2 size={16} />
            {inCompare ? 'In Compare' : 'Compare'}
          </motion.button>
        </div>
      </div>

      {/* Crop Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{categoryIcons[crop.category] || '🌱'}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
              {crop.name}
            </h1>
            <p className="text-sm text-gray-400 italic">{crop.scientific_name} • {crop.family}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}>
            {crop.season}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {crop.category}
          </span>
          {crop.msp && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
              MSP: ₹{crop.msp}/q
            </span>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <FiClock className="mx-auto text-purple-500 mb-1" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white font-mono">{crop.crop_duration} <span className="text-xs font-normal">days</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <FiTrendingUp className="mx-auto text-green-500 mb-1" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Yield</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white font-mono">{crop.expected_yield} <span className="text-xs font-normal">q/ha</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <FiDroplet className="mx-auto text-blue-500 mb-1" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Water</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white font-mono">{crop.water_requirement} <span className="text-xs font-normal">mm</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <FiSun className="mx-auto text-amber-500 mb-1" size={20} />
            <p className="text-xs text-gray-500 dark:text-gray-400">Temp</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white font-mono">{crop.temperature.optimal_min}–{crop.temperature.optimal_max}<span className="text-xs font-normal">°C</span></p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-1 mb-8 pb-2 -mx-1 px-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">About {crop.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{crop.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">🌍 Soil Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {crop.soil_type.map(s => (
                      <span key={s} className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-full text-sm">{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    pH Range: <span className="font-mono font-bold">{crop.ph_range.min} – {crop.ph_range.max}</span>
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">🐛 Common Pests & Diseases</h4>
                  <div className="flex flex-wrap gap-2">
                    {crop.pest_diseases?.map(p => (
                      <span key={p} className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-full text-sm">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              {crop.aliases?.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">🗣️ Also Known As</h4>
                  <div className="flex flex-wrap gap-2">
                    {crop.aliases.map(a => (
                      <span key={a} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm">{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 'seeds' && <SeedInfo crop={crop} />}
          {activeTab === 'temperature' && <TemperatureGuide crop={crop} />}
          {activeTab === 'fertilizers' && <FertilizerGuide crop={crop} />}
          {activeTab === 'calendar' && <CropCalendar crop={crop} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
