import { FiDroplet, FiSun, FiAlertTriangle } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SeedInfo({ crop }) {
  if (!crop?.seed) return null;
  const s = crop.seed;

  const items = [
    { label: 'Seed Rate', value: `${s.rate} kg/ha`, icon: '🌱', color: 'from-green-400 to-emerald-500' },
    { label: 'Germination', value: `${s.germination}%`, icon: '🌿', color: 'from-teal-400 to-cyan-500' },
    { label: 'Viability', value: `${s.viability} years`, icon: '📅', color: 'from-blue-400 to-indigo-500' },
    { label: 'Planting Depth', value: `${s.planting_depth} cm`, icon: '📐', color: 'from-purple-400 to-violet-500' },
    { label: 'Spacing', value: `${s.spacing} cm`, icon: '📏', color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center text-lg shadow-sm`}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100 font-mono">{item.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Seed Treatment */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5"
      >
        <div className="flex items-start gap-3">
          <FiAlertTriangle className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Seed Treatment</h4>
            <p className="text-sm text-amber-700 dark:text-amber-400">{s.treatment}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
