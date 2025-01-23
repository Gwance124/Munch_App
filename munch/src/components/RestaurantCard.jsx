import React from 'react';

const RestaurantCard = ({ restaurant }) => {
  const { name, image, topPicks } = restaurant;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold mt-2">{name}</h2>
      <p className="text-sm text-gray-500">{topPicks.join(', ')}</p>
    </div>
  );
};

export default RestaurantCard;
