"use client";

import React, { useState } from "react";

interface SectionIfStatementProps {
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

// ── Bouncer gate component ──
function BouncerGate({ onList }: { onList: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="relative w-32 h-40 flex items-end justify-center">
        {/* Door frame */}
        <div className="absolute inset-0 rounded-t-2xl border-4 border-white/20 bg-surface-container-high overflow-hidden">
          {/* Door panel */}
          <div
            className="absolute inset-0 bg-surface-container-low transition-transform duration-700 origin-left"
            style={{ transform: onList ? "rotateY(-80deg)" : "rotateY(0deg)" }}
          />
          {/* Inside — glow when open */}
          {onList && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              <span className="text-[10px] font-mono font-bold" style={{ color: "#00D9C0" }}>WELCOME!</span>
            </div>
          )}
        </div>
      </div>
      <div className="text-xs font-mono font-bold" style={{ color: onList ? "#00D9C0" : "#FF5F6E" }}>
        {onList ? "Door opens — condition true" : "Door stays shut — condition false"}
      </div>
    </div>
  );
}

// ── Two-door component ──
function TwoDoors({ raining }: { raining: boolean }) {
  return (
    <div className="flex gap-6 justify-center py-4">
      {[
        { label: "☂️ Umbrella", active: raining, desc: "if (raining)" },
        { label: "😎 Sunglasses", active: !raining, desc: "else" },
      ].map((door) => (
        <div key={door.label} className="flex flex-col items-center gap-2">
          <div
            className="w-24 h-32 rounded-t-xl border-4 transition-all duration-500 flex items-center justify-center text-2xl"
            style={{
              borderColor: door.active ? "rgba(0,218,243,.6)" : "rgba(255,255,255,.15)",
              background: door.active ? "rgba(0,218,243,.12)" : "rgba(255,255,255,.03)",
              transform: door.active ? "scale(1.05)" : "scale(1)",
            }}
          >
            {door.active ? door.label.split(" ")[0] : "🚪"}
          </div>
          <div className="text-[10px] font-mono text-center" style={{ color: door.active ? "#00D9C0" : "#7B85A8" }}>
            {door.label}
            <div className="opacity-60">{door.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Mail slot component ──
const MAIL_ITEMS = [
  { id: "a", label: "Letter: score=92", value: 92, correctSlot: 0 },
  { id: "b", label: "Letter: score=78", value: 78, correctSlot: 1 },
  { id: "c", label: "Letter: score=61", value: 61, correctSlot: 2 },
  { id: "d", label: "Letter: score=45", value: 45, correctSlot: 3 },
];

const INITIAL_SLOTS = [
  { label: "score >= 90 → A", range: [90, 100] as [number, number] },
  { label: "score >= 75 → B", range: [75, 89] as [number, number] },
  { label: "score >= 60 → C", range: [60, 74] as [number, number] },
  { label: "else → Try again", range: [0, 59] as [number, number] },
];

export default function SectionIfStatement({ onComplete }: SectionIfStatementProps) {
  const [subStep, setSubStep] = useState(0);
  const [hasCompletedSection, setHasCompletedSection] = useState(false);

  // Step 1 — Bouncer
  const [onList, setOnList] = useState(false);

  // Step 2 — Two Doors
  const [raining, setRaining] = useState(false);

  // Step 3 — Mail Slots (order puzzle)
  const [slotOrder, setSlotOrder] = useState([0, 1, 2, 3]);
  const [mailChecked, setMailChecked] = useState(false);
  const moveSlot = (from: number, to: number) => {
    const next = [...slotOrder];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    setSlotOrder(next);
    setMailChecked(false);
  };
  const slotCorrect = slotOrder.every((v, i) => v === i);

  // Step 4 — Nested if quiz
  const [nestedAns, setNestedAns] = useState<string | null>(null);
  const [nestedSubmitted, setNestedSubmitted] = useState(false);

  // Capstone — Umbrella helper
  const [umbrellaRain, setUmbrellaRain] = useState(false);
  const [umbrellaCold, setUmbrellaCold] = useState(false);
  const [umbrellaResult, setUmbrellaResult] = useState<string | null>(null);

  const getUmbrellaAdvice = () => {
    if (umbrellaRain && umbrellaCold) return "Take an umbrella AND wear a coat!";
    if (umbrellaRain) return "Take an umbrella.";
    if (umbrellaCold) return "Wear a coat, no umbrella needed.";
    return "Enjoy the nice weather! 🌞";
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
          { label: "1. The Bouncer 🚪", step: 0 },
          { label: "2. Two Doors 🚪🚪", step: 1 },
          { label: "3. Mail Slots 📬", step: 2 },
          { label: "4. Rules in Rules 🏪", step: 3 },
          { label: "5. Capstone ☂️", step: 4 },
        ].map(({ label, step }) => (
          <button key={step} onClick={() => setSubStep(step)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${subStep === step ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* ── STEP 1: THE BOUNCER ── */}
      {subStep === 0 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            A bouncer at a club has one rule: if your name is on the guest list, the door opens.
            If not — the door stays shut and nothing happens. The program doesn&apos;t crash. It just
            moves on, as if that section never existed.
          </Analogy>

          <section className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">security</span>
              The Bouncer Gate
            </h3>
            <div className="flex flex-col items-center gap-4">
              <BouncerGate onList={onList} />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-mono">
                  <div
                    onClick={() => setOnList(!onList)}
                    className="w-12 h-6 rounded-full border-2 transition-all cursor-pointer relative"
                    style={{
                      background: onList ? "rgba(0,218,243,.3)" : "rgba(255,255,255,.1)",
                      borderColor: onList ? "#00D9C0" : "rgba(255,255,255,.2)",
                    }}
                  >
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all bg-white"
                      style={{ transform: onList ? "translateX(24px)" : "translateX(0)" }} />
                  </div>
                  <span style={{ color: onList ? "#00D9C0" : "#7B85A8" }}>
                    {onList ? "on_list = 1 (true)" : "on_list = 0 (false)"}
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-4 font-mono text-xs border border-white/5 space-y-1">
              <div><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-teal-300">on_list</span><span className="text-white"> == </span><span className="text-amber-300">1</span><span className="text-white">) {"{"}</span></div>
              <div className={`pl-4 transition-all ${onList ? "text-teal-300" : "text-white/20"}`}>  printf(<span className="text-orange-300">&quot;Welcome in!\n&quot;</span>);</div>
              <div><span className="text-white">{"}"}</span></div>
              <div className={`text-[10px] mt-2 font-sans ${onList ? "text-teal-400" : "text-white/30"}`}>
                {onList ? "→ condition is true → runs the block" : "→ condition is false → skips the block entirely"}
              </div>
            </div>
          </section>

          <Gotcha>
            <strong>= vs == one more time:</strong>{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">if (x = 5)</code>{" "}
            always runs — it assigns 5 to x (which is truthy). What you want is{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">if (x == 5)</code>{" "}
            which checks whether x equals 5. One equals sign assigns; two equals signs compare.
          </Gotcha>

          <ConceptLock>
            <code className="font-mono text-xs bg-white/10 px-1 rounded">if (condition)</code>{" "}
            runs its block <strong>only when the condition is true</strong>. When false, the block is skipped
            entirely — the program jumps past it. Nothing breaks. It just doesn&apos;t run that part.
          </ConceptLock>

          <CodeBlock label="Code Reveal">
            {`if (on_list == 1) {
    printf("Welcome in!\\n");
}
// If on_list is 0 (false), nothing prints — program moves on silently`}
          </CodeBlock>

          <div className="flex justify-end">
            <button onClick={() => setSubStep(1)} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer">
              NEXT: TWO DOORS →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: TWO DOORS ── */}
      {subStep === 1 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            Now there are two doors. One opens when the condition is true. The other opens when
            it&apos;s false. <strong>You always go through a door</strong> — you can&apos;t stay
            in the hallway forever. The program always takes one branch or the other.
          </Analogy>

          <section className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">door_front</span>
              Flip the Condition
            </h3>
            <TwoDoors raining={raining} />
            <div className="flex justify-center">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div onClick={() => setRaining(!raining)}
                  className="w-14 h-7 rounded-full border-2 transition-all cursor-pointer relative"
                  style={{ background: raining ? "rgba(0,218,243,.3)" : "rgba(255,255,255,.1)", borderColor: raining ? "#00D9C0" : "rgba(255,255,255,.2)" }}>
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all bg-white"
                    style={{ transform: raining ? "translateX(28px)" : "translateX(0)" }} />
                </div>
                <span className="text-sm font-mono" style={{ color: raining ? "#00D9C0" : "#7B85A8" }}>
                  {raining ? "🌧️ raining = true" : "☀️ raining = false"}
                </span>
              </label>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-4 font-mono text-xs border border-white/5 space-y-1">
              <div><span className="text-blue-400">if</span> <span className="text-white">(</span><span className="text-teal-300">raining</span><span className="text-white">) {"{"}</span></div>
              <div className={`pl-4 transition-all ${raining ? "text-teal-300" : "text-white/20"}`}>  printf(<span className="text-orange-300">&quot;Take an umbrella\n&quot;</span>);</div>
              <div><span className="text-white">{"}"} </span><span className="text-blue-400">else</span><span className="text-white"> {"{"}</span></div>
              <div className={`pl-4 transition-all ${!raining ? "text-teal-300" : "text-white/20"}`}>  printf(<span className="text-orange-300">&quot;Wear sunglasses\n&quot;</span>);</div>
              <div><span className="text-white">{"}"}</span></div>
            </div>
          </section>

          <ConceptLock>
            <code className="font-mono text-xs bg-white/10 px-1 rounded">else</code>{" "}
            is the catch-all: runs whenever the{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">if</code>{" "}
            condition is false. Exactly <strong>one of the two blocks always runs</strong> — never both, never neither. The program always has a path forward.
          </ConceptLock>

          <div className="flex justify-end">
            <button onClick={() => setSubStep(2)} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer">
              NEXT: MAIL SLOTS →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: MAIL SLOTS ── */}
      {subStep === 2 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            A mail sorter has slots stacked top to bottom. Each slot has a rule. A letter drops
            into the <strong>first slot whose rule it matches</strong> — it doesn&apos;t check
            the rest. <strong>Order matters</strong>: a wide rule placed above a narrow one
            catches things that should&apos;ve gone lower.
          </Analogy>

          <section className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">inbox</span>
              Reorder the Mail Slots — Click ↑ / ↓
            </h3>
            <p className="text-xs text-on-surface-variant font-sans">
              The slots below are scrambled. Reorder them so each score lands in the right grade slot.
            </p>
            <div className="space-y-2">
              {slotOrder.map((slotIdx, pos) => {
                const slot = INITIAL_SLOTS[slotIdx];
                const isCorrect = mailChecked && slotIdx === pos;
                const isWrong = mailChecked && slotIdx !== pos;
                return (
                  <div key={slotIdx}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-xs font-mono ${
                      isCorrect ? "border-primary bg-primary/10" : isWrong ? "border-error bg-error/10" : "border-white/10 bg-surface-container-low"
                    }`}>
                    <div className="flex flex-col gap-0.5">
                      <button disabled={pos === 0} onClick={() => moveSlot(pos, pos - 1)}
                        className="text-[11px] disabled:opacity-20 cursor-pointer hover:text-primary leading-none">▲</button>
                      <button disabled={pos === slotOrder.length - 1} onClick={() => moveSlot(pos, pos + 1)}
                        className="text-[11px] disabled:opacity-20 cursor-pointer hover:text-primary leading-none">▼</button>
                    </div>
                    <div className="flex-1">
                      <span className="text-blue-400">else if</span>{" "}
                      <span className="text-white">({slot.label.split("→")[0].trim()})</span>
                      {" → "}<span style={{ color: "#FFB800" }}>{slot.label.split("→")[1]}</span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant">
                      scores {slot.range[0]}–{slot.range[1]}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 items-center">
              <button onClick={() => setMailChecked(true)}
                className="px-5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all">
                CHECK ORDER
              </button>
              {mailChecked && slotCorrect && (
                <span className="text-sm font-bold" style={{ color: "#00D9C0" }}>✓ First-match wins!</span>
              )}
              {mailChecked && !slotCorrect && (
                <span className="text-sm font-bold" style={{ color: "#FF5F6E" }}>Not quite — try again</span>
              )}
            </div>

            {/* Show live result */}
            <div className="space-y-2 border-t border-white/5 pt-3">
              <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest">Live: Which slot does each score land in?</div>
              {MAIL_ITEMS.map((mail) => {
                const slot = INITIAL_SLOTS[slotOrder.findIndex((_, i) =>
                  mail.value >= INITIAL_SLOTS[slotOrder[i]].range[0] &&
                  mail.value <= INITIAL_SLOTS[slotOrder[i]].range[1]
                )];
                const correctSlot = INITIAL_SLOTS[mail.correctSlot];
                const landed = slot?.label ?? "else → Try again";
                const isRight = slot === correctSlot;
                return (
                  <div key={mail.id} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-on-surface-variant">{mail.label}</span>
                    <span style={{ color: isRight ? "#00D9C0" : "#FF5F6E" }}>→ {landed}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <ConceptLock>
            Conditions are checked <strong>top to bottom</strong>. The first one that&apos;s true runs — the rest are skipped.
            Order is not decorative. Putting a broad condition above a narrow one will swallow the narrow case
            and it will never run.
          </ConceptLock>

          <CodeBlock label="Code Reveal — if-else if-else chain">
            {`if (score >= 90)      { printf("A\\n"); }
else if (score >= 75) { printf("B\\n"); }
else if (score >= 60) { printf("C\\n"); }
else                  { printf("Try again\\n"); }
// First match wins — only ONE block ever runs`}
          </CodeBlock>

          <div className="flex justify-end">
            <button onClick={() => setSubStep(3)} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer">
              NEXT: RULES IN RULES →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: NESTED IF ── */}
      {subStep === 3 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <Analogy>
            A second check only makes sense after the first one passes. "If the shop is open,{" "}
            <em>then</em> check if they have your size." Checking the size when the shop is
            closed is pointless — and impossible. Nested ifs encode this natural
            &quot;only if the outer condition passed&quot; logic.
          </Analogy>

          {/* Visual demo */}
          <section className="glass-panel p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
              Is the Shop Open? Do They Have Your Size?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Shop is open", state: true },
                { label: "Has your size", state: true },
              ].map((item, i) => {
                const [checked, setChecked] = useState(false);
                return (
                  <label key={i} className="flex items-center gap-2 cursor-pointer select-none p-3 rounded-lg border border-white/10 bg-surface-container-low text-sm font-mono"
                    onClick={() => setChecked(!checked)}>
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                      style={{ borderColor: checked ? "#00D9C0" : "rgba(255,255,255,.2)", background: checked ? "rgba(0,218,243,.2)" : "transparent" }}>
                      {checked && <span className="text-[10px]">✓</span>}
                    </div>
                    <span style={{ color: checked ? "#00D9C0" : "#7B85A8" }}>{item.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Quiz */}
            <div className="space-y-3 border-t border-white/5 pt-4">
              <p className="text-xs font-bold text-on-surface">
                You could replace the nested if with a single condition. Which one?
              </p>
              {[
                { label: "if (shop_open || has_size)", val: "or", wrong: true },
                { label: "if (shop_open && has_size)", val: "and", wrong: false },
                { label: "if (!shop_open && has_size)", val: "not", wrong: true },
              ].map((opt) => {
                let style = "border-white/10 bg-white/5";
                if (nestedSubmitted) {
                  if (!opt.wrong) style = "border-primary bg-primary/10 text-primary-fixed-dim font-bold";
                  else if (nestedAns === opt.val) style = "border-error bg-error/10 text-error font-bold";
                  else style = "border-white/5 opacity-30";
                } else if (nestedAns === opt.val) style = "border-secondary bg-secondary/15 text-secondary";
                return (
                  <button key={opt.val} disabled={nestedSubmitted} onClick={() => setNestedAns(opt.val)}
                    className={`w-full text-left p-3 rounded-lg border text-xs font-mono transition-all cursor-pointer active:scale-[0.99] ${style}`}>
                    {opt.label}
                  </button>
                );
              })}
              {!nestedSubmitted && nestedAns && (
                <button onClick={() => setNestedSubmitted(true)}
                  className="px-5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all">
                  CHECK
                </button>
              )}
              {nestedSubmitted && (
                <div className="p-3 bg-surface-container-low border border-white/5 rounded-lg text-xs font-sans text-on-surface-variant">
                  <strong className="text-on-surface block mb-1">Correct!</strong>
                  The shop needs to be open <strong>AND</strong> have your size — both must be true.
                  <code className="font-mono block mt-1 text-teal-300">if (shop_open &amp;&amp; has_size)</code>
                  is exactly what nested if expresses, in one line.
                  But nested if is better when the inner check needs information only available inside the outer block.
                </div>
              )}
            </div>
          </section>

          <ConceptLock>
            A nested if only runs when the <strong>outer if has already passed</strong>.
            This creates layered gating. The same logic can often be expressed as a single{" "}
            <code className="font-mono text-xs bg-white/10 px-1 rounded">&amp;&amp;</code> —
            but nested ifs are clearer when the inner check depends on a value only available inside the outer block.
          </ConceptLock>

          <CodeBlock label="Code Reveal — nested vs &&">
            {`// Nested if
if (shop_open) {
    if (has_size) {
        printf("Buy it!\\n");
    }
}

// Equivalent with &&
if (shop_open && has_size) {
    printf("Buy it!\\n");
}`}
          </CodeBlock>

          <div className="flex justify-end">
            <button onClick={() => setSubStep(4)} className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs code-glow transition-all active:scale-95 cursor-pointer">
              CAPSTONE: UMBRELLA HELPER →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: CAPSTONE ── */}
      {subStep === 4 && (
        <div className="space-y-5 animate-fadeIn text-left">
          <div className="rounded-xl p-4 text-left border"
            style={{ background: "rgba(255,184,0,.07)", borderColor: "rgba(255,184,0,.25)" }}>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-1" style={{ color: "#FFB800" }}>
              🏆 Lesson Capstone
            </div>
            <div className="font-bold text-on-surface text-sm">Should I Carry an Umbrella?</div>
            <p className="text-xs text-on-surface-variant mt-1 font-sans leading-relaxed">
              Two yes/no questions. Your if / else if / else chain gives a recommendation.
              Zero math — pure decision logic.
            </p>
          </div>

          <section className="glass-panel p-5 rounded-xl space-y-5">
            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "🌧️ Is it raining?", val: umbrellaRain, set: setUmbrellaRain },
                { label: "🥶 Is it cold?", val: umbrellaCold, set: setUmbrellaCold },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-2 cursor-pointer select-none p-3 rounded-lg border text-sm font-mono border-white/10 bg-surface-container-low"
                  onClick={() => { item.set(!item.val); setUmbrellaResult(null); }}>
                  <div className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
                    style={{ borderColor: item.val ? "#00D9C0" : "rgba(255,255,255,.2)", background: item.val ? "rgba(0,218,243,.2)" : "transparent" }}>
                    {item.val && <span className="text-[10px]">✓</span>}
                  </div>
                  <span style={{ color: item.val ? "#00D9C0" : "#7B85A8" }}>{item.label}</span>
                </label>
              ))}
            </div>

            <button onClick={() => setUmbrellaResult(getUmbrellaAdvice())}
              className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl text-sm code-glow cursor-pointer active:scale-[0.99] transition-all">
              ▶ Run My Decision Program
            </button>

            {umbrellaResult && (
              <div className="animate-fadeIn">
                <div className="bg-surface-container-lowest rounded-xl p-4 border border-white/10 font-mono text-xs space-y-1.5">
                  <div className="text-on-surface-variant">&gt; ./umbrella_helper</div>
                  <div className="text-lg font-bold" style={{ color: "#00D9C0" }}>
                    {umbrellaResult}
                  </div>
                  <div className="text-on-surface-variant/40">Process exited with status 0</div>
                </div>

                <div className="mt-4 bg-surface-container-low rounded-xl p-4 border border-white/5 space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "#00daf3" }}>
                    The Code You Just Built
                  </div>
                  <pre className="text-xs font-mono text-on-surface leading-relaxed overflow-x-auto">{`if (raining && cold)   { printf("Umbrella AND coat!\\n"); }
else if (raining)      { printf("Take an umbrella.\\n"); }
else if (cold)         { printf("Wear a coat.\\n"); }
else                   { printf("Enjoy the weather!\\n"); }`}</pre>
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
                ? <><span className="material-symbols-outlined text-[16px]">verified</span> COMPLETED</>
                : "COMPLETE & EARN 10 XP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
