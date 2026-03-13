export default function DashboardSkeleton() {
  return (
    <div className="space-y-8">

      {/* summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* chart placeholder */}
      <div className="h-72 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />

      {/* table placeholder */}
      <div className="space-y-2">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        ))}
      </div>

    </div>
  )
}