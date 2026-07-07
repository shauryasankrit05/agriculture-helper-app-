import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import { convertUnits, unitPairs } from '../utils/converters';

export default function UnitConverterPage() {
  const [selectedPair, setSelectedPair] = useState(0);
  const [inputVal, setInputVal] = useState(100);
  const [reversed, setReversed] = useState(false);

  const pair = unitPairs[selectedPair];
  const fromUnit = reversed ? pair.to : pair.from;
  const toUnit = reversed ? pair.from : pair.to;
  const result = convertUnits(inputVal, fromUnit, toUnit);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">🔄 Unit Converter</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Convert between metric and imperial agricultural units</p>
      </motion.div>

      {/* Unit type selection */}
      <div className="flex flex-wrap gap-2 mb-8">
        {unitPairs.map((p, i) => (
          <button
            key={p.label}
            onClick={() => { setSelectedPair(i); setReversed(false); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedPair === i ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Converter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
      >
        {/* From */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{fromUnit}</label>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 text-2xl font-mono font-bold text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 text-center"
          />
        </div>

        {/* Swap */}
        <div className="flex justify-center my-4">
          <motion.button
            whileTap={{ rotate: 180 }}
            onClick={() => setReversed(!reversed)}
            className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
          >
            <FiRefreshCw size={20} />
          </motion.button>
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{toUnit}</label>
          <div className="w-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-4 py-4 text-2xl font-mono font-bold text-green-700 dark:text-green-300 text-center">
            {result !== null ? result : 'N/A'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
