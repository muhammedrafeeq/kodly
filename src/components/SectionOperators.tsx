"use client";

import React, { useState, useEffect } from "react";

interface SectionOperatorsProps {
  sectionIndex: number;
  onComplete: (xpAward: number) => void;
}

export default function SectionOperators({ sectionIndex, onComplete }: SectionOperatorsProps) {
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  // ==========================================
  // SECTION 0: ARITHMETIC (Pizza Slicer Lab)
  // ==========================================
  const pizzaQuestions = [
    { 
      question: "22 slices of pizza are shared among 5 people. How many leftover slices are there?", 
      expr: "22 % 5", 
      answer: 2, 
      explanation: "22 % 5 = 2. The remainder is 2 slices!", 
      code: "int slices = 22;\nint people = 5;\nint leftovers = slices % people; // Solve leftovers" 
    },
    { 
      question: "You have 3 pizzas with 8 slices each. How many total slices do you have?", 
      expr: "3 * 8", 
      answer: 24, 
      explanation: "3 * 8 = 24 total slices.", 
      code: "int pizzas = 3;\nint slices_per_pizza = 8;\nint total_slices = pizzas * slices_per_pizza;" 
    },
    { 
      question: "15 slices split equally among 4 friends. How many leftover slices are there?", 
      expr: "15 % 4", 
      answer: 3, 
      explanation: "15 % 4 = 3 leftover slices.", 
      code: "int slices = 15;\nint friends = 4;\nint leftovers = slices % friends;" 
    },
    { 
      question: "You ordered 2 pizzas with 6 slices each, then ate 5 slices. How many remain?", 
      expr: "2 * 6 - 5", 
      answer: 7, 
      explanation: "(2 * 6) - 5 = 7 slices remaining.", 
      code: "int pizzas = 2;\nint slices_per_pizza = 6;\nint eaten = 5;\nint remaining = (pizzas * slices_per_pizza) - eaten;" 
    },
  ];
  const [pizzaIdx, setPizzaIdx] = useState<number>(0);
  const [pizzaInput, setPizzaInput] = useState<string>("");
  const [pizzaFeedback, setPizzaFeedback] = useState<string | null>(null);
  const [pizzaCorrect, setPizzaCorrect] = useState<boolean>(false);
  const [pizzaScore, setPizzaScore] = useState<number>(0);
  const [pizzaSolved, setPizzaSolved] = useState<boolean>(false);

  const currentPizza = pizzaQuestions[pizzaIdx];

  const handlePizzaSubmit = () => {
    const val = parseInt(pizzaInput);
    if (val === currentPizza.answer) {
      setPizzaCorrect(true);
      setPizzaFeedback(`✅ ${currentPizza.explanation}`);
      const next = pizzaScore + 1;
      setPizzaScore(next);
      if (next >= pizzaQuestions.length) {
        setPizzaSolved(true);
      }
    } else {
      setPizzaCorrect(false);
      setPizzaFeedback(`❌ Not quite! Hint: Think about what ${currentPizza.expr} means.`);
    }
  };

  const handlePizzaNext = () => {
    setPizzaIdx(prev => prev + 1);
    setPizzaInput("");
    setPizzaFeedback(null);
    setPizzaCorrect(false);
  };

  // ==========================================
  // SECTION 1: ASSIGNMENT (Shorthand Transformer)
  // ==========================================
  const shorthandQuestions = [
    { longForm: "x = x + 5",  options: ["x += 5", "x -= 5", "x *= 5", "x++"],   correct: "x += 5"  },
    { longForm: "x = x - 3",  options: ["x += 3", "x -= 3", "x /= 3", "x--"],   correct: "x -= 3"  },
    { longForm: "x = x * 4",  options: ["x *= 4", "x += 4", "x /= 4", "x %= 4"], correct: "x *= 4"  },
    { longForm: "x = x / 2",  options: ["x *= 2", "x /= 2", "x -= 2", "x += 2"], correct: "x /= 2"  },
    { longForm: "x = x % 7",  options: ["x += 7", "x -= 7", "x /= 7", "x %= 7"], correct: "x %= 7"  },
  ];
  const [shIdx, setShIdx] = useState<number>(0);
  const [shSelected, setShSelected] = useState<string | null>(null);
  const [shScore, setShScore] = useState<number>(0);
  const [shSolved, setShSolved] = useState<boolean>(false);
  const [shFeedback, setShFeedback] = useState<string | null>(null);

  const currentSh = shorthandQuestions[shIdx];

  const handleShorthandPick = (option: string) => {
    if (shSelected) return;
    setShSelected(option);
    if (option === currentSh.correct) {
      setShFeedback(`✅ Correct! "${currentSh.longForm}" shortens to "${currentSh.correct}"`);
      const next = shScore + 1;
      setShScore(next);
      if (next >= shorthandQuestions.length) setShSolved(true);
    } else {
      setShFeedback(`❌ Not quite! The correct shorthand is "${currentSh.correct}"`);
    }
    setTimeout(() => {
      if (shIdx < shorthandQuestions.length - 1) {
        setShIdx(prev => prev + 1);
        setShSelected(null);
        setShFeedback(null);
      }
    }, 1400);
  };

  // ==========================================
  // SECTION 2: INCREMENT/DECREMENT (Counter Machine)
  // ==========================================
  const counterQuestions = [
    { label: "x = 5; printf(\"%d\", x++);", printedVal: 5, finalVal: 6, note: "POST-increment: value is used FIRST (prints 5), THEN x becomes 6." },
    { label: "x = 5; printf(\"%d\", ++x);", printedVal: 6, finalVal: 6, note: "PRE-increment: x becomes 6 FIRST, THEN that value is printed." },
    { label: "x = 8; printf(\"%d\", x--);", printedVal: 8, finalVal: 7, note: "POST-decrement: value is used FIRST (prints 8), THEN x becomes 7." },
    { label: "x = 8; printf(\"%d\", --x);", printedVal: 7, finalVal: 7, note: "PRE-decrement: x becomes 7 FIRST, THEN that value is printed." },
  ];
  const [ctrIdx, setCtrIdx] = useState<number>(0);
  const [ctrSelected, setCtrSelected] = useState<number | null>(null);
  const [ctrScore, setCtrScore] = useState<number>(0);
  const [ctrSolved, setCtrSolved] = useState<boolean>(false);
  const [ctrFeedback, setCtrFeedback] = useState<string | null>(null);
  const [ctrDisplayVal, setCtrDisplayVal] = useState<number | null>(null);

  const currentCtr = counterQuestions[ctrIdx];

  const handleCtrPick = (val: number) => {
    if (ctrSelected !== null) return;
    setCtrSelected(val);
    setCtrDisplayVal(val);
    if (val === currentCtr.printedVal) {
      setCtrFeedback(`✅ Correct! ${currentCtr.note}`);
      const next = ctrScore + 1;
      setCtrScore(next);
      if (next >= counterQuestions.length) setCtrSolved(true);
    } else {
      setCtrFeedback(`❌ Wrong! The printed value is ${currentCtr.printedVal}. ${currentCtr.note}`);
    }
    setTimeout(() => {
      if (ctrIdx < counterQuestions.length - 1) {
        setCtrIdx(prev => prev + 1);
        setCtrSelected(null);
        setCtrFeedback(null);
        setCtrDisplayVal(null);
      }
    }, 1800);
  };

  // ==========================================
  // SECTION 3: RELATIONAL (Traffic Light Gate)
  // ==========================================
  const trafficQuestions = [
    { expr: "5 == 5",   correct: true,  reason: "TRUE — 5 equals 5, so the expression is 1." },
    { expr: "10 < 3",   correct: false, reason: "FALSE — 10 is not less than 3. Result is 0." },
    { expr: "8 != 8",   correct: false, reason: "FALSE — 8 equals 8, so != returns 0." },
    { expr: "15 >= 12", correct: true,  reason: "TRUE — 15 is greater than or equal to 12. Result is 1." },
    { expr: "7 > 7",    correct: false, reason: "FALSE — 7 is not strictly greater than 7. Use >= for that." },
    { expr: "4 <= 9",   correct: true,  reason: "TRUE — 4 is less than or equal to 9. Result is 1." },
  ];
  const [trafficIdx, setTrafficIdx] = useState<number>(0);
  const [trafficScore, setTrafficScore] = useState<number>(0);
  const [trafficLight, setTrafficLight] = useState<"idle" | "green" | "red">("idle");
  const [trafficFeedback, setTrafficFeedback] = useState<string | null>(null);
  const [trafficCarPos, setTrafficCarPos] = useState<number>(0);
  const [trafficSolved, setTrafficSolved] = useState<boolean>(false);
  const [trafficAnswered, setTrafficAnswered] = useState<boolean>(false);

  const currentTraffic = trafficQuestions[trafficIdx];

  const handleTrafficPick = (pick: boolean) => {
    if (trafficAnswered || trafficSolved) return;
    setTrafficAnswered(true);
    const isCorrect = pick === currentTraffic.correct;

    if (isCorrect) {
      setTrafficLight(currentTraffic.correct ? "green" : "red");
      setTrafficFeedback(`✅ ${currentTraffic.reason}`);
      if (currentTraffic.correct) setTrafficCarPos(prev => prev + 140);
      const nextScore = trafficScore + 1;
      setTrafficScore(nextScore);
      setTimeout(() => {
        setTrafficLight("idle");
        setTrafficFeedback(null);
        setTrafficAnswered(false);
        if (nextScore >= trafficQuestions.length) {
          setTrafficSolved(true);
        } else {
          setTrafficIdx(prev => prev + 1);
        }
      }, 1500);
    } else {
      setTrafficLight("red");
      setTrafficFeedback(`❌ Wrong! ${currentTraffic.reason}`);
      setTimeout(() => {
        setTrafficLight("idle");
        setTrafficFeedback(null);
        setTrafficAnswered(false);
      }, 1600);
    }
  };




  // ==========================================
  // SECTION 4: LOGICAL (Movie Ticket Gate)
  // ==========================================
  const movieScenes = [
    {
      title: "Night Action Movie",
      condition: "age >= 18 && hasTicket",
      evaluate: (age: number, hasTicket: boolean) => age >= 18 && hasTicket,
      hint: "AND (&&): BOTH conditions must be true to enter.",
    },
    {
      title: "Family Comedy",
      condition: "age >= 5 || hasTicket",
      evaluate: (age: number, hasTicket: boolean) => age >= 5 || hasTicket,
      hint: "OR (||): Either condition being true is enough to enter.",
    },
    {
      title: "VIP Screening",
      condition: "!hasTicket === false",
      evaluate: (_age: number, hasTicket: boolean) => !hasTicket === false,
      hint: "NOT (!): Flips true to false and false to true. !hasTicket is false when hasTicket is true.",
    },
  ];
  const [movieIdx, setMovieIdx] = useState<number>(0);
  const [movieAge, setMovieAge] = useState<number>(16);
  const [movieTicket, setMovieTicket] = useState<boolean>(false);
  const [movieScore, setMovieScore] = useState<number>(0);
  const [movieSolved, setMovieSolved] = useState<boolean>(false);
  const [movieFeedback, setMovieFeedback] = useState<string | null>(null);
  const [movieAnswered, setMovieAnswered] = useState<boolean>(false);

  const currentMovie = movieScenes[movieIdx];
  const movieResult = currentMovie.evaluate(movieAge, movieTicket);

  const handleMovieSubmit = () => {
    if (movieAnswered) return;
    setMovieAnswered(true);
    setMovieFeedback(`${ movieResult ? "✅ Gate OPEN!" : "🚫 Gate LOCKED."} ${currentMovie.hint}`);
    const next = movieScore + 1;
    setMovieScore(next);
    setTimeout(() => {
      setMovieAnswered(false);
      setMovieFeedback(null);
      setMovieAge(16);
      setMovieTicket(false);
      if (next >= movieScenes.length) {
        setMovieSolved(true);
      } else {
        setMovieIdx(prev => prev + 1);
      }
    }, 2000);
  };

  // ==========================================
  // SECTION 5: PRECEDENCE (Bubble Popper)
  // ==========================================
  const [precLevel, setPrecLevel] = useState<number>(0); // 0 = first level, 1 = parentheses level
  const [precFeedback, setPrecFeedback] = useState<string>("Click the operator bubble that evaluates first!");
  const [precSolved, setPrecSolved] = useState<boolean>(false);
  const [level0Solved, setLevel0Solved] = useState<boolean>(false);

  const handlePopBubble = (operator: "add" | "mul" | "paren") => {
    if (precLevel === 0) {
      if (operator === "mul") {
        setLevel0Solved(true);
        setPrecFeedback("💥 Pop! Multiplication happens before addition. Expression becomes: 4 + 10 = 14!");
      } else {
        setPrecFeedback("❌ Bzz! Multiplication (*) takes precedence over addition (+). Try again.");
      }
    } else {
      if (operator === "paren") {
        setPrecSolved(true);
        setPrecFeedback("💥 Pop! Parentheses ( ) override everything! Expression becomes: 5 * 4 = 20!");
      } else {
        setPrecFeedback("❌ Bzz! Parentheses ( ) have the absolute highest priority. They must evaluate first!");
      }
    }
  };

  // ==========================================
  // SECTION 6: CAPSTONE (Robot Bridge)
  // ==========================================
  const [capNumber, setCapNumber] = useState<number>(5);
  const [capSolved, setCapSolved] = useState<boolean>(false);
  const [capFeedback, setCapFeedback] = useState<string>("Find the canister size to lower the bridge shields.");

  const capEven = capNumber % 2 === 0;
  const capInRange = capNumber >= 10 && capNumber <= 20;
  const capValid = capInRange && !capEven;

  useEffect(() => {
    if (sectionIndex === 6) {
      if (capValid) {
        setCapSolved(true);
        setCapFeedback("🎉 Shield bypassed! Canister value satisfies range and odd conditions. Cross the bridge!");
      } else {
        setCapSolved(false);
        if (!capInRange) {
          setCapFeedback("Tip: Canister size must be between 10 and 20.");
        } else {
          setCapFeedback("Tip: Canister must be an ODD size (modulus rem != 0).");
        }
      }
    }
  }, [capNumber, capValid, capInRange, sectionIndex]);

  // Complete general section
  const handleSectionComplete = () => {
    if (hasCompleted) return;
    setHasCompleted(true);
    const xpAward = sectionIndex === 6 ? 20 : 10;
    onComplete(xpAward);
  };

  // Reset completion locks on section change
  useEffect(() => {
    setHasCompleted(false);
  }, [sectionIndex]);

  return (
    <div className="space-y-6">

      {/* ========================================== */}
      {/* SECTION 0: ARITHMETIC OPERATORS (Pizza Lab) */}
      {/* ========================================== */}
      {sectionIndex === 0 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">calculate</span>
                Arithmetic Operators: +, -, *, /, %
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                C performs basic mathematical calculations using operators, just like you do in school!
              </p>
            </div>

            {/* Operator glossary grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">+</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Addition:</strong> Adds toys to a pile!</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">-</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Subtraction:</strong> Takes toys away from the pile.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">*</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Multiplication:</strong> Clones toys into multiple piles!</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left col-span-1">
                <div className="text-primary font-bold text-xs mb-0.5">/</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Division:</strong> Shares toys equally, throwing away any leftovers! (5/2 = 2).</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left col-span-2 sm:col-span-1">
                <div className="text-secondary font-bold text-xs mb-0.5">%</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Modulus:</strong> Finds the leftover candy that cannot be shared equally! (5%2 = 1).</div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-5 rounded-xl space-y-4 border border-primary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-primary font-bold">🍕 Pizza Slicer Lab</span>
              <span className="text-primary-fixed-dim">Question: {pizzaScore + (pizzaSolved ? 0 : 1)} / {pizzaQuestions.length}</span>
            </div>

            {!pizzaSolved ? (
              <div className="space-y-4">
                {/* Pizza visual */}
                <div className="flex justify-center">
                  <div className="relative w-24 h-24">
                    <div className="w-24 h-24 rounded-full bg-amber-500/30 border-4 border-amber-500/60 flex items-center justify-center text-4xl shadow-lg">
                      🍕
                    </div>
                    <div className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full">
                      {currentPizza.expr}
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-white/5 text-xs text-on-surface leading-relaxed font-sans text-center">
                  {currentPizza.question}
                </div>

                {/* C Code Box */}
                <div className="bg-surface-container-lowest p-3 border border-white/10 rounded-xl font-mono text-[10px] sm:text-[11px] leading-relaxed text-primary-fixed-dim/95 max-w-full sm:max-w-md mx-auto shadow-inner relative overflow-x-auto">
                  <div className="absolute top-2 right-2 text-[8px] text-outline-variant select-none">main.c</div>
                  <pre className="whitespace-pre min-w-max p-1 text-left">{currentPizza.code}</pre>
                </div>

                {/* Input */}
                <div className="flex gap-2 w-full max-w-xs mx-auto">
                  <input
                    type="number"
                    value={pizzaInput}
                    onChange={e => { setPizzaInput(e.target.value); setPizzaFeedback(null); }}
                    onKeyDown={e => e.key === "Enter" && handlePizzaSubmit()}
                    placeholder="Your answer..."
                    className="flex-1 bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono text-on-surface focus:outline-none focus:border-primary w-full"
                  />
                  <button
                    onClick={handlePizzaSubmit}
                    disabled={pizzaInput === ""}
                    className="px-4 py-2.5 bg-primary text-on-primary text-xs font-bold rounded-lg cursor-pointer active:scale-95 transition-all disabled:opacity-40"
                  >
                    CHECK
                  </button>
                </div>

                {/* Feedback */}
                {pizzaFeedback && (
                  <div className={`text-xs font-mono text-center p-2 rounded-lg ${pizzaCorrect ? "text-primary bg-primary/10" : "text-error bg-error/10"}`}>
                    {pizzaFeedback}
                  </div>
                )}

                {pizzaCorrect && pizzaIdx < pizzaQuestions.length - 1 && (
                  <div className="flex justify-end">
                    <button onClick={handlePizzaNext} className="px-4 py-1.5 bg-secondary text-on-secondary text-xs font-bold rounded-lg cursor-pointer active:scale-95 transition-all">
                      NEXT SLICE ➜
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3 py-2">
                <span className="text-4xl">🏆</span>
                <p className="text-primary font-bold text-sm font-mono animate-pulse">All pizzas sliced! Arithmetic mastered!</p>
                <button
                  disabled={hasCompleted}
                  onClick={handleSectionComplete}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 mx-auto ${
                    hasCompleted ? "bg-primary/10 text-primary-fixed-dim border border-primary/30" : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                  }`}
                >
                  {hasCompleted ? "SECTION COMPLETED" : "COMPLETE & EARN 10 XP"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================== */}
      {/* SECTION 1: ASSIGNMENT (Shorthand Transformer) */}
      {/* ========================================== */}
      {sectionIndex === 1 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-secondary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">border_color</span>
                Assignment Operators: =, +=, -=, *=, /=, %=
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Assignment operators are **shorthand machines** to update the toy box value! Instead of writing <code className="text-secondary font-mono">x = x + 5</code>, C lets you write <code className="text-primary font-mono font-bold">x += 5</code>. Same result, less typing!
              </p>
            </div>

            {/* Operator glossary grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Assignment:</strong> Drops a new toy directly into the toy box.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">+=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Add-Assign:</strong> Adds toys to the box (x = x + y).</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">-=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Sub-Assign:</strong> Takes toys away from the box (x = x - y).</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">*=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Mul-Assign:</strong> Clones the toys inside the box (x = x * y).</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">/=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Div-Assign:</strong> Shares the toys inside the box (x = x / y).</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">%=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Mod-Assign:</strong> Puts only the leftover candy inside the box (x = x % y).</div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-5 rounded-xl space-y-5 border border-secondary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-secondary font-bold">⚡ Shorthand Transformer</span>
              <span className="text-secondary-fixed">{shScore} / {shorthandQuestions.length} correct</span>
            </div>

            {!shSolved ? (
              <div className="space-y-5">
                {/* Long form display */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Transform this long form:</p>
                  <div className="px-6 py-3 bg-surface-container-lowest border-2 border-white/10 rounded-xl font-mono font-black text-xl text-on-surface shadow-inner">
                    {currentSh.longForm}
                  </div>
                  <p className="text-[10px] font-mono text-on-surface-variant">Pick the matching shorthand:</p>
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-2 gap-3">
                  {currentSh.options.map(opt => (
                    <button
                      key={opt}
                      disabled={!!shSelected}
                      onClick={() => handleShorthandPick(opt)}
                      className={`py-3 px-4 rounded-xl border-2 font-mono font-bold text-sm cursor-pointer transition-all active:scale-95 disabled:cursor-not-allowed ${
                        shSelected === opt
                          ? opt === currentSh.correct
                            ? "bg-primary/20 border-primary text-primary-fixed-dim"
                            : "bg-error/20 border-error text-error"
                          : shSelected && opt === currentSh.correct
                          ? "bg-primary/10 border-primary/50 text-primary-fixed-dim"
                          : "bg-surface-container-high border-white/10 text-on-surface hover:border-secondary"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {shFeedback && (
                  <div className={`text-xs font-mono text-center p-2 rounded-lg ${
                    shSelected === currentSh.correct ? "text-primary bg-primary/10" : "text-error bg-error/10"
                  }`}>
                    {shFeedback}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3 py-2">
                <span className="text-4xl">⚡</span>
                <p className="text-secondary font-bold text-sm font-mono animate-pulse">All expressions transformed! Assignment operators mastered!</p>
                <button
                  disabled={hasCompleted}
                  onClick={handleSectionComplete}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 mx-auto ${
                    hasCompleted ? "bg-primary/10 text-primary-fixed-dim border border-primary/30" : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                  }`}
                >
                  {hasCompleted ? "SECTION COMPLETED" : "COMPLETE & EARN 10 XP"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================== */}
      {/* SECTION 2: INCREMENT/DECREMENT (Counter Machine) */}
      {/* ========================================== */}
      {sectionIndex === 2 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-tertiary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">exposure_plus_1</span>
                Add-One Machine: ++, --
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Special machines to add or subtract exactly 1 toy from a toy box!
              </p>
            </div>

            {/* Operator glossary grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">x++</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Post-Increment (Use then Add):</strong> The computer plays with the toy value FIRST, and then adds 1 to the box afterward.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">++x</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Pre-Increment (Add then Use):</strong> The computer adds 1 to the box FIRST, and then plays with the new value.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">x--</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Post-Decrement (Use then Sub):</strong> The computer plays with the toy value FIRST, and then subtracts 1 afterward.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">--x</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Pre-Decrement (Sub then Use):</strong> The computer subtracts 1 FIRST, and then plays with the new value.</div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-5 rounded-xl space-y-4 border border-tertiary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-tertiary font-bold">🔢 Counter Machine</span>
              <span className="text-on-surface-variant">{ctrScore} / {counterQuestions.length}</span>
            </div>

            {!ctrSolved ? (
              <div className="space-y-5">
                {/* Counter display */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Display Output</span>
                    <div className={`w-24 h-24 rounded-2xl border-4 font-mono font-black text-4xl flex items-center justify-center transition-all duration-300 ${
                      ctrSelected === null
                        ? "border-white/20 bg-surface-container-lowest text-on-surface-variant"
                        : ctrSelected === currentCtr.printedVal
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,218,243,0.3)]"
                        : "border-error bg-error/10 text-error"
                    }`}>
                      {ctrDisplayVal ?? "?"}
                    </div>
                    <span className="text-[10px] font-mono text-on-surface-variant">printf() prints this</span>
                  </div>
                </div>

                {/* Code line */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Code running:</span>
                  <div className="px-4 py-2.5 bg-surface-container-lowest border-2 border-white/10 rounded-xl font-mono text-sm font-bold text-on-surface">
                    {currentCtr.label}
                  </div>
                </div>

                {/* Answer buttons — what does printf print? */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-on-surface-variant text-center uppercase tracking-widest">What does printf() print?</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[currentCtr.printedVal - 1, currentCtr.printedVal, currentCtr.finalVal + 1]
                      .filter((v, i, arr) => arr.indexOf(v) === i)
                      .sort(() => Math.random() - 0.5)
                      .map(opt => (
                        <button
                          key={opt}
                          disabled={ctrSelected !== null}
                          onClick={() => handleCtrPick(opt)}
                          className={`py-3 rounded-xl border-2 font-mono font-bold text-lg cursor-pointer transition-all active:scale-95 disabled:cursor-not-allowed ${
                            ctrSelected === opt
                              ? opt === currentCtr.printedVal
                                ? "bg-primary/20 border-primary text-primary-fixed-dim"
                                : "bg-error/20 border-error text-error"
                              : ctrSelected !== null && opt === currentCtr.printedVal
                              ? "bg-primary/10 border-primary/50 text-primary-fixed-dim"
                              : "bg-surface-container-high border-white/10 text-on-surface hover:border-tertiary"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Feedback */}
                {ctrFeedback && (
                  <div className={`text-xs font-mono text-center p-2 rounded-lg leading-relaxed ${
                    ctrFeedback.startsWith("✅") ? "text-primary bg-primary/10" : "text-error bg-error/10"
                  }`}>
                    {ctrFeedback}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3 py-2">
                <span className="text-4xl">🏆</span>
                <p className="text-tertiary font-bold text-sm font-mono animate-pulse">Counter mastered! Pre vs Post increment clear!</p>
                <button
                  disabled={hasCompleted}
                  onClick={handleSectionComplete}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 mx-auto ${
                    hasCompleted ? "bg-primary/10 text-primary-fixed-dim border border-primary/30" : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                  }`}
                >
                  {hasCompleted ? "SECTION COMPLETED" : "COMPLETE & EARN 10 XP"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================== */}
      {/* SECTION 3: RELATIONAL (Traffic Light Gate) */}
      {/* ========================================== */}
      {sectionIndex === 3 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                Truth Detector Gate: ==, !=, &lt;, &gt;, &lt;=, &gt;=
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Relational operators are **Truth Detector Gates**! They compare two values and output <code className="text-primary font-mono font-bold">1</code> (representing TRUE) or <code className="text-error font-mono font-bold">0</code> (representing FALSE) in C.
              </p>
            </div>

            {/* Operator glossary grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">==</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Equal to:</strong> checks if both values are exactly equal!</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">!=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Not equal:</strong> checks if both values are different!</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">&lt;</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Less than:</strong> is the left side smaller than the right?</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">&gt;</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Greater than:</strong> is the left side bigger than the right?</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">&lt;=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Less/Equal:</strong> is the left side smaller or identical?</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-primary font-bold text-xs mb-0.5">&gt;=</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Greater/Equal:</strong> is the left side bigger or identical?</div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-5 rounded-xl space-y-4 border border-primary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-primary font-bold">🚦 Traffic Light Gate</span>
              <span className="text-primary-fixed-dim">{trafficScore} / {trafficQuestions.length} correct</span>
            </div>

            {!trafficSolved ? (
              <div className="space-y-4">

                {/* Road + Car + Light */}
                <div className="relative w-full h-28 bg-surface-container-lowest border border-white/5 rounded-xl overflow-hidden">
                  {/* Road stripes */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-white/5 border-t border-white/10" />
                  <div className="absolute bottom-3 left-0 right-0 flex gap-4 px-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="h-1 w-8 bg-white/20 rounded-full flex-shrink-0" />
                    ))}
                  </div>

                  {/* Car */}
                  <div
                    className="absolute bottom-3 text-2xl transition-all duration-700 ease-in-out"
                    style={{ left: `${24 + (trafficCarPos % 220)}px` }}
                  >
                    🚗
                  </div>

                  {/* Traffic light pole */}
                  <div className="absolute right-8 top-1 bottom-10 flex flex-col items-center gap-1">
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      trafficLight === "green" ? "bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "bg-green-900/40 border-green-900/30"
                    }`} />
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      trafficLight === "idle" ? "bg-yellow-500/60 border-yellow-500/50" : "bg-yellow-900/30 border-yellow-900/20"
                    }`} />
                    <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      trafficLight === "red" ? "bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "bg-red-900/40 border-red-900/30"
                    }`} />
                    <div className="w-1 flex-1 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Expression display */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Does this open the gate?</p>
                  <div className="px-8 py-3 bg-surface-container-lowest border-2 border-white/10 rounded-xl font-mono font-black text-xl text-on-surface shadow-inner">
                    {currentTraffic.expr}
                  </div>
                </div>

                {/* TRUE / FALSE buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    disabled={trafficAnswered}
                    onClick={() => handleTrafficPick(true)}
                    className="py-3.5 bg-green-500/10 border-2 border-green-500/30 hover:border-green-500 text-green-400 font-mono font-bold text-sm rounded-xl cursor-pointer transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✅ TRUE (1)
                  </button>
                  <button
                    disabled={trafficAnswered}
                    onClick={() => handleTrafficPick(false)}
                    className="py-3.5 bg-red-500/10 border-2 border-red-500/30 hover:border-red-500 text-red-400 font-mono font-bold text-sm rounded-xl cursor-pointer transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ❌ FALSE (0)
                  </button>
                </div>

                {/* Feedback */}
                {trafficFeedback && (
                  <div className={`text-xs font-mono text-center p-2 rounded-lg ${
                    trafficFeedback.startsWith("✅") ? "text-primary bg-primary/10" : "text-error bg-error/10"
                  }`}>
                    {trafficFeedback}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3 py-2">
                <span className="text-4xl">🏆</span>
                <p className="text-primary font-bold text-sm font-mono animate-pulse">All gates cleared! Relational operators mastered!</p>
                <button
                  disabled={hasCompleted}
                  onClick={handleSectionComplete}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 mx-auto ${
                    hasCompleted ? "bg-primary/10 text-primary-fixed-dim border border-primary/30" : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                  }`}
                >
                  {hasCompleted ? "SECTION COMPLETED" : "COMPLETE & EARN 10 XP"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================== */}
      {/* SECTION 4: LOGICAL (Movie Ticket Gate)     */}
      {/* ========================================== */}
      {sectionIndex === 4 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-secondary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Logical combination: &amp;&amp;, ||, ! ⚡
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Logical operators combine multiple condition checks or flip a true/false state around!
              </p>
            </div>

            {/* Operator glossary grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">&amp;&amp;</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Logical AND:</strong> Both must be TRUE! E.g. you can enter the play area only if you are age 5 AND have a ticket.</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">||</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Logical OR:</strong> At least one must be TRUE! E.g. you can enter if you are a student OR have a ticket.</div>
              </div>
              <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-secondary font-bold text-xs mb-0.5">!</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Logical NOT:</strong> Opposite day! Flips TRUE to FALSE, and FALSE to TRUE.</div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-5 rounded-xl space-y-5 border border-secondary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-secondary font-bold">🎞️ Movie Ticket Gate</span>
              <span className="text-on-surface-variant">{movieScore} / {movieScenes.length} scenes</span>
            </div>

            {!movieSolved ? (
              <div className="space-y-4">
                {/* Movie title + condition */}
                <div className="bg-surface-container-low p-3 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-on-surface-variant uppercase">Now Showing</span>
                    <span className="text-xs font-bold text-secondary">{currentMovie.title}</span>
                  </div>
                  <div className="font-mono font-bold text-sm text-on-surface bg-surface-container-lowest px-3 py-2 rounded-lg border border-white/10">
                    {currentMovie.condition}
                  </div>
                </div>

                {/* Sliders / toggles */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Age control */}
                  <div className="space-y-2 bg-surface-container-low p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-on-surface-variant">age</span>
                      <span className="text-primary font-bold">{movieAge}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={movieAge}
                      disabled={movieAnswered}
                      onChange={e => setMovieAge(Number(e.target.value))}
                      className="w-full h-1 rounded accent-primary cursor-pointer disabled:opacity-50"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-on-surface-variant">
                      <span>1</span><span>30</span>
                    </div>
                  </div>

                  {/* Ticket toggle */}
                  <div className="space-y-2 bg-surface-container-low p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                    <span className="text-xs font-mono text-on-surface-variant">hasTicket</span>
                    <button
                      disabled={movieAnswered}
                      onClick={() => setMovieTicket(t => !t)}
                      className={`w-full py-2 rounded-lg font-mono font-bold text-xs cursor-pointer transition-all active:scale-95 disabled:opacity-50 border-2 ${
                        movieTicket
                          ? "bg-primary/20 border-primary text-primary-fixed-dim"
                          : "bg-surface-container-high border-white/20 text-on-surface-variant"
                      }`}
                    >
                      {movieTicket ? "🎫 true" : "❌ false"}
                    </button>
                  </div>
                </div>

                {/* Live gate preview */}
                <div className={`flex items-center justify-center gap-3 p-3 rounded-xl border-2 transition-all duration-300 ${
                  movieResult
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-red-500/10 border-red-500/30"
                }`}>
                  <span className="text-3xl">{movieResult ? "🎬" : "🚫"}</span>
                  <div className="font-mono text-xs">
                    <span className="text-on-surface-variant">Gate status: </span>
                    <span className={`font-bold ${ movieResult ? "text-green-400" : "text-red-400"}`}>
                      {movieResult ? "OPEN — Enter!" : "LOCKED — Denied"}
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  disabled={movieAnswered}
                  onClick={handleMovieSubmit}
                  className="w-full py-2.5 bg-secondary text-on-secondary font-bold text-xs rounded-lg cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                >
                  CONFIRM &amp; NEXT SCENE
                </button>

                {/* Feedback */}
                {movieFeedback && (
                  <div className={`text-xs font-mono text-center p-2 rounded-lg leading-relaxed ${
                    movieFeedback.startsWith("✅") ? "text-primary bg-primary/10" : "text-on-surface-variant bg-surface-container-low"
                  }`}>
                    {movieFeedback}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3 py-2">
                <span className="text-4xl">🎬</span>
                <p className="text-secondary font-bold text-sm font-mono animate-pulse">All scenes passed! Logical operators mastered!</p>
                <button
                  disabled={hasCompleted}
                  onClick={handleSectionComplete}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 mx-auto ${
                    hasCompleted ? "bg-primary/10 text-primary-fixed-dim border border-primary/30" : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                  }`}
                >
                  {hasCompleted ? "SECTION COMPLETED" : "COMPLETE & EARN 10 XP"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}




      {/* ========================================== */}
      {/* SECTION 5: OPERATOR PRECEDENCE (Bubble Popper) */}
      {/* ========================================== */}
      {sectionIndex === 5 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-3">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-tertiary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                Precedence order: Who is the Boss? 👑
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Precedence rules decide which operator gets evaluated first inside complex math statements.
              </p>
            </div>

            {/* Operator glossary grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-white/10">
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">Priority 1: ( )</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Parentheses:</strong> The absolute Boss! Whatever is inside parentheses must be solved first.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">Priority 2: *, /, %</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Multipliers &amp; Remainder:</strong> Solved next, going from left to right.</div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[10px] text-left">
                <div className="text-tertiary font-bold text-xs mb-0.5">Priority 3: +, -</div>
                <div className="text-on-surface-variant font-sans leading-tight"><strong>Adders &amp; Subtractors:</strong> Solved last of all.</div>
              </div>
            </div>
          </section>

          <section className="glass-panel p-5 rounded-xl space-y-4 border border-tertiary/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-tertiary font-bold">Popping Board</span>
              <span className="text-primary-fixed-dim">{precLevel === 0 ? "Level 1: 4 + 5 * 2" : "Level 2: (3 + 2) * 4"}</span>
            </div>

            <div className="h-28 bg-surface-container-lowest border border-white/5 rounded-xl flex items-center justify-center gap-4 relative">
              {precLevel === 0 ? (
                !level0Solved ? (
                  <div className="flex items-center gap-3 font-code-md text-sm">
                    <span>4</span>
                    <button
                      onClick={() => handlePopBubble("add")}
                      className="w-8 h-8 rounded-full border border-white/20 hover:border-error hover:bg-error/15 text-xs font-bold cursor-pointer transition-all flex items-center justify-center"
                    >
                      +
                    </button>
                    <span>5</span>
                    <button
                      onClick={() => handlePopBubble("mul")}
                      className="w-8 h-8 rounded-full border border-primary hover:bg-primary/20 hover:scale-110 text-xs font-bold cursor-pointer transition-all flex items-center justify-center shadow"
                    >
                      *
                    </button>
                    <span>2</span>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <span className="font-mono text-sm text-primary font-bold">Solved Level 1: 14</span>
                    <button
                      onClick={() => {
                        setPrecLevel(1);
                        setPrecFeedback("Level 2: Popping override parameters! Click the operator bubble that evaluates first.");
                      }}
                      className="block mx-auto px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded font-bold text-xs"
                    >
                      GO TO LEVEL 2
                    </button>
                  </div>
                )
              ) : (
                !precSolved ? (
                  <div className="flex items-center gap-3 font-code-md text-sm">
                    <button
                      onClick={() => handlePopBubble("paren")}
                      className="px-3.5 py-1.5 rounded-full border-2 border-primary bg-primary/10 hover:scale-110 text-xs font-bold cursor-pointer transition-all shadow"
                    >
                      ( 3 + 2 )
                    </button>
                    <button
                      onClick={() => handlePopBubble("mul")}
                      className="w-8 h-8 rounded-full border border-white/20 hover:border-error hover:bg-error/15 text-xs font-bold cursor-pointer transition-all flex items-center justify-center"
                    >
                      *
                    </button>
                    <span>4</span>
                  </div>
                ) : (
                  <span className="text-primary font-bold text-xs">🎉 Precedence Mastery Achieved! (Output: 20)</span>
                )
              )}
            </div>

            <p className="text-xs font-mono text-center text-primary-fixed">
              {precFeedback}
            </p>

            {precSolved && (
              <div className="flex justify-end pt-2">
                <button
                  disabled={hasCompleted}
                  onClick={handleSectionComplete}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    hasCompleted
                      ? "bg-primary/10 text-primary-fixed-dim border border-primary/30"
                      : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                  }`}
                >
                  {hasCompleted ? "SECTION COMPLETED" : "COMPLETE & EARN 10 XP"}
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ========================================== */}
      {/* SECTION 6: LESSON 2 CAPSTONE (Robot Bridge)*/}
      {/* ========================================== */}
      {sectionIndex === 6 && (
        <div className="space-y-6 animate-fadeIn text-left">
          <section className="glass-panel p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Lesson 2 Capstone: Robot Canister Mission
            </h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed font-sans">
              Load an **ODD** canister size **between 10 and 20** to satisfy bridge security checks and drive the robot home.
            </p>
          </section>

          {/* Bridge Arena */}
          <div className="w-full h-24 bg-surface-container-lowest border border-white/5 rounded-xl flex items-center justify-between p-4 relative overflow-hidden">
            {/* Robot */}
            <div className={`text-4xl transition-all duration-1000 ${capSolved ? "translate-x-[75%]" : "translate-x-0"}`}>
              🤖
            </div>

            {/* Toxic lasers bridge */}
            <div className="flex-1 h-6 border-y-2 border-white/10 mx-6 relative flex items-center justify-center">
              {!capSolved ? (
                <div className="absolute inset-0 bg-error/20 flex items-center justify-center font-bold text-[9px] text-error font-mono tracking-widest animate-pulse">
                  ⚡ TOXIC LASER WALL ⚡
                </div>
              ) : (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center font-bold text-[9px] text-primary font-mono tracking-widest">
                  🔓 BRIDGE SHIELDS DOWN
                </div>
              )}
            </div>

            <div className="text-2xl">🏠</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Canister slider */}
            <div className="md:col-span-6 glass-panel p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>Canister Size:</span>
                  <span className="text-primary font-bold">{capNumber}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={capNumber}
                  onChange={(e) => setCapNumber(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="bg-surface-container-low p-3 rounded font-code-md text-xs space-y-1">
                <div>isValid = inRange &amp;&amp; isOdd;</div>
                <div className="text-[10px] text-outline-variant">
                  • inRange = (canister &gt;= 10 &amp;&amp; canister &lt;= 20)
                  <br />• isOdd = (canister % 2 != 0)
                </div>
              </div>
            </div>

            {/* Variable display HUD */}
            <div className="md:col-span-6 glass-panel p-4 rounded-xl border border-white/5 flex flex-col justify-between space-y-2">
              <span className="text-[10px] font-mono text-outline-variant uppercase">Logic HUD status</span>
              <div className="font-code-md text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span>isOdd:</span>
                  <span className={!capEven ? "text-primary font-bold" : "text-error"}>{!capEven ? "1 (True)" : "0 (False)"}</span>
                </div>
                <div className="flex justify-between">
                  <span>inRange:</span>
                  <span className={capInRange ? "text-primary font-bold" : "text-error"}>{capInRange ? "1 (True)" : "0 (False)"}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-1">
                  <span>isValid (Shield key):</span>
                  <span className={capValid ? "text-primary font-black animate-pulse" : "text-error font-bold"}>
                    {capValid ? "1 (SUCCESS)" : "0 (LOCKED)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs font-mono text-center text-primary-fixed-dim">
            {capFeedback}
          </p>

          {/* Complete capstone */}
          {capSolved && (
            <div className="flex justify-end pt-2 animate-fadeIn">
              <button
                disabled={hasCompleted}
                onClick={handleSectionComplete}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  hasCompleted
                    ? "bg-primary/10 text-primary-fixed-dim border border-primary/30"
                    : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                }`}
              >
                {hasCompleted ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    LESSON COMPLETE
                  </>
                ) : (
                  "COMPLETE LESSON & EARN 20 XP"
                )}
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
