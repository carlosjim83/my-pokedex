'use client';

import { useCompare } from '@/components/CompareContext';
import Image from 'next/image';
import Link from 'next/link';
import { getTypeColor, capitalize } from '@/lib/utils';

export default function CompareBar() {
  const { selectedPokemon, removeFromCompare, clearCompare } = useCompare();

  if (selectedPokemon.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-4 border-blue-500 shadow-2xl z-50 animate-slide-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <h3 className="font-bold text-gray-800 dark:text-white whitespace-nowrap">
              Compare ({selectedPokemon.length}/3)
            </h3>
            
            {selectedPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-2 min-w-fit"
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-semibold text-gray-800 dark:text-white">
                  {pokemon.name}
                </span>
                <button
                  onClick={() => removeFromCompare(pokemon.id)}
                  className="text-red-500 hover:text-red-700 transition-colors ml-2"
                  aria-label={`Remove ${pokemon.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {selectedPokemon.length >= 2 && (
              <Link
                href="/compare"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                Compare Now
              </Link>
            )}
            <button
              onClick={clearCompare}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold px-4 py-3 rounded-full transition-all duration-200"
              aria-label="Clear all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
