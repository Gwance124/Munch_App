import React from 'react';
import ReviewCard from '../components/ReviewCard';

const ProfilePage = () => {
  const userReviews = [
    { restaurantName: 'Sushi Place', rating: 4.5, review: 'Amazing sushi!' },
    { restaurantName: 'Burger Joint', rating: 3.5, review: 'Decent burgers.' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <p className="text-gray-600 mt-2">Welcome back! Here’s what you’ve been up to:</p>
      <div className="mt-4 space-y-4">
        {userReviews.map((review, index) => (
          <ReviewCard
            key={index}
            restaurantName={review.restaurantName}
            rating={review.rating}
            review={review.review}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
