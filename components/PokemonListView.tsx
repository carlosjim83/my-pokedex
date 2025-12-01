'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTypeColor, capitalize } from '@/lib/utils';
import { useCompare } from '@/context/CompareContext';
import { PokemonListItem } from '@/lib/data/pokemon';

interface PokemonListViewProps {
  id: number;
  name: string;
  types: string[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function PokemonListView({ id, name, types, isFavorite, onToggleFavorite }: PokemonListViewProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const { addToCompare, removeFromCompare, isSelected, selectedPokemon } = useCompare();
  const isInCompare = isSelected(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare) {
      removeFromCompare(id);
    } else {
      addToCompare({ id, name, types });
    }
  };

  return (
    <Link 
      href={`/pokemon/${name}`} 
      className="group flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
    >
      {/* Pokemon Image */}
      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={name}
          width={64}
          height={64}
          className="w-14 h-14 object-contain drop-shadow-lg"
        />
      </div>

      {/* Pokemon Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white capitalize truncate">
            {name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
            #{id.toString().padStart(3, '0')}
          </span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {types.map((type) => (
            <span
              key={type}
              className={`${getTypeColor(type)} text-white text-xs font-semibold px-2 py-1 rounded-full`}
            >
              {capitalize(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={handleFavoriteClick}
          className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'
            }`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <button
          onClick={handleCompareClick}
          disabled={!isInCompare && selectedPokemon.length >= 3}
          className={`p-2 rounded-full hover:scale-110 transition-all ${
            isInCompare 
              ? 'bg-blue-500 text-white' 
              : selectedPokemon.length >= 3
              ? 'bg-gray-300/50 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed'
              : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300'
          }`}
          aria-label={isInCompare ? 'Remove from compare' : 'Add to compare'}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </button>
      </div>
    </Link>
  );
}
