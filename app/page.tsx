import { fetchFirstGenPokemonList, PokemonListItem } from '@/lib/data/pokemon';
import PokemonList from '@/components/PokemonList';
import CompareBar from '@/components/CompareBar';

export default async function Home() {
  const pokemonList: PokemonListItem[] = await fetchFirstGenPokemonList();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-2xl border-b-4 border-red-800">
        <div className="px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-4 border-gray-800"></div>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Pokédex
              </h1>
              <p className="text-white/80 text-sm md:text-base mt-1">
                Generation I - Kanto Region
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Pokemon List with Sidebar */}
      <PokemonList pokemonList={pokemonList} />

      {/* Compare Bar */}
      <CompareBar />
    </main>
  );
}
