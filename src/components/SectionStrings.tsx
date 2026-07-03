"use client";
import React, { useState } from "react";

interface Props { onComplete: (xp: number) => void; }

function Analogy({ children }: { children: React.ReactNode }) {
  return <div style={{ background:"rgba(255,184,0,.09)", border:"1px solid rgba(255,184,0,.22)", borderRadius:10, padding:14, display:"flex", gap:10, marginBottom:12 }}><span style={{fontSize:18,flexShrink:0}}>💡</span><div style={{fontSize:13.5,lineHeight:1.65,color:"#E9EDF8"}}>{children}</div></div>;
}
function ConceptLock({ children }: { children: React.ReactNode }) {
  return <div style={{ background:"linear-gradient(135deg,rgba(167,139,250,.12),rgba(0,217,192,.08))", border:"1px solid rgba(167,139,250,.35)", borderRadius:10, padding:"12px 16px", marginBottom:12 }}><div style={{fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:".18em",textTransform:"uppercase" as const,color:"#A78BFA",fontWeight:700,marginBottom:6}}>🔒 Non-Replaceable Concept</div><div style={{fontSize:13.5,fontWeight:600,color:"#E9EDF8",lineHeight:1.6}}>{children}</div></div>;
}
function Gotcha({ children }: { children: React.ReactNode }) {
  return <div style={{ background:"rgba(255,95,110,.09)", border:"1px solid rgba(255,95,110,.22)", borderRadius:10, padding:12, display:"flex", gap:8, marginBottom:12 }}><span style={{flexShrink:0}}>⚠️</span><div style={{fontSize:12.5,lineHeight:1.55,color:"#E9EDF8"}}>{children}</div></div>;
}
function CodeBlock({ label, code }: { label:string; code:string }) {
  return <div style={{ border:"1px solid rgba(0,218,243,.18)", borderRadius:10, overflow:"hidden", marginBottom:12 }}><div style={{padding:"6px 14px",background:"rgba(0,218,243,.08)",color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:9,letterSpacing:".16em",textTransform:"uppercase" as const,fontWeight:700}}>{label}</div><pre style={{padding:16,background:"#0D1117",fontFamily:"'Courier New',monospace",fontSize:12.5,lineHeight:1.7,margin:0,overflowX:"auto" as const,color:"#E9EDF8"}}>{code}</pre></div>;
}

function BeadNecklaceStep() {
  const [word, setWord] = useState("hello");
  const [selectedBead, setSelectedBead] = useState<number|null>(null);
  const [clasp, setClasp] = useState(true);
  const FAKE_CHARS = ["#","$","%","@","!","?","&","*","~"];

  const letters = word.slice(0, 8).split("");

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 1 — char Arrays + Null Terminator: "A Bead Necklace"</h3>
      <Analogy>
        Each bead holds one letter. C doesn&apos;t have a magic "word" type — a string is just a row of <strong>char</strong> values. At the end there&apos;s always a special invisible bead: <code>&apos;\0&apos;</code> (a zero, called null terminator). This is the <strong>clasp</strong>. Without it, C keeps reading past your word into random memory.
      </Analogy>

      <div style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <label style={{fontSize:12,color:"#7B85A8",fontFamily:"'Courier New',monospace"}}>Type a word:</label>
          <input
            type="text"
            value={word}
            maxLength={8}
            onChange={e => { setWord(e.target.value.replace(/[^a-zA-Z]/g,"")); setSelectedBead(null); }}
            style={{padding:"5px 10px",background:"rgba(13,17,23,0.8)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:6,color:"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:14,width:120}}
          />
          <span style={{fontSize:11,color:"#4A5070",fontFamily:"'Courier New',monospace"}}>(max 8 chars)</span>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,flexWrap:"wrap" as const}}>
          {letters.map((ch, i) => (
            <React.Fragment key={i}>
              {i>0 && <div style={{width:8,height:2,background:"rgba(255,255,255,0.1)",borderRadius:1}}/>}
              <div
                onClick={() => setSelectedBead(selectedBead===i?null:i)}
                style={{
                  width:46,height:46,borderRadius:"50%",cursor:"pointer",
                  border:`2px solid ${selectedBead===i?"#00D9C0":"rgba(167,139,250,.4)"}`,
                  background:selectedBead===i?"rgba(0,217,192,.15)":"rgba(167,139,250,.08)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontFamily:"'Courier New',monospace",fontSize:18,fontWeight:700,
                  color:selectedBead===i?"#00D9C0":"#E9EDF8",
                  transition:"all 0.2s",
                  boxShadow:selectedBead===i?"0 0 10px rgba(0,217,192,.3)":"none"
                }}
              >
                {ch}
              </div>
            </React.Fragment>
          ))}

          {letters.length > 0 && <div style={{width:8,height:2,background:"rgba(255,255,255,0.1)",borderRadius:1}}/>}

          {clasp ? (
            <div
              onClick={() => setSelectedBead(null)}
              style={{
                width:46,height:46,borderRadius:"50%",
                border:"2px solid rgba(255,255,255,0.2)",
                background:"rgba(74,80,112,.2)",
                display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center",gap:1
              }}
            >
              <span style={{fontFamily:"'Courier New',monospace",fontSize:9,fontWeight:700,color:"#4A5070"}}>{'\\0'}</span>
              <span style={{fontSize:9,color:"#4A5070"}}>clasp</span>
            </div>
          ) : (
            FAKE_CHARS.slice(0,4).map((fc,i)=>(
              <React.Fragment key={i}>
                <div style={{width:8,height:2,background:"rgba(255,95,110,0.2)",borderRadius:1}}/>
                <div style={{width:46,height:46,borderRadius:"50%",border:"2px solid rgba(255,95,110,.4)",background:"rgba(255,95,110,.08)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Courier New',monospace",fontSize:18,fontWeight:700,color:"#FF5F6E"}}>
                  {fc}
                </div>
              </React.Fragment>
            ))
          )}
        </div>

        {selectedBead !== null && (
          <div style={{marginBottom:10,padding:"8px 14px",background:"rgba(0,217,192,.08)",border:"1px solid rgba(0,217,192,.2)",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:13,color:"#00D9C0"}}>
            word[{selectedBead}] = &apos;{letters[selectedBead]}&apos;
          </div>
        )}

        <div style={{marginBottom:10,padding:"8px 14px",background:"rgba(167,139,250,.08)",border:"1px solid rgba(167,139,250,.25)",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:12,color:"#A78BFA"}}>
          char word[{letters.length+1}] = &quot;{letters.join("")}&quot;;  — needs {letters.length} letters + 1 for &apos;\0&apos;
        </div>

        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button
            onClick={() => setClasp(!clasp)}
            style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${clasp?"rgba(255,95,110,.4)":"rgba(0,217,192,.4)"}`,background:clasp?"rgba(255,95,110,.08)":"rgba(0,217,192,.08)",color:clasp?"#FF5F6E":"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:11,cursor:"pointer",fontWeight:700}}
          >
            {clasp ? "Remove clasp (\\0)" : "Restore clasp (\\0)"}
          </button>
          {!clasp && <span style={{fontSize:12,color:"#FF5F6E"}}>⚠️ C keeps reading into random memory!</span>}
        </div>
      </div>

      <ConceptLock>Every C string ends with <code>&apos;\0&apos;</code>. C uses this to know where the string stops. <code>&quot;hello&quot;</code> is actually 6 characters: h, e, l, l, o, \0. Always declare the array 1 bigger than the word.</ConceptLock>
      <Gotcha><code>char name[5] = &quot;hello&quot;</code> — no room for <code>&apos;\0&apos;</code>. The array needs 6 slots. Forgetting the null terminator causes undefined behaviour.</Gotcha>
      <CodeBlock label="char array + null terminator" code={`char name[6] = "hello";
//  name[0]='h' name[1]='e' name[2]='l'
//  name[3]='l' name[4]='o' name[5]='\\0'  ← the clasp

printf("%s\\n", name);  // C reads until it hits '\\0'`} />
    </div>
  );
}

type ToolAction = "COUNT" | "COPY" | "JOIN" | "COMPARE" | null;

function WorkshopStep() {
  const [wordA, setWordA] = useState("hello");
  const [wordB, setWordB] = useState("world");
  const [action, setAction] = useState<ToolAction>(null);

  const tools: { key: ToolAction; label: string; color: string; bg: string; border: string }[] = [
    { key:"COUNT", label:"COUNT (strlen)", color:"#FFB800", bg:"rgba(255,184,0,.09)", border:"rgba(255,184,0,.3)" },
    { key:"COPY",  label:"COPY (strcpy)",  color:"#00D9C0", bg:"rgba(0,217,192,.09)", border:"rgba(0,217,192,.3)" },
    { key:"JOIN",  label:"JOIN (strcat)",  color:"#A78BFA", bg:"rgba(167,139,250,.09)", border:"rgba(167,139,250,.3)" },
    { key:"COMPARE", label:"COMPARE (strcmp)", color:"#FF5F6E", bg:"rgba(255,95,110,.09)", border:"rgba(255,95,110,.3)" },
  ];

  function renderResult() {
    if (!action) return null;
    const a = wordA.trim() || "hello";
    const b = wordB.trim() || "world";
    switch(action) {
      case "COUNT":
        return (
          <div>
            <div style={{fontSize:13,color:"#E9EDF8",marginBottom:8}}>
              <span style={{fontFamily:"'Courier New',monospace",color:"#FFB800"}}>strlen("{a}")</span> counts {a.length} bead{a.length!==1?"s":""} (not counting the clasp \0).
            </div>
            <div style={{display:"flex",gap:4,flexWrap:"wrap" as const,marginBottom:8}}>
              {a.split("").map((ch,i)=>(
                <div key={i} style={{width:36,height:36,borderRadius:"50%",border:"2px solid rgba(255,184,0,.5)",background:"rgba(255,184,0,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Courier New',monospace",fontSize:14,color:"#FFB800",fontWeight:700}}>{ch}</div>
              ))}
              <div style={{width:36,height:36,borderRadius:"50%",border:"2px solid rgba(255,255,255,.15)",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Courier New',monospace",fontSize:9,color:"#4A5070"}}>\0</div>
            </div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:13,color:"#E9EDF8",padding:"6px 12px",background:"#0D1117",borderRadius:6,border:"1px solid rgba(255,184,0,.2)"}}>
              {`int len = strlen("${a}");  // len = ${a.length}`}
            </div>
          </div>
        );
      case "COPY":
        return (
          <div>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:10}}>
              <div style={{padding:"8px 14px",borderRadius:8,border:"2px solid rgba(0,217,192,.4)",background:"rgba(0,217,192,.08)",fontFamily:"'Courier New',monospace",fontSize:14,color:"#00D9C0"}}>src: &quot;{a}&quot;</div>
              <div style={{fontSize:20,color:"#7B85A8"}}>→</div>
              <div style={{padding:"8px 14px",borderRadius:8,border:"2px solid rgba(0,217,192,.4)",background:"rgba(0,217,192,.08)",fontFamily:"'Courier New',monospace",fontSize:14,color:"#00D9C0"}}>dest: &quot;{a}&quot;</div>
            </div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:13,color:"#E9EDF8",padding:"6px 12px",background:"#0D1117",borderRadius:6,border:"1px solid rgba(0,217,192,.2)"}}>
              {`char dest[20];\nstrcpy(dest, "${a}");  // dest is now "${a}"`}
            </div>
          </div>
        );
      case "JOIN": {
        const joined = a + b;
        return (
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" as const,marginBottom:10}}>
              <div style={{padding:"8px 14px",borderRadius:8,border:"2px solid rgba(167,139,250,.4)",background:"rgba(167,139,250,.08)",fontFamily:"'Courier New',monospace",fontSize:14,color:"#A78BFA"}}>"{a}"</div>
              <div style={{fontSize:18,color:"#7B85A8"}}>+</div>
              <div style={{padding:"8px 14px",borderRadius:8,border:"2px solid rgba(167,139,250,.4)",background:"rgba(167,139,250,.08)",fontFamily:"'Courier New',monospace",fontSize:14,color:"#A78BFA"}}>"{b}"</div>
              <div style={{fontSize:18,color:"#7B85A8"}}>→</div>
              <div style={{padding:"8px 14px",borderRadius:8,border:"2px solid rgba(167,139,250,.6)",background:"rgba(167,139,250,.14)",fontFamily:"'Courier New',monospace",fontSize:14,color:"#A78BFA",fontWeight:700}}>"{joined}"</div>
            </div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:13,color:"#E9EDF8",padding:"6px 12px",background:"#0D1117",borderRadius:6,border:"1px solid rgba(167,139,250,.2)"}}>
              {`char a[40] = "${a}";\nstrcat(a, "${b}");  // a is now "${joined}"`}
            </div>
          </div>
        );
      }
      case "COMPARE": {
        const same = a === b;
        return (
          <div>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:10}}>
              <div style={{padding:"8px 14px",borderRadius:8,border:`2px solid ${same?"rgba(0,217,192,.5)":"rgba(255,95,110,.4)"}`,background:same?"rgba(0,217,192,.08)":"rgba(255,95,110,.08)",fontFamily:"'Courier New',monospace",fontSize:14,color:same?"#00D9C0":"#FF5F6E"}}>"{a}"</div>
              <div style={{fontSize:28}}>{same?"✅":"❌"}</div>
              <div style={{padding:"8px 14px",borderRadius:8,border:`2px solid ${same?"rgba(0,217,192,.5)":"rgba(255,95,110,.4)"}`,background:same?"rgba(0,217,192,.08)":"rgba(255,95,110,.08)",fontFamily:"'Courier New',monospace",fontSize:14,color:same?"#00D9C0":"#FF5F6E"}}>"{b}"</div>
            </div>
            <div style={{marginBottom:8,fontSize:13,color:"#E9EDF8"}}>
              {same ? "Strings are identical — strcmp returns 0" : `Strings differ — strcmp returns non-zero`}
            </div>
            <div style={{fontFamily:"'Courier New',monospace",fontSize:13,color:"#E9EDF8",padding:"6px 12px",background:"#0D1117",borderRadius:6,border:`1px solid rgba(255,95,110,.2)`}}>
              {`int r = strcmp("${a}", "${b}");  // r = ${same?0:"non-zero"}\nif (strcmp("${a}", "${b}") == 0) { /* equal */ }`}
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 2 — String Functions: "Workshop Tools"</h3>
      <Analogy>
        <strong>strlen</strong> — count the beads (not the clasp) &nbsp;|&nbsp;
        <strong>strcpy</strong> — make an exact copy of a necklace &nbsp;|&nbsp;
        <strong>strcat</strong> — clip two necklaces together &nbsp;|&nbsp;
        <strong>strcmp</strong> — check if two necklaces are bead-for-bead identical (returns 0 if equal)
      </Analogy>

      <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap" as const}}>
        <div>
          <div style={{fontSize:11,color:"#7B85A8",fontFamily:"'Courier New',monospace",marginBottom:4}}>Word A:</div>
          <input type="text" value={wordA} onChange={e=>setWordA(e.target.value)} style={{padding:"5px 10px",background:"rgba(13,17,23,0.8)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:6,color:"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:14,width:140}} />
        </div>
        <div>
          <div style={{fontSize:11,color:"#7B85A8",fontFamily:"'Courier New',monospace",marginBottom:4}}>Word B:</div>
          <input type="text" value={wordB} onChange={e=>setWordB(e.target.value)} style={{padding:"5px 10px",background:"rgba(13,17,23,0.8)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:6,color:"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:14,width:140}} />
        </div>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap" as const}}>
        {tools.map(t=>(
          <button key={t.key} onClick={()=>setAction(t.key)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${action===t.key?t.border:"rgba(255,255,255,0.10)"}`,background:action===t.key?t.bg:"transparent",color:action===t.key?t.color:"#7B85A8",fontFamily:"'Courier New',monospace",fontSize:11,fontWeight:700,cursor:"pointer"}}>
            {t.label}
          </button>
        ))}
      </div>

      {action && (
        <div style={{padding:14,background:"rgba(13,17,23,0.7)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,marginBottom:12}}>
          {renderResult()}
        </div>
      )}

      <ConceptLock>Never use <code>=</code> to copy a string (it copies the address, not the letters). Use <code>strcpy</code>. Never use <code>==</code> to compare strings. Use <code>strcmp</code> — it returns 0 when strings are equal.</ConceptLock>
      <Gotcha><code>if (name == &quot;hello&quot;)</code> always fails in C. <code>==</code> compares memory addresses, not letters. Always use <code>strcmp(name, &quot;hello&quot;) == 0</code>.</Gotcha>
      <CodeBlock label="string functions" code={`#include <string.h>

char a[20] = "hello";
char b[20];

int len = strlen(a);       // len = 5
strcpy(b, a);              // b is now "hello"
strcat(a, " world");       // a is now "hello world"
int same = strcmp(a, b);   // non-zero (they differ now)
if (strcmp(b, "hello") == 0) {
    printf("They match!\\n");
}`} />
    </div>
  );
}

type BugState = "hidden" | "revealed" | "fixed";

function SpotBugsStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const [bugStates, setBugStates] = useState<BugState[]>(["hidden","hidden","hidden"]);

  function reveal(i: number) {
    setBugStates(prev => prev.map((s,idx) => idx===i ? (s==="hidden"?"revealed":"fixed") : s));
  }

  const bugs = [
    {
      title:"Bug 1: Array too small",
      buggy:`char name[5] = "hello";`,
      bugHighlight:"name[5]",
      explanation:`"hello" is 5 characters, but you also need room for '\\0'. The array must be at least 6.`,
      fix:`char name[6] = "hello";    // needs 6, not 5`,
    },
    {
      title:"Bug 2: Wrong string comparison",
      buggy:`if (name == "Ali") { ... }`,
      bugHighlight:`name == "Ali"`,
      explanation:`== compares memory addresses in C, not the actual letters. It will almost always be false even when the strings look the same.`,
      fix:`if (strcmp(name, "Ali") == 0) { ... }  // use strcmp`,
    },
    {
      title:"Bug 3: Can't assign strings with =",
      buggy:`char copy[20];\ncopy = name;`,
      bugHighlight:`copy = name`,
      explanation:`You can't copy a string with = in C. It tries to assign a pointer, not copy the characters. Use strcpy instead.`,
      fix:`strcpy(copy, name);        // use strcpy, not =`,
    },
  ];

  const allFixed = bugStates.every(s => s === "fixed");

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 3 — String Gotchas Capstone: "Spot the Bugs"</h3>
      <Analogy>
        A challenge room: spot 3 common C string mistakes. Click "What&apos;s wrong?" on each snippet to reveal the bug and its fix.
      </Analogy>

      <div style={{display:"flex",flexDirection:"column" as const,gap:14,marginBottom:16}}>
        {bugs.map((bug, i) => {
          const state = bugStates[i];
          return (
            <div key={i} style={{borderRadius:10,border:`1px solid ${state==="fixed"?"rgba(0,217,192,.3)":state==="revealed"?"rgba(255,95,110,.3)":"rgba(255,255,255,0.08)"}`,background:"rgba(13,17,23,0.7)",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",background:state==="fixed"?"rgba(0,217,192,.06)":state==="revealed"?"rgba(255,95,110,.06)":"transparent"}}>
                <span style={{fontFamily:"'Courier New',monospace",fontSize:12,fontWeight:700,color:state==="fixed"?"#00D9C0":state==="revealed"?"#FF5F6E":"#7B85A8"}}>{bug.title}</span>
                <button
                  onClick={()=>reveal(i)}
                  style={{padding:"4px 12px",borderRadius:6,border:`1px solid ${state==="fixed"?"rgba(0,217,192,.4)":"rgba(255,95,110,.4)"}`,background:state==="fixed"?"rgba(0,217,192,.1)":"rgba(255,95,110,.1)",color:state==="fixed"?"#00D9C0":"#FF5F6E",fontFamily:"'Courier New',monospace",fontSize:10,fontWeight:700,cursor:"pointer"}}
                >
                  {state==="hidden"?"What's wrong?":state==="revealed"?"Show fix →":"✓ Fixed!"}
                </button>
              </div>

              <div style={{padding:"0 14px 14px"}}>
                <div style={{position:"relative"}}>
                  <pre style={{padding:12,background:"#0D1117",fontFamily:"'Courier New',monospace",fontSize:12.5,lineHeight:1.7,margin:"8px 0",borderRadius:8,border:`1px solid ${state!=="hidden"?"rgba(255,95,110,.3)":"rgba(255,255,255,0.06)"}`,color:"#E9EDF8",overflowX:"auto" as const}}>
                    {bug.buggy.split(bug.bugHighlight).map((part, pi, arr) => (
                      <React.Fragment key={pi}>
                        {part}
                        {pi < arr.length-1 && (
                          <span style={{background:state!=="hidden"?"rgba(255,95,110,.25)":"transparent",borderRadius:3,padding:"1px 2px",transition:"background 0.3s"}}>
                            {bug.bugHighlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </pre>
                </div>

                {state !== "hidden" && (
                  <div style={{marginTop:6,padding:"8px 12px",background:"rgba(255,95,110,.07)",border:"1px solid rgba(255,95,110,.2)",borderRadius:8,fontSize:12.5,color:"#E9EDF8",lineHeight:1.55}}>
                    <span style={{color:"#FF5F6E",fontWeight:700}}>Bug: </span>{bug.explanation}
                  </div>
                )}

                {state === "fixed" && (
                  <div style={{marginTop:8}}>
                    <pre style={{padding:12,background:"rgba(0,217,192,.05)",fontFamily:"'Courier New',monospace",fontSize:12.5,lineHeight:1.7,margin:0,borderRadius:8,border:"1px solid rgba(0,217,192,.25)",color:"#00D9C0",overflowX:"auto" as const}}>
                      {bug.fix}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ConceptLock>Strings in C need special functions. <code>=</code> doesn&apos;t copy. <code>==</code> doesn&apos;t compare. Always size your char array with +1 for the <code>\0</code>.</ConceptLock>
      <CodeBlock label="correct fixes" code={`// Bug 1: too small
char name[6] = "hello";    // needs 6, not 5

// Bug 2: wrong comparison
if (strcmp(name, "Ali") == 0) { ... }  // use strcmp

// Bug 3: can't assign
strcpy(copy, name);        // use strcpy, not =`} />

      <button
        onClick={() => onComplete(55)}
        disabled={!allFixed}
        style={{marginTop:8,padding:"11px 28px",background:allFixed?"linear-gradient(135deg,#00D9C0,#A78BFA)":"rgba(255,255,255,0.07)",color:allFixed?"#0D1117":"#4A5070",borderRadius:9,border:allFixed?"none":"1px solid rgba(255,255,255,0.08)",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:13,cursor:allFixed?"pointer":"not-allowed"}}
      >
        {allFixed ? "Complete Strings (+55 XP) 🎓" : "Fix all bugs to complete →"}
      </button>
    </div>
  );
}

export default function SectionStrings({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);
  const steps = ["Bead Necklace", "Workshop Tools", "Spot the Bugs"];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" as const }}>
        {steps.map((s,i) => (
          <button key={i} onClick={() => setSubStep(i)} style={{ padding:"5px 12px", borderRadius:8, border:`1px solid ${subStep===i?"#00D9C0":"rgba(255,255,255,0.10)"}`, background:subStep===i?"rgba(0,217,192,.12)":"transparent", color:subStep===i?"#00D9C0":"#7B85A8", fontFamily:"'Courier New',monospace", fontSize:10, fontWeight:700, cursor:"pointer" }}>
            {i+1}. {s}
          </button>
        ))}
      </div>
      <div style={{ background:"rgba(24,29,46,0.85)", border:"1px solid rgba(255,255,255,0.065)", borderRadius:14, padding:20 }}>
        {subStep===0 && <BeadNecklaceStep />}
        {subStep===1 && <WorkshopStep />}
        {subStep===2 && <SpotBugsStep onComplete={onComplete} />}
        {subStep < 2 && (
          <button onClick={() => setSubStep(subStep+1)} style={{ marginTop:16, padding:"10px 24px", background:"#00D9C0", color:"#003838", borderRadius:9, border:"none", fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:12, cursor:"pointer" }}>
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
