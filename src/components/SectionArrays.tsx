"use client";

import React, { useState } from "react";

const KEYFRAMES = `
@keyframes swingOpen { 0%{transform:scaleX(1)} 100%{transform:scaleX(0)} }
@keyframes popIn { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
@keyframes glow { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.5)} }
.arr-pop-in { animation: popIn 0.3s ease forwards; }
.arr-glow { animation: glow 1s ease infinite; }
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

// ─── Sub-step 0: Row of Lockers ───────────────────────────────────────────────

function LockerStep() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [values, setValues] = useState<string[]>(["", "", "", "", ""]);
  const [declared, setDeclared] = useState(false);

  const LOCKER_W = 54;
  const LOCKER_H = 90;
  const LOCKER_START_X = 14;
  const LOCKER_Y = 42;
  const GAP = 8;

  function handleValueChange(val: string) {
    if (activeIdx === null) return;
    const next = [...values];
    next[activeIdx] = val;
    setValues(next);
  }

  return (
    <div>
      <svg viewBox="0 0 380 150" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Array sign */}
        <rect x="62" y="8" width="180" height="22" rx="4" fill="rgba(0,217,192,0.1)" stroke="#00D9C0" strokeWidth="1" />
        <text x="152" y="23" textAnchor="middle" fill="#00D9C0" fontSize="11" fontFamily="'Courier New',monospace" fontWeight="700">scores[5]</text>

        {/* 5 lockers */}
        {[0, 1, 2, 3, 4].map(i => {
          const x = LOCKER_START_X + i * (LOCKER_W + GAP);
          const isActive = activeIdx === i;
          return (
            <g key={i} onClick={() => setActiveIdx(i)} style={{ cursor: "pointer" }}>
              <rect
                x={x} y={LOCKER_Y} width={LOCKER_W} height={LOCKER_H} rx="4"
                fill="rgba(10,15,30,0.8)"
                stroke={isActive ? "#00D9C0" : "rgba(255,255,255,0.15)"}
                strokeWidth={isActive ? 2 : 1}
                className={isActive ? "arr-glow" : undefined}
              />
              {/* Handle */}
              <circle cx={x + LOCKER_W / 2} cy={LOCKER_Y + 10} r="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              {/* Value */}
              {values[i] ? (
                <text x={x + LOCKER_W / 2} y={LOCKER_Y + 58} textAnchor="middle" fill={isActive ? "#00D9C0" : "#E9EDF8"} fontSize="12" fontFamily="'Courier New',monospace" fontWeight="700">
                  {values[i].substring(0, 4)}
                </text>
              ) : (
                <text x={x + LOCKER_W / 2} y={LOCKER_Y + 58} textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="'Courier New',monospace">empty</text>
              )}
              {/* Index badge */}
              <text x={x + LOCKER_W / 2} y={LOCKER_Y + LOCKER_H + 14} textAnchor="middle" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">[{i}]</text>
            </g>
          );
        })}

        {/* Out of bounds locker */}
        <text x="348" y="38" textAnchor="middle" fill="#FF5F6E" fontSize="7" fontFamily="'Courier New',monospace" letterSpacing="1">OUT OF</text>
        <text x="348" y="48" textAnchor="middle" fill="#FF5F6E" fontSize="7" fontFamily="'Courier New',monospace" letterSpacing="1">BOUNDS</text>
        <rect x="324" y="52" width="48" height="70" rx="4" fill="rgba(255,95,110,0.05)" stroke="#FF5F6E" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="348" y="92" textAnchor="middle" fill="#FF5F6E" fontSize="18">✕</text>
        <text x="348" y="134" textAnchor="middle" fill="#FF5F6E" fontSize="8" fontFamily="'Courier New',monospace">scores[5]</text>
      </svg>

      {activeIdx !== null && (
        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <label style={{ color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 13 }}>
            scores[{activeIdx}] =&nbsp;
          </label>
          <input
            type="text"
            value={values[activeIdx]}
            onChange={e => handleValueChange(e.target.value.substring(0, 6))}
            style={{ background: "#0D1117", border: "1px solid #00D9C0", borderRadius: 6, color: "#00D9C0", padding: "4px 10px", fontSize: 13, fontFamily: "'Courier New',monospace", width: 100 }}
          />
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setDeclared(true)}
          style={{ background: declared ? "rgba(0,217,192,0.15)" : "linear-gradient(135deg,#00D9C0,#A78BFA)", border: "none", borderRadius: 8, padding: "8px 20px", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
        >
          {declared ? "✓ Declared!" : "Declare!"}
        </button>
      </div>

      {declared && (
        <div style={{ background: "#0D1117", border: "1px solid rgba(0,218,243,.18)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontFamily: "'Courier New',monospace", fontSize: 13, color: "#00D9C0" }}>
          int scores[5];
        </div>
      )}

      <CodeBlock label="C Example" code={`int scores[5];      // 5 lockers: [0] to [4]
scores[0] = 95;     // first locker
// scores[5] — DOES NOT EXIST! Never go here.`} />
      <ConceptLock>Arrays start at index 0. Last index = size-1.</ConceptLock>
      <Gotcha>`scores[5]` on a `scores[5]` array = out of bounds. Undefined behaviour.</Gotcha>
    </div>
  );
}

// ─── Sub-step 1: Tape Measure ─────────────────────────────────────────────────

function TapeStep() {
  const [pos, setPos] = useState(0);
  const [showOob, setShowOob] = useState(false);

  const TICK_START = 42;
  const TICK_SPACING = 64;

  function stepLeft() {
    setPos(p => Math.max(0, p - 1));
    setShowOob(false);
  }

  function stepRight() {
    if (pos >= 4) {
      setShowOob(true);
    } else {
      setPos(p => p + 1);
      setShowOob(false);
    }
  }

  function tryOob() {
    setShowOob(true);
  }

  return (
    <div>
      <svg viewBox="0 0 380 150" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Tape */}
        <rect x="10" y="118" width="360" height="14" rx="3" fill="rgba(255,184,0,0.15)" stroke="rgba(255,184,0,0.4)" strokeWidth="1" />
        {/* Ticks */}
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <line x1={TICK_START + i * TICK_SPACING} y1="118" x2={TICK_START + i * TICK_SPACING} y2="132" stroke="rgba(255,184,0,0.6)" strokeWidth="2" />
            <text x={TICK_START + i * TICK_SPACING} y="144" textAnchor="middle" fill="#FFB800" fontSize="10" fontFamily="'Courier New',monospace">{i}</text>
          </g>
        ))}
        {/* Lockers above each tick */}
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i}
            x={TICK_START + i * TICK_SPACING - 22} y="50" width="44" height="60" rx="4"
            fill={pos === i ? "rgba(0,217,192,0.15)" : "rgba(10,15,30,0.8)"}
            stroke={pos === i ? "#00D9C0" : "rgba(255,255,255,0.15)"}
            strokeWidth={pos === i ? 2 : 1}
          />
        ))}
        {/* Stick person */}
        <g style={{ transform: `translateX(${pos * TICK_SPACING}px)`, transition: "transform 0.4s ease" }}>
          <circle cx={TICK_START} cy="32" r="10" fill="none" stroke="#00D9C0" strokeWidth="2" />
          <line x1={TICK_START} y1="42" x2={TICK_START} y2="56" stroke="#00D9C0" strokeWidth="2" />
          <line x1={TICK_START} y1="47" x2={TICK_START - 8} y2="54" stroke="#00D9C0" strokeWidth="2" />
          <line x1={TICK_START} y1="47" x2={TICK_START + 8} y2="54" stroke="#00D9C0" strokeWidth="2" />
          <line x1={TICK_START} y1="56" x2={TICK_START - 6} y2="68" stroke="#00D9C0" strokeWidth="2" />
          <line x1={TICK_START} y1="56" x2={TICK_START + 6} y2="68" stroke="#00D9C0" strokeWidth="2" />
        </g>
        {/* Label */}
        <text x="190" y="18" textAnchor="middle" fill="#E9EDF8" fontSize="12" fontFamily="'Courier New',monospace">arr[{pos}]</text>
      </svg>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" as const }}>
        <button onClick={stepLeft} disabled={pos === 0}
          style={{ background: pos === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,217,192,0.15)", border: "1px solid rgba(0,217,192,0.3)", borderRadius: 8, padding: "8px 18px", color: pos === 0 ? "#7B85A8" : "#00D9C0", fontWeight: 700, fontSize: 13, cursor: pos === 0 ? "not-allowed" : "pointer" }}>
          ← Step
        </button>
        <button onClick={stepRight}
          style={{ background: "rgba(0,217,192,0.15)", border: "1px solid rgba(0,217,192,0.3)", borderRadius: 8, padding: "8px 18px", color: "#00D9C0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          → Step
        </button>
        <button onClick={tryOob}
          style={{ background: "rgba(255,95,110,0.15)", border: "1px solid rgba(255,95,110,0.3)", borderRadius: 8, padding: "8px 18px", color: "#FF5F6E", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          Try [5]!
        </button>
      </div>

      {showOob && (
        <div style={{ background: "rgba(255,95,110,0.1)", border: "1px solid rgba(255,95,110,0.4)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, color: "#FF5F6E", fontSize: 13, fontWeight: 600 }}>
          ⚠ Index 5 doesn&apos;t exist!
        </div>
      )}

      <ConceptLock>Index 0 = first. Index (size-1) = last. Never changes.</ConceptLock>
    </div>
  );
}

// ─── Sub-step 2: Inspection Loop ──────────────────────────────────────────────

function InspectionStep() {
  const [scores, setScores] = useState<number[]>([88, 75, 92, 61, 84, 70]);
  const [running, setRunning] = useState(false);
  const [currentI, setCurrentI] = useState<number | null>(null);
  const [runningTotal, setRunningTotal] = useState(0);
  const [done, setDone] = useState(false);

  const LOCKER_W = 50;
  const LOCKER_H = 70;
  const GAP = 8;
  const START_X = 10;
  const LOCKER_Y = 40;

  function runInspection() {
    if (running) return;
    setRunning(true);
    setCurrentI(null);
    setRunningTotal(0);
    setDone(false);

    let total = 0;
    for (let i = 0; i < scores.length; i++) {
      const idx = i;
      const score = scores[idx];
      setTimeout(() => {
        setCurrentI(idx);
        total += score;
        setRunningTotal(total);
        if (idx === scores.length - 1) {
          setDone(true);
          setRunning(false);
        }
      }, idx * 700);
    }
  }

  return (
    <div>
      <svg viewBox="0 0 380 140" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Lockers */}
        {scores.map((_, i) => {
          const x = START_X + i * (LOCKER_W + GAP);
          const isActive = currentI === i;
          return (
            <g key={i}>
              <rect x={x} y={LOCKER_Y} width={LOCKER_W} height={LOCKER_H} rx="4"
                fill={isActive ? "rgba(0,217,192,0.15)" : "rgba(10,15,30,0.8)"}
                stroke={isActive ? "#00D9C0" : "rgba(255,255,255,0.15)"}
                strokeWidth={isActive ? 2 : 1}
                className={isActive ? "arr-glow" : undefined}
              />
              <text x={x + LOCKER_W / 2} y={LOCKER_Y + 42} textAnchor="middle" fill={isActive ? "#00D9C0" : "#7B85A8"} fontSize="12" fontFamily="'Courier New',monospace" fontWeight="700">
                {scores[i]}
              </text>
              <text x={x + LOCKER_W / 2} y={LOCKER_Y + LOCKER_H + 14} textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="'Courier New',monospace">[{i}]</text>
            </g>
          );
        })}
        {/* Teacher figure */}
        <g style={{ transform: `translateX(${currentI !== null ? currentI * (LOCKER_W + GAP) : 0}px)`, transition: "transform 0.7s ease" }}>
          <circle cx={START_X + LOCKER_W / 2} cy="18" r="8" fill="none" stroke="#FFB800" strokeWidth="2" />
          <line x1={START_X + LOCKER_W / 2} y1="26" x2={START_X + LOCKER_W / 2} y2="38" stroke="#FFB800" strokeWidth="2" />
          <line x1={START_X + LOCKER_W / 2} y1="30" x2={START_X + LOCKER_W / 2 - 8} y2="36" stroke="#FFB800" strokeWidth="2" />
          <line x1={START_X + LOCKER_W / 2} y1="30" x2={START_X + LOCKER_W / 2 + 8} y2="36" stroke="#FFB800" strokeWidth="2" />
        </g>
        {/* Counter box */}
        <rect x="10" y="122" width="360" height="14" rx="3" fill="rgba(0,217,192,0.05)" stroke="rgba(0,217,192,0.2)" strokeWidth="1" />
        <text x="20" y="133" fill="#00D9C0" fontSize="9" fontFamily="'Courier New',monospace">
          i = {currentI !== null ? currentI : "—"}  |  Total: {runningTotal}{done ? "  ✓ DONE" : ""}
        </text>
      </svg>

      {/* Editable scores */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" as const }}>
        {scores.map((s, i) => (
          <input key={i} type="number" value={s}
            onChange={e => { const next = [...scores]; next[i] = Number(e.target.value); setScores(next); }}
            disabled={running}
            style={{ width: 52, background: "#0D1117", border: "1px solid rgba(0,217,192,0.3)", borderRadius: 6, color: "#E9EDF8", padding: "4px 6px", fontSize: 12, textAlign: "center" as const }} />
        ))}
      </div>

      <button onClick={runInspection} disabled={running}
        style={{ background: running ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,#FFB800,#FF5F6E)", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: running ? "not-allowed" : "pointer", marginBottom: 16 }}>
        {running ? "Inspecting..." : "Run Inspection"}
      </button>

      <CodeBlock label="C Example" code={`for (int i = 0; i < 6; i++) {
    total += scores[i];  // i = index
}`} />
      <ConceptLock>Loop counter = array index. `i &lt; size`, never `i &lt;= size`.</ConceptLock>
    </div>
  );
}

// ─── Sub-step 3: Cinema Grid ──────────────────────────────────────────────────

function CinemaStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [filled, setFilled] = useState<number[][]>([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
  const [filling, setFilling] = useState(false);
  const [fillRow, setFillRow] = useState<number | null>(null);
  const [fillCol, setFillCol] = useState<number | null>(null);

  function fillAll() {
    if (filling) return;
    setFilling(true);
    setFilled([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    let delay = 0;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 5; c++) {
        const row = r;
        const col = c;
        const val = row * 5 + col + 1;
        setTimeout(() => {
          setFillRow(row);
          setFillCol(col);
          setFilled(prev => {
            const next = prev.map(arr => [...arr]);
            next[row][col] = val;
            return next;
          });
          if (row === 3 && col === 4) {
            setFilling(false);
            setFillRow(null);
            setFillCol(null);
          }
        }, delay);
        delay += 120;
      }
    }
  }

  return (
    <div>
      <svg viewBox="0 0 380 200" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Screen */}
        <polygon points="40,20 340,20 310,50 70,50" fill="rgba(150,150,180,0.15)" stroke="rgba(150,150,180,0.4)" strokeWidth="1.5" />
        <text x="190" y="38" textAnchor="middle" fill="rgba(150,150,180,0.8)" fontSize="10" fontFamily="'Courier New',monospace" letterSpacing="2">SCREEN</text>
        {/* Row labels */}
        {[0, 1, 2, 3].map(r => (
          <text key={r} x="28" y={66 + r * 36 + 16} textAnchor="middle" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">{r}</text>
        ))}
        {/* Col labels */}
        {[0, 1, 2, 3, 4].map(c => (
          <text key={c} x={56 + c * 46 + 19} y="62" textAnchor="middle" fill="#7B85A8" fontSize="10" fontFamily="'Courier New',monospace">{c}</text>
        ))}
        {/* Seats */}
        {[0, 1, 2, 3].map(r =>
          [0, 1, 2, 3, 4].map(c => {
            const x = 56 + c * 46;
            const y = 66 + r * 36;
            const isSelected = selected && selected[0] === r && selected[1] === c;
            const isFilling = fillRow === r && fillCol === c;
            const isFilled = filled[r][c] > 0;
            return (
              <g key={`${r}-${c}`} onClick={() => setSelected([r, c])} style={{ cursor: "pointer" }}>
                <rect x={x} y={y} width="38" height="26" rx="4"
                  fill={isSelected ? "rgba(0,217,192,0.2)" : isFilling ? "rgba(255,184,0,0.3)" : isFilled ? "rgba(0,217,192,0.08)" : "rgba(10,15,30,0.8)"}
                  stroke={isSelected ? "#00D9C0" : isFilling ? "#FFB800" : isFilled ? "rgba(0,217,192,0.3)" : "rgba(255,255,255,0.1)"}
                  strokeWidth={isSelected || isFilling ? 2 : 1}
                />
                {/* Chair back line */}
                <line x1={x + 4} y1={y + 5} x2={x + 34} y2={y + 5} stroke={isSelected ? "#00D9C0" : "rgba(255,255,255,0.2)"} strokeWidth="1.5" />
                {isFilled && (
                  <text x={x + 19} y={y + 19} textAnchor="middle" fill={isSelected ? "#00D9C0" : "#7B85A8"} fontSize="8" fontFamily="'Courier New',monospace">{filled[r][c]}</text>
                )}
              </g>
            );
          })
        )}
      </svg>

      {selected && (
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: "#00D9C0", marginBottom: 10 }}>
          seats[{selected[0]}][{selected[1]}] {filled[selected[0]][selected[1]] > 0 ? `= ${filled[selected[0]][selected[1]]}` : ""}
        </div>
      )}

      <button onClick={fillAll} disabled={filling}
        style={{ background: filling ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg,#FFB800,#FF5F6E)", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: filling ? "not-allowed" : "pointer", marginBottom: 16 }}>
        {filling ? "Filling..." : "Fill All Seats!"}
      </button>

      <CodeBlock label="C Example" code={`for (int row = 0; row < 4; row++)
    for (int col = 0; col < 5; col++)
        seats[row][col] = row*5 + col + 1;`} />

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

const TABS = ["Lockers", "Index", "Loop", "Cinema"];

export default function SectionArrays({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", color: "#E9EDF8" }}>
      <style>{KEYFRAMES}</style>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" as const }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setSubStep(i)}
            style={{ flex: 1, minWidth: 70, background: subStep === i ? "rgba(0,217,192,0.18)" : "rgba(24,29,46,0.9)", border: `1px solid ${subStep === i ? "#00D9C0" : "rgba(255,255,255,0.1)"}`, borderRadius: 8, padding: "8px 0", color: subStep === i ? "#00D9C0" : "#7B85A8", fontWeight: subStep === i ? 700 : 400, fontSize: 13, cursor: "pointer" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(24,29,46,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 20 }}>
        {subStep === 0 && <LockerStep />}
        {subStep === 1 && <TapeStep />}
        {subStep === 2 && <InspectionStep />}
        {subStep === 3 && <CinemaStep onComplete={onComplete} />}
      </div>

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
