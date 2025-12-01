export default function PokemonListViewSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
      <div className="flex items-center gap-4 p-4">
        {/* Image Skeleton */}
        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-3">
          {/* Name and Number */}
          <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-32"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
          </div>

          {/* Types */}
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
