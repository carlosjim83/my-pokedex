interface StatBarsProps {
  stats: {
    name: string;
    base_stat: number;
  }[];
}

const statNameMapping: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed',
};

export default function StatBars({ stats }: StatBarsProps) {
  const maxStat = 255; // Max possible base stat in Pokémon

  return (
    <div className="space-y-2">
      {stats.map((stat) => (
        <div key={stat.name} className="flex items-center">
          <p className="w-28 text-sm font-medium text-gray-700 dark:text-gray-300">
            {statNameMapping[stat.name] || stat.name}
          </p>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full flex items-center justify-end px-2"
              style={{ width: `${(stat.base_stat / maxStat) * 100}%` }}
            >
              <span className="text-xs font-medium text-white">{stat.base_stat}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
