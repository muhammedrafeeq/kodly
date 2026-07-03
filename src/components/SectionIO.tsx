"use client";

import React, { useState, useRef, useEffect } from "react";

interface SectionIOProps {
  onComplete: (xp: number) => void;
}

// ── Keyboard SVG helper ──────────────────────────────────────────────────────

function KeyboardSVG({ x, y }: { x: number; y: number }) {
  const rows = [
    Array.from({ length: 8 }, (_, i) => i),
    Array.from({ length: 8 }, (_, i) => i),
    Array.from({ length: 8 }, (_, i) => i),
  ];
  return (
    <g>
      <rect x={x} y={y} width={120} height={60} rx={6} fill="#1e2438" stroke="#2a3050" strokeWidth={1} />
      {rows.map((row, ri) =>
        row.map((ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={x + 6 + ci * 14}
            y={y + 6 + ri * 17}
            width={11}
            height={10}
            rx={2}
            fill="#2a3050"
          />
        ))
      )}
    </g>
  );
}

// ── Monitor SVG helper ───────────────────────────────────────────────────────

function MonitorSVG({ x, y, children }: { x: number; y: number; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={100} height={68} rx={6} fill="#1e2438" stroke="#2a3050" strokeWidth={1} />
      <rect x={x + 4} y={y + 4} width={92} height={52} rx={3} fill="#0D1117" />
      {/* Stand */}
      <line x1={x + 50} y1={y + 68} x2={x + 50} y2={y + 80} stroke="#2a3050" strokeWidth={3} />
      <line x1={x + 35} y1={y + 80} x2={x + 65} y2={y + 80} stroke="#2a3050" strokeWidth={3} />
      {children}
    </g>
  );
}

// ── Sub-step 0: printf Output Machine ───────────────────────────────────────

const FORMAT_SPECIFIERS = ["%d", "%s", "%f", "%c"];

function PrintfMachine({ onNext }: { onNext: () => void }) {
  const [formatStr, setFormatStr] = useState('"Hello, %s!\\n"');
  const [nameVal, setNameVal] = useState("Ali");
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildOutput = (fmt: string, val: string): string => {
    let raw = fmt.replace(/^"|"$/g, "");
    raw = raw.replace(/%s/g, val).replace(/%d/g, val).replace(/%f/g, val).replace(/%c/g, val[0] ?? "");
    raw = raw.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
    return raw;
  };

  const runPrintf = (fmt: string, val: string) => {
    if (typing) return;
    const result = buildOutput(fmt, val);
    setOutput("");
    setTyping(true);
    let i = 0;
    const step = () => {
      if (i < result.length) {
        setOutput((prev) => prev + result[i]);
        i++;
        timerRef.current = setTimeout(step, 80);
      } else {
        setTyping(false);
      }
    };
    timerRef.current = setTimeout(step, 80);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const insertSpecifier = (spec: string) => {
    const inner = formatStr.replace(/^"|"$/, "").replace(/^"/, "");
    const cleaned = formatStr.startsWith('"') ? formatStr.slice(1, -1) : formatStr;
    setFormatStr('"' + cleaned + spec + '"');
  };

  return (
    <div style={{ fontFamily: "monospace" }}>
      <style>{`
        @keyframes typeChar { from{width:0;opacity:0} to{width:auto;opacity:1} }
        @keyframes flowRight { from{transform:translateX(0);opacity:1} to{transform:translateX(60px);opacity:0} }
        @keyframes flowLeft { from{transform:translateX(0);opacity:1} to{transform:translateX(-60px);opacity:0} }
        @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes screenType { from{width:0} to{width:100%} }
        .slide-in { animation: slideIn 0.3s ease forwards; }
      `}</style>

      <h3 style={{ color: "#00D9C0", fontSize: 14, marginBottom: 6 }}>printf: The Output Machine</h3>
      <p style={{ color: "#7B85A8", fontSize: 12, marginBottom: 12 }}>
        Build a format string, then fire it at the screen.
      </p>

      {/* SVG scene */}
      <div style={{ background: "#0D1117", borderRadius: 12, padding: 8 }}>
        <svg viewBox="0 0 380 110" style={{ width: "100%", display: "block" }}>
          {/* Keyboard */}
          <KeyboardSVG x={10} y={25} />
          <text x={70} y={98} textAnchor="middle" fontSize={8} fill="#7B85A8" fontFamily="monospace">keyboard</text>

          {/* Arrow pipe */}
          <line x1={134} y1={55} x2={200} y2={55} stroke="#00D9C0" strokeWidth={2} />
          <polygon points="200,50 212,55 200,60" fill="#00D9C0" />
          <text x={170} y={48} textAnchor="middle" fontSize={8} fill="#00D9C0" fontFamily="monospace">printf</text>

          {/* Monitor */}
          <MonitorSVG x={215} y={15}>
            <foreignObject x={219} y={19} width={84} height={44}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: "#00D9C0",
                  whiteSpace: "pre-wrap",
                  padding: 2,
                }}
              >
                {output || (typing ? "" : <span style={{ color: "#2a3050" }}>...</span>)}
              </div>
            </foreignObject>
          </MonitorSVG>
          <text x={265} y={103} textAnchor="middle" fontSize={8} fill="#7B85A8" fontFamily="monospace">screen</text>
        </svg>
      </div>

      {/* Inputs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ color: "#7B85A8", fontSize: 11, width: 80 }}>Format:</label>
          <input
            value={formatStr}
            onChange={(e) => setFormatStr(e.target.value)}
            style={{
              flex: 1,
              background: "#0D1117",
              border: "1px solid #2a3050",
              borderRadius: 6,
              padding: "5px 8px",
              color: "#FFB800",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ color: "#7B85A8", fontSize: 11, width: 80 }}>Value:</label>
          <input
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            style={{
              flex: 1,
              background: "#0D1117",
              border: "1px solid #2a3050",
              borderRadius: 6,
              padding: "5px 8px",
              color: "#E9EDF8",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          />
        </div>
      </div>

      {/* Specifier palette */}
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        <span style={{ color: "#7B85A8", fontSize: 11, alignSelf: "center" }}>Insert:</span>
        {FORMAT_SPECIFIERS.map((sp) => (
          <button
            key={sp}
            onClick={() => insertSpecifier(sp)}
            style={{
              background: "#1e2438",
              border: "1px solid #A78BFA55",
              borderRadius: 4,
              padding: "3px 8px",
              color: "#A78BFA",
              fontFamily: "monospace",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button
          onClick={() => runPrintf(formatStr, nameVal)}
          style={{
            background: "#00D9C0",
            color: "#0D1117",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontWeight: "bold",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          ▶ Printf!
        </button>
        <button
          onClick={() => runPrintf('"Hello!\\n"', "")}
          style={{
            background: "#1e2438",
            color: "#E9EDF8",
            border: "1px solid #2a3050",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          printf(&quot;Hello!\n&quot;)
        </button>
        <button
          onClick={() => runPrintf('"Score: %d\\n"', "95")}
          style={{
            background: "#1e2438",
            color: "#E9EDF8",
            border: "1px solid #2a3050",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          printf(&quot;Score: %d\n&quot;, 95)
        </button>
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
        <span style={{ color: "#00D9C0" }}>printf</span>(<span style={{ color: "#FFB800" }}>&quot;Hello, %s!\n&quot;</span>, name);  <span style={{ color: "#7B85A8" }}>// %s = string slot</span>{"\n"}
        <span style={{ color: "#00D9C0" }}>printf</span>(<span style={{ color: "#FFB800" }}>&quot;Score: %d\n&quot;</span>, score);  <span style={{ color: "#7B85A8" }}>// %d = integer slot</span>{"\n"}
        <span style={{ color: "#00D9C0" }}>printf</span>(<span style={{ color: "#FFB800" }}>&quot;Price: %.2f\n&quot;</span>, 4.99); <span style={{ color: "#7B85A8" }}>// %f = decimal slot</span>
      </pre>

      {/* Concept lock */}
      <div
        style={{
          marginTop: 12,
          padding: "10px 14px",
          background: "#00D9C011",
          border: "1px solid #00D9C055",
          borderRadius: 8,
          fontSize: 11,
        }}
      >
        <strong style={{ color: "#00D9C0" }}>Concept Lock:</strong>{" "}
        <span style={{ color: "#E9EDF8" }}>
          printf sends text to the screen. %d = int, %f = float, %s = text, %c = char, \n = new line.
        </span>
        <br />
        <span style={{ color: "#FF5F6E" }}>⚠ Gotcha:</span>{" "}
        <span style={{ color: "#7B85A8" }}>
          Forgetting \n → next output appears on same line — outputs collide!
        </span>
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
          NEXT: scanf Input Collector →
        </button>
      </div>
    </div>
  );
}

// ── Sub-step 1: scanf Input Collector ───────────────────────────────────────

function FunnelSVG({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* Funnel body */}
      <polygon
        points={`${x},${y} ${x + 60},${y} ${x + 40},${y + 50} ${x + 20},${y + 50}`}
        fill="#FFB80033"
        stroke="#FFB800"
        strokeWidth={1.5}
      />
      {/* Spout */}
      <rect x={x + 20} y={y + 50} width={20} height={16} fill="#FFB80055" stroke="#FFB800" strokeWidth={1} />
    </g>
  );
}

interface ScanDemoProps {
  label: string;
  placeholder: string;
  code: string;
  highlight: string;
  highlightNote: string;
  isString?: boolean;
}

function ScanDemo({ label, placeholder, code, highlight, highlightNote, isString = false }: ScanDemoProps) {
  const [inputVal, setInputVal] = useState("");
  const [scanned, setScanned] = useState("");
  const [animKey, setAnimKey] = useState(0);
  const [dotX, setDotX] = useState(0);

  const handleScan = () => {
    if (!inputVal) return;
    setScanned("");
    setAnimKey((k) => k + 1);
    setDotX(0);
    // animate dot
    let x = 0;
    const interval = setInterval(() => {
      x += 8;
      setDotX(x);
      if (x >= 110) {
        clearInterval(interval);
        setScanned(inputVal);
      }
    }, 40);
  };

  return (
    <div
      style={{
        background: "rgba(24,29,46,0.9)",
        border: "1px solid #2a3050",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
      }}
    >
      <div style={{ color: "#E9EDF8", fontWeight: "bold", fontSize: 12, marginBottom: 10 }}>
        {label}
      </div>

      {/* SVG scene */}
      <div style={{ background: "#0D1117", borderRadius: 8, padding: 4, marginBottom: 10 }}>
        <svg viewBox="0 0 380 80" style={{ width: "100%", display: "block" }}>
          {/* Keyboard */}
          <KeyboardSVG x={10} y={10} />

          {/* Funnel */}
          <FunnelSVG x={160} y={8} />

          {/* Variable box */}
          <rect x={280} y={20} width={80} height={40} rx={6} fill="#FFB80011" stroke="#FFB800" strokeWidth={1.5} />
          <text x={320} y={35} textAnchor="middle" fontSize={8} fill="#FFB800" fontFamily="monospace">
            variable
          </text>
          <text x={320} y={50} textAnchor="middle" fontSize={11} fill="#E9EDF8" fontFamily="monospace">
            {scanned || "?"}
          </text>

          {/* Animated dot */}
          {animKey > 0 && dotX < 110 && (
            <circle key={animKey} cx={130 + dotX} cy={45} r={5} fill="#FFB800" opacity={0.9} />
          )}

          {/* & symbol highlight for non-string */}
          {!isString && (
            <>
              <text x={255} y={72} textAnchor="middle" fontSize={14} fill="#FFB800" fontFamily="monospace" fontWeight="bold">&amp;</text>
              <text x={255} y={78} textAnchor="middle" fontSize={6} fill="#7B85A8" fontFamily="monospace">put it HERE</text>
              <line x1={263} y1={68} x2={280} y2={55} stroke="#FFB800" strokeWidth={1} strokeDasharray="2 2" />
            </>
          )}
        </svg>
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <input
          placeholder={placeholder}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          style={{
            flex: 1,
            background: "#0D1117",
            border: "1px solid #2a3050",
            borderRadius: 6,
            padding: "5px 8px",
            color: "#E9EDF8",
            fontFamily: "monospace",
            fontSize: 12,
          }}
        />
        <button
          onClick={handleScan}
          style={{
            background: "#FFB800",
            color: "#0D1117",
            border: "none",
            borderRadius: 6,
            padding: "6px 12px",
            fontWeight: "bold",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          Scan!
        </button>
      </div>

      {/* Code */}
      <pre
        style={{
          background: "#0D1117",
          borderRadius: 6,
          padding: 8,
          fontSize: 11,
          color: "#E9EDF8",
          margin: 0,
          overflowX: "auto",
        }}
      >
        {code.split(highlight).map((part, i, arr) =>
          i < arr.length - 1 ? (
            <React.Fragment key={i}>
              {part}
              <span style={{ color: "#FFB800", fontWeight: "bold" }}>{highlight}</span>
            </React.Fragment>
          ) : (
            part
          )
        )}
      </pre>

      {!isString && (
        <div
          style={{
            marginTop: 8,
            padding: "6px 10px",
            background: "#FFB80011",
            border: "1px solid #FFB80044",
            borderRadius: 6,
            fontSize: 11,
            color: "#E9EDF8",
          }}
        >
          <span style={{ color: "#FFB800", fontWeight: "bold", fontSize: 16 }}>&amp;</span>{" "}
          {highlightNote}
        </div>
      )}
    </div>
  );
}

function ScanfCollector({ onComplete }: { onComplete: (xp: number) => void }) {
  return (
    <div style={{ fontFamily: "monospace" }}>
      <h3 style={{ color: "#00D9C0", fontSize: 14, marginBottom: 6 }}>scanf: The Input Collector</h3>
      <p style={{ color: "#7B85A8", fontSize: 12, marginBottom: 12 }}>
        scanf reads from the keyboard and stores the value into a variable.
      </p>

      <ScanDemo
        label="Demo 1 — Scan a name (string)"
        placeholder="Type your name..."
        code={`scanf("%s", name);`}
        highlight="%s"
        highlightNote=""
        isString={true}
      />

      <ScanDemo
        label="Demo 2 — Scan a number (int)"
        placeholder="Type a number..."
        code={`scanf("%d", &age);`}
        highlight="&"
        highlightNote='tells C WHERE in memory to put the value. Always use & before variable name for numbers!'
        isString={false}
      />

      {/* Concept lock */}
      <div
        style={{
          padding: "10px 14px",
          background: "#00D9C011",
          border: "1px solid #00D9C055",
          borderRadius: 8,
          fontSize: 11,
          marginBottom: 12,
        }}
      >
        <strong style={{ color: "#00D9C0" }}>Concept Lock:</strong>{" "}
        <span style={{ color: "#E9EDF8" }}>
          scanf reads from keyboard. For numbers, always use & before the variable name. For char[] (strings), no & needed.
        </span>
        <br />
        <span style={{ color: "#FF5F6E" }}>⚠ Gotcha:</span>{" "}
        <span style={{ color: "#7B85A8" }}>
          scanf(&quot;%s&quot;, name) stops at a space. For full sentences use fgets(name, size, stdin).
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => onComplete(45)}
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
          Complete! Claim 45 XP 🎉
        </button>
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

export default function SectionIO({ onComplete }: SectionIOProps) {
  const [subStep, setSubStep] = useState(0);

  const steps = ["printf Output", "scanf Input"];

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

      {subStep === 0 && <PrintfMachine onNext={() => setSubStep(1)} />}
      {subStep === 1 && <ScanfCollector onComplete={onComplete} />}
    </div>
  );
}
