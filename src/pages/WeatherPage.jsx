import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiWind, FiDroplet, FiEye, FiThermometer } from 'react-icons/fi';
import { useWeather } from '../hooks/useWeather';
import { getWeatherIcon, getCropSuitability } from '../services/weatherService';
import { Skeleton } from '../components/Skeleton';
import crops from '../data/crops.json';

export default function WeatherPage() {
  const { weather, loading, city, changeCity } = useWeather();
  const [searchCity, setSearchCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      changeCity(searchCity.trim());
      setSearchCity('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">🌤️ Weather Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Real-time weather for better farming decisions</p>
      </motion.div>

      {/* City Search */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name... e.g. Delhi, Mumbai, Jaipur"
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-medium hover:bg-blue-600 transition-colors">
          Search
        </button>
      </form>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-2xl" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Skeleton className="h-28 rounded-xl" count={4} />
          </div>
        </div>
      ) : weather ? (
        <div className="space-y-6">
          {/* Demo notice */}
          {weather.isDemo && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
              ⚠️ Demo data — Add your OpenWeatherMap API key in <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">services/weatherService.js</code> for live data
            </div>
          )}

          {/* Main Weather Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-blue-200 text-sm mb-1">Current Weather</p>
                <h2 className="text-2xl font-bold mb-1">{weather.city}</h2>
                <p className="text-blue-100 capitalize">{weather.description}</p>
              </div>
              <div className="text-center">
                <span className="text-7xl">{getWeatherIcon(weather.icon)}</span>
                <p className="text-6xl font-extrabold mt-2 font-mono">{weather.temp}°</p>
                <p className="text-blue-200 text-sm">Feels like {weather.feels_like}°C</p>
              </div>
            </div>
          </motion.div>

          {/* Weather Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: FiDroplet, label: 'Humidity', value: `${weather.humidity}%`, color: 'text-blue-500' },
              { icon: FiWind, label: 'Wind', value: `${weather.wind_speed} km/h`, color: 'text-teal-500' },
              { icon: FiEye, label: 'Visibility', value: `${weather.visibility} km`, color: 'text-purple-500' },
              { icon: FiThermometer, label: 'Pressure', value: `${weather.pressure} hPa`, color: 'text-amber-500' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center"
                >
                  <Icon className={`mx-auto mb-2 ${s.color}`} size={22} />
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100 font-mono">{s.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Forecast */}
          {weather.forecast?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">5-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-3">
                {weather.forecast.map((f, i) => (
                  <div key={i} className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">{f.day}</p>
                    <span className="text-2xl">{getWeatherIcon(f.icon)}</span>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-2 font-mono">{f.temp_max}°</p>
                    <p className="text-xs text-gray-400 font-mono">{f.temp_min}°</p>
                    {f.rain > 0 && <p className="text-xs text-blue-400 mt-1">🌧 {f.rain}mm</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Crop Suitability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">🌡️ Crop Suitability at {weather.temp}°C</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {crops.slice(0, 12).map(crop => {
                const suit = getCropSuitability(weather.temp, crop);
                return (
                  <div key={crop.id} className={`flex items-center justify-between p-3 rounded-xl ${suit.bg}`}>
                    <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">{crop.name}</span>
                    <span className={`text-xs font-bold ${suit.color}`}>{suit.level}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
