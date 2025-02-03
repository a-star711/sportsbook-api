const SkeletonTable = () => (
  <div className="space-y-2 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-[#1e1e24] p-2 rounded-lg">
        <div className="grid grid-cols-[minmax(0,1fr)_420px] items-center">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-6 bg-gray-600 rounded"></div>
            <div className="h-6 bg-gray-600 rounded"></div>
            <div className="h-6 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SkeletonTable;
