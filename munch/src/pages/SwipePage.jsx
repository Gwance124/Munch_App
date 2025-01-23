// import React, { useState, useRef, useEffect } from "react";
// import Card from "../components/Card";
// import SwipeButtons from "../components/SwipeButtons";

// const SwipePage = () => {
//   const [restaurants, setRestaurants] = useState([]); // All cards fetched from API
//   const [currentIndex, setCurrentIndex] = useState(0); // Index of the current card
//   const [lastDirection, setLastDirection] = useState(null); // Tracks swipe direction
//   const childRefs = useRef([]); // Refs for each card

//   // Fetch restaurants from backend
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       const response = await fetch("http://localhost:5000/api/restaurants");
//       const data = await response.json();
//       setRestaurants(data);
//       setCurrentIndex(data.length - 1); // Start at the last card
//     };

//     fetchRestaurants();
//   }, []);

//   const swiped = (direction, index) => {
//     setLastDirection(direction);

//     setCurrentIndex(index - 1); // Move to the next card
//   };

//   const outOfFrame = (name) => {
//     console.log(`${name} left the screen`);
//   };

//   const swipe = async (dir) => {
//     if (currentIndex >= 0 && currentIndex < restaurants.length) {
//       await childRefs.current[currentIndex].swipe(dir); // Trigger swipe programmatically
//     }
//   };

//   const undoSwipe = async () => {
//     if (currentIndex < restaurants.length - 1) {
//       const previousIndex = currentIndex + 1;
//       setCurrentIndex(previousIndex); // Move back to the previous card
//       await childRefs.current[previousIndex].restoreCard(); // Restore the card to the screen
//     }
//   };

//   return (
//     <div className="flex flex-col items-center h-screen bg-gray-200 overflow-hidden">
//       <h1 className="text-3xl font-bold mt-4 mb-6">Swipe Restaurants</h1>
//       <div className="relative w-[90%] h-[75%]">
//         {restaurants.map((restaurant, index) => (
//           <Card
//             key={restaurant.name}
//             ref={(el) => (childRefs.current[index] = el)}
//             restaurant={restaurant}
//             index={index}
//             onSwipe={swiped}
//             onOutOfFrame={outOfFrame}
//           />
//         ))}
//       </div>
//       <SwipeButtons
//         swipe={swipe}
//         undoSwipe={undoSwipe}
//         canSwipeLeft={currentIndex >= 0}
//         canUndo={currentIndex < restaurants.length - 1}
//         canSwipeRight={currentIndex >= 0}
//       />
//       {lastDirection && (
//         <p className="mt-4 text-gray-500">
//           You swiped <strong>{lastDirection}</strong>
//         </p>
//       )}
//     </div>
//   );
// };

// export default SwipePage;













import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import SwipeButtons from "../components/SwipeButtons";

const SwipePage = () => {
  const [currentRestaurant, setCurrentRestaurant] = useState(null); // The restaurant to display
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the current restaurant
  const [lastDirection, setLastDirection] = useState(null); // Tracks swipe direction
  const childRef = useRef(null); // Ref for the current card

  // Fetch a single restaurant from the backend
  const fetchRestaurant = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restaurant`);
      if (response.ok) {
        const restaurant = await response.json();
        setCurrentRestaurant(restaurant);
      } else {
        setCurrentRestaurant(null); // No more restaurants
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchRestaurant(currentIndex);
  }, [currentIndex]);

  const swiped = (direction) => {
    setLastDirection(direction);
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next restaurant
  };

  const swipe = async (dir) => {
    if (childRef.current) {
      await childRef.current.swipe(dir); // Trigger swipe programmatically
    }
  };

  const undoSwipe = async () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1); // Move back to the previous restaurant
    }
    await childRef.current.restoreCard()
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200 overflow-hidden">
      <h1 className="text-3xl font-bold mt-4 mb-6">Swipe Restaurants</h1>
      <div className="relative w-[90%] h-[75%]">
        {currentRestaurant && (
          <Card
            key={currentRestaurant.id}
            ref={childRef}
            restaurant={currentRestaurant}
            onSwipe={swiped}
          />
        )}
      </div>
      <SwipeButtons
        swipe={swipe}
        undoSwipe={undoSwipe}
        canSwipeLeft={!!currentRestaurant}
        canUndo={currentIndex > 0}
        canSwipeRight={!!currentRestaurant}
      />
      {lastDirection && (
        <p className="mt-4 text-gray-500">
          You swiped <strong>{lastDirection}</strong>
        </p>
      )}
    </div>
  );
};

export default SwipePage;




