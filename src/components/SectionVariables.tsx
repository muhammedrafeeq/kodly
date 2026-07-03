"use client";

import React, { useState } from "react";

interface SectionVariablesProps {
  onComplete: (xpAward: number) => void;
}

/* ─── Helper: ConceptLock ─────────────────────────────────────────────────── */
function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,rgba(167,139,250,.12),rgba(0,217,192,.08))",
        border: "1px solid rgba(167,139,250,.35)",
        borderRadius: 12,
        padding: "14px 16px",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: "Courier New, monospace",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#A78BFA",
          marginBottom: 6,
        }}
      >
        🔒 Concept Lock
      </div>
      <div style={{ fontSize: 13, color: "#E9EDF8", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

/* ─── Helper: Gotcha ──────────────────────────────────────────────────────── */
function Gotcha({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,95,110,.10)",
        border: "1px solid rgba(255,95,110,.35)",
        borderRadius: 10,
        padding: "12px 16px",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: "Courier New, monospace",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#FF5F6E",
          marginBottom: 5,
        }}
      >
        ⚠️ Gotcha
      </div>
      <div style={{ fontSize: 13, color: "#E9EDF8", lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

/* ─── Helper: CodeSnip ────────────────────────────────────────────────────── */
function CodeSnip({
  lines,
  highlight,
}: {
  lines: { code: string; comment: string }[];
  highlight: number;
}) {
  return (
    <div
      style={{
        background: "#0D1117",
        borderRadius: 10,
        padding: "14px 16px",
        fontFamily: "Courier New, monospace",
        fontSize: 12,
        textAlign: "left",
        border: "1px solid rgba(255,184,0,.15)",
      }}
    >
      {lines.map((ln, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            padding: "3px 6px",
            borderRadius: 4,
            background:
              i === highlight
                ? "rgba(255,184,0,.12)"
                : "transparent",
            transition: "background 0.3s",
            marginBottom: 2,
          }}
        >
          <span
            style={{
              color: i === highlight ? "#FFB800" : "#00D9C0",
              minWidth: 160,
              whiteSpace: "nowrap",
            }}
          >
            {ln.code}
          </span>
          <span style={{ color: "#7B85A8" }}>{ln.comment}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Sub-step 0: The Magic Box ───────────────────────────────────────────── */
type BoxState = 0 | 1 | 2;

function StepMagicBox({ onNext }: { onNext: () => void }) {
  const [boxState, setBoxState] = useState<BoxState>(0);
  const [floatKey, setFloatKey] = useState(0);

  const advance = (next: BoxState) => {
    setBoxState(next);
    setFloatKey((k) => k + 1);
  };

  const codeLines = [
    { code: "int age;", comment: "// box exists, mystery inside" },
    { code: "age = 16;", comment: "// value lands in box" },
    { code: "age = 17;", comment: "// old value replaced" },
  ];

  /* label tag position */
  const tagX = 160;
  const tagY = 57;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* SVG scene */}
      <svg
        width="100%"
        viewBox="0 0 380 160"
        style={{ display: "block", maxHeight: 160 }}
      >
        {/* decorative dots */}
        <circle cx="30" cy="30" r="3" fill="#A78BFA" opacity="0.3" />
        <circle cx="350" cy="130" r="4" fill="#FFB800" opacity="0.25" />
        <circle cx="360" cy="40" r="2" fill="#00D9C0" opacity="0.3" />
        <circle cx="20" cy="130" r="2.5" fill="#FF5F6E" opacity="0.25" />

        {/* Box body */}
        <rect
          x="140"
          y="80"
          width="100"
          height="70"
          rx="6"
          fill="#0D1117"
          stroke="#FFB800"
          strokeWidth="2"
          className={boxState === 0 ? "slide-in" : ""}
        />
        {/* Lid */}
        <rect
          x="135"
          y="65"
          width="110"
          height="22"
          rx="4"
          fill="#1a1400"
          stroke="#FFB800"
          strokeWidth="2"
        />
        {/* Hinge circles */}
        <circle cx="185" cy="76" r="4" fill="#FFB800" opacity="0.7" />
        <circle cx="195" cy="76" r="4" fill="#FFB800" opacity="0.7" />

        {/* Label tag string */}
        <line x1="190" y1="65" x2="190" y2="60" stroke="#FFB800" strokeWidth="1" />
        {/* Label tag rect */}
        <rect
          x={tagX}
          y={tagY - 10}
          width="60"
          height="16"
          rx="3"
          fill="#1a1400"
          stroke="#FFB800"
          strokeWidth="1"
        />
        <text
          x={tagX + 30}
          y={tagY + 3}
          textAnchor="middle"
          fill="#FFB800"
          fontFamily="Courier New"
          fontSize="10"
          fontWeight="bold"
        >
          age
        </text>

        {/* Question mark — state 0 */}
        {boxState === 0 && (
          <text
            x="190"
            y="125"
            textAnchor="middle"
            fill="#4A5070"
            fontFamily="Courier New"
            fontSize="22"
          >
            ?
          </text>
        )}

        {/* Value 16 — state 1 */}
        {boxState === 1 && (
          <text
            key={`v16-${floatKey}`}
            x="190"
            y="125"
            textAnchor="middle"
            fill="#00D9C0"
            fontFamily="Courier New"
            fontSize="26"
            fontWeight="bold"
            className="pop-in"
          >
            16
          </text>
        )}

        {/* Value 17 — state 2 */}
        {boxState === 2 && (
          <text
            key={`v17-${floatKey}`}
            x="190"
            y="125"
            textAnchor="middle"
            fill="#A78BFA"
            fontFamily="Courier New"
            fontSize="26"
            fontWeight="bold"
            className="pop-in"
          >
            17
          </text>
        )}

        {/* Float-up particle when value enters */}
        {boxState >= 1 && (
          <text
            key={`float-${floatKey}`}
            x="230"
            y="95"
            textAnchor="middle"
            fill="#00D9C0"
            fontFamily="Courier New"
            fontSize="11"
            className="float-up"
            style={{ pointerEvents: "none" }}
          >
            {boxState === 1 ? "+16" : "+17"}
          </text>
        )}
      </svg>

      {/* Step buttons */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        {(
          [
            { label: "int age;", state: 0 as BoxState },
            { label: "age = 16", state: 1 as BoxState },
            { label: "age = 17", state: 2 as BoxState },
          ] as { label: string; state: BoxState }[]
        ).map(({ label, state }) => (
          <button
            key={state}
            onClick={() => advance(state)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: `2px solid ${boxState === state ? "#00D9C0" : "rgba(255,255,255,0.12)"}`,
              background: boxState === state ? "rgba(0,217,192,.15)" : "rgba(24,29,46,0.9)",
              color: boxState === state ? "#00D9C0" : "#7B85A8",
              fontFamily: "Courier New, monospace",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Code panel */}
      <CodeSnip lines={codeLines} highlight={boxState} />

      <ConceptLock>
        A variable is a <strong>named memory box</strong>.{" "}
        <code style={{ color: "#00D9C0" }}>int</code> = whole-number type.{" "}
        <em>Declare</em> = create the box. <em>Initialize</em> = put a value in.
        Reassigning replaces the old value — only one value fits at a time.
      </ConceptLock>

      <Gotcha>
        An uninitialized variable holds <strong>random garbage</strong> from
        memory — never assume it&apos;s 0. Always initialize when you declare:{" "}
        <code style={{ color: "#FFB800" }}>int age = 16;</code>
      </Gotcha>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onNext}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            background: "#00D9C0",
            color: "#0D1117",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* ─── Sub-step 1: The Naming Game ─────────────────────────────────────────── */
type NameVerdict = "valid" | "rule-break" | "bad-style";

interface NameCard {
  name: string;
  correct: NameVerdict;
  ruleBreakMsg: string;
}

const NAME_CARDS: NameCard[] = [
  {
    name: "1stPlace",
    correct: "rule-break",
    ruleBreakMsg: "Can't start with a number — the compiler thinks it's a numeric value.",
  },
  {
    name: "studentAge",
    correct: "valid",
    ruleBreakMsg: "",
  },
  {
    name: "return",
    correct: "rule-break",
    ruleBreakMsg: "'return' is a reserved keyword — the compiler already uses it.",
  },
  {
    name: "my score",
    correct: "rule-break",
    ruleBreakMsg: "Spaces aren't allowed — the compiler sees two separate words.",
  },
  {
    name: "x",
    correct: "bad-style",
    ruleBreakMsg: "Works, but single letters don't say what the box holds. Use a descriptive name.",
  },
];

const VERDICT_LABELS: Record<NameVerdict, string> = {
  valid: "✓ VALID",
  "rule-break": "✗ RULE BREAK",
  "bad-style": "~ BAD STYLE",
};

type CardStatus = "idle" | "correct" | "wrong";

interface CardState {
  status: CardStatus;
  shaking: boolean;
  wrongMsg: string;
}

function StepNamingGame({ onNext }: { onNext: () => void }) {
  const [cards, setCards] = useState<CardState[]>(
    NAME_CARDS.map(() => ({ status: "idle", shaking: false, wrongMsg: "" }))
  );

  const correctCount = cards.filter((c) => c.status === "correct").length;
  const allDone = correctCount === NAME_CARDS.length;

  const pick = (cardIdx: number, verdict: NameVerdict) => {
    const card = NAME_CARDS[cardIdx];
    const cur = cards[cardIdx];
    if (cur.status === "correct") return;

    if (verdict === card.correct) {
      setCards((prev) =>
        prev.map((c, i) =>
          i === cardIdx ? { ...c, status: "correct", wrongMsg: "" } : c
        )
      );
    } else {
      // shake then remove
      setCards((prev) =>
        prev.map((c, i) =>
          i === cardIdx
            ? { ...c, shaking: true, wrongMsg: card.ruleBreakMsg }
            : c
        )
      );
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === cardIdx ? { ...c, shaking: false } : c
          )
        );
      }, 320);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {NAME_CARDS.map((nc, ci) => {
          const cs = cards[ci];
          const borderColor =
            cs.status === "correct"
              ? "#00D9C0"
              : cs.status === "wrong"
              ? "#FF5F6E"
              : "rgba(255,255,255,0.12)";

          return (
            <div
              key={nc.name}
              className={cs.shaking ? "shake" : ""}
              style={{
                background: "rgba(24,29,46,0.9)",
                border: `2px solid ${borderColor}`,
                borderRadius: 10,
                padding: "14px 14px 12px",
                position: "relative",
                transition: "border-color 0.25s",
              }}
            >
              {/* Done badge */}
              {cs.status === "correct" && (
                <span
                  className="pop-in"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 10,
                    color: "#00D9C0",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
              )}

              <div
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#E9EDF8",
                  marginBottom: 10,
                }}
              >
                {nc.name}
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(["valid", "rule-break", "bad-style"] as NameVerdict[]).map(
                  (v) => (
                    <button
                      key={v}
                      onClick={() => pick(ci, v)}
                      disabled={cs.status === "correct"}
                      style={{
                        padding: "4px 9px",
                        borderRadius: 6,
                        border: "1px solid rgba(255,255,255,0.15)",
                        background:
                          v === "valid"
                            ? "rgba(0,217,192,.10)"
                            : v === "rule-break"
                            ? "rgba(255,95,110,.10)"
                            : "rgba(167,139,250,.10)",
                        color:
                          v === "valid"
                            ? "#00D9C0"
                            : v === "rule-break"
                            ? "#FF5F6E"
                            : "#A78BFA",
                        fontSize: 10,
                        fontWeight: 700,
                        fontFamily: "Courier New, monospace",
                        cursor: cs.status === "correct" ? "default" : "pointer",
                        opacity: cs.status === "correct" ? 0.4 : 1,
                      }}
                    >
                      {VERDICT_LABELS[v]}
                    </button>
                  )
                )}
              </div>

              {cs.wrongMsg && cs.status !== "correct" && (
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    color: "#FF5F6E",
                    lineHeight: 1.4,
                  }}
                >
                  {cs.wrongMsg}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 13, color: "#7B85A8", textAlign: "center" }}>
        {correctCount} / {NAME_CARDS.length} correct
      </div>

      {allDone && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onNext}
            className="pop-in"
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: "#00D9C0",
              color: "#0D1117",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-step 2: Type Selector ───────────────────────────────────────────── */
interface TypeDef {
  id: string;
  label: string;
  stroke: string;
  exampleValue: string;
  quizValues: string[];
}

const TYPES: TypeDef[] = [
  { id: "int", label: "int", stroke: "#E9EDF8", exampleValue: "42", quizValues: ["100"] },
  { id: "float", label: "float", stroke: "#FFB800", exampleValue: "3.14", quizValues: ["3.99"] },
  { id: "char", label: "char", stroke: "#A78BFA", exampleValue: "'A'", quizValues: ["'Z'"] },
  { id: "char[]", label: "char[]", stroke: "#FF5F6E", exampleValue: '"hi"', quizValues: [] },
];

const QUIZ_ITEMS: { value: string; correctType: string }[] = [
  { value: "100", correctType: "int" },
  { value: "3.99", correctType: "float" },
  { value: "'Z'", correctType: "char" },
];

interface FloatUp {
  id: number;
  text: string;
  x: number;
}

function StepTypeSelector({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [floats, setFloats] = useState<FloatUp[]>([]);
  const [floatCounter, setFloatCounter] = useState(0);

  // quiz state
  const [quizAnswers, setQuizAnswers] = useState<(string | null)[]>([null, null, null]);
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const SVG_X: Record<string, number> = {
    int: 55,
    float: 145,
    char: 230,
    "char[]": 315,
  };

  const handleTypeClick = (tid: string, x: number) => {
    setSelected(tid);
    const t = TYPES.find((t) => t.id === tid)!;
    const nf: FloatUp = { id: floatCounter, text: t.exampleValue, x };
    setFloatCounter((c) => c + 1);
    setFloats((prev) => [...prev, nf]);
    setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== nf.id));
    }, 1050);
  };

  const pickAnswer = (qi: number, tid: string) => {
    if (submitted) return;
    setQuizAnswers((prev) => prev.map((a, i) => (i === qi ? tid : a)));
  };

  const checkAnswers = () => {
    setSubmitted(true);
    const correct = quizAnswers.filter(
      (a, i) => a === QUIZ_ITEMS[i].correctType
    ).length;
    if (correct === 3) {
      setDone(true);
    }
  };

  const retry = () => {
    setQuizAnswers([null, null, null]);
    setSubmitted(false);
  };

  const correctCount = submitted
    ? quizAnswers.filter((a, i) => a === QUIZ_ITEMS[i].correctType).length
    : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* SVG type shapes */}
      <div style={{ position: "relative" }}>
        <svg
          width="100%"
          viewBox="0 0 380 140"
          style={{ display: "block", maxHeight: 140 }}
        >
          {/* int — brick rect */}
          <rect
            x="20"
            y="50"
            width="70"
            height="55"
            fill="#0D1117"
            stroke={selected === "int" ? "#00D9C0" : "#E9EDF8"}
            strokeWidth={selected === "int" ? 3 : 1.5}
            rx="2"
            style={{ cursor: "pointer", transition: "stroke 0.2s, stroke-width 0.2s" }}
            onClick={() => handleTypeClick("int", SVG_X["int"])}
          />
          <text x="55" y="82" textAnchor="middle" fill="#E9EDF8" fontFamily="Courier New" fontSize="11">
            int
          </text>
          <text x="55" y="128" textAnchor="middle" fill="#7B85A8" fontFamily="sans-serif" fontSize="10">
            whole numbers
          </text>

          {/* float — circle with pointed top (diamond-ish) */}
          <circle
            cx="145"
            cy="77"
            r="28"
            fill="#0D1117"
            stroke={selected === "float" ? "#00D9C0" : "#FFB800"}
            strokeWidth={selected === "float" ? 3 : 1.5}
            style={{ cursor: "pointer", transition: "stroke 0.2s, stroke-width 0.2s" }}
            onClick={() => handleTypeClick("float", SVG_X["float"])}
          />
          <circle cx="145" cy="49" r="7" fill="#0D1117" stroke={selected === "float" ? "#00D9C0" : "#FFB800"} strokeWidth={selected === "float" ? 3 : 1.5}
            style={{ cursor: "pointer" }} onClick={() => handleTypeClick("float", SVG_X["float"])} />
          <text x="145" y="82" textAnchor="middle" fill="#FFB800" fontFamily="Courier New" fontSize="11">
            float
          </text>
          <text x="145" y="128" textAnchor="middle" fill="#7B85A8" fontFamily="sans-serif" fontSize="10">
            decimals
          </text>

          {/* char — round bead */}
          <circle
            cx="230"
            cy="77"
            r="28"
            fill="#0D1117"
            stroke={selected === "char" ? "#00D9C0" : "#A78BFA"}
            strokeWidth={selected === "char" ? 3 : 1.5}
            style={{ cursor: "pointer", transition: "stroke 0.2s, stroke-width 0.2s" }}
            onClick={() => handleTypeClick("char", SVG_X["char"])}
          />
          <text x="230" y="82" textAnchor="middle" fill="#A78BFA" fontFamily="Courier New" fontSize="11">
            char
          </text>
          <text x="230" y="128" textAnchor="middle" fill="#7B85A8" fontFamily="sans-serif" fontSize="10">
            one letter
          </text>

          {/* char[] — 4 beads on a line */}
          <line x1="275" y1="77" x2="360" y2="77" stroke={selected === "char[]" ? "#00D9C0" : "#FF5F6E"} strokeWidth="1.5" />
          {[0, 1, 2, 3].map((bi) => (
            <circle
              key={bi}
              cx={282 + bi * 26}
              cy={77}
              r={10}
              fill="#0D1117"
              stroke={selected === "char[]" ? "#00D9C0" : "#FF5F6E"}
              strokeWidth={selected === "char[]" ? 3 : 1.5}
              style={{ cursor: "pointer", transition: "stroke 0.2s, stroke-width 0.2s" }}
              onClick={() => handleTypeClick("char[]", SVG_X["char[]"])}
            />
          ))}
          <text x="317" y="128" textAnchor="middle" fill="#7B85A8" fontFamily="sans-serif" fontSize="10">
            text (string)
          </text>
          <text x="317" y="82" textAnchor="middle" fill="#FF5F6E" fontFamily="Courier New" fontSize="9">
            char[]
          </text>
        </svg>

        {/* Float-up overlays */}
        {floats.map((f) => (
          <div
            key={f.id}
            className="float-up"
            style={{
              position: "absolute",
              top: 30,
              left: `${(f.x / 380) * 100}%`,
              transform: "translateX(-50%)",
              fontFamily: "Courier New, monospace",
              fontSize: 15,
              fontWeight: 700,
              color: "#00D9C0",
              pointerEvents: "none",
            }}
          >
            {f.text}
          </div>
        ))}
      </div>

      {/* Code panel */}
      <div
        style={{
          background: "#0D1117",
          borderRadius: 10,
          padding: "14px 16px",
          fontFamily: "Courier New, monospace",
          fontSize: 12,
          textAlign: "left",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ color: "#7B85A8", marginBottom: 6, fontSize: 10 }}>// C data types</div>
        <div><span style={{ color: "#E9EDF8" }}>int</span>    <span style={{ color: "#00D9C0" }}>score</span> = <span style={{ color: "#FFB800" }}>42</span>;</div>
        <div><span style={{ color: "#FFB800" }}>float</span>  <span style={{ color: "#00D9C0" }}>price</span> = <span style={{ color: "#FFB800" }}>3.14</span>;</div>
        <div><span style={{ color: "#A78BFA" }}>char</span>   <span style={{ color: "#00D9C0" }}>grade</span> = <span style={{ color: "#FFB800" }}>&apos;A&apos;</span>;</div>
        <div><span style={{ color: "#FF5F6E" }}>char</span>   <span style={{ color: "#00D9C0" }}>name</span>[] = <span style={{ color: "#FFB800" }}>&quot;hi&quot;</span>;</div>
      </div>

      {/* Quiz */}
      <div
        style={{
          background: "rgba(24,29,46,0.9)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontFamily: "Courier New, monospace",
            color: "#7B85A8",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 14,
          }}
        >
          Try It! — pick the right type for each value
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {QUIZ_ITEMS.map((qi, idx) => {
            const ans = quizAnswers[idx];
            const isCorrect = ans === qi.correctType;

            return (
              <div key={qi.value} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#E9EDF8",
                    minWidth: 54,
                  }}
                >
                  {qi.value}
                </span>
                <span style={{ color: "#7B85A8", fontSize: 13 }}>→</span>
                {TYPES.filter((t) => t.id !== "char[]").concat(TYPES.filter((t) => t.id === "char[]")).map((t) => {
                  const picked = ans === t.id;
                  const correct = submitted && t.id === qi.correctType;
                  const wrong = submitted && picked && !isCorrect;

                  return (
                    <button
                      key={t.id}
                      onClick={() => pickAnswer(idx, t.id)}
                      disabled={submitted}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 6,
                        border: `2px solid ${
                          correct ? "#00D9C0" : wrong ? "#FF5F6E" : picked ? t.stroke : "rgba(255,255,255,0.12)"
                        }`,
                        background: picked
                          ? `${t.stroke}22`
                          : "rgba(13,17,23,0.7)",
                        color: correct ? "#00D9C0" : wrong ? "#FF5F6E" : t.stroke,
                        fontFamily: "Courier New, monospace",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: submitted ? "default" : "pointer",
                        transition: "all 0.18s",
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
                {submitted && (
                  <span
                    className={isCorrect ? "pop-in" : "shake"}
                    style={{ fontSize: 16 }}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {!submitted ? (
            <button
              onClick={checkAnswers}
              disabled={quizAnswers.some((a) => a === null)}
              style={{
                padding: "9px 22px",
                borderRadius: 8,
                border: "none",
                background: quizAnswers.some((a) => a === null) ? "#1a2030" : "#FFB800",
                color: quizAnswers.some((a) => a === null) ? "#7B85A8" : "#0D1117",
                fontWeight: 700,
                fontSize: 13,
                cursor: quizAnswers.some((a) => a === null) ? "not-allowed" : "pointer",
              }}
            >
              Check Answers
            </button>
          ) : (
            <>
              <span style={{ fontSize: 13, color: correctCount === 3 ? "#00D9C0" : "#FF5F6E", fontWeight: 700 }}>
                {correctCount} / 3 correct
              </span>
              {correctCount < 3 && (
                <button
                  onClick={retry}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,95,110,.4)",
                    background: "transparent",
                    color: "#FF5F6E",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  Try Again
                </button>
              )}
            </>
          )}

          {done && (
            <button
              onClick={onComplete}
              className="pop-in"
              style={{
                padding: "9px 22px",
                borderRadius: 8,
                border: "none",
                background: "#00D9C0",
                color: "#0D1117",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Complete &amp; Earn 50 XP 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab bar ─────────────────────────────────────────────────────────────── */
const TAB_LABELS = ["1. Magic Box", "2. Naming Game", "3. Types"];

/* ─── Main export ─────────────────────────────────────────────────────────── */
export default function SectionVariables({ onComplete }: SectionVariablesProps) {
  const [subStep, setSubStep] = useState<0 | 1 | 2>(0);
  const [unlockedStep, setUnlockedStep] = useState<number>(0);

  const goTo = (s: 0 | 1 | 2) => {
    if (s <= unlockedStep) setSubStep(s);
  };

  const advanceTo = (s: 0 | 1 | 2) => {
    setSubStep(s);
    if (s > unlockedStep) setUnlockedStep(s);
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        color: "#E9EDF8",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Inline keyframes */}
      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pop { 0%{transform:scale(0.5)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
        @keyframes floatUp { 0%{opacity:0;transform:translateY(0)} 60%{opacity:1;transform:translateY(-24px)} 100%{opacity:0;transform:translateY(-40px)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
        .pop-in { animation: pop 0.35s ease forwards; }
        .slide-in { animation: slideIn 0.3s ease forwards; }
        .float-up { animation: floatUp 1s ease forwards; }
        .shake { animation: shake 0.3s ease; }
      `}</style>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 6,
          background: "rgba(24,29,46,0.9)",
          borderRadius: 10,
          padding: 6,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {TAB_LABELS.map((label, i) => {
          const active = subStep === i;
          const locked = i > unlockedStep;
          return (
            <button
              key={i}
              onClick={() => goTo(i as 0 | 1 | 2)}
              disabled={locked}
              style={{
                flex: 1,
                padding: "8px 4px",
                borderRadius: 7,
                border: "none",
                background: active ? "#00D9C0" : "transparent",
                color: active ? "#0D1117" : locked ? "#3A4060" : "#7B85A8",
                fontWeight: active ? 700 : 500,
                fontSize: 12,
                fontFamily: "Courier New, monospace",
                cursor: locked ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sub-step panels */}
      {subStep === 0 && (
        <div className="slide-in">
          <StepMagicBox onNext={() => advanceTo(1)} />
        </div>
      )}
      {subStep === 1 && (
        <div className="slide-in">
          <StepNamingGame onNext={() => advanceTo(2)} />
        </div>
      )}
      {subStep === 2 && (
        <div className="slide-in">
          <StepTypeSelector onComplete={() => onComplete(50)} />
        </div>
      )}
    </div>
  );
}
