// SlotMachine.js
import React, { useState, useEffect } from 'react';
import Reel from './Reel';
// import './SlotMachine.css';

const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉'];

const getRandomSymbol = () => {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
};

const SlotMachine = () => {
  const [reels, setReels] = useState(Array(3).fill(symbols[0]));
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (spinning) {
      const spinDuration = 2000; // 2 seconds spinning animation
      const interval = setInterval(() => {
        const newReels = reels.map(() => getRandomSymbol());
        setReels(newReels);
      }, 100); // Interval for changing symbols during spin animation

      setTimeout(() => {
        clearInterval(interval);
        setSpinning(false);
      }, spinDuration);

      return () => clearInterval(interval);
    }
  }, [spinning, reels]);

  const spinReels = () => {
    if (!spinning) {
      setSpinning(true);
    }
  };

  return (
    <div className="slot-machine">
      <div className="reels">
        {reels.map((symbol, index) => (
          <Reel key={index} symbol={symbol} />
        ))}
      </div>
      <button className="spin-button" onClick={spinReels} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
};

export default SlotMachine;
