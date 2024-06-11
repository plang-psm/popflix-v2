import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="flex justify-between">
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
      <div className="w-[167px] h-[250px] bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default CardSkeleton;
