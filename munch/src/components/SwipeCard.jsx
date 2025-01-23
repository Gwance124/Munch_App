import React from "react";
import { useSpring, animated } from "react-spring";
import { useSwipeable } from "react-swipeable";

const SwipeCard = ({ restaurant, onSwipe, style }) => {
  const [{ x, rotate }, api] = useSpring(() => ({ x: 0, rotate: 0 }));

  const bind = useSwipeable({
    onSwipedLeft: () => handleSwipe(-1),
    onSwipedRight: () => handleSwipe(1),
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    api.start({ x: direction * 500, rotate: direction * 10 });
    setTimeout(onSwipe, 300);
  };

  return (
    <animated.div
      {...bind()}
      className="absolute w-full h-full bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between"
      style={{
        ...style,
        transform: x.to((x) => `translateX(${x}px)`),
        rotate: rotate.to((r) => `${r}deg`),
      }}
    >
      <img
        src={restaurant.image_url}
        alt={restaurant.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold mt-4">{restaurant.name}</h2>
      <p className="text-sm text-gray-500">
        {restaurant.categories.map((cat) => cat.title).join(", ")}
      </p>
      <p className="text-sm text-gray-600 mt-2">{restaurant.location.address1}</p>
      <p className="text-sm text-gray-600">{restaurant.location.city}, {restaurant.location.state}</p>
    </animated.div>
  );
};

export default SwipeCard;
