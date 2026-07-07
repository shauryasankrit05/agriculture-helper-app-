import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCompare } from '../context/CompareContext';
import {
  FiSun, FiMoon, FiMenu, FiX, FiSearch, FiHome,
  FiCalendar, FiBarChart2, FiCloud, FiTool, FiCpu, FiActivity
} from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';

const navLinks = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/search', label: 'Crops', icon: FiSearch },
  { path: '/calendar', label: 'Calendar', icon: FiCalendar },
  { path: '/weather', label: 'Weather', icon: FiCloud },
  { path: '/compare', label: 'Compare', icon: FiBarChart2 },
  { path: '/fertilizer-calc', label: 'Calculator', icon: FiTool },
  { path: '/market-prices', label: 'Prices', icon: FiActivity },
  { path: '/recommend', label: 'Recommend', icon: FiCpu },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { compareList } = useCompare();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25"
              >
                <GiWheat className="text-white text-xl" />
              </motion.div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent hidden sm:block">
                AgriHelper
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                    }`}
                  >
                    <Icon size={16} />
                    {link.label}
                    {link.path === '/compare' && compareList.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                        {compareList.length}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-green-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </motion.button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
            >
              <div className="p-4 space-y-1">
                {navLinks.map(link => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon size={18} />
                      {link.label}
                      {link.path === '/compare' && compareList.length > 0 && (
                        <span className="ml-auto w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                          {compareList.length}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
