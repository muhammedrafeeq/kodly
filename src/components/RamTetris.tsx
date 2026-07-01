"use client";

import React, { useState } from "react";

interface DeclaredVariable {
  id: string;
  name: string;
  type: string;
  size: number;
  color: string;
}

interface RamTetrisProps {
  onComplete: (xpAward: number) => void;
}

export default function RamTetris({ onComplete }: RamTetrisProps) {
  const [declaredVars, setDeclaredVars] = useState<DeclaredVariable[]>([]);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Total byte count declared
  const currentBytes = declaredVars.reduce((sum, v) => sum + v.size, 0);
  const maxBytes = 16;

  // Add variable function
  const handleDeclareVariable = (type: string, size: number, color: string) => {
    if (isFinished) return;

    if (currentBytes + size > maxBytes) {
      // Overflows! Trigger shake warning
      setIsOverflow(true);
      setTimeout(() => setIsOverflow(false), 800);
      return;
    }

    const newVar: DeclaredVariable = {
      id: Math.random().toString(36).substring(2, 9),
      name: `var_${declaredVars.length + 1}`,
      type,
      size,
      color,
    };

    const nextVars = [...declaredVars, newVar];
    setDeclaredVars(nextVars);

    // Check completion condition
    if (currentBytes + size === maxBytes) {
      setIsFinished(true);
      onComplete(10); // Award 10 XP
    }
  };

  // Remove variable function
  const handleRemoveVariable = (id: string) => {
    if (isFinished) return;
    setDeclaredVars(declaredVars.filter((v) => v.id !== id));
  };

  // Reset Game
  const resetGame = () => {
    setDeclaredVars([]);
    setIsOverflow(false);
    setIsFinished(false);
  };

  // Compile individual block items for the 16-cell grid
  const renderGridCells = () => {
    const cells = [];
    let cellIndex = 0;

    declaredVars.forEach((v) => {
      for (let i = 0; i < v.size; i++) {
        cells.push(
          <div
            key={`${v.id}-${i}`}
            onClick={() => handleRemoveVariable(v.id)}
            className={`w-full h-full border border-white/10 rounded-sm cursor-pointer transition-all duration-300 transform hover:scale-[1.05] ${v.color}`}
            title={`Click to remove variable: ${v.type} (${v.size} ${v.size === 1 ? "Byte" : "Bytes"})`}
          ></div>
        );
        cellIndex++;
      }
    });

    // Fill remaining empty cells
    for (let i = cellIndex; i < maxBytes; i++) {
      cells.push(
        <div
          key={`empty-${i}`}
          className="w-full h-full border border-dashed border-white/10 bg-white/5 rounded-sm"
        ></div>
      );
    }

    return cells;
  };

  return (
    <section className={`glass-panel p-4 rounded-xl space-y-6 border transition-all duration-300 ${
      isFinished ? "border-primary/50 shadow-[0_0_15px_rgba(0,218,243,0.2)]" : "border-white/5"
    }`}>
      <div className="space-y-1">
        <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" data-icon="grid_on">
            grid_on
          </span>
          RAM Byte Tetris
        </h3>
        <p className="text-label-sm font-label-sm text-on-surface-variant">
          Declare C variables to fill the 16-byte RAM grid exactly. Click declared blocks to remove them.
        </p>
      </div>

      {/* Grid Display */}
      <div className="relative max-w-[200px] mx-auto">
        <div className={`grid grid-cols-4 gap-1.5 p-2 bg-surface-container-lowest border rounded-xl shadow-inner ${
          isOverflow ? "border-error animate-shake" : "border-white/5"
        }`}>
          {renderGridCells()}
        </div>
      </div>

      {/* RAM meter progress */}
      <div className="space-y-1.5 max-w-xs mx-auto text-center">
        <div className="flex justify-between text-[11px] font-code-md text-on-surface-variant">
          <span>Declared Variables size:</span>
          <span className={isFinished ? "text-primary font-bold animate-pulse" : "text-on-surface font-bold"}>
            {currentBytes} / {maxBytes} Bytes
          </span>
        </div>
        <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden border border-white/5">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isFinished ? "bg-primary" : "bg-secondary"
            }`}
            style={{ width: `${(currentBytes / maxBytes) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Declared variables listing */}
      {declaredVars.length > 0 && (
        <div className="space-y-2 max-w-sm mx-auto">
          <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider block">
            Declared Variables list
          </span>
          <div className="flex flex-wrap gap-2">
            {declaredVars.map((v) => (
              <button
                key={v.id}
                onClick={() => handleRemoveVariable(v.id)}
                className="px-2.5 py-1.5 bg-surface-container-high hover:bg-red-900/40 border border-white/10 hover:border-red-500/30 rounded-lg font-code-md text-[11px] text-on-surface flex items-center gap-1.5 transition-colors cursor-pointer group"
                title="Click to remove"
              >
                <span className={`w-2 h-2 rounded-full ${v.color.split(" ")[0]}`}></span>
                <span className="text-secondary font-bold">{v.type}</span>
                <span>{v.name}</span>
                <span className="text-[9px] text-on-surface-variant group-hover:text-red-300 font-mono">({v.size} {v.size === 1 ? "Byte" : "Bytes"}) ✕</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons list */}
      {!isFinished && (
        <div className="space-y-3">
          <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider block">
            Declare Variable Block
          </span>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button
              onClick={() => handleDeclareVariable("char", 1, "bg-secondary border border-secondary/20")}
              className="flex flex-col items-center justify-center p-3 bg-surface-container-high border border-white/10 rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer active:scale-95"
            >
              <span className="text-secondary font-bold font-code-md">char</span>
              <span className="text-[10px] text-on-surface-variant/80 font-mono mt-0.5">1 Byte</span>
            </button>
            <button
              onClick={() => handleDeclareVariable("short", 2, "bg-yellow-500/30 border border-yellow-500/50")}
              className="flex flex-col items-center justify-center p-3 bg-surface-container-high border border-white/10 rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer active:scale-95"
            >
              <span className="text-yellow-400 font-bold font-code-md">short</span>
              <span className="text-[10px] text-on-surface-variant/80 font-mono mt-0.5">2 Bytes</span>
            </button>
            <button
              onClick={() => handleDeclareVariable("int", 4, "bg-primary/20 border border-primary/40")}
              className="flex flex-col items-center justify-center p-3 bg-surface-container-high border border-white/10 rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer active:scale-95"
            >
              <span className="text-primary font-bold font-code-md">int</span>
              <span className="text-[10px] text-on-surface-variant/80 font-mono mt-0.5">4 Bytes</span>
            </button>
            <button
              onClick={() => handleDeclareVariable("double", 8, "bg-pink-500/20 border border-pink-500/40")}
              className="flex flex-col items-center justify-center p-3 bg-surface-container-high border border-white/10 rounded-xl hover:bg-surface-container-highest transition-colors cursor-pointer active:scale-95"
            >
              <span className="text-pink-400 font-bold font-code-md">double</span>
              <span className="text-[10px] text-on-surface-variant/80 font-mono mt-0.5">8 Bytes</span>
            </button>
          </div>
        </div>
      )}

      {/* Finished view */}
      {isFinished && (
        <div className="p-4 bg-primary-container/10 border border-primary/20 rounded-xl flex items-center justify-between text-xs text-primary-fixed-dim animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            <div>
              <span className="font-bold block text-sm">Memory Aligned!</span>
              Your variables fit the 16-byte RAM boundary perfectly. Memory is clean and balanced!
            </div>
          </div>
          <button
            onClick={resetGame}
            className="px-3.5 py-1.5 border border-primary/30 rounded-lg font-bold hover:bg-primary/25 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}
