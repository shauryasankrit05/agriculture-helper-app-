import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiPlus, FiDroplet, FiClock, FiSun, FiTrendingUp } from 'react-icons/fi';
import { useCompare } from '../context/CompareContext';
import { CropRadarChart } from '../charts/CropCharts';
import crops from '../data/crops.json';

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const selectedCrops = compareList.map(id => crops.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">📊 Compare Crops</h1>
          {selectedCrops.length > 0 && (
            <button onClick={clearCompare} className="text-sm text-red-500 hover:underline">Clear All</button>
          )}
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Compare up to 3 crops side-by-side</p>
      </motion.div>

      {selectedCrops.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <p className="text-6xl mb-4">📊</p>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">No crops to compare</h3>
          <p className="text-gray-400 mb-6">Add crops from the search page using the compare button</p>
          <Link to="/search" className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
            Browse Crops
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Selected crops */}
          <div className="flex flex-wrap gap-3">
            {selectedCrops.map(crop => (
              <motion.div key={crop.id} layout className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-2">
                <span className="font-medium text-green-700 dark:text-green-300">{crop.name}</span>
                <button onClick={() => removeFromCompare(crop.id)} className="text-green-400 hover:text-red-500">
                  <FiX size={16} />
                </button>
              </motion.div>
            ))}
            {compareList.length < 3 && (
              <Link to="/search" className="flex items-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 text-gray-400 hover:border-green-400 hover:text-green-500 transition-colors">
                <FiPlus size={16} /> Add Crop
              </Link>
            )}
          </div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Comparison Radar</h3>
            <CropRadarChart crops={selectedCrops} />
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">Metric</th>
                  {selectedCrops.map(c => (
                    <th key={c.id} className="p-4 text-center font-bold text-gray-800 dark:text-gray-100">{c.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {[
                  { label: 'Season', key: 'season', icon: '🗓️' },
                  { label: 'Category', key: 'category', icon: '📂' },
                  { label: 'Duration (days)', key: 'crop_duration', icon: '⏱️' },
                  { label: 'Yield (q/ha)', key: 'expected_yield', icon: '📈' },
                  { label: 'Water (mm)', key: 'water_requirement', icon: '💧' },
                  { label: 'Optimal Temp (°C)', getValue: c => `${c.temperature.optimal_min}–${c.temperature.optimal_max}`, icon: '🌡️' },
                  { label: 'Seed Rate (kg/ha)', getValue: c => c.seed.rate, icon: '🌱' },
                  { label: 'Germination (%)', getValue: c => `${c.seed.germination}%`, icon: '🌿' },
                  { label: 'Frost Tolerance', getValue: c => c.temperature.frost_tolerance, icon: '❄️' },
                  { label: 'MSP (₹/q)', getValue: c => c.msp ? `₹${c.msp}` : 'N/A', icon: '💰' },
                  { label: 'Soil Type', getValue: c => c.soil_type.join(', '), icon: '🌍' },
                  { label: 'pH Range', getValue: c => `${c.ph_range.min}–${c.ph_range.max}`, icon: '🧪' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="p-4 text-gray-600 dark:text-gray-300 font-medium">
                      <span className="mr-2">{row.icon}</span>{row.label}
                    </td>
                    {selectedCrops.map(c => (
                      <td key={c.id} className="p-4 text-center font-mono text-gray-800 dark:text-gray-200">
                        {row.getValue ? row.getValue(c) : c[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </div>
  );
}
