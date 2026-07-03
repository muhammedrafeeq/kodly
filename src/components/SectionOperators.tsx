"use client";
import React, { useState } from "react";

interface Props {
  sectionIndex: number;
  onComplete: (xp: number) => void;
}

// ── Section 0 ── Arithmetic: The Calculation Machine ──────────────────────────
function Section0({ onComplete }: { onComplete: (xp: number) => void }) {
  const [a, setA] = useState(6);
  const [b, setB] = useState(3);
  const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useState(false);

  const result = op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : b !== 0 ? Math.floor(a / b) : 0;
  const ops: Array<"+" | "-" | "*" | "/"> = ["+", "-", "*", "/"];
  const opColors: Record<string, string> = { "+": "#00D9C0", "-": "#FF5F6E", "*": "#FFB800", "/": "#A78BFA" };

  function handleOp(o: "+" | "-" | "*" | "/") {
    setOp(o);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 700);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes fallIn { 0%{transform:translateY(-30px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes popOut { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        .calc-btn { cursor:pointer; transition: filter 0.15s; }
        .calc-btn:hover { filter: brightness(1.3); }
        .fall-anim { animation: fallIn 0.5s ease-out; }
        .pop-anim { animation: popOut 0.6s ease-out; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
        Arithmetic operators work just like math. Pick an operator to see the <strong style={{ color: "#00D9C0" }}>Calculation Machine</strong> in action!
      </p>

      {/* Operator buttons */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {ops.map(o => (
          <button
            key={o}
            onClick={() => handleOp(o)}
            style={{
              width: 52, height: 52, borderRadius: 12, border: "none",
              background: op === o ? opColors[o] : "rgba(24,29,46,0.9)",
              color: op === o ? "#0D1117" : opColors[o],
              fontSize: 22, fontWeight: 800, cursor: "pointer",
              boxShadow: op === o ? `0 0 16px ${opColors[o]}88` : "none",
              transition: "all 0.2s",
            }}
          >{o}</button>
        ))}
      </div>

      {/* SVG Scene */}
      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(0,217,192,0.2)" }}>
        <svg viewBox="0 0 400 180" style={{ width: "100%", display: "block" }}>
          {/* Machine body */}
          <rect x="120" y="10" width="160" height="160" rx="14" fill="rgba(24,29,46,0.95)" stroke="#00D9C0" strokeWidth="2" />

          {/* Input A */}
          <rect x="130" y="22" width="60" height="32" rx="8" fill="#0D1117" stroke="#7B85A8" strokeWidth="1.5" />
          <text x="160" y="43" textAnchor="middle" fill="#FFB800" fontSize="16" fontWeight="bold">{a}</text>
          <text x="160" y="20" textAnchor="middle" fill="#7B85A8" fontSize="9">A</text>

          {/* Input B */}
          <rect x="210" y="22" width="60" height="32" rx="8" fill="#0D1117" stroke="#7B85A8" strokeWidth="1.5" />
          <text x="240" y="43" textAnchor="middle" fill="#FFB800" fontSize="16" fontWeight="bold">{b}</text>
          <text x="240" y="20" textAnchor="middle" fill="#7B85A8" fontSize="9">B</text>

          {/* Operator badge */}
          <rect x="183" y="24" width="34" height="30" rx="8" fill={opColors[op]} />
          <text x="200" y="44" textAnchor="middle" fill="#0D1117" fontSize="18" fontWeight="900">{op}</text>

          {/* Funnel */}
          <path d="M135,62 L200,100 L265,62" fill="none" stroke="#7B85A8" strokeWidth="2" />
          <line x1="200" y1="100" x2="200" y2="120" stroke="#7B85A8" strokeWidth="2" />

          {/* Falling A and B animation */}
          {animating && (
            <>
              <circle cx="165" cy="82" r="10" fill={opColors[op]} opacity="0.7" className="fall-anim" />
              <circle cx="235" cy="82" r="10" fill={opColors[op]} opacity="0.7" className="fall-anim" />
            </>
          )}

          {/* Result display */}
          <rect x="152" y="122" width="96" height="36" rx="10" fill="#0D1117" stroke="#00D9C0" strokeWidth="2" />
          <text
            x="200" y="146"
            textAnchor="middle"
            fill="#00D9C0"
            fontSize="20"
            fontWeight="900"
            className={animating ? "pop-anim" : ""}
          >{result}</text>

          {/* Left slider - A */}
          <text x="60" y="45" textAnchor="middle" fill="#7B85A8" fontSize="9">A value</text>
          <rect x="20" y="50" width="80" height="6" rx="3" fill="#1a1f2e" />
          <rect x="20" y="50" width={(a / 10) * 80} height="6" rx="3" fill="#FFB800" />
          <circle cx={20 + (a / 10) * 80} cy="53" r="7" fill="#FFB800" stroke="#0D1117" strokeWidth="2" />

          {/* Right slider - B */}
          <text x="340" y="45" textAnchor="middle" fill="#7B85A8" fontSize="9">B value</text>
          <rect x="300" y="50" width="80" height="6" rx="3" fill="#1a1f2e" />
          <rect x="300" y="50" width={(b / 10) * 80} height="6" rx="3" fill="#A78BFA" />
          <circle cx={300 + (b / 10) * 80} cy="53" r="7" fill="#A78BFA" stroke="#0D1117" strokeWidth="2" />

          {/* Labels */}
          <text x="60" y="160" textAnchor="middle" fill="#7B85A8" fontSize="9">drag → A</text>
          <text x="340" y="160" textAnchor="middle" fill="#7B85A8" fontSize="9">drag → B</text>
        </svg>
      </div>

      {/* Sliders */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ color: "#FFB800", fontSize: 12 }}>A = {a}</label>
          <input type="range" min={1} max={10} value={a} onChange={e => setA(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#FFB800" }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ color: "#A78BFA", fontSize: 12 }}>B = {b}</label>
          <input type="range" min={1} max={10} value={b} onChange={e => setB(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#A78BFA" }} />
        </div>
      </div>

      {/* Live code */}
      <div style={{ background: "#0D1117", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(0,217,192,0.15)", fontFamily: "monospace", fontSize: 15 }}>
        <span style={{ color: "#A78BFA" }}>int </span>
        <span style={{ color: "#E9EDF8" }}>result = </span>
        <span style={{ color: "#FFB800" }}>{a}</span>
        <span style={{ color: opColors[op], fontWeight: 800 }}> {op} </span>
        <span style={{ color: "#A78BFA" }}>{b}</span>
        <span style={{ color: "#E9EDF8" }}>; </span>
        <span style={{ color: "#7B85A8" }}>// = {result}</span>
      </div>

      {/* Concept lock */}
      <div style={{ borderLeft: "3px solid #A78BFA", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#A78BFA" }}>Concept Lock:</strong> Arithmetic operators work just like math:{" "}
        <code style={{ color: "#00D9C0" }}>+</code> <code style={{ color: "#00D9C0" }}>-</code>{" "}
        <code style={{ color: "#00D9C0" }}>*</code> <code style={{ color: "#00D9C0" }}>/</code>{" "}
        <code style={{ color: "#00D9C0" }}>%</code> (remainder/modulo)
      </div>

      <button
        onClick={() => { if (!done) { setDone(true); onComplete(10); } }}
        disabled={done}
        style={{ background: done ? "#7B85A8" : "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}
      >{done ? "✓ XP Earned!" : "Complete & Earn XP"}</button>
    </div>
  );
}

// ── Section 1 ── Assignment: The Arrow Machine ─────────────────────────────────
function Section1({ onComplete }: { onComplete: (xp: number) => void }) {
  const [mode, setMode] = useState<"assign" | "compare">("assign");
  const [x, setX] = useState(5);
  const [animArrow, setAnimArrow] = useState(false);
  const [done, setDone] = useState(false);

  function trigger() {
    setAnimArrow(true);
    setTimeout(() => setAnimArrow(false), 800);
  }

  const isEqual = x === 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes arrowSlide { 0%{transform:translateX(60px);opacity:0} 100%{transform:translateX(0);opacity:1} }
        @keyframes questionPop { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        .arrow-anim { animation: arrowSlide 0.6s ease-out; }
        .q-anim { animation: questionPop 0.5s ease-out; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
        <code style={{ color: "#FF5F6E" }}>=</code> assigns a value. <code style={{ color: "#00D9C0" }}>==</code> compares two values. They look similar but do very different things!
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {(["assign", "compare"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            style={{ padding: "8px 18px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
              background: mode === m ? (m === "assign" ? "#FF5F6E" : "#00D9C0") : "rgba(24,29,46,0.9)",
              color: mode === m ? "#0D1117" : "#E9EDF8" }}>
            {m === "assign" ? "= (assign)" : "== (compare)"}
          </button>
        ))}
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(0,217,192,0.2)" }}>
        <svg viewBox="0 0 400 160" style={{ width: "100%", display: "block" }}>
          {/* Variable box (left) */}
          <rect x="30" y="55" width="90" height="55" rx="10" fill="rgba(24,29,46,0.9)" stroke="#A78BFA" strokeWidth="2" />
          <text x="75" y="75" textAnchor="middle" fill="#7B85A8" fontSize="9">variable x</text>
          <text x="75" y="98" textAnchor="middle" fill="#A78BFA" fontSize="22" fontWeight="900">{x}</text>

          {/* Factory (right) */}
          <rect x="280" y="45" width="90" height="70" rx="10" fill="rgba(24,29,46,0.9)" stroke="#FFB800" strokeWidth="2" />
          <text x="325" y="68" textAnchor="middle" fill="#7B85A8" fontSize="9">value factory</text>
          <text x="325" y="98" textAnchor="middle" fill="#FFB800" fontSize="22" fontWeight="900">5</text>

          {/* Arrow or eyes */}
          {mode === "assign" ? (
            <>
              <line x1="280" y1="83" x2="130" y2="83" stroke="#FF5F6E" strokeWidth="3"
                markerEnd="url(#arr)" className={animArrow ? "arrow-anim" : ""} />
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#FF5F6E" />
                </marker>
              </defs>
              <text x="200" y="78" textAnchor="middle" fill="#FF5F6E" fontSize="16" fontWeight="900">=</text>
            </>
          ) : (
            <>
              {/* Eyes comparing */}
              <circle cx="185" cy="75" r="10" fill="none" stroke="#00D9C0" strokeWidth="2" />
              <circle cx="215" cy="75" r="10" fill="none" stroke="#00D9C0" strokeWidth="2" />
              <circle cx="185" cy="75" r="4" fill="#00D9C0" />
              <circle cx="215" cy="75" r="4" fill="#00D9C0" />
              <text x="200" y="108" textAnchor="middle" fill={isEqual ? "#00D9C0" : "#FF5F6E"} fontSize="20" fontWeight="900"
                className="q-anim">{isEqual ? "TRUE ✓" : "FALSE ✗"}</text>
              <text x="200" y="125" textAnchor="middle" fill="#7B85A8" fontSize="9">x == 5 ?</text>
            </>
          )}

          {/* Warning banner */}
          {mode === "assign" && (
            <rect x="60" y="125" width="280" height="22" rx="6" fill="rgba(255,95,110,0.15)" stroke="#FF5F6E" strokeWidth="1" />
          )}
          {mode === "assign" && (
            <text x="200" y="140" textAnchor="middle" fill="#FF5F6E" fontSize="10">
              ⚠  if(x = 5) ASSIGNS — almost always a bug! Use if(x == 5)
            </text>
          )}
        </svg>
      </div>

      {/* Slider for x */}
      <div>
        <label style={{ color: "#A78BFA", fontSize: 12 }}>x = {x}</label>
        <input type="range" min={1} max={10} value={x} onChange={e => setX(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#A78BFA" }} />
      </div>

      <div style={{ background: "#0D1117", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(0,217,192,0.15)", fontFamily: "monospace", fontSize: 14 }}>
        {mode === "assign"
          ? <><span style={{ color: "#E9EDF8" }}>x </span><span style={{ color: "#FF5F6E", fontWeight: 800 }}>=</span><span style={{ color: "#E9EDF8" }}> 5; </span><span style={{ color: "#7B85A8" }}>// x now holds 5</span></>
          : <><span style={{ color: "#E9EDF8" }}>x </span><span style={{ color: "#00D9C0", fontWeight: 800 }}>==</span><span style={{ color: "#E9EDF8" }}> 5 </span><span style={{ color: "#7B85A8" }}>// is x equal to 5? → {isEqual ? "1 (true)" : "0 (false)"}</span></>
        }
      </div>

      <div style={{ borderLeft: "3px solid #A78BFA", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#A78BFA" }}>Concept Lock:</strong> <code style={{ color: "#FF5F6E" }}>=</code> stores a value into a variable.{" "}
        <code style={{ color: "#00D9C0" }}>==</code> checks if two values are equal (returns true or false).
      </div>

      <button onClick={() => { if (!done) { setDone(true); onComplete(10); } }} disabled={done}
        style={{ background: done ? "#7B85A8" : "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}>
        {done ? "✓ XP Earned!" : "Complete & Earn XP"}
      </button>
    </div>
  );
}

// ── Section 2 ── Increment: The Step Counter ───────────────────────────────────
function Section2({ onComplete }: { onComplete: (xp: number) => void }) {
  const [count, setCount] = useState(5);
  const [mode, setMode] = useState<"pre" | "post">("pre");
  const [bouncing, setBouncing] = useState(false);
  const [usedVal, setUsedVal] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function step(dir: 1 | -1) {
    setBouncing(true);
    if (mode === "pre") {
      const next = count + dir;
      setCount(next);
      setUsedVal(next);
    } else {
      setUsedVal(count);
      setCount(c => c + dir);
    }
    setTimeout(() => setBouncing(false), 500);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes bounce { 0%{transform:scale(1)} 30%{transform:scale(1.35)} 60%{transform:scale(0.9)} 100%{transform:scale(1)} }
        @keyframes slideUp { 0%{transform:translateY(10px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        .bounce { animation: bounce 0.45s ease-out; }
        .slide-up { animation: slideUp 0.35s ease-out; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0 }}>
        <code style={{ color: "#00D9C0" }}>++</code> adds 1, <code style={{ color: "#FF5F6E" }}>--</code> subtracts 1.
        But <em>when</em> it happens depends on prefix vs postfix!
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {(["pre", "post"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setUsedVal(null); }}
            style={{ padding: "8px 18px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
              background: mode === m ? "#A78BFA" : "rgba(24,29,46,0.9)",
              color: mode === m ? "#0D1117" : "#E9EDF8" }}>
            {m === "pre" ? "++x (prefix)" : "x++ (postfix)"}
          </button>
        ))}
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(0,217,192,0.2)" }}>
        <svg viewBox="0 0 400 160" style={{ width: "100%", display: "block" }}>
          {/* Pedometer body */}
          <rect x="140" y="15" width="120" height="130" rx="20" fill="rgba(24,29,46,0.95)" stroke="#A78BFA" strokeWidth="2.5" />

          {/* Screen */}
          <rect x="158" y="30" width="84" height="55" rx="8" fill="#0D1117" stroke="#00D9C0" strokeWidth="1.5" />
          <text x="200" y="53" textAnchor="middle" fill="#7B85A8" fontSize="10">x</text>
          <text x="200" y="75" textAnchor="middle" fill="#00D9C0" fontSize="26" fontWeight="900"
            className={bouncing ? "bounce" : ""}>{count}</text>

          {/* Used value badge */}
          {usedVal !== null && (
            <>
              <rect x="280" y="45" width="80" height="35" rx="8" fill="rgba(255,184,0,0.15)" stroke="#FFB800" strokeWidth="1.5" />
              <text x="320" y="60" textAnchor="middle" fill="#7B85A8" fontSize="9">used value</text>
              <text x="320" y="75" textAnchor="middle" fill="#FFB800" fontSize="18" fontWeight="700"
                className="slide-up">{usedVal}</text>
            </>
          )}

          {/* Prefix label */}
          {mode === "pre" && (
            <text x="200" y="108" textAnchor="middle" fill="#A78BFA" fontSize="10">increments FIRST, then uses</text>
          )}
          {mode === "post" && (
            <text x="200" y="108" textAnchor="middle" fill="#FFB800" fontSize="10">uses value FIRST, then increments</text>
          )}

          {/* Step dots */}
          {[0, 1, 2, 3, 4].map(i => (
            <circle key={i} cx={165 + i * 18} cy="125" r="5"
              fill={i < (count % 5) ? "#A78BFA" : "#1a1f2e"} />
          ))}
        </svg>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => step(-1)}
          style={{ width: 52, height: 52, borderRadius: 12, border: "none", background: "#FF5F6E", color: "#0D1117", fontSize: 24, fontWeight: 900, cursor: "pointer" }}>−−</button>
        <button onClick={() => step(1)}
          style={{ width: 52, height: 52, borderRadius: 12, border: "none", background: "#00D9C0", color: "#0D1117", fontSize: 24, fontWeight: 900, cursor: "pointer" }}>++</button>
      </div>

      <div style={{ background: "#0D1117", borderRadius: 10, padding: "10px 14px", fontFamily: "monospace", fontSize: 14, border: "1px solid rgba(0,217,192,0.15)" }}>
        {mode === "pre"
          ? <><span style={{ color: "#7B85A8" }}>// prefix: </span><span style={{ color: "#E9EDF8" }}>printf(&quot;%d&quot;, </span><span style={{ color: "#A78BFA" }}>++x</span><span style={{ color: "#E9EDF8" }}>);</span><span style={{ color: "#7B85A8" }}> // prints incremented value</span></>
          : <><span style={{ color: "#7B85A8" }}>// postfix: </span><span style={{ color: "#E9EDF8" }}>printf(&quot;%d&quot;, </span><span style={{ color: "#FFB800" }}>x++</span><span style={{ color: "#E9EDF8" }}>);</span><span style={{ color: "#7B85A8" }}> // prints original, THEN increments</span></>
        }
      </div>

      <div style={{ borderLeft: "3px solid #A78BFA", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#A78BFA" }}>Concept Lock:</strong> <code style={{ color: "#A78BFA" }}>++x</code> increments x <em>before</em> using it.{" "}
        <code style={{ color: "#FFB800" }}>x++</code> uses x first, <em>then</em> increments.
      </div>

      <button onClick={() => { if (!done) { setDone(true); onComplete(10); } }} disabled={done}
        style={{ background: done ? "#7B85A8" : "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}>
        {done ? "✓ XP Earned!" : "Complete & Earn XP"}
      </button>
    </div>
  );
}

// ── Section 3 ── Relational: The Comparison Court ─────────────────────────────
function Section3({ onComplete }: { onComplete: (xp: number) => void }) {
  const [a, setA] = useState(7);
  const [b, setB] = useState(4);
  const [op, setOp] = useState<">" | "<" | ">=" | "<=" | "==" | "!=">(">");
  const [gavel, setGavel] = useState(false);
  const [done, setDone] = useState(false);

  type RelOp = ">" | "<" | ">=" | "<=" | "==" | "!=";
  const ops: RelOp[] = [">", "<", ">=", "<=", "==", "!="];
  const opColors: Record<string, string> = {
    ">": "#00D9C0", "<": "#A78BFA", ">=": "#00D9C0", "<=": "#A78BFA", "==": "#FFB800", "!=": "#FF5F6E"
  };

  function evaluate(o: RelOp): boolean {
    switch (o) {
      case ">": return a > b;
      case "<": return a < b;
      case ">=": return a >= b;
      case "<=": return a <= b;
      case "==": return a === b;
      case "!=": return a !== b;
    }
  }

  const result = evaluate(op);

  function judge(o: RelOp) {
    setOp(o);
    setGavel(true);
    setTimeout(() => setGavel(false), 600);
  }

  const aHeight = 50 + (a / 10) * 40;
  const bHeight = 50 + (b / 10) * 40;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes gavelDown { 0%{transform:rotate(-30deg)} 50%{transform:rotate(20deg)} 100%{transform:rotate(0deg)} }
        @keyframes verdictIn { 0%{transform:scale(0) rotate(-10deg);opacity:0} 70%{transform:scale(1.15) rotate(2deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        .gavel-anim { transform-box:fill-box; transform-origin:bottom left; animation:gavelDown 0.5s ease-out; }
        .verdict-anim { animation:verdictIn 0.5s ease-out; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0 }}>
        The Comparison Court! Pick an operator and the judge will deliver a verdict.
      </p>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {ops.map(o => (
          <button key={o} onClick={() => judge(o)}
            style={{ padding: "6px 12px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "monospace",
              background: op === o ? opColors[o] : "rgba(24,29,46,0.9)",
              color: op === o ? "#0D1117" : opColors[o],
              boxShadow: op === o ? `0 0 12px ${opColors[o]}66` : "none" }}>
            {o}
          </button>
        ))}
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(0,217,192,0.2)" }}>
        <svg viewBox="0 0 400 180" style={{ width: "100%", display: "block" }}>
          {/* Judge bench */}
          <rect x="150" y="10" width="100" height="35" rx="8" fill="rgba(24,29,46,0.9)" stroke="#FFB800" strokeWidth="1.5" />
          <text x="200" y="28" textAnchor="middle" fill="#FFB800" fontSize="11" fontWeight="700">JUDGE</text>
          {/* Gavel */}
          <rect x="210" y="18" width="18" height="8" rx="3" fill="#FFB800" className={gavel ? "gavel-anim" : ""} />
          <line x1="218" y1="26" x2="218" y2="38" stroke="#FFB800" strokeWidth="2" />

          {/* Podium A */}
          <rect x="30" y={130 - aHeight} width="70" height={aHeight} rx="4" fill="rgba(0,217,192,0.2)" stroke="#00D9C0" strokeWidth="1.5" />
          <text x="65" y={125 - aHeight} textAnchor="middle" fill="#00D9C0" fontSize="18" fontWeight="900">{a}</text>
          <text x="65" y="148" textAnchor="middle" fill="#7B85A8" fontSize="10">A</text>

          {/* Podium B */}
          <rect x="300" y={130 - bHeight} width="70" height={bHeight} rx="4" fill="rgba(167,139,250,0.2)" stroke="#A78BFA" strokeWidth="1.5" />
          <text x="335" y={125 - bHeight} textAnchor="middle" fill="#A78BFA" fontSize="18" fontWeight="900">{b}</text>
          <text x="335" y="148" textAnchor="middle" fill="#7B85A8" fontSize="10">B</text>

          {/* Floor */}
          <line x1="20" y1="133" x2="380" y2="133" stroke="#7B85A8" strokeWidth="1" />

          {/* Operator in center */}
          <text x="200" y="100" textAnchor="middle" fill={opColors[op]} fontSize="22" fontWeight="900">{op}</text>

          {/* Verdict bubble */}
          <rect x="148" y="145" width="104" height="28" rx="10"
            fill={result ? "rgba(0,217,192,0.2)" : "rgba(255,95,110,0.2)"}
            stroke={result ? "#00D9C0" : "#FF5F6E"} strokeWidth="2"
            className={gavel ? "verdict-anim" : ""} />
          <text x="200" y="164" textAnchor="middle"
            fill={result ? "#00D9C0" : "#FF5F6E"} fontSize="14" fontWeight="900"
            className={gavel ? "verdict-anim" : ""}>
            {result ? "TRUE ✓" : "FALSE ✗"}
          </text>
        </svg>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ color: "#00D9C0", fontSize: 12 }}>A = {a}</label>
          <input type="range" min={0} max={10} value={a} onChange={e => setA(Number(e.target.value))} style={{ width: "100%", accentColor: "#00D9C0" }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ color: "#A78BFA", fontSize: 12 }}>B = {b}</label>
          <input type="range" min={0} max={10} value={b} onChange={e => setB(Number(e.target.value))} style={{ width: "100%", accentColor: "#A78BFA" }} />
        </div>
      </div>

      <div style={{ background: "#0D1117", borderRadius: 10, padding: "10px 14px", fontFamily: "monospace", fontSize: 14, border: "1px solid rgba(0,217,192,0.15)" }}>
        <span style={{ color: "#FFB800" }}>{a}</span>
        <span style={{ color: opColors[op], fontWeight: 800 }}> {op} </span>
        <span style={{ color: "#A78BFA" }}>{b}</span>
        <span style={{ color: "#7B85A8" }}> → {result ? "1 (true)" : "0 (false)"}</span>
      </div>

      <div style={{ borderLeft: "3px solid #FFB800", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#FFB800" }}>Concept Lock:</strong> Relational operators compare two values and return <code style={{ color: "#00D9C0" }}>1</code> (true) or <code style={{ color: "#FF5F6E" }}>0</code> (false).
      </div>

      <button onClick={() => { if (!done) { setDone(true); onComplete(10); } }} disabled={done}
        style={{ background: done ? "#7B85A8" : "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}>
        {done ? "✓ XP Earned!" : "Complete & Earn XP"}
      </button>
    </div>
  );
}

// ── Section 4 ── Logical: The Gate Factory ─────────────────────────────────────
function Section4({ onComplete }: { onComplete: (xp: number) => void }) {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [gate, setGate] = useState<"AND" | "OR" | "NOT">("AND");
  const [done, setDone] = useState(false);

  const output = gate === "AND" ? (a && b) : gate === "OR" ? (a || b) : !a;
  const gateColor = gate === "AND" ? "#00D9C0" : gate === "OR" ? "#A78BFA" : "#FFB800";

  const truth = gate === "AND"
    ? [{ a: false, b: false, r: false }, { a: false, b: true, r: false }, { a: true, b: false, r: false }, { a: true, b: true, r: true }]
    : gate === "OR"
    ? [{ a: false, b: false, r: false }, { a: false, b: true, r: true }, { a: true, b: false, r: true }, { a: true, b: true, r: true }]
    : [{ a: false, b: false, r: true }, { a: true, b: true, r: false }];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes glow { 0%,100%{filter:drop-shadow(0 0 4px #00D9C0)} 50%{filter:drop-shadow(0 0 12px #00D9C0)} }
        .led-on { animation: glow 1.2s ease-in-out infinite; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0 }}>
        Logic gates control whether code runs. Toggle inputs A and B to see the output change!
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {(["AND", "OR", "NOT"] as const).map(g => (
          <button key={g} onClick={() => setGate(g)}
            style={{ padding: "8px 16px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
              background: gate === g ? gateColor : "rgba(24,29,46,0.9)",
              color: gate === g ? "#0D1117" : "#E9EDF8" }}>
            {g}
          </button>
        ))}
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(0,217,192,0.2)" }}>
        <svg viewBox="0 0 400 200" style={{ width: "100%", display: "block" }}>
          {/* Switch A */}
          <rect x="20" y="60" width="60" height="28" rx="14" fill={a ? "#00D9C0" : "#1a1f2e"} stroke="#7B85A8" strokeWidth="1.5"
            style={{ cursor: "pointer" }} onClick={() => setA(v => !v)} />
          <circle cx={a ? 66 : 34} cy="74" r="11" fill={a ? "#0D1117" : "#7B85A8"}
            style={{ cursor: "pointer" }} onClick={() => setA(v => !v)} />
          <text x="50" y="50" textAnchor="middle" fill="#7B85A8" fontSize="10">A = {a ? "T" : "F"}</text>

          {/* Switch B (hidden for NOT) */}
          {gate !== "NOT" && (
            <>
              <rect x="20" y="115" width="60" height="28" rx="14" fill={b ? "#00D9C0" : "#1a1f2e"} stroke="#7B85A8" strokeWidth="1.5"
                style={{ cursor: "pointer" }} onClick={() => setB(v => !v)} />
              <circle cx={b ? 66 : 34} cy="129" r="11" fill={b ? "#0D1117" : "#7B85A8"}
                style={{ cursor: "pointer" }} onClick={() => setB(v => !v)} />
              <text x="50" y="108" textAnchor="middle" fill="#7B85A8" fontSize="10">B = {b ? "T" : "F"}</text>
            </>
          )}

          {/* Wires */}
          <line x1="80" y1="74" x2="160" y2="100" stroke="#7B85A8" strokeWidth="2" />
          {gate !== "NOT" && <line x1="80" y1="129" x2="160" y2="110" stroke="#7B85A8" strokeWidth="2" />}

          {/* Gate shape */}
          {gate === "AND" && <path d="M160,80 L185,80 Q215,80 215,105 Q215,130 185,130 L160,130 Z" fill="rgba(0,217,192,0.15)" stroke={gateColor} strokeWidth="2" />}
          {gate === "OR" && <path d="M160,80 Q175,80 215,105 Q175,130 160,130 Q175,105 160,80 Z" fill="rgba(167,139,250,0.15)" stroke={gateColor} strokeWidth="2" />}
          {gate === "NOT" && <path d="M160,85 L200,105 L160,125 Z" fill="rgba(255,184,0,0.15)" stroke={gateColor} strokeWidth="2" />}
          {gate === "NOT" && <circle cx="205" cy="105" r="5" fill="none" stroke={gateColor} strokeWidth="2" />}

          <text x="187" y="108" textAnchor="middle" fill={gateColor} fontSize="9" fontWeight="700">{gate}</text>

          {/* Output wire */}
          <line x1={gate === "NOT" ? 210 : 215} y1="105" x2="285" y2="105" stroke="#7B85A8" strokeWidth="2" />

          {/* LED */}
          <circle cx="310" cy="105" r="22" fill={output ? "rgba(0,217,192,0.2)" : "rgba(30,35,50,0.9)"} stroke={output ? "#00D9C0" : "#7B85A8"} strokeWidth="2.5"
            className={output ? "led-on" : ""} />
          <circle cx="310" cy="105" r="10" fill={output ? "#00D9C0" : "#2a3040"} />
          <text x="310" y="140" textAnchor="middle" fill={output ? "#00D9C0" : "#7B85A8"} fontSize="10" fontWeight="700">{output ? "ON" : "OFF"}</text>

          {/* Plain English */}
          <text x="187" y="160" textAnchor="middle" fill="#7B85A8" fontSize="9">
            {gate === "AND" ? "both must be true" : gate === "OR" ? "at least one must be true" : "flips true ↔ false"}
          </text>
        </svg>
      </div>

      {/* Truth table */}
      <div style={{ background: "#0D1117", borderRadius: 10, padding: 10, border: "1px solid rgba(0,217,192,0.1)" }}>
        <div style={{ color: "#7B85A8", fontSize: 11, marginBottom: 6 }}>Truth Table — {gate}</div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              <th style={{ color: "#00D9C0", padding: "2px 8px", textAlign: "center" }}>A</th>
              {gate !== "NOT" && <th style={{ color: "#A78BFA", padding: "2px 8px", textAlign: "center" }}>B</th>}
              <th style={{ color: gateColor, padding: "2px 8px", textAlign: "center" }}>Out</th>
            </tr>
          </thead>
          <tbody>
            {truth.map((row, i) => (
              <tr key={i} style={{ background: row.a === a && (gate === "NOT" || row.b === b) ? "rgba(0,217,192,0.08)" : "transparent" }}>
                <td style={{ color: row.a ? "#00D9C0" : "#FF5F6E", textAlign: "center", padding: "2px 8px" }}>{row.a ? "T" : "F"}</td>
                {gate !== "NOT" && <td style={{ color: row.b ? "#A78BFA" : "#FF5F6E", textAlign: "center", padding: "2px 8px" }}>{row.b ? "T" : "F"}</td>}
                <td style={{ color: row.r ? "#00D9C0" : "#FF5F6E", textAlign: "center", fontWeight: 700, padding: "2px 8px" }}>{row.r ? "T" : "F"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => { if (!done) { setDone(true); onComplete(10); } }} disabled={done}
        style={{ background: done ? "#7B85A8" : "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}>
        {done ? "✓ XP Earned!" : "Complete & Earn XP"}
      </button>
    </div>
  );
}

// ── Section 5 ── Precedence: The Math Traffic Lights ──────────────────────────
function Section5({ onComplete }: { onComplete: (xp: number) => void }) {
  const [useParens, setUseParens] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // 2 + 3 * 4  vs  (2+3)*4
  const stepsNoParens = [
    { expr: "2 + 3 * 4", highlight: "*", sub: "3 * 4 = 12", level: 0 },
    { expr: "2 + 12", highlight: "+", sub: "2 + 12 = 14", level: 1 },
    { expr: "14", highlight: "=", sub: "Result: 14", level: 2 },
  ];
  const stepsParens = [
    { expr: "(2 + 3) * 4", highlight: "()", sub: "(2 + 3) = 5", level: 2 },
    { expr: "5 * 4", highlight: "*", sub: "5 * 4 = 20", level: 0 },
    { expr: "20", highlight: "=", sub: "Result: 20", level: 2 },
  ];

  const steps = useParens ? stepsParens : stepsNoParens;
  const current = steps[Math.min(step, steps.length - 1)];

  const levelColors = ["#FF5F6E", "#FFB800", "#00D9C0"];
  const levelLabels = ["High Priority (* / %)", "Medium Priority (+ -)", "Comparison / Logical"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes lightPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.1)} }
        .light-active { animation: lightPulse 0.8s ease-in-out infinite; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0 }}>
        Operators have a priority order — like traffic lights. Higher priority goes first!
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => { setUseParens(false); setStep(0); }}
          style={{ padding: "8px 16px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
            background: !useParens ? "#FF5F6E" : "rgba(24,29,46,0.9)", color: !useParens ? "#0D1117" : "#E9EDF8" }}>
          2 + 3 * 4
        </button>
        <button onClick={() => { setUseParens(true); setStep(0); }}
          style={{ padding: "8px 16px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
            background: useParens ? "#00D9C0" : "rgba(24,29,46,0.9)", color: useParens ? "#0D1117" : "#E9EDF8" }}>
          (2 + 3) * 4
        </button>
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(0,217,192,0.2)" }}>
        <svg viewBox="0 0 400 180" style={{ width: "100%", display: "block" }}>
          {/* Traffic light post */}
          <rect x="30" y="20" width="60" height="140" rx="10" fill="rgba(24,29,46,0.9)" stroke="#7B85A8" strokeWidth="1.5" />

          {/* Lights */}
          {[0, 1, 2].map(i => (
            <circle key={i} cx="60" cy={50 + i * 38} r="15"
              fill={current.level === i ? levelColors[i] : "#1a1f2e"}
              stroke={levelColors[i]} strokeWidth="2"
              className={current.level === i ? "light-active" : ""} />
          ))}

          {/* Level labels */}
          {levelLabels.map((lbl, i) => (
            <text key={i} x="105" y={55 + i * 38} fill={current.level === i ? levelColors[i] : "#7B85A8"} fontSize="9"
              fontWeight={current.level === i ? "700" : "400"}>{lbl}</text>
          ))}

          {/* Expression display */}
          <rect x="105" y="130" width="270" height="38" rx="8" fill="#0D1117" stroke={levelColors[current.level]} strokeWidth="1.5" />
          <text x="240" y="148" textAnchor="middle" fill={levelColors[current.level]} fontSize="14" fontWeight="700">{current.expr}</text>
          <text x="240" y="162" textAnchor="middle" fill="#7B85A8" fontSize="9">{current.sub}</text>
        </svg>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "rgba(24,29,46,0.9)", color: "#E9EDF8", cursor: step === 0 ? "default" : "pointer", opacity: step === 0 ? 0.4 : 1 }}>
          ← Prev
        </button>
        <span style={{ color: "#7B85A8", fontSize: 13 }}>Step {step + 1} / {steps.length}</span>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
          style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "rgba(24,29,46,0.9)", color: "#E9EDF8", cursor: step === steps.length - 1 ? "default" : "pointer", opacity: step === steps.length - 1 ? 0.4 : 1 }}>
          Next →
        </button>
      </div>

      <div style={{ borderLeft: "3px solid #FFB800", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#FFB800" }}>Concept Lock:</strong> <code style={{ color: "#FF5F6E" }}>* / %</code> have higher priority than <code style={{ color: "#FFB800" }}>+ -</code>. Use <code style={{ color: "#00D9C0" }}>()</code> parentheses to override priority.
      </div>

      <button onClick={() => { if (!done) { setDone(true); onComplete(10); } }} disabled={done}
        style={{ background: done ? "#7B85A8" : "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}>
        {done ? "✓ XP Earned!" : "Complete & Earn XP"}
      </button>
    </div>
  );
}

// ── Section 6 ── Capstone: Operator Challenge ─────────────────────────────────
interface Question { expr: string; correct: number; options: number[]; explanation: string; }

function Section6({ onComplete }: { onComplete: (xp: number) => void }) {
  const questions: Question[] = [
    { expr: "2 + 3 * 4", correct: 14, options: [14, 20, 24, 11], explanation: "* goes before +: 3*4=12, then 2+12=14" },
    { expr: "10 % 3", correct: 1, options: [3, 1, 0, 2], explanation: "10 ÷ 3 = 3 remainder 1" },
    { expr: "int x=5; x++; printf(\"%d\",x)", correct: 6, options: [5, 6, 4, 7], explanation: "x++ increments after assignment, so printf prints 6" },
    { expr: "7 >= 7", correct: 1, options: [0, 1, 7, -1], explanation: ">= includes equals, so 7>=7 is true (1)" },
    { expr: "!0 && 1", correct: 1, options: [0, 1, -1, 2], explanation: "!0 = true, true && 1 = true (1)" },
  ];

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [done, setDone] = useState(false);

  function pick(opt: number) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === questions[idx].correct) {
      setScore(s => s + 12);
      setFlash("correct");
    } else {
      setShake(true);
      setFlash("wrong");
      setTimeout(() => setShake(false), 600);
    }
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
      setFlash(null);
    } else {
      setDone(true);
      onComplete(60);
    }
  }

  const q = questions[idx];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes correctFlash { 0%{background:rgba(0,217,192,0.3)} 100%{background:transparent} }
        @keyframes wrongFlash { 0%{background:rgba(255,95,110,0.3)} 100%{background:transparent} }
        @keyframes shakeIt { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 60%{transform:translateX(6px)} }
        @keyframes xpBadge { 0%{transform:scale(0) translateY(10px);opacity:0} 60%{transform:scale(1.2) translateY(-5px)} 100%{transform:scale(1) translateY(0);opacity:1} }
        .shake { animation:shakeIt 0.5s ease-out; }
        .xp-badge { animation:xpBadge 0.5s ease-out; }
      `}</style>

      {done ? (
        <div style={{ textAlign: "center", padding: 24 }}>
          <div style={{ fontSize: 56 }}>🏆</div>
          <div style={{ color: "#00D9C0", fontSize: 24, fontWeight: 900, margin: "10px 0" }}>Challenge Complete!</div>
          <div style={{ color: "#FFB800", fontSize: 18 }}>Score: {score} / 60 XP</div>
          <div style={{ color: "#7B85A8", fontSize: 14, marginTop: 8 }}>You have mastered operators!</div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "#7B85A8", fontSize: 13 }}>Question {idx + 1} / {questions.length}</span>
            <span style={{ color: "#FFB800", fontWeight: 700, fontSize: 13 }}>XP: {score}</span>
          </div>

          <div style={{ background: "#0D1117", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(0,217,192,0.2)", fontFamily: "monospace", fontSize: 17, color: "#E9EDF8", textAlign: "center" } as React.CSSProperties}
            className={shake ? "shake" : ""}>
            {q.expr}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {q.options.map(opt => {
              const isCorrect = opt === q.correct;
              const isSelected = opt === selected;
              let bg = "rgba(24,29,46,0.9)";
              let border = "1px solid rgba(123,133,168,0.3)";
              if (selected !== null) {
                if (isCorrect) { bg = "rgba(0,217,192,0.2)"; border = "1px solid #00D9C0"; }
                else if (isSelected) { bg = "rgba(255,95,110,0.2)"; border = "1px solid #FF5F6E"; }
              }
              return (
                <button key={opt} onClick={() => pick(opt)}
                  style={{ padding: "12px", borderRadius: 10, border, background: bg, color: "#E9EDF8", fontSize: 16, fontWeight: 700, cursor: selected !== null ? "default" : "pointer", transition: "all 0.2s", fontFamily: "monospace" }}>
                  {opt}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div style={{ borderRadius: 10, padding: "10px 14px", background: flash === "correct" ? "rgba(0,217,192,0.1)" : "rgba(255,95,110,0.1)", border: `1px solid ${flash === "correct" ? "#00D9C0" : "#FF5F6E"}`, color: "#E9EDF8", fontSize: 13 }}>
              {flash === "correct" ? <span style={{ color: "#00D9C0", fontWeight: 700 }}>✓ Correct! </span> : <span style={{ color: "#FF5F6E", fontWeight: 700 }}>✗ Not quite! </span>}
              {q.explanation}
            </div>
          )}

          {selected !== null && (
            <button onClick={next}
              style={{ background: "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              {idx < questions.length - 1 ? "Next Question →" : "Finish Challenge!"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function SectionOperators({ sectionIndex, onComplete }: Props) {
  const titles = [
    "Arithmetic: The Calculation Machine",
    "Assignment: The Arrow Machine",
    "Increment: The Step Counter",
    "Relational: The Comparison Court",
    "Logical: The Gate Factory",
    "Precedence: The Math Traffic Lights",
    "Capstone: Operator Challenge",
  ];

  const sections = [
    <Section0 key={0} onComplete={onComplete} />,
    <Section1 key={1} onComplete={onComplete} />,
    <Section2 key={2} onComplete={onComplete} />,
    <Section3 key={3} onComplete={onComplete} />,
    <Section4 key={4} onComplete={onComplete} />,
    <Section5 key={5} onComplete={onComplete} />,
    <Section6 key={6} onComplete={onComplete} />,
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D9C0" }} />
          <span style={{ color: "#7B85A8", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Operators · {sectionIndex + 1} / 7
          </span>
        </div>
        <h2 style={{ color: "#E9EDF8", fontSize: 20, fontWeight: 800, margin: 0 }}>{titles[sectionIndex]}</h2>
      </div>

      {sections[sectionIndex]}
    </div>
  );
}
