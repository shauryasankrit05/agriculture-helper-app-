// Helper utility functions

// Favorites management
export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('agri_favorites') || '[]');
  } catch { return []; }
}

export function toggleFavorite(cropId) {
  const favs = getFavorites();
  const idx = favs.indexOf(cropId);
  if (idx > -1) {
    favs.splice(idx, 1);
  } else {
    favs.push(cropId);
  }
  localStorage.setItem('agri_favorites', JSON.stringify(favs));
  return favs;
}

export function isFavorite(cropId) {
  return getFavorites().includes(cropId);
}

// Calendar helpers
const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMonthIndex(month) {
  return monthOrder.indexOf(month);
}

export function generateCalendarData(crop) {
  if (!crop?.calendar) return [];
  const phases = ['sowing', 'vegetative', 'flowering', 'maturity', 'harvest'];
  const phaseColors = {
    sowing: '#8b5cf6',
    vegetative: '#22c55e',
    flowering: '#f59e0b',
    maturity: '#ef4444',
    harvest: '#06b6d4'
  };

  return monthOrder.map((month) => {
    const entry = { month };
    phases.forEach(phase => {
      const months = crop.calendar[phase];
      if (months && months.includes(month)) {
        entry[phase] = 1;
        entry[`${phase}Color`] = phaseColors[phase];
      } else {
        entry[phase] = 0;
      }
    });
    return entry;
  });
}

// Fertilizer calculator
export function calculateFertilizer(crop, areaHectares) {
  if (!crop?.fertilizer) return [];
  return crop.fertilizer.map(stage => ({
    ...stage,
    urea_kg: Math.round((stage.nitrogen / 0.46) * areaHectares * 100) / 100,
    dap_kg: Math.round((stage.phosphorus / 0.46) * areaHectares * 100) / 100,
    mop_kg: Math.round((stage.potassium / 0.60) * areaHectares * 100) / 100,
    total_nitrogen: Math.round(stage.nitrogen * areaHectares * 100) / 100,
    total_phosphorus: Math.round((stage.phosphorus || 0) * areaHectares * 100) / 100,
    total_potassium: Math.round((stage.potassium || 0) * areaHectares * 100) / 100,
  }));
}

// Crop recommendation engine
export function recommendCrops(crops, params) {
  const { temperature, rainfall, soilType, season } = params;
  
  return crops
    .map(crop => {
      let score = 0;
      let maxScore = 0;
      
      // Temperature match (0-30 points)
      maxScore += 30;
      if (temperature >= crop.temperature.optimal_min && temperature <= crop.temperature.optimal_max) {
        score += 30;
      } else if (temperature >= crop.temperature.critical_min && temperature <= crop.temperature.critical_max) {
        score += 15;
      }
      
      // Season match (0-25 points)
      maxScore += 25;
      if (!season || season === 'All' || crop.season === season) {
        score += 25;
      }
      
      // Water/Rainfall match (0-25 points)
      maxScore += 25;
      if (rainfall) {
        const ratio = rainfall / crop.water_requirement;
        if (ratio >= 0.8 && ratio <= 1.5) score += 25;
        else if (ratio >= 0.5 && ratio <= 2.0) score += 15;
        else if (ratio >= 0.3) score += 5;
      } else {
        score += 15;
      }
      
      // Soil match (0-20 points)
      maxScore += 20;
      if (!soilType || soilType === 'All') {
        score += 10;
      } else if (crop.soil_type.some(s => s.toLowerCase().includes(soilType.toLowerCase()))) {
        score += 20;
      }
      
      const confidence = Math.round((score / maxScore) * 100);
      return { ...crop, confidence };
    })
    .filter(c => c.confidence > 30)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10);
}

// Season color map
export const seasonColors = {
  Kharif: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', border: 'border-green-300 dark:border-green-700' },
  Rabi: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  Summer: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
};

// Category icons
export const categoryIcons = {
  Cereals: '🌾',
  Pulses: '🫘',
  Vegetables: '🥬',
  Fruits: '🍎',
  'Cash Crops': '💰',
  Spices: '🌶️',
  Oilseeds: '🌻',
};

// Soil types
export const soilTypes = ['All', 'Sandy', 'Sandy Loam', 'Loamy', 'Clay Loam', 'Clay', 'Black Soil', 'Red Soil', 'Alluvial'];
