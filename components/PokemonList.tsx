'use client';

import { useState } from 'react';
import { PokemonListItem } from '@/lib/data/pokemon';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import { useFavorites } from '@/hooks/useFavorites';

interface PokemonListProps {
  pokemonList: PokemonListItem[];
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const query = searchQuery.toLowerCase();
    const matchesName = pokemon.name.toLowerCase().includes(query);
    const matchesId = pokemon.id.toString().includes(query);
    const matchesSearch = matchesName || matchesId;

    const matchesType =
      selectedTypes.length === 0 ||
      pokemon.types.some((type) => selectedTypes.includes(type));

    const matchesFavorite = !showOnlyFavorites || isFavorite(pokemon.id);

    return matchesSearch && matchesType && matchesFavorite;
  });

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      
      <TypeFilter
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        onClearFilters={handleClearFilters}
      />

      {/* Favorites Toggle */}
      {isLoaded && favorites.length > 0 && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-semibold
              transition-all duration-200 transform hover:scale-105
              ${showOnlyFavorites
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600'
              }
            `}
          >
            <svg
              className={`w-5 h-5 ${showOnlyFavorites ? 'fill-white' : 'fill-red-500'}`}
              viewBox="0 0 24 24"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>
              {showOnlyFavorites ? `Favorites (${favorites.length})` : 'Show Favorites'}
            </span>
          </button>
        </div>
      )}
      
      {filteredPokemon.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              isFavorite={isFavorite(pokemon.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Pokémon found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </>
  );
}
