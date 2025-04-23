const SkeletonCard = () => {
  return (
    <div className="w-full h-[550px] bg-[#1a1a1a] rounded-lg animate-pulse overflow-hidden">
      <div className="h-[350px] bg-gray-800 w-full"></div>
      <div className="p-5 space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4 mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
