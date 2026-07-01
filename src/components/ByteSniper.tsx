"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ByteSniperProps {
  onComplete: (xpAward: number) => void;
}

interface Target {
  id: number;
  value: string;
  correctType: "int" | "float" | "char" | "double";
  y: number;       // 0-100 (% from top)
  x: number;       // 0-80 (% from left, leaving room for width)
  hit: boolean;
  missed: boolean;
  explosion: boolean;
  wrongShot: boolean;
}

const TARGET_POOL: { value: string; correctType: Target["correctType"] }[] = [
  { value: "42",      correctType: "int"    },
  { value: "-17",     correctType: "int"    },
  { value: "1000",    correctType: "int"    },
  { value: "3.14",    correctType: "float"  },
  { value: "-0.5",    correctType: "float"  },
  { value: "9.99",    correctType: "float"  },
  { value: "'A'",     correctType: "char"   },
  { value: "'z'",     correctType: "char"   },
  { value: "'$'",     correctType: "char"   },
  { value: "3.14159265", correctType: "double" },
  { value: "0.000001",   correctType: "double" },
  { value: "1.7e308",    correctType: "double" },
];

const TYPE_COLORS: Record<Target["correctType"], string> = {
  int:    "border-primary   bg-primary/20   text-primary-fixed-dim",
  float:  "border-secondary bg-secondary/20 text-secondary",
  char:   "border-tertiary  bg-tertiary-container/40 text-on-tertiary-container",
  double: "border-error     bg-error/15     text-error",
};

const SHOT_COLORS: Record<Target["correctType"], string> = {
  int:    "bg-primary   text-on-primary",
  float:  "bg-secondary text-on-secondary",
  char:   "bg-tertiary  text-on-tertiary",
  double: "bg-error     text-on-error",
};

const TYPES: Target["correctType"][] = ["int", "float", "char", "double"];

let nextId = 0;

export default function ByteSniper({ onComplete }: ByteSniperProps) {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [round, setRound] = useState(0);          // which pool item next
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dropRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const TOTAL_ROUNDS = 8;
  const MAX_MISSES   = 3;

  // ── Spawn a new target ──────────────────────────────────────────────────
  const spawnTarget = useCallback(() => {
    setRound(prev => {
      const idx = prev % TARGET_POOL.length;
      const pool = TARGET_POOL[idx];
      const newTarget: Target = {
        id: nextId++,
        value: pool.value,
        correctType: pool.correctType,
        y: 0,
        x: 5 + Math.random() * 70,
        hit: false,
        missed: false,
        explosion: false,
        wrongShot: false,
      };
      setTargets(t => [...t.filter(x => !x.missed && !x.hit), newTarget]);
      return prev + 1;
    });
  }, []);

  // ── Drop tick: move targets down ────────────────────────────────────────
  useEffect(() => {
    if (gameOver || won) return;

    dropRef.current = setInterval(() => {
      setTargets(prev =>
        prev.map(t => {
          if (t.hit || t.missed || t.explosion || t.wrongShot) return t;
          if (t.y >= 88) {
            // Missed! 
            setMisses(m => {
              const next = m + 1;
              if (next >= MAX_MISSES) setGameOver(true);
              return next;
            });
            return { ...t, missed: true };
          }
          return { ...t, y: t.y + 1.2 };
        })
      );
    }, 80);

    return () => { if (dropRef.current) clearInterval(dropRef.current); };
  }, [gameOver, won]);

  // ── Spawn timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameOver || won) return;

    spawnTarget(); // first target immediately
    intervalRef.current = setInterval(spawnTarget, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [gameOver, won, spawnTarget]);

  // ── Check win ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (score >= TOTAL_ROUNDS && !won) {
      setWon(true);
      if (!completed) {
        setCompleted(true);
        onComplete(10);
      }
    }
  }, [score, won, completed, onComplete]);

  // ── Shoot handler ───────────────────────────────────────────────────────
  const shoot = (targetId: number, chosenType: Target["correctType"]) => {
    setTargets(prev =>
      prev.map(t => {
        if (t.id !== targetId || t.hit || t.missed) return t;
        if (chosenType === t.correctType) {
          setScore(s => s + 1);
          setFeedback({ msg: `✅ Correct! ${t.value} → ${t.correctType}`, ok: true });
          setTimeout(() => setFeedback(null), 1400);
          return { ...t, hit: true, explosion: false };
        } else {
          setFeedback({ msg: `❌ Wrong! ${t.value} needs ${t.correctType}`, ok: false });
          setTimeout(() => setFeedback(null), 1400);
          return { ...t, wrongShot: true };
        }
      })
    );
    // remove wrongShot targets after animation
    setTimeout(() => {
      setTargets(prev => prev.filter(t => !(t.id === targetId && t.wrongShot)));
    }, 600);
  };

  const restart = () => {
    setTargets([]);
    setScore(0);
    setMisses(0);
    setRound(0);
    setGameOver(false);
    setWon(false);
    setFeedback(null);
  };

  return (
    <section className={`glass-panel p-4 rounded-xl space-y-4 border transition-all duration-300 ${
      won ? "border-primary/50 shadow-[0_0_20px_rgba(0,218,243,0.2)]" : gameOver ? "border-error/40" : "border-white/5"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" data-icon="target">
            gps_fixed
          </span>
          🎯 Byte Sniper
        </h3>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-primary font-bold">Score: {score}/{TOTAL_ROUNDS}</span>
          <span className={`font-bold ${misses >= MAX_MISSES ? "text-error" : "text-on-surface-variant"}`}>
            ❤️ {MAX_MISSES - misses}
          </span>
        </div>
      </div>

      <p className="text-label-sm font-label-sm text-on-surface-variant">
        Targets fall with C values. Click the correct <code className="text-secondary">type</code> buttons below each to shoot it down before it hits the ground!
      </p>

      {/* Type legend */}
      <div className="flex flex-wrap gap-2 text-[10px] font-mono">
        {TYPES.map(t => (
          <span key={t} className={`px-2 py-0.5 rounded border ${TYPE_COLORS[t]}`}>{t}</span>
        ))}
      </div>

      {/* Game field */}
      <div className="relative w-full h-52 bg-surface-container-lowest border border-white/5 rounded-xl overflow-hidden">

        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-error/40" />
        <div className="absolute bottom-1 left-2 text-[9px] font-mono text-error/60">GROUND — miss zone</div>

        {/* Scanlines decoration */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.015)_3px,rgba(255,255,255,0.015)_4px)] pointer-events-none" />

        {!gameOver && !won && targets.map(target => (
          <div
            key={target.id}
            className="absolute flex flex-col items-center gap-1 transition-all duration-75"
            style={{ top: `${target.y}%`, left: `${target.x}%` }}
          >
            {/* Value badge */}
            <div className={`px-2 py-1 rounded-lg border-2 font-mono text-xs font-bold shadow-lg transition-all duration-200 ${
              target.hit
                ? "bg-primary/30 border-primary scale-125 opacity-0"
                : target.wrongShot
                ? "bg-error/40 border-error animate-shake scale-110"
                : target.missed
                ? "opacity-0"
                : "bg-surface-container-high border-white/20 text-on-surface"
            }`}>
              {target.value}
            </div>

            {/* Type shoot buttons — only show if active */}
            {!target.hit && !target.missed && !target.wrongShot && (
              <div className="flex gap-0.5">
                {TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => shoot(target.id, type)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold cursor-pointer active:scale-90 transition-all ${SHOT_COLORS[type]}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Game Over overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm gap-3">
            <span className="text-3xl">💥</span>
            <p className="text-error font-bold text-sm font-mono">GAME OVER — Too many missed!</p>
            <p className="text-on-surface-variant text-xs font-mono">Score: {score}/{TOTAL_ROUNDS}</p>
            <button
              onClick={restart}
              className="px-4 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-lg cursor-pointer active:scale-95 transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        )}

        {/* Win overlay */}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm gap-3">
            <span className="text-3xl">🏆</span>
            <p className="text-primary font-bold text-sm font-mono animate-pulse">TARGET ELIMINATED — Expert Sniper!</p>
            <p className="text-on-surface-variant text-xs font-mono">Perfect Score: {score}/{TOTAL_ROUNDS}</p>
          </div>
        )}
      </div>

      {/* Live feedback bar */}
      <div className={`h-7 rounded-lg flex items-center px-3 text-xs font-mono font-bold transition-all duration-300 ${
        feedback
          ? feedback.ok
            ? "bg-primary/15 text-primary border border-primary/30"
            : "bg-error/15 text-error border border-error/30"
          : "bg-surface-container-low border border-white/5 text-on-surface-variant/50"
      }`}>
        {feedback ? feedback.msg : "Waiting for your shot..."}
      </div>
    </section>
  );
}
