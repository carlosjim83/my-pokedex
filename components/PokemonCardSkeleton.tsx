export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 h-48 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>

        {/* Types */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex-1"></div>
        </div>
      </div>

      {/* Number Badge */}
      <div className="absolute top-3 right-3 w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
    </div>
  );
}
