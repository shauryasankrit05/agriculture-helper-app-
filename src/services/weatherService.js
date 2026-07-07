// Weather service using OpenWeatherMap API
const API_KEY = ''; // Users should add their own API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Demo/fallback weather data
const demoWeather = {
  city: 'New Delhi',
  temp: 32,
  feels_like: 36,
  humidity: 65,
  wind_speed: 12,
  description: 'Partly Cloudy',
  icon: '02d',
  pressure: 1008,
  rain: 0,
  visibility: 8,
  forecast: [
    { day: 'Mon', temp_max: 34, temp_min: 26, icon: '02d', description: 'Partly Cloudy', rain: 0 },
    { day: 'Tue', temp_max: 35, temp_min: 27, icon: '01d', description: 'Clear Sky', rain: 0 },
    { day: 'Wed', temp_max: 33, temp_min: 25, icon: '10d', description: 'Light Rain', rain: 5 },
    { day: 'Thu', temp_max: 30, temp_min: 24, icon: '09d', description: 'Moderate Rain', rain: 15 },
    { day: 'Fri', temp_max: 31, temp_min: 24, icon: '10d', description: 'Light Rain', rain: 8 },
  ],
};

export async function fetchWeather(city = 'Delhi') {
  if (!API_KEY) {
    // Return demo data when no API key is configured
    return { ...demoWeather, city, isDemo: true };
  }

  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${city},IN&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();

    const forecastRes = await fetch(
      `${BASE_URL}/forecast?q=${city},IN&appid=${API_KEY}&units=metric&cnt=5`
    );
    const forecastData = await forecastRes.json();

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return {
      city: data.name,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind_speed: Math.round(data.wind.speed * 3.6),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      pressure: data.main.pressure,
      rain: data.rain?.['1h'] || 0,
      visibility: Math.round((data.visibility || 10000) / 1000),
      isDemo: false,
      forecast: forecastData.list?.map((item) => ({
        day: days[new Date(item.dt * 1000).getDay()],
        temp_max: Math.round(item.main.temp_max),
        temp_min: Math.round(item.main.temp_min),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        rain: item.rain?.['3h'] || 0,
      })) || [],
    };
  } catch {
    return { ...demoWeather, city, isDemo: true };
  }
}

export function getWeatherIcon(iconCode) {
  const iconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '🌤️';
}

export function getCropSuitability(temp, crop) {
  if (temp >= crop.temperature.optimal_min && temp <= crop.temperature.optimal_max) {
    return { level: 'Excellent', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
  }
  if (temp >= crop.temperature.critical_min && temp <= crop.temperature.critical_max) {
    return { level: 'Suitable', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' };
  }
  return { level: 'Not Suitable', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
}
