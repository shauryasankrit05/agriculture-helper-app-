import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function FertilizerGuide({ crop }) {
  if (!crop?.fertilizer) return null;

  // NPK stacked bar data
  const barData = crop.fertilizer.map(f => ({
    stage: f.stage,
    Nitrogen: f.nitrogen || 0,
    Phosphorus: f.phosphorus || 0,
    Potassium: f.potassium || 0,
  }));

  // Total NPK pie data
  const totalN = crop.fertilizer.reduce((s, f) => s + (f.nitrogen || 0), 0);
  const totalP = crop.fertilizer.reduce((s, f) => s + (f.phosphorus || 0), 0);
  const totalK = crop.fertilizer.reduce((s, f) => s + (f.potassium || 0), 0);
  const pieData = [
    { name: 'Nitrogen (N)', value: totalN },
    { name: 'Phosphorus (P)', value: totalP },
    { name: 'Potassium (K)', value: totalK },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      {/* Stage-wise breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crop.fertilizer.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {i + 1}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{f.stage}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.timing}</p>
              </div>
            </div>
            <div className="space-y-2">
              {f.nitrogen > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Nitrogen (N)</span>
                  <span className="font-mono font-bold text-green-600 dark:text-green-400">{f.nitrogen} kg/ha</span>
                </div>
              )}
              {(f.phosphorus || 0) > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Phosphorus (P)</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{f.phosphorus} kg/ha</span>
                </div>
              )}
              {(f.potassium || 0) > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Potassium (K)</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{f.potassium} kg/ha</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">NPK by Growth Stage (kg/ha)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="Nitrogen" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Phosphorus" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Potassium" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Total NPK Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Total Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5"
      >
        <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">📊 Total Requirement (per hectare)</h4>
        <div className="flex gap-6 text-sm">
          <span className="text-green-700 dark:text-green-400">N: <strong>{totalN} kg</strong></span>
          <span className="text-blue-700 dark:text-blue-400">P: <strong>{totalP} kg</strong></span>
          <span className="text-amber-700 dark:text-amber-400">K: <strong>{totalK} kg</strong></span>
        </div>
      </motion.div>
    </div>
  );
}
