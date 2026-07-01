"use client";

import React, { useState, useEffect, useCallback } from "react";

interface TypeChefProps {
  onComplete: (xpAward: number) => void;
}

type CType = "int" | "float" | "char" | "double";

interface Ingredient {
  id: number;
  value: string;
  correctType: CType;
}

const INGREDIENT_POOL: Ingredient[] = [
  { id: 1,  value: "42",         correctType: "int"    },
  { id: 2,  value: "-17",        correctType: "int"    },
  { id: 3,  value: "1000",       correctType: "int"    },
  { id: 4,  value: "3.14",       correctType: "float"  },
  { id: 5,  value: "-0.5",       correctType: "float"  },
  { id: 6,  value: "9.99",       correctType: "float"  },
  { id: 7,  value: "'A'",        correctType: "char"   },
  { id: 8,  value: "'z'",        correctType: "char"   },
  { id: 9,  value: "'$'",        correctType: "char"   },
  { id: 10, value: "3.14159265", correctType: "double" },
  { id: 11, value: "0.000001",   correctType: "double" },
  { id: 12, value: "1.7e308",    correctType: "double" },
];

const VESSELS: { type: CType; label: string; emoji: string; color: string; bg: string; border: string; desc: string }[] = [
  { type: "int",    label: "int",    emoji: "🍲", color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-blue-500/40",   desc: "Whole numbers only" },
  { type: "float",  label: "float",  emoji: "🫕", color: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/40", desc: "Short decimals" },
  { type: "char",   label: "char",   emoji: "☕", color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/40",  desc: "Single character" },
  { type: "double", label: "double", emoji: "🪣", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/40", desc: "Precise decimals" },
];

let nextId = 100;

export default function TypeChef({ onComplete }: TypeChefProps) {
  const [queue, setQueue] = useState<Ingredient[]>([]);
  const [current, setCurrent] = useState<Ingredient | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean; vessel: CType | null } | null>(null);
  const [exploding, setExploding] = useState<CType | null>(null);
  const [sizzling, setSizzling] = useState<CType | null>(null);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);

  const TOTAL = 10;

  // Shuffle and build queue
  const buildQueue = useCallback(() => {
    const shuffled = [...INGREDIENT_POOL]
      .sort(() => Math.random() - 0.5)
      .slice(0, TOTAL)
      .map(i => ({ ...i, id: nextId++ }));
    setQueue(shuffled.slice(1));
    setCurrent(shuffled[0]);
    setScore(0);
    setLives(3);
    setWon(false);
    setGameOver(false);
    setFeedback(null);
    setStreak(0);
  }, []);

  useEffect(() => { buildQueue(); }, [buildQueue]);

  // Drop ingredient into vessel
  const drop = (vesselType: CType) => {
    if (!current || feedback) return;

    if (vesselType === current.correctType) {
      // ✅ Correct
      const newStreak = streak + 1;
      setStreak(newStreak);
      const newScore = score + 1;
      setScore(newScore);
      setSizzling(vesselType);
      setFeedback({ msg: newStreak >= 3 ? `🔥 ${newStreak}x Streak! ${current.value} → ${vesselType}` : `✅ Correct! ${current.value} is a ${vesselType}`, ok: true, vessel: vesselType });

      setTimeout(() => {
        setSizzling(null);
        setFeedback(null);
        if (newScore >= TOTAL) {
          setWon(true);
          if (!completed) { setCompleted(true); onComplete(10); }
        } else {
          const [next, ...rest] = queue;
          setCurrent(next || null);
          setQueue(rest);
        }
      }, 900);

    } else {
      // ❌ Wrong — explosion
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);
      setExploding(vesselType);
      setFeedback({ msg: `💥 Wrong vessel! ${current.value} needs ${current.correctType}`, ok: false, vessel: vesselType });

      setTimeout(() => {
        setExploding(null);
        setFeedback(null);
        if (newLives <= 0) {
          setGameOver(true);
        } else {
          // Skip to next ingredient
          const [next, ...rest] = queue;
          setCurrent(next || null);
          setQueue(rest);
        }
      }, 1000);
    }
  };

  return (
    <section className={`glass-panel p-5 rounded-xl space-y-5 border transition-all duration-300 ${
      won ? "border-primary/50 shadow-[0_0_25px_rgba(0,218,243,0.2)]"
      : gameOver ? "border-error/40"
      : "border-white/5"
    }`}>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface flex items-center gap-2">
            🍳 Type Chef Kitchen
          </h3>
          <p className="text-[11px] text-on-surface-variant font-sans mt-0.5">
            Drop each ingredient into the correct vessel based on its C datatype!
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-primary font-bold">{score}/{TOTAL}</span>
          <span>{Array.from({ length: 3 }).map((_, i) => i < lives ? "❤️" : "🖤").join("")}</span>
          {streak >= 2 && <span className="text-amber-400 font-bold animate-pulse">🔥 {streak}x</span>}
        </div>
      </div>

      {/* Kitchen — Vessels row */}
      <div className="grid grid-cols-4 gap-3">
        {VESSELS.map(v => (
          <button
            key={v.type}
            disabled={!current || !!feedback || won || gameOver}
            onClick={() => drop(v.type)}
            className={`
              relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer
              transition-all duration-200 active:scale-95 disabled:cursor-not-allowed
              ${v.bg} ${v.border}
              ${sizzling === v.type ? "scale-105 shadow-[0_0_20px_rgba(0,218,243,0.4)] border-primary" : ""}
              ${exploding === v.type ? "animate-shake scale-95 border-error bg-error/20" : ""}
              ${!current || feedback ? "opacity-60" : "hover:scale-[1.03] hover:shadow-lg"}
            `}
          >
            {/* Explosion overlay */}
            {exploding === v.type && (
              <div className="absolute inset-0 flex items-center justify-center text-3xl animate-ping pointer-events-none rounded-xl">
                💥
              </div>
            )}

            {/* Sizzle overlay */}
            {sizzling === v.type && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl animate-bounce pointer-events-none">
                ✨
              </div>
            )}

            <span className="text-3xl select-none">{v.emoji}</span>
            <span className={`text-xs font-mono font-bold ${v.color}`}>{v.label}</span>
            <span className="text-[9px] text-on-surface-variant text-center leading-tight">{v.desc}</span>
          </button>
        ))}
      </div>

      {/* Ingredient display */}
      <div className="relative flex flex-col items-center justify-center min-h-[90px]">
        {!won && !gameOver && current && (
          <div className="flex flex-col items-center gap-2 animate-fadeIn">
            <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Incoming ingredient</p>
            <div className={`px-6 py-3 rounded-xl border-2 font-mono font-black text-xl text-on-surface bg-surface-container-high border-white/20 shadow-lg transition-all duration-300 ${
              feedback ? feedback.ok ? "border-primary/60 bg-primary/10" : "border-error/60 bg-error/10 animate-shake" : ""
            }`}>
              {current.value}
            </div>
            <p className="text-[10px] font-mono text-on-surface-variant">
              Remaining: {queue.length} more
            </p>
          </div>
        )}

        {/* Feedback bar */}
        {feedback && (
          <div className={`absolute bottom-0 left-0 right-0 text-center text-xs font-mono font-bold py-1.5 rounded-lg transition-all ${
            feedback.ok ? "text-primary bg-primary/10" : "text-error bg-error/10"
          }`}>
            {feedback.msg}
          </div>
        )}
      </div>

      {/* Game Over / Win overlay */}
      {(won || gameOver) && (
        <div className={`flex flex-col items-center gap-3 py-4 rounded-xl border ${
          won ? "bg-primary/10 border-primary/30" : "bg-error/10 border-error/30"
        }`}>
          <span className="text-4xl">{won ? "🏆" : "😵"}</span>
          <p className={`font-bold text-sm font-mono ${won ? "text-primary animate-pulse" : "text-error"}`}>
            {won ? "Chef's Kiss! All ingredients sorted!" : "Kitchen on fire! Too many mistakes!"}
          </p>
          <p className="text-xs text-on-surface-variant font-mono">Score: {score}/{TOTAL}</p>
          {!won && (
            <button
              onClick={buildQueue}
              className="px-5 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg cursor-pointer active:scale-95 transition-all"
            >
              BACK TO KITCHEN
            </button>
          )}
        </div>
      )}

    </section>
  );
}
