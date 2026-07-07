import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">🌾 AgriHelper</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Empowering Indian farmers with instant access to crop information, weather data, and smart recommendations.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Data Sources</h4>
              <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <li>National Institute of Agricultural Sciences</li>
                <li>Indian Council of Agricultural Research</li>
                <li>FAO Agricultural Database</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Features</h4>
              <ul className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                <li>25 Crops with Full Data</li>
                <li>Weather Integration</li>
                <li>Fertilizer Calculator</li>
                <li>Crop Recommendation Engine</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400 dark:text-gray-500">
            Made with 🌱 for Indian Farmers | © {new Date().getFullYear()} AgriHelper
          </div>
        </div>
      </footer>
    </div>
  );
}
