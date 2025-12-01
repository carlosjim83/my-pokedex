import { fetchPokemonDetails } from '@/lib/data/pokemon';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StatBars from '@/components/StatBars';
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
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="w-full max-w-2xl">
        <Link href="/" className="text-blue-500 hover:underline mb-4 block">&larr; Back to Pokédex</Link>
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">{pokemon.name} <span className="text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span></h1>
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={200}
              height={200}
              className="my-4"
            />
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <span key={type} className="px-3 py-1 rounded-full text-white bg-gray-600 text-sm">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Details</h2>
              <p><strong>Height:</strong> {pokemon.height / 10} m</p>
              <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Base Stats</h2>
              <StatBars stats={pokemon.stats} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
