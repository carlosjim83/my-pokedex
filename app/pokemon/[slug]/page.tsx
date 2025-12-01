import { fetchPokemonDetails } from '@/lib/data/pokemon';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StatBars from '@/components/StatBars';
import RadarChart from '@/components/RadarChart';
import { getTypeColor, capitalize } from '@/lib/utils';
import { fetchFirstGenPokemonList } from '@/lib/data/pokemon';

interface PokemonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const pokemonList = await fetchFirstGenPokemonList();
 
  return pokemonList.map((pokemon) => ({
    slug: pokemon.name,
  }));
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { slug } = await params;
  const pokemon = await fetchPokemonDetails(slug);

  if (!pokemon) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold mb-6 transition-colors group">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Pokédex
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Image
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold mb-2">
                  {pokemon.name}
                  <span className="text-white/80 ml-4 text-3xl">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>
                </h1>
                <div className="flex gap-2 justify-center md:justify-start mt-4">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className={`${getTypeColor(type)} text-white text-lg font-semibold px-4 py-2 rounded-full shadow-lg`}
                    >
                      {capitalize(type)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {pokemon.description}
            </p>
          </div>

          {/* Content Grid */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Physical Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Physical Attributes
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Bars */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Base Stats
                </h3>
                <StatBars stats={pokemon.stats} />
              </div>
            </div>

            {/* Radar Chart */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Stats Overview
              </h2>
              <RadarChart stats={pokemon.stats} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
