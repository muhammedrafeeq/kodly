"use client";

import React, { useState } from "react";

const KEYFRAMES = `
@keyframes popBead { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
@keyframes chaos { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-2px) rotate(-3deg)} 75%{transform:translateX(2px) rotate(3deg)} }
@keyframes slideCount { from{transform:translateX(-100%)} to{transform:translateX(0)} }
@keyframes linkUp { from{transform:scaleX(0)} to{transform:scaleX(1)} }
.str-pop-bead { animation: popBead 0.3s ease forwards; }
.str-chaotic { animation: chaos 0.15s infinite; }
.str-link-up { animation: linkUp 0.5s ease forwards; transform-origin: left; }
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

const BEAD_COLORS = ["#00D9C0", "#FFB800", "#A78BFA", "#FF5F6E"];

// ─── Sub-step 0: Bead Necklace ────────────────────────────────────────────────

function BeadNecklaceStep() {
  const [word, setWord] = useState("hello");
  const [selectedBead, setSelectedBead] = useState<number | null>(null);
  const [showGarbage, setShowGarbage] = useState(false);

  const letters = word.replace(/[^a-zA-Z]/g, "").substring(0, 8).split("");

  return (
    <div>
      <svg viewBox="0 0 380 120" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* String */}
        <line x1="20" y1="60" x2="360" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

        {/* Letter beads */}
        {letters.map((ch, i) => {
          const cx = 30 + i * 44;
          const color = BEAD_COLORS[i % BEAD_COLORS.length];
          const isSelected = selectedBead === i;
          return (
            <g key={i} onClick={() => setSelectedBead(i)} style={{ cursor: "pointer" }}>
              <circle cx={cx} cy="60" r="18"
                fill={isSelected ? color + "55" : color + "26"}
                stroke={color}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />
              <text x={cx} y="65" textAnchor="middle" fill={color} fontSize="13" fontFamily="'Courier New',monospace" fontWeight="700">{ch}</text>
              <text x={cx} y="90" textAnchor="middle" fill="#7B85A8" fontSize="8" fontFamily="'Courier New',monospace">[{i}]</text>
            </g>
          );
        })}

        {/* Null terminator clasp */}
        {!showGarbage && (
          <g>
            <circle cx={30 + letters.length * 44} cy="60" r="16" fill="rgba(123,133,168,0.1)" stroke="#7B85A8" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x={30 + letters.length * 44} y="64" textAnchor="middle" fill="#7B85A8" fontSize="9" fontFamily="'Courier New',monospace">\0</text>
          </g>
        )}

        {/* Garbage beads */}
        {showGarbage && [0, 1, 2].map(j => (
          <g key={j} className="str-chaotic" style={{ animationDelay: `${j * 0.05}s` }}>
            <circle cx={30 + letters.length * 44 + j * 38} cy="60" r="16"
              fill="rgba(255,95,110,0.1)" stroke="#FF5F6E" strokeWidth="1.5" />
            <text x={30 + letters.length * 44 + j * 38} y="64" textAnchor="middle" fill="#FF5F6E" fontSize="12" fontFamily="'Courier New',monospace">?</text>
          </g>
        ))}
      </svg>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center", flexWrap: "wrap" as const }}>
        <input
          type="text"
          value={word}
          maxLength={8}
          onChange={e => { setWord(e.target.value.replace(/[^a-zA-Z]/g, "")); setSelectedBead(null); }}
          style={{ background: "#0D1117", border: "1px solid #00D9C0", borderRadius: 6, color: "#00D9C0", padding: "6px 12px", fontSize: 14, fontFamily: "'Courier New',monospace", width: 140 }}
        />
        {selectedBead !== null && letters[selectedBead] && (
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: BEAD_COLORS[selectedBead % BEAD_COLORS.length] }}>
            word[{selectedBead}] = &apos;{letters[selectedBead]}&apos;
          </div>
        )}
      </div>

      <button
        onClick={() => setShowGarbage(g => !g)}
        style={{ background: showGarbage ? "rgba(0,217,192,0.15)" : "rgba(255,95,110,0.15)", border: `1px solid ${showGarbage ? "#00D9C0" : "#FF5F6E"}`, borderRadius: 8, padding: "8px 18px", color: showGarbage ? "#00D9C0" : "#FF5F6E", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 12 }}
      >
        {showGarbage ? "Restore \\0" : "Remove \\0"}
      </button>

      {showGarbage && (
        <div style={{ background: "rgba(255,95,110,0.1)", border: "1px solid rgba(255,95,110,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 12, color: "#FF5F6E", fontSize: 13, fontWeight: 600 }}>
          Without \0, C keeps reading garbage!
        </div>
      )}

      <CodeBlock label="C Example" code={`char name[6] = "hello";
// [h][e][l][l][o][\\0]
printf("%s\\n", name); // reads until \\0`} />
      <ConceptLock>Every C string ends with `\0`. Always declare array 1 bigger than your word.</ConceptLock>
      <Gotcha>`char name[5] = "hello"` — no room for `\0`! Needs size 6.</Gotcha>
    </div>
  );
}

// ─── Sub-step 1: Workshop Tools ───────────────────────────────────────────────

type Action = "COUNT" | "COPY" | "JOIN" | "COMPARE" | null;

function WorkshopStep() {
  const [wordA, setWordA] = useState("hello");
  const [wordB, setWordB] = useState("world");
  const [action, setAction] = useState<Action>(null);

  const tools: { key: Action; label: string; color: string }[] = [
    { key: "COUNT", label: "Ruler (COUNT)", color: "#FFB800" },
    { key: "COPY", label: "Stamp (COPY)", color: "#00D9C0" },
    { key: "JOIN", label: "Chain (JOIN)", color: "#A78BFA" },
    { key: "COMPARE", label: "Scale (COMPARE)", color: "#FF5F6E" },
  ];

  function renderToolSvg(key: Action, active: boolean) {
    const color = tools.find(t => t.key === key)?.color ?? "#7B85A8";
    const stroke = active ? color : "#7B85A8";
    const opacity = active ? 1 : 0.5;
    if (key === "COUNT") return (
      <g opacity={opacity}>
        <rect x="30" y="40" width="60" height="12" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
        {[0, 1, 2, 3].map(i => <line key={i} x1={44 + i * 14} y1="40" x2={44 + i * 14} y2="34" stroke={stroke} strokeWidth="1" />)}
      </g>
    );
    if (key === "COPY") return (
      <g opacity={opacity}>
        <rect x="110" y="34" width="20" height="20" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
        <line x1="120" y1="34" x2="120" y2="28" stroke={stroke} strokeWidth="1.5" />
      </g>
    );
    if (key === "JOIN") return (
      <g opacity={opacity}>
        <circle cx="196" cy="46" r="8" fill="none" stroke={stroke} strokeWidth="1.5" />
        <circle cx="208" cy="46" r="8" fill="none" stroke={stroke} strokeWidth="1.5" />
      </g>
    );
    if (key === "COMPARE") return (
      <g opacity={opacity}>
        <polygon points="280,28 268,52 292,52" fill="none" stroke={stroke} strokeWidth="1.5" />
        <rect x="266" y="52" width="10" height="4" rx="1" fill="none" stroke={stroke} strokeWidth="1" />
        <rect x="284" y="52" width="10" height="4" rx="1" fill="none" stroke={stroke} strokeWidth="1" />
      </g>
    );
    return null;
  }

  function renderResult() {
    if (!action) return null;
    if (action === "COUNT") {
      return (
        <div>
          <div style={{ marginBottom: 8, color: "#E9EDF8", fontSize: 13 }}>
            Length of &quot;<span style={{ color: "#FFB800" }}>{wordA}</span>&quot; = <span style={{ color: "#FFB800", fontWeight: 700 }}>{wordA.length}</span>
          </div>
          <div className="str-link-up" style={{ display: "flex", gap: 4, marginBottom: 12 }}>
            {wordA.split("").map((ch, i) => (
              <span key={i} style={{ background: "rgba(255,184,0,0.15)", border: "1px solid #FFB800", borderRadius: 4, padding: "2px 6px", fontFamily: "'Courier New',monospace", fontSize: 12, color: "#FFB800" }}>{ch}</span>
            ))}
            <span style={{ background: "rgba(255,184,0,0.05)", border: "1px dashed #FFB800", borderRadius: 4, padding: "2px 6px", fontFamily: "'Courier New',monospace", fontSize: 12, color: "#7B85A8" }}>\0</span>
          </div>
          <CodeBlock label="C" code={`strlen("${wordA}") = ${wordA.length}`} />
        </div>
      );
    }
    if (action === "COPY") {
      return (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {[wordA, wordA].map((w, idx) => (
              <div key={idx} className={idx === 1 ? "str-pop-bead" : undefined}
                style={{ display: "flex", gap: 3, padding: "6px 10px", background: "rgba(0,217,192,0.08)", border: "1px solid rgba(0,217,192,0.25)", borderRadius: 8 }}>
                {w.split("").map((ch, i) => (
                  <span key={i} style={{ fontFamily: "'Courier New',monospace", fontSize: 13, color: "#00D9C0" }}>{ch}</span>
                ))}
              </div>
            ))}
          </div>
          <CodeBlock label="C" code={`strcpy(dest, "${wordA}"); // copies every char + \\0`} />
        </div>
      );
    }
    if (action === "JOIN") {
      return (
        <div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: "#A78BFA", fontFamily: "'Courier New',monospace", fontSize: 14 }}>&quot;{wordA}&quot;</span>
            <div className="str-link-up" style={{ width: 24, height: 2, background: "#A78BFA" }} />
            <span style={{ color: "#A78BFA", fontFamily: "'Courier New',monospace", fontSize: 14 }}>&quot;{wordB}&quot;</span>
            <span style={{ color: "#7B85A8" }}>→</span>
            <span style={{ color: "#E9EDF8", fontFamily: "'Courier New',monospace", fontSize: 14, fontWeight: 700 }}>&quot;{wordA + wordB}&quot;</span>
          </div>
          <CodeBlock label="C" code={`strcat(dest, "${wordB}"); // appends after \\0`} />
        </div>
      );
    }
    if (action === "COMPARE") {
      const cmp = wordA === wordB ? 0 : wordA < wordB ? -1 : 1;
      return (
        <div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: "#FF5F6E", fontFamily: "'Courier New',monospace", fontSize: 14 }}>&quot;{wordA}&quot;</span>
            <span style={{ color: "#E9EDF8", fontSize: 18, fontWeight: 700 }}>{cmp === 0 ? "=" : cmp < 0 ? "<" : ">"}</span>
            <span style={{ color: "#FF5F6E", fontFamily: "'Courier New',monospace", fontSize: 14 }}>&quot;{wordB}&quot;</span>
            <span style={{ color: "#7B85A8" }}>→ strcmp returns</span>
            <span style={{ color: cmp === 0 ? "#00D9C0" : "#FF5F6E", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 14 }}>{cmp}</span>
          </div>
          <CodeBlock label="C" code={`strcmp("${wordA}", "${wordB}") = ${cmp}
// 0 = equal, negative = A before B, positive = B before A`} />
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <svg viewBox="0 0 380 120" width="100%" style={{ display: "block", marginBottom: 12 }}>
        {/* Pegboard */}
        <rect x="10" y="10" width="360" height="100" rx="6" fill="rgba(13,17,23,0.9)" stroke="#7B85A8" strokeWidth="1.5" />
        {/* Hook dots */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(c =>
          [0, 1, 2].map(r => (
            <circle key={`${c}-${r}`} cx={30 + c * 46} cy={25 + r * 30} r="2" fill="#7B85A8" opacity="0.4" />
          ))
        )}
        {/* Tool drawings */}
        {renderToolSvg("COUNT", action === "COUNT")}
        {renderToolSvg("COPY", action === "COPY")}
        {renderToolSvg("JOIN", action === "JOIN")}
        {renderToolSvg("COMPARE", action === "COMPARE")}
      </svg>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" as const }}>
        <label style={{ color: "#E9EDF8", fontSize: 13 }}>
          Word A:&nbsp;
          <input type="text" value={wordA} onChange={e => setWordA(e.target.value.substring(0, 12))}
            style={{ background: "#0D1117", border: "1px solid #FFB800", borderRadius: 6, color: "#FFB800", padding: "4px 10px", fontSize: 13, fontFamily: "'Courier New',monospace", width: 100 }} />
        </label>
        <label style={{ color: "#E9EDF8", fontSize: 13 }}>
          Word B:&nbsp;
          <input type="text" value={wordB} onChange={e => setWordB(e.target.value.substring(0, 12))}
            style={{ background: "#0D1117", border: "1px solid #A78BFA", borderRadius: 6, color: "#A78BFA", padding: "4px 10px", fontSize: 13, fontFamily: "'Courier New',monospace", width: 100 }} />
        </label>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as const }}>
        {tools.map(t => (
          <button key={t.key} onClick={() => setAction(t.key)}
            style={{ flex: 1, minWidth: 80, background: action === t.key ? t.color + "22" : "rgba(24,29,46,0.9)", border: `1px solid ${action === t.key ? t.color : "rgba(255,255,255,0.1)"}`, borderRadius: 8, padding: "8px 4px", color: action === t.key ? t.color : "#7B85A8", fontWeight: action === t.key ? 700 : 400, fontSize: 11, cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {renderResult()}

      <Gotcha>Never `==` to compare strings. Never `=` to copy. Always strlen/strcpy/strcmp.</Gotcha>
    </div>
  );
}

// ─── Sub-step 2: Spot the Bugs ────────────────────────────────────────────────

type BugState = "hidden" | "revealed" | "fixed";

interface BugCard {
  buggyCode: string;
  bugHighlight: string;
  explanation: string;
  fixedCode: string;
}

const BUG_CARDS: BugCard[] = [
  {
    buggyCode: 'char name[5] = "hello";',
    bugHighlight: "name[5]",
    explanation: 'needs [6] for \\0 — "hello" is 5 chars + 1 null terminator = 6 bytes needed.',
    fixedCode: 'char name[6] = "hello";',
  },
  {
    buggyCode: 'if (name == "Ali")',
    bugHighlight: 'name == "Ali"',
    explanation: '`==` compares pointers, not content! Use strcmp() to compare string characters.',
    fixedCode: 'if (strcmp(name, "Ali") == 0)',
  },
  {
    buggyCode: "char b[20]; b = name;",
    bugHighlight: "b = name",
    explanation: "Can't assign arrays with `=`. Use strcpy() to copy characters one by one.",
    fixedCode: "strcpy(b, name);",
  },
];

function SpotBugsStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [bugStates, setBugStates] = useState<BugState[]>(["hidden", "hidden", "hidden"]);

  const bugsFixed = bugStates.filter(s => s === "fixed").length;
  const allFixed = bugsFixed === 3;

  function reveal(i: number) {
    setBugStates(prev => { const n = [...prev]; n[i] = "revealed"; return n; });
  }
  function fix(i: number) {
    setBugStates(prev => { const n = [...prev]; n[i] = "fixed"; return n; });
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#7B85A8", fontSize: 12 }}>Bugs found: {bugsFixed}/3</span>
          <span style={{ color: "#00D9C0", fontSize: 12 }}>{bugsFixed === 3 ? "All fixed!" : ""}</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 6, height: 8, overflow: "hidden" }}>
          <div style={{ background: "#00D9C0", height: "100%", width: `${(bugsFixed / 3) * 100}%`, borderRadius: 6, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {BUG_CARDS.map((card, i) => {
        const state = bugStates[i];
        // Render buggy code with highlight
        const parts = card.buggyCode.split(card.bugHighlight);

        return (
          <div key={i} style={{ background: "rgba(24,29,46,0.9)", border: `1px solid ${state === "fixed" ? "rgba(0,217,192,0.3)" : state === "revealed" ? "rgba(255,184,0,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
            {/* Bug number */}
            <div style={{ color: "#7B85A8", fontSize: 10, fontFamily: "'Courier New',monospace", letterSpacing: ".15em", marginBottom: 8 }}>BUG {i + 1}</div>

            {/* Buggy code */}
            {state !== "fixed" && (
              <div style={{ background: "#0D1117", borderRadius: 8, padding: "10px 14px", marginBottom: 10, fontFamily: "'Courier New',monospace", fontSize: 13, lineHeight: 1.6 }}>
                {parts[0]}
                {state !== "hidden" && (
                  <span style={{ background: "rgba(255,95,110,0.25)", borderBottom: "2px solid #FF5F6E", color: "#FF5F6E", borderRadius: 2 }}>
                    {card.bugHighlight}
                  </span>
                )}
                {state === "hidden" && card.bugHighlight}
                {parts[1]}
              </div>
            )}

            {/* Fixed code */}
            {state === "fixed" && (
              <div style={{ background: "rgba(0,217,192,0.06)", border: "1px solid rgba(0,217,192,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 10, fontFamily: "'Courier New',monospace", fontSize: 13, color: "#00D9C0" }}>
                {card.fixedCode}
              </div>
            )}

            {/* Explanation */}
            {(state === "revealed" || state === "fixed") && (
              <div style={{ background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 12.5, color: "#E9EDF8", lineHeight: 1.55 }}>
                💡 {card.explanation}
              </div>
            )}

            {/* Action buttons */}
            {state === "hidden" && (
              <button onClick={() => reveal(i)}
                style={{ background: "rgba(255,95,110,0.15)", border: "1px solid rgba(255,95,110,0.3)", borderRadius: 8, padding: "8px 16px", color: "#FF5F6E", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                🔍 Find the Bug
              </button>
            )}
            {state === "revealed" && (
              <button onClick={() => fix(i)}
                style={{ background: "rgba(0,217,192,0.15)", border: "1px solid rgba(0,217,192,0.3)", borderRadius: 8, padding: "8px 16px", color: "#00D9C0", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                Show fix →
              </button>
            )}
            {state === "fixed" && (
              <div style={{ color: "#00D9C0", fontSize: 12, fontWeight: 700 }}>✓ Fixed</div>
            )}
          </div>
        );
      })}

      <button
        onClick={() => allFixed && onComplete(55)}
        disabled={!allFixed}
        style={{ width: "100%", background: allFixed ? "linear-gradient(135deg,#00D9C0,#A78BFA)" : "rgba(255,255,255,0.05)", border: allFixed ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 0", color: allFixed ? "#fff" : "#7B85A8", fontWeight: 700, fontSize: 15, cursor: allFixed ? "pointer" : "not-allowed", marginTop: 8 }}
      >
        Complete — Claim 55 XP
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface Props { onComplete: (xp: number) => void; }

const TABS = ["Necklace", "Workshop", "Bug Hunt"];

export default function SectionStrings({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", color: "#E9EDF8" }}>
      <style>{KEYFRAMES}</style>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" as const }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setSubStep(i)}
            style={{ flex: 1, minWidth: 80, background: subStep === i ? "rgba(0,217,192,0.18)" : "rgba(24,29,46,0.9)", border: `1px solid ${subStep === i ? "#00D9C0" : "rgba(255,255,255,0.1)"}`, borderRadius: 8, padding: "8px 0", color: subStep === i ? "#00D9C0" : "#7B85A8", fontWeight: subStep === i ? 700 : 400, fontSize: 13, cursor: "pointer" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(24,29,46,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 20 }}>
        {subStep === 0 && <BeadNecklaceStep />}
        {subStep === 1 && <WorkshopStep />}
        {subStep === 2 && <SpotBugsStep onComplete={onComplete} />}
      </div>

      {subStep < 2 && (
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
