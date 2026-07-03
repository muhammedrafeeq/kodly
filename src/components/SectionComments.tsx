"use client";

import React, { useState } from "react";

interface SectionCommentsProps {
  onComplete: (xpAward: number) => void;
}

// ConceptLock: the irreducible truth each sub-step must leave behind
function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 text-left space-y-1.5"
      style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,218,243,.07))", border: "1px solid rgba(167,139,250,.30)" }}>
      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest"
        style={{ color: "#A78BFA" }}>
        🔒 Non-Replaceable Concept
      </div>
      <div className="text-sm text-on-surface leading-relaxed font-sans">{children}</div>
    </div>
  );
}

// Analogy block
function Analogy({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 text-left space-y-1 text-sm leading-relaxed font-sans"
      style={{ background: "rgba(255,184,0,.09)", border: "1px solid rgba(255,184,0,.22)" }}>
      <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: "#FFB800" }}>
        💡 Analogy
      </div>
      {children}
    </div>
  );
}

// Code reveal
function CodeBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden text-left" style={{ border: "1px solid rgba(0,218,243,.18)" }}>
      <div className="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest"
        style={{ background: "rgba(0,218,243,.08)", color: "#00daf3" }}>
        {label}
      </div>
      <pre className="p-4 text-xs leading-relaxed overflow-x-auto bg-surface-container-lowest font-mono">{children}</pre>
    </div>
  );
}

// Gotcha block
function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-3.5 text-left flex gap-2 text-sm leading-relaxed font-sans"
      style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)" }}>
      <span className="text-base">⚠️</span>
      <div style={{ color: "#E9EDF8" }}>{children}</div>
    </div>
  );
}

// ───── SCRAMBLE GAME lines ─────
const RECIPE_LINES = [
  { id: "include", text: '#include <stdio.h>', correct: 0, label: "Bring tools in" },
  { id: "main",    text: 'int main() {',       correct: 1, label: "Where it starts" },
  { id: "printf",  text: '  printf("Hello!\\n");', correct: 2, label: "Do something" },
  { id: "return",  text: '  return 0;',        correct: 3, label: "Done, no errors" },
  { id: "close",   text: '}',                  correct: 4, label: "End of recipe" },
];

const COMMENT_SORT = [
  { text: 'printf("Hello!\\n");',         kind: "instruction" as const },
  { text: '// This greets the user',      kind: "note" as const },
  { text: 'int age = 25;',                kind: "instruction" as const },
  { text: '/* Created by Ahmed */',       kind: "note" as const },
  { text: 'return 0;',                    kind: "instruction" as const },
];

export default function SectionComments({ onComplete }: SectionCommentsProps) {
  const [subStep, setSubStep] = useState(0);
  const [hasCompletedSection, setHasCompletedSection] = useState(false);

  // ── Sub-step 1: Comment sort game ──
  const [sortAnswers, setSortAnswers] = useState<Record<number, "instruction" | "note" | null>>({});
  const [sortSubmitted, setSortSubmitted] = useState(false);

  // ── Sub-step 2: Recipe scramble ──
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [scrambled] = useState(() => {
    // shuffled: move each index
    const shuffled = [2, 4, 0, 3, 1];
    return shuffled;
  });
  const [recipeOrder, setRecipeOrder] = useState<number[]>([2, 4, 0, 3, 1]);
  const [recipeChecked, setRecipeChecked] = useState(false);
  const recipeCorrect = recipeOrder.every((v, i) => v === i);

  // ── Sub-step 3: quiz ──
  const [bakeAnswer, setBakeAnswer] = useState<string | null>(null);
  const [bakeSubmitted, setBakeSubmitted] = useState(false);

  const moveItem = (from: number, to: number) => {
    const next = [...recipeOrder];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setRecipeOrder(next);
    setRecipeChecked(false);
  };

  const handleFinalSubmit = () => {
    if (hasCompletedSection) return;
    setHasCompletedSection(true);
    onComplete(10);
  };

  return (
    <div className="space-y-6">

      {/* Sub-step nav */}
      <div className="flex flex-wrap gap-2 bg-surface-container-low p-2 rounded-lg border border-white/5 text-xs font-mono">
        {[
          { label: "1. Sticky Notes 📝", step: 0 },
          { label: "2. A Recipe 📖", step: 1 },
          { label: "3. Baking the Cake 🎂", step: 2 },
        ].map(({ label, step }) => (
          <button
            key={step}
            onClick={() => setSubStep(step)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              subStep === step
                ? "bg-primary text-on-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── SUB-STEP 1: STICKY NOTES ── */}
      {subStep === 0 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            A recipe card has <strong>instructions</strong> — steps the cook follows. It also has{" "}
            <strong>sticky notes</strong> — handwritten reminders from the last person who cooked it.
            The oven completely ignores the sticky notes. It only follows the real instructions.
            <br /><br />
            Comments in code work exactly the same way. The compiler sees them and{" "}
            <strong style={{ color: "#00D9C0" }}>throws them away</strong>. They exist only for humans reading the code.
          </Analogy>

          {/* Sort game */}
          <section className="glass-panel p-4 rounded-xl space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: "#A78BFA" }}>
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort the Lines — Instruction or Just a Note?
            </h3>
            <div className="space-y-2.5">
              {COMMENT_SORT.map((item, idx) => {
                const ans = sortAnswers[idx];
                const submitted = sortSubmitted;
                const correct = item.kind;
                const isRight = ans === correct;
                return (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <code className="flex-1 text-xs bg-surface-container-lowest px-3 py-2 rounded-lg font-mono border border-white/5 text-on-surface">
                      {item.text}
                    </code>
                    <div className="flex gap-2">
                      {(["instruction", "note"] as const).map((kind) => {
                        let style = "border border-white/10 text-on-surface-variant";
                        if (submitted) {
                          if (kind === correct) style = "border border-primary bg-primary/15 text-primary-fixed-dim font-bold";
                          else if (ans === kind && kind !== correct) style = "border border-error bg-error/10 text-error font-bold";
                          else style = "border border-white/5 opacity-30";
                        } else if (ans === kind) {
                          style = "border border-secondary bg-secondary/15 text-secondary font-bold";
                        }
                        return (
                          <button
                            key={kind}
                            disabled={sortSubmitted}
                            onClick={() => setSortAnswers((p) => ({ ...p, [idx]: kind }))}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${style}`}
                          >
                            {kind === "instruction" ? "⚙️ Instruction" : "📝 Sticky Note"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {!sortSubmitted ? (
              <button
                disabled={Object.keys(sortAnswers).length < COMMENT_SORT.length}
                onClick={() => setSortSubmitted(true)}
                className="px-5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold disabled:opacity-40 cursor-pointer active:scale-95 transition-all"
              >
                CHECK ANSWERS
              </button>
            ) : (
              <div className="text-sm font-sans" style={{ color: "#00D9C0" }}>
                ✓ Done! Green = what the computer runs. Sticky notes = human-only.
              </div>
            )}
          </section>

          <Gotcha>
            <strong>Unclosed block comment danger:</strong> If you open{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">{"/*"}</code> and forget to close it with{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">{"*/"}</code>,{" "}
            everything below it — including real code — is silently hidden from the compiler. The program stops compiling without obvious errors.
          </Gotcha>

          <ConceptLock>
            Comments are for <strong>humans only</strong>. The compiler sees them and throws them away.
            A good comment explains <em>why</em> the code does something — not what it literally does.
            An unclosed <code className="font-mono text-xs bg-white/10 px-1 rounded">{"/* block comment"}</code>{" "}
            silently swallows all code below it until it finds <code className="font-mono text-xs bg-white/10 px-1 rounded">{"*/"}</code>.
          </ConceptLock>

          <CodeBlock label="Code Reveal — both comment styles">
            {`// This is a single-line comment — computer ignores this line

/* This is a
   multi-line block comment
   The computer ignores everything inside */

printf("This line DOES run.\\n");`}
          </CodeBlock>

          <div className="flex justify-end">
            <button
              onClick={() => setSubStep(1)}
              className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer"
            >
              NEXT: A RECIPE →
            </button>
          </div>
        </div>
      )}

      {/* ── SUB-STEP 2: A RECIPE ── */}
      {subStep === 1 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            Every recipe has the same structure: a list of <strong>ingredients to gather</strong>, a clear{" "}
            <strong>start point</strong>, the <strong>steps</strong> in order, and a <strong>"I&apos;m done"</strong> signal.
            Every C program follows this exact same recipe format — always.
          </Analogy>

          {/* Recipe scramble game */}
          <section className="glass-panel p-4 rounded-xl space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: "#5EEAD4" }}>
              <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
              Drag to Fix the Recipe Order
            </h3>
            <p className="text-xs text-on-surface-variant font-sans">
              These 5 lines are out of order. Click ↑ / ↓ to move them into the correct position.
            </p>
            <div className="space-y-1.5">
              {recipeOrder.map((lineIdx, pos) => {
                const line = RECIPE_LINES[lineIdx];
                const isCorrect = recipeChecked && lineIdx === pos;
                const isWrong = recipeChecked && lineIdx !== pos;
                return (
                  <div
                    key={lineIdx}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isCorrect
                        ? "border-primary bg-primary/10"
                        : isWrong
                        ? "border-error bg-error/10"
                        : "border-white/10 bg-surface-container-low"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <button
                        disabled={pos === 0}
                        onClick={() => moveItem(pos, pos - 1)}
                        className="text-[11px] text-on-surface-variant disabled:opacity-20 cursor-pointer hover:text-primary leading-none"
                      >▲</button>
                      <button
                        disabled={pos === recipeOrder.length - 1}
                        onClick={() => moveItem(pos, pos + 1)}
                        className="text-[11px] text-on-surface-variant disabled:opacity-20 cursor-pointer hover:text-primary leading-none"
                      >▼</button>
                    </div>
                    <code className="flex-1 text-xs font-mono text-on-surface">{line.text}</code>
                    <span className="text-[10px] font-mono text-on-surface-variant">{line.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setRecipeChecked(true)}
                className="px-5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all"
              >
                CHECK ORDER
              </button>
              {recipeChecked && recipeCorrect && (
                <span className="text-sm font-bold self-center" style={{ color: "#00D9C0" }}>
                  ✓ Perfect recipe!
                </span>
              )}
              {recipeChecked && !recipeCorrect && (
                <span className="text-sm font-bold self-center" style={{ color: "#FF5F6E" }}>
                  Not quite — try again
                </span>
              )}
            </div>
          </section>

          <ConceptLock>
            Every C program needs <code className="font-mono text-xs bg-white/10 px-1 rounded">{"main()"}</code> — that&apos;s where
            the computer starts reading.{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">{"{ }"}</code> braces mark everything that belongs
            inside. <code className="font-mono text-xs bg-white/10 px-1 rounded">return 0;</code> tells the operating system
            the program finished without errors. Forgetting any of these breaks the whole program.
          </ConceptLock>

          <CodeBlock label="Fully Labelled Program Skeleton">
            {`#include <stdio.h>    // bring in print tools

int main() {           // start here
    printf("Hello!\\n");  // do something
    return 0;           // done, no errors
}`}
          </CodeBlock>

          <div className="flex justify-end">
            <button
              onClick={() => setSubStep(2)}
              className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer"
            >
              NEXT: BAKING THE CAKE →
            </button>
          </div>
        </div>
      )}

      {/* ── SUB-STEP 3: BAKING THE CAKE ── */}
      {subStep === 2 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            Writing code is writing the recipe. <strong>Compiling</strong> is baking — the oven (compiler)
            checks for mistakes and transforms it into something the computer can actually run.{" "}
            <strong>Running</strong> is serving the cake.
            <br /><br />
            You can&apos;t serve before it&apos;s baked. A mistake in the recipe stops the bake
            (<strong style={{ color: "#FF5F6E" }}>compile error</strong>).
            A mistake in execution is like the cake collapsing after it&apos;s out{" "}
            (<strong style={{ color: "#FF5F6E" }}>runtime error</strong>).
          </Analogy>

          {/* 3-stage visual */}
          <section className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              The Three Stages
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: "edit_note", label: "Write", sub: "You type the recipe (code)", color: "#A78BFA" },
                { icon: "build", label: "Compile", sub: "Oven checks & bakes it", color: "#FFB800" },
                { icon: "play_arrow", label: "Run", sub: "Serve and eat the cake", color: "#00D9C0" },
              ].map((s) => (
                <div key={s.label} className="bg-surface-container-low rounded-xl p-3 border border-white/5 space-y-1.5">
                  <span className="material-symbols-outlined text-[28px]" style={{ color: s.color }}>{s.icon}</span>
                  <div className="text-xs font-bold font-mono" style={{ color: s.color }}>{s.label}</div>
                  <div className="text-[10px] text-on-surface-variant font-sans leading-relaxed">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-surface-container-lowest rounded-xl p-3 border text-xs font-sans space-y-1" style={{ borderColor: "rgba(255,95,110,.25)" }}>
                <div className="font-bold" style={{ color: "#FF5F6E" }}>Compile Error</div>
                <p className="text-on-surface-variant">Recipe has a mistake — oven refuses to bake. Fix the code before anything runs.</p>
                <code className="text-[10px] block mt-1 opacity-70">{`error: missing ';' before '{'`}</code>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-3 border text-xs font-sans space-y-1" style={{ borderColor: "rgba(255,95,110,.18)" }}>
                <div className="font-bold" style={{ color: "#FF5F6E" }}>Runtime Error</div>
                <p className="text-on-surface-variant">Recipe was readable, baking succeeded — but the cake collapsed while serving. Program crashes mid-run.</p>
              </div>
            </div>

            {/* Quick quiz */}
            <div className="space-y-3 pt-1 border-t border-white/5">
              <p className="text-xs font-bold text-on-surface">
                Quick Check: You wrote <code className="font-mono bg-white/5 px-1">prnft("Hello");</code> — that&apos;s a typo. What happens?
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "The program runs but prints nothing", val: "a" },
                  { label: "Compile error — oven refuses to bake", val: "b" },
                  { label: "Runtime error — crashes while serving", val: "c" },
                ].map((opt) => {
                  let style = "border-white/10 bg-white/5";
                  if (bakeSubmitted) {
                    if (opt.val === "b") style = "border-primary bg-primary/10 text-primary-fixed-dim font-bold";
                    else if (bakeAnswer === opt.val) style = "border-error bg-error/10 text-error font-bold";
                    else style = "border-white/5 opacity-30";
                  } else if (bakeAnswer === opt.val) {
                    style = "border-secondary bg-secondary/15 text-secondary";
                  }
                  return (
                    <button
                      key={opt.val}
                      disabled={bakeSubmitted}
                      onClick={() => setBakeAnswer(opt.val)}
                      className={`text-left p-3 rounded-lg border text-xs font-mono transition-all cursor-pointer active:scale-[0.99] ${style}`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {!bakeSubmitted && bakeAnswer && (
                <button
                  onClick={() => setBakeSubmitted(true)}
                  className="px-5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all"
                >
                  SUBMIT
                </button>
              )}
              {bakeSubmitted && (
                <div className="text-xs font-sans p-3 rounded-lg bg-surface-container-low border border-white/5 text-on-surface-variant">
                  <strong className="text-on-surface block">Explanation:</strong>
                  A misspelled function name is caught before the program ever runs.
                  The compiler reads the code, sees an unknown word, and stops with an error.
                  This is a <strong style={{ color: "#FFB800" }}>compile error</strong>.
                </div>
              )}
            </div>
          </section>

          <ConceptLock>
            Code is for humans to write. The <strong>compiler</strong> translates it into machine language the computer runs.
            A <strong style={{ color: "#FF5F6E" }}>compile error</strong> means the recipe is unreadable — fix it before anything runs.
            A <strong style={{ color: "#FF5F6E" }}>runtime error</strong> means the recipe was readable but produced something wrong during execution.
            These are different problems with different solutions.
          </ConceptLock>

          {/* Capstone notice */}
          <div className="rounded-xl p-4 text-left border text-sm font-sans space-y-2"
            style={{ background: "rgba(255,184,0,.07)", borderColor: "rgba(255,184,0,.25)" }}>
            <div className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "#FFB800" }}>
              🏆 Lesson 3 Capstone Unlocked
            </div>
            <div className="font-bold text-on-surface">Tidy Up This Program</div>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              You&apos;ve learned all three parts: comments, structure, and the compile-run pipeline.
              Complete this section to earn XP and unlock the next lesson.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              disabled={hasCompletedSection}
              onClick={handleFinalSubmit}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                hasCompletedSection
                  ? "bg-primary/10 text-primary-fixed-dim border border-primary/30"
                  : "bg-primary text-on-primary code-glow"
              }`}
            >
              {hasCompletedSection ? (
                <><span className="material-symbols-outlined text-[16px]">verified</span> SECTION COMPLETED</>
              ) : (
                "COMPLETE & EARN 10 XP"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
