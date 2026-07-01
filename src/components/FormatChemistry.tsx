"use client";

import React, { useState, useEffect } from "react";

interface FormatChemistryProps {
  onComplete: (xpAward: number) => void;
}

type Specifier = "%d" | "%f" | "%c" | "%lf";

interface Formula {
  id: number;
  codeTemplate: string; // e.g. 'printf("Temp: {slot}", 36.6);'
  variableDecl: string; // e.g. 'float temp = 36.6;'
  correctSpec: Specifier;
  mismatchOutputs: Record<Specifier, { result: string; description: string }>;
  correctOutput: string;
}

const FORMULAS: Formula[] = [
  {
    id: 1,
    variableDecl: "int score = 95;",
    codeTemplate: 'printf("Your score is: {slot}\\n", score);',
    correctSpec: "%d",
    correctOutput: "Your score is: 95",
    mismatchOutputs: {
      "%d": { result: "Your score is: 95", description: "" },
      "%f": { result: "Your score is: 0.000000", description: "Decimal float specifier (%f) read integer bits as zero!" },
      "%c": { result: "Your score is: _", description: "ASCII Char specifier (%c) printed the character corresponding to code 95 ('_')!" },
      "%lf": { result: "Your score is: -0.000000", description: "Double float specifier (%lf) read integer bits as negative zero!" },
    },
  },
  {
    id: 2,
    variableDecl: "float price = 12.99;",
    codeTemplate: 'printf("Total: {slot}\\n", price);',
    correctSpec: "%f",
    correctOutput: "Total: 12.990000",
    mismatchOutputs: {
      "%d": { result: "Total: -1073741824", description: "Integer specifier (%d) interpreted float binary bits as a huge negative garbage number!" },
      "%f": { result: "Total: 12.990000", description: "" },
      "%c": { result: "Total: ", description: "Single byte char specifier (%c) parsed float bits as a corrupted symbol!" },
      "%lf": { result: "Total: -nan", description: "Double precision specifier (%lf) mismatched single-precision float bits!" },
    },
  },
  {
    id: 3,
    variableDecl: "char grade = 'A';",
    codeTemplate: 'printf("Grade: {slot}\\n", grade);',
    correctSpec: "%c",
    correctOutput: "Grade: A",
    mismatchOutputs: {
      "%d": { result: "Grade: 65", description: "Integer specifier (%d) bypassed the character and printed its raw ASCII code (65)!" },
      "%f": { result: "Grade: 0.000000", description: "Float specifier (%f) could not read single-byte character bits as decimal!" },
      "%c": { result: "Grade: A", description: "" },
      "%lf": { result: "Grade: 0.000000", description: "Double specifier (%lf) failed to translate single-byte character bits!" },
    },
  },
  {
    id: 4,
    variableDecl: "double ratio = 3.14159265;",
    codeTemplate: 'printf("Pi approx: {slot}\\n", ratio);',
    correctSpec: "%lf",
    correctOutput: "Pi approx: 3.141593",
    mismatchOutputs: {
      "%d": { result: "Pi approx: 1413754136", description: "Integer specifier (%d) read high-order double precision bits as a garbage number!" },
      "%f": { result: "Pi approx: 3.141593", description: "Most modern compilers automatically promote float/double in printf, but let's practice using long double specifiers (%lf) for safety!" },
      "%c": { result: "Pi approx: \u0018", description: "Char specifier (%c) printed the control character at the 24th index of the ASCII table!" },
      "%lf": { result: "Pi approx: 3.141593", description: "" },
    },
  },
];

const SPECIFIERS: { spec: Specifier; desc: string; type: string }[] = [
  { spec: "%d", desc: "Integer specifier", type: "int" },
  { spec: "%f", desc: "Single float specifier", type: "float" },
  { spec: "%c", desc: "Single character specifier", type: "char" },
  { spec: "%lf", desc: "Double float specifier", type: "double" },
];

export default function FormatChemistry({ onComplete }: FormatChemistryProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedSpec, setSelectedSpec] = useState<Specifier | null>(null);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [reactionLog, setReactionLog] = useState<string>("Ready to synthesize. Drag or select a specifier.");
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentFormula = FORMULAS[currentIdx];

  const handleSelectSpecifier = (spec: Specifier) => {
    if (isSynthesizing || won || gameOver) return;
    setSelectedSpec(spec);
    setIsSynthesizing(true);
    setReactionLog("🧪 Synthesizing format reaction...");

    setTimeout(() => {
      setIsSynthesizing(false);
      const isCorrect = spec === currentFormula.correctSpec;

      if (isCorrect) {
        setScore(s => {
          const newScore = s + 1;
          if (newScore >= FORMULAS.length) {
            setWon(true);
            if (!completed) {
              setCompleted(true);
              onComplete(10);
            }
          }
          return newScore;
        });
        setReactionLog("✅ Reaction Stable! Output matches expectations perfectly.");
      } else {
        setLives(l => {
          const newLives = l - 1;
          if (newLives <= 0) {
            setGameOver(true);
          }
          return newLives;
        });
        setReactionLog(`💥 Reaction Volatile! ${currentFormula.mismatchOutputs[spec].description}`);
      }
    }, 1200);
  };

  const handleNextFormula = () => {
    setSelectedSpec(null);
    setReactionLog("Ready to synthesize. Drag or select a specifier.");
    if (currentIdx < FORMULAS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setSelectedSpec(null);
    setScore(0);
    setLives(3);
    setReactionLog("Ready to synthesize. Drag or select a specifier.");
    setWon(false);
    setGameOver(false);
  };

  // Replace {slot} in template code
  const renderCode = (slotVal: string) => {
    return currentFormula.codeTemplate.replace("{slot}", slotVal);
  };

  return (
    <div className={`glass-panel p-5 rounded-xl space-y-5 border transition-all duration-300 ${
      won ? "border-primary/50 shadow-[0_0_25px_rgba(0,218,243,0.2)]"
      : gameOver ? "border-error/40"
      : "border-white/5"
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/5 pb-3">
        <div>
          <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface flex items-center gap-2">
            🧪 Format Specifier Chemistry
          </h3>
          <p className="text-[11px] text-on-surface-variant font-sans mt-0.5">
            Select the correct format specifier placeholder to stabilize the code output!
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-primary font-bold">Stable: {score}/{FORMULAS.length}</span>
          <span>{Array.from({ length: 3 }).map((_, i) => i < lives ? "❤️" : "🖤").join("")}</span>
        </div>
      </div>

      {!won && !gameOver ? (
        <div className="space-y-5">
          {/* Reaction Chamber / Code Area */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">Variable Declaration</span>
            <div className="p-3 bg-surface-container-high rounded-lg border border-white/5 font-mono text-xs text-secondary-fixed">
              {currentFormula.variableDecl}
            </div>

            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block pt-1">Code Formula</span>
            <div className="p-4 bg-surface-container-low font-code-md text-xs rounded-lg border border-white/5 space-y-2 relative overflow-hidden">
              <code className="text-on-surface block">
                {renderCode(selectedSpec || "_____")}
              </code>

              {/* Scanning laser line when synthesizing */}
              {isSynthesizing && (
                <div className="absolute inset-x-0 h-0.5 bg-primary/80 top-0 animate-scanline shadow-[0_0_10px_#00daf3]" />
              )}
            </div>
          </div>

          {/* Testtube selection buttons */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider text-center block">Specifier Reactants</span>
            <div className="grid grid-cols-4 gap-2">
              {SPECIFIERS.map(s => {
                const isChosen = selectedSpec === s.spec;
                const isCorrect = s.spec === currentFormula.correctSpec;
                let btnStyle = "border-white/10 bg-white/5 hover:border-primary text-on-surface";
                
                if (selectedSpec !== null) {
                  if (isChosen) {
                    btnStyle = isCorrect
                      ? "bg-primary/20 border-primary text-primary-fixed-dim shadow-[0_0_12px_rgba(0,218,243,0.2)]"
                      : "bg-error/20 border-error text-error animate-shake";
                  } else {
                    btnStyle = "border-white/5 opacity-40 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={s.spec}
                    disabled={selectedSpec !== null || isSynthesizing}
                    onClick={() => handleSelectSpecifier(s.spec)}
                    className={`py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 disabled:pointer-events-none ${btnStyle}`}
                  >
                    <span className="text-base select-none">🧪</span>
                    <span className="text-xs font-mono font-black">{s.spec}</span>
                    <span className="text-[9px] text-on-surface-variant font-mono">{s.type}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Console / Reaction Log Output */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">Terminal Output Simulator</span>
            <div className="p-3 bg-surface-container-lowest border border-white/5 rounded-xl min-h-[90px] flex flex-col justify-between">
              <div className="font-mono text-xs space-y-1">
                <span className="text-[9px] text-outline-variant block uppercase">Output Console:</span>
                <div className={`font-bold ${
                  selectedSpec === null 
                    ? "text-on-surface-variant/40" 
                    : selectedSpec === currentFormula.correctSpec 
                    ? "text-primary animate-pulse" 
                    : "text-error"
                }`}>
                  {selectedSpec === null 
                    ? "Awaiting specifier injection..." 
                    : currentFormula.mismatchOutputs[selectedSpec].result}
                </div>
              </div>

              {/* Live Log Message */}
              <div className={`mt-2 pt-2 border-t border-white/5 text-[10px] font-mono leading-relaxed ${
                selectedSpec === null 
                  ? "text-on-surface-variant" 
                  : selectedSpec === currentFormula.correctSpec 
                  ? "text-primary-fixed-dim" 
                  : "text-error"
              }`}>
                {reactionLog}
              </div>
            </div>
          </div>

          {/* Next Button */}
          {selectedSpec !== null && !isSynthesizing && selectedSpec === currentFormula.correctSpec && currentIdx < FORMULAS.length - 1 && (
            <div className="flex justify-end pt-1 animate-fadeIn">
              <button
                onClick={handleNextFormula}
                className="px-4 py-2 bg-secondary text-on-secondary font-bold text-xs rounded-lg cursor-pointer active:scale-95 transition-all"
              >
                NEXT FORMULA ➜
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Win / Game Over UI */
        <div className={`flex flex-col items-center gap-3 py-6 rounded-xl border ${
          won ? "bg-primary/10 border-primary/30" : "bg-error/10 border-error/30"
        }`}>
          <span className="text-4xl">{won ? "🏆" : "💥"}</span>
          <h4 className={`font-bold text-sm font-mono ${won ? "text-primary animate-pulse" : "text-error"}`}>
            {won ? "Specifiers Stabilized! Formula Reaction Perfect!" : "Reactor Overload! Too many volatile specifiers!"}
          </h4>
          <p className="text-xs text-on-surface-variant font-mono text-center max-w-xs px-4 leading-relaxed">
            {won 
              ? "All format specifier chemistry equations resolved. Output data is clean and uncorrupted."
              : "Incorrect format parameters caused variable overflow and memory leakage."}
          </p>
          {!won && (
            <button
              onClick={resetGame}
              className="px-5 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg cursor-pointer active:scale-95 transition-all"
            >
              RESTART REACTOR
            </button>
          )}
        </div>
      )}

    </div>
  );
}
