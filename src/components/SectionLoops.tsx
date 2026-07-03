"use client";
import React, { useState, useEffect } from "react";

interface Props { onComplete: (xp: number) => void; }

// ─── Sub-step 0: for Loop — Envelope Conveyor Belt ───────────────────────────

function ForLoopStep() {
  const [count, setCount] = useState(5);
  const [stamped, setStamped] = useState<number[]>([]);
  const [stamping, setStamping] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [currentI, setCurrentI] = useState<number | null>(null);

  function runLoop() {
    if (running) return;
    setRunning(true);
    setStamped([]);
    setDone(false);
    setCurrentI(0);

    let i = 0;
    function step() {
      if (i >= count) {
        setRunning(false);
        setStamping(null);
        setCurrentI(null);
        setDone(true);
        return;
      }
      setCurrentI(i);
      setStamping(i);
      setTimeout(() => {
        setStamped(prev => [...prev, i]);
        setStamping(null);
        i++;
        setTimeout(step, 200);
      }, 500);
    }
    setTimeout(step, 300);
  }

  function reset() {
    setStamped([]);
    setStamping(null);
    setRunning(false);
    setDone(false);
    setCurrentI(null);
  }

  const envelopeXPositions = Array.from({ length: 6 }, (_, i) => 30 + i * 60);
  const displayCount = Math.min(count, 6);

  return (
    <div>
      {/* SVG Scene */}
      <svg width="100%" viewBox="0 0 400 180" style={{ display: "block", marginBottom: 14, borderRadius: 10, background: "#0a0d16" }}>
        {/* Conveyor belt rails */}
        <rect x="10" y="128" width="380" height="6" rx="3" fill="#2a3050" />
        <rect x="10" y="144" width="380" height="6" rx="3" fill="#2a3050" />
        {/* Roller circles */}
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={20 + i * 40} cy="131" r="5" fill="#3a4060" stroke="#4a5080" strokeWidth="1" />
        ))}
        {/* Stamp arm for each envelope */}
        {Array.from({ length: displayCount }, (_, i) => {
          const x = envelopeXPositions[i];
          const isStamping = stamping === i;
          return (
            <g key={`arm-${i}`}>
              {/* Arm pivot point */}
              <circle cx={x + 24} cy={50} r="4" fill="#4a5080" />
              {/* Arm rect — rotates when stamping */}
              <rect
                x={x + 20}
                y={50}
                width="8"
                height={isStamping ? 48 : 30}
                rx="3"
                fill={isStamping ? "#00D9C0" : "#3a4060"}
                className={isStamping ? "stamping" : ""}
                style={{ transition: "height 0.3s ease, fill 0.2s" }}
              />
              {/* Stamp head */}
              <rect
                x={x + 14}
                y={isStamping ? 92 : 76}
                width="20"
                height="8"
                rx="2"
                fill={isStamping ? "#00D9C0" : "#2a3050"}
                style={{ transition: "y 0.3s ease, fill 0.2s" }}
              />
            </g>
          );
        })}
        {/* Envelopes on belt */}
        {Array.from({ length: displayCount }, (_, i) => {
          const x = envelopeXPositions[i];
          const isStampedEnv = stamped.includes(i);
          const isCurrentEnv = stamping === i;
          return (
            <g key={`env-${i}`}>
              {/* Envelope body */}
              <rect
                x={x}
                y={96}
                width="48"
                height="34"
                rx="4"
                fill={isStampedEnv ? "rgba(0,217,192,0.15)" : "rgba(255,255,255,0.04)"}
                stroke={isCurrentEnv ? "#00D9C0" : isStampedEnv ? "rgba(0,217,192,0.5)" : "rgba(255,255,255,0.12)"}
                strokeWidth={isCurrentEnv ? 2 : 1}
                style={{ transition: "stroke 0.2s, fill 0.2s" }}
              />
              {/* Envelope flap V */}
              <polyline
                points={`${x},96 ${x + 24},114 ${x + 48},96`}
                fill="none"
                stroke={isStampedEnv ? "rgba(0,217,192,0.3)" : "rgba(255,255,255,0.08)"}
                strokeWidth="1"
              />
              {/* i label */}
              <text x={x + 24} y={125} textAnchor="middle" fill="#7B85A8" fontSize="8" fontFamily="monospace">i={i}</text>
              {/* Check mark when stamped */}
              {isStampedEnv && (
                <text x={x + 24} y={112} textAnchor="middle" fill="#00D9C0" fontSize="14" fontWeight="bold">✓</text>
              )}
              {/* Glow when current */}
              {isCurrentEnv && (
                <rect x={x - 2} y={94} width="52" height="38" rx="5" fill="none" stroke="#00D9C0" strokeWidth="1.5" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.5s" repeatCount="indefinite" />
                </rect>
              )}
            </g>
          );
        })}
        {/* Title label */}
        <text x="200" y="22" textAnchor="middle" fill="#00D9C0" fontSize="11" fontFamily="monospace" fontWeight="bold">ENVELOPE CONVEYOR BELT</text>
      </svg>

      {/* Loop counter display */}
      <div style={{ marginBottom: 12, padding: "8px 14px", background: "#0D1117", border: "1px solid rgba(0,217,192,0.15)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 13 }}>
        {done
          ? <span style={{ color: "#00D9C0", fontWeight: 700 }}>Done! Loop ended — i = {count}</span>
          : currentI !== null
          ? <span>Loop running… <span style={{ color: "#00D9C0", fontWeight: 700 }}>i = {currentI}</span> <span style={{ color: "#7B85A8" }}>(condition: i &lt; {count} → ✅)</span></span>
          : <span style={{ color: "#7B85A8" }}>for (int i = 0; i &lt; {count}; i++) — press ▶ Run Loop</span>
        }
      </div>

      {/* Count picker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#7B85A8", fontFamily: "'Courier New',monospace" }}>Envelopes (1–6):</span>
        <input
          type="number" min={1} max={6} value={count}
          onChange={e => { reset(); setCount(Math.max(1, Math.min(6, Number(e.target.value)))); }}
          style={{ width: 50, padding: "4px 8px", background: "rgba(24,29,46,0.9)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 6, color: "#E9EDF8", fontFamily: "'Courier New',monospace", fontSize: 13 }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={runLoop} disabled={running} style={{ padding: "8px 18px", background: running ? "rgba(0,217,192,.15)" : "#00D9C0", color: running ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: running ? "not-allowed" : "pointer" }}>
          {running ? "Running…" : "▶ Run Loop"}
        </button>
        <button onClick={reset} style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>
          ↺ Reset
        </button>
      </div>

      {/* Concept Lock */}
      <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,217,192,.06))", border: "1px solid rgba(167,139,250,.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>CONCEPT LOCK</div>
        <code style={{ color: "#00D9C0", fontSize: 12 }}>for (int i = 0; i &lt; N; i++)</code>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}> — Use when you <strong>know exactly how many times</strong> to repeat.</span>
      </div>

      {/* Code snippet */}
      <pre style={{ background: "#0D1117", border: "1px solid rgba(0,217,192,.15)", borderRadius: 10, padding: 14, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8", overflowX: "auto", marginBottom: 12 }}>{`for (int i = 0; i < 5; i++) {
    printf("Stamped envelope %d\\n", i + 1);
}`}</pre>

      {/* Gotcha */}
      <div style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: "8px 14px", display: "inline-flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#FF5F6E", fontWeight: 700, fontSize: 11, fontFamily: "'Courier New',monospace" }}>⚠ GOTCHA</span>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}><code style={{ color: "#FF5F6E" }}>i &lt; 5</code> runs 5 times (0–4). <code style={{ color: "#FF5F6E" }}>i &lt;= 5</code> runs 6 times!</span>
      </div>
    </div>
  );
}

// ─── Sub-step 1: while Loop — Stirring the Sauce Pot ─────────────────────────

function WhileLoopStep() {
  const [thickness, setThickness] = useState(0);
  const [done, setDone] = useState(false);
  const [spinning, setSpinning] = useState(false);

  function stir() {
    if (done) return;
    setSpinning(true);
    setTimeout(() => setSpinning(false), 700);
    const increase = Math.floor(Math.random() * 11) + 15;
    setThickness(prev => {
      const next = Math.min(100, prev + increase);
      if (next >= 100) setDone(true);
      return next;
    });
  }

  function reset() {
    setThickness(0);
    setDone(false);
    setSpinning(false);
  }

  const conditionTrue = thickness < 100;
  // Liquid fill: pot interior starts at y=110 (bottom), fills upward as thickness increases
  // Pot center (200,140), radius 70. Interior available height ~60px (y=110 to y=150 visible range inside ellipse)
  const liquidHeight = Math.round((thickness / 100) * 55);
  const liquidY = 150 - liquidHeight;
  const thermFillHeight = Math.round((thickness / 100) * 80);

  return (
    <div>
      <svg width="100%" viewBox="0 0 400 200" style={{ display: "block", marginBottom: 14, borderRadius: 10, background: "#0a0d16" }}>
        {/* Thermometer background */}
        <rect x="340" y="60" width="16" height="90" rx="8" fill="#1a1f30" stroke="#2a3050" strokeWidth="1.5" />
        {/* Thermometer fill */}
        <rect
          x="344"
          y={150 - thermFillHeight}
          width="8"
          height={thermFillHeight}
          rx="4"
          fill={done ? "#FFB800" : "#00D9C0"}
          style={{ transition: "height 0.4s ease, y 0.4s ease, fill 0.3s" }}
        />
        <circle cx="348" cy="155" r="9" fill={done ? "#FFB800" : "#00D9C0"} style={{ transition: "fill 0.3s" }} />
        <text x="348" y="48" textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="monospace">THICK</text>
        <text x="348" y="170" textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="monospace">0%</text>
        <text x="348" y="62" textAnchor="middle" fill="#7B85A8" fontSize="8" fontFamily="monospace">{thickness}%</text>

        {/* Pot body */}
        <ellipse cx="180" cy="150" rx="72" ry="18" fill="#1a1020" stroke="#5a3820" strokeWidth="2.5" />
        <rect x="108" y="90" width="144" height="62" fill="#1a1020" />
        <rect x="108" y="90" width="144" height="62" fill="url(#potMask)" />
        {/* Pot sides */}
        <line x1="108" y1="90" x2="108" y2="150" stroke="#5a3820" strokeWidth="2.5" />
        <line x1="252" y1="90" x2="252" y2="150" stroke="#5a3820" strokeWidth="2.5" />
        {/* Pot rim ellipse */}
        <ellipse cx="180" cy="90" rx="72" ry="14" fill="#241510" stroke="#5a3820" strokeWidth="2.5" />
        {/* Handles */}
        <rect x="86" y="100" width="22" height="10" rx="5" fill="#3a2010" stroke="#5a3820" strokeWidth="1.5" />
        <rect x="252" y="100" width="22" height="10" rx="5" fill="#3a2010" stroke="#5a3820" strokeWidth="1.5" />

        {/* Liquid inside pot */}
        <clipPath id="potClip">
          <rect x="110" y="92" width="140" height="56" />
        </clipPath>
        <rect
          x="110"
          y={liquidY}
          width="140"
          height={liquidHeight + 10}
          fill={done ? "rgba(255,184,0,0.55)" : "rgba(255,120,30,0.45)"}
          clipPath="url(#potClip)"
          style={{ transition: "y 0.4s ease, height 0.4s ease, fill 0.3s" }}
        />

        {/* Spoon — rotates when spinning */}
        <g
          transform="translate(180,120)"
          className={spinning ? "spinning" : ""}
          style={{ transformOrigin: "0 0", transformBox: "fill-box" }}
        >
          <line x1="0" y1="0" x2="45" y2="-20" stroke="#C8A060" strokeWidth="4" strokeLinecap="round" />
          <circle cx="45" cy="-20" r="7" fill="#C8A060" />
        </g>

        {/* Speech bubble */}
        <rect
          x="30" y="20" width="170" height="36" rx="8"
          fill="rgba(10,13,22,0.9)"
          stroke={conditionTrue ? "#00D9C0" : "#FF5F6E"}
          strokeWidth="1.5"
          style={{ transition: "stroke 0.3s" }}
        />
        <polygon
          points="100,56 110,56 105,66"
          fill={conditionTrue ? "#00D9C0" : "#FF5F6E"}
          style={{ transition: "fill 0.3s" }}
        />
        <text x="115" y="34" textAnchor="middle" fill="#E9EDF8" fontSize="10" fontFamily="monospace">Is it thick yet?</text>
        <text x="115" y="48" textAnchor="middle" fill={conditionTrue ? "#00D9C0" : "#FF5F6E"} fontSize="9" fontFamily="monospace" style={{ transition: "fill 0.3s" }}>
          {conditionTrue ? "NO → keep stirring!" : "YES → stop loop"}
        </text>

        <text x="200" y="186" textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="monospace">thickness = {thickness}%</text>
      </svg>

      {done && (
        <div style={{ marginBottom: 12, padding: "9px 14px", background: "rgba(255,184,0,.09)", border: "1px solid rgba(255,184,0,.3)", borderRadius: 9, color: "#FFB800", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12 }}>
          Sauce ready! Loop stopped — condition (thickness &lt; 100) is now FALSE.
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={stir} disabled={done} style={{ padding: "8px 18px", background: done ? "rgba(0,217,192,.1)" : "#00D9C0", color: done ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: done ? "not-allowed" : "pointer" }}>
          Stir Once
        </button>
        <button onClick={reset} style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>
          ↺ Reset
        </button>
      </div>

      {/* Concept Lock */}
      <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,217,192,.06))", border: "1px solid rgba(167,139,250,.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>CONCEPT LOCK</div>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}><code style={{ color: "#00D9C0" }}>while (condition)</code> — checks <strong>before</strong> each stir. If already thick before you start, the loop never runs.</span>
      </div>

      <pre style={{ background: "#0D1117", border: "1px solid rgba(0,217,192,.15)", borderRadius: 10, padding: 14, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8", overflowX: "auto", marginBottom: 12 }}>{`int thickness = 0;
while (thickness < 100) {
    thickness += 20;
}
printf("Sauce ready!\\n");`}</pre>

      <div style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: "8px 14px", display: "inline-flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#FF5F6E", fontWeight: 700, fontSize: 11, fontFamily: "'Courier New',monospace" }}>⚠ GOTCHA</span>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}>If nothing inside the loop changes the condition → infinite loop → program freezes!</span>
      </div>
    </div>
  );
}

// ─── Sub-step 2: do-while — The Door Knocker ─────────────────────────────────

function DoWhileStep() {
  const [knockCount, setKnockCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [knocking, setKnocking] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  function knock() {
    if (knocking || answered) return;
    setKnocking(true);
    setRinging(true);
    setTimeout(() => setRinging(false), 700);
    setTimeout(() => {
      setKnocking(false);
      setKnockCount(prev => prev + 1);
      setShowToggle(true);
    }, 600);
  }

  function reset() {
    setKnockCount(0);
    setAnswered(false);
    setKnocking(false);
    setRinging(false);
    setShowToggle(false);
  }

  return (
    <div>
      <svg width="100%" viewBox="0 0 400 220" style={{ display: "block", marginBottom: 14, borderRadius: 10, background: "#0a0d16" }}>
        {/* Door frame */}
        <rect x="140" y="50" width="120" height="160" rx="4" fill="#5a3820" stroke="#3a2010" strokeWidth="3" />
        {/* Door panel */}
        <rect x="148" y="58" width="104" height="144" rx="3" fill="#8B6340" />
        {/* Door panels decoration */}
        <rect x="156" y="66" width="40" height="55" rx="2" fill="rgba(0,0,0,0.15)" />
        <rect x="204" y="66" width="40" height="55" rx="2" fill="rgba(0,0,0,0.15)" />
        <rect x="156" y="130" width="40" height="55" rx="2" fill="rgba(0,0,0,0.15)" />
        <rect x="204" y="130" width="40" height="55" rx="2" fill="rgba(0,0,0,0.15)" />
        {/* Door knob */}
        <circle cx="234" cy="148" r="7" fill="#C8A040" stroke="#a07820" strokeWidth="1.5" />
        {/* Mail slot */}
        <rect x="175" y="170" width="50" height="8" rx="3" fill="#3a2010" />
        {/* Door knocker hinge */}
        <circle cx="200" cy="120" r="5" fill="#C8A040" />
        {/* Knocker ring — animates when knocking */}
        <path
          d="M 188 120 A 12 12 0 0 1 212 120"
          fill="none"
          stroke="#C8A040"
          strokeWidth="5"
          strokeLinecap="round"
          className={knocking ? "knocking" : ""}
          style={{ transformOrigin: "200px 120px", transformBox: "fill-box" }}
        />

        {/* Sound waves when ringing */}
        {ringing && (
          <>
            <circle cx="200" cy="120" r="18" fill="none" stroke="#00D9C0" strokeWidth="1.5" className="ringing" style={{ animationDelay: "0s" }} />
            <circle cx="200" cy="120" r="28" fill="none" stroke="#00D9C0" strokeWidth="1" className="ringing" style={{ animationDelay: "0.15s" }} />
            <circle cx="200" cy="120" r="38" fill="none" stroke="#00D9C0" strokeWidth="0.7" className="ringing" style={{ animationDelay: "0.3s" }} />
          </>
        )}

        {/* Stick figure — left side */}
        <circle cx="90" cy="100" r="14" fill="none" stroke="#A78BFA" strokeWidth="2.5" />
        <line x1="90" y1="114" x2="90" y2="155" stroke="#A78BFA" strokeWidth="2.5" />
        <line x1="90" y1="125" x2="70" y2="142" stroke="#A78BFA" strokeWidth="2" />
        <line x1="90" y1="125" x2={answered ? "130" : "115"} y2={answered ? "118" : "138"} stroke="#A78BFA" strokeWidth="2" style={{ transition: "all 0.3s" }} />
        <line x1="90" y1="155" x2="74" y2="180" stroke="#A78BFA" strokeWidth="2" />
        <line x1="90" y1="155" x2="106" y2="180" stroke="#A78BFA" strokeWidth="2" />

        {/* Answered wave */}
        {answered && (
          <text x="120" y="108" fill="#00D9C0" fontSize="18">👋</text>
        )}

        {/* Knock count label */}
        <text x="200" y="210" textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="monospace">
          Knocks: {knockCount} — answered: {answered ? "YES" : "NO"}
        </text>

        {/* "They answered!" */}
        {answered && (
          <text x="200" y="44" textAnchor="middle" fill="#00D9C0" fontSize="13" fontFamily="monospace" fontWeight="bold">They answered!</text>
        )}
      </svg>

      {/* do-while flow info */}
      <div style={{ marginBottom: 12, padding: "8px 14px", background: "#0D1117", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8" }}>
        <span style={{ color: "#A78BFA" }}>do</span> {"{ knock(); }"} <span style={{ color: "#A78BFA" }}>while</span>
        {" (answered == 0)"} →{" "}
        <span style={{ color: answered ? "#FF5F6E" : "#00D9C0", fontWeight: 700 }}>
          {answered ? "FALSE — loop exits" : "TRUE — loop continues"}
        </span>
      </div>

      {/* Compare with while box */}
      <div style={{ marginBottom: 12, padding: "10px 14px", background: "rgba(167,139,250,.07)", border: "1px solid rgba(167,139,250,.2)", borderRadius: 9 }}>
        <div style={{ fontSize: 11, color: "#A78BFA", fontFamily: "'Courier New',monospace", fontWeight: 700, marginBottom: 4 }}>vs. while loop</div>
        <div style={{ fontSize: 12, color: "#7B85A8" }}>
          If answered=YES <em>before</em> starting: <span style={{ color: "#FF5F6E" }}>while</span> would skip entirely — <span style={{ color: "#FFB800" }}>do-while</span> always knocks once.
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        {!answered && (
          <button onClick={knock} disabled={knocking} style={{ padding: "8px 18px", background: knocking ? "rgba(0,217,192,.1)" : "#00D9C0", color: knocking ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: knocking ? "not-allowed" : "pointer" }}>
            Knock!
          </button>
        )}
        <button onClick={reset} style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>
          ↺ Reset
        </button>
      </div>

      {showToggle && !answered && (
        <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "#E9EDF8" }}>Did they answer?</span>
          <button onClick={() => { setAnswered(true); setShowToggle(false); }} style={{ padding: "6px 14px", background: "rgba(0,217,192,.12)", color: "#00D9C0", border: "1px solid rgba(0,217,192,.3)", borderRadius: 7, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>YES</button>
          <button onClick={knock} disabled={knocking} style={{ padding: "6px 14px", background: "rgba(255,95,110,.09)", color: "#FF5F6E", border: "1px solid rgba(255,95,110,.3)", borderRadius: 7, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>NO — knock again</button>
        </div>
      )}

      {/* Concept Lock */}
      <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,217,192,.06))", border: "1px solid rgba(167,139,250,.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>CONCEPT LOCK</div>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}><code style={{ color: "#00D9C0" }}>do {"{ ... }"} while(condition)</code> — runs the body <strong>first</strong>, then checks. Always executes at least once.</span>
      </div>

      <pre style={{ background: "#0D1117", border: "1px solid rgba(0,217,192,.15)", borderRadius: 10, padding: 14, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8", overflowX: "auto", marginBottom: 12 }}>{`do {
    printf("*knock knock*\\n");
    answered = checkDoor();
} while (answered == 0);`}</pre>

      <div style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: "8px 14px", display: "inline-flex", gap: 8, alignItems: "center" }}>
        <span style={{ color: "#FF5F6E", fontWeight: 700, fontSize: 11, fontFamily: "'Courier New',monospace" }}>⚠ GOTCHA</span>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}>Even if the condition is false before starting, do-while still runs the body once.</span>
      </div>
    </div>
  );
}

// ─── Sub-step 3: break & continue — The Printer Hall ─────────────────────────

type PrinterStatus = "ok" | "jammed" | "alarm";

function BreakContinueStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [printers, setPrinters] = useState<PrinterStatus[]>(["ok", "jammed", "ok", "alarm", "ok", "ok"]);
  const [figureX, setFigureX] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [visited, setVisited] = useState<number>(-1);
  const [skipped, setSkipped] = useState<number[]>([]);
  const [printed, setPrinted] = useState<number[]>([]);
  const [stopped, setStopped] = useState<"break" | "done" | null>(null);
  const [stoppedAt, setStoppedAt] = useState<number>(-1);

  function resetRun() {
    setFigureX(-1);
    setRunning(false);
    setVisited(-1);
    setSkipped([]);
    setPrinted([]);
    setStopped(null);
    setStoppedAt(-1);
  }

  function togglePrinter(idx: number) {
    if (running) return;
    resetRun();
    setPrinters(prev => {
      const next = [...prev] as PrinterStatus[];
      const cycle: PrinterStatus[] = ["ok", "jammed", "alarm"];
      const cur = cycle.indexOf(next[idx]);
      const newState = cycle[(cur + 1) % cycle.length];
      // Only one alarm allowed
      if (newState === "alarm" && prev.some(p => p === "alarm")) {
        next[idx] = "ok";
      } else {
        next[idx] = newState;
      }
      return next;
    });
  }

  // SVG: 6 printers evenly across x=20..380, y=20..75. Figure walks at y=120.
  const printerXs = Array.from({ length: 6 }, (_, i) => 28 + i * 58);

  function runLoop() {
    if (running) return;
    resetRun();
    setRunning(true);
    let i = 0;
    const sk: number[] = [];
    const pr: number[] = [];

    function step() {
      if (i >= printers.length) {
        setFigureX(printerXs[5] + 50);
        setVisited(6);
        setStopped("done");
        setRunning(false);
        return;
      }
      const px = printerXs[i];
      setFigureX(px);
      setVisited(i);
      const p = printers[i];
      if (p === "jammed") {
        sk.push(i);
        setSkipped([...sk]);
        i++;
        setTimeout(step, 700);
      } else if (p === "alarm") {
        setStoppedAt(i);
        setStopped("break");
        setRunning(false);
      } else {
        pr.push(i);
        setPrinted([...pr]);
        i++;
        setTimeout(step, 700);
      }
    }
    setTimeout(step, 300);
  }

  const statusColor = (s: PrinterStatus, idx: number) => {
    if (stopped === "break" && idx > stoppedAt) return "rgba(255,255,255,0.07)";
    if (printed.includes(idx)) return "rgba(0,217,192,0.18)";
    if (skipped.includes(idx)) return "rgba(255,184,0,0.14)";
    if (s === "alarm") return "rgba(255,95,110,0.12)";
    if (s === "jammed") return "rgba(255,184,0,0.09)";
    return "rgba(255,255,255,0.04)";
  };

  const lightColor = (s: PrinterStatus, idx: number) => {
    if (visited === idx && running) return "#00D9C0";
    if (printed.includes(idx)) return "#00D9C0";
    if (skipped.includes(idx)) return "#FFB800";
    if (stopped === "break" && stoppedAt === idx) return "#FF5F6E";
    if (s === "alarm") return "#FF5F6E";
    if (s === "jammed") return "#FFB800";
    return "#3a4060";
  };

  const figurePixelX = figureX >= 0 ? figureX + 8 : -40;

  return (
    <div>
      <svg width="100%" viewBox="0 0 400 160" style={{ display: "block", marginBottom: 14, borderRadius: 10, background: "#0a0d16" }}>
        {/* 6 printer icons */}
        {printers.map((status, i) => {
          const x = printerXs[i];
          const isActive = visited === i && running;
          const dimmed = stopped === "break" && i > stoppedAt;
          return (
            <g key={i} style={{ opacity: dimmed ? 0.28 : 1, transition: "opacity 0.4s", cursor: running ? "not-allowed" : "pointer" }} onClick={() => togglePrinter(i)}>
              {/* Printer body */}
              <rect x={x} y={18} width="44" height="36" rx="5"
                fill={statusColor(status, i)}
                stroke={isActive ? "#00D9C0" : status === "alarm" ? "#FF5F6E" : status === "jammed" ? "#FFB800" : "rgba(255,255,255,0.1)"}
                strokeWidth={isActive ? 2 : 1}
                style={{ transition: "stroke 0.2s, fill 0.2s" }}
              />
              {/* Paper tray */}
              <rect x={x + 6} y={46} width="32" height="6" rx="2" fill="rgba(255,255,255,0.08)" />
              {/* Status light */}
              <circle cx={x + 34} cy={26} r="4" fill={lightColor(status, i)} style={{ transition: "fill 0.2s" }}>
                {isActive && <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />}
              </circle>
              {/* Printer slot */}
              <rect x={x + 8} y={33} width="28" height="4" rx="1" fill="rgba(0,0,0,0.3)" />
              {/* Label */}
              <text x={x + 22} y={67} textAnchor="middle" fontSize="7.5" fontFamily="monospace"
                fill={status === "alarm" ? "#FF5F6E" : status === "jammed" ? "#FFB800" : "#7B85A8"}>
                {status === "jammed" ? "jammed" : status === "alarm" ? "alarm" : "ok"}
              </text>
              <text x={x + 22} y={77} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#4a5070">#{i}</text>

              {/* Status badge */}
              {skipped.includes(i) && (
                <text x={x + 22} y={90} textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#FFB800">SKIPPED</text>
              )}
              {printed.includes(i) && (
                <text x={x + 22} y={90} textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#00D9C0">PRINTED</text>
              )}
              {stopped === "break" && stoppedAt === i && (
                <text x={x + 22} y={90} textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#FF5F6E">STOPPED</text>
              )}
            </g>
          );
        })}

        {/* Walking figure */}
        <g style={{ transform: `translateX(${figurePixelX}px)`, transition: "transform 0.4s ease", transformBox: "fill-box" }}>
          {/* Head */}
          <circle cx={0} cy={115} r="8" fill="none" stroke="#A78BFA" strokeWidth="2" />
          {/* Body */}
          <line x1={0} y1={123} x2={0} y2={145} stroke="#A78BFA" strokeWidth="2" />
          {/* Arms */}
          <line x1={0} y1={130} x2={-10} y2={140} stroke="#A78BFA" strokeWidth="1.5" />
          <line x1={0} y1={130} x2={10} y2={140} stroke="#A78BFA" strokeWidth="1.5" />
          {/* Legs */}
          <line x1={0} y1={145} x2={-8} y2={158} stroke="#A78BFA" strokeWidth="1.5" />
          <line x1={0} y1={145} x2={8} y2={158} stroke="#A78BFA" strokeWidth="1.5" />
        </g>
      </svg>

      <div style={{ fontSize: 11, color: "#7B85A8", marginBottom: 10, fontFamily: "'Courier New',monospace" }}>
        Click a printer to cycle: ok → jammed → alarm (max 1 alarm)
      </div>

      {stopped === "break" && (
        <div style={{ marginBottom: 12, padding: "9px 14px", background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.3)", borderRadius: 9, color: "#FF5F6E", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12 }}>
          break at printer #{stoppedAt} — all remaining printers dimmed (not visited).
        </div>
      )}
      {stopped === "done" && (
        <div style={{ marginBottom: 12, padding: "9px 14px", background: "rgba(0,217,192,.08)", border: "1px solid rgba(0,217,192,.25)", borderRadius: 9, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12 }}>
          Done! Printed: {printed.length} — Skipped (jammed): {skipped.length}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button onClick={runLoop} disabled={running} style={{ padding: "8px 18px", background: running ? "rgba(0,217,192,.1)" : "#00D9C0", color: running ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: running ? "not-allowed" : "pointer" }}>
          ▶ Run
        </button>
        <button onClick={resetRun} style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>
          ↺ Reset
        </button>
      </div>

      {/* Concept Lock */}
      <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,217,192,.06))", border: "1px solid rgba(167,139,250,.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>CONCEPT LOCK</div>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}>
          <code style={{ color: "#FFB800" }}>continue</code> skips the rest of this loop turn and jumps to the next.{" "}
          <code style={{ color: "#FF5F6E" }}>break</code> exits the loop entirely.
        </span>
      </div>

      <pre style={{ background: "#0D1117", border: "1px solid rgba(0,217,192,.15)", borderRadius: 10, padding: 14, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8", overflowX: "auto", marginBottom: 12 }}>{`for (int i = 0; i < 6; i++) {
    if (printer[i] == JAMMED) continue;
    if (printer[i] == ALARM)  break;
    printf("Printing on printer %d\\n", i);
}`}</pre>

      <div style={{ background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: "8px 14px", display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <span style={{ color: "#FF5F6E", fontWeight: 700, fontSize: 11, fontFamily: "'Courier New',monospace" }}>⚠ GOTCHA</span>
        <span style={{ color: "#E9EDF8", fontSize: 12 }}><code>break</code> inside a nested loop only exits the <strong>inner</strong> loop — not all loops.</span>
      </div>

      <div>
        <button onClick={() => onComplete(50)} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#00D9C0,#A78BFA)", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: ".08em", boxShadow: "0 4px 18px rgba(0,217,192,.25)" }}>
          Complete ✓ — Claim XP
        </button>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SectionLoops({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);
  const TABS = ["for Loop", "while Loop", "do-while", "break & continue"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <style>{`
        @keyframes stamp { 0%{transform:rotate(0deg)} 40%{transform:rotate(30deg)} 100%{transform:rotate(0deg)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes knock { 0%,100%{transform:rotate(0deg)} 40%{transform:rotate(-35deg)} 60%{transform:rotate(-35deg)} }
        @keyframes ringOut { 0%{opacity:.8;transform:scale(1)} 100%{opacity:0;transform:scale(2.2)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .spinning { animation: spin 1.2s linear infinite; transform-origin: center; transform-box: fill-box; }
        .knocking { animation: knock 0.3s ease-in-out 2; transform-origin: bottom center; transform-box: fill-box; }
        .ringing { animation: ringOut 0.6s ease-out forwards; }
        .stamping { animation: stamp 0.4s ease-in-out; transform-origin: bottom center; transform-box: fill-box; }
      `}</style>

      {/* Tab row */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setSubStep(i)} style={{ padding: "5px 14px", borderRadius: 8, border: `1px solid ${subStep === i ? "#00D9C0" : "rgba(255,255,255,.10)"}`, background: subStep === i ? "rgba(0,217,192,.12)" : "transparent", color: subStep === i ? "#00D9C0" : "#7B85A8", fontFamily: "'Courier New',monospace", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
            {i + 1}. {t}
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(24,29,46,.9)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 14, padding: 20 }}>
        {subStep === 0 && <ForLoopStep />}
        {subStep === 1 && <WhileLoopStep />}
        {subStep === 2 && <DoWhileStep />}
        {subStep === 3 && <BreakContinueStep onComplete={onComplete} />}

        {subStep < 3 && (
          <button onClick={() => setSubStep(s => s + 1)} style={{ marginTop: 16, padding: "10px 28px", background: "#00D9C0", color: "#003838", borderRadius: 9, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: ".08em" }}>
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
