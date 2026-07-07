import { useState, useEffect, useCallback } from 'react';
import { fetchWeather } from '../services/weatherService';

export function useWeather(defaultCity = 'Delhi') {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(defaultCity);

  const loadWeather = useCallback(async (searchCity) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(searchCity || city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    loadWeather(city);
  }, [city, loadWeather]);

  const changeCity = useCallback((newCity) => {
    setCity(newCity);
  }, []);

  return { weather, loading, error, city, changeCity, refresh: () => loadWeather(city) };
}
