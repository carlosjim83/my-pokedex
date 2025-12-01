export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Pokéball Spinner */}
      <div className="relative w-20 h-20 animate-spin">
        <div className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full border-4 border-gray-800 dark:border-gray-200"></div>
        </div>
      </div>
      
      <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
        Loading Pokémon...
      </p>
    </div>
  );
}
