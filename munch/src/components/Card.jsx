import React, { forwardRef } from 'react';
import TinderCard from 'react-tinder-card';

const Card = forwardRef(({ restaurant, index, onSwipe, onOutOfFrame }, ref) => {
  return (
    <TinderCard
      ref={ref}
      className="absolute w-full bg-slate-100 h-full rounded-2xl bg-cover bg-center shadow-lg"
      key={restaurant.name}
      onSwipe={(dir) => onSwipe(dir, index)}
      onCardLeftScreen={() => onOutOfFrame(restaurant.name)}
      preventSwipe={["up", "down"]}
      style={{
        backgroundImage: `url(${restaurant.image})`,
      }}
    >
      <div className="absolute bottom-0 bg-black p-6 text-white rounded-b-2xl">
        <h3 className="text-2xl font-bold">{restaurant.name}</h3>
      </div>
    </TinderCard>
  );
});

export default Card;



// import React, { forwardRef } from 'react';
// import TinderCard from 'react-tinder-card';

// const Card = forwardRef(({ restaurant, onSwipe, onOutOfFrame }, ref) => {
//   return (
//     <TinderCard
//       ref={ref}
//       className="absolute w-full bg-slate-100 h-full rounded-2xl bg-cover bg-center shadow-lg"
//       key={restaurant.name}
//       onSwipe={onSwipe}
//       onCardLeftScreen={onOutOfFrame}
//       preventSwipe={["up", "down"]}
//       style={{
//         backgroundImage: `url(${restaurant.image})`,
//       }}
//     >
//       <div className="absolute bottom-0 bg-black p-6 text-white rounded-b-2xl">
//         <h3 className="text-2xl font-bold">{restaurant.name}</h3>
//       </div>
//     </TinderCard>
//   );
// });

// export default Card;
