import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area
} from 'recharts';

export function CropRadarChart({ crops }) {
  if (!crops || crops.length === 0) return null;

  // Normalize values to 0-100 scale for radar
  const maxDuration = Math.max(...crops.map(c => c.crop_duration));
  const maxYield = Math.max(...crops.map(c => c.expected_yield));
  const maxWater = Math.max(...crops.map(c => c.water_requirement));

  const metrics = ['Duration', 'Yield', 'Water', 'Temp Range', 'Seed Rate'];
  const data = metrics.map(metric => {
    const entry = { metric };
    crops.forEach(crop => {
      let val = 0;
      switch(metric) {
        case 'Duration': val = (crop.crop_duration / maxDuration) * 100; break;
        case 'Yield': val = (crop.expected_yield / maxYield) * 100; break;
        case 'Water': val = (crop.water_requirement / maxWater) * 100; break;
        case 'Temp Range': val = ((crop.temperature.optimal_max - crop.temperature.optimal_min) / 25) * 100; break;
        case 'Seed Rate': val = Math.min((crop.seed.rate / 100) * 100, 100); break;
        default: break;
      }
      entry[crop.name] = Math.round(val);
    });
    return entry;
  });

  const colors = ['#22c55e', '#3b82f6', '#f59e0b'];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#9ca3af' }} />
        <PolarRadiusAxis tick={{ fontSize: 10, fill: '#9ca3af' }} domain={[0, 100]} />
        {crops.map((crop, i) => (
          <Radar
            key={crop.id}
            name={crop.name}
            dataKey={crop.name}
            stroke={colors[i]}
            fill={colors[i]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function MSPTrendChart({ priceData }) {
  if (!priceData || priceData.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={priceData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <defs>
          <linearGradient id="msp2024" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="msp2023" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="crop" tick={{ fontSize: 10, fill: '#9ca3af' }} angle={-30} textAnchor="end" height={60} />
        <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
        <Legend />
        <Area type="monotone" dataKey="msp_2024" stroke="#22c55e" fill="url(#msp2024)" strokeWidth={2} name="MSP 2024" />
        <Area type="monotone" dataKey="msp_2023" stroke="#3b82f6" fill="url(#msp2023)" strokeWidth={2} name="MSP 2023" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
