'use client';

import { useCompare } from '@/components/CompareContext';
import { useEffect, useState } from 'react';
import { fetchPokemonDetails, PokemonDetail } from '@/lib/data/pokemon';
import Image from 'next/image';
import Link from 'next/link';
import { getTypeColor, capitalize } from '@/lib/utils';
import RadarChart from '@/components/RadarChart';
import { useRouter } from 'next/navigation';

export default function ComparePage() {
  const { selectedPokemon, clearCompare } = useCompare();
  const [pokemonDetails, setPokemonDetails] = useState<(PokemonDetail | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (selectedPokemon.length < 2) {
      router.push('/');
      return;
    }

    const loadDetails = async () => {
      setLoading(true);
      const details = await Promise.all(
        selectedPokemon.map(p => fetchPokemonDetails(p.name))
      );
      setPokemonDetails(details);
      setLoading(false);
    };

    loadDetails();
  }, [selectedPokemon, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Loading comparison...</p>
        </div>
      </div>
    );
  }

  const validPokemon = pokemonDetails.filter(p => p !== null) as PokemonDetail[];

  if (validPokemon.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Unable to load Pokémon details</p>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back</Link>
        </div>
      </div>
    );
  }

  const statNames = validPokemon[0].stats.map(s => s.name);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Pokédex
          </Link>
          <button
            onClick={() => {
              clearCompare();
              router.push('/');
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-full transition-colors"
          >
            Clear Comparison
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Pokémon Comparison
        </h1>

        {/* Comparison Grid */}
        <div className={`grid grid-cols-1 ${validPokemon.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 mb-12`}>
          {validPokemon.map((pokemon) => (
            <div key={pokemon.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              {/* Pokemon Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
                <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                  <Image
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    width={120}
                    height={120}
                    className="drop-shadow-2xl"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {pokemon.name}
                  <span className="block text-lg text-white/80 mt-1">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>
                </h2>
                <div className="flex gap-2 justify-center mt-3">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`${getTypeColor(type)} text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg`}
                    >
                      {capitalize(type)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">
                    Stats Overview
                  </h3>
                  <RadarChart stats={pokemon.stats} />
                </div>

                {/* Individual Stats */}
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {stat.name.replace('-', ' ')}
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {stat.base_stat}
                      </span>
                    </div>
                  ))}
                  <div className="border-t-2 border-gray-200 dark:border-gray-600 pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800 dark:text-white">
                        Total
                      </span>
                      <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Comparison Table */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Detailed Stats Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left p-4 font-bold text-gray-800 dark:text-white">Stat</th>
                  {validPokemon.map((pokemon) => (
                    <th key={pokemon.id} className="text-center p-4 font-bold text-gray-800 dark:text-white">
                      {pokemon.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {statNames.map((statName) => {
                  const values = validPokemon.map(p => p.stats.find(s => s.name === statName)?.base_stat || 0);
                  const maxValue = Math.max(...values);
                  
                  return (
                    <tr key={statName} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 capitalize">
                        {statName.replace('-', ' ')}
                      </td>
                      {validPokemon.map((pokemon, index) => {
                        const stat = pokemon.stats.find(s => s.name === statName);
                        const isMax = stat?.base_stat === maxValue;
                        
                        return (
                          <td key={pokemon.id} className="text-center p-4">
                            <span className={`text-lg font-bold ${isMax ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                              {stat?.base_stat || 0}
                              {isMax && ' 👑'}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                  <td className="p-4 text-gray-800 dark:text-white">Total</td>
                  {validPokemon.map((pokemon) => {
                    const total = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
                    const maxTotal = Math.max(...validPokemon.map(p => p.stats.reduce((sum, stat) => sum + stat.base_stat, 0)));
                    const isMax = total === maxTotal;
                    
                    return (
                      <td key={pokemon.id} className="text-center p-4">
                        <span className={`text-xl font-bold ${isMax ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'}`}>
                          {total}
                          {isMax && ' 👑'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
