// Unit conversion functions

const conversions = {
  'kg/hectare_to_lb/acre': (v) => v * 0.8922,
  'lb/acre_to_kg/hectare': (v) => v * 1.1208,
  'mm_to_inches': (v) => v * 0.03937,
  'inches_to_mm': (v) => v * 25.4,
  'celsius_to_fahrenheit': (v) => (v * 9/5) + 32,
  'fahrenheit_to_celsius': (v) => (v - 32) * 5/9,
  'hectare_to_acre': (v) => v * 2.4711,
  'acre_to_hectare': (v) => v * 0.4047,
  'quintal_to_kg': (v) => v * 100,
  'kg_to_quintal': (v) => v / 100,
  'quintal/hectare_to_ton/acre': (v) => (v * 100 / 1000) * 0.4047,
};

export function convertUnits(value, from, to) {
  const key = `${from}_to_${to}`;
  const fn = conversions[key];
  if (!fn) return null;
  return Math.round(fn(value) * 100) / 100;
}

export const unitPairs = [
  { from: 'kg/hectare', to: 'lb/acre', label: 'Weight per Area' },
  { from: 'mm', to: 'inches', label: 'Rainfall / Irrigation' },
  { from: 'celsius', to: 'fahrenheit', label: 'Temperature' },
  { from: 'hectare', to: 'acre', label: 'Area' },
  { from: 'quintal', to: 'kg', label: 'Weight' },
  { from: 'quintal/hectare', to: 'ton/acre', label: 'Yield' },
];
