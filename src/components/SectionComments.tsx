"use client";
import React, { useState } from "react";

interface Props {
  onComplete: (xp: number) => void;
}

// ── Sub-step 0 ── Sticky Notes: What Are Comments? ────────────────────────────
function Step0({ onNext }: { onNext: () => void }) {
  const [notesOn, setNotesOn] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);

  const notes = [
    { x: 40, y: 28, rot: -5, text: "// greet the user", codeLine: 1, color: "#FFB800" },
    { x: 155, y: 58, rot: 3, text: "/* loop 10 times */", codeLine: 3, color: "#A78BFA" },
    { x: 270, y: 18, rot: -3, text: "// print result", codeLine: 5, color: "#00D9C0" },
  ];

  const codeLines = [
    "printf(\"Hello!\");",
    "int i = 0;",
    "for(i=0; i<10; i++)",
    "  total += i;",
    "printf(\"%d\", total);",
    "return 0;",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes peelUp { 0%{transform:scale(1) rotate(var(--rot,0deg))} 100%{transform:scale(1.12) rotate(calc(var(--rot,0deg) + 3deg)) translateY(-4px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .note-hover { animation: peelUp 0.2s ease-out forwards; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        .sticky-note { cursor: pointer; transition: filter 0.15s; }
        .sticky-note:hover { filter: brightness(1.15); }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
        Comments are <strong style={{ color: "#FFB800" }}>sticky notes</strong> for humans. The compiler completely ignores them!
        Hover over each note to see what code it explains.
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => setNotesOn(v => !v)}
          style={{ padding: "8px 18px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
            background: notesOn ? "#FFB800" : "rgba(24,29,46,0.9)",
            color: notesOn ? "#0D1117" : "#E9EDF8" }}>
          {notesOn ? "📝 Sticky Notes ON" : "📝 Sticky Notes OFF"}
        </button>
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(255,184,0,0.2)" }}>
        <svg viewBox="0 0 400 180" style={{ width: "100%", display: "block" }}>
          {/* Code wall */}
          <rect x="10" y="10" width="380" height="160" rx="10" fill="rgba(13,17,23,0.95)" stroke="#1a2030" strokeWidth="1" />

          {/* Code lines */}
          {codeLines.map((line, i) => (
            <g key={i}>
              <rect x="20" y={18 + i * 24} width={60 + line.length * 5.5} height="16" rx="3"
                fill={hovered !== null && notes[hovered]?.codeLine === i ? "rgba(255,184,0,0.15)" : "rgba(30,35,50,0.6)"} />
              <text x="26" y={30 + i * 24} fill={hovered !== null && notes[hovered]?.codeLine === i ? "#FFB800" : "#7B85A8"} fontSize="9" fontFamily="monospace">{line}</text>
            </g>
          ))}

          {/* Sticky notes */}
          {notesOn && notes.map((note, i) => (
            <g key={i}
              className={`sticky-note ${hovered === i ? "note-hover" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ "--rot": `${note.rot}deg` } as React.CSSProperties}>
              {/* Note body */}
              <rect x={note.x} y={note.y} width="90" height="38" rx="4"
                fill={note.color} opacity="0.92"
                transform={`rotate(${note.rot} ${note.x + 45} ${note.y + 19})`} />
              {/* Dog ear */}
              <path d={`M${note.x + 78},${note.y} L${note.x + 90},${note.y + 12} L${note.x + 78},${note.y + 12} Z`}
                fill="rgba(0,0,0,0.2)"
                transform={`rotate(${note.rot} ${note.x + 45} ${note.y + 19})`} />
              <text x={note.x + 45} y={note.y + 16} textAnchor="middle" fill="#0D1117" fontSize="7.5" fontWeight="700"
                transform={`rotate(${note.rot} ${note.x + 45} ${note.y + 19})`}>{note.text.slice(0, 18)}</text>
              <text x={note.x + 45} y={note.y + 28} textAnchor="middle" fill="#0D1117" fontSize="7"
                transform={`rotate(${note.rot} ${note.x + 45} ${note.y + 19})`}>{note.text.slice(18)}</text>
            </g>
          ))}

          {!notesOn && (
            <text x="200" y="170" textAnchor="middle" fill="#FF5F6E" fontSize="9">Notes hidden — compiler sees only code!</text>
          )}
        </svg>
      </div>

      <div style={{ background: "#0D1117", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,184,0,0.2)", fontFamily: "monospace", fontSize: 13 }}>
        <div style={{ color: "#7B85A8", marginBottom: 6 }}><span style={{ color: "#00D9C0" }}>// </span>single-line comment — ignored to end of line</div>
        <div style={{ color: "#7B85A8" }}><span style={{ color: "#A78BFA" }}>{"/* */"}</span> multi-line comment — ignored between delimiters</div>
      </div>

      <div style={{ borderLeft: "3px solid #FFB800", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#FFB800" }}>Concept Lock:</strong> Comments are notes for humans — the compiler ignores them completely.{" "}
        <code style={{ color: "#00D9C0" }}>//</code> = one line, <code style={{ color: "#A78BFA" }}>{"/* */"}</code> = multi-line.
      </div>

      <button onClick={onNext}
        style={{ background: "#FFB800", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
        Next: Writing Good Comments →
      </button>
    </div>
  );
}

// ── Sub-step 1 ── The Recipe Book: Writing Good Comments ──────────────────────
function Step1({ onNext }: { onNext: () => void }) {
  const [showGood, setShowGood] = useState(false);
  const [flipping, setFlipping] = useState(false);

  function flip() {
    setFlipping(true);
    setTimeout(() => {
      setShowGood(v => !v);
      setFlipping(false);
    }, 300);
  }

  const badCode = [
    { code: "i++;", comment: "// add 1 to i", bad: true },
    { code: "x = x * 2;", comment: "// multiply x by 2", bad: true },
    { code: "arr[n] = 0;", comment: "// set array element", bad: true },
  ];

  const goodCode = [
    { code: "i++;", comment: "// advance to next student", bad: false },
    { code: "x = x * 2;", comment: "// double the speed", bad: false },
    { code: "arr[n] = 0;", comment: "// mark slot as empty", bad: false },
  ];

  const items = showGood ? goodCode : badCode;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes pageFlip { 0%{transform:scaleX(1)} 50%{transform:scaleX(0)} 100%{transform:scaleX(1)} }
        .flip { animation: pageFlip 0.6s ease-in-out; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
        A good comment explains <strong style={{ color: "#00D9C0" }}>WHY</strong> — not just <em>what</em> the code does.
        Toggle to see the difference!
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={flip}
          style={{ padding: "8px 20px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 13,
            background: showGood ? "#00D9C0" : "#FF5F6E",
            color: "#0D1117" }}>
          {showGood ? "✓ Good Comments" : "✗ Bad Comments"}
        </button>
      </div>

      <div style={{ background: "#0D1117", borderRadius: 16, padding: 8, border: `1px solid ${showGood ? "rgba(0,217,192,0.3)" : "rgba(255,95,110,0.3)"}`, transition: "border-color 0.3s" }}>
        <svg viewBox="0 0 400 180" style={{ width: "100%", display: "block" }}>
          {/* Recipe book */}
          <rect x="15" y="10" width="370" height="160" rx="12" fill="rgba(24,29,46,0.95)" stroke="#7B85A8" strokeWidth="1.5" />
          {/* Spine */}
          <line x1="200" y1="15" x2="200" y2="165" stroke="#7B85A8" strokeWidth="1" strokeDasharray="4 4" />

          {/* Left page header */}
          <text x="100" y="30" textAnchor="middle" fill={showGood ? "#7B85A8" : "#FF5F6E"} fontSize="10" fontWeight="700">
            {showGood ? "✓ Meaningful" : "✗ Obvious"}
          </text>
          {/* Right page header */}
          <text x="300" y="30" textAnchor="middle" fill="#7B85A8" fontSize="10">Code</text>

          {/* Code items */}
          <g className={flipping ? "flip" : ""}>
            {items.map((item, i) => (
              <g key={i}>
                {/* Code on right */}
                <rect x="210" y={42 + i * 40} width="170" height="28" rx="5" fill="rgba(13,17,23,0.8)" />
                <text x="220" y={60 + i * 40} fill="#E9EDF8" fontSize="10" fontFamily="monospace">{item.code}</text>

                {/* Comment sticky note on left */}
                <rect x="20" y={42 + i * 40} width="172" height="28" rx="5"
                  fill={item.bad ? "rgba(255,95,110,0.12)" : "rgba(0,217,192,0.12)"}
                  stroke={item.bad ? "#FF5F6E" : "#00D9C0"} strokeWidth="1" />
                <text x="28" y={60 + i * 40} fill={item.bad ? "#FF5F6E" : "#00D9C0"} fontSize="9" fontFamily="monospace">{item.comment}</text>
              </g>
            ))}
          </g>

          <text x="200" y="162" textAnchor="middle" fill="#7B85A8" fontSize="8">
            {showGood ? "Comments explain the PURPOSE, not the mechanics" : "These comments just repeat what the code already says"}
          </text>
        </svg>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "rgba(255,95,110,0.08)", border: "1px solid rgba(255,95,110,0.3)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ color: "#FF5F6E", fontWeight: 700, fontSize: 12, marginBottom: 4 }}>✗ Bad</div>
          <code style={{ color: "#7B85A8", fontSize: 12 }}>i++; // add 1 to i</code>
        </div>
        <div style={{ background: "rgba(0,217,192,0.08)", border: "1px solid rgba(0,217,192,0.3)", borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ color: "#00D9C0", fontWeight: 700, fontSize: 12, marginBottom: 4 }}>✓ Good</div>
          <code style={{ color: "#E9EDF8", fontSize: 12 }}>i++; // next student</code>
        </div>
      </div>

      <button onClick={onNext}
        style={{ background: "#00D9C0", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
        Next: Program Structure →
      </button>
    </div>
  );
}

// ── Sub-step 2 ── Structure: A Recipe For C Programs ─────────────────────────
function Step2({ onComplete }: { onComplete: (xp: number) => void }) {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const sections = [
    {
      label: "#include <stdio.h>", y: 15, height: 28, color: "#A78BFA",
      icon: "🧂", note: "Ingredients list! These are library files that give your program extra abilities (like printf).",
    },
    {
      label: "int main() {", y: 52, height: 24, color: "#FFB800",
      icon: "👨‍🍳", note: "The main cooking area! Every C program starts here. The { } are like the pot — everything goes inside.",
    },
    {
      label: "  /* variable declarations */", y: 82, height: 24, color: "#00D9C0",
      icon: "📝", note: "Prep area: declare the variables you will use. Like setting out your ingredients before cooking.",
    },
    {
      label: "  printf(\"Hello!\\n\");", y: 112, height: 24, color: "#FF5F6E",
      icon: "🍳", note: "Cooking steps! These instructions run top-to-bottom, one at a time.",
    },
    {
      label: "  return 0;", y: 142, height: 24, color: "#7B85A8",
      icon: "🍽️", note: "Serve and done! return 0 tells the OS the program finished successfully.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        @keyframes notePop { 0%{transform:scale(0.8) translateY(8px);opacity:0} 70%{transform:scale(1.04) translateY(-2px)} 100%{transform:scale(1) translateY(0);opacity:1} }
        .note-pop { animation: notePop 0.35s ease-out; }
        .section-btn { cursor: pointer; transition: opacity 0.15s; }
        .section-btn:hover { opacity: 0.85; }
      `}</style>

      <p style={{ color: "#E9EDF8", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
        Click each part of the C program to reveal a sticky-note explanation!
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ flex: 1, background: "#0D1117", borderRadius: 16, padding: 8, border: "1px solid rgba(167,139,250,0.2)" }}>
          <svg viewBox="0 0 260 180" style={{ width: "100%", display: "block" }}>
            <rect x="5" y="5" width="250" height="170" rx="10" fill="rgba(13,17,23,0.95)" stroke="#1a2030" strokeWidth="1" />

            {sections.map((sec, i) => (
              <g key={i} className="section-btn" onClick={() => setActiveSection(activeSection === i ? null : i)}>
                <rect x="10" y={sec.y} width="240" height={sec.height} rx="5"
                  fill={activeSection === i ? `${sec.color}22` : "transparent"}
                  stroke={activeSection === i ? sec.color : "transparent"} strokeWidth="1.5" />
                <text x="18" y={sec.y + sec.height - 8} fill={activeSection === i ? sec.color : "#7B85A8"} fontSize="9" fontFamily="monospace">{sec.label}</text>
              </g>
            ))}

            <text x="130" y="175" textAnchor="middle" fill="#2a3040" fontSize="8">tap a line to inspect</text>
          </svg>
        </div>

        <div style={{ flex: 1, minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {activeSection !== null ? (
            <div className="note-pop" style={{
              background: `${sections[activeSection].color}18`,
              border: `1.5px solid ${sections[activeSection].color}`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{sections[activeSection].icon}</div>
              <div style={{ color: sections[activeSection].color, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{sections[activeSection].label}</div>
              <div style={{ color: "#E9EDF8", fontSize: 13, lineHeight: 1.5 }}>{sections[activeSection].note}</div>
            </div>
          ) : (
            <div style={{ color: "#7B85A8", fontSize: 13, textAlign: "center" }}>
              ← Click a line<br />to see what it does
            </div>
          )}
        </div>
      </div>

      <div style={{ borderLeft: "3px solid #A78BFA", paddingLeft: 12, color: "#E9EDF8", fontSize: 13 }}>
        <strong style={{ color: "#A78BFA" }}>Concept Lock:</strong> Every C program is a recipe: <code style={{ color: "#A78BFA" }}>includes</code> (ingredients) → <code style={{ color: "#FFB800" }}>main()</code> (cooking steps) → <code style={{ color: "#7B85A8" }}>return</code> (serve!). Comments explain the WHY.
      </div>

      <button
        onClick={() => { if (!done) { setDone(true); onComplete(40); } }}
        disabled={done}
        style={{ background: done ? "#7B85A8" : "#A78BFA", color: "#0D1117", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: done ? "default" : "pointer", fontSize: 14 }}>
        {done ? "✓ 40 XP Earned!" : "Complete Section & Earn 40 XP"}
      </button>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function SectionComments({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  const stepLabels = ["Sticky Notes", "Good Comments", "Program Structure"];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @keyframes tabIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
        .tab-content { animation: tabIn 0.3s ease-out; }
      `}</style>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFB800" }} />
          <span style={{ color: "#7B85A8", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Comments</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {stepLabels.map((lbl, i) => (
            <div key={i} style={{
              flex: 1, textAlign: "center", padding: "6px 8px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: i === step ? "#FFB800" : i < step ? "rgba(255,184,0,0.2)" : "rgba(24,29,46,0.9)",
              color: i === step ? "#0D1117" : i < step ? "#FFB800" : "#7B85A8",
              cursor: i <= step ? "pointer" : "default",
            }} onClick={() => i <= step && setStep(i)}>
              {i < step ? "✓ " : ""}{lbl}
            </div>
          ))}
        </div>
      </div>

      <div className="tab-content" key={step}>
        {step === 0 && <Step0 onNext={() => setStep(1)} />}
        {step === 1 && <Step1 onNext={() => setStep(2)} />}
        {step === 2 && <Step2 onComplete={onComplete} />}
      </div>
    </div>
  );
}
