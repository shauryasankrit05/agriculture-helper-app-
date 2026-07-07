import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { calculateFertilizer } from '../utils/helpers';
import crops from '../data/crops.json';

export default function FertilizerCalcPage() {
  const [selectedCropId, setSelectedCropId] = useState('');
  const [area, setArea] = useState(1);

  const crop = crops.find(c => c.id === selectedCropId);
  const results = crop ? calculateFertilizer(crop, area) : [];

  const totalUrea = results.reduce((s, r) => s + r.urea_kg, 0);
  const totalDAP = results.reduce((s, r) => s + r.dap_kg, 0);
  const totalMOP = results.reduce((s, r) => s + r.mop_kg, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">🧮 Fertilizer Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Calculate exact fertilizer needs based on your crop and farm area</p>
      </motion.div>

      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Crop</label>
            <div className="relative">
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm"
              >
                <option value="">Choose a crop...</option>
                {crops.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Farm Area (Hectares)</label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
              min="0.1"
              step="0.1"
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm font-mono"
            />
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {crop && results.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Total Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-green-500/20">
              <p className="text-green-100 text-sm">Total Urea</p>
              <p className="text-4xl font-extrabold font-mono mt-1">{totalUrea.toFixed(1)}</p>
              <p className="text-green-200 text-sm mt-1">kg for {area} ha</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
              <p className="text-blue-100 text-sm">Total DAP</p>
              <p className="text-4xl font-extrabold font-mono mt-1">{totalDAP.toFixed(1)}</p>
              <p className="text-blue-200 text-sm mt-1">kg for {area} ha</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/20">
              <p className="text-amber-100 text-sm">Total MOP</p>
              <p className="text-4xl font-extrabold font-mono mt-1">{totalMOP.toFixed(1)}</p>
              <p className="text-amber-200 text-sm mt-1">kg for {area} ha</p>
            </motion.div>
          </div>

          {/* Stage-wise breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">📋 Stage-wise Breakdown for {crop.name} ({area} ha)</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left p-4 font-medium text-gray-500">Stage</th>
                  <th className="text-left p-4 font-medium text-gray-500">Timing</th>
                  <th className="text-right p-4 font-medium text-green-500">Urea (kg)</th>
                  <th className="text-right p-4 font-medium text-blue-500">DAP (kg)</th>
                  <th className="text-right p-4 font-medium text-amber-500">MOP (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {results.map((r, i) => (
                  <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{r.stage}</td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{r.timing}</td>
                    <td className="p-4 text-right font-mono font-bold text-green-600 dark:text-green-400">{r.urea_kg.toFixed(1)}</td>
                    <td className="p-4 text-right font-mono font-bold text-blue-600 dark:text-blue-400">{r.dap_kg.toFixed(1)}</td>
                    <td className="p-4 text-right font-mono font-bold text-amber-600 dark:text-amber-400">{r.mop_kg.toFixed(1)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-sm text-green-700 dark:text-green-400">
            💡 <strong>Tip:</strong> Urea contains 46% N, DAP contains 46% P₂O₅, MOP contains 60% K₂O. Always get soil tested before applying fertilizers.
          </div>
        </motion.div>
      )}
    </div>
  );
}
