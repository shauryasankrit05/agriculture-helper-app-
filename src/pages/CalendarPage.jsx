import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import calendarData from '../data/calendar.json';
import crops from '../data/crops.json';

const months = calendarData.months;
const phases = calendarData.phases;

export default function CalendarPage() {
  const [selectedSeason, setSelectedSeason] = useState('All');
  const seasons = ['All', 'Kharif', 'Rabi', 'Summer'];

  const filtered = selectedSeason === 'All' ? crops : crops.filter(c => c.season === selectedSeason);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">📅 Crop Calendar</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Season-wise planting and harvesting timeline for all crops</p>
      </motion.div>

      {/* Season filter */}
      <div className="flex gap-2 mb-8">
        {seasons.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSeason(s)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSeason === s ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(phases).map(([key, phase]) => (
          <div key={key} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: phase.color }} />
            <span>{phase.icon} {phase.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-x-auto"
      >
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="text-left p-3 text-sm font-semibold text-gray-500 dark:text-gray-400 sticky left-0 bg-white dark:bg-gray-800 z-10 w-40">Crop</th>
              {months.map(m => (
                <th key={m} className="p-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {filtered.map((crop, idx) => (
              <motion.tr
                key={crop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-700/20"
              >
                <td className="p-3 sticky left-0 bg-white dark:bg-gray-800 z-10">
                  <Link to={`/crop/${crop.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors">
                    {crop.name}
                  </Link>
                </td>
                {months.map(month => {
                  const activePhase = Object.entries(phases).find(([key]) => {
                    return crop.calendar[key]?.includes(month);
                  });
                  return (
                    <td key={month} className="p-1.5">
                      {activePhase ? (
                        <div
                          className="h-6 rounded-md"
                          style={{ backgroundColor: activePhase[1].color }}
                          title={`${activePhase[1].label} — ${month}`}
                        />
                      ) : (
                        <div className="h-6 rounded-md bg-gray-50 dark:bg-gray-700/20" />
                      )}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
