"use client";

import React, { useState, useEffect } from "react";

interface SectionSwitchProps {
  onComplete: (xp: number) => void;
}

const PALETTE = {
  teal: "#00D9C0",
  amber: "#FFB800",
  coral: "#FF5F6E",
  lavender: "#A78BFA",
  text: "#E9EDF8",
  muted: "#7B85A8",
  codeBg: "#0D1117",
  card: "rgba(24,29,46,0.9)",
};

const KEYFRAMES = `
@keyframes dropItem {
  from { transform: translateY(-60px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
@keyframes tipOver {
  from { transform: rotate(0deg);  }
  to   { transform: rotate(85deg); }
}
@keyframes popIn {
  0%   { transform: scale(0);    }
  70%  { transform: scale(1.15); }
  100% { transform: scale(1);    }
}
@keyframes blink {
  0%, 100% { opacity: 1;  }
  50%       { opacity: .3; }
}
@keyframes shake {
  0%,100% { transform: translateX(0);   }
  20%     { transform: translateX(-6px); }
  40%     { transform: translateX(6px);  }
  60%     { transform: translateX(-4px); }
  80%     { transform: translateX(4px);  }
}
.drop-in  { animation: dropItem 0.5s ease forwards; }
.tipping  { animation: tipOver 0.4s ease forwards; transform-origin: bottom center; transform-box: fill-box; }
.pop-in   { animation: popIn   0.3s ease forwards; }
.blinking { animation: blink   0.8s infinite; }
.shaking  { animation: shake   0.4s ease; }
`;

const ITEMS: { key: string; label: string; color: string; name: string }[] = [
  { key: "A", label: "🥤 Cola",  color: "#FF5F6E", name: "Cola"  },
  { key: "B", label: "🍟 Chips", color: "#FFB800", name: "Chips" },
  { key: "C", label: "💧 Water", color: "#00D9C0", name: "Water" },
  { key: "D", label: "🍫 Choc",  color: "#A78BFA", name: "Choc"  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-step 0 — Vending Machine
// ─────────────────────────────────────────────────────────────────────────────
function VendingMachine({ onNext }: { onNext: () => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [dropped, setDropped] = useState<string | null>(null);

  const handlePick = (key: string) => {
    setDropped(null);
    setChosen(key);
    setTimeout(() => setDropped(key), 50);
  };

  const item = ITEMS.find((i) => i.key === chosen) ?? null;
  const dropItem = ITEMS.find((i) => i.key === dropped) ?? null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* SVG Scene */}
      <svg
        viewBox="0 0 380 220"
        style={{ width: "100%", borderRadius: 12, background: PALETTE.codeBg, display: "block" }}
      >
        {/* Machine body */}
        <rect x="110" y="15" width="160" height="180" rx="8" fill="#0D1117" stroke={PALETTE.teal} strokeWidth="2" />

        {/* Display screen */}
        <rect x="120" y="22" width="100" height="26" rx="4" fill="#101820" stroke={PALETTE.muted} strokeWidth="1" />
        <text x="170" y="40" textAnchor="middle" fontFamily="monospace" fontSize="8" fill={PALETTE.teal}>
          {chosen ? `case '${chosen}':` : "Awaiting input..."}
        </text>

        {/* Item rows */}
        {ITEMS.map((it, idx) => {
          const isChosen = chosen === it.key;
          return (
            <g key={it.key}>
              <rect
                x="122"
                y={56 + idx * 32}
                width="116"
                height="26"
                rx="4"
                fill={isChosen ? `${it.color}33` : "#1a1f2e"}
                stroke={isChosen ? it.color : PALETTE.muted}
                strokeWidth={isChosen ? 2 : 1}
              />
              <text
                x="180"
                y={74 + idx * 32}
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fill={isChosen ? it.color : PALETTE.muted}
              >
                {it.label}
              </text>
            </g>
          );
        })}

        {/* Tray slot */}
        <rect x="120" y="181" width="140" height="10" rx="3" fill="#101820" stroke={PALETTE.muted} strokeWidth="1" />
        <text x="190" y="189" textAnchor="middle" fontFamily="monospace" fontSize="6" fill={PALETTE.muted}>
          TRAY
        </text>

        {/* Dropped item animation */}
        {dropItem && (
          <rect
            key={`drop-${dropped}`}
            className="drop-in"
            x="170"
            y="168"
            width="40"
            height="14"
            rx="3"
            fill={dropItem.color}
          />
        )}

        {/* Break label */}
        {chosen && (
          <text
            className="pop-in"
            x="175"
            y="208"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="8"
            fill={PALETTE.amber}
          >
            break;
          </text>
        )}

        {/* Selection buttons column */}
        {ITEMS.map((it, idx) => (
          <g key={`btn-${it.key}`} style={{ cursor: "pointer" }} onClick={() => handlePick(it.key)}>
            <circle
              cx="290"
              cy={69 + idx * 32}
              r="11"
              fill={chosen === it.key ? PALETTE.amber : "#1a1f2e"}
              stroke={chosen === it.key ? PALETTE.amber : PALETTE.muted}
              strokeWidth="1.5"
            />
            <text
              x="290"
              y={73 + idx * 32}
              textAnchor="middle"
              fontFamily="monospace"
              fontSize="9"
              fontWeight="bold"
              fill={chosen === it.key ? "#000" : PALETTE.muted}
              style={{ pointerEvents: "none" }}
            >
              {it.key}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text x="290" y="42" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={PALETTE.muted}>
          SELECT
        </text>
      </svg>

      {/* Current selection label */}
      <div
        style={{
          background: PALETTE.card,
          border: `1px solid ${item ? item.color : PALETTE.muted}44`,
          borderRadius: 8,
          padding: "8px 14px",
          fontFamily: "monospace",
          fontSize: 12,
          color: item ? item.color : PALETTE.muted,
          minHeight: 34,
          transition: "border-color 0.3s",
        }}
      >
        {item ? `Dispensing: ${item.label} — pressing button '${item.key}'` : "Press a button (A / B / C / D) on the machine →"}
      </div>

      {/* Code panel */}
      <div
        style={{
          background: PALETTE.codeBg,
          border: `1px solid ${PALETTE.teal}33`,
          borderRadius: 10,
          padding: 14,
          fontFamily: "monospace",
          fontSize: 11,
          lineHeight: 1.8,
          overflowX: "auto",
        }}
      >
        {ITEMS.map((it, idx) => {
          const active = chosen === it.key;
          return (
            <div key={it.key} style={{ color: active ? it.color : PALETTE.muted }}>
              {idx === 0 && (
                <span style={{ color: PALETTE.muted }}>{"switch (choice) {\n"}</span>
              )}
              <span style={{ color: active ? PALETTE.amber : PALETTE.muted }}>{"    "}</span>
              <span style={{ color: active ? PALETTE.lavender : PALETTE.muted }}>
                {`case '${it.key}':`}
              </span>
              <span style={{ color: active ? PALETTE.text : PALETTE.muted }}>
                {` printf("${it.name}\\n");`}
              </span>
              {active && (
                <span style={{ color: PALETTE.teal }} className="pop-in">
                  {"  break;"}
                </span>
              )}
              {!active && <span style={{ color: PALETTE.muted }}>{"  break;"}</span>}
              {"\n"}
              {idx === ITEMS.length - 1 && (
                <>
                  <span style={{ color: PALETTE.muted }}>{"    default: printf(\"Unknown\"); break;\n"}</span>
                  <span style={{ color: PALETTE.muted }}>{"}"}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Concept Lock */}
      <div
        style={{
          background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,218,243,.07))",
          border: `1px solid ${PALETTE.lavender}44`,
          borderRadius: 10,
          padding: 14,
        }}
      >
        <div style={{ color: PALETTE.lavender, fontFamily: "monospace", fontSize: 10, fontWeight: "bold", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>
          🔒 Concept Lock
        </div>
        <div style={{ color: PALETTE.text, fontSize: 13 }}>
          <code style={{ background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>switch</code>{" "}
          matches ONE value to ONE case. Much cleaner than many <code style={{ background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>if/else if</code> chains.
        </div>
      </div>

      {/* Gotcha */}
      <div
        style={{
          background: "rgba(255,95,110,.09)",
          border: `1px solid ${PALETTE.coral}44`,
          borderRadius: 10,
          padding: 12,
          display: "flex",
          gap: 10,
          fontSize: 13,
          color: PALETTE.text,
        }}
      >
        <span>⚠️</span>
        <div>
          <strong>Forget </strong>
          <code style={{ background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>break</code>
          <strong> → machine keeps dispensing items below!</strong>{" "}
          Execution falls through to the next case automatically.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onNext}
          style={{
            padding: "8px 20px",
            background: PALETTE.teal,
            color: "#000",
            border: "none",
            borderRadius: 8,
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          NEXT: FALLING DOMINOES →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-step 1 — Falling Dominoes
// ─────────────────────────────────────────────────────────────────────────────
function FallingDominoes({ onNext }: { onNext: () => void }) {
  const [mode, setMode] = useState<"break" | "nobreak">("break");
  const [startCase, setStartCase] = useState<number | null>(null);
  const [fallen, setFallen] = useState<boolean[]>([false, false, false, false, false]);
  const [knocked, setKnocked] = useState(false);

  const reset = () => {
    setFallen([false, false, false, false, false]);
    setKnocked(false);
  };

  const handleKnock = () => {
    if (startCase === null) return;
    reset();
    const idx = startCase - 1;

    if (mode === "break") {
      const next = [false, false, false, false, false];
      next[idx] = true;
      setFallen(next);
      setKnocked(true);
    } else {
      // cascade with timeouts
      const next = [...[false, false, false, false, false]];
      for (let i = idx; i < 5; i++) {
        const delay = (i - idx) * 420;
        const capturedI = i;
        setTimeout(() => {
          setFallen((prev) => {
            const updated = [...prev];
            updated[capturedI] = true;
            return updated;
          });
        }, delay);
      }
      setKnocked(true);
    }
  };

  useEffect(() => {
    reset();
    setStartCase(null);
  }, [mode]);

  const dominoW = 22;
  const dominoH = 70;
  const spacing = 60;
  const baseY = 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 10 }}>
        {(["break", "nobreak"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: `2px solid ${mode === m ? (m === "break" ? PALETTE.teal : PALETTE.coral) : PALETTE.muted + "44"}`,
              background: mode === m ? (m === "break" ? PALETTE.teal + "22" : PALETTE.coral + "22") : "transparent",
              color: mode === m ? (m === "break" ? PALETTE.teal : PALETTE.coral) : PALETTE.muted,
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {m === "break" ? "WITH break ✓" : "WITHOUT break ✗"}
          </button>
        ))}
      </div>

      {/* Start case picker + knock button */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: PALETTE.muted }}>Start at case:</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => { setStartCase(n); reset(); }}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: `2px solid ${startCase === n ? PALETTE.amber : PALETTE.muted + "44"}`,
              background: startCase === n ? PALETTE.amber + "22" : "transparent",
              color: startCase === n ? PALETTE.amber : PALETTE.muted,
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {n}
          </button>
        ))}
        <button
          onClick={handleKnock}
          disabled={startCase === null}
          style={{
            padding: "7px 16px",
            borderRadius: 8,
            border: "none",
            background: startCase !== null ? PALETTE.amber : PALETTE.muted + "33",
            color: startCase !== null ? "#000" : PALETTE.muted,
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: 12,
            cursor: startCase !== null ? "pointer" : "not-allowed",
          }}
        >
          Knock! 🃏
        </button>
      </div>

      {/* SVG Dominoes */}
      <svg
        viewBox="0 0 380 180"
        style={{ width: "100%", borderRadius: 12, background: PALETTE.codeBg, display: "block" }}
      >
        {/* Ground line */}
        <line x1="20" y1="168" x2="360" y2="168" stroke={PALETTE.muted} strokeWidth="1" strokeOpacity="0.3" />

        {[0, 1, 2, 3, 4].map((i) => {
          const cx = 50 + i * spacing;
          const isFallen = fallen[i];
          const isStart = startCase !== null && startCase - 1 === i;
          const hasRan = knocked && fallen[i];

          return (
            <g key={i}>
              {isFallen ? (
                // Tipped domino
                <g
                  className="tipping"
                  style={{
                    transformOrigin: `${cx + dominoW / 2}px ${baseY + dominoH}px`,
                  }}
                >
                  <rect
                    x={cx}
                    y={baseY}
                    width={dominoW}
                    height={dominoH}
                    rx="3"
                    fill={isStart ? PALETTE.teal + "33" : PALETTE.amber + "22"}
                    stroke={isStart ? PALETTE.teal : PALETTE.amber}
                    strokeWidth="2"
                  />
                  <text
                    x={cx + dominoW / 2}
                    y={baseY + 20}
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="8"
                    fill={isStart ? PALETTE.teal : PALETTE.amber}
                  >
                    {i + 1}
                  </text>
                </g>
              ) : (
                // Standing domino
                <g>
                  <rect
                    x={cx}
                    y={baseY}
                    width={dominoW}
                    height={dominoH}
                    rx="3"
                    fill={isStart ? PALETTE.teal + "11" : "#1a1f2e"}
                    stroke={isStart ? PALETTE.teal : PALETTE.muted + "66"}
                    strokeWidth={isStart ? 2 : 1}
                  />
                  <text
                    x={cx + dominoW / 2}
                    y={baseY + 20}
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="8"
                    fill={isStart ? PALETTE.teal : PALETTE.muted}
                  >
                    {i + 1}
                  </text>
                </g>
              )}

              {/* "case N" label below */}
              <text
                x={cx + dominoW / 2}
                y="178"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="7"
                fill={hasRan ? PALETTE.teal : PALETTE.muted + "66"}
              >
                {`case ${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Which cases ran */}
      {knocked && (
        <div
          className="pop-in"
          style={{
            background: PALETTE.card,
            border: `1px solid ${PALETTE.teal}33`,
            borderRadius: 10,
            padding: 12,
            fontFamily: "monospace",
            fontSize: 11,
          }}
        >
          <div style={{ color: PALETTE.muted, fontSize: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
            Execution trace:
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{ color: fallen[i] ? (i === (startCase ?? 1) - 1 ? PALETTE.teal : PALETTE.amber) : PALETTE.muted + "44", lineHeight: 1.8 }}
            >
              {fallen[i] ? "→" : " "}{" "}case {i + 1}: {fallen[i] ? "runs" : "skipped"}
              {fallen[i] && mode === "break" && i === (startCase ?? 1) - 1 && (
                <span style={{ color: PALETTE.teal }}> → break; (stops here)</span>
              )}
              {fallen[i] && mode === "nobreak" && i < 4 && fallen[i + 1] && (
                <span style={{ color: PALETTE.coral }}> → falls through!</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Code snippet */}
      <div
        style={{
          background: PALETTE.codeBg,
          border: `1px solid ${PALETTE.teal}33`,
          borderRadius: 10,
          padding: 14,
          fontFamily: "monospace",
          fontSize: 11,
          lineHeight: 1.8,
        }}
      >
        <div style={{ color: PALETTE.muted, fontSize: 10, marginBottom: 6 }}>
          {mode === "break" ? "// WITH break:" : "// WITHOUT break:"}
        </div>
        {mode === "break" ? (
          <>
            <div style={{ color: PALETTE.text }}>
              case 2: <span style={{ color: PALETTE.lavender }}>doSomething();</span>{" "}
              <span style={{ color: PALETTE.teal }}>break;</span>
              <span style={{ color: PALETTE.muted }}> // stops here</span>
            </div>
          </>
        ) : (
          <>
            <div style={{ color: PALETTE.text }}>
              case 2: <span style={{ color: PALETTE.lavender }}>doSomething();</span>
              <span style={{ color: PALETTE.coral }}> // falls into case 3!</span>
            </div>
            <div style={{ color: PALETTE.text }}>
              case 3: <span style={{ color: PALETTE.lavender }}>doMore();</span>
              <span style={{ color: PALETTE.coral }}> // and case 4!</span>
            </div>
          </>
        )}
      </div>

      {/* Concept lock */}
      <div
        style={{
          background: "linear-gradient(135deg,rgba(167,139,250,.10),rgba(0,218,243,.07))",
          border: `1px solid ${PALETTE.lavender}44`,
          borderRadius: 10,
          padding: 14,
        }}
      >
        <div style={{ color: PALETTE.lavender, fontFamily: "monospace", fontSize: 10, fontWeight: "bold", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>
          🔒 Concept Lock
        </div>
        <div style={{ color: PALETTE.text, fontSize: 13 }}>
          Without <code style={{ background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace" }}>break</code>, execution falls through to the next case — almost always a bug. Every case needs a break unless fall-through is intentional and clearly commented.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onNext}
          style={{
            padding: "8px 20px",
            background: PALETTE.teal,
            color: "#000",
            border: "none",
            borderRadius: 8,
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          NEXT: DEFAULT CHALLENGE →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-step 2 — Default Case Challenge + Quiz
// ─────────────────────────────────────────────────────────────────────────────
function DefaultChallenge({ onComplete }: { onComplete: (xp: number) => void }) {
  const [hasDefault, setHasDefault] = useState(false);
  const [pressedE, setPressedE] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [quiz1, setQuiz1] = useState<string | null>(null);
  const [quiz2, setQuiz2] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const handlePressE = () => {
    setPressedE(true);
    if (!hasDefault) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  const bothCorrect = quiz1 === "falls through" && quiz2 === "no case matches";

  const handleSubmit = () => {
    setSubmitted(true);
    if (bothCorrect) {
      setTimeout(() => {
        setDone(true);
        onComplete(50);
      }, 600);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Toggle default */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, color: PALETTE.muted }}>Add default case:</span>
        <button
          onClick={() => { setHasDefault(!hasDefault); setPressedE(false); }}
          style={{
            padding: "6px 18px",
            borderRadius: 20,
            border: `2px solid ${hasDefault ? PALETTE.teal : PALETTE.muted + "44"}`,
            background: hasDefault ? PALETTE.teal + "22" : "transparent",
            color: hasDefault ? PALETTE.teal : PALETTE.muted,
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {hasDefault ? "ON ✓" : "OFF ✗"}
        </button>
      </div>

      {/* SVG Vending Machine */}
      <svg
        viewBox="0 0 380 220"
        style={{ width: "100%", borderRadius: 12, background: PALETTE.codeBg, display: "block" }}
        className={shaking ? "shaking" : ""}
      >
        {/* Machine body */}
        <rect
          x="110" y="15" width="160" height="180" rx="8"
          fill="#0D1117"
          stroke={shaking ? PALETTE.coral : PALETTE.teal}
          strokeWidth="2"
        />

        {/* Item rows A–D */}
        {ITEMS.map((it, idx) => (
          <g key={it.key}>
            <rect x="122" y={56 + idx * 32} width="116" height="26" rx="4" fill="#1a1f2e" stroke={PALETTE.muted} strokeWidth="1" />
            <text x="180" y={74 + idx * 32} textAnchor="middle" fontFamily="monospace" fontSize="9" fill={PALETTE.muted}>
              {it.label}
            </text>
          </g>
        ))}

        {/* Known buttons A-D */}
        {ITEMS.map((it, idx) => (
          <g key={`b-${it.key}`}>
            <circle cx="290" cy={69 + idx * 32} r="10" fill="#1a1f2e" stroke={PALETTE.muted} strokeWidth="1.5" />
            <text x="290" y={73 + idx * 32} textAnchor="middle" fontFamily="monospace" fontSize="9" fill={PALETTE.muted}>
              {it.key}
            </text>
          </g>
        ))}

        {/* Unknown button E */}
        <g style={{ cursor: "pointer" }} onClick={handlePressE}>
          <circle cx="290" cy={205} r="12" fill={pressedE && !hasDefault ? PALETTE.coral + "33" : PALETTE.amber + "22"} stroke={PALETTE.amber} strokeWidth="2" />
          <text x="290" y={209} textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="bold" fill={PALETTE.amber} style={{ pointerEvents: "none" }}>
            E
          </text>
        </g>
        <text x="290" y="218" textAnchor="middle" fontFamily="monospace" fontSize="6" fill={PALETTE.muted}>
          ???
        </text>

        {/* Tray */}
        <rect x="120" y="181" width="140" height="10" rx="3" fill="#101820" stroke={PALETTE.muted} strokeWidth="1" />

        {/* Response when E pressed */}
        {pressedE && !hasDefault && (
          <>
            <text x="190" y="45" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="bold" fill={PALETTE.coral} className="blinking">
              ERROR: No case for E!
            </text>
            <text x="168" y="196" textAnchor="middle" fontFamily="monospace" fontSize="18" fill={PALETTE.coral}>
              ✗
            </text>
          </>
        )}
        {pressedE && hasDefault && (
          <text x="168" y="196" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={PALETTE.teal} className="pop-in">
            Unknown item
          </text>
        )}
      </svg>

      {/* Code with/without default */}
      <div
        style={{
          background: PALETTE.codeBg,
          border: `1px solid ${PALETTE.teal}33`,
          borderRadius: 10,
          padding: 14,
          fontFamily: "monospace",
          fontSize: 11,
          lineHeight: 1.8,
        }}
      >
        {`switch (choice) {\n`}
        {ITEMS.map((it) => (
          <div key={it.key} style={{ color: PALETTE.muted }}>
            {`    case '${it.key}': printf("${it.name}\\n"); break;`}
          </div>
        ))}
        {hasDefault ? (
          <div style={{ color: PALETTE.teal }} className="pop-in">
            {`    default: printf("Unknown\\n"); break;`}
          </div>
        ) : (
          <div style={{ color: PALETTE.coral }}>
            {`    // ← no default! pressing E does nothing`}
          </div>
        )}
        {`}`}
      </div>

      {/* Quiz */}
      <div
        style={{
          background: PALETTE.card,
          border: `1px solid ${PALETTE.lavender}33`,
          borderRadius: 10,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ color: PALETTE.lavender, fontFamily: "monospace", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 2 }}>
          Quick Quiz
        </div>

        {/* Q1 */}
        <div>
          <div style={{ color: PALETTE.text, fontSize: 13, marginBottom: 10 }}>
            1. What happens without <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>break</code>?
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["exits switch", "falls through", "crashes"].map((opt) => {
              const correct = opt === "falls through";
              let bg = "transparent";
              let border = PALETTE.muted + "44";
              let color = PALETTE.muted;
              if (quiz1 === opt && !submitted) { bg = PALETTE.lavender + "22"; border = PALETTE.lavender; color = PALETTE.lavender; }
              if (submitted && correct) { bg = PALETTE.teal + "22"; border = PALETTE.teal; color = PALETTE.teal; }
              if (submitted && !correct && quiz1 === opt) { bg = PALETTE.coral + "22"; border = PALETTE.coral; color = PALETTE.coral; }
              return (
                <button
                  key={opt}
                  disabled={submitted}
                  onClick={() => setQuiz1(opt)}
                  style={{ padding: "6px 14px", borderRadius: 8, border: `2px solid ${border}`, background: bg, color, fontFamily: "monospace", fontSize: 12, cursor: submitted ? "default" : "pointer" }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q2 */}
        <div>
          <div style={{ color: PALETTE.text, fontSize: 13, marginBottom: 10 }}>
            2. When does <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,.08)", padding: "1px 5px", borderRadius: 4 }}>default</code> run?
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["always", "when no case matches", "never"].map((opt) => {
              const correct = opt === "when no case matches";
              let bg = "transparent";
              let border = PALETTE.muted + "44";
              let color = PALETTE.muted;
              if (quiz2 === opt && !submitted) { bg = PALETTE.lavender + "22"; border = PALETTE.lavender; color = PALETTE.lavender; }
              if (submitted && correct) { bg = PALETTE.teal + "22"; border = PALETTE.teal; color = PALETTE.teal; }
              if (submitted && !correct && quiz2 === opt) { bg = PALETTE.coral + "22"; border = PALETTE.coral; color = PALETTE.coral; }
              return (
                <button
                  key={opt}
                  disabled={submitted}
                  onClick={() => setQuiz2(opt)}
                  style={{ padding: "6px 14px", borderRadius: 8, border: `2px solid ${border}`, background: bg, color, fontFamily: "monospace", fontSize: 12, cursor: submitted ? "default" : "pointer" }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {!submitted ? (
          <button
            disabled={!quiz1 || !quiz2}
            onClick={handleSubmit}
            style={{
              alignSelf: "flex-start",
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: quiz1 && quiz2 ? PALETTE.lavender : PALETTE.muted + "33",
              color: quiz1 && quiz2 ? "#fff" : PALETTE.muted,
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: 12,
              cursor: quiz1 && quiz2 ? "pointer" : "not-allowed",
            }}
          >
            CHECK ANSWERS
          </button>
        ) : done ? (
          <div
            className="pop-in"
            style={{
              background: PALETTE.teal + "22",
              border: `2px solid ${PALETTE.teal}`,
              borderRadius: 10,
              padding: "12px 18px",
              color: PALETTE.teal,
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            ✓ Complete! +50 XP claimed!
          </div>
        ) : (
          <div style={{ color: PALETTE.coral, fontFamily: "monospace", fontSize: 12 }}>
            Not quite — review the concepts above and try again.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root component
// ─────────────────────────────────────────────────────────────────────────────
export default function SectionSwitch({ onComplete }: SectionSwitchProps) {
  const [subStep, setSubStep] = useState(0);

  const NAV_ITEMS = [
    { label: "1. Vending Machine 🥤", step: 0 },
    { label: "2. Falling Dominoes 🁢", step: 1 },
    { label: "3. Default Challenge 🎮", step: 2 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "sans-serif" }}>
      <style>{KEYFRAMES}</style>

      {/* Sub-step nav */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          background: "rgba(24,29,46,0.6)",
          padding: 8,
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        {NAV_ITEMS.map(({ label, step }) => (
          <button
            key={step}
            onClick={() => setSubStep(step)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              background: subStep === step ? PALETTE.teal : "transparent",
              color: subStep === step ? "#000" : PALETTE.muted,
              fontFamily: "monospace",
              fontWeight: subStep === step ? "bold" : "normal",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {subStep === 0 && <VendingMachine onNext={() => setSubStep(1)} />}
      {subStep === 1 && <FallingDominoes onNext={() => setSubStep(2)} />}
      {subStep === 2 && <DefaultChallenge onComplete={onComplete} />}
    </div>
  );
}
