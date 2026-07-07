import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { CompareProvider } from './context/CompareContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CropDetailsPage from './pages/CropDetailsPage';
import ComparePage from './pages/ComparePage';
import CalendarPage from './pages/CalendarPage';
import WeatherPage from './pages/WeatherPage';
import FertilizerCalcPage from './pages/FertilizerCalcPage';
import MarketPricePage from './pages/MarketPricePage';
import CropRecommendPage from './pages/CropRecommendPage';
import UnitConverterPage from './pages/UnitConverterPage';
import DiseaseDetectPage from './pages/DiseaseDetectPage';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FavoriteProvider>
          <CompareProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/crop/:id" element={<CropDetailsPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/fertilizer-calc" element={<FertilizerCalcPage />} />
                <Route path="/market-prices" element={<MarketPricePage />} />
                <Route path="/recommend" element={<CropRecommendPage />} />
                <Route path="/converter" element={<UnitConverterPage />} />
                <Route path="/disease-detect" element={<DiseaseDetectPage />} />
              </Route>
            </Routes>
          </CompareProvider>
        </FavoriteProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
