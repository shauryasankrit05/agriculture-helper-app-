import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiThermometer, FiDroplet, FiChevronDown } from 'react-icons/fi';
import { recommendCrops, soilTypes, seasonColors } from '../utils/helpers';
import crops from '../data/crops.json';

export default function CropRecommendPage() {
  const [params, setParams] = useState({
    temperature: 25,
    rainfall: 500,
    soilType: 'All',
    season: 'All',
  });
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const recs = recommendCrops(crops, params);
    setResults(recs);
    setSearched(true);
  };

  const seasons = ['All', 'Kharif', 'Rabi', 'Summer'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">🌱 Crop Recommender</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Get personalized crop recommendations based on your conditions</p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FiThermometer className="text-red-500" /> Temperature (°C)
            </label>
            <input
              type="range"
              min="5"
              max="45"
              value={params.temperature}
              onChange={(e) => setParams(p => ({ ...p, temperature: parseInt(e.target.value) }))}
              className="w-full accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5°C</span>
              <span className="text-lg font-bold text-gray-800 dark:text-white font-mono">{params.temperature}°C</span>
              <span>45°C</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <FiDroplet className="text-blue-500" /> Annual Rainfall (mm)
            </label>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={params.rainfall}
              onChange={(e) => setParams(p => ({ ...p, rainfall: parseInt(e.target.value) }))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100mm</span>
              <span className="text-lg font-bold text-gray-800 dark:text-white font-mono">{params.rainfall}mm</span>
              <span>2500mm</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🌍 Soil Type</label>
            <div className="relative">
              <select
                value={params.soilType}
                onChange={(e) => setParams(p => ({ ...p, soilType: e.target.value }))}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm"
              >
                {soilTypes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">🗓️ Season</label>
            <div className="flex gap-2">
              {seasons.map(s => (
                <button
                  key={s}
                  onClick={() => setParams(p => ({ ...p, season: s }))}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    params.season === s ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-green-500/20 text-lg hover:from-green-600 hover:to-emerald-700 transition-all"
        >
          🌱 Get Recommendations
        </motion.button>
      </motion.div>

      {/* Results */}
      {searched && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {results.length > 0 ? `🎯 Top ${results.length} Recommendations` : 'No matching crops found'}
          </h2>
          
          {results.map((crop, i) => {
            const colors = seasonColors[crop.season] || seasonColors.Kharif;
            return (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4"
              >
                {/* Rank */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-extrabold ${
                  i === 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                  i === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-500' :
                  i === 2 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' :
                  'bg-gray-50 dark:bg-gray-700/50 text-gray-400'
                }`}>
                  {i + 1}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <Link to={`/crop/${crop.id}`} className="text-lg font-bold text-gray-800 dark:text-gray-100 hover:text-green-500 transition-colors">
                    {crop.name}
                  </Link>
                  <p className="text-xs text-gray-400">{crop.scientific_name} • {crop.category}</p>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${colors.bg} ${colors.text}`}>{crop.season}</span>
                    <span className="text-xs text-gray-400">{crop.crop_duration} days • {crop.water_requirement}mm water</span>
                  </div>
                </div>

                {/* Confidence */}
                <div className="text-center">
                  <div className={`text-2xl font-extrabold font-mono ${
                    crop.confidence >= 80 ? 'text-green-500' : crop.confidence >= 50 ? 'text-amber-500' : 'text-red-500'
                  }`}>
                    {crop.confidence}%
                  </div>
                  <p className="text-xs text-gray-400">Match</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
