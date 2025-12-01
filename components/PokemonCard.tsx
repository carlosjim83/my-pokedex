'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getTypeColor, capitalize } from '@/lib/utils';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function PokemonCard({ id, name, types, isFavorite, onToggleFavorite }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(id);
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
