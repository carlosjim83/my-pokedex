'use client';

import { useState } from 'react';
import { PokemonListItem } from '@/lib/data/pokemon';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';

interface PokemonListProps {
  pokemonList: PokemonListItem[];
}

export default function PokemonList({ pokemonList }: PokemonListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const query = searchQuery.toLowerCase();
    const matchesName = pokemon.name.toLowerCase().includes(query);
    const matchesId = pokemon.id.toString().includes(query);
    return matchesName || matchesId;
  });

  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      
      {filteredPokemon.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
            No Pokémon found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Try searching for a different name or number
          </p>
        </div>
      )}
    </>
  );
}
