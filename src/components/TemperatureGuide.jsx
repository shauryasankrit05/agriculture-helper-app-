import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function TemperatureGuide({ crop }) {
  if (!crop?.temperature) return null;
  const t = crop.temperature;

  const chartData = [
    { name: 'Critical Min', value: t.critical_min, color: '#ef4444' },
    { name: 'Optimal Min', value: t.optimal_min, color: '#22c55e' },
    { name: 'Optimal Max', value: t.optimal_max, color: '#16a34a' },
    { name: 'Critical Max', value: t.critical_max, color: '#ef4444' },
  ];

  const rangeWidth = ((t.optimal_max - t.optimal_min) / (t.critical_max - t.critical_min)) * 100;
  const rangeLeft = ((t.optimal_min - t.critical_min) / (t.critical_max - t.critical_min)) * 100;

  return (
    <div className="space-y-6">
      {/* Visual Temperature Range */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Temperature Range</h3>
        
        {/* Temperature Bar */}
        <div className="relative mb-8">
          <div className="h-8 bg-gradient-to-r from-blue-400 via-green-400 via-green-500 to-red-400 rounded-full overflow-hidden relative">
            {/* Optimal zone highlight */}
            <div
              className="absolute top-0 h-full border-2 border-white/80 dark:border-white/60 rounded-full bg-white/20"
              style={{ left: `${rangeLeft}%`, width: `${rangeWidth}%` }}
            />
          </div>
          {/* Labels */}
          <div className="flex justify-between mt-2 text-xs font-mono">
            <span className="text-blue-500 font-bold">{t.critical_min}°C</span>
            <span className="text-green-500 font-bold">{t.optimal_min}°C</span>
            <span className="text-green-600 font-bold">{t.optimal_max}°C</span>
            <span className="text-red-500 font-bold">{t.critical_max}°C</span>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>Critical Low</span>
            <span>Optimal Min</span>
            <span>Optimal Max</span>
            <span>Critical High</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">{t.critical_min}°</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Critical Min</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">{t.optimal_min}°</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal Min</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">{t.optimal_max}°</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimal Max</p>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-2xl font-bold font-mono text-red-600 dark:text-red-400">{t.critical_max}°</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Critical Max</p>
          </div>
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Temperature Chart (°C)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg, #fff)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Frost Tolerance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`rounded-xl p-5 border ${
          t.frost_tolerance === 'High'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : t.frost_tolerance === 'Moderate'
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        }`}
      >
        <p className="text-sm font-medium">
          ❄️ Frost Tolerance: <span className="font-bold">{t.frost_tolerance}</span>
        </p>
      </motion.div>
    </div>
  );
}
