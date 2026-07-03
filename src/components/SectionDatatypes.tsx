"use client";

import React, { useState } from "react";

interface SectionDatatypesProps {
  onComplete: (xp: number) => void;
}

type TypeKey = "int" | "float" | "char" | "double";

interface TypeInfo {
  label: string;
  desc: string;
  size: string;
  example: string;
  floatValue: string;
  color: string;
}

const TYPE_INFO: Record<TypeKey, TypeInfo> = {
  int: {
    label: "int",
    desc: "Whole numbers only. Size: 4 bytes.",
    size: "4 bytes",
    example: "42, -100, 0",
    floatValue: "42",
    color: "#00D9C0",
  },
  float: {
    label: "float",
    desc: "Decimal numbers. Size: 4 bytes.",
    size: "4 bytes",
    example: "3.14, -0.5",
    floatValue: "3.14",
    color: "#A78BFA",
  },
  char: {
    label: "char",
    desc: "One character. Size: 1 byte.",
    size: "1 byte",
    example: "'A', '5', '!'",
    floatValue: "'A'",
    color: "#FFB800",
  },
  double: {
    label: "double",
    desc: "More precise decimals. Size: 8 bytes.",
    size: "8 bytes",
    example: "3.14159265",
    floatValue: "3.14159265",
    color: "#FF5F6E",
  },
};

interface QuizQuestion {
  scenario: string;
  correct: TypeKey;
  wrongExplanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    scenario: "Store a student's age (0–120)",
    correct: "int",
    wrongExplanation: "Age is a whole number — int is perfect here.",
  },
  {
    scenario: "Store the price of coffee: $3.50",
    correct: "float",
    wrongExplanation: "Price has decimals — use float.",
  },
  {
    scenario: "Store a grade letter: A, B, or C",
    correct: "char",
    wrongExplanation: "A single letter fits perfectly in char.",
  },
  {
    scenario: "Store a very precise scientific value: 6.674×10⁻¹¹",
    correct: "double",
    wrongExplanation: "High precision decimals need double.",
  },
  {
    scenario: "Store a count of trees in a park: 2,847",
    correct: "int",
    wrongExplanation: "A whole count — int is correct.",
  },
];

// ── Sub-step 0: The Type Museum ─────────────────────────────────────────────

function TypeMuseum({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<TypeKey | null>(null);
  const [floatKeys, setFloatKeys] = useState<Record<TypeKey, number>>({
    int: 0,
    float: 0,
    char: 0,
    double: 0,
  });

  const handleClick = (key: TypeKey) => {
    setSelected(key);
    setFloatKeys((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const caseX: Record<TypeKey, number> = { int: 20, float: 110, char: 200, double: 280 };
  const caseW: Record<TypeKey, number> = { int: 60, float: 60, char: 50, double: 70 };

  return (
    <div style={{ fontFamily: "monospace" }}>
      <style>{`
        @keyframes floatUp {
          0%   { opacity:0; transform:translateY(0); }
          50%  { opacity:1; transform:translateY(-20px); }
          100% { opacity:0; transform:translateY(-36px); }
        }
        @keyframes popIn {
          0%   { transform:scale(0); }
          70%  { transform:scale(1.2); }
          100% { transform:scale(1); }
        }
        @keyframes overflow {
          0%   { height:0; }
          80%  { height:100%; }
          100% { height:120%; }
        }
        @keyframes chopDown {
          from { transform:translateY(-30px); }
          to   { transform:translateY(0); }
        }
        .float-up { animation: floatUp 1.2s ease forwards; }
        .pop-in   { animation: popIn 0.3s ease forwards; }
        .chop     { animation: chopDown 0.25s ease forwards; }
      `}</style>

      <h3 style={{ color: "#00D9C0", fontSize: 14, marginBottom: 8 }}>The Type Museum</h3>
      <p style={{ color: "#7B85A8", fontSize: 12, marginBottom: 12 }}>
        Click a display case to inspect a C datatype.
      </p>

      {/* SVG scene */}
      <div style={{ position: "relative", background: "#0D1117", borderRadius: 12, padding: 8 }}>
        <svg viewBox="0 0 380 160" style={{ width: "100%", display: "block" }}>
          {/* Museum floor */}
          <rect x="0" y="140" width="380" height="20" fill="#131929" />

          {(["int", "float", "char", "double"] as TypeKey[]).map((key) => {
            const x = caseX[key];
            const w = caseW[key];
            const isSelected = selected === key;
            const info = TYPE_INFO[key];
            const stroke = isSelected ? info.color : "#2a3050";

            return (
              <g
                key={key}
                onClick={() => handleClick(key)}
                style={{ cursor: "pointer" }}
              >
                {/* Case body */}
                <rect
                  x={x}
                  y={50}
                  width={w}
                  height={90}
                  rx={4}
                  fill="rgba(24,29,46,0.9)"
                  stroke={stroke}
                  strokeWidth={isSelected ? 2 : 1}
                />
                {/* Glass top */}
                <rect
                  x={x + 4}
                  y={46}
                  width={w - 8}
                  height={12}
                  rx={6}
                  fill={isSelected ? info.color + "33" : "#1e2438"}
                  stroke={stroke}
                  strokeWidth={1}
                />
                {/* Plaque */}
                <rect x={x + 8} y={122} width={w - 16} height={12} rx={2} fill="#1e2438" />
                <text
                  x={x + w / 2}
                  y={131}
                  textAnchor="middle"
                  fontSize={8}
                  fill={info.color}
                  fontFamily="monospace"
                >
                  {key}
                </text>

                {/* int: stacked coins */}
                {key === "int" && (
                  <>
                    <ellipse cx={x + 30} cy={110} rx={14} ry={5} fill="#FFB800" opacity={0.8} />
                    <ellipse cx={x + 30} cy={103} rx={14} ry={5} fill="#FFB800" opacity={0.7} />
                    <ellipse cx={x + 30} cy={96} rx={14} ry={5} fill="#FFB800" opacity={0.6} />
                  </>
                )}

                {/* float: water drop */}
                {key === "float" && (
                  <>
                    <circle cx={x + 30} cy={100} r={12} fill="#A78BFA" opacity={0.7} />
                    <polygon
                      points={`${x + 24},96 ${x + 36},96 ${x + 30},80`}
                      fill="#A78BFA"
                      opacity={0.7}
                    />
                  </>
                )}

                {/* char: scrabble tile */}
                {key === "char" && (
                  <>
                    <rect x={x + 10} y={80} width={30} height={34} rx={3} fill="#FFB800" opacity={0.8} />
                    <text
                      x={x + 25}
                      y={101}
                      textAnchor="middle"
                      fontSize={16}
                      fill="#0D1117"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      A
                    </text>
                    <text
                      x={x + 35}
                      y={110}
                      textAnchor="middle"
                      fontSize={6}
                      fill="#0D1117"
                      fontFamily="monospace"
                    >
                      1
                    </text>
                  </>
                )}

                {/* double: bigger water drop */}
                {key === "double" && (
                  <>
                    <circle cx={x + 35} cy={103} r={15} fill="#FF5F6E" opacity={0.7} />
                    <polygon
                      points={`${x + 27},98 ${x + 43},98 ${x + 35},80`}
                      fill="#FF5F6E"
                      opacity={0.7}
                    />
                  </>
                )}

                {/* Float-up value on click */}
                {isSelected && (
                  <text
                    key={floatKeys[key]}
                    x={x + w / 2}
                    y={55}
                    textAnchor="middle"
                    fontSize={10}
                    fill={info.color}
                    fontFamily="monospace"
                    className="float-up"
                  >
                    {info.floatValue}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {selected && (
          <div
            style={{
              marginTop: 8,
              padding: "10px 14px",
              background: "rgba(24,29,46,0.9)",
              border: `1px solid ${TYPE_INFO[selected].color}55`,
              borderRadius: 8,
              color: "#E9EDF8",
              fontSize: 12,
              animation: "popIn 0.3s ease forwards",
            }}
          >
            <span style={{ color: TYPE_INFO[selected].color, fontWeight: "bold" }}>
              {TYPE_INFO[selected].label}
            </span>{" "}
            — {TYPE_INFO[selected].desc}
            <br />
            <span style={{ color: "#7B85A8" }}>e.g.</span>{" "}
            <span style={{ color: "#FFB800" }}>{TYPE_INFO[selected].example}</span>
          </div>
        )}
      </div>

      {/* Code snippet */}
      <pre
        style={{
          background: "#0D1117",
          color: "#E9EDF8",
          fontSize: 11,
          padding: 12,
          borderRadius: 8,
          marginTop: 12,
          overflowX: "auto",
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: "#00D9C0" }}>int</span>{"   score = 95;       "}<span style={{ color: "#7B85A8" }}>// 🧱 whole number</span>{"\n"}
        <span style={{ color: "#A78BFA" }}>float</span>{" price = 4.99;     "}<span style={{ color: "#7B85A8" }}>// 💧 decimal</span>{"\n"}
        <span style={{ color: "#FFB800" }}>char</span>{"  grade = "}<span style={{ color: "#FFB800" }}>&apos;A&apos;</span>{";      "}<span style={{ color: "#7B85A8" }}>// ⚪ one character</span>{"\n"}
        <span style={{ color: "#FF5F6E" }}>double</span>{" pi    = 3.14159;  "}<span style={{ color: "#7B85A8" }}>// 🔵 precise decimal</span>
      </pre>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <button
          onClick={onNext}
          style={{
            background: "#00D9C0",
            color: "#0D1117",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontWeight: "bold",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          NEXT: TYPE MISMATCH LAB →
        </button>
      </div>
    </div>
  );
}

// ── Sub-step 1: Type Mismatch Lab ───────────────────────────────────────────

type ScenarioKey = "A" | "B" | "C";

interface Scenario {
  title: string;
  subtitle: string;
  explanation: string;
}

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  A: {
    title: "Truncation: float → int",
    subtitle: "3.7 crammed into int box",
    explanation: 'The decimal gets chopped off! `int x = 3.7;` gives x = 3',
  },
  B: {
    title: "Overflow: 200 → char",
    subtitle: "char max is 127",
    explanation: "char can only hold -128 to 127. 200 overflows to... -56! Undefined chaos.",
  },
  C: {
    title: "Char → int (works!)",
    subtitle: "'A' slides into int box",
    explanation: "It works! 'A' is just ASCII code 65. char fits inside int.",
  },
};

function ScenarioCard({
  scenarioKey,
  active,
  onClick,
}: {
  scenarioKey: ScenarioKey;
  active: boolean;
  onClick: () => void;
}) {
  const s = SCENARIOS[scenarioKey];

  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(24,29,46,0.9)",
        border: active ? "1px solid #00D9C0" : "1px solid #2a3050",
        borderRadius: 10,
        padding: 14,
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
    >
      <div style={{ color: "#E9EDF8", fontWeight: "bold", fontSize: 12, marginBottom: 4 }}>
        {scenarioKey}. {s.title}
      </div>
      <div style={{ color: "#7B85A8", fontSize: 11, marginBottom: 10 }}>{s.subtitle}</div>

      {/* Animated illustration */}
      {scenarioKey === "A" && <TruncationAnim active={active} />}
      {scenarioKey === "B" && <OverflowAnim active={active} />}
      {scenarioKey === "C" && <CharToIntAnim active={active} />}

      {active && (
        <div
          style={{
            marginTop: 10,
            background: "#0D1117",
            borderRadius: 6,
            padding: 8,
            color: "#00D9C0",
            fontSize: 11,
            fontFamily: "monospace",
          }}
        >
          {s.explanation}
        </div>
      )}
    </div>
  );
}

function TruncationAnim({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 60" style={{ width: "100%", display: "block" }}>
      {/* Float value box */}
      <rect x={4} y={15} width={60} height={30} rx={4} fill="#A78BFA33" stroke="#A78BFA" strokeWidth={1} />
      <text x={34} y={33} textAnchor="middle" fontSize={12} fill="#A78BFA" fontFamily="monospace">3.7</text>

      {/* Arrow */}
      <line x1={70} y1={30} x2={90} y2={30} stroke="#7B85A8" strokeWidth={1.5} />
      <polygon points="90,26 98,30 90,34" fill="#7B85A8" />

      {/* Int box */}
      <rect x={100} y={15} width={60} height={30} rx={4} fill="#00D9C033" stroke="#00D9C0" strokeWidth={1} />
      <text x={130} y={27} textAnchor="middle" fontSize={10} fill="#00D9C0" fontFamily="monospace">int</text>
      <text x={130} y={40} textAnchor="middle" fontSize={12} fill="#E9EDF8" fontFamily="monospace">
        {active ? "3" : "?"}
      </text>

      {/* Guillotine line */}
      {active && (
        <line
          x1={8}
          y1={34}
          x2={62}
          y2={34}
          stroke="#FF5F6E"
          strokeWidth={2}
          strokeDasharray="4 2"
          className="chop"
        />
      )}

      {/* Chopped .7 */}
      {active && (
        <text x={50} y={52} textAnchor="middle" fontSize={9} fill="#FF5F6E" fontFamily="monospace" opacity={0.6}>
          .7 ✂
        </text>
      )}
    </svg>
  );
}

function OverflowAnim({ active }: { active: boolean }) {
  const [phase, setPhase] = useState<"idle" | "fill" | "overflow">("idle");

  React.useEffect(() => {
    if (!active) { setPhase("idle"); return; }
    setPhase("fill");
    const t = setTimeout(() => setPhase("overflow"), 1200);
    return () => clearTimeout(t);
  }, [active]);

  const fillH = phase === "fill" ? 28 : phase === "overflow" ? 0 : 0;

  return (
    <svg viewBox="0 0 200 70" style={{ width: "100%", display: "block" }}>
      {/* 200 label */}
      <rect x={4} y={20} width={50} height={24} rx={4} fill="#FFB80033" stroke="#FFB800" strokeWidth={1} />
      <text x={29} y={35} textAnchor="middle" fontSize={11} fill="#FFB800" fontFamily="monospace">200</text>

      {/* Arrow */}
      <line x1={58} y1={32} x2={78} y2={32} stroke="#7B85A8" strokeWidth={1.5} />
      <polygon points="78,28 86,32 78,36" fill="#7B85A8" />

      {/* Char box */}
      <rect x={88} y={14} width={52} height={44} rx={4} fill="rgba(24,29,46,0.9)" stroke="#A78BFA" strokeWidth={1} />
      <text x={114} y={26} textAnchor="middle" fontSize={8} fill="#A78BFA" fontFamily="monospace">char</text>
      <text x={114} y={36} textAnchor="middle" fontSize={7} fill="#7B85A8" fontFamily="monospace">max:127</text>

      {/* Fill bar */}
      {fillH > 0 && (
        <rect
          x={90}
          y={54 - fillH}
          width={48}
          height={fillH}
          fill={phase === "overflow" ? "#FF5F6E" : "#A78BFA"}
          opacity={0.6}
          style={{ transition: "height 1s, fill 0.3s" }}
        />
      )}

      {/* Overflow result */}
      {phase === "overflow" && (
        <text x={114} y={44} textAnchor="middle" fontSize={10} fill="#FF5F6E" fontFamily="monospace">-56!</text>
      )}

      {/* Max label */}
      <text x={148} y={26} fontSize={8} fill="#7B85A8" fontFamily="monospace">127</text>
      <line x1={142} y1={28} x2={142} y2={56} stroke="#7B85A8" strokeWidth={0.5} strokeDasharray="2 2" />
    </svg>
  );
}

function CharToIntAnim({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 60" style={{ width: "100%", display: "block" }}>
      {/* Char tile */}
      <rect x={4} y={12} width={36} height={36} rx={4} fill="#FFB800" opacity={0.8} />
      <text x={22} y={32} textAnchor="middle" fontSize={14} fill="#0D1117" fontFamily="monospace" fontWeight="bold">A</text>
      <text x={34} y={44} textAnchor="middle" fontSize={6} fill="#0D1117" fontFamily="monospace">1</text>

      {/* Arrow */}
      <line x1={44} y1={30} x2={68} y2={30} stroke="#7B85A8" strokeWidth={1.5} />
      <polygon points="68,26 76,30 68,34" fill="#7B85A8" />

      {/* Int box — roomy */}
      <rect x={78} y={8} width={80} height={44} rx={4} fill="#00D9C022" stroke="#00D9C0" strokeWidth={1} />
      <text x={118} y={22} textAnchor="middle" fontSize={8} fill="#00D9C0" fontFamily="monospace">int (roomy!)</text>

      {/* 'A' tile inside int box */}
      {active && (
        <>
          <rect x={84} y={26} width={26} height={22} rx={3} fill="#FFB800" opacity={0.8} className="chop" />
          <text x={97} y={40} textAnchor="middle" fontSize={11} fill="#0D1117" fontFamily="monospace" fontWeight="bold" className="chop">A</text>
          <text x={140} y={40} textAnchor="middle" fontSize={12} fill="#00D9C0" fontFamily="monospace">= 65</text>
        </>
      )}
    </svg>
  );
}

function MismatchLab({ onNext }: { onNext: () => void }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey | null>(null);

  const toggle = (key: ScenarioKey) =>
    setActiveScenario((prev) => (prev === key ? null : key));

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h3 style={{ color: "#00D9C0", fontSize: 14, marginBottom: 6 }}>Type Mismatch Lab</h3>
      <p style={{ color: "#7B85A8", fontSize: 12, marginBottom: 12 }}>
        Click a scenario to trigger its animation.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(["A", "B", "C"] as ScenarioKey[]).map((k) => (
          <ScenarioCard
            key={k}
            scenarioKey={k}
            active={activeScenario === k}
            onClick={() => toggle(k)}
          />
        ))}
      </div>

      {/* Concept lock */}
      <div
        style={{
          marginTop: 14,
          padding: "10px 14px",
          background: "#00D9C011",
          border: "1px solid #00D9C055",
          borderRadius: 8,
          color: "#E9EDF8",
          fontSize: 11,
        }}
      >
        <strong style={{ color: "#00D9C0" }}>Concept Lock:</strong> Use the right container for your data.
        Wrong types cause silent data loss.
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <button
          onClick={onNext}
          style={{
            background: "#00D9C0",
            color: "#0D1117",
            border: "none",
            borderRadius: 8,
            padding: "8px 20px",
            fontWeight: "bold",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          NEXT: TYPE QUIZ →
        </button>
      </div>
    </div>
  );
}

// ── Sub-step 2: Type Quiz ────────────────────────────────────────────────────

const TYPE_OPTIONS: TypeKey[] = ["int", "float", "char", "double"];

function TypeQuiz({ onComplete }: { onComplete: (xp: number) => void }) {
  const [qIndex, setQIndex] = useState(0);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [wrongMsg, setWrongMsg] = useState("");
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[qIndex];

  const handleAnswer = (choice: TypeKey) => {
    if (flash) return;
    if (choice === q.correct) {
      setFlash("correct");
      setTimeout(() => {
        setFlash(null);
        if (qIndex + 1 >= QUIZ_QUESTIONS.length) {
          setDone(true);
        } else {
          setQIndex((i) => i + 1);
        }
      }, 900);
    } else {
      setWrongMsg(q.wrongExplanation);
      setFlash("wrong");
      setTimeout(() => {
        setFlash(null);
        setWrongMsg("");
      }, 1400);
    }
  };

  if (done) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: 24,
          background: "#00D9C011",
          border: "1px solid #00D9C0",
          borderRadius: 12,
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
        <div style={{ color: "#00D9C0", fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>
          All 5 correct!
        </div>
        <button
          onClick={() => onComplete(40)}
          style={{
            background: "#00D9C0",
            color: "#0D1117",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: "bold",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          Claim 40 XP 🎉
        </button>
      </div>
    );
  }

  const borderColor =
    flash === "correct" ? "#00D9C0" : flash === "wrong" ? "#FF5F6E" : "#2a3050";

  return (
    <div style={{ fontFamily: "monospace" }}>
      <h3 style={{ color: "#00D9C0", fontSize: 14, marginBottom: 6 }}>Type Quiz</h3>
      <div style={{ color: "#7B85A8", fontSize: 11, marginBottom: 12 }}>
        Question {qIndex + 1} of {QUIZ_QUESTIONS.length}
      </div>

      <div
        style={{
          background: "rgba(24,29,46,0.9)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: 12,
          padding: 18,
          transition: "border-color 0.2s",
        }}
      >
        <div style={{ color: "#E9EDF8", fontSize: 13, marginBottom: 18 }}>
          {q.scenario}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {TYPE_OPTIONS.map((opt) => {
            const isCorrect = flash === "correct" && opt === q.correct;
            const isWrong = flash === "wrong";
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                style={{
                  background: isCorrect
                    ? "#00D9C033"
                    : isWrong && opt === q.correct
                    ? "#00D9C011"
                    : "#0D1117",
                  border: `1px solid ${isCorrect ? "#00D9C0" : "#2a3050"}`,
                  borderRadius: 8,
                  padding: "10px 8px",
                  color: "#E9EDF8",
                  fontSize: 13,
                  fontFamily: "monospace",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                {isCorrect ? "✓ " : ""}{opt}
              </button>
            );
          })}
        </div>

        {flash === "wrong" && wrongMsg && (
          <div
            style={{
              marginTop: 12,
              padding: 8,
              background: "#FF5F6E22",
              border: "1px solid #FF5F6E55",
              borderRadius: 6,
              color: "#FF5F6E",
              fontSize: 11,
            }}
          >
            {wrongMsg}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function SectionDatatypes({ onComplete }: SectionDatatypesProps) {
  const [subStep, setSubStep] = useState(0);

  const steps = ["Type Museum", "Mismatch Lab", "Type Quiz"];

  return (
    <div style={{ fontFamily: "monospace", color: "#E9EDF8" }}>
      {/* Step tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 20,
          background: "#0D1117",
          borderRadius: 8,
          padding: 6,
        }}
      >
        {steps.map((label, i) => (
          <button
            key={i}
            onClick={() => { if (i <= subStep) setSubStep(i); }}
            style={{
              flex: 1,
              padding: "6px 4px",
              borderRadius: 6,
              border: "none",
              background: subStep === i ? "#00D9C0" : "transparent",
              color: subStep === i ? "#0D1117" : "#7B85A8",
              fontWeight: "bold",
              fontSize: 10,
              cursor: i <= subStep ? "pointer" : "default",
              fontFamily: "monospace",
              opacity: i > subStep ? 0.4 : 1,
            }}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      {subStep === 0 && <TypeMuseum onNext={() => setSubStep(1)} />}
      {subStep === 1 && <MismatchLab onNext={() => setSubStep(2)} />}
      {subStep === 2 && <TypeQuiz onComplete={onComplete} />}
    </div>
  );
}
