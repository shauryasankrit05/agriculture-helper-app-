import { motion } from 'framer-motion';
import calendarData from '../data/calendar.json';

const months = calendarData.months;
const phases = calendarData.phases;

export default function CropCalendar({ crop }) {
  if (!crop?.calendar) return null;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 overflow-x-auto"
      >
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Growth Calendar — {crop.name}</h3>

        {/* Timeline Grid */}
        <div className="min-w-[700px]">
          {/* Month headers */}
          <div className="grid grid-cols-13 gap-1 mb-3">
            <div className="text-xs font-semibold text-gray-400 text-right pr-2">Phase</div>
            {months.map(m => (
              <div key={m} className="text-center text-xs font-bold text-gray-500 dark:text-gray-400">{m}</div>
            ))}
          </div>

          {/* Phase rows */}
          {Object.entries(phases).map(([key, phase], phaseIdx) => {
            const activeMonths = crop.calendar[key] || [];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: phaseIdx * 0.1 }}
                className="grid grid-cols-13 gap-1 mb-2"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 text-right pr-2 flex items-center justify-end gap-1">
                  <span>{phase.icon}</span>
                  <span className="hidden sm:inline">{phase.label}</span>
                </div>
                {months.map(month => {
                  const isActive = activeMonths.includes(month);
                  return (
                    <div
                      key={month}
                      className={`h-8 rounded-md transition-all duration-300 ${
                        isActive
                          ? 'shadow-sm'
                          : 'bg-gray-50 dark:bg-gray-700/30'
                      }`}
                      style={isActive ? { backgroundColor: phase.color } : {}}
                      title={isActive ? `${phase.label} — ${month}` : ''}
                    />
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(phases).map(([key, phase]) => (
          <div key={key} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: phase.color }} />
            <span>{phase.icon} {phase.label}</span>
          </div>
        ))}
      </div>

      {/* Season Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700"
      >
        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">📋 Season Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sowing Period</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">{(crop.calendar.sowing || []).join(' – ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌸</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Flowering</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">{(crop.calendar.flowering || []).join(' – ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚜</span>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Harvest Window</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200">{(crop.calendar.harvest || []).join(' – ')}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
