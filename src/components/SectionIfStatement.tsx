"use client";

import React, { useState } from "react";

// ── Inline styles ──────────────────────────────────────────────────────────
const styleTag = `
@keyframes slideLeft { from{transform:translateX(60px);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes slideRight { from{transform:translateX(-60px);opacity:0} to{transform:translateX(0);opacity:1} }
@keyframes popIn { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
@keyframes walkLeft { from{transform:translateX(0)} to{transform:translateX(-80px)} }
@keyframes walkRight { from{transform:translateX(0)} to{transform:translateX(80px)} }
@keyframes dropDown { from{transform:translateY(-40px);opacity:0} to{transform:translateY(0);opacity:1} }
@keyframes shake { 0%,100%{transform:translateX(0)} 30%{transform:translateX(-6px)} 70%{transform:translateX(6px)} }
.pop-in { animation: popIn 0.35s ease forwards; }
.drop-in { animation: dropDown 0.4s ease forwards; }
.shake { animation: shake 0.3s ease; }
`;

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  teal:   "#00D9C0",
  amber:  "#FFB800",
  coral:  "#FF5F6E",
  lav:    "#A78BFA",
  text:   "#E9EDF8",
  muted:  "#7B85A8",
  codeBg: "#0D1117",
};

// ── Helper UI components ───────────────────────────────────────────────────
function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,217,192,.07))",
      border: "1px solid rgba(167,139,250,.30)",
      borderRadius: 12, padding: "14px 16px",
    }}>
      <div style={{ color: C.lav, fontSize: 10, fontFamily: "monospace", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
        🔒 Concept Lock
      </div>
      <div style={{ color: C.text, fontSize: 13, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function CodeBox({ label, code }: { label: string; code: string }) {
  return (
    <div style={{ border: `1px solid rgba(0,217,192,.20)`, borderRadius: 12, overflow: "hidden" }}>
      <div style={{ background: "rgba(0,217,192,.08)", padding: "6px 14px",
        color: C.teal, fontSize: 10, fontFamily: "monospace", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </div>
      <pre style={{ background: C.codeBg, margin: 0, padding: "14px 16px",
        fontSize: 12, lineHeight: 1.7, color: C.text, overflowX: "auto", fontFamily: "monospace" }}>
        {code}
      </pre>
    </div>
  );
}

function NavBar({ step, setStep }: { step: number; setStep: (n: number) => void }) {
  const labels = ["Bouncer","Fork Road","Mail Slots","Treasure","Capstone"];
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {labels.map((l, i) => (
        <button key={i} onClick={() => setStep(i)}
          style={{
            padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 11,
            fontFamily: "monospace", fontWeight: step === i ? 700 : 400,
            background: step === i ? C.teal : "rgba(255,255,255,.06)",
            color: step === i ? "#000" : C.muted,
            border: step === i ? "none" : "1px solid rgba(255,255,255,.08)",
            transition: "all 0.2s",
          }}>
          {i + 1}. {l}
        </button>
      ))}
    </div>
  );
}

function NextBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
      <button onClick={onClick} style={{
        padding: "9px 22px", borderRadius: 9, cursor: "pointer", fontSize: 12,
        fontFamily: "monospace", fontWeight: 700,
        background: C.teal, color: "#000", border: "none", transition: "opacity 0.15s",
      }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
        {label} →
      </button>
    </div>
  );
}

// ── Sub-step 0: The Bouncer ────────────────────────────────────────────────
function StepBouncer({ onNext }: { onNext: () => void }) {
  const [age, setAge] = useState(20);
  const [result, setResult] = useState<"allowed" | "denied" | null>(null);
  const [key, setKey] = useState(0); // force re-animation

  const check = () => {
    setResult(age >= 18 ? "allowed" : "denied");
    setKey(k => k + 1);
  };

  const liveCode = `if (age >= 18) {
    printf("Come in!\\n");   // ← runs when true
} else {
    printf("Too young!\\n"); // ← runs when false
}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* SVG scene */}
      <svg viewBox="0 0 380 200" style={{ width: "100%", borderRadius: 12,
        background: "linear-gradient(180deg,#0a0f1a,#111827)" }}>

        {/* Velvet rope line */}
        <line x1="40" y1="145" x2="310" y2="145" stroke="#8B4513" strokeWidth="4" />
        {/* Rope posts */}
        <circle cx="100" cy="140" r="7" fill="#5a3300" stroke="#c8860a" strokeWidth="2" />
        <circle cx="200" cy="140" r="7" fill="#5a3300" stroke="#c8860a" strokeWidth="2" />

        {/* Club door */}
        <rect x="295" y="55" width="60" height="120" rx="4" fill="#1a1a2e" stroke="#333" strokeWidth="2" />
        {/* Door knob */}
        <circle cx="303" cy="115" r="4" fill="#888" />
        {/* Club sign */}
        <rect x="300" y="65" width="50" height="26" rx="4" fill="#1a0a00" stroke={C.amber} strokeWidth="1.5" />
        <text x="325" y="74" textAnchor="middle" fill={C.amber} fontSize="7" fontWeight="bold">CLUB</text>
        <text x="325" y="84" textAnchor="middle" fill={C.amber} fontSize="7" fontWeight="bold">18+</text>

        {/* Door glow when allowed */}
        {result === "allowed" && (
          <rect x="295" y="55" width="60" height="120" rx="4"
            fill="rgba(0,217,192,.15)" stroke={C.teal} strokeWidth="2.5" key={`glow-${key}`} />
        )}

        {/* Bouncer group */}
        <g key={`bouncer-${key}`}
          style={result === "allowed"
            ? { animation: "walkLeft 0.6s ease forwards", transformOrigin: "280px 120px" }
            : {}}>
          {/* Bouncer body */}
          <rect x="260" y="95" width="36" height="50" rx="5" fill="#2d2d3d" />
          {/* Bouncer head */}
          <circle cx="278" cy="85" r="15" fill="#3a3a4d" />
          {/* Bouncer sunglasses */}
          <rect x="268" y="82" width="8" height="5" rx="2" fill="#111" />
          <rect x="279" y="82" width="8" height="5" rx="2" fill="#111" />
          <line x1="276" y1="84" x2="279" y2="84" stroke="#555" strokeWidth="1" />
          {/* Bouncer arms */}
          <rect x="245" y="100" width="15" height="7" rx="3" fill="#2d2d3d" />
          <rect x="296" y="100" width="15" height="7" rx="3" fill="#2d2d3d" />
          {/* Label */}
          <text x="278" y="160" textAnchor="middle" fill={C.muted} fontSize="8">BOUNCER</text>
        </g>

        {/* Person approaching from left */}
        <g key={`person-${key}`}
          style={result === "denied"
            ? { animation: "walkLeft 0.6s 0.1s ease forwards", transformOrigin: "70px 120px" }
            : { animation: "slideRight 0.5s ease forwards" }}>
          {/* Age badge above head */}
          <rect x="52" y="48" width="36" height="18" rx="4"
            fill="rgba(255,184,0,.15)" stroke={C.amber} strokeWidth="1.5" />
          <text x="70" y="61" textAnchor="middle" fill={C.amber} fontSize="9" fontWeight="bold">
            age={age}
          </text>
          {/* Head */}
          <circle cx="70" cy="82" r="10" fill="#c8a882" />
          {/* Body */}
          <line x1="70" y1="92" x2="70" y2="130" stroke={C.text} strokeWidth="3" />
          {/* Arms */}
          <line x1="70" y1="100" x2="55" y2="112" stroke={C.text} strokeWidth="2.5" />
          <line x1="70" y1="100" x2="85" y2="112" stroke={C.text} strokeWidth="2.5" />
          {/* Legs */}
          <line x1="70" y1="130" x2="58" y2="150" stroke={C.text} strokeWidth="2.5" />
          <line x1="70" y1="130" x2="82" y2="150" stroke={C.text} strokeWidth="2.5" />
        </g>

        {/* Result overlays */}
        {result === "allowed" && (
          <g key={`ok-${key}`} className="pop-in" style={{ transformOrigin: "325px 115px" }}>
            <circle cx="325" cy="115" r="18" fill="rgba(0,217,192,.25)" stroke={C.teal} strokeWidth="2" />
            <text x="325" y="121" textAnchor="middle" fill={C.teal} fontSize="14" fontWeight="bold">✓</text>
          </g>
        )}
        {result === "denied" && (
          <g key={`no-${key}`} className="pop-in" style={{ transformOrigin: "325px 115px" }}>
            <circle cx="325" cy="115" r="18" fill="rgba(255,95,110,.25)" stroke={C.coral} strokeWidth="2" />
            <text x="325" y="121" textAnchor="middle" fill={C.coral} fontSize="14" fontWeight="bold">✗</text>
          </g>
        )}

        {result && (
          <text x="190" y="185" textAnchor="middle" fill={result === "allowed" ? C.teal : C.coral}
            fontSize="11" fontWeight="bold">
            {result === "allowed" ? "ALLOWED ✓  — condition true" : "DENIED ✗  — condition false"}
          </text>
        )}
      </svg>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label style={{ color: C.text, fontSize: 13 }}>
          Person&apos;s age:
          <input type="number" min={1} max={100} value={age}
            onChange={e => { setAge(Number(e.target.value)); setResult(null); }}
            style={{ marginLeft: 8, width: 64, padding: "4px 8px", borderRadius: 6,
              background: C.codeBg, border: `1px solid rgba(255,255,255,.15)`,
              color: C.text, fontSize: 13, fontFamily: "monospace" }} />
        </label>
        <button onClick={check} style={{
          padding: "7px 18px", borderRadius: 8, cursor: "pointer", fontSize: 12,
          fontWeight: 700, fontFamily: "monospace",
          background: C.amber, color: "#000", border: "none",
        }}>Check!</button>
      </div>

      {/* Live code */}
      <div style={{ background: C.codeBg, borderRadius: 10, padding: "14px 16px",
        fontFamily: "monospace", fontSize: 12, lineHeight: 1.8,
        border: "1px solid rgba(255,255,255,.08)" }}>
        <span style={{ color: "#569cd6" }}>if</span>
        {" (age >= 18) {\n"}
        <span style={{ color: result === "allowed" ? C.teal : C.muted, marginLeft: 16 }}>
          {"    printf(\"Come in!\\n\");   "}
        </span>
        <span style={{ color: C.muted }}>{"// ← runs when true\n"}</span>
        {"} "}
        <span style={{ color: "#569cd6" }}>else</span>
        {" {\n"}
        <span style={{ color: result === "denied" ? C.coral : C.muted }}>
          {"    printf(\"Too young!\\n\"); "}
        </span>
        <span style={{ color: C.muted }}>{"// ← runs when false\n"}</span>
        {"}"}
      </div>

      <ConceptLock>
        <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>if</code>
        {" only runs its block when the condition is "}
        <strong>true</strong>
        {". "}
        <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>else</code>
        {" runs when false. Never both — always exactly one."}
      </ConceptLock>

      <NextBtn label="NEXT: FORK ROAD" onClick={onNext} />
    </div>
  );
}

// ── Sub-step 1: The Fork Road ──────────────────────────────────────────────
function StepForkRoad({ onNext }: { onNext: () => void }) {
  const [score, setScore] = useState(60);
  const [rolled, setRolled] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const pass = score >= 50;

  const roll = () => {
    setRolled(true);
    setAnimKey(k => k + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <svg viewBox="0 0 380 180" style={{ width: "100%", borderRadius: 12,
        background: "linear-gradient(180deg,#0a0f1a,#111827)" }}>

        {/* Stem road */}
        <rect x="170" y="90" width="40" height="60" fill="#2a2a3a" />

        {/* Left branch (PASS) */}
        <polygon points="170,90 210,90 120,20 80,20" fill="#2a2a3a" />
        {/* Right branch (FAIL) */}
        <polygon points="170,90 210,90 300,20 260,20" fill="#2a2a3a" />

        {/* Road lines */}
        <line x1="190" y1="150" x2="190" y2="95" stroke="#fff" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="190" y1="92" x2="100" y2="22" stroke="#fff" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="190" y1="92" x2="280" y2="22" stroke="#fff" strokeWidth="2" strokeDasharray="6 4" />

        {/* PASS box */}
        <rect x="60" y="8" width="70" height="28" rx="5"
          fill={rolled && pass ? "rgba(0,217,192,.25)" : "rgba(0,0,0,.4)"}
          stroke={rolled && pass ? C.teal : C.muted} strokeWidth={rolled && pass ? 2 : 1} />
        <text x="95" y="27" textAnchor="middle" fill={rolled && pass ? C.teal : C.muted}
          fontSize="12" fontWeight="bold">PASS 🏆</text>

        {/* FAIL box */}
        <rect x="250" y="8" width="70" height="28" rx="5"
          fill={rolled && !pass ? "rgba(255,95,110,.25)" : "rgba(0,0,0,.4)"}
          stroke={rolled && !pass ? C.coral : C.muted} strokeWidth={rolled && !pass ? 2 : 1} />
        <text x="285" y="27" textAnchor="middle" fill={rolled && !pass ? C.coral : C.muted}
          fontSize="12" fontWeight="bold">FAIL 💔</text>

        {/* Ball */}
        <circle key={`ball-${animKey}`} cx="190" cy="155" r="12" fill={C.lav} stroke="rgba(167,139,250,.5)" strokeWidth="2"
          style={rolled
            ? { animation: `${pass ? "walkLeft" : "walkRight"} 0.7s 0.1s ease forwards`,
                transformOrigin: "190px 155px" }
            : {}} />

        {/* Score label */}
        <text x="190" y="178" textAnchor="middle" fill={C.muted} fontSize="10">
          score = {score}
        </text>
      </svg>

      {/* Slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label style={{ color: C.text, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          Score:
          <input type="range" min={0} max={100} value={score}
            onChange={e => { setScore(Number(e.target.value)); setRolled(false); }}
            style={{ width: 140 }} />
          <span style={{ fontFamily: "monospace", color: C.amber, fontWeight: 700 }}>{score}</span>
        </label>
        <button onClick={roll} style={{
          padding: "7px 18px", borderRadius: 8, cursor: "pointer", fontSize: 12,
          fontWeight: 700, fontFamily: "monospace",
          background: C.lav, color: "#000", border: "none",
        }}>Roll!</button>
      </div>

      <CodeBox label="C Code" code={`if (score >= 50) {
    printf("PASS\\n");
} else {
    printf("FAIL\\n");
}`} />

      <ConceptLock>
        Exactly <strong>one branch</strong> always runs — never both, never neither. The ball always rolls somewhere. Your program always has a path forward.
      </ConceptLock>

      <NextBtn label="NEXT: MAIL SLOTS" onClick={onNext} />
    </div>
  );
}

// ── Sub-step 2: Mail Slots ─────────────────────────────────────────────────
const GRADE_SLOTS = [
  { grade: "A", min: 90, max: 100, label: "90 – 100" },
  { grade: "B", min: 80, max: 89,  label: "80 – 89" },
  { grade: "C", min: 70, max: 79,  label: "70 – 79" },
  { grade: "D", min: 60, max: 69,  label: "60 – 69" },
  { grade: "F", min: 0,  max: 59,  label: "< 60" },
];

function getGrade(score: number): number {
  if (score >= 90) return 0;
  if (score >= 80) return 1;
  if (score >= 70) return 2;
  if (score >= 60) return 3;
  return 4;
}

function StepMailSlots({ onNext }: { onNext: () => void }) {
  const [score, setScore] = useState(75);
  const [sent, setSent] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const gradeIdx = getGrade(score);

  const send = () => {
    setSent(true);
    setAnimKey(k => k + 1);
  };

  // Slot top-y positions (stacked, 5 slots of 28px each with 4px gap)
  const slotY = (i: number) => 10 + i * 35;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <svg viewBox="0 0 380 200" style={{ width: "100%", borderRadius: 12,
        background: "linear-gradient(180deg,#0a0f1a,#111827)" }}>

        {/* Post-office wall */}
        <rect x="160" y="5" width="190" height="185" rx="6" fill="#161b2e" stroke="rgba(255,255,255,.06)" strokeWidth="1" />

        {/* Mail slots */}
        {GRADE_SLOTS.map((s, i) => {
          const y = slotY(i);
          const active = sent && i === gradeIdx;
          return (
            <g key={s.grade}>
              <rect x="165" y={y + 5} width="180" height="26" rx="3"
                fill={active ? "rgba(0,217,192,.15)" : "rgba(255,255,255,.04)"}
                stroke={active ? C.teal : "rgba(255,255,255,.12)"} strokeWidth={active ? 1.5 : 1} />
              {/* Flap at bottom of slot */}
              <rect x="165" y={y + 27} width="180" height="4" rx="1"
                fill={active ? C.teal : "#333"}
                style={active ? { transformOrigin: `165px ${y + 27}px`,
                  animation: "dropDown 0.35s ease forwards" } : {}} />
              <text x="245" y={y + 22} textAnchor="middle"
                fill={active ? C.teal : C.muted} fontSize="11" fontWeight={active ? "bold" : "normal"}>
                Grade {s.grade}  ({s.label})
              </text>
            </g>
          );
        })}

        {/* Envelope */}
        <g key={`env-${animKey}`}
          style={sent
            ? { animation: `dropDown 0.5s ease forwards`,
                transformOrigin: `254px ${slotY(gradeIdx) + 16}px` }
            : {}}>
          <rect
            x="220" y={sent ? slotY(gradeIdx) + 8 : 2}
            width="68" height="20" rx="3"
            fill={C.amber} opacity={0.9} />
          <text x="254" y={sent ? slotY(gradeIdx) + 16 : 14}
            textAnchor="middle" fill="#000" fontSize="9" fontWeight="bold">
            score={score}
          </text>
        </g>

        {/* Left side label */}
        <text x="80" y="100" textAnchor="middle" fill={C.muted} fontSize="11">
          POST OFFICE
        </text>
        <text x="80" y="115" textAnchor="middle" fill={C.muted} fontSize="9">
          GRADES
        </text>
      </svg>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label style={{ color: C.text, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          Score:
          <input type="number" min={0} max={100} value={score}
            onChange={e => { setScore(Number(e.target.value)); setSent(false); }}
            style={{ width: 64, padding: "4px 8px", borderRadius: 6,
              background: C.codeBg, border: "1px solid rgba(255,255,255,.15)",
              color: C.text, fontSize: 13, fontFamily: "monospace" }} />
        </label>
        <button onClick={send} style={{
          padding: "7px 18px", borderRadius: 8, cursor: "pointer", fontSize: 12,
          fontWeight: 700, fontFamily: "monospace",
          background: C.amber, color: "#000", border: "none",
        }}>Send!</button>
        {sent && (
          <span style={{ color: C.teal, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>
            → Grade {GRADE_SLOTS[gradeIdx].grade} slot opened
          </span>
        )}
      </div>

      <CodeBox label="C Code — else if chain" code={`if (score >= 90)      printf("A\\n");
else if (score >= 80) printf("B\\n");
else if (score >= 70) printf("C\\n");
else if (score >= 60) printf("D\\n");
else                  printf("F\\n");`} />

      <ConceptLock>
        <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>else if</code>
        {" chains are checked top to bottom. Only the "}
        <strong>first true branch</strong>
        {" runs. The rest are skipped — even if they would also match."}
      </ConceptLock>

      <NextBtn label="NEXT: TREASURE CHESTS" onClick={onNext} />
    </div>
  );
}

// ── Sub-step 3: Nested Treasure Chests ────────────────────────────────────
function StepTreasure({ onNext }: { onNext: () => void }) {
  const [hasKey, setHasKey] = useState(false);
  const [knowsPassword, setKnowsPassword] = useState(false);

  const outerOpen = hasKey;
  const innerOpen = hasKey && knowsPassword;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <svg viewBox="0 0 380 180" style={{ width: "100%", borderRadius: 12,
        background: "linear-gradient(180deg,#0a0f1a,#111827)" }}>

        {/* Outer chest body */}
        <rect x="100" y="90" width="180" height="75" rx="6"
          fill="#1e1a0e" stroke={hasKey ? C.amber : "#444"} strokeWidth={hasKey ? 2.5 : 1.5} />
        {/* Outer chest lid */}
        <rect x="100" y="70" width="180" height="24" rx="6"
          fill="#2a220e" stroke={hasKey ? C.amber : "#444"} strokeWidth={hasKey ? 2.5 : 1.5}
          style={outerOpen ? { transform: "scaleY(0)", transformOrigin: "190px 70px",
            transition: "transform 0.4s ease" } : { transition: "transform 0.4s ease" }} />
        {/* Outer lock */}
        {!hasKey && (
          <g>
            <rect x="178" y="80" width="24" height="18" rx="3" fill="#555" />
            <path d="M183 80 Q183 72 197 72 Q211 72 211 80" fill="none" stroke="#555" strokeWidth="4" />
          </g>
        )}
        <text x="190" y="140" textAnchor="middle" fill={hasKey ? C.amber : C.muted} fontSize="10">
          OUTER CHEST
        </text>

        {/* Inner chest — only visible when outer open */}
        <rect x="130" y="97" width="120" height="55" rx="5"
          fill="#120d05" stroke={innerOpen ? C.teal : "#333"} strokeWidth={innerOpen ? 2 : 1}
          opacity={outerOpen ? 1 : 0.2}
          style={{ transition: "opacity 0.4s" }} />
        {/* Inner chest lid */}
        <rect x="130" y="82" width="120" height="18" rx="5"
          fill="#1a1205" stroke={innerOpen ? C.teal : "#333"} strokeWidth={innerOpen ? 2 : 1}
          opacity={outerOpen ? 1 : 0.2}
          style={innerOpen
            ? { transform: "scaleY(0)", transformOrigin: "190px 82px", opacity: 1,
                transition: "transform 0.4s 0.3s ease, opacity 0.4s" }
            : { transition: "transform 0.4s ease, opacity 0.4s" }} />
        {/* Inner lock */}
        {outerOpen && !knowsPassword && (
          <g opacity={outerOpen ? 1 : 0}>
            <rect x="180" y="90" width="18" height="14" rx="2" fill="#444" />
            <path d="M183 90 Q183 85 189 85 Q195 85 195 90" fill="none" stroke="#444" strokeWidth="3" />
          </g>
        )}
        <text x="190" y="128" textAnchor="middle"
          fill={innerOpen ? C.teal : C.muted} fontSize="9"
          opacity={outerOpen ? 1 : 0.3}>
          INNER CHEST
        </text>

        {/* Treasure sparkles */}
        {innerOpen && (
          <>
            <text x="155" y="68" className="pop-in" fill={C.amber} fontSize="14">✦</text>
            <text x="210" y="60" className="pop-in" fill={C.teal} fontSize="10">✦</text>
            <text x="230" y="72" className="pop-in" fill={C.amber} fontSize="12">✦</text>
            <text x="175" y="55" className="pop-in" fill={C.lav} fontSize="8">✦</text>
            <text x="190" y="168" textAnchor="middle" fill={C.teal} fontSize="11" fontWeight="bold">
              🎉 TREASURE!
            </text>
          </>
        )}

        {!outerOpen && (
          <text x="190" y="168" textAnchor="middle" fill={C.muted} fontSize="10">
            Need the key to open the outer chest first
          </text>
        )}
        {outerOpen && !innerOpen && (
          <text x="190" y="168" textAnchor="middle" fill={C.muted} fontSize="10">
            Outer open — but inner needs the password
          </text>
        )}
      </svg>

      {/* Toggle buttons */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={() => setHasKey(v => !v)} style={{
          padding: "9px 18px", borderRadius: 9, cursor: "pointer", fontSize: 12,
          fontWeight: 700, fontFamily: "monospace",
          background: hasKey ? C.amber : "rgba(255,255,255,.08)",
          color: hasKey ? "#000" : C.muted,
          border: hasKey ? "none" : "1px solid rgba(255,255,255,.1)",
          transition: "all 0.2s",
        }}>
          Has Key? {hasKey ? "YES ✓" : "NO ✗"}
        </button>
        <button onClick={() => setKnowsPassword(v => !v)} style={{
          padding: "9px 18px", borderRadius: 9, cursor: "pointer", fontSize: 12,
          fontWeight: 700, fontFamily: "monospace",
          background: knowsPassword ? C.teal : "rgba(255,255,255,.08)",
          color: knowsPassword ? "#000" : C.muted,
          border: knowsPassword ? "none" : "1px solid rgba(255,255,255,.1)",
          transition: "all 0.2s",
        }}>
          Knows Password? {knowsPassword ? "YES ✓" : "NO ✗"}
        </button>
      </div>

      <CodeBox label="C Code — nested if" code={`if (hasKey) {
    if (knowsPassword) {
        printf("Treasure!\\n");  // both needed
    }
}`} />

      <ConceptLock>
        Nested <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>if</code>
        {" — the outer condition gates access to the inner one entirely. If "}
        <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>hasKey</code>
        {" is false, the inner check is never even evaluated."}
      </ConceptLock>

      <NextBtn label="CAPSTONE" onClick={onNext} />
    </div>
  );
}

// ── Sub-step 4: Capstone Flowchart ─────────────────────────────────────────
const QUESTIONS: Array<{ q: string; answer: boolean }> = [
  { q: "If it IS raining, the flowchart says to take an umbrella.", answer: true },
  { q: "If it is NOT raining but IS cold, we do nothing.", answer: false },
  { q: "Both the cold AND raining branches eventually lead to an action.", answer: true },
];

function StepCapstone({ onComplete }: { onComplete: (xp: number) => void }) {
  const [answers, setAnswers] = useState<Array<boolean | null>>(Array(3).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const allCorrect = answers.every((a, i) => a === QUESTIONS[i].answer);

  const submit = () => {
    setSubmitted(true);
    if (allCorrect) {
      setDone(true);
    }
  };

  const claim = () => {
    onComplete(55);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Flowchart SVG */}
      <svg viewBox="0 0 380 280" style={{ width: "100%", borderRadius: 12,
        background: "linear-gradient(180deg,#0a0f1a,#111827)" }}>

        {/* Diamond 1: Is it raining? */}
        <polygon points="190,18 270,60 190,102 110,60"
          fill="#1a1a2e" stroke={C.lav} strokeWidth="2" />
        <text x="190" y="56" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="bold">Is it</text>
        <text x="190" y="70" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="bold">raining?</text>

        {/* Arrow down (NO) from diamond 1 */}
        <line x1="190" y1="102" x2="190" y2="140" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="197" y="124" fill={C.muted} fontSize="9">NO</text>

        {/* Arrow left (YES) from diamond 1 */}
        <line x1="110" y1="60" x2="55" y2="60" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="72" y="55" fill={C.muted} fontSize="9">YES</text>
        {/* Down from YES arrow */}
        <line x1="55" y1="60" x2="55" y2="108" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#arr)" />

        {/* Action: Take umbrella */}
        <rect x="10" y="108" width="90" height="32" rx="5"
          fill="rgba(0,217,192,.12)" stroke={C.teal} strokeWidth="1.5" />
        <text x="55" y="124" textAnchor="middle" fill={C.teal} fontSize="10" fontWeight="bold">Take</text>
        <text x="55" y="134" textAnchor="middle" fill={C.teal} fontSize="10" fontWeight="bold">umbrella ☂</text>

        {/* Diamond 2: Is it cold? */}
        <polygon points="190,140 270,182 190,224 110,182"
          fill="#1a1a2e" stroke={C.amber} strokeWidth="2" />
        <text x="190" y="178" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="bold">Is it</text>
        <text x="190" y="192" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="bold">cold?</text>

        {/* Arrow right (YES) from diamond 2 */}
        <line x1="270" y1="182" x2="325" y2="182" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="280" y="177" fill={C.muted} fontSize="9">YES</text>

        {/* Action: Wear jacket */}
        <rect x="325" y="166" width="46" height="32" rx="5"
          fill="rgba(255,184,0,.12)" stroke={C.amber} strokeWidth="1.5" />
        <text x="348" y="182" textAnchor="middle" fill={C.amber} fontSize="9" fontWeight="bold">Wear</text>
        <text x="348" y="192" textAnchor="middle" fill={C.amber} fontSize="9" fontWeight="bold">jacket 🧥</text>

        {/* Arrow down (NO) from diamond 2 */}
        <line x1="190" y1="224" x2="190" y2="252" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="197" y="242" fill={C.muted} fontSize="9">NO</text>

        {/* Action: T-shirt */}
        <rect x="130" y="252" width="120" height="22" rx="5"
          fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.2)" strokeWidth="1.5" />
        <text x="190" y="267" textAnchor="middle" fill={C.text} fontSize="10">Just a t-shirt 👕</text>

        {/* Arrow marker */}
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={C.muted} />
          </marker>
        </defs>
      </svg>

      <CodeBox label="Equivalent C Code" code={`if (raining) {
    printf("Take umbrella.\\n");
} else if (cold) {
    printf("Wear jacket.\\n");
} else {
    printf("Just a t-shirt.\\n");
}`} />

      {/* Quiz */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 13, fontFamily: "monospace" }}>
          Quick Quiz — True or False?
        </div>
        {QUESTIONS.map((q, i) => {
          const ans = answers[i];
          const correct = QUESTIONS[i].answer;
          return (
            <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 10,
              padding: "12px 14px", border: submitted
                ? ans === correct
                  ? `1px solid ${C.teal}`
                  : `1px solid ${C.coral}`
                : "1px solid rgba(255,255,255,.08)" }}>
              <div style={{ color: C.text, fontSize: 12, marginBottom: 10 }}>{q.q}</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[true, false].map(opt => (
                  <button key={String(opt)} disabled={submitted}
                    onClick={() => {
                      const next = [...answers];
                      next[i] = opt;
                      setAnswers(next);
                    }}
                    style={{
                      padding: "5px 16px", borderRadius: 7, cursor: submitted ? "default" : "pointer",
                      fontSize: 11, fontWeight: 700, fontFamily: "monospace",
                      border: "none",
                      background: ans === opt
                        ? submitted
                          ? opt === correct ? C.teal : C.coral
                          : C.lav
                        : "rgba(255,255,255,.1)",
                      color: ans === opt ? "#000" : C.muted,
                      transition: "all 0.2s",
                    }}>
                    {opt ? "TRUE" : "FALSE"}
                  </button>
                ))}
                {submitted && (
                  <span style={{ fontSize: 11, fontFamily: "monospace", alignSelf: "center",
                    color: ans === correct ? C.teal : C.coral }}>
                    {ans === correct ? "✓ Correct" : `✗ Answer: ${correct ? "TRUE" : "FALSE"}`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit / Claim */}
      {!submitted && (
        <button
          disabled={answers.some(a => a === null)}
          onClick={submit}
          style={{
            padding: "10px 24px", borderRadius: 10, cursor: answers.some(a => a === null) ? "not-allowed" : "pointer",
            fontSize: 13, fontWeight: 700, fontFamily: "monospace",
            background: answers.some(a => a === null) ? "rgba(255,255,255,.1)" : C.teal,
            color: answers.some(a => a === null) ? C.muted : "#000", border: "none",
            alignSelf: "flex-end",
          }}>
          Check Answers
        </button>
      )}

      {submitted && !allCorrect && (
        <div style={{ color: C.coral, fontFamily: "monospace", fontSize: 12, textAlign: "right" }}>
          Some answers are wrong — review the flowchart and try again.
        </div>
      )}

      {submitted && allCorrect && !done && (
        <div style={{ textAlign: "right" }}>
          <button onClick={claim} style={{
            padding: "12px 28px", borderRadius: 10, cursor: "pointer",
            fontSize: 13, fontWeight: 700, fontFamily: "monospace",
            background: `linear-gradient(135deg, ${C.teal}, ${C.lav})`,
            color: "#000", border: "none",
          }}>
            🏆 Complete! Claim 55 XP
          </button>
        </div>
      )}

      {done && (
        <div className="pop-in" style={{ textAlign: "center", padding: "16px",
          background: "rgba(0,217,192,.1)", border: `1px solid ${C.teal}`,
          borderRadius: 12, color: C.teal, fontWeight: 700, fontSize: 14 }}>
          ✓ Section Complete! +55 XP earned
        </div>
      )}
    </div>
  );
}

// ── Default export ─────────────────────────────────────────────────────────
export default function SectionIfStatement({ onComplete }: { onComplete: (xp: number) => void }) {
  const [subStep, setSubStep] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, color: C.text }}>
      <style>{styleTag}</style>

      <NavBar step={subStep} setStep={setSubStep} />

      {subStep === 0 && <StepBouncer onNext={() => setSubStep(1)} />}
      {subStep === 1 && <StepForkRoad onNext={() => setSubStep(2)} />}
      {subStep === 2 && <StepMailSlots onNext={() => setSubStep(3)} />}
      {subStep === 3 && <StepTreasure onNext={() => setSubStep(4)} />}
      {subStep === 4 && <StepCapstone onComplete={onComplete} />}
    </div>
  );
}
