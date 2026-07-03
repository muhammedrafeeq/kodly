"use client";

import React, { useState } from "react";

const KEYFRAMES = `
@keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
@keyframes popIn { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
@keyframes traySlide { from{transform:translateX(60px);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes steam { 0%{opacity:0;transform:translateY(0)} 50%{opacity:.7;transform:translateY(-12px)} 100%{opacity:0;transform:translateY(-22px)} }
.fn-slide-in { animation: slideIn 0.4s ease forwards; }
.fn-pop-in { animation: popIn 0.35s ease forwards; }
.fn-tray-in { animation: traySlide 0.5s ease forwards; }
.fn-steaming { animation: steam 1.2s ease infinite; }
`;

function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.12),rgba(0,217,192,.08))", border: "1px solid rgba(167,139,250,.35)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>🔒 Concept</div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#E9EDF8", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: 12, display: "flex", gap: 8, marginBottom: 12 }}>
      <span style={{ flexShrink: 0 }}>⚠️</span>
      <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#E9EDF8" }}>{children}</div>
    </div>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div style={{ border: "1px solid rgba(0,218,243,.18)", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ padding: "6px 14px", background: "rgba(0,218,243,.08)", color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, fontWeight: 700 }}>{label}</div>
      <pre style={{ padding: 16, background: "#0D1117", fontFamily: "'Courier New',monospace", fontSize: 12.5, lineHeight: 1.7, margin: 0, overflowX: "auto" as const, color: "#E9EDF8" }}>{code}</pre>
    </div>
  );
}

// ─── Sub-step 0: Recipe Card ─────────────────────────────────────────────────

function RecipeStep() {
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [runCount, setRunCount] = useState(0);
  const [arrowLen, setArrowLen] = useState(0);
  const [pizzaVisible, setPizzaVisible] = useState(false);

  const stepColors = ["#FFB800", "#00D9C0", "#A78BFA"];
  const stepLabels = ["mix()", "addSauce()", "bake()"];

  function handleCall() {
    if (phase === "running") return;
    setPhase("running");
    setActiveStep(-1);
    setPizzaVisible(false);
    setArrowLen(0);

    let len = 0;
    const iv = setInterval(() => {
      len += 6;
      setArrowLen(len);
      if (len >= 72) clearInterval(iv);
    }, 20);

    setTimeout(() => setActiveStep(0), 300);
    setTimeout(() => setActiveStep(1), 700);
    setTimeout(() => setActiveStep(2), 1100);
    setTimeout(() => {
      setPizzaVisible(true);
      setRunCount(c => c + 1);
    }, 1500);
    setTimeout(() => {
      setPhase("done");
    }, 2200);
  }

  return (
    <div>
      <svg viewBox="0 0 380 160" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Left panel */}
        <rect x="8" y="8" width="160" height="144" rx="6" fill="rgba(24,29,46,0.9)" stroke="#FFB800" strokeWidth="1.5" />
        <text x="88" y="24" textAnchor="middle" fill="#FFB800" fontSize="8" fontFamily="'Courier New',monospace" letterSpacing="2" fontWeight="700">DEFINE ZONE</text>
        {/* Recipe card */}
        <rect x="24" y="32" width="128" height="108" rx="4" fill="rgba(20,25,40,0.8)" stroke="#FFB800" strokeWidth="1" />
        <polygon points="128,32 152,32 152,56" fill="#FFB800" opacity="0.5" />
        {stepLabels.map((label, i) => (
          <g key={i}>
            <rect x="34" y={46 + i * 28} width="100" height="18" rx="3"
              fill={activeStep === i ? stepColors[i] + "33" : "rgba(10,15,30,0.8)"}
              stroke={activeStep === i ? stepColors[i] : "rgba(255,255,255,0.1)"}
              strokeWidth="1" />
            <text x="84" y={46 + i * 28 + 12} textAnchor="middle" fill={activeStep === i ? stepColors[i] : "#7B85A8"} fontSize="10" fontFamily="'Courier New',monospace">{label}</text>
          </g>
        ))}
        {/* Arrow */}
        {arrowLen > 0 && (
          <>
            <line x1="168" y1="80" x2={168 + arrowLen} y2="80" stroke="#00D9C0" strokeWidth="2" />
            {arrowLen > 10 && (
              <polygon points={`${168 + arrowLen},80 ${168 + arrowLen - 8},75 ${168 + arrowLen - 8},85`} fill="#00D9C0" />
            )}
          </>
        )}
        {/* Right panel */}
        <rect x="212" y="8" width="160" height="144" rx="6" fill="rgba(24,29,46,0.9)" stroke="#00D9C0" strokeWidth="1.5" />
        <text x="292" y="24" textAnchor="middle" fill="#00D9C0" fontSize="8" fontFamily="'Courier New',monospace" letterSpacing="2" fontWeight="700">KITCHEN ZONE</text>
        {/* Stove */}
        <rect x="230" y="50" width="124" height="88" rx="6" fill="rgba(15,20,35,0.8)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <circle cx="270" cy="86" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        <circle cx="314" cy="86" r="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        {/* Pizza */}
        {pizzaVisible && (
          <text x="292" y="120" textAnchor="middle" fontSize="24" className="fn-pop-in">🍕</text>
        )}
        {/* Steam */}
        {pizzaVisible && [0, 1, 2].map(j => (
          <circle key={j} cx={278 + j * 14} cy="98" r="4" fill="#FFB800" opacity="0.4" className="fn-steaming"
            style={{ animationDelay: `${j * 0.3}s` }} />
        ))}
        {/* Run count badge */}
        {runCount > 0 && (
          <text x="292" y="44" textAnchor="middle" fill="#00D9C0" fontSize="9" fontFamily="'Courier New',monospace">called {runCount}×</text>
        )}
      </svg>

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button
          onClick={handleCall}
          disabled={phase === "running"}
          style={{ background: phase === "running" ? "#333" : "linear-gradient(135deg,#FFB800,#FF5F6E)", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: phase === "running" ? "not-allowed" : "pointer" }}
        >
          ▶ Call makePizza()
        </button>
      </div>

      <CodeBlock label="C Example" code={`void makePizza() {    // ← DEFINE once
    mix(); addSauce(); bake();
}
makePizza();          // ← CALL to run it
makePizza();          // ← call again — same recipe!`} />
      <ConceptLock>Define = write the recipe. Call = follow it. The function runs ONLY when called.</ConceptLock>
      <Gotcha>Writing a function but never calling it — the code exists but never runs.</Gotcha>
    </div>
  );
}

// ─── Sub-step 1: Parameters ───────────────────────────────────────────────────

function ParamsStep() {
  const [servings, setServings] = useState(4);
  const [topping, setTopping] = useState("cheese");
  const [output, setOutput] = useState<string | null>(null);
  const [slot1Anim, setSlot1Anim] = useState(false);
  const [slot2Anim, setSlot2Anim] = useState(false);
  const [steamVisible, setSteamVisible] = useState(false);

  function handleCook() {
    setSlot1Anim(false);
    setSlot2Anim(false);
    setSteamVisible(false);
    setOutput(null);
    setTimeout(() => setSlot1Anim(true), 50);
    setTimeout(() => setSlot2Anim(true), 200);
    setTimeout(() => {
      setSteamVisible(true);
      setOutput(`> Making pizza for ${servings} people with ${topping}!`);
    }, 500);
  }

  return (
    <div>
      <svg viewBox="0 0 380 160" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Recipe card */}
        <rect x="40" y="10" width="200" height="140" rx="6" fill="rgba(24,29,46,0.9)" stroke="#FFB800" strokeWidth="1.5" />
        <polygon points="216,10 240,10 240,34" fill="#FFB800" />
        <text x="140" y="32" textAnchor="middle" fill="#FFB800" fontSize="9" fontFamily="'Courier New',monospace" letterSpacing="2" fontWeight="700">RECIPE PARAMS</text>
        {/* Slot 1 */}
        <rect x="56" y="38" width="168" height="28" rx="4" fill="rgba(10,15,30,0.8)" stroke="#FFB800" strokeWidth="1" strokeDasharray="4 3" />
        <text x="68" y="55" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">servings:</text>
        {slot1Anim ? (
          <text x="160" y="55" fill="#FFB800" fontSize="12" fontFamily="'Courier New',monospace" fontWeight="700" className="fn-pop-in">{servings}</text>
        ) : (
          <text x="160" y="55" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">[___]</text>
        )}
        {/* Slot 2 */}
        <rect x="56" y="76" width="168" height="28" rx="4" fill="rgba(10,15,30,0.8)" stroke="#A78BFA" strokeWidth="1" strokeDasharray="4 3" />
        <text x="68" y="93" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">topping:</text>
        {slot2Anim ? (
          <text x="155" y="93" fill="#A78BFA" fontSize="12" fontFamily="'Courier New',monospace" fontWeight="700" className="fn-pop-in">{topping}</text>
        ) : (
          <text x="155" y="93" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">[___]</text>
        )}
        {/* Stove right side */}
        <rect x="264" y="20" width="100" height="120" rx="6" fill="rgba(15,20,35,0.8)" stroke="#00D9C0" strokeWidth="1.5" />
        <text x="314" y="38" textAnchor="middle" fill="#00D9C0" fontSize="8" fontFamily="'Courier New',monospace" letterSpacing="2">OVEN</text>
        <circle cx="314" cy="90" r="28" fill="rgba(255,184,0,0.05)" stroke="rgba(255,184,0,0.3)" strokeWidth="2" />
        {steamVisible && [0, 1, 2].map(j => (
          <circle key={j} cx={300 + j * 14} cy="58" r="4" fill="#FFB800" opacity="0.4" className="fn-steaming"
            style={{ animationDelay: `${j * 0.35}s` }} />
        ))}
        {steamVisible && <text x="314" y="96" textAnchor="middle" fontSize="20">🍕</text>}
      </svg>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center", flexWrap: "wrap" as const }}>
        <label style={{ color: "#E9EDF8", fontSize: 13 }}>
          Servings:&nbsp;
          <input type="number" min={1} max={20} value={servings} onChange={e => setServings(Number(e.target.value))}
            style={{ width: 60, background: "#0D1117", border: "1px solid #FFB800", borderRadius: 6, color: "#FFB800", padding: "4px 8px", fontSize: 13 }} />
        </label>
        <label style={{ color: "#E9EDF8", fontSize: 13 }}>
          Topping:&nbsp;
          <input type="text" value={topping} onChange={e => setTopping(e.target.value)}
            style={{ width: 100, background: "#0D1117", border: "1px solid #A78BFA", borderRadius: 6, color: "#A78BFA", padding: "4px 8px", fontSize: 13 }} />
        </label>
        <button onClick={handleCook}
          style={{ background: "linear-gradient(135deg,#FFB800,#FF5F6E)", border: "none", borderRadius: 8, padding: "8px 18px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          Cook it!
        </button>
      </div>

      {output && (
        <div className="fn-slide-in" style={{ background: "#0D1117", border: "1px solid #00D9C0", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontFamily: "'Courier New',monospace", fontSize: 13, color: "#00D9C0" }}>
          {output}
        </div>
      )}

      <CodeBlock label="C Example" code={`void makePizza(int servings, char topping[]) {
    printf("For %d: %s\\n", servings, topping);
}
makePizza(${servings}, "${topping}");  // fills the blanks`} />
      <Gotcha>C copies the value — changing a parameter inside the function doesn't change the original!</Gotcha>
    </div>
  );
}

// ─── Sub-step 2: Return Values ────────────────────────────────────────────────

function ReturnStep() {
  const [numA, setNumA] = useState(3);
  const [numB, setNumB] = useState(7);
  const [trayVisible, setTrayVisible] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  function handleOrder() {
    setTrayVisible(false);
    setResult(null);
    setTimeout(() => {
      setResult(numA + numB);
      setTrayVisible(true);
    }, 200);
  }

  return (
    <div>
      <svg viewBox="0 0 380 160" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Counter window */}
        <rect x="60" y="88" width="260" height="16" rx="3" fill="rgba(180,120,60,0.25)" stroke="rgba(180,120,60,0.5)" strokeWidth="1.5" />
        <text x="190" y="100" textAnchor="middle" fill="rgba(180,120,60,0.7)" fontSize="8" fontFamily="'Courier New',monospace" letterSpacing="2">COUNTER</text>
        {/* Customer (caller) */}
        <circle cx="38" cy="50" r="10" fill="none" stroke="#A78BFA" strokeWidth="2" />
        <line x1="38" y1="60" x2="38" y2="85" stroke="#A78BFA" strokeWidth="2" />
        <line x1="38" y1="70" x2="26" y2="78" stroke="#A78BFA" strokeWidth="2" />
        <line x1="38" y1="70" x2="50" y2="78" stroke="#A78BFA" strokeWidth="2" />
        <line x1="38" y1="85" x2="28" y2="105" stroke="#A78BFA" strokeWidth="2" />
        <line x1="38" y1="85" x2="48" y2="105" stroke="#A78BFA" strokeWidth="2" />
        <text x="38" y="120" textAnchor="middle" fill="#A78BFA" fontSize="8" fontFamily="'Courier New',monospace">caller</text>
        {/* Chef */}
        <rect x="334" y="30" width="20" height="8" rx="2" fill="#E9EDF8" />
        <rect x="337" y="38" width="14" height="4" fill="#E9EDF8" />
        <circle cx="344" cy="50" r="8" fill="none" stroke="#FFB800" strokeWidth="2" />
        <line x1="344" y1="58" x2="344" y2="82" stroke="#FFB800" strokeWidth="2" />
        <line x1="344" y1="68" x2="332" y2="76" stroke="#FFB800" strokeWidth="2" />
        <line x1="344" y1="68" x2="356" y2="76" stroke="#FFB800" strokeWidth="2" />
        <line x1="344" y1="82" x2="334" y2="102" stroke="#FFB800" strokeWidth="2" />
        <line x1="344" y1="82" x2="354" y2="102" stroke="#FFB800" strokeWidth="2" />
        <text x="344" y="118" textAnchor="middle" fill="#FFB800" fontSize="8" fontFamily="'Courier New',monospace">function</text>
        {/* Tray */}
        {trayVisible && result !== null && (
          <g className="fn-tray-in">
            <rect x="120" y="80" width="140" height="14" rx="3" fill="rgba(255,184,0,0.15)" stroke="#FFB800" strokeWidth="1.5" />
            <text x="190" y="91" textAnchor="middle" fill="#FFB800" fontSize="11" fontFamily="'Courier New',monospace" fontWeight="700">result = {result}</text>
          </g>
        )}
      </svg>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center", flexWrap: "wrap" as const }}>
        <label style={{ color: "#E9EDF8", fontSize: 13 }}>
          A:&nbsp;
          <input type="number" value={numA} onChange={e => setNumA(Number(e.target.value))}
            style={{ width: 60, background: "#0D1117", border: "1px solid #00D9C0", borderRadius: 6, color: "#00D9C0", padding: "4px 8px", fontSize: 13 }} />
        </label>
        <label style={{ color: "#E9EDF8", fontSize: 13 }}>
          B:&nbsp;
          <input type="number" value={numB} onChange={e => setNumB(Number(e.target.value))}
            style={{ width: 60, background: "#0D1117", border: "1px solid #00D9C0", borderRadius: 6, color: "#00D9C0", padding: "4px 8px", fontSize: 13 }} />
        </label>
        <button onClick={handleOrder}
          style={{ background: "linear-gradient(135deg,#00D9C0,#A78BFA)", border: "none", borderRadius: 8, padding: "8px 18px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          Order {numA} + {numB}!
        </button>
      </div>

      {trayVisible && result !== null && (
        <div className="fn-slide-in" style={{ background: "#0D1117", border: "1px solid #FFB800", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontFamily: "'Courier New',monospace", fontSize: 13, color: "#FFB800" }}>
          ← returns {result}
        </div>
      )}

      <CodeBlock label="C Example" code={`int addNumbers(int a, int b) {
    return a + b;  // slides result back
}
int result = addNumbers(${numA}, ${numB}); // result = ${numA + numB}`} />
      <ConceptLock>`return` sends a value back to the caller, then stops the function immediately.</ConceptLock>
    </div>
  );
}

// ─── Sub-step 3: Scope ────────────────────────────────────────────────────────

function ScopeStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [flourA, setFlourA] = useState(50);
  const [flourB, setFlourB] = useState(30);
  const [globalFlour, setGlobalFlour] = useState(100);

  return (
    <div>
      <svg viewBox="0 0 380 180" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Global shelf */}
        <rect x="10" y="8" width="360" height="36" rx="5" fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5" />
        <circle cx="48" cy="26" r="8" fill="rgba(167,139,250,0.3)" stroke="#A78BFA" strokeWidth="1.5" />
        <rect x="44" y="17" width="8" height="5" rx="1" fill="#A78BFA" />
        <text x="64" y="22" fill="#A78BFA" fontSize="8" fontFamily="'Courier New',monospace" letterSpacing="2" fontWeight="700">GLOBAL SHELF</text>
        <text x="64" y="35" fill="#E9EDF8" fontSize="10" fontFamily="'Courier New',monospace">globalFlour = {globalFlour}</text>
        {/* Kitchen A */}
        <rect x="10" y="56" width="172" height="116" rx="6" fill="rgba(0,217,192,0.05)" stroke="#00D9C0" strokeWidth="1.5" />
        <text x="96" y="74" textAnchor="middle" fill="#00D9C0" fontSize="9" fontFamily="'Courier New',monospace" letterSpacing="2" fontWeight="700">KITCHEN A</text>
        <circle cx="58" cy="120" r="22" fill="rgba(0,217,192,0.15)" stroke="#00D9C0" strokeWidth="2" />
        <rect x="51" y="97" width="14" height="6" rx="1" fill="#00D9C0" />
        <text x="58" y="124" textAnchor="middle" fill="#00D9C0" fontSize="11" fontFamily="'Courier New',monospace" fontWeight="700">{flourA}</text>
        <text x="96" y="152" textAnchor="middle" fill="#7B85A8" fontSize="8" fontFamily="'Courier New',monospace">flour = {flourA}</text>
        {/* Kitchen B */}
        <rect x="198" y="56" width="172" height="116" rx="6" fill="rgba(255,95,110,0.05)" stroke="#FF5F6E" strokeWidth="1.5" />
        <text x="284" y="74" textAnchor="middle" fill="#FF5F6E" fontSize="9" fontFamily="'Courier New',monospace" letterSpacing="2" fontWeight="700">KITCHEN B</text>
        <circle cx="246" cy="120" r="22" fill="rgba(255,95,110,0.15)" stroke="#FF5F6E" strokeWidth="2" />
        <rect x="239" y="97" width="14" height="6" rx="1" fill="#FF5F6E" />
        <text x="246" y="124" textAnchor="middle" fill="#FF5F6E" fontSize="11" fontFamily="'Courier New',monospace" fontWeight="700">{flourB}</text>
        <text x="284" y="152" textAnchor="middle" fill="#7B85A8" fontSize="8" fontFamily="'Courier New',monospace">flour = {flourB}</text>
        {/* Bottom note */}
        <text x="190" y="175" textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="'Courier New',monospace">A's &apos;flour&apos; and B&apos;s &apos;flour&apos; never meet</text>
      </svg>

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" as const }}>
        {/* Kitchen A control */}
        <div style={{ flex: 1, minWidth: 120, background: "rgba(0,217,192,0.08)", border: "1px solid rgba(0,217,192,0.3)", borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ color: "#00D9C0", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Kitchen A flour: {flourA}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setFlourA(v => Math.max(0, v - 5))} style={{ background: "rgba(0,217,192,0.2)", border: "none", borderRadius: 6, color: "#00D9C0", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>−</button>
            <button onClick={() => setFlourA(v => v + 5)} style={{ background: "rgba(0,217,192,0.2)", border: "none", borderRadius: 6, color: "#00D9C0", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>+</button>
          </div>
        </div>
        {/* Kitchen B control */}
        <div style={{ flex: 1, minWidth: 120, background: "rgba(255,95,110,0.08)", border: "1px solid rgba(255,95,110,0.3)", borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ color: "#FF5F6E", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Kitchen B flour: {flourB}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setFlourB(v => Math.max(0, v - 5))} style={{ background: "rgba(255,95,110,0.2)", border: "none", borderRadius: 6, color: "#FF5F6E", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>−</button>
            <button onClick={() => setFlourB(v => v + 5)} style={{ background: "rgba(255,95,110,0.2)", border: "none", borderRadius: 6, color: "#FF5F6E", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>+</button>
          </div>
        </div>
        {/* Global control */}
        <div style={{ flex: 1, minWidth: 120, background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ color: "#A78BFA", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Global flour: {globalFlour}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setGlobalFlour(v => Math.max(0, v - 10))} style={{ background: "rgba(167,139,250,0.2)", border: "none", borderRadius: 6, color: "#A78BFA", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>−</button>
            <button onClick={() => setGlobalFlour(v => v + 10)} style={{ background: "rgba(167,139,250,0.2)", border: "none", borderRadius: 6, color: "#A78BFA", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>+</button>
          </div>
        </div>
      </div>

      <CodeBlock label="C Example" code={`int globalFlour = 100;
void kitchenA() { int flour = ${flourA}; }  // A's flour
void kitchenB() { int flour = ${flourB}; }  // B's flour
// A's "flour" and B's "flour" never meet`} />
      <ConceptLock>Variables declared inside a function exist ONLY inside that function. They are invisible to everything outside.</ConceptLock>

      <button
        onClick={() => onComplete(60)}
        style={{ width: "100%", background: "linear-gradient(135deg,#00D9C0,#A78BFA)", border: "none", borderRadius: 10, padding: "14px 0", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8 }}
      >
        Complete — Claim 60 XP
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface Props { onComplete: (xp: number) => void; }

const TABS = ["Recipe", "Params", "Return", "Scope"];

export default function SectionFunctions({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", color: "#E9EDF8" }}>
      <style>{KEYFRAMES}</style>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" as const }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setSubStep(i)}
            style={{ flex: 1, minWidth: 70, background: subStep === i ? "rgba(0,217,192,0.18)" : "rgba(24,29,46,0.9)", border: `1px solid ${subStep === i ? "#00D9C0" : "rgba(255,255,255,0.1)"}`, borderRadius: 8, padding: "8px 0", color: subStep === i ? "#00D9C0" : "#7B85A8", fontWeight: subStep === i ? 700 : 400, fontSize: 13, cursor: "pointer" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Card */}
      <div style={{ background: "rgba(24,29,46,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 20 }}>
        {subStep === 0 && <RecipeStep />}
        {subStep === 1 && <ParamsStep />}
        {subStep === 2 && <ReturnStep />}
        {subStep === 3 && <ScopeStep onComplete={onComplete} />}
      </div>

      {/* Next button */}
      {subStep < 3 && (
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button onClick={() => setSubStep(s => s + 1)}
            style={{ background: "rgba(0,217,192,0.15)", border: "1px solid #00D9C0", borderRadius: 8, padding: "10px 24px", color: "#00D9C0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
