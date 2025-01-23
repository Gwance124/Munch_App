import React from 'react';

const ReviewCard = ({ restaurantName, rating, review }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-bold">{restaurantName}</h2>
      <div className="flex items-center space-x-2">
        <p className="text-yellow-500 font-semibold">{rating.toFixed(1)}⭐</p>
      </div>
      <p className="text-gray-700 mt-2">{review}</p>
    </div>
  );
};

export default ReviewCard;
