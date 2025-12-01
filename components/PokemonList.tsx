'use client';

import { useState } from 'react';
import { PokemonListItem } from '@/lib/data/pokemon';
import PokemonCard from './PokemonCard';
import PokemonListView from './PokemonListView';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import { useFavorites } from '@/hooks/useFavorites';

interface PokemonListProps {
  pokemonList: PokemonListItem[];
}

type ViewMode = 'grid' | 'list';

export default function PokemonList({ pokemonList }: PokemonListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
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
      
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left side - Filters and Stats */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                showFilters || selectedTypes.length > 0
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
              {selectedTypes.length > 0 && (
                <span className="bg-white/30 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  {selectedTypes.length}
                </span>
              )}
            </button>

            {/* Favorites Toggle */}
            {isLoaded && favorites.length > 0 && (
              <button
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                  showOnlyFavorites
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <svg className={`w-5 h-5 ${showOnlyFavorites ? 'fill-white' : 'fill-red-500'}`} viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="hidden sm:inline">Favorites</span>
                <span className="bg-white/30 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                  {favorites.length}
                </span>
              </button>
            )}

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {filteredPokemon.length} Pokémon
            </div>
          </div>

          {/* Right side - View Toggle */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-800 text-blue-500 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-800 text-blue-500 shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Type Filters - Collapsible */}
      {showFilters && (
        <div className="mb-6 animate-fade-in">
          <TypeFilter
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
            onClearFilters={handleClearFilters}
          />
        </div>
      )}
      
      {filteredPokemon.length > 0 ? (
        viewMode === 'grid' ? (
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
          <div className="space-y-3">
            {filteredPokemon.map((pokemon) => (
              <PokemonListView
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                isFavorite={isFavorite(pokemon.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )
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
