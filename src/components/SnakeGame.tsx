import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Play, Pause } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [highScore, setHighScore] = useState(0);

  const gameLoopRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number>(0);
  const tickRate = Math.max(100 - Math.floor(score / 5) * 5, 60); // Speeds up as score increases

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Don't place food on snake
      // eslint-disable-next-line no-loop-func
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const currentDir = nextDirection;
      const newHead = {
        x: head.x + currentDir.x,
        y: head.y + currentDir.y,
      };

      // Check collisions (walls)
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check collisions (self)
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      setDirection(currentDir);
      return newSnake;
    });
  }, [gameOver, isPaused, nextDirection, food, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setNextDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const tick = (time: number) => {
      if (time - lastTickTimeRef.current > tickRate) {
        moveSnake();
        lastTickTimeRef.current = time;
      }
      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [moveSnake, tickRate]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 p-4">
      {/* HUD */}
      <div className="w-full flex justify-between items-center px-4 font-mono">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Score</span>
          <span className="text-3xl font-bold italic neon-text-green text-neon-green">
            {score.toString().padStart(5, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-white/40">Level</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white/80">{Math.floor(score / 5) + 1}</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div 
        className="relative bg-black/40 rounded-xl border-2 border-neon-cyan/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          width: `min(70vw, 400px)`,
          height: `min(70vw, 400px)`,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Render Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`rounded-[3px] transition-all duration-75 ${
              index === 0 
                ? 'bg-white neon-glow-cyan z-10' 
                : 'bg-neon-green neon-glow-green'
            }`}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
              opacity: index === 0 ? 1 : 1 - (index / snake.length) * 0.4,
              scale: index === 0 ? 1.1 : 0.85,
            }}
          />
        ))}

        {/* Render Food */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="bg-neon-pink rounded-sm neon-glow-pink"
          style={{
            gridColumnStart: food.x + 1,
            gridRowStart: food.y + 1,
            margin: '25%',
          }}
        />

        {/* Overlays */}
        <AnimatePresence>
          {(isPaused || gameOver) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark/80 backdrop-blur-md"
            >
              {gameOver ? (
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter text-white">
                    Fatal <span className="text-neon-pink">Error</span>
                  </h2>
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest pb-2">Sync Lost</p>
                  <button
                    onClick={resetGame}
                    className="group flex items-center gap-3 bg-neon-cyan text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                  >
                    <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    Reboot
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter text-white">
                    Standby
                  </h2>
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-widest pb-2">Feed Interrupted</p>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="group flex items-center gap-3 bg-neon-cyan text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                  >
                    <Play fill="black" size={16} />
                    Continue
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
