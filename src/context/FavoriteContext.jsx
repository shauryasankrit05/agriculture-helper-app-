import { createContext, useContext, useState, useCallback } from 'react';
import { getFavorites, toggleFavorite as toggleFav, isFavorite as isFav } from '../utils/helpers';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(getFavorites);

  const toggleFavorite = useCallback((cropId) => {
    const updated = toggleFav(cropId);
    setFavorites([...updated]);
  }, []);

  const isFavorite = useCallback((cropId) => {
    return favorites.includes(cropId);
  }, [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoriteProvider');
  return ctx;
}
