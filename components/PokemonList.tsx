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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setShowOnlyFavorites(false);
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

  const activeFiltersCount = selectedTypes.length + (showOnlyFavorites ? 1 : 0);

  return (
    <div className="flex min-h-[calc(100vh-140px)] relative">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-[140px] left-0 h-[calc(100vh-140px)] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-2xl z-40 transition-all duration-300 overflow-y-auto ${
          sidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full lg:w-20 lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="p-5 flex items-center justify-between">
            {sidebarOpen && (
              <>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters & Options
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold transition-colors px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    Clear All
                  </button>
                )}
              </>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors ml-auto group"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <svg
                className={`w-6 h-6 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110 ${
                  sidebarOpen ? '' : 'rotate-180'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Active Filters Indicator */}
          {!sidebarOpen && activeFiltersCount > 0 && (
            <div className="absolute -right-2 top-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold shadow-lg animate-pulse">
                {activeFiltersCount}
              </span>
            </div>
          )}
        </div>

        {/* Sidebar Content */}
        {sidebarOpen && (
          <div className="p-5 space-y-6">
            {/* View Mode */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Mode
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="text-xs">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="text-xs">List</span>
                </button>
              </div>
            </div>

            {/* Favorites Filter */}
            {isLoaded && favorites.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favorites
                </h3>
                <button
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                    showOnlyFavorites
                      ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm">
                    <svg className={`w-5 h-5 ${showOnlyFavorites ? 'fill-white' : 'fill-red-500'}`} viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Only Favorites
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    showOnlyFavorites ? 'bg-white/30 text-white' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                  }`}>
                    {favorites.length}
                  </span>
                </button>
              </div>
            )}

            {/* Type Filters */}
            <div>
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Pokémon Types
              </h3>
              <TypeFilter
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
                onClearFilters={() => setSelectedTypes([])}
              />
            </div>

            {/* Results Info */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800 shadow-inner">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                  Results
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {filteredPokemon.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  out of <span className="font-bold">{pokemonList.length}</span> Pokémon
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 px-6 py-8 ${sidebarOpen ? 'lg:ml-0' : 'ml-0'}`}>
        <div className="max-w-7xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl shadow-xl p-4 flex items-center justify-between font-bold text-white transition-all duration-200 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters & Options
              </span>
              {activeFiltersCount > 0 && (
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {filteredPokemon.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce">🔍</div>
              <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                No Pokémon found
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
