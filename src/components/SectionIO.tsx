"use client";

import React, { useState } from "react";
import FormatChemistry from "./FormatChemistry";
import RobotSim from "./RobotSim";

interface SectionIOProps {
  onComplete: (xpAward: number) => void;
}

export default function SectionIO({ onComplete }: SectionIOProps) {
  // Sub-step: 0 = Printf & Alignment, 1 = Scanf & Address Bug, 2 = Specifier Chemistry, 3 = Code-a-Robot
  const [subStep, setSubStep] = useState<number>(0);

  // Sub-step 1: Escape sequences demo output
  const [showConsole1, setShowConsole1] = useState<boolean>(false);

  // Sub-step 2: Fix-the-Bug state
  const [bugCode, setBugCode] = useState<string>('scanf("%d", age);');
  const [hasFixedBug, setHasFixedBug] = useState<boolean>(false);
  const [debugLog, setDebugLog] = useState<string>("Run program to test code compiler.");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);

  const [chemistryCompleted, setChemistryCompleted] = useState<boolean>(false);
  const [robotCompleted, setRobotCompleted] = useState<boolean>(false);

  // Section completion
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  // Run printf escape sequence demo
  const handleRunPrintfDemo = () => {
    setShowConsole1(true);
  };

  // Run or fix the bug
  const handleRunBugProgram = () => {
    setIsCompiling(true);
    setDebugLog("Compiling main.c...");
    setTimeout(() => {
      setIsCompiling(false);
      if (hasFixedBug) {
        setDebugLog("Program output: Enter age: 25\nStored age: 25\nProcess exited successfully.");
      } else {
        setDebugLog("⚠️ SEGMENTATION FAULT (CRASH)!\n\nThis is computer speak for: 'The program crashed because you told me to deliver keyboard inputs, but you forgot to give me the toy box's mailing address (&)! I got lost trying to find where to store the number.'");
      }
    }, 1000);
  };

  const handleFixBug = () => {
    setBugCode('scanf("%d", &age);');
    setHasFixedBug(true);
    setDebugLog("Bug fixed! Address-of operator '&' added. Run code to verify.");
  };

  const handleResetBug = () => {
    setBugCode('scanf("%d", age);');
    setHasFixedBug(false);
    setDebugLog("Run program to test code compiler.");
  };

  const handleCompleteSection = () => {
    if (hasCompleted) return;
    setHasCompleted(true);
    onComplete(10); // Award 10 XP
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-step selector */}
      <div className="flex flex-wrap gap-2 justify-between items-center bg-surface-container-low p-2 rounded-lg border border-white/5 text-xs font-mono">
        <button
          onClick={() => setSubStep(0)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            subStep === 0 ? "bg-tertiary-container text-on-tertiary-container font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          1. Loudspeaker (printf) 📢
        </button>
        <button
          onClick={() => setSubStep(1)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            subStep === 1 ? "bg-tertiary-container text-on-tertiary-container font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          2. Listening Ear &amp; Bug 👂
        </button>
        <button
          disabled={!hasFixedBug}
          onClick={() => setSubStep(2)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 2 ? "bg-tertiary-container text-on-tertiary-container font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          3. Specifier Chemistry 🧪
        </button>
        <button
          disabled={!chemistryCompleted}
          onClick={() => setSubStep(3)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 3 ? "bg-tertiary-container text-on-tertiary-container font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          4. Code-a-Robot 🤖
        </button>
      </div>

      {/* SUB-STEP 1: OUTPUT (printf) & ALIGNMENT */}
      {subStep === 0 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <section className="glass-panel p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-tertiary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">output</span>
              Loudspeaker — printf 📢
            </h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Programs shout messages onto the screen using the **`printf`** loudspeaker! By combining plain text, variables, and format placeholders, you can print messages dynamically:
            </p>
            <div className="text-xs font-mono bg-white/5 p-3 rounded space-y-2">
              <div>
                <span className="text-on-surface-variant/70">// 1. Shouting plain words</span>
                <br /><code className="text-primary-fixed-dim">printf(&quot;Hello, World!\n&quot;);</code>
              </div>
              <div>
                <span className="text-on-surface-variant/70">// 2. Shouting toy box values using placeholders</span>
                <br /><code className="text-primary-fixed-dim">printf(&quot;Age is %d\n&quot;, age);</code>
              </div>
              <div>
                <span className="text-on-surface-variant/70">// 3. Shouting multiple values together</span>
                <br /><code className="text-primary-fixed-dim">printf(&quot;Grade: %c, Score: %f\n&quot;, grade, score);</code>
              </div>
            </div>
          </section>

          {/* Escape sequences block */}
          <section className="glass-panel p-4 rounded-xl space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-tertiary uppercase">Alignment Escape Codes</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Special formatting codes prefixed by a backslash `\` act like invisible keyboard actions (like pressing &apos;Enter&apos; or &apos;Tab&apos;) inside your text:
              </p>
              <ul className="list-disc list-inside text-xs text-on-surface-variant space-y-1 pl-2 font-mono">
                <li><span className="text-on-surface font-bold">\n</span> — Newline (presses &apos;Enter&apos; to push text down to the next line)</li>
                <li><span className="text-on-surface font-bold">\t</span> — Tab (presses &apos;Tab&apos; to make a wide horizontal space gap)</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {/* Code */}
              <div className="glass-panel rounded-xl overflow-hidden flex flex-col justify-between border border-white/5">
                <div className="bg-surface-container-high px-3 py-1.5 text-[10px] font-mono text-on-surface-variant">
                  main.c
                </div>
                <div className="p-4 bg-surface-container-low font-code-md text-xs space-y-1.5 flex-1 flex flex-col justify-center">
                  <div>printf(&quot;Name:\t%s\nAge:\t%d\n&quot;, &quot;Alice&quot;, 20);</div>
                  <button
                    onClick={handleRunPrintfDemo}
                    className="mt-3 py-1.5 bg-tertiary-container text-on-tertiary-container font-bold rounded text-xs active:scale-95 transition-all cursor-pointer select-none text-center"
                  >
                    RUN DEMO CODE
                  </button>
                </div>
              </div>

              {/* Terminal */}
              <div className="glass-panel rounded-xl overflow-hidden flex flex-col justify-between border border-white/5">
                <div className="bg-surface-container-high px-3 py-1.5 text-[10px] font-mono text-on-surface-variant">
                  SCREEN OUTPUT
                </div>
                <div className="p-4 bg-surface-container-lowest font-code-md text-xs text-primary-fixed-dim flex-1 flex flex-col justify-center">
                  {showConsole1 ? (
                    <div className="space-y-1">
                      <div className="flex">
                        <span className="w-16">Name:</span>
                        <span className="text-on-surface">Alice</span>
                      </div>
                      <div className="flex">
                        <span className="w-16">Age:</span>
                        <span className="text-on-surface">20</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-on-surface-variant">Awaiting execution...</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Next step button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setSubStep(1)}
              className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
            >
              NEXT: LISTENING EAR &amp; BUG 👂
            </button>
          </div>

        </div>
      )}

      {/* SUB-STEP 2: INPUT (scanf) & ADDRESS BUG GAME */}
      {subStep === 1 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <section className="glass-panel p-4 rounded-xl space-y-2.5">
            <h3 className="text-sm font-bold text-tertiary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">input</span>
              Listening Ear &amp; Mailing Address — scanf &amp; &amp; 👂
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We read keyboard entries using the **`scanf`** listening ear! 
              However, the ear needs to know *where* to store the typed values.
            </p>
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-on-surface-variant/90 leading-relaxed font-sans">
              <span className="text-secondary font-bold font-mono">The &amp; Address Symbol:</span>
              <br />Think of the **`&amp;`** symbol as the **mailing address** of the toy box in memory. 
              Writing <code className="text-primary-fixed-dim bg-white/5 px-1 rounded">&amp;age</code> tells `scanf` the exact playroom coordinates of the toy box, so it can drop the typed numbers directly inside it! If you don&apos;t give the address, the computer gets lost trying to deliver the toy and crashes with a **Segmentation Fault**!
            </div>
          </section>

          {/* Debug challenge card */}
          <section className="glass-panel p-5 rounded-xl space-y-4 border-error/25">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-xs font-mono">
              <span className="text-error font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">bug_report</span>
                Fix the Bug: Missing &amp; in scanf
              </span>
              {hasFixedBug && (
                <button
                  onClick={handleResetBug}
                  className="text-[10px] text-tertiary hover:underline cursor-pointer"
                >
                  Reset Challenge
                </button>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-on-surface-variant uppercase">main.c</span>
              <div className="p-4 bg-surface-container-low font-code-md text-xs space-y-2 rounded-lg border border-white/5">
                <div><span className="text-secondary font-bold">int</span> age;</div>
                <div>printf(&quot;Enter age: &quot;);</div>
                <div className="flex items-center gap-2">
                  <span className="text-on-surface">{bugCode}</span>
                  {!hasFixedBug && (
                    <button
                      onClick={handleFixBug}
                      className="px-2.5 py-1 bg-error/20 border border-error/50 hover:bg-error/35 text-error rounded text-[9px] font-mono font-bold transition-all active:scale-95 cursor-pointer animate-pulse"
                    >
                      FIX COMPILER BUG
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Run controls and Terminal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              <div className="flex flex-col justify-center">
                <button
                  disabled={isCompiling}
                  onClick={handleRunBugProgram}
                  className="py-2.5 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  RUN COMPILER
                </button>
              </div>

              {/* Console log feedback */}
              <div className={`p-3 rounded-lg border text-[11px] font-mono leading-relaxed whitespace-pre-wrap ${
                isCompiling
                  ? "bg-surface-container-low border-white/5 text-primary-fixed-dim"
                  : debugLog.includes("FAULT")
                  ? "bg-error/10 border-error/25 text-error animate-shake"
                  : hasFixedBug
                  ? "bg-primary/10 border-primary/25 text-primary-fixed-dim"
                  : "bg-surface-container-lowest border-white/5 text-on-surface-variant"
              }`}>
                {debugLog}
              </div>
            </div>
          </section>

          {/* Next step button */}
          <div className="flex justify-end pt-2">
            <button
              disabled={!hasFixedBug}
              onClick={() => setSubStep(2)}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                hasFixedBug
                  ? "bg-primary text-on-primary hover:bg-primary-container code-glow active:scale-95"
                  : "bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed"
              }`}
            >
              NEXT: SPECIFIER CHEMISTRY 🧪
            </button>
          </div>

        </div>
      )}

      {/* SUB-STEP 3: SPECIFIER CHEMISTRY GAME */}
      {subStep === 2 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <FormatChemistry onComplete={() => setChemistryCompleted(true)} />

          {chemistryCompleted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubStep(3)}
                className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
              >
                NEXT: CODE-A-ROBOT 🤖
              </button>
            </div>
          )}

        </div>
      )}

      {/* SUB-STEP 4: CODE-A-ROBOT SIMULATION */}
      {subStep === 3 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <RobotSim onComplete={() => setRobotCompleted(true)} />

          {robotCompleted && (
            <div className="flex justify-end pt-2">
              <button
                disabled={hasCompleted}
                onClick={handleCompleteSection}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  hasCompleted
                    ? "bg-primary/10 text-primary-fixed-dim border border-primary/30"
                    : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                }`}
              >
                {hasCompleted ? (
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
