"use client";

import React, { useState, useEffect } from "react";
import FilingGame from "./FilingGame";

interface SectionVariablesProps {
  onComplete: (xpAward: number) => void;
}

interface NamingChallenge {
  name: string;
  expectedCategory: "valid" | "violation" | "bad_convention";
  explanation: string;
  options: { label: string; value: "valid" | "violation" | "bad_convention" }[];
}

const NAMING_CHALLENGES: NamingChallenge[] = [
  {
    name: "1stPlace",
    expectedCategory: "violation",
    explanation: "Toy Box Rule Violation: Variable names cannot start with a number. They must start with a letter, otherwise the computer gets confused and thinks it is a real number!",
    options: [
      { label: "Valid Name", value: "valid" },
      { label: "Violates Rules", value: "violation" },
      { label: "Bad Style (poor convention)", value: "bad_convention" }
    ]
  },
  {
    name: "student Age",
    expectedCategory: "violation",
    explanation: "Toy Box Rule Violation: Variable names cannot contain spaces. The computer doesn't know where the name ends! Use 'studentAge' or 'student_age' instead.",
    options: [
      { label: "Valid Name", value: "valid" },
      { label: "Violates Rules", value: "violation" },
      { label: "Bad Style (poor convention)", value: "bad_convention" }
    ]
  },
  {
    name: "return",
    expectedCategory: "violation",
    explanation: "Toy Box Rule Violation: 'return' is a reserved keyword (a command the computer already uses). You cannot use it as your custom toy box name.",
    options: [
      { label: "Valid Name", value: "valid" },
      { label: "Violates Rules", value: "violation" },
      { label: "Bad Style (poor convention)", value: "bad_convention" }
    ]
  },
  {
    name: "studentAge",
    expectedCategory: "valid",
    explanation: "Valid Name! Uses 'camelCase' (capitalizing words after the first to look like a camel's hump), making it clean and easy to read.",
    options: [
      { label: "Valid Name", value: "valid" },
      { label: "Violates Rules", value: "violation" },
      { label: "Bad Style (poor convention)", value: "bad_convention" }
    ]
  },
  {
    name: "x",
    expectedCategory: "bad_convention",
    explanation: "Valid computer code, but Bad Convention: Single letters like 'x' do not tell us what toy is inside. Use descriptive names like 'score' instead!",
    options: [
      { label: "Valid Name", value: "valid" },
      { label: "Violates Rules", value: "violation" },
      { label: "Bad Style (poor convention)", value: "bad_convention" }
    ]
  }
];

export default function SectionVariables({ onComplete }: SectionVariablesProps) {
  // Sub-step inside Variables: 0 = Toy Box, 1 = Naming Game, 2 = Magic Formulas, 3 = Filing Game
  const [subStep, setSubStep] = useState<number>(0);

  // Sub-step 1: Toy Box States ('declare' | 'init' | 'assign')
  const [lockerState, setLockerState] = useState<"declare" | "init" | "assign">("declare");
  const [garbageValue, setGarbageValue] = useState<number>(-9821);

  // Generate random garbage value on declaration tab select
  useEffect(() => {
    if (lockerState === "declare") {
      const interval = setInterval(() => {
        setGarbageValue(Math.floor(Math.random() * 65535) - 32768);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [lockerState]);

  // Sub-step 2: Naming Game states
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [namingScore, setNamingScore] = useState<number>(0);

  // Sub-step 3: Expressions states
  const [exprInput, setExprInput] = useState<string>("5");
  const [filingCompleted, setFilingCompleted] = useState<boolean>(false);
  const [hasCompletedSection, setHasCompletedSection] = useState<boolean>(false);

  // Naming challenge submit
  const handleNamingSubmit = (ans: "valid" | "violation" | "bad_convention") => {
    if (answerSubmitted) return;
    setSelectedAnswer(ans);
    setAnswerSubmitted(true);
    if (ans === NAMING_CHALLENGES[challengeIdx].expectedCategory) {
      setNamingScore((prev) => prev + 1);
    }
  };

  const handleNextChallenge = () => {
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
    if (challengeIdx < NAMING_CHALLENGES.length - 1) {
      setChallengeIdx(challengeIdx + 1);
    } else {
      setSubStep(2); // Go to Step 3
    }
  };

  const handleFinalSubmit = () => {
    if (hasCompletedSection) return;
    setHasCompletedSection(true);
    onComplete(10); // Award 10 XP
  };

  return (
    <div className="space-y-6">
      
      {/* Step navigation headers */}
      <div className="flex flex-wrap gap-2 justify-between items-center bg-surface-container-low p-2 rounded-lg border border-white/5 text-xs font-mono">
        <button
          onClick={() => setSubStep(0)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            subStep === 0 ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          1. Toy Box Concept 🧸
        </button>
        <button
          disabled={subStep < 1 && lockerState === "declare"}
          onClick={() => setSubStep(1)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 1 ? "bg-secondary text-on-secondary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          2. Naming Rules Game 🎯
        </button>
        <button
          disabled={subStep < 2 && namingScore < 3}
          onClick={() => setSubStep(2)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 2 ? "bg-tertiary-container text-on-tertiary-container font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          3. Magic Formulas ✨
        </button>
        <button
          disabled={subStep < 3 && namingScore < 3}
          onClick={() => setSubStep(3)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 3 ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          4. Memory Filing Game 📦
        </button>
      </div>

      {/* SUB-STEP 1: THE TOY BOX CONCEPT */}
      {subStep === 0 && (
        <div className="space-y-6 animate-fadeIn">

          {/* Analogy */}
          <div className="rounded-xl p-4 text-left text-sm leading-relaxed font-sans"
            style={{ background: "rgba(255,184,0,.09)", border: "1px solid rgba(255,184,0,.22)" }}>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-2" style={{ color: "#FFB800" }}>💡 Analogy</div>
            A labeled jar on a kitchen shelf. You can <strong>look inside</strong> to see what&apos;s there,
            <strong> swap the contents</strong> anytime, but it only holds <strong>one thing at a time</strong>.
            The label is the variable name. The contents are the value.
          </div>

          {/* Concept definition */}
          <section className="glass-panel p-4 rounded-xl space-y-2 text-left">
            <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              What is a Variable?
            </h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed font-sans">
              Think of a <span className="text-primary font-bold">variable</span> as a labeled <strong>jar</strong> inside your computer&apos;s memory.
              It is a special place where your program can keep, read, and change values.
              Each jar has a <strong>label</strong> on the front so you can find it easily, and a <strong>type</strong> that says what kinds of things fit inside!
            </p>
          </section>

          {/* Interactive display container */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Visual locker grid */}
            <div className="md:col-span-5 glass-panel p-4 rounded-xl flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
              
              {/* Locker structure */}
              <div className="w-28 h-48 bg-surface-container-high border-4 border-white/10 rounded-xl relative flex flex-col items-center justify-start p-2 shadow-2xl overflow-hidden">
                
                {/* Labeled name tag */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-black px-2 py-0.5 rounded shadow text-[9px] font-mono font-bold border-b border-yellow-300 z-20">
                  age
                </div>

                {/* Locker ventilation slats */}
                <div className="w-8 h-1 bg-black/40 rounded-full mt-7 mb-1 z-10"></div>
                <div className="w-8 h-1 bg-black/40 rounded-full mb-6 z-10"></div>
                <div className="absolute top-1/2 right-2.5 w-1.5 h-6 bg-white/20 border border-white/15 rounded z-10"></div>

                {/* Cabinet interior */}
                <div className="absolute inset-1.5 bg-surface-container-lowest border border-black/40 rounded-lg overflow-hidden shadow-inner">
                  
                  {/* Declaration only: Garbage Value warning */}
                  {lockerState === "declare" && (
                    <div className="absolute inset-x-2 bottom-6 top-6 bg-error/10 border-2 border-error/40 border-dashed rounded-lg flex flex-col items-center justify-center p-1 text-center animate-pulse">
                      <span className="text-[7px] font-mono text-error font-bold uppercase tracking-wider">
                        Cobwebs 🕸️
                      </span>
                      <span className="text-error font-bold font-code-md text-xs truncate w-full">
                        {garbageValue}
                      </span>
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-error"></span>
                      </span>
                    </div>
                  )}

                  {/* Initialized state: Green box (drops in, falls out on assign) */}
                  <div
                    className={`absolute w-16 h-16 bg-primary/20 border-2 border-primary/50 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all duration-700 ease-in-out ${
                      lockerState === "init"
                        ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100 animate-bounce"
                        : lockerState === "assign"
                        ? "top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75 rotate-12 pointer-events-none"
                        : "top-[-80px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75"
                    }`}
                  >
                    <span className="text-[7px] font-mono text-primary/60 font-bold uppercase">
                      Teddy Bear
                    </span>
                    <span className="text-primary-fixed-dim font-bold font-code-md text-sm mt-1">
                      25
                    </span>
                  </div>

                  {/* Reassigned state: Purple box (drops in on assign) */}
                  <div
                    className={`absolute w-16 h-16 bg-secondary/20 border-2 border-secondary/50 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all duration-700 ease-in-out ${
                      lockerState === "assign"
                        ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100"
                        : "top-[-80px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75"
                    }`}
                  >
                    <span className="text-[7px] font-mono text-secondary-fixed-dim font-bold uppercase">
                      Toy Car
                    </span>
                    <span className="text-secondary font-bold font-code-md text-sm mt-1">
                      30
                    </span>
                  </div>

                </div>
              </div>

              <span className="text-[9px] font-mono text-on-surface-variant mt-3 text-center leading-relaxed block px-2">
                Toy Box Location: 0x7FFE <br />
                <span className="text-[8px] opacity-75">(The actual playroom spot, which we label &quot;age&quot; so we don&apos;t have to search for it!)</span>
              </span>
            </div>

            {/* Locker states selector card */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                
                {/* Simulated C code console */}
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-white/5 font-mono text-xs text-left space-y-2 relative overflow-hidden shadow-inner">
                  <div className="flex justify-between items-center text-[10px] text-outline-variant uppercase border-b border-white/5 pb-1">
                    <span>toy_script.c debugger</span>
                    <span className="text-primary-fixed-dim font-bold">Execution Trace</span>
                  </div>
                  
                  <div className={`p-2 rounded transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    lockerState === "declare" ? "bg-error/15 text-error font-bold" : "text-on-surface-variant/80 hover:text-on-surface"
                  }`} onClick={() => setLockerState("declare")}>
                    <span>1. int age; // Build new empty box</span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider">{lockerState === "declare" ? "◀ EMPTY BOX" : ""}</span>
                  </div>

                  <div className={`p-2 rounded transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    lockerState === "init" ? "bg-primary/15 text-primary-fixed-dim font-bold" : "text-on-surface-variant/80 hover:text-on-surface"
                  }`} onClick={() => setLockerState("init")}>
                    <span>2. age = 25; // Put teddy bear in</span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider">{lockerState === "init" ? "◀ TOY INSIDE" : ""}</span>
                  </div>

                  <div className={`p-2 rounded transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    lockerState === "assign" ? "bg-secondary/15 text-secondary font-bold" : "text-on-surface-variant/80 hover:text-on-surface"
                  }`} onClick={() => setLockerState("assign")}>
                    <span>3. age = 30; // Swap for toy car</span>
                    <span className="text-[9px] font-sans font-bold uppercase tracking-wider">{lockerState === "assign" ? "◀ SWAP TOY" : ""}</span>
                  </div>
                </div>

                {/* State explanations */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 space-y-3 text-left">
                  
                  {lockerState === "declare" && (
                    <div className="animate-fadeIn space-y-2">
                      <div className="font-bold text-error flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        Making a Box: <code className="text-on-surface font-normal bg-white/5 px-1 py-0.5 rounded">int age;</code>
                      </div>
                      <p className="text-xs text-on-surface-variant/95 leading-relaxed font-sans">
                        This creates the storage toy box in memory, but puts **no toy** inside yet.
                        <br />
                        <span className="text-error font-bold block mt-1.5">⚠️ THE COBWEB GOTCHA:</span>
                        In C, if you don&apos;t put a value in, the box gets filled with random leftovers (dust & cobwebs) from other games. Playing with it will print random, crazy numbers!
                      </p>
                    </div>
                  )}

                  {lockerState === "init" && (
                    <div className="animate-fadeIn space-y-2">
                      <div className="font-bold text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        Putting the First Toy: <code className="text-on-surface font-normal bg-white/5 px-1 py-0.5 rounded">int age = 25;</code>
                      </div>
                      <p className="text-xs text-on-surface-variant/95 leading-relaxed font-sans">
                        This creates the toy box **AND** fills it with a starting value (`25`) right away. This is the safest way to declare variables and keeps it clean of cobwebs.
                      </p>
                    </div>
                  )}

                  {lockerState === "assign" && (
                    <div className="animate-fadeIn space-y-2">
                      <div className="font-bold text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">update</span>
                        Swapping Toys: <code className="text-on-surface font-normal bg-white/5 px-1 py-0.5 rounded">age = 30;</code>
                      </div>
                      <p className="text-xs text-on-surface-variant/95 leading-relaxed font-sans">
                        This swaps the toy inside. The old toy (`25`) is taken out and thrown away, and the new toy (`30`) takes its place. Notice there is no <code className="text-secondary font-bold">int</code> here because the box is already built!
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* Stepper buttons and Next step prompt */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (lockerState === "declare") setLockerState("init");
                      else if (lockerState === "init") setLockerState("assign");
                      else setLockerState("declare");
                    }}
                    className="px-4 py-2 bg-surface-container-high border border-white/5 hover:border-primary rounded-lg text-xs font-mono font-bold text-primary-fixed-dim transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                    STEP PLAY
                  </button>
                </div>

                <button
                  onClick={() => setSubStep(1)}
                  className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
                >
                  NEXT: NAMING RULES GAME
                </button>
              </div>

            </div>
          </div>

          {/* Concept Lock */}
          <div className="rounded-xl p-4 text-left space-y-1.5"
            style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,218,243,.07))", border: "1px solid rgba(167,139,250,.30)" }}>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "#A78BFA" }}>
              🔒 Non-Replaceable Concept
            </div>
            <div className="text-sm text-on-surface leading-relaxed font-sans">
              A variable is a <strong>named container</strong> that holds exactly one value at a time.
              You can read what&apos;s inside. You can replace it. The name stays the same; the value can change.
              Declaring without initializing leaves <strong style={{ color: "#FF5F6E" }}>garbage (cobweb values)</strong> inside — always initialize.
            </div>
          </div>

          {/* Code reveal */}
          <div className="rounded-xl overflow-hidden text-left" style={{ border: "1px solid rgba(0,218,243,.18)" }}>
            <div className="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest" style={{ background: "rgba(0,218,243,.08)", color: "#00daf3" }}>
              Code Reveal — three stages
            </div>
            <pre className="p-4 text-xs leading-relaxed bg-surface-container-lowest font-mono overflow-x-auto">{`int age;       // jar created, but has cobweb garbage inside ⚠️
int age = 25;  // jar created AND filled — always do this
age = 30;      // old value (25) thrown out, 30 takes its place`}</pre>
          </div>

        </div>
      )}

      {/* SUB-STEP 2: NAMING RULES GAME */}
      {subStep === 1 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <section className="glass-panel p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">rule</span>
              Toy Box Naming Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-on-surface-variant pt-1">
              <div className="space-y-1">
                <span className="text-error font-bold block">❌ STRICT COMPILER RULES:</span>
                • Cannot start with numbers (e.g. `1st`)
                <br />• Cannot contain spaces inside
                <br />• Cannot use reserved commands (e.g. `int`)
                <br />• <span className="text-on-surface underline">Case-sensitive:</span> Capitalization matters! `age` and `Age` are two different boxes.
              </div>
              <div className="space-y-1">
                <span className="text-primary-fixed-dim font-bold block">💡 BEST PRACTICES (Conventions):</span>
                • <span className="text-on-surface underline">camelCase:</span> Capitalize words after the first (e.g. `studentAge`) to resemble camel humps.
                <br />• Use meaningful names instead of single letters so we know what is inside (e.g. `score` instead of `x`).
              </div>
            </div>
          </section>

          {/* Game challenge card */}
          <section className="glass-panel p-5 rounded-xl space-y-4 border-secondary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-secondary font-bold">Challenge {challengeIdx + 1} of {NAMING_CHALLENGES.length}</span>
              <span className="text-primary-fixed-dim">Score: {namingScore} / {challengeIdx}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-on-surface-variant uppercase">CLASSIFY THE IDENTIFIER</span>
              <h4 className="text-lg font-bold font-code-md text-secondary-fixed bg-white/5 px-3 py-1.5 rounded inline-block">
                {NAMING_CHALLENGES[challengeIdx].name}
              </h4>
            </div>

            <div className="space-y-2.5 pt-2">
              {NAMING_CHALLENGES[challengeIdx].options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt.value;
                const isCorrect = opt.value === NAMING_CHALLENGES[challengeIdx].expectedCategory;
                
                let btnStyle = "border-white/10 bg-white/5 hover:border-secondary/35";
                if (answerSubmitted) {
                  if (isCorrect) {
                    btnStyle = "border-primary bg-primary/10 text-primary-fixed-dim";
                  } else if (isSelected) {
                    btnStyle = "border-error bg-error/10 text-error";
                  } else {
                    btnStyle = "border-white/5 opacity-40";
                  }
                } else if (isSelected) {
                  btnStyle = "border-secondary bg-secondary/15 text-secondary";
                }

                return (
                  <button
                    key={idx}
                    disabled={answerSubmitted}
                    onClick={() => handleNamingSubmit(opt.value)}
                    className={`w-full text-left p-3 rounded-lg border font-mono text-xs transition-all active:scale-[0.99] flex justify-between items-center cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.label}</span>
                    {answerSubmitted && isCorrect && (
                      <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                    )}
                    {answerSubmitted && isSelected && !isCorrect && (
                      <span className="material-symbols-outlined text-error text-[16px]">cancel</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {answerSubmitted && (
              <div className="p-3 bg-surface-container-low border border-white/5 rounded-lg text-xs leading-relaxed space-y-1">
                <span className="font-bold text-on-surface block">Feedback:</span>
                <p className="text-on-surface-variant">{NAMING_CHALLENGES[challengeIdx].explanation}</p>
              </div>
            )}

            {/* Next challenge button */}
            {answerSubmitted && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextChallenge}
                  className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs active:scale-95 transition-all cursor-pointer"
                >
                  {challengeIdx < NAMING_CHALLENGES.length - 1 ? "NEXT CHALLENGE" : "GO TO MAGIC FORMULAS"}
                </button>
              </div>
            )}
          </section>

        </div>
      )}

      {/* SUB-STEP 3: READING & FORMULAS */}
      {subStep === 2 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          {/* Concept definition */}
          <section className="glass-panel p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-tertiary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">calculate</span>
              Reading &amp; Magic Formulas ✨
            </h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Once you put a toy in a box, you can do cool tricks with it in two ways:
            </p>
            <ul className="list-disc list-inside text-xs text-on-surface-variant space-y-1.5 pl-2 font-sans">
              <li>
                <span className="font-bold text-on-surface">Shouting:</span> Displays the value on the screen using placeholder codes (like <code className="text-primary-fixed-dim bg-white/5 px-1 py-0.5 rounded">%d</code>).
              </li>
              <li>
                <span className="font-bold text-on-surface">Magic Math:</span> Using the box&apos;s name in formulas (e.g. <code className="text-primary-fixed-dim bg-white/5 px-1 py-0.5 rounded">age + 5</code>) to calculate new numbers!
              </li>
            </ul>
          </section>

          {/* Interactive Calculator Playground */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            
            {/* Input code block */}
            <div className="glass-panel rounded-xl overflow-hidden flex flex-col justify-between border-tertiary/20">
              <div className="bg-surface-container-high px-3 py-1.5 border-b border-white/5 text-[10px] font-mono text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">code</span>
                <span>magic_sandbox.c</span>
              </div>
              
              <div className="p-4 bg-surface-container-low font-code-md text-xs space-y-2 flex-1 flex flex-col justify-center">
                <div>
                  <span className="text-secondary font-bold">int</span> age = <span className="text-primary-fixed-dim">30</span>;
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-secondary font-bold">int</span> nextAge = age + 
                  <input
                    type="number"
                    value={exprInput}
                    onChange={(e) => setExprInput(e.target.value.replace(/\D/g, ""))}
                    placeholder="5"
                    className="w-14 bg-surface-container-lowest border border-white/10 rounded px-1.5 py-0.5 text-center text-primary font-mono text-xs focus:outline-none focus:border-tertiary"
                  />
                  <span>;</span>
                </div>
                <div className="text-on-surface-variant/40 pt-1">
                  printf(&quot;Next age: %d\n&quot;, nextAge);
                </div>
              </div>
            </div>

            {/* Output terminal block */}
            <div className="glass-panel rounded-xl overflow-hidden flex flex-col justify-between border border-white/5">
              <div className="bg-surface-container-high px-3 py-1.5 border-b border-white/5 text-[10px] font-mono text-on-surface-variant flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                <span>SIMULATED SCREEN</span>
              </div>
              
              <div className="p-4 bg-surface-container-lowest font-code-md text-xs text-primary-fixed-dim flex-1 flex flex-col justify-center gap-1.5">
                <div>&gt; gcc magic_sandbox.c -o play</div>
                <div>&gt; ./play</div>
                <div className="text-on-surface font-bold">
                  Next age: {30 + (parseInt(exprInput, 10) || 0)}
                </div>
                <div className="text-on-surface-variant/30 select-none">
                  Process exited with status 0
                </div>
              </div>
            </div>

          </div>

          {/* Bridging lesson transition & completion */}
          <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-xl text-xs leading-relaxed flex items-center gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">swap_horiz</span>
            <p className="text-on-surface-variant/95">
              <strong className="text-secondary">Bridge to Section 4:</strong> Now that we know how formulas work, let&apos;s practice filing different types of data in the right locations!
            </p>
          </div>

          {/* Section Next Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setSubStep(3)}
              className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
            >
              NEXT: MEMORY FILING GAME 📦
            </button>
          </div>

        </div>
      )}

      {/* SUB-STEP 4: MEMORY FILING GAME */}
      {subStep === 3 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <FilingGame onComplete={() => setFilingCompleted(true)} />

          {/* Section Submit Action */}
          {filingCompleted && (
            <div className="flex justify-end pt-2">
              <button
                disabled={hasCompletedSection}
                onClick={handleFinalSubmit}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  hasCompletedSection
                    ? "bg-primary/10 text-primary-fixed-dim border border-primary/30"
                    : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                }`}
              >
                {hasCompletedSection ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    SECTION COMPLETED
                  </>
                ) : (
                  "COMPLETE & EARN 10 XP"
                )}
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
