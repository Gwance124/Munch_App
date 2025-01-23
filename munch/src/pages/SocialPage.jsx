import React from 'react';
import ReviewCard from '../components/ReviewCard';

const SocialPage = () => {
  const friendActivity = [
    { restaurantName: 'Pizza Palace', rating: 5.0, review: 'Best pizza ever!' },
    { restaurantName: 'Taco Spot', rating: 4.0, review: 'Great tacos!' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Social</h1>
      <p className="text-gray-600 mt-2">See what your friends and foodies with similar tastes are up to:</p>
      <div className="mt-4 space-y-4">
        {friendActivity.map((activity, index) => (
          <ReviewCard
            key={index}
            restaurantName={activity.restaurantName}
            rating={activity.rating}
            review={activity.review}
          />
        ))}
      </div>
    </div>
  );
};

export default SocialPage;
