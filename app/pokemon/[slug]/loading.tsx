export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-2xl border-b-4 border-red-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-4 border-gray-800"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                  Pokédex
                </h1>
                <p className="text-white/80 text-sm md:text-base mt-1">
                  Loading Pokémon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto animate-pulse">
          {/* Back Button Skeleton */}
          <div className="mb-8">
            <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>

          {/* Main Card Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-gray-200 dark:border-gray-700">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="h-10 w-48 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
                <div className="h-10 w-24 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-20 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                <div className="h-8 w-20 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex flex-col items-center">
                  <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                  {/* Description */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                  </div>

                  {/* Physical Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Radar Chart Skeleton */}
              <div className="mt-8 flex justify-center">
                <div className="w-80 h-80 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
