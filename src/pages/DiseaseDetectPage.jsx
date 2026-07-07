import { motion } from 'framer-motion';
import { FiUploadCloud, FiCamera, FiCpu, FiCheckCircle } from 'react-icons/fi';

export default function DiseaseDetectPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">🔬 Disease Detection</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">AI-powered crop disease identification from leaf images</p>
      </motion.div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white shadow-2xl shadow-purple-500/20 mb-8"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-6xl mb-6"
        >
          🧬
        </motion.div>
        <h2 className="text-3xl font-extrabold mb-3">Coming Soon</h2>
        <p className="text-purple-100 text-lg max-w-md mx-auto">
          We're training our AI model using the PlantVillage dataset to identify 38+ crop diseases from leaf images.
        </p>
      </motion.div>

      {/* How it will work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">How It Will Work</h3>
        <div className="space-y-6">
          {[
            { icon: FiCamera, title: 'Capture', desc: 'Take a photo of the affected leaf using your phone camera', color: 'from-blue-400 to-cyan-500' },
            { icon: FiUploadCloud, title: 'Upload', desc: 'Upload the image to our AI analysis system', color: 'from-purple-400 to-violet-500' },
            { icon: FiCpu, title: 'Analyze', desc: 'Our TensorFlow.js model processes the image in real-time', color: 'from-amber-400 to-orange-500' },
            { icon: FiCheckCircle, title: 'Result', desc: 'Get disease identification, severity, and treatment recommendations', color: 'from-green-400 to-emerald-500' },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100">Step {i + 1}: {step.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Placeholder Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center bg-gray-50/50 dark:bg-gray-800/50"
      >
        <FiUploadCloud className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={48} />
        <p className="text-gray-400 dark:text-gray-500 font-medium">Upload area will be enabled in a future update</p>
        <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">Supported: JPG, PNG, WEBP (max 5MB)</p>
      </motion.div>

      {/* Tech Stack */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3">🛠️ Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {['TensorFlow.js', 'PlantVillage Dataset', 'CNN Model', '38+ Diseases', 'Real-time Analysis', 'Treatment Suggestions'].map(t => (
            <span key={t} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
