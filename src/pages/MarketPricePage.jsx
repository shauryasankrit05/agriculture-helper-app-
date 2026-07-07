import { motion } from 'framer-motion';
import { MSPTrendChart } from '../charts/CropCharts';
import marketPrices from '../data/marketPrices.json';

export default function MarketPricePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">💰 Market Prices</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Minimum Support Price (MSP) and market rates for major crops</p>
      </motion.div>

      {/* MSP Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-8"
      >
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">📈 MSP Trend Comparison</h3>
        <MSPTrendChart priceData={marketPrices} />
      </motion.div>

      {/* Price Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">📊 MSP Data Table</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left p-4 font-medium text-gray-500">Crop</th>
                <th className="text-right p-4 font-medium text-gray-500">MSP 2023</th>
                <th className="text-right p-4 font-medium text-gray-500">MSP 2024</th>
                <th className="text-right p-4 font-medium text-gray-500">Market Avg</th>
                <th className="text-right p-4 font-medium text-gray-500">Change</th>
                <th className="text-left p-4 font-medium text-gray-500">Unit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {marketPrices.map((item, i) => {
                const change = ((item.msp_2024 - item.msp_2023) / item.msp_2023 * 100).toFixed(1);
                const isUp = change > 0;
                return (
                  <motion.tr
                    key={item.crop}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{item.crop}</td>
                    <td className="p-4 text-right font-mono text-gray-500 dark:text-gray-400">₹{item.msp_2023.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono font-bold text-gray-800 dark:text-gray-100">₹{item.msp_2024.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-blue-600 dark:text-blue-400">₹{item.market_avg.toLocaleString()}</td>
                    <td className={`p-4 text-right font-mono font-bold ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {isUp ? '↑' : '↓'} {change}%
                    </td>
                    <td className="p-4 text-gray-400 text-xs">{item.unit}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm text-blue-700 dark:text-blue-400">
        ℹ️ MSP data is for reference. Actual market prices may vary by region and mandi. Source: Agricultural Ministry of India
      </div>
    </div>
  );
}
