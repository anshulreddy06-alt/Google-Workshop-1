/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Github, Music, Gamepad2, Layers, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg-dark text-white font-sans p-6 box-border">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-neon-cyan/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[40%] h-[40%] bg-neon-pink/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full h-full grid grid-cols-[280px_1fr_280px] grid-rows-[80px_1fr_100px] gap-5">
        {/* HEADER */}
        <header className="col-span-3 glass-panel flex items-center justify-between px-6">
          <div className="text-2xl font-black tracking-[2px] text-neon-cyan neon-text-cyan flex items-center gap-3 italic">
            <Gamepad2 size={24} />
            NEON_SNAKE.OS
          </div>
          
          <div className="flex gap-10">
             <div className="text-center group">
                <p className="text-[10px] uppercase text-white/50 tracking-widest mb-1 group-hover:text-neon-green transition-colors">System Integrity</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green neon-glow-green" />
                  <span className="text-xl font-mono text-neon-green neon-text-green">98.4%</span>
                </div>
             </div>
             <div className="text-center">
                <p className="text-[10px] uppercase text-white/50 tracking-widest mb-1">Process ID</p>
                <span className="text-xl font-mono text-white/80">#402-SYN</span>
             </div>
          </div>

          <div className="text-xs text-neon-pink flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
            SYSTEM_ACTIVE
          </div>
        </header>

        {/* LEFT SIDEBAR: Music Feed & Extra Stats */}
        <aside className="glass-panel flex flex-col p-5 gap-6 overflow-hidden">
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase text-white/70 tracking-widest border-b border-white/10 pb-2 flex items-center gap-2">
              <Music size={12} className="text-neon-cyan" />
              Music Feed
            </h4>
            <div className="space-y-3">
              {['Cyber Drift', 'Neon Pulse', 'Data Stream'].map((track, i) => (
                <div key={track} className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${i === 0 ? 'bg-neon-cyan/10 border-l-4 border-neon-cyan' : 'bg-white/[0.03] hover:bg-white/[0.08]'}`}>
                  <div className="w-10 h-10 bg-[#1a1a2e] rounded-lg flex items-center justify-center text-lg">
                    {['✨', '🌙', '⚡'][i]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{track}</p>
                    <p className="text-[11px] opacity-60">A.I. {['Synth-Wave', 'Lo-Fi', 'Glitch'][i]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            <h4 className="text-[10px] uppercase text-white/70 tracking-widest flex items-center gap-2">
              <Sparkles size={12} className="text-neon-purple" />
              Neural Diagnostics
            </h4>
            <div className="space-y-3">
              <div className="space-y-1">
                 <div className="flex justify-between text-[9px] text-white/40 uppercase font-mono">
                   <span>Synapse Sync</span>
                   <span>65%</span>
                 </div>
                 <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-neon-purple" />
                 </div>
              </div>
              <div className="space-y-1">
                 <div className="flex justify-between text-[9px] text-white/40 uppercase font-mono">
                   <span>BPM Buffer</span>
                   <span>88%</span>
                 </div>
                 <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '88%' }} className="h-full bg-neon-cyan" />
                 </div>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER: Game Viewport */}
        <main className="glass-panel flex flex-col items-center justify-center relative overflow-hidden group">
          <SnakeGame />
          <div className="absolute bottom-8 text-[11px] opacity-40 tracking-[4px] uppercase pointer-events-none group-hover:opacity-60 transition-opacity">
            W A S D - TO NAVIGATE
          </div>
        </main>

        {/* RIGHT SIDEBAR: Now Playing Detail */}
        <aside className="glass-panel flex flex-col p-6 items-center text-center">
          <h4 className="w-full text-left text-[10px] uppercase text-white/70 tracking-widest mb-8 border-b border-white/10 pb-2">
            Current Stream
          </h4>
          
          <div className="w-[180px] h-[180px] bg-gradient-to-br from-[#121212] to-[#2a2a2a] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center text-6xl mb-8 group hover:scale-105 transition-transform duration-500">
             💿
          </div>

          <h2 className="text-2xl font-bold mb-1">Cyber Drift</h2>
          <p className="text-sm text-neon-cyan opacity-80 font-medium mb-8">Neural-Network Audio #402</p>

          <div className="w-full text-left space-y-4 pt-8 border-t border-white/10 text-white/50 text-xs font-mono leading-relaxed">
            <p className="flex items-center gap-2"><span className="w-1 h-1 bg-neon-cyan rounded-full" /> Visualizing frequency analysis...</p>
            <p className="flex items-center gap-2"><span className="w-1 h-1 bg-neon-pink rounded-full" /> Snake speed linked to BPM: 128</p>
            <p className="flex items-center gap-2"><span className="w-1 h-1 bg-neon-green rounded-full" /> Current Sync: 99.2%</p>
          </div>
          
          <div className="mt-auto flex gap-4 w-full">
             <button className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <Github size={18} className="mx-auto" />
             </button>
             <button className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white group">
                <Layers size={18} className="mx-auto group-hover:rotate-180 transition-transform duration-500" />
             </button>
          </div>
        </aside>

        {/* FOOTER: Global Player Controls */}
        <footer className="col-span-3 glass-panel flex items-center px-10 gap-10">
          <MusicPlayer />
        </footer>
      </div>
    </div>
  );
}

