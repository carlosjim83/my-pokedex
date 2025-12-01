import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
}

export default function PokemonCard({ id, name }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link 
      href={`/pokemon/${name}`} 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
    >
      {/* Pokemon Number Badge */}
      <div className="absolute top-2 right-2 bg-gray-800/80 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        #{id.toString().padStart(3, '0')}
      </div>
      
      {/* Card Content */}
      <div className="flex flex-col items-center p-4">
        {/* Image Container with Background */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Image
            src={imageUrl}
            alt={name}
            width={96}
            height={96}
            className="w-20 h-20 object-contain drop-shadow-lg"
          />
        </div>
        
        {/* Pokemon Name */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white text-center capitalize group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {name}
        </h2>
      </div>
      
      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
    </Link>
  );
}
