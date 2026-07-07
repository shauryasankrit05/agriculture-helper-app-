// Search engine with alias matching and fuzzy search
export function searchCrops(crops, query, filters = {}) {
  let results = [...crops];

  // Apply text search
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter(crop => {
      const nameMatch = crop.name.toLowerCase().includes(q);
      const sciMatch = crop.scientific_name.toLowerCase().includes(q);
      const familyMatch = crop.family.toLowerCase().includes(q);
      const aliasMatch = crop.aliases?.some(a => a.toLowerCase().includes(q));
      const categoryMatch = crop.category.toLowerCase().includes(q);
      return nameMatch || sciMatch || familyMatch || aliasMatch || categoryMatch;
    });
  }

  // Apply season filter
  if (filters.season && filters.season !== 'All') {
    results = results.filter(crop => crop.season === filters.season);
  }

  // Apply category filter
  if (filters.category && filters.category !== 'All') {
    results = results.filter(crop => crop.category === filters.category);
  }

  return results;
}

// Get unique categories from crops
export function getCategories(crops) {
  return ['All', ...new Set(crops.map(c => c.category))];
}

// Get unique seasons from crops
export function getSeasons() {
  return ['All', 'Kharif', 'Rabi', 'Summer'];
}
