"use client";

import React, { useState, useEffect } from "react";

// ─── Palette ────────────────────────────────────────────────────────────────
const TEAL = "#00D9C0";
const AMBER = "#FFB800";
const CORAL = "#FF5F6E";
const LAVENDER = "#A78BFA";
const TEXT = "#E9EDF8";
const MUTED = "#7B85A8";
const CARD_BG = "rgba(24,29,46,0.9)";
const CODE_BG = "#0D1117";

const BEAD_COLORS = [TEAL, AMBER, LAVENDER, TEAL, AMBER, LAVENDER, TEAL, AMBER];

// ─── Helper Components ───────────────────────────────────────────────────────
function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(0,217,192,0.08)",
        border: `1.5px solid ${TEAL}`,
        borderRadius: 10,
        padding: "10px 16px",
        marginTop: 14,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>🔒</span>
      <span style={{ color: TEXT, fontSize: 14, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}

function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,95,110,0.08)",
        border: `1.5px solid ${CORAL}`,
        borderRadius: 10,
        padding: "10px 16px",
        marginTop: 10,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
      <span style={{ color: TEXT, fontSize: 14, lineHeight: 1.6 }}>{children}</span>
    </div>
  );
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre
      style={{
        background: CODE_BG,
        color: TEAL,
        borderRadius: 10,
        padding: "14px 18px",
        fontSize: 13,
        fontFamily: "'Courier New', monospace",
        overflowX: "auto",
        marginTop: 14,
        lineHeight: 1.7,
        border: "1px solid rgba(0,217,192,0.15)",
      }}
    >
      {code}
    </pre>
  );
}

// ─── Sub-step 0: Bead Necklace ────────────────────────────────────────────────
function BeadNecklace() {
  const [word, setWord] = useState("hello");
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedBead, setSelectedBead] = useState<number | null>(null);
  const [removeClasp, setRemoveClasp] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  const letters = word.slice(0, 8).split("");

  useEffect(() => {
    setVisibleCount(0);
    setSelectedBead(null);
    const timers: ReturnType<typeof setTimeout>[] = [];
    letters.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * 140 + 100));
    });
    return () => timers.forEach(clearTimeout);
  }, [word]);

  const totalBeads = letters.length + (removeClasp ? 0 : 1);
  const junkBeads = removeClasp ? 4 : 0;
  const allBeads = totalBeads + junkBeads;
  const spacing = Math.min(44, 360 / Math.max(allBeads, 1));
  const startX = 20 + (360 - spacing * (allBeads - 1)) / 2;

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <input
          value={word}
          maxLength={8}
          onChange={(e) => setWord(e.target.value.replace(/[^a-zA-Z]/g, ""))}
          placeholder="Type a word (max 8)"
          style={{
            background: CODE_BG,
            border: `1.5px solid ${TEAL}`,
            borderRadius: 8,
            color: TEXT,
            padding: "7px 14px",
            fontSize: 15,
            fontFamily: "'Courier New', monospace",
            outline: "none",
            width: 220,
          }}
        />
      </div>

      <svg viewBox="0 0 400 140" style={{ width: "100%", overflow: "visible" }}>
        {/* String line */}
        <line x1="10" y1="70" x2="390" y2="70" stroke={MUTED} strokeWidth="2.5" strokeOpacity="0.5" />

        {/* Letter beads */}
        {letters.map((ch, i) => {
          const cx = startX + i * spacing;
          const visible = i < visibleCount;
          const isSelected = selectedBead === i;
          return (
            <g
              key={`letter-${i}`}
              style={{
                transform: visible ? "scale(1)" : "scale(0)",
                transformOrigin: `${cx}px 70px`,
                transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
                cursor: "pointer",
              }}
              onClick={() => setSelectedBead(isSelected ? null : i)}
            >
              <circle
                cx={cx}
                cy={70}
                r={18}
                fill={BEAD_COLORS[i % BEAD_COLORS.length]}
                opacity={0.92}
                stroke={isSelected ? TEXT : "none"}
                strokeWidth={isSelected ? 2.5 : 0}
                filter={isSelected ? "url(#glow)" : undefined}
              />
              <text
                x={cx}
                y={70}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="'Courier New', monospace"
                fontSize={15}
                fontWeight="bold"
                fill={CODE_BG}
              >
                {ch}
              </text>
            </g>
          );
        })}

        {/* Clasp / null terminator bead */}
        {!removeClasp && (
          <g
            style={{
              transform: visibleCount >= letters.length ? "scale(1)" : "scale(0)",
              transformOrigin: `${startX + letters.length * spacing}px 70px`,
              transition: "transform 0.22s cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            <circle
              cx={startX + letters.length * spacing}
              cy={70}
              r={18}
              fill="#3A3F58"
              stroke={MUTED}
              strokeWidth={1.5}
            />
            <text
              x={startX + letters.length * spacing}
              y={70}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'Courier New', monospace"
              fontSize={12}
              fill={TEXT}
            >
              \0
            </text>
          </g>
        )}

        {/* Junk beads when clasp removed */}
        {removeClasp &&
          [0, 1, 2, 3].map((j) => {
            const cx = startX + (letters.length + j) * spacing;
            return (
              <g key={`junk-${j}`}>
                {j === 0 && (
                  <g style={{ animation: "blinkArrow 0.8s ease-in-out infinite" }}>
                    <line x1={cx - 8} y1={50} x2={cx + 8} y2={50} stroke={CORAL} strokeWidth={2} />
                    <polygon points={`${cx},62 ${cx - 6},50 ${cx + 6},50`} fill={CORAL} />
                  </g>
                )}
                <circle cx={cx} cy={70} r={18} fill={CORAL} opacity={0.7} />
                <text
                  x={cx}
                  y={70}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="'Courier New', monospace"
                  fontSize={15}
                  fontWeight="bold"
                  fill={CODE_BG}
                >
                  ?
                </text>
              </g>
            );
          })}

        {/* Index labels */}
        {letters.map((_, i) => (
          <text
            key={`idx-${i}`}
            x={startX + i * spacing}
            y={100}
            textAnchor="middle"
            fontFamily="'Courier New', monospace"
            fontSize={11}
            fill={MUTED}
          >
            {i}
          </text>
        ))}
        {!removeClasp && (
          <text
            x={startX + letters.length * spacing}
            y={100}
            textAnchor="middle"
            fontFamily="'Courier New', monospace"
            fontSize={11}
            fill={MUTED}
          >
            {letters.length}
          </text>
        )}

        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Selected bead tooltip */}
      {selectedBead !== null && selectedBead < letters.length && (
        <div
          style={{
            textAlign: "center",
            color: AMBER,
            fontFamily: "'Courier New', monospace",
            fontSize: 15,
            marginTop: 4,
          }}
        >
          {word}[{selectedBead}] = &apos;{letters[selectedBead]}&apos;
        </div>
      )}

      {/* Remove Clasp toggle */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button
          onClick={() => setRemoveClasp((v) => !v)}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
          style={{
            background: removeClasp ? CORAL : "transparent",
            border: `1.5px solid ${CORAL}`,
            borderRadius: 8,
            color: removeClasp ? CODE_BG : CORAL,
            padding: "6px 18px",
            fontSize: 13,
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.18s",
            transform: hoverBtn ? "scale(1.04)" : "scale(1)",
          }}
        >
          {removeClasp ? "Restore \\0" : "Remove Clasp (\\0)"}
        </button>
        {removeClasp && (
          <p style={{ color: CORAL, fontSize: 13, marginTop: 8, fontStyle: "italic" }}>
            Without \0, C keeps reading past your word!
          </p>
        )}
      </div>

      <CodeSnippet
        code={`char name[6] = "hello";
// [h][e][l][l][o][\\0]
//  0   1   2   3   4   5
printf("%s\\n", name); // reads until \\0`}
      />
      <ConceptLock>
        Every C string ends with <code style={{ color: TEAL }}>\0</code>. Always declare your array{" "}
        <strong>1 bigger</strong> than your word.
      </ConceptLock>
      <Gotcha>
        <code style={{ color: CORAL }}>char name[5] = &quot;hello&quot;</code> — no room for{" "}
        <code>\0</code>! You need <code style={{ color: TEAL }}>char name[6]</code>.
      </Gotcha>
    </div>
  );
}

// ─── Sub-step 1: Workshop Tools ───────────────────────────────────────────────
type Tool = "COUNT" | "COPY" | "JOIN" | "COMPARE" | null;

function WorkshopTools() {
  const [wordA, setWordA] = useState("hello");
  const [wordB, setWordB] = useState("world");
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [result, setResult] = useState<string>("");
  const [cFunc, setCFunc] = useState<string>("");
  const [scaleEqual, setScaleEqual] = useState<boolean | null>(null);
  const [hoverTool, setHoverTool] = useState<Tool>(null);

  function runTool(tool: Tool) {
    setActiveTool(tool);
    setScaleEqual(null);
    switch (tool) {
      case "COUNT":
        setResult(`strlen("${wordA}") = ${wordA.length}`);
        setCFunc(`strlen(a); // ${wordA.length} characters`);
        break;
      case "COPY":
        setResult(`b <- "${wordA}"`);
        setCFunc(`strcpy(b, a); // b is now "${wordA}"`);
        break;
      case "JOIN":
        setResult(`"${wordA}" + "${wordB}" = "${wordA}${wordB}"`);
        setCFunc(`strcat(a, b); // result: "${wordA}${wordB}"`);
        break;
      case "COMPARE": {
        const eq = wordA === wordB;
        setScaleEqual(eq);
        setResult(
          eq
            ? `strcmp("${wordA}", "${wordB}") == 0 -> EQUAL`
            : `strcmp("${wordA}", "${wordB}") != 0 -> DIFFERENT`
        );
        setCFunc(`strcmp(a, b) == 0; // ${eq ? "0 means equal" : "non-zero means different"}`);
        break;
      }
    }
  }

  const tools: { id: Tool; label: string; icon: string }[] = [
    { id: "COUNT", label: "COUNT", icon: "📏" },
    { id: "COPY", label: "COPY", icon: "🔖" },
    { id: "JOIN", label: "JOIN", icon: "🔗" },
    { id: "COMPARE", label: "COMPARE", icon: "⚖️" },
  ];

  return (
    <div>
      {/* Word inputs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { label: "Word A", val: wordA, set: setWordA },
          { label: "Word B", val: wordB, set: setWordB },
        ].map(({ label, val, set }) => (
          <div key={label} style={{ flex: 1, minWidth: 140 }}>
            <label style={{ color: MUTED, fontSize: 12, display: "block", marginBottom: 4 }}>
              {label}
            </label>
            <input
              value={val}
              onChange={(e) => set(e.target.value.slice(0, 12))}
              style={{
                background: CODE_BG,
                border: `1.5px solid ${TEAL}`,
                borderRadius: 8,
                color: TEXT,
                padding: "7px 12px",
                fontSize: 14,
                fontFamily: "'Courier New', monospace",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>

      {/* Workbench SVG */}
      <svg viewBox="0 0 400 80" style={{ width: "100%" }}>
        <rect x="10" y="55" width="380" height="20" rx="4" fill="#1E2340" />
        <rect x="10" y="50" width="380" height="8" rx="3" fill="#252A45" />
      </svg>

      {/* Tool buttons */}
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: -20,
          marginBottom: 16,
        }}
      >
        {tools.map(({ id, label, icon }) => {
          const isActive = activeTool === id;
          const isHover = hoverTool === id;
          return (
            <button
              key={id}
              onClick={() => runTool(id)}
              onMouseEnter={() => setHoverTool(id)}
              onMouseLeave={() => setHoverTool(null)}
              style={{
                background: isActive ? TEAL : CODE_BG,
                border: `2px solid ${isActive ? TEAL : MUTED}`,
                borderRadius: 10,
                color: isActive ? CODE_BG : TEXT,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                transition: "all 0.18s",
                transform: isHover ? "translateY(-3px)" : "translateY(0)",
                minWidth: 70,
              }}
            >
              <span style={{ fontSize: 22 }}>{icon}</span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Scale visual for COMPARE */}
      {activeTool === "COMPARE" && scaleEqual !== null && (
        <svg viewBox="0 0 200 80" style={{ width: 200, display: "block", margin: "0 auto" }}>
          {/* Pole */}
          <line x1="100" y1="10" x2="100" y2="60" stroke={MUTED} strokeWidth="2" />
          {/* Beam */}
          <line
            x1="40"
            y1={scaleEqual ? 40 : 35}
            x2="160"
            y2={scaleEqual ? 40 : 45}
            stroke={scaleEqual ? TEAL : CORAL}
            strokeWidth="3"
            style={{ transition: "all 0.4s" }}
          />
          {/* Left pan */}
          <ellipse
            cx="40"
            cy={scaleEqual ? 50 : 45}
            rx="22"
            ry="6"
            fill={scaleEqual ? TEAL : CORAL}
            opacity={0.8}
          />
          {/* Right pan */}
          <ellipse
            cx="160"
            cy={scaleEqual ? 50 : 55}
            rx="22"
            ry="6"
            fill={scaleEqual ? TEAL : CORAL}
            opacity={0.8}
          />
          <text
            x="40"
            y={scaleEqual ? 50 : 45}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9"
            fill={CODE_BG}
            fontFamily="'Courier New', monospace"
          >
            {wordA.slice(0, 4)}
          </text>
          <text
            x="160"
            y={scaleEqual ? 50 : 55}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9"
            fill={CODE_BG}
            fontFamily="'Courier New', monospace"
          >
            {wordB.slice(0, 4)}
          </text>
        </svg>
      )}

      {/* Result display */}
      {result && (
        <div
          style={{
            background: CODE_BG,
            borderRadius: 10,
            padding: "12px 18px",
            marginTop: 12,
            fontFamily: "'Courier New', monospace",
            fontSize: 14,
            color: AMBER,
            border: `1px solid ${AMBER}33`,
          }}
        >
          {result}
        </div>
      )}

      {cFunc && <CodeSnippet code={cFunc} />}

      <CodeSnippet
        code={`strlen(a);          // count beads
strcpy(b, a);       // make exact copy
strcat(a, b);       // clip together
strcmp(a, b) == 0;  // 0 means equal`}
      />
      <ConceptLock>
        Never use <code style={{ color: CORAL }}>=</code> to copy strings, never use{" "}
        <code style={{ color: CORAL }}>==</code> to compare them. Use{" "}
        <code style={{ color: TEAL }}>strcpy</code> and{" "}
        <code style={{ color: TEAL }}>strcmp</code>.
      </ConceptLock>
      <Gotcha>
        <code style={{ color: CORAL }}>strcmp</code> returns <strong>0 when equal</strong> (not 1).
        Remember: &quot;Equal means zero.&quot;
      </Gotcha>
    </div>
  );
}

// ─── Sub-step 2: Bug Cards Capstone ──────────────────────────────────────────
interface BugCardData {
  title: string;
  bugCode: string;
  bugLine: number;
  explanation: string;
  fix: string;
}

const BUG_CARDS: BugCardData[] = [
  {
    title: "Bug 1 — Buffer Too Small",
    bugCode: `char name[5] = "hello";
// Array size: 5
// Need space for: h e l l o \\0`,
    bugLine: 0,
    explanation:
      '"hello" is 5 characters but you also need 1 slot for \\0 — the null terminator. This causes a buffer overflow!',
    fix: 'char name[6] = "hello"; // size 6 = 5 letters + 1 for \\0',
  },
  {
    title: 'Bug 2 — Wrong String Comparison',
    bugCode: `if (name == "Ali") {
    printf("Hello, Ali!\\n");
}
// == compares addresses, not content!`,
    bugLine: 0,
    explanation:
      "In C, == on strings compares memory addresses, not the actual characters. It will almost never be true even if the strings look the same.",
    fix: 'if (strcmp(name, "Ali") == 0) { // compares contents',
  },
  {
    title: "Bug 3 — Array Assignment",
    bugCode: `char copy[20];
copy = name;
// Arrays are not assignable in C!`,
    bugLine: 1,
    explanation:
      "You cannot assign arrays with = in C. Arrays decay to pointers and = would only copy the pointer address, not the characters.",
    fix: "strcpy(copy, name); // copies characters one by one",
  },
];

function BugCard({
  data,
  onFound,
  found,
}: {
  data: BugCardData;
  onFound: () => void;
  found: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const [hover, setHover] = useState(false);

  function handleFind() {
    setRevealed(true);
    if (!found) onFound();
  }

  const lines = data.bugCode.split("\n");

  return (
    <div
      style={{
        background: CARD_BG,
        border: `1.5px solid ${found ? TEAL : "rgba(123,133,168,0.25)"}`,
        borderRadius: 14,
        padding: 18,
        flex: "1 1 260px",
        minWidth: 260,
        transition: "border-color 0.3s",
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: "bold",
          color: found ? TEAL : MUTED,
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {found ? "✅" : "🐛"} {data.title}
      </div>

      {/* Code block with buggy line highlighted after reveal */}
      <pre
        style={{
          background: CODE_BG,
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 12,
          fontFamily: "'Courier New', monospace",
          overflowX: "auto",
          margin: 0,
          lineHeight: 1.8,
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              background:
                revealed && i === data.bugLine ? "rgba(255,95,110,0.18)" : "transparent",
              borderRadius: 4,
              padding: "0 4px",
            }}
          >
            <span
              style={{
                color: revealed && i === data.bugLine ? CORAL : TEAL,
                textDecoration:
                  revealed && i === data.bugLine ? "underline" : "none",
                textDecorationColor: CORAL,
                textDecorationStyle: "wavy",
              }}
            >
              {line}
            </span>
          </div>
        ))}
      </pre>

      {/* Find button */}
      {!revealed && (
        <button
          onClick={handleFind}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            marginTop: 12,
            width: "100%",
            background: hover ? CORAL : "transparent",
            border: `1.5px solid ${CORAL}`,
            borderRadius: 8,
            color: hover ? CODE_BG : CORAL,
            padding: "8px 0",
            fontSize: 13,
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.18s",
          }}
        >
          🔍 Find the Bug
        </button>
      )}

      {/* Speech bubble + fix */}
      {revealed && (
        <div>
          <div
            style={{
              background: "rgba(255,95,110,0.1)",
              border: `1px solid ${CORAL}`,
              borderRadius: 10,
              padding: "10px 14px",
              marginTop: 12,
              fontSize: 13,
              color: TEXT,
              lineHeight: 1.6,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -8,
                left: 16,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: `8px solid ${CORAL}`,
              }}
            />
            {data.explanation}
          </div>
          <pre
            style={{
              background: "rgba(0,217,192,0.06)",
              border: `1px solid ${TEAL}44`,
              borderRadius: 8,
              padding: "8px 12px",
              marginTop: 10,
              fontSize: 12,
              fontFamily: "'Courier New', monospace",
              color: TEAL,
            }}
          >
            {data.fix}
          </pre>
        </div>
      )}
    </div>
  );
}

function BugCapstone({ onComplete }: { onComplete: (xp: number) => void }) {
  const [found, setFound] = useState([false, false, false]);
  const [hoverComplete, setHoverComplete] = useState(false);

  const foundCount = found.filter(Boolean).length;
  const allFound = foundCount === 3;

  function markFound(i: number) {
    setFound((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: MUTED, fontSize: 13 }}>Bugs Found</span>
          <span
            style={{
              color: foundCount === 3 ? TEAL : AMBER,
              fontWeight: "bold",
              fontSize: 13,
            }}
          >
            {foundCount} / 3
          </span>
        </div>
        <div
          style={{
            background: "rgba(123,133,168,0.15)",
            borderRadius: 8,
            height: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(foundCount / 3) * 100}%`,
              background: foundCount === 3 ? TEAL : AMBER,
              height: "100%",
              borderRadius: 8,
              transition: "width 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Bug cards */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {BUG_CARDS.map((card, i) => (
          <BugCard
            key={i}
            data={card}
            found={found[i]}
            onFound={() => markFound(i)}
          />
        ))}
      </div>

      {/* Complete button */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          disabled={!allFound}
          onClick={() => allFound && onComplete(55)}
          onMouseEnter={() => setHoverComplete(true)}
          onMouseLeave={() => setHoverComplete(false)}
          style={{
            background: allFound
              ? hoverComplete
                ? TEAL
                : "rgba(0,217,192,0.15)"
              : "rgba(123,133,168,0.1)",
            border: `2px solid ${allFound ? TEAL : MUTED}`,
            borderRadius: 12,
            color: allFound ? (hoverComplete ? CODE_BG : TEAL) : MUTED,
            padding: "12px 36px",
            fontSize: 16,
            fontWeight: "bold",
            cursor: allFound ? "pointer" : "not-allowed",
            transition: "all 0.22s",
            transform: allFound && hoverComplete ? "scale(1.04)" : "scale(1)",
          }}
        >
          {allFound
            ? "🎉 Complete Section (+55 XP)"
            : `Find all bugs to unlock (${foundCount}/3)`}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SectionStrings({ onComplete }: { onComplete: (xp: number) => void }) {
  const [step, setStep] = useState(0);
  const [hoverNext, setHoverNext] = useState(false);
  const [hoverBack, setHoverBack] = useState(false);

  const STEP_TITLES = [
    "🧵 Bead Necklace: char Arrays",
    "🔧 Workshop Tools: String Functions",
    "🐛 Spot the Bugs Capstone",
  ];

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 4px" }}>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes blinkArrow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Section header */}
      <div
        style={{
          background: CARD_BG,
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 18,
          border: "1px solid rgba(0,217,192,0.15)",
        }}
      >
        <div
          style={{
            color: TEAL,
            fontSize: 12,
            fontWeight: "bold",
            letterSpacing: 1.5,
            marginBottom: 6,
          }}
        >
          CHAPTER — STRINGS IN C
        </div>
        <div style={{ color: TEXT, fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
          {STEP_TITLES[step]}
        </div>
        {/* Step indicator pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {STEP_TITLES.map((_, i) => (
            <div
              key={i}
              style={{
                height: 6,
                flex: 1,
                borderRadius: 4,
                background: i <= step ? TEAL : "rgba(123,133,168,0.2)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        key={step}
        style={{
          background: CARD_BG,
          borderRadius: 16,
          padding: "22px 24px",
          border: "1px solid rgba(123,133,168,0.12)",
          animation: "fadeSlideIn 0.3s ease",
        }}
      >
        {step === 0 && <BeadNecklace />}
        {step === 1 && <WorkshopTools />}
        {step === 2 && <BugCapstone onComplete={onComplete} />}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, gap: 12 }}>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          onMouseEnter={() => setHoverBack(true)}
          onMouseLeave={() => setHoverBack(false)}
          style={{
            background:
              step === 0
                ? "rgba(123,133,168,0.08)"
                : hoverBack
                ? LAVENDER
                : "rgba(167,139,250,0.12)",
            border: `1.5px solid ${step === 0 ? "rgba(123,133,168,0.2)" : LAVENDER}`,
            borderRadius: 10,
            color: step === 0 ? MUTED : LAVENDER,
            padding: "10px 28px",
            fontSize: 14,
            fontWeight: "bold",
            cursor: step === 0 ? "not-allowed" : "pointer",
            transition: "all 0.18s",
            transform: hoverBack && step > 0 ? "translateX(-2px)" : "translateX(0)",
          }}
        >
          ← Back
        </button>

        {step < 2 && (
          <button
            onClick={() => setStep((s) => Math.min(2, s + 1))}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{
              background: hoverNext ? TEAL : "rgba(0,217,192,0.12)",
              border: `1.5px solid ${TEAL}`,
              borderRadius: 10,
              color: hoverNext ? CODE_BG : TEAL,
              padding: "10px 28px",
              fontSize: 14,
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.18s",
              transform: hoverNext ? "translateX(2px)" : "translateX(0)",
            }}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
