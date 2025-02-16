import React, { useState, useEffect } from "react";

const ShuffleGrid: React.FC = () => {
  const generateShuffledNumbers = (): number[] => {
    return Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  };

  const getRandomStartNumber = (): number => Math.floor(Math.random() * 9) + 1;

  const [shuffledNumbers, setShuffledNumbers] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [successCount, setSuccessCount] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [startNumber, setStartNumber] = useState(getRandomStartNumber()); // Stores initial start number
  const [currentNumber, setCurrentNumber] = useState(startNumber); // Controls current game progress

  useEffect(() => {
    setShuffledNumbers(generateShuffledNumbers());

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (num: number): void => {
    if (gameOver) return;

    if (num === currentNumber) {
      setSelectedNumbers((prev) => [...prev, num]);
      setCurrentNumber((prev) => prev + 1); // Go to next sequential number
      setSuccessCount((prev) => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleReset = () => {
    const newStartNumber = getRandomStartNumber();
    setShuffledNumbers(generateShuffledNumbers());
    setGameOver(false);
    setTimeLeft(30);
    setSuccessCount(0);
    setStartNumber(newStartNumber);
    setCurrentNumber(newStartNumber); // Reset to new random number
    setSelectedNumbers([]);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white">
      <div className="p-6 max-w-md w-full text-center bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Number Sequence Game</h2>
        <p className="mb-2 text-lg">
          Find numbers in sequence starting from:{" "}
          <span className="font-bold">{startNumber}</span>
        </p>
        <p className="mb-4 text-lg font-semibold">Time Left: {timeLeft} seconds</p>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {shuffledNumbers.map((num, index) => (
            <div
              key={index}
              onClick={() => handleClick(num)}
              className={`w-16 h-16 flex items-center justify-center text-white text-xl font-bold rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
                selectedNumbers.includes(num)
                  ? "bg-green-500"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        <p className="text-lg font-semibold">Score: {successCount}</p>
        {gameOver && <p className="text-red-500 font-bold mt-4 text-xl">Game Over!</p>}
        {gameOver && (
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-3 bg-red-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default ShuffleGrid;
