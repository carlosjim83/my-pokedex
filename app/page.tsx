import { fetchFirstGenPokemonList, PokemonListItem } from '@/lib/data/pokemon';
import PokemonCard from '@/components/PokemonCard';

export default async function Home() {
  const pokemonList: PokemonListItem[] = await fetchFirstGenPokemonList();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-4 border-gray-800"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              Pokédex
            </h1>
          </div>
          <p className="text-center text-white/90 mt-4 text-lg">
            Discover all 151 Pokémon from Generation I
          </p>
        </div>
      </header>

      {/* Pokemon Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
          ))}
        </div>
      </div>
    </main>
  );
}
