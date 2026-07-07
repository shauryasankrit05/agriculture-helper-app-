import { motion } from 'framer-motion';
import { FiMic, FiMicOff } from 'react-icons/fi';

export default function VoiceSearch({ isListening, isSupported, onStart, onStop }) {
  if (!isSupported) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={isListening ? onStop : onStart}
      className={`p-3 rounded-xl transition-all ${
        isListening
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 animate-pulse'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-500'
      }`}
      title={isListening ? 'Listening... Click to stop' : 'Voice Search'}
    >
      {isListening ? <FiMicOff size={20} /> : <FiMic size={20} />}
    </motion.button>
  );
}
