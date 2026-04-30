import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Sparkles } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  color: string;
  description: string;
}

const DUMMY_SONGSSource: Song[] = [
  {
    id: 1,
    title: "Neon Pulse",
    artist: "SynthAI",
    duration: 184,
    color: "#06b6d4",
    description: "Atmospheric synthwave with a driving bassline and ethereal pads."
  },
  {
    id: 2,
    title: "Digital Mirage",
    artist: "CyberBeats",
    duration: 212,
    color: "#ec4899",
    description: "High-energy glitch-hop featuring intricate percussion and vocal chops."
  },
  {
    id: 3,
    title: "Quantum Echo",
    artist: "Neural Drift",
    duration: 156,
    color: "#a855f7",
    description: "Ambient chillout track with organic textures and algorithmic melodies."
  }
];

export const MusicPlayer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  const song = DUMMY_SONGSSource[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            handleSkip(1);
            return 0;
          }
          return p + 0.5;
        });
      }, 1000);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentSongIndex]);

  const handleTogglePlay = () => setIsPlaying(!isPlaying);

  const handleSkip = (direction: number) => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentSongIndex(prev => (prev + direction + DUMMY_SONGSSource.length) % DUMMY_SONGSSource.length);
    setTimeout(() => setIsPlaying(true), 50);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex items-center gap-10">
      {/* Controls */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => handleSkip(-1)}
          className="text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <SkipBack size={24} fill="currentColor" />
        </button>
        
        <button
          onClick={handleTogglePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,243,255,0.4)] cursor-pointer"
        >
          {isPlaying ? <Pause fill="black" size={24} /> : <Play fill="black" size={24} className="translate-x-0.5" />}
        </button>

        <button 
          onClick={() => handleSkip(1)}
          className="text-white/40 hover:text-white transition-colors cursor-pointer"
        >
          <SkipForward size={24} fill="currentColor" />
        </button>
      </div>

      {/* Progress Bar Container */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between text-[11px] font-mono text-white/50 uppercase tracking-widest">
          <span>{formatTime((progress / 100) * song.duration)}</span>
          <span className="flex items-center gap-2">
            <span className="text-neon-cyan/70">{song.title}</span> — <span>{formatTime(song.duration)}</span>
          </span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden group">
          <motion.div
            className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,1)]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: isPlaying ? 1 : 0 }}
          />
        </div>
      </div>

      {/* Volume/Misc */}
      <div className="flex items-center gap-3">
        <Volume2 size={18} className="text-white/50" />
        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-white/70 w-[70%]" />
        </div>
      </div>
    </div>
  );
};
