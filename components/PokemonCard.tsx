'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTypeColor, capitalize } from '@/lib/utils';
import { useCompare } from '@/components/CompareContext';
import { PokemonListItem } from '@/lib/data/pokemon';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function PokemonCard({ id, name, types, isFavorite, onToggleFavorite }: PokemonCardProps) {
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
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
    >
      {/* Pokemon Number Badge */}
      <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        #{id.toString().padStart(3, '0')}
      </div>
      
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 left-2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 hover:scale-110 transition-transform"
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

      {/* Compare Button */}
      <button
        onClick={handleCompareClick}
        disabled={!isInCompare && selectedPokemon.length >= 3}
        className={`absolute top-12 left-2 z-10 rounded-full p-2 hover:scale-110 transition-all ${
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
      
      {/* Card Content */}
      <div className="flex flex-col items-center p-4">
        {/* Image Container with Background */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Image
            src={imageUrl}
            alt={name}
            width={96}
            height={96}
            className="w-20 h-20 object-contain drop-shadow-lg"
          />
        </div>
        
        {/* Pokemon Name */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white text-center capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {name}
        </h2>
        
        {/* Types */}
        <div className="flex gap-1 flex-wrap justify-center">
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
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
    </Link>
  );
}
