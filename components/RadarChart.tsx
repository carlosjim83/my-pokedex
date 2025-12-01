'use client';

interface RadarChartProps {
  stats: {
    name: string;
    base_stat: number;
  }[];
}

const statLabels: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  'speed': 'SPD',
};

export default function RadarChart({ stats }: RadarChartProps) {
  const maxStat = 255;
  const size = 300;
  const center = size / 2;
  const levels = 5;
  const radius = center - 60;

  // Calculate points for each stat
  const statCount = stats.length;
  const angleStep = (Math.PI * 2) / statCount;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const distance = (value / maxStat) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const distance = radius + 40;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  // Create polygon points string
  const polygonPoints = stats
    .map((stat, i) => {
      const point = getPoint(i, stat.base_stat);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Background circles (levels) */}
        {Array.from({ length: levels }).map((_, i) => {
          const levelRadius = ((i + 1) / levels) * radius;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={levelRadius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="dark:stroke-gray-600"
            />
          );
        })}

        {/* Axes lines */}
        {stats.map((_, i) => {
          const point = getPoint(i, maxStat);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#e5e7eb"
              strokeWidth="1"
              className="dark:stroke-gray-600"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Data points */}
        {stats.map((stat, i) => {
          const point = getPoint(i, stat.base_stat);
          return (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="rgb(59, 130, 246)"
                className="transition-all duration-300 hover:r-6"
              />
            </g>
          );
        })}

        {/* Labels and values */}
        {stats.map((stat, i) => {
          const labelPoint = getLabelPoint(i);
          const label = statLabels[stat.name] || stat.name.toUpperCase();
          
          return (
            <g key={i}>
              <text
                x={labelPoint.x}
                y={labelPoint.y - 5}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-700 dark:fill-gray-300"
              >
                {label}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 10}
                textAnchor="middle"
                className="text-sm font-semibold fill-blue-600 dark:fill-blue-400"
              >
                {stat.base_stat}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
