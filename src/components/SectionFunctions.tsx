"use client";
import React, { useState } from "react";

// ─── Helper components ───────────────────────────────────────────────────────

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
      <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#A78BFA", fontWeight: 700, marginBottom: 6 }}>🔒 Non-Replaceable Concept</div>
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

// ─── Sub-step 0: Defining Functions — "The Recipe Card" ──────────────────────

function RecipeStep() {
  const [runCount, setRunCount] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const recipeSteps = [
    "Roll the dough",
    "Add sauce",
    "Bake 20 mins",
  ];

  function makePizza() {
    setRunCount((c) => c + 1);
    setActiveStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setActiveStep(1), 600));
    timers.push(setTimeout(() => setActiveStep(2), 1200));
    timers.push(setTimeout(() => setActiveStep(null), 2000));
    return () => timers.forEach(clearTimeout);
  }

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E9EDF8", marginBottom: 4, marginTop: 0 }}>
        Sub-step 1 of 4 — Defining Functions: <span style={{ color: "#FFB800" }}>"The Recipe Card"</span>
      </h3>
      <p style={{ fontSize: 13, color: "#7B85A8", marginBottom: 12, marginTop: 0 }}>
        World: a kitchen recipe card
      </p>

      <Analogy>
        You write the pizza recipe <strong>once</strong>. Every Friday you follow the same card — you don&apos;t rewrite it. A function is a named recipe: write it once in C, call it any time just by saying its name.
      </Analogy>

      {/* Recipe card UI */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        {/* Definition card */}
        <div style={{ flex: "1 1 200px", background: "rgba(255,184,0,.06)", border: "1px solid rgba(255,184,0,.25)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#FFB800", fontWeight: 700, marginBottom: 10 }}>
            📋 Recipe Definition
          </div>
          <div style={{ fontWeight: 700, color: "#E9EDF8", fontSize: 13, marginBottom: 8 }}>🍕 makePizza()</div>
          {recipeSteps.map((step, i) => (
            <div
              key={i}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                marginBottom: 6,
                fontSize: 12.5,
                color: activeStep === i ? "#003838" : "#E9EDF8",
                background: activeStep === i ? "#00D9C0" : "rgba(255,255,255,0.04)",
                border: `1px solid ${activeStep === i ? "#00D9C0" : "rgba(255,255,255,0.07)"}`,
                transition: "all 0.3s",
                fontFamily: "'Courier New',monospace",
              }}
            >
              {i + 1}. {step}
            </div>
          ))}
        </div>

        {/* Call card */}
        <div style={{ flex: "1 1 200px", background: "rgba(0,217,192,.06)", border: "1px solid rgba(0,217,192,.22)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#00D9C0", fontWeight: 700, marginBottom: 10 }}>
            🍳 Use the Recipe
          </div>
          <p style={{ fontSize: 12.5, color: "#7B85A8", margin: "0 0 12px 0" }}>
            Click the button to <em>call</em> the function. Watch the steps execute!
          </p>
          <button
            onClick={makePizza}
            style={{ padding: "9px 18px", background: "#FFB800", color: "#1a1000", borderRadius: 8, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%", marginBottom: 10 }}
          >
            🍕 Make Pizza
          </button>
          {runCount > 0 && (
            <div style={{ fontSize: 12, color: "#7B85A8", fontFamily: "'Courier New',monospace" }}>
              Recipe used <span style={{ color: "#00D9C0", fontWeight: 700 }}>{runCount}</span> time{runCount !== 1 ? "s" : ""} — same card every time!
            </div>
          )}
          {runCount >= 3 && (
            <div style={{ marginTop: 8, padding: "8px 10px", background: "rgba(0,217,192,.1)", border: "1px solid rgba(0,217,192,.25)", borderRadius: 7, fontSize: 12, color: "#00D9C0" }}>
              ✅ You felt it — one recipe, used again and again!
            </div>
          )}
        </div>
      </div>

      <CodeBlock
        label="C Code — Define once, call many times"
        code={`// DEFINE: write the recipe once
void makePizza() {
    printf("Roll the dough\\n");
    printf("Add sauce\\n");
    printf("Bake 20 mins\\n");
}

// CALL: use it any time
makePizza();  // runs all 3 steps
makePizza();  // runs again — same recipe`}
      />

      <ConceptLock>
        Defining a function writes the recipe. Calling it follows the recipe. You must CALL a function to make it run — just defining it does nothing.
      </ConceptLock>

      <Gotcha>
        Writing a function and never calling it — the code exists but never runs. Like writing a pizza recipe and leaving it in a drawer forever.
      </Gotcha>
    </div>
  );
}

// ─── Sub-step 1: Parameters — "Ingredients You Hand the Recipe" ──────────────

function ParamsStep() {
  const [servings, setServings] = useState(4);
  const [topping, setTopping] = useState("cheese");
  const [output, setOutput] = useState<string | null>(null);

  function cookIt() {
    const t = topping.trim() || "cheese";
    setOutput(`Making pizza for ${servings} people with ${t}!`);
  }

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E9EDF8", marginBottom: 4, marginTop: 0 }}>
        Sub-step 2 of 4 — Parameters: <span style={{ color: "#FFB800" }}>"Ingredients You Hand the Recipe"</span>
      </h3>
      <p style={{ fontSize: 13, color: "#7B85A8", marginBottom: 12, marginTop: 0 }}>
        World: a recipe card with blank slots
      </p>

      <Analogy>
        The recipe has blanks: <em>&quot;serves ___ people&quot;</em>, <em>&quot;___ cups of flour&quot;</em>. When you start cooking, you fill them in. Parameters are those blanks — each call fills them with different values.
      </Analogy>

      {/* Recipe card with inputs */}
      <div style={{ background: "rgba(255,184,0,.06)", border: "1px solid rgba(255,184,0,.25)", borderRadius: 10, padding: 16, marginBottom: 12 }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#FFB800", fontWeight: 700, marginBottom: 12 }}>
          📋 Recipe Card — Fill in the blanks
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: "1 1 140px" }}>
            <label style={{ display: "block", fontSize: 11, color: "#7B85A8", fontFamily: "'Courier New',monospace", marginBottom: 5 }}>
              Servings (1–12):
            </label>
            <input
              type="number"
              min={1}
              max={12}
              value={servings}
              onChange={(e) => setServings(Math.max(1, Math.min(12, Number(e.target.value))))}
              style={{ width: "100%", padding: "7px 10px", background: "#0D1117", border: "1px solid rgba(0,217,192,.3)", borderRadius: 7, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 13, boxSizing: "border-box" as const }}
            />
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <label style={{ display: "block", fontSize: 11, color: "#7B85A8", fontFamily: "'Courier New',monospace", marginBottom: 5 }}>
              Topping:
            </label>
            <input
              type="text"
              value={topping}
              onChange={(e) => setTopping(e.target.value)}
              placeholder="e.g. peppers"
              style={{ width: "100%", padding: "7px 10px", background: "#0D1117", border: "1px solid rgba(0,217,192,.3)", borderRadius: 7, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 13, boxSizing: "border-box" as const }}
            />
          </div>
        </div>

        <button
          onClick={cookIt}
          style={{ padding: "9px 20px", background: "#FFB800", color: "#1a1000", borderRadius: 8, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
        >
          🍕 Cook it!
        </button>

        {output && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(0,217,192,.08)", border: "1px solid rgba(0,217,192,.25)", borderRadius: 8, fontFamily: "'Courier New',monospace", fontSize: 13, color: "#00D9C0" }}>
            &gt; {output}
          </div>
        )}
      </div>

      {output && (
        <div style={{ marginBottom: 12, padding: 14, background: "#0D1117", border: "1px solid rgba(0,218,243,.18)", borderRadius: 10 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#00D9C0", fontWeight: 700, marginBottom: 8 }}>
            C equivalent — your values highlighted
          </div>
          <pre style={{ fontFamily: "'Courier New',monospace", fontSize: 12.5, lineHeight: 1.7, margin: 0, color: "#E9EDF8" }}>
{`makePizza(`}<span style={{ color: "#FFB800" }}>{servings}</span>{`, "`}<span style={{ color: "#A78BFA" }}>{topping.trim() || "cheese"}</span>{`");`}
          </pre>
        </div>
      )}

      <CodeBlock
        label="C Code — Parameters as labeled blank slots"
        code={`// DEFINE with parameters (the blanks)
void makePizza(int servings, char topping[]) {
    printf("Making pizza for %d people\\n", servings);
    printf("Topping: %s\\n", topping);
}

// CALL with different values each time
makePizza(4, "cheese");   // fills the blanks with 4 and "cheese"
makePizza(10, "peppers"); // same recipe, different ingredients`}
      />

      <ConceptLock>
        Parameters are the labeled inputs a function needs. They work like named blank slots that get filled when you call the function. Each call can pass different values.
      </ConceptLock>

      <Gotcha>
        C passes <strong>COPIES</strong> of values (pass by value). Changing a parameter inside a function does NOT change the original variable outside.
      </Gotcha>
    </div>
  );
}

// ─── Sub-step 2: Return Values — "The Takeaway Counter" ──────────────────────

function ReturnStep() {
  const [numA, setNumA] = useState(3);
  const [numB, setNumB] = useState(7);
  const [result, setResult] = useState<number | null>(null);
  const [stored, setStored] = useState(false);
  const [usedDirectly, setUsedDirectly] = useState(false);

  function addThem() {
    setResult(numA + numB);
    setStored(false);
    setUsedDirectly(false);
  }

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E9EDF8", marginBottom: 4, marginTop: 0 }}>
        Sub-step 3 of 4 — Return Values: <span style={{ color: "#FFB800" }}>"The Takeaway Counter"</span>
      </h3>
      <p style={{ fontSize: 13, color: "#7B85A8", marginBottom: 12, marginTop: 0 }}>
        World: a takeaway food counter
      </p>

      <Analogy>
        You order (call the function). The kitchen prepares it. It hands your order back to you — that&apos;s the return value. You can eat it immediately, save it, or share it. <code style={{ color: "#A78BFA" }}>void</code> functions deliver a message but don&apos;t hand anything back.
      </Analogy>

      {/* Two side-by-side demo panels */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        {/* void demo */}
        <div style={{ flex: "1 1 180px", background: "rgba(255,95,110,.06)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#FF5F6E", fontWeight: 700, marginBottom: 8 }}>
            void greet() — no tray back
          </div>
          <div style={{ padding: "10px 12px", background: "#0D1117", borderRadius: 7, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#E9EDF8", marginBottom: 8 }}>
            &gt; Hello! 👋
          </div>
          <div style={{ fontSize: 12, color: "#7B85A8" }}>
            The message prints, but nothing slides back to store or use.
          </div>
        </div>

        {/* int demo */}
        <div style={{ flex: "1 1 180px", background: "rgba(0,217,192,.06)", border: "1px solid rgba(0,217,192,.22)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#00D9C0", fontWeight: 700, marginBottom: 8 }}>
            int addNumbers() — tray slides back
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center" }}>
            <input
              type="number"
              value={numA}
              onChange={(e) => { setNumA(Number(e.target.value)); setResult(null); }}
              style={{ width: 54, padding: "5px 8px", background: "#0D1117", border: "1px solid rgba(0,217,192,.3)", borderRadius: 6, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 13 }}
            />
            <span style={{ color: "#7B85A8", fontWeight: 700 }}>+</span>
            <input
              type="number"
              value={numB}
              onChange={(e) => { setNumB(Number(e.target.value)); setResult(null); }}
              style={{ width: 54, padding: "5px 8px", background: "#0D1117", border: "1px solid rgba(0,217,192,.3)", borderRadius: 6, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 13 }}
            />
            <button
              onClick={addThem}
              style={{ padding: "5px 12px", background: "#00D9C0", color: "#003838", borderRadius: 7, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}
            >
              Add
            </button>
          </div>

          {result !== null && (
            <div>
              <div style={{ padding: "8px 12px", background: "rgba(255,184,0,.12)", border: "1px solid rgba(255,184,0,.35)", borderRadius: 7, fontFamily: "'Courier New',monospace", fontSize: 14, color: "#FFB800", fontWeight: 700, marginBottom: 8, textAlign: "center" as const }}>
                🎁 Tray returns: {result}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setStored(true)}
                  style={{ flex: 1, padding: "5px 0", background: stored ? "rgba(167,139,250,.2)" : "rgba(167,139,250,.08)", border: "1px solid rgba(167,139,250,.35)", borderRadius: 6, color: "#A78BFA", fontFamily: "'Courier New',monospace", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                >
                  Store it
                </button>
                <button
                  onClick={() => setUsedDirectly(true)}
                  style={{ flex: 1, padding: "5px 0", background: usedDirectly ? "rgba(0,217,192,.2)" : "rgba(0,217,192,.08)", border: "1px solid rgba(0,217,192,.3)", borderRadius: 6, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontSize: 10, fontWeight: 700, cursor: "pointer" }}
                >
                  Use directly
                </button>
              </div>
              {stored && (
                <div style={{ marginTop: 8, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#A78BFA", padding: "6px 10px", background: "rgba(167,139,250,.08)", borderRadius: 6 }}>
                  int result = {result};
                </div>
              )}
              {usedDirectly && (
                <div style={{ marginTop: 6, fontFamily: "'Courier New',monospace", fontSize: 12, color: "#00D9C0", padding: "6px 10px", background: "rgba(0,217,192,.06)", borderRadius: 6 }}>
                  printf(&quot;Total: %d&quot;, {result});
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <CodeBlock
        label="C Code — void vs int return"
        code={`// void: delivers, hands nothing back
void greet() {
    printf("Hello!\\n");
}  // nothing comes back

// int: hands back a value
int addNumbers(int a, int b) {
    return a + b;  // slides the result back
}

int result = addNumbers(3, 7);  // result = 10
printf("Total: %d\\n", result);`}
      />

      <ConceptLock>
        <code style={{ color: "#00D9C0" }}>return</code> sends a value back to whoever called the function, then immediately stops the function. The returned value can be stored in a variable or used directly.
      </ConceptLock>

      <Gotcha>
        A function declared as <code>int</code> MUST return an <code>int</code>. Reaching the end without <code>return</code> gives undefined behaviour — the &quot;kitchen&quot; walks away without handing back the order.
      </Gotcha>
    </div>
  );
}

// ─── Sub-step 3: Scope — "Variables Only Live in Their Kitchen" ───────────────

function ScopeStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [flourA, setFlourA] = useState(0);
  const [flourB, setFlourB] = useState(0);
  const [globalFlour, setGlobalFlour] = useState(100);

  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E9EDF8", marginBottom: 4, marginTop: 0 }}>
        Sub-step 4 of 4 — Scope: <span style={{ color: "#FFB800" }}>"Variables Only Live in Their Kitchen"</span>
      </h3>
      <p style={{ fontSize: 13, color: "#7B85A8", marginBottom: 12, marginTop: 0 }}>
        World: two separate restaurant kitchens
      </p>

      <Analogy>
        The flour in Kitchen A doesn&apos;t affect Kitchen B, even if both call it &quot;flour.&quot; Variables inside a function exist ONLY while that function runs, then they vanish. Two functions can have the same variable name — they&apos;re completely separate.
      </Analogy>

      {/* Global shelf */}
      <div style={{ background: "rgba(167,139,250,.08)", border: "1px solid rgba(167,139,250,.3)", borderRadius: 10, padding: 14, marginBottom: 12, textAlign: "center" as const }}>
        <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#A78BFA", fontWeight: 700, marginBottom: 8 }}>
          🌐 Global Shelf — Both kitchens can see this
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#A78BFA", fontFamily: "'Courier New',monospace", marginBottom: 10 }}>
          globalFlour = {globalFlour}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button
            onClick={() => setGlobalFlour((g) => g + 10)}
            style={{ padding: "6px 16px", background: "rgba(167,139,250,.15)", border: "1px solid rgba(167,139,250,.4)", borderRadius: 7, color: "#A78BFA", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}
          >
            +10
          </button>
          <button
            onClick={() => setGlobalFlour((g) => Math.max(0, g - 10))}
            style={{ padding: "6px 16px", background: "rgba(167,139,250,.15)", border: "1px solid rgba(167,139,250,.4)", borderRadius: 7, color: "#A78BFA", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}
          >
            −10
          </button>
        </div>
      </div>

      {/* Two kitchens */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
        {/* Kitchen A */}
        <div style={{ flex: "1 1 180px", background: "rgba(0,217,192,.06)", border: "1px solid rgba(0,217,192,.22)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#00D9C0", fontWeight: 700, marginBottom: 10 }}>
            🍳 Kitchen A — kitchenA()
          </div>
          <div style={{ padding: "10px 12px", background: "#0D1117", borderRadius: 7, marginBottom: 10 }}>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, color: "#7B85A8", marginBottom: 4 }}>local flour (A only):</div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 22, fontWeight: 700, color: "#00D9C0" }}>{flourA}</div>
          </div>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, color: "#7B85A8", marginBottom: 6 }}>
            Sees globalFlour: <span style={{ color: "#A78BFA" }}>{globalFlour}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setFlourA((f) => f + 5)}
              style={{ flex: 1, padding: "6px 0", background: "rgba(0,217,192,.1)", border: "1px solid rgba(0,217,192,.3)", borderRadius: 6, color: "#00D9C0", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}
            >
              +5 flour
            </button>
            <button
              onClick={() => setFlourA(0)}
              style={{ padding: "6px 10px", background: "transparent", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "#7B85A8", fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
            >
              reset
            </button>
          </div>
        </div>

        {/* Kitchen B */}
        <div style={{ flex: "1 1 180px", background: "rgba(255,95,110,.06)", border: "1px solid rgba(255,95,110,.22)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase" as const, color: "#FF5F6E", fontWeight: 700, marginBottom: 10 }}>
            🍳 Kitchen B — kitchenB()
          </div>
          <div style={{ padding: "10px 12px", background: "#0D1117", borderRadius: 7, marginBottom: 10 }}>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, color: "#7B85A8", marginBottom: 4 }}>local flour (B only):</div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: 22, fontWeight: 700, color: "#FF5F6E" }}>{flourB}</div>
          </div>
          <div style={{ fontFamily: "'Courier New',monospace", fontSize: 11, color: "#7B85A8", marginBottom: 6 }}>
            Sees globalFlour: <span style={{ color: "#A78BFA" }}>{globalFlour}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => setFlourB((f) => f + 5)}
              style={{ flex: 1, padding: "6px 0", background: "rgba(255,95,110,.1)", border: "1px solid rgba(255,95,110,.3)", borderRadius: 6, color: "#FF5F6E", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}
            >
              +5 flour
            </button>
            <button
              onClick={() => setFlourB(0)}
              style={{ padding: "6px 10px", background: "transparent", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "#7B85A8", fontFamily: "'Courier New',monospace", fontSize: 11, cursor: "pointer" }}
            >
              reset
            </button>
          </div>
        </div>
      </div>

      {flourA !== flourB && (flourA > 0 || flourB > 0) && (
        <div style={{ padding: "8px 14px", background: "rgba(0,217,192,.08)", border: "1px solid rgba(0,217,192,.2)", borderRadius: 8, fontSize: 12.5, color: "#00D9C0", marginBottom: 12 }}>
          ✅ Kitchen A has {flourA} local flour, Kitchen B has {flourB} — completely independent!
        </div>
      )}

      <CodeBlock
        label="C Code — Local vs global scope"
        code={`int globalFlour = 100;  // shared — both kitchens see this

void kitchenA() {
    int flour = 50;         // local to kitchenA only
    globalFlour -= 10;      // can read/change the global
    printf("A's flour: %d\\n", flour);
}

void kitchenB() {
    int flour = 30;         // completely separate from kitchenA's flour
    printf("B's flour: %d\\n", flour);
}
// kitchenA's "flour" and kitchenB's "flour" never interfere`}
      />

      <ConceptLock>
        Variables declared inside a function can&apos;t be seen or used outside it. They&apos;re created when the function starts and destroyed when it ends. This is called <strong>scope</strong>.
      </ConceptLock>

      <Gotcha>
        A local variable and a global variable can have the same name. Inside the function, the local one &quot;shadows&quot; the global — the global is unchanged. This is a sneaky source of bugs.
      </Gotcha>

      <button
        onClick={() => onComplete(60)}
        style={{ marginTop: 8, padding: "11px 28px", background: "linear-gradient(135deg,#00D9C0,#A78BFA)", color: "#fff", borderRadius: 9, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: ".05em" }}
      >
        🎉 COMPLETE — Claim 60 XP
      </button>
    </div>
  );
}

// ─── Main exported component ─────────────────────────────────────────────────

interface Props {
  onComplete: (xp: number) => void;
}

export default function SectionFunctions({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);
  const steps = ["Recipe Card", "Ingredients", "Takeaway Counter", "The Kitchens"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Step tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setSubStep(i)}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              border: `1px solid ${subStep === i ? "#00D9C0" : "rgba(255,255,255,0.10)"}`,
              background: subStep === i ? "rgba(0,217,192,.12)" : "transparent",
              color: subStep === i ? "#00D9C0" : "#7B85A8",
              fontFamily: "'Courier New',monospace",
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div style={{ background: "rgba(24,29,46,0.85)", border: "1px solid rgba(255,255,255,0.065)", borderRadius: 14, padding: 20 }}>
        {subStep === 0 && <RecipeStep />}
        {subStep === 1 && <ParamsStep />}
        {subStep === 2 && <ReturnStep />}
        {subStep === 3 && <ScopeStep onComplete={onComplete} />}

        {subStep < 3 && (
          <button
            onClick={() => setSubStep(subStep + 1)}
            style={{ marginTop: 16, padding: "10px 24px", background: "#00D9C0", color: "#003838", borderRadius: 9, border: "none", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
          >
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
