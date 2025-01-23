import React from 'react';

const SwipeButtons = ({ swipe, undoSwipe, canSwipeLeft, canUndo, canSwipeRight }) => {
  return (
    <div className="mt-4 flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md text-white ${canSwipeLeft ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"}`}
        onClick={() => swipe('left')}
        disabled={!canSwipeLeft}
      >
        Swipe Left
      </button>
      <button
        className={`px-4 py-2 rounded-md text-white ${canUndo ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
        onClick={undoSwipe}
        disabled={!canUndo}
      >
        Undo Swipe
      </button>
      <button
        className={`px-4 py-2 rounded-md text-white ${canSwipeRight ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
        onClick={() => swipe('right')}
        disabled={!canSwipeRight}
      >
        Swipe Right
      </button>
    </div>
  );
};

export default SwipeButtons;
