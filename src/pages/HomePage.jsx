import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiCloud, FiCalendar, FiBarChart2, FiTool, FiTrendingUp, FiCpu, FiMic, FiArrowRight } from 'react-icons/fi';
import { GiWheat, GiCorn, GiTomato, GiFruitBowl } from 'react-icons/gi';
import crops from '../data/crops.json';

const features = [
  { icon: FiSearch, title: 'Smart Search', desc: 'Search 25+ crops by name, Hindi alias, or category', color: 'from-green-400 to-emerald-500', link: '/search' },
  { icon: FiCloud, title: 'Live Weather', desc: 'Real-time weather data with crop suitability indicators', color: 'from-blue-400 to-cyan-500', link: '/weather' },
  { icon: FiCalendar, title: 'Crop Calendar', desc: 'Month-by-month planting, growth, and harvest timeline', color: 'from-purple-400 to-violet-500', link: '/calendar' },
  { icon: FiBarChart2, title: 'Compare Crops', desc: 'Side-by-side comparison with radar charts', color: 'from-amber-400 to-orange-500', link: '/compare' },
  { icon: FiTool, title: 'Fertilizer Calculator', desc: 'Calculate exact NPK needs for your farm area', color: 'from-teal-400 to-cyan-500', link: '/fertilizer-calc' },
  { icon: FiTrendingUp, title: 'Market Prices', desc: 'MSP rates and market price trends for major crops', color: 'from-rose-400 to-pink-500', link: '/market-prices' },
  { icon: FiCpu, title: 'Crop Recommender', desc: 'AI-powered recommendations based on your conditions', color: 'from-indigo-400 to-blue-500', link: '/recommend' },
  { icon: FiMic, title: 'Voice Search', desc: 'Speak crop name to search — works in Hindi too', color: 'from-yellow-400 to-amber-500', link: '/search' },
];

const stats = [
  { value: '25+', label: 'Crops', icon: '🌾' },
  { value: '3', label: 'Seasons', icon: '🗓️' },
  { value: '100%', label: 'Mobile Ready', icon: '📱' },
  { value: '₹', label: 'MSP Data', icon: '💰' },
];

export default function HomePage() {
  const kharifCrops = crops.filter(c => c.season === 'Kharif').slice(0, 4);
  const rabiCrops = crops.filter(c => c.season === 'Rabi').slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-gray-950" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-200/30 dark:bg-green-800/10"
              style={{
                width: `${150 + i * 100}px`,
                height: `${150 + i * 100}px`,
                top: `${10 + i * 15}%`,
                left: `${-5 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <span className="text-lg">🌾</span>
              Agriculture Helper for Indian Farmers
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-gray-800 dark:text-white">Grow </span>
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">Smarter</span>
              <br />
              <span className="text-gray-800 dark:text-white">Harvest </span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Better</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Everything you need to make informed farming decisions — crop data, weather insights, fertilizer calculations, and smart recommendations in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-shadow text-lg flex items-center gap-2"
                >
                  Explore Crops <FiArrowRight />
                </motion.button>
              </Link>
              <Link to="/recommend">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transition-colors text-lg flex items-center gap-2"
                >
                  <FiCpu /> Get Recommendations
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800/80 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <span className="text-3xl mb-2 block">{s.icon}</span>
              <p className="text-3xl font-extrabold text-gray-800 dark:text-white font-mono">{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Comprehensive tools designed for Indian farmers to make data-driven decisions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={f.link} className="block group">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 hover:shadow-lg transition-all h-full">
                      <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={22} />
                      </div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">{f.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Season Showcase */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-gray-800 dark:text-white text-center mb-12"
          >
            Crops by Season
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kharif */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800"
            >
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">☀️ Kharif Season <span className="text-sm font-normal">(Jun–Nov)</span></h3>
              <div className="space-y-3">
                {kharifCrops.map(c => (
                  <Link key={c.id} to={`/crop/${c.id}`} className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{c.name}</span>
                    <span className="text-sm text-gray-400">{c.crop_duration} days</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Rabi */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800"
            >
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">❄️ Rabi Season <span className="text-sm font-normal">(Oct–Mar)</span></h3>
              <div className="space-y-3">
                {rabiCrops.map(c => (
                  <Link key={c.id} to={`/crop/${c.id}`} className="flex items-center justify-between bg-white/60 dark:bg-gray-800/60 rounded-xl p-3 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{c.name}</span>
                    <span className="text-sm text-gray-400">{c.crop_duration} days</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 shadow-2xl shadow-green-500/20"
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-green-100 mb-8 text-lg">Start exploring crop data, weather insights, and smart recommendations today.</p>
          <Link to="/search">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-shadow text-lg"
            >
              Get Started Now 🌱
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
