import React from 'react';

const StarRating = ({ rating, onRate }) => {
  const stars = Array.from({ length: 10 }, (_, i) => i / 2);

  return (
    <div className="flex">
      {stars.map(value => (
        <button
          key={value}
          className={`text-xl ${
            value <= rating ? 'text-yellow-500' : 'text-gray-300'
          }`}
          onClick={() => onRate(value)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
