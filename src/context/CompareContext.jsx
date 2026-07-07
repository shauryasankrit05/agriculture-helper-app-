import { createContext, useContext, useState, useCallback } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = useCallback((cropId) => {
    setCompareList(prev => {
      if (prev.includes(cropId) || prev.length >= 3) return prev;
      return [...prev, cropId];
    });
  }, []);

  const removeFromCompare = useCallback((cropId) => {
    setCompareList(prev => prev.filter(id => id !== cropId));
  }, []);

  const isInCompare = useCallback((cropId) => {
    return compareList.includes(cropId);
  }, [compareList]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
