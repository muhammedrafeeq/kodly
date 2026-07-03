"use client";

import React, { useState } from "react";

interface SectionSwitchProps {
  onComplete: (xpAward: number) => void;
}

function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 text-left space-y-1.5"
      style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,218,243,.07))", border: "1px solid rgba(167,139,250,.30)" }}>
      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "#A78BFA" }}>
        🔒 Non-Replaceable Concept
      </div>
      <div className="text-sm text-on-surface leading-relaxed font-sans">{children}</div>
    </div>
  );
}

function Analogy({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 text-left space-y-1 text-sm leading-relaxed font-sans"
      style={{ background: "rgba(255,184,0,.09)", border: "1px solid rgba(255,184,0,.22)" }}>
      <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: "#FFB800" }}>💡 Analogy</div>
      {children}
    </div>
  );
}

function CodeBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden text-left" style={{ border: "1px solid rgba(0,218,243,.18)" }}>
      <div className="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest" style={{ background: "rgba(0,218,243,.08)", color: "#00daf3" }}>
        {label}
      </div>
      <pre className="p-4 text-xs leading-relaxed overflow-x-auto bg-surface-container-lowest font-mono">{children}</pre>
    </div>
  );
}

function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-3.5 text-left flex gap-2 text-sm leading-relaxed font-sans"
      style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)" }}>
      <span className="text-base">⚠️</span>
      <div style={{ color: "#E9EDF8" }}>{children}</div>
    </div>
  );
}

const VENDING_ITEMS: Record<number, { emoji: string; name: string }> = {
  1: { emoji: "💧", name: "Water" },
  2: { emoji: "🥤", name: "Cola" },
  3: { emoji: "🍫", name: "Chocolate" },
  4: { emoji: "🍕", name: "Pizza Slice" },
};

// Domino component — shows fall-through visually
function Domino({ label, hasBreak, active, fallen }: { label: string; hasBreak: boolean; active: boolean; fallen: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${fallen ? "opacity-100" : "opacity-50"}`}>
      <div
        className={`w-16 rounded-lg border-2 p-2 text-center transition-all duration-300 ${
          active
            ? "border-primary bg-primary/15 scale-105"
            : fallen
            ? "border-amber-400/60 bg-amber-400/10"
            : "border-white/15 bg-surface-container-low"
        }`}
        style={{ minHeight: "56px" }}
      >
        <div className="text-[10px] font-mono text-on-surface-variant">case {label}:</div>
        <div className="text-xs font-bold text-on-surface mt-0.5">runs</div>
        {hasBreak && (
          <div className="text-[9px] font-mono mt-1 font-bold" style={{ color: "#00D9C0" }}>break;</div>
        )}
      </div>
      {!hasBreak && fallen && (
        <div className="text-lg leading-none animate-bounce">⬇️</div>
      )}
    </div>
  );
}

export default function SectionSwitch({ onComplete }: SectionSwitchProps) {
  const [subStep, setSubStep] = useState(0);
  const [hasCompletedSection, setHasCompletedSection] = useState(false);

  // Step 1 — Vending Machine
  const [vendingChoice, setVendingChoice] = useState<number | null>(null);
  const [ifElseShown, setIfElseShown] = useState(false);

  // Step 2 — Domino / break trap
  const [breaks, setBreaks] = useState<Record<number, boolean>>({ 0: true, 1: false, 2: true, 3: true });
  const [dominoInput, setDominoInput] = useState(1); // which case to start

  // Which cases are "fallen" given current breaks and input
  const getFallen = () => {
    const result: number[] = [];
    let falling = false;
    for (let i = 0; i < 4; i++) {
      if (i === dominoInput - 1) falling = true;
      if (falling) {
        result.push(i);
        if (breaks[i]) { falling = false; break; }
      }
    }
    return result;
  };
  const fallen = getFallen();

  // Capstone — menu
  const MENU_ITEMS = ["Pizza", "Burger", "Salad", "Exit"];
  const [menuChoice, setMenuChoice] = useState<number | null>(null);
  const [menuResult, setMenuResult] = useState<string | null>(null);

  const getMenuResult = (choice: number) => {
    switch (choice) {
      case 1: return "🍕 Pizza ordered! That's ₹180.";
      case 2: return "🍔 Burger ordered! That's ₹120.";
      case 3: return "🥗 Salad ordered! That's ₹90.";
      case 4: return "👋 Goodbye!";
      default: return "❓ Invalid option — try 1 to 4.";
    }
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
          { label: "1. Vending Machine 🥤", step: 0 },
          { label: "2. Falling Dominoes 🁢", step: 1 },
          { label: "3. Capstone 🍕", step: 2 },
        ].map(({ label, step }) => (
          <button key={step} onClick={() => setSubStep(step)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${subStep === step ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── STEP 1: VENDING MACHINE ── */}
      {subStep === 0 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            A vending machine: press button 1 and you get exactly item 1. Not a range, not an approximation —
            an <strong>exact match</strong>. <code className="font-mono text-xs bg-white/10 px-1 rounded">switch</code>{" "}
            works the same way: one input, many possible exact answers. One always wins.
          </Analogy>

          <section className="glass-panel p-5 rounded-xl space-y-5">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              Vending Machine — Press a Button
            </h3>

            {/* Machine grid */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((n) => {
                const item = VENDING_ITEMS[n];
                const isChosen = vendingChoice === n;
                return (
                  <button
                    key={n}
                    onClick={() => setVendingChoice(n)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer active:scale-95"
                    style={{
                      borderColor: isChosen ? "#00D9C0" : "rgba(255,255,255,.12)",
                      background: isChosen ? "rgba(0,218,243,.12)" : "rgba(255,255,255,.03)",
                      transform: isChosen ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[10px] font-mono" style={{ color: isChosen ? "#00D9C0" : "#7B85A8" }}>
                      [{n}] {item.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {vendingChoice && (
              <div className="animate-fadeIn">
                <div className="bg-surface-container-lowest rounded-xl p-4 font-mono text-xs border border-white/10 space-y-1">
                  <div className="text-on-surface-variant">Output:</div>
                  <div className="text-xl">{VENDING_ITEMS[vendingChoice].emoji}</div>
                  <div className="font-bold" style={{ color: "#00D9C0" }}>
                    Dispensing {VENDING_ITEMS[vendingChoice].name}...
                  </div>
                </div>
              </div>
            )}

            {/* Compare with if-else chain */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <button onClick={() => setIfElseShown(!ifElseShown)}
                className="text-xs font-mono text-on-surface-variant hover:text-on-surface flex items-center gap-1 cursor-pointer transition-all">
                <span className="material-symbols-outlined text-[14px]">{ifElseShown ? "expand_less" : "expand_more"}</span>
                {ifElseShown ? "Hide" : "Show"} equivalent if-else chain (same result, more code)
              </button>
              {ifElseShown && (
                <div className="animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] font-mono font-bold mb-1" style={{ color: "#00D9C0" }}>switch (cleaner)</div>
                      <pre className="text-[10px] font-mono bg-surface-container-lowest rounded-lg p-3 border border-primary/20 leading-relaxed overflow-x-auto">{`switch (choice) {
  case 1: printf("Water\\n"); break;
  case 2: printf("Cola\\n");  break;
  case 3: printf("Choc\\n");  break;
  case 4: printf("Pizza\\n"); break;
  default: printf("?\\n");
}`}</pre>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold mb-1 text-on-surface-variant">if-else (messy)</div>
                      <pre className="text-[10px] font-mono bg-surface-container-lowest rounded-lg p-3 border border-white/5 leading-relaxed overflow-x-auto opacity-60">{`if (choice == 1)
  printf("Water\\n");
else if (choice == 2)
  printf("Cola\\n");
else if (choice == 3)
  printf("Choc\\n");
else if (choice == 4)
  printf("Pizza\\n");
else printf("?\\n");`}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          <ConceptLock>
            <code className="font-mono text-xs bg-white/10 px-1 rounded">switch</code>{" "}
            matches one value against a list of <strong>exact options</strong>. It can only check for
            equality — not ranges, not combinations. When you have many exact cases, switch is cleaner
            than a chain of if-else if. It only works on <strong>integers and characters</strong>, not text.
          </ConceptLock>

          <Gotcha>
            <strong>switch doesn&apos;t work on strings.</strong>{" "}
            You can&apos;t <code className="font-mono text-xs bg-white/10 px-1 rounded">switch(name)</code>{" "}
            if name is a word like &quot;Alice&quot;. It only works on numbers and single characters.
            For text matching, you need if-else with{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">strcmp()</code>.
          </Gotcha>

          <div className="flex justify-end">
            <button onClick={() => setSubStep(1)} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer">
              NEXT: FALLING DOMINOES →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: FALLING DOMINOES ── */}
      {subStep === 1 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            Forgetting <code className="font-mono text-xs bg-white/10 px-1 rounded">break</code>{" "}
            is like knocking over a domino. Without it, execution{" "}
            <strong>falls through</strong> into the next case — and the next — until it hits a
            break or the end of the switch. Usually accidental. Occasionally intentional.
          </Analogy>

          <section className="glass-panel p-5 rounded-xl space-y-5">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">view_week</span>
              Toggle break — Watch the Dominoes
            </h3>

            {/* Which case to match */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-on-surface-variant">Match case:</span>
              {[1, 2, 3, 4].map((n) => (
                <button key={n} onClick={() => setDominoInput(n)}
                  className="w-8 h-8 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
                  style={{
                    borderColor: dominoInput === n ? "#00D9C0" : "rgba(255,255,255,.15)",
                    background: dominoInput === n ? "rgba(0,218,243,.15)" : "transparent",
                    color: dominoInput === n ? "#00D9C0" : "#7B85A8",
                  }}>
                  {n}
                </button>
              ))}
            </div>

            {/* Dominos */}
            <div className="flex gap-4 items-start justify-center py-2">
              {[0, 1, 2, 3].map((i) => (
                <Domino
                  key={i}
                  label={String(i + 1)}
                  hasBreak={breaks[i]}
                  active={dominoInput - 1 === i}
                  fallen={fallen.includes(i)}
                />
              ))}
            </div>

            {/* break toggles */}
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <label key={i} className="flex flex-col items-center gap-1 cursor-pointer select-none">
                  <div onClick={() => setBreaks({ ...breaks, [i]: !breaks[i] })}
                    className="w-10 h-5 rounded-full border transition-all relative"
                    style={{
                      background: breaks[i] ? "rgba(0,218,243,.25)" : "rgba(255,95,110,.20)",
                      borderColor: breaks[i] ? "#00D9C0" : "#FF5F6E",
                    }}>
                    <div className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full transition-all bg-white"
                      style={{ transform: breaks[i] ? "translateX(20px)" : "translateX(0)" }} />
                  </div>
                  <span className="text-[9px] font-mono" style={{ color: breaks[i] ? "#00D9C0" : "#FF5F6E" }}>
                    case {i + 1}<br />{breaks[i] ? "break ✓" : "no break"}
                  </span>
                </label>
              ))}
            </div>

            {/* Execution trace */}
            <div className="bg-surface-container-lowest rounded-xl p-4 border border-white/5 font-mono text-xs space-y-1">
              <div className="text-on-surface-variant text-[10px] uppercase tracking-widest mb-2">Execution Trace</div>
              {fallen.map((i) => (
                <div key={i} style={{ color: i === dominoInput - 1 ? "#00D9C0" : "#FFB800" }}>
                  {i === dominoInput - 1 ? "→" : "  "} case {i + 1}: runs printf(...)
                  {breaks[i] ? <span className="text-teal-400"> → break; (stops)</span> : <span style={{ color: "#FF5F6E" }}> → falls through!</span>}
                </div>
              ))}
            </div>

            {/* Intentional fall-through example */}
            <div className="border-t border-white/5 pt-4 text-xs font-sans text-on-surface-variant space-y-2">
              <div className="font-bold text-on-surface text-[11px] font-mono uppercase tracking-wide">
                Intentional Fall-Through (valid use!)
              </div>
              <p>Sometimes two cases should share the same action — you intentionally skip break:</p>
              <pre className="font-mono text-[10px] bg-surface-container-low rounded-lg p-3 border border-white/5 leading-relaxed overflow-x-auto">{`case 'a':
case 'A':  // fall through from lowercase
    printf("You typed A\\n");
    break;`}</pre>
              <p>Both <code className="font-mono bg-white/10 px-1 rounded">&apos;a&apos;</code> and <code className="font-mono bg-white/10 px-1 rounded">&apos;A&apos;</code> print the same thing. This is intentional — mark it with a comment so nobody &quot;fixes&quot; it by accident.</p>
            </div>
          </section>

          <ConceptLock>
            Without <code className="font-mono text-xs bg-white/10 px-1 rounded">break</code>,
            execution <strong>falls into the next case automatically</strong> — it doesn&apos;t stop just because the
            label matched. Almost always a bug. Every case needs a break unless fall-through is intentional
            and clearly commented. Missing break is one of the most common switch bugs in C.
          </ConceptLock>

          <Gotcha>
            <strong>default doesn&apos;t need break</strong> (it&apos;s last and there&apos;s nowhere to fall) —
            but adding one anyway is harmless and a good habit.
          </Gotcha>

          <div className="flex justify-end">
            <button onClick={() => setSubStep(2)} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer">
              CAPSTONE: MENU HELPER →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: CAPSTONE ── */}
      {subStep === 2 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <div className="rounded-xl p-4 text-left border"
            style={{ background: "rgba(255,184,0,.07)", borderColor: "rgba(255,184,0,.25)" }}>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-1" style={{ color: "#FFB800" }}>
              🏆 Lesson 2 Capstone
            </div>
            <div className="font-bold text-on-surface text-sm">Menu-Driven Helper</div>
            <p className="text-xs text-on-surface-variant mt-1 font-sans leading-relaxed">
              Pick a menu option (1–4). switch routes you to the right response.
              Every case has break in the right place.
            </p>
          </div>

          <section className="glass-panel p-5 rounded-xl space-y-5">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
              Food Ordering System
            </h3>

            <div className="space-y-2">
              {MENU_ITEMS.map((item, i) => {
                const n = i + 1;
                const isChosen = menuChoice === n;
                return (
                  <button key={n} onClick={() => { setMenuChoice(n); setMenuResult(null); }}
                    className="w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all cursor-pointer active:scale-[0.99]"
                    style={{
                      borderColor: isChosen ? "#00D9C0" : "rgba(255,255,255,.1)",
                      background: isChosen ? "rgba(0,218,243,.08)" : "rgba(255,255,255,.02)",
                    }}>
                    <span className="font-mono text-[11px] px-2 py-1 rounded border font-bold"
                      style={{ borderColor: isChosen ? "#00D9C0" : "rgba(255,255,255,.15)", color: isChosen ? "#00D9C0" : "#7B85A8" }}>
                      [{n}]
                    </span>
                    <span style={{ color: isChosen ? "#E9EDF8" : "#7B85A8" }}>{item}</span>
                  </button>
                );
              })}
            </div>

            {menuChoice && (
              <button onClick={() => setMenuResult(getMenuResult(menuChoice))}
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl text-sm code-glow cursor-pointer active:scale-[0.99] transition-all">
                ▶ Run Order Program
              </button>
            )}

            {menuResult && (
              <div className="animate-fadeIn space-y-3">
                <div className="bg-surface-container-lowest rounded-xl p-4 border border-white/10 font-mono text-xs space-y-1.5">
                  <div className="text-on-surface-variant">&gt; ./menu</div>
                  <div className="text-base font-bold" style={{ color: "#00D9C0" }}>{menuResult}</div>
                  <div className="text-on-surface-variant/40">Process exited with status 0</div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4 border border-white/5 space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "#00daf3" }}>The Code Behind It</div>
                  <pre className="text-[10px] font-mono text-on-surface leading-relaxed overflow-x-auto">{`switch (choice) {
    case 1: printf("Pizza ordered! That's Rs.180.\\n"); break;
    case 2: printf("Burger ordered! That's Rs.120.\\n"); break;
    case 3: printf("Salad ordered! That's Rs.90.\\n");  break;
    case 4: printf("Goodbye!\\n");                       break;
    default: printf("Invalid option.\\n");
}`}</pre>
                </div>
              </div>
            )}
          </section>

          <div className="flex justify-end">
            <button disabled={hasCompletedSection} onClick={handleFinalSubmit}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                hasCompletedSection ? "bg-primary/10 text-primary-fixed-dim border border-primary/30" : "bg-primary text-on-primary code-glow"
              }`}>
              {hasCompletedSection
                ? <><span className="material-symbols-outlined text-[16px]">verified</span> MODULE 2 COMPLETED</>
                : "COMPLETE & EARN 10 XP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
