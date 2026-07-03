"use client";
import React, { useState } from "react";

interface Props { onComplete: (xp: number) => void; }

function Analogy({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(255,184,0,.09)", border: "1px solid rgba(255,184,0,.22)", borderRadius: 10, padding: 14, display: "flex", gap: 10, marginBottom: 12 }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
      <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "#E9EDF8" }}>{children}</div>
    </div>
  );
}

function ConceptLock({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(167,139,250,.12),rgba(0,217,192,.08))", border: "1px solid rgba(167,139,250,.35)", borderRadius: 10, padding: "12px 16px", marginBottom: 12 }}>
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>🔒 Non-Replaceable Concept</div>
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

function CodeBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid rgba(0,218,243,.18)", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ padding: "6px 14px", background: "rgba(0,218,243,.08)", color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700 }}>{label}</div>
      <pre style={{ padding: 16, background: "#0D1117", fontFamily: "'Courier New',monospace", fontSize: 12.5, lineHeight: 1.7, margin: 0, overflowX: "auto", color: "#E9EDF8" }}>{children}</pre>
    </div>
  );
}

// ─── Sub-step 0: for Loop ────────────────────────────────────────────────────

function ForLoopStep() {
  const [count, setCount] = useState(5);
  const [stamped, setStamped] = useState(-1); // index of last stamped envelope (-1 = none)
  const [running, setRunning] = useState(false);

  function runLoop() {
    if (running) return;
    setRunning(true);
    setStamped(-1);
    let i = 0;
    function step() {
      if (i < count) {
        setStamped(i);
        i++;
        setTimeout(step, 420);
      } else {
        setRunning(false);
      }
    }
    setTimeout(step, 200);
  }

  function reset() {
    setStamped(-1);
    setRunning(false);
  }

  const currentI = stamped + 1; // next i to be stamped; during run shows current

  return (
    <div>
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#00D9C0", fontWeight: 700, marginBottom: 10 }}>for Loop — Stamping Envelopes</div>

      <Analogy>
        You have exactly {count} envelopes to stamp. You don't guess — you <strong>know</strong> the number upfront.
        A <code style={{ color: "#00D9C0" }}>for</code> loop has three parts built in: <strong>where to start</strong> (i = 0),
        <strong> when to stop</strong> (i &lt; {count}), and <strong>how to step forward</strong> (i++).
      </Analogy>

      {/* Count picker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: "#7B85A8" }}>Envelope count:</span>
        <input
          type="number"
          min={1}
          max={8}
          value={count}
          onChange={e => { reset(); setCount(Math.max(1, Math.min(8, Number(e.target.value)))); }}
          style={{ width: 50, padding: "4px 8px", background: "rgba(24,29,46,0.9)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 6, color: "#E9EDF8", fontFamily: "'Courier New',monospace", fontSize: 13 }}
        />
      </div>

      {/* Envelope row */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        {Array.from({ length: count }, (_, i) => {
          const isStamped = i <= stamped;
          const isCurrent = i === stamped && running;
          return (
            <div key={i} style={{
              width: 52, height: 40, borderRadius: 8,
              background: isStamped ? "rgba(0,217,192,.18)" : "rgba(255,255,255,.05)",
              border: `1.5px solid ${isCurrent ? "#00D9C0" : isStamped ? "rgba(0,217,192,.4)" : "rgba(255,255,255,.12)"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
              transform: isCurrent ? "scale(1.12)" : "scale(1)",
              position: "relative"
            }}>
              <span style={{ fontSize: 18 }}>✉️</span>
              {isStamped && (
                <span style={{ position: "absolute", top: -6, right: -6, background: "#00D9C0", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#003838", fontWeight: 700, fontSize: 10 }}>✓</span>
              )}
              <span style={{ fontSize: 8, color: "#7B85A8", fontFamily: "'Courier New',monospace" }}>i={i}</span>
            </div>
          );
        })}
      </div>

      {/* Live i display */}
      <div style={{ marginBottom: 14, padding: "8px 14px", background: "rgba(0,217,192,.06)", border: "1px solid rgba(0,217,192,.15)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 12.5, color: "#E9EDF8" }}>
        {running
          ? <span>Loop running… <span style={{ color: "#00D9C0", fontWeight: 700 }}>i = {stamped}</span> (condition: <span style={{ color: "#00D9C0" }}>i &lt; {count}</span> → {stamped < count ? "✅ keep going" : "❌ stop"})</span>
          : stamped === count - 1
            ? <span style={{ color: "#00D9C0", fontWeight: 700 }}>✅ Loop finished! Stamped all {count} envelopes.</span>
            : <span style={{ color: "#7B85A8" }}>Press "Run Loop" to start. The counter i begins at 0.</span>
        }
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          onClick={runLoop}
          disabled={running}
          style={{ padding: "8px 18px", background: running ? "rgba(0,217,192,.15)" : "#00D9C0", color: running ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: running ? "not-allowed" : "pointer", letterSpacing: ".06em", transition: "all .2s" }}
        >
          {running ? "Running…" : "▶ Run Loop"}
        </button>
        <button
          onClick={reset}
          style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
        >
          ↺ Reset
        </button>
      </div>

      <ConceptLock>
        <code style={{ color: "#00D9C0" }}>for</code> loops are for when you know exactly how many times to repeat.
        The counter lives inside the loop itself: <code style={{ color: "#FFB800" }}>for (start; condition; step)</code>
      </ConceptLock>

      <Gotcha>
        <code>for (i = 0; i &lt; 10; i++)</code> runs <strong>10 times</strong> (i goes 0 → 9).
        If you write <code>i &lt;= 10</code> it runs <strong>11 times</strong>. Off-by-one is the most common loop bug!
      </Gotcha>

      <CodeBlock label="C Code — Stamp 5 Envelopes">
{`// Stamp 5 envelopes
for (int i = 0; i < 5; i++) {
    printf("Stamped envelope %d\\n", i + 1);
}
// i starts at 0, keeps going while i < 5, adds 1 each time`}
      </CodeBlock>
    </div>
  );
}

// ─── Sub-step 1: while Loop ───────────────────────────────────────────────────

function WhileLoopStep() {
  const [thickness, setThickness] = useState(0);
  const [done, setDone] = useState(false);

  function stir() {
    if (done) return;
    const increase = Math.floor(Math.random() * 16) + 10; // 10–25
    setThickness(prev => {
      const next = Math.min(100, prev + increase);
      if (next >= 100) setDone(true);
      return next;
    });
  }

  function reset() {
    setThickness(0);
    setDone(false);
  }

  const conditionTrue = thickness < 100;

  return (
    <div>
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#00D9C0", fontWeight: 700, marginBottom: 10 }}>while Loop — Stirring the Sauce</div>

      <Analogy>
        You don't know how many stirs it takes. You stir and check: <strong>"Is it thick yet?"</strong> If not, stir again.
        The check happens at the <strong>START</strong> of every round — if it's already thick before you begin, you never stir at all.
      </Analogy>

      {/* Pot visual */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 6, filter: done ? "drop-shadow(0 0 8px #FFB800)" : "none", transition: "filter .4s" }}>🍲</div>
          <div style={{ fontSize: 11, color: "#7B85A8", fontFamily: "'Courier New',monospace" }}>thickness: {thickness}%</div>
        </div>

        {/* Thickness meter */}
        <div style={{ flex: 1, minWidth: 140 }}>
          <div style={{ fontSize: 11, color: "#7B85A8", marginBottom: 6 }}>Thickness meter</div>
          <div style={{ height: 18, background: "rgba(255,255,255,.06)", borderRadius: 9, overflow: "hidden", border: "1px solid rgba(255,255,255,.10)", marginBottom: 8 }}>
            <div style={{
              height: "100%",
              width: `${thickness}%`,
              background: done ? "#FFB800" : "#00D9C0",
              borderRadius: 9,
              transition: "width .35s ease, background .3s"
            }} />
          </div>

          {/* Live condition */}
          <div style={{
            padding: "7px 12px",
            background: conditionTrue ? "rgba(0,217,192,.08)" : "rgba(255,95,110,.09)",
            border: `1px solid ${conditionTrue ? "rgba(0,217,192,.3)" : "rgba(255,95,110,.3)"}`,
            borderRadius: 8,
            fontFamily: "'Courier New',monospace",
            fontSize: 12,
            color: conditionTrue ? "#00D9C0" : "#FF5F6E",
            transition: "all .3s"
          }}>
            while (thickness &lt; 100) → {conditionTrue ? "✅ keep stirring" : "❌ stop loop"}
          </div>

          {done && (
            <div style={{ marginTop: 10, padding: "8px 14px", background: "rgba(255,184,0,.09)", border: "1px solid rgba(255,184,0,.3)", borderRadius: 8, color: "#FFB800", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12 }}>
              🍴 Sauce is ready! Loop exited.
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <button
          onClick={stir}
          disabled={done}
          style={{ padding: "8px 18px", background: done ? "rgba(0,217,192,.1)" : "#00D9C0", color: done ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: done ? "not-allowed" : "pointer", letterSpacing: ".06em" }}
        >
          🥄 Stir
        </button>
        <button
          onClick={reset}
          style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
        >
          ↺ Reset
        </button>
      </div>

      <ConceptLock>
        <code style={{ color: "#00D9C0" }}>while</code> checks its condition <strong>BEFORE</strong> each repetition.
        If the condition is false from the start, the loop body never runs — not even once.
      </ConceptLock>

      <Gotcha>
        If the condition never becomes false, the loop runs forever and <strong>freezes the program</strong>.
        Always make sure something inside the loop moves you toward making the condition false.
      </Gotcha>

      <CodeBlock label="C Code — Stir Until Thick">
{`int thickness = 0;
while (thickness < 100) {
    thickness += 20;  // stir raises thickness
    printf("Thickness: %d%%\\n", thickness);
}
printf("Sauce is ready!\\n");`}
      </CodeBlock>
    </div>
  );
}

// ─── Sub-step 2: do-while ─────────────────────────────────────────────────────

function DoWhileStep() {
  const [knockCount, setKnockCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [running, setRunning] = useState(false);
  const [showAnswerToggle, setShowAnswerToggle] = useState(false);
  const [preAnswered, setPreAnswered] = useState(false);
  const [animating, setAnimating] = useState(false);

  function knock() {
    if (running || answered) return;
    setAnimating(true);
    setRunning(true);
    setTimeout(() => {
      setAnimating(false);
      setKnockCount(prev => prev + 1);
      setShowAnswerToggle(true);
      setRunning(false);
    }, 500);
  }

  function markAnswered() {
    setAnswered(true);
    setShowAnswerToggle(false);
  }

  function reset() {
    setKnockCount(0);
    setAnswered(false);
    setRunning(false);
    setShowAnswerToggle(false);
    setAnimating(false);
  }

  return (
    <div>
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#00D9C0", fontWeight: 700, marginBottom: 10 }}>do-while — Knocking on the Door</div>

      <Analogy>
        You knock at least once — then you listen. If no answer, knock again.
        You always do the action <strong>FIRST</strong>, then check whether to repeat.
        A <code style={{ color: "#00D9C0" }}>while</code> loop might never knock if the condition is false upfront.
        <code style={{ color: "#FFB800" }}> do-while</code> always knocks at least once.
      </Analogy>

      {/* Pre-answered toggle */}
      <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(167,139,250,.07)", border: "1px solid rgba(167,139,250,.2)", borderRadius: 9 }}>
        <div style={{ fontSize: 12, color: "#A78BFA", marginBottom: 6, fontFamily: "'Courier New',monospace", fontWeight: 700 }}>Experiment: What if someone is already at the door?</div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={preAnswered} onChange={e => { reset(); setPreAnswered(e.target.checked); }} />
          <span style={{ fontSize: 12.5, color: "#E9EDF8" }}>
            Someone is already there (answered = true before loop starts)
          </span>
        </label>
        {preAnswered && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#7B85A8", lineHeight: 1.5 }}>
            <span style={{ color: "#FF5F6E" }}>while loop</span>: would skip the knock entirely (condition false upfront).<br />
            <span style={{ color: "#FFB800" }}>do-while loop</span>: still knocks once, THEN checks.
          </div>
        )}
      </div>

      {/* Door visual */}
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{
            fontSize: 64,
            transition: "transform .15s",
            transform: animating ? "scale(1.18) rotate(-5deg)" : "scale(1) rotate(0deg)",
            filter: answered ? "drop-shadow(0 0 12px #00D9C0)" : "none"
          }}>
            {answered ? "🚪🙋" : "🚪"}
          </div>
          <div style={{ fontSize: 10, color: "#7B85A8", fontFamily: "'Courier New',monospace" }}>
            {answered ? "Answered!" : "No answer yet"}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8", marginBottom: 8 }}>
            Knocks so far: <span style={{ color: "#00D9C0", fontWeight: 700 }}>{knockCount}</span>
          </div>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, padding: "6px 10px", background: "rgba(0,217,192,.06)", border: "1px solid rgba(0,217,192,.15)", borderRadius: 7, marginBottom: 8 }}>
            do {"{"}<br />
            &nbsp;&nbsp;knock();<br />
            {"}"} while (answered == 0);
          </div>
          <div style={{ fontSize: 12, color: "#7B85A8", marginBottom: 6 }}>Condition now: answered == 0 →{" "}
            <span style={{ color: answered ? "#FF5F6E" : "#00D9C0", fontWeight: 700 }}>
              {answered ? "false — loop stops" : "true — knock again"}
            </span>
          </div>
        </div>
      </div>

      {!answered && (
        <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <button
            onClick={knock}
            disabled={running}
            style={{ padding: "8px 18px", background: "#00D9C0", color: "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: running ? "not-allowed" : "pointer" }}
          >
            🤛 Knock
          </button>
          <button
            onClick={reset}
            style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
          >
            ↺ Reset
          </button>
        </div>
      )}

      {showAnswerToggle && !answered && (
        <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "#E9EDF8" }}>Did someone answer?</span>
          <button
            onClick={markAnswered}
            style={{ padding: "6px 14px", background: "rgba(0,217,192,.12)", color: "#00D9C0", border: "1px solid rgba(0,217,192,.3)", borderRadius: 7, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
          >
            YES →
          </button>
          <button
            onClick={knock}
            disabled={running}
            style={{ padding: "6px 14px", background: "rgba(255,95,110,.09)", color: "#FF5F6E", border: "1px solid rgba(255,95,110,.3)", borderRadius: 7, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
          >
            NO, knock again
          </button>
        </div>
      )}

      {answered && (
        <div style={{ marginBottom: 14, padding: "10px 16px", background: "rgba(0,217,192,.08)", border: "1px solid rgba(0,217,192,.25)", borderRadius: 9, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 13 }}>
          🎉 They answered after {knockCount} knock{knockCount !== 1 ? "s" : ""}! Loop exits.
        </div>
      )}

      {answered && (
        <button onClick={reset} style={{ marginBottom: 14, padding: "6px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}>↺ Reset</button>
      )}

      <ConceptLock>
        <code style={{ color: "#00D9C0" }}>do-while</code> always runs its block <strong>at least once</strong>.
        The condition is checked <strong>AFTER</strong> the first run.
      </ConceptLock>

      <Gotcha>
        Even if the condition is already false before the loop starts, do-while still runs once.
        This surprises beginners who expect it to behave like while.
      </Gotcha>

      <CodeBlock label="C Code — Knock Until Answered">
{`int answered = 0;
do {
    printf("*knock knock*\\n");
    // check if answered...
    answered = checkIfAnswered();
} while (answered == 0);
printf("They answered!\\n");`}
      </CodeBlock>
    </div>
  );
}

// ─── Sub-step 3: break & continue ────────────────────────────────────────────

type PrinterState = "ok" | "jammed" | "alarm";

function BreakContinueStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [printers, setPrinters] = useState<PrinterState[]>(["ok", "jammed", "ok", "alarm", "ok", "ok"]);
  const [visited, setVisited] = useState<number>(-1); // index being visited (-1 = not started)
  const [running, setRunning] = useState(false);
  const [stopped, setStopped] = useState<"break" | "done" | null>(null);
  const [skipped, setSkipped] = useState<number[]>([]);
  const [printed, setPrinted] = useState<number[]>([]);

  function runLoop() {
    if (running) return;
    setRunning(true);
    setVisited(-1);
    setStopped(null);
    setSkipped([]);
    setPrinted([]);

    let i = 0;
    const skippedList: number[] = [];
    const printedList: number[] = [];

    function step() {
      if (i >= printers.length) {
        setVisited(printers.length);
        setStopped("done");
        setRunning(false);
        return;
      }
      setVisited(i);
      const p = printers[i];
      if (p === "jammed") {
        skippedList.push(i);
        setSkipped([...skippedList]);
        i++;
        setTimeout(step, 600);
      } else if (p === "alarm") {
        setStopped("break");
        setRunning(false);
      } else {
        printedList.push(i);
        setPrinted([...printedList]);
        i++;
        setTimeout(step, 600);
      }
    }

    setTimeout(step, 300);
  }

  function resetRun() {
    setVisited(-1);
    setRunning(false);
    setStopped(null);
    setSkipped([]);
    setPrinted([]);
  }

  function togglePrinter(index: number) {
    if (running) return;
    resetRun();
    setPrinters(prev => {
      const next = [...prev];
      const cycle: PrinterState[] = ["ok", "jammed", "alarm"];
      const cur = cycle.indexOf(next[index]);
      // Don't allow more than one alarm
      const newState = cycle[(cur + 1) % cycle.length];
      if (newState === "alarm" && prev.some(p => p === "alarm")) {
        next[index] = "ok";
      } else {
        next[index] = newState;
      }
      return next;
    });
  }

  const printerEmoji = (state: PrinterState) => state === "jammed" ? "🖨️🔧" : state === "alarm" ? "🖨️🚨" : "🖨️";
  const printerLabel = (state: PrinterState) => state === "jammed" ? "jammed" : state === "alarm" ? "alarm" : "ok";

  return (
    <div>
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#00D9C0", fontWeight: 700, marginBottom: 10 }}>break & continue — Row of Printers</div>

      <Analogy>
        Imagine a row of school printers.
        <br /><br />
        🔧 <strong style={{ color: "#FFB800" }}>continue</strong> — "This printer is jammed. Skip it and try the next one." The loop skips the rest of this round and moves on.
        <br /><br />
        🚨 <strong style={{ color: "#FF5F6E" }}>break</strong> — "The fire alarm goes off. Everyone stops immediately." The loop exits completely — no more printers visited.
      </Analogy>

      <div style={{ fontSize: 12, color: "#7B85A8", marginBottom: 10 }}>Click a printer to cycle its state: ok → jammed → alarm</div>

      {/* Printer row */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
        {printers.map((state, i) => {
          const isActive = visited === i && running;
          const isSkipped = skipped.includes(i);
          const isPrinted = printed.includes(i);
          const isStopped = stopped === "break" && visited === i;
          const isUnvisited = visited >= 0 && i > visited && !running;

          let borderColor = "rgba(255,255,255,.12)";
          let bg = "rgba(255,255,255,.04)";
          if (isActive) { borderColor = "#00D9C0"; bg = "rgba(0,217,192,.15)"; }
          else if (isPrinted) { borderColor = "rgba(0,217,192,.4)"; bg = "rgba(0,217,192,.08)"; }
          else if (isSkipped) { borderColor = "rgba(255,184,0,.35)"; bg = "rgba(255,184,0,.06)"; }
          else if (isStopped) { borderColor = "#FF5F6E"; bg = "rgba(255,95,110,.12)"; }
          else if (state === "alarm") { borderColor = "rgba(255,95,110,.4)"; bg = "rgba(255,95,110,.06)"; }
          else if (state === "jammed") { borderColor = "rgba(255,184,0,.4)"; bg = "rgba(255,184,0,.05)"; }

          return (
            <button
              key={i}
              onClick={() => togglePrinter(i)}
              style={{
                width: 66, padding: "10px 6px",
                background: bg,
                border: `1.5px solid ${borderColor}`,
                borderRadius: 10,
                cursor: running ? "not-allowed" : "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                transition: "all .25s",
                transform: isActive ? "scale(1.1)" : "scale(1)",
                opacity: (isUnvisited && stopped === "break") ? 0.3 : 1,
              }}
            >
              <span style={{ fontSize: 22 }}>{printerEmoji(state)}</span>
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: state === "alarm" ? "#FF5F6E" : state === "jammed" ? "#FFB800" : "#7B85A8", fontWeight: 700 }}>
                {printerLabel(state)}
              </span>
              <span style={{ fontFamily: "'Courier New',monospace", fontSize: 9, color: "#4A5070" }}>#{i}</span>
              {isPrinted && <span style={{ fontSize: 10, color: "#00D9C0" }}>✓ printed</span>}
              {isSkipped && <span style={{ fontSize: 10, color: "#FFB800" }}>↪ skipped</span>}
              {isStopped && stopped === "break" && <span style={{ fontSize: 10, color: "#FF5F6E" }}>⛔ break</span>}
            </button>
          );
        })}
      </div>

      {/* Status */}
      {stopped === "break" && (
        <div style={{ marginBottom: 12, padding: "9px 14px", background: "rgba(255,95,110,.09)", border: "1px solid rgba(255,95,110,.3)", borderRadius: 9, color: "#FF5F6E", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12 }}>
          🚨 Fire alarm! break executed — loop stopped at printer #{visited}. Remaining printers not visited.
        </div>
      )}
      {stopped === "done" && (
        <div style={{ marginBottom: 12, padding: "9px 14px", background: "rgba(0,217,192,.08)", border: "1px solid rgba(0,217,192,.25)", borderRadius: 9, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12 }}>
          ✅ All printers checked! Printed: {printed.length}, Skipped (jammed): {skipped.length}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <button
          onClick={runLoop}
          disabled={running}
          style={{ padding: "8px 18px", background: running ? "rgba(0,217,192,.1)" : "#00D9C0", color: running ? "#00D9C0" : "#003838", border: "none", borderRadius: 8, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: running ? "not-allowed" : "pointer" }}
        >
          ▶ Run
        </button>
        <button
          onClick={resetRun}
          style={{ padding: "8px 14px", background: "transparent", color: "#7B85A8", border: "1px solid rgba(255,255,255,.10)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
        >
          ↺ Reset
        </button>
      </div>

      <ConceptLock>
        <code style={{ color: "#FF5F6E" }}>break</code> exits the entire loop immediately.{" "}
        <code style={{ color: "#FFB800" }}>continue</code> skips only the current iteration and jumps to the next one.
      </ConceptLock>

      <Gotcha>
        <code>break</code> inside a nested loop only exits the <strong>inner loop</strong>, not all loops. Each <code>break</code> exits one level.
      </Gotcha>

      <CodeBlock label="C Code — Printers with break & continue">
{`for (int i = 0; i < 6; i++) {
    if (printer[i] == JAMMED) {
        continue;  // skip this one, go to next
    }
    if (printer[i] == ALARM) {
        break;     // stop everything now
    }
    printf("Printing on printer %d\\n", i);
}`}
      </CodeBlock>

      <button
        onClick={() => onComplete(50)}
        style={{ marginTop: 8, padding: "12px 28px", background: "linear-gradient(135deg,#00D9C0,#A78BFA)", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: ".08em", boxShadow: "0 4px 18px rgba(0,217,192,.25)" }}
      >
        ✅ Complete Section (+50 XP)
      </button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SectionLoops({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);

  const steps = ["for Loop", "while Loop", "do-while", "break & continue"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Step tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setSubStep(i)} style={{
            padding: "5px 12px", borderRadius: 8,
            border: `1px solid ${subStep === i ? "#00D9C0" : "rgba(255,255,255,0.10)"}`,
            background: subStep === i ? "rgba(0,217,192,.12)" : "transparent",
            color: subStep === i ? "#00D9C0" : "#7B85A8",
            fontFamily: "'Courier New',monospace", fontSize: 10, fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.05em",
            transition: "all .2s"
          }}>
            {i + 1}. {s}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div style={{ background: "rgba(24,29,46,0.85)", border: "1px solid rgba(255,255,255,0.065)", borderRadius: 14, padding: 20 }}>
        {subStep === 0 && <ForLoopStep />}
        {subStep === 1 && <WhileLoopStep />}
        {subStep === 2 && <DoWhileStep />}
        {subStep === 3 && <BreakContinueStep onComplete={onComplete} />}

        {/* Navigation */}
        {subStep < 3 && (
          <button
            onClick={() => setSubStep(subStep + 1)}
            style={{ marginTop: 16, padding: "10px 24px", background: "#00D9C0", color: "#003838", borderRadius: 9, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: "0.08em" }}
          >
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
