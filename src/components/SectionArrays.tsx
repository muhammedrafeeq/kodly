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

function DeclaringStep() {
  const [values, setValues] = useState(["", "", "", "", ""]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [declared, setDeclared] = useState(false);

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 1 — Declaring: "A Row of School Lockers"</h3>
      <Analogy>
        Imagine a school corridor with 5 numbered lockers in a row — all holding the same type of thing. The array name is the sign at the start of the row. Each locker has a number starting from <strong>0</strong>. <code>scores[0]</code> is the first locker. <code>scores[4]</code> is the last one — <em>not scores[5]</em>, that locker doesn&apos;t exist!
      </Analogy>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:"#7B85A8",marginBottom:8,fontFamily:"'Courier New',monospace"}}>Click a locker number to select it. Type values inside each locker.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap" as const}}>
          {values.map((val, i) => (
            <div key={i} style={{display:"flex",flexDirection:"column" as const,alignItems:"center",gap:6}}>
              <div style={{
                width:64,height:80,borderRadius:8,
                border:`2px solid ${activeIdx===i?"#00D9C0":"rgba(255,255,255,0.15)"}`,
                background:activeIdx===i?"rgba(0,217,192,.10)":"rgba(13,17,23,0.8)",
                display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center",gap:6,
                boxShadow:activeIdx===i?"0 0 12px rgba(0,217,192,.3)":"none",
                transition:"all 0.2s"
              }}>
                <div style={{fontSize:10,color:"#7B85A8",fontFamily:"'Courier New',monospace"}}>scores[{i}]</div>
                <input
                  type="text"
                  value={val}
                  onChange={e => { const v=[...values]; v[i]=e.target.value; setValues(v); }}
                  style={{width:44,textAlign:"center",background:"transparent",border:"1px solid rgba(255,255,255,0.15)",borderRadius:4,color:"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:13,padding:"2px 4px"}}
                  placeholder="?"
                />
              </div>
              <button
                onClick={() => setActiveIdx(i)}
                style={{
                  padding:"2px 10px",borderRadius:6,fontSize:11,fontWeight:700,
                  fontFamily:"'Courier New',monospace",cursor:"pointer",
                  border:`1px solid ${activeIdx===i?"#00D9C0":"rgba(255,255,255,0.12)"}`,
                  background:activeIdx===i?"rgba(0,217,192,.15)":"transparent",
                  color:activeIdx===i?"#00D9C0":"#7B85A8"
                }}
              >{i}</button>
            </div>
          ))}
          <div style={{display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center",gap:6}}>
            <div style={{width:64,height:80,borderRadius:8,border:"2px dashed rgba(255,95,110,.3)",background:"rgba(255,95,110,.05)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:"#FF5F6E",fontSize:20}}>✕</span>
            </div>
            <div style={{fontSize:10,color:"#FF5F6E",fontFamily:"'Courier New',monospace"}}>scores[5]</div>
          </div>
        </div>

        {activeIdx !== null && (
          <div style={{marginTop:12,padding:"8px 14px",background:"rgba(0,217,192,.08)",border:"1px solid rgba(0,217,192,.2)",borderRadius:8}}>
            <span style={{fontFamily:"'Courier New',monospace",color:"#00D9C0",fontSize:13}}>
              scores[{activeIdx}] {values[activeIdx] ? `= ${values[activeIdx]}` : "← selected"}
            </span>
          </div>
        )}

        <button
          onClick={() => setDeclared(true)}
          style={{marginTop:12,padding:"8px 18px",background:declared?"rgba(0,217,192,.15)":"#00D9C0",color:declared?"#00D9C0":"#003838",borderRadius:8,border:declared?"1px solid #00D9C0":"none",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:12,cursor:"pointer"}}
        >
          {declared ? "✓ Array declared!" : "Declare the array"}
        </button>
        {declared && (
          <div style={{marginTop:8,fontFamily:"'Courier New',monospace",fontSize:13,color:"#E9EDF8",padding:"8px 14px",background:"#0D1117",borderRadius:8,border:"1px solid rgba(0,217,192,.2)"}}>
            int scores[5];
          </div>
        )}
      </div>

      <ConceptLock>An array is a fixed-size row of same-type containers with one name. You access each one by its index, starting from 0.</ConceptLock>
      <Gotcha><code>int scores[5]</code> creates indices 0–4. There is NO <code>scores[5]</code>. Accessing it is like opening a locker that doesn&apos;t exist — no warning, just garbage or a crash.</Gotcha>
      <CodeBlock label="array declaration" code={`int scores[5];        // 5 lockers: scores[0] to scores[4]
scores[0] = 95;       // first locker
scores[4] = 78;       // last locker
// scores[5] — DOES NOT EXIST! Never go here.`} />
    </div>
  );
}

function IndexStep() {
  const [pos, setPos] = useState(0);
  const [showOob, setShowOob] = useState(false);
  const arr = [10, 20, 30, 40, 50];

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 2 — Index from 0: "Why the First Locker Is Zero"</h3>
      <Analogy>
        Imagine standing at the entrance and counting <strong>steps</strong> to reach each locker. The first locker needs <strong>0 steps</strong> — you&apos;re already there. That&apos;s index [0]. The second needs 1 step → [1]. Counting starts from where you&apos;re standing, not from 1.
      </Analogy>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:"#7B85A8",marginBottom:10,fontFamily:"'Courier New',monospace"}}>Move the figure along the measuring tape:</div>

        <div style={{position:"relative",marginBottom:16}}>
          <div style={{display:"flex",gap:0,marginBottom:8}}>
            {arr.map((v, i) => (
              <div key={i} style={{
                width:64,height:60,border:`2px solid ${pos===i?"#00D9C0":"rgba(255,255,255,0.12)"}`,
                background:pos===i?"rgba(0,217,192,.12)":"rgba(13,17,23,0.7)",
                display:"flex",flexDirection:"column" as const,alignItems:"center",justifyContent:"center",
                transition:"all 0.2s",borderRadius:i===0?"8px 0 0 8px":i===4?"0 8px 8px 0":"0",
                boxShadow:pos===i?"0 0 10px rgba(0,217,192,.3)":"none"
              }}>
                <div style={{color:pos===i?"#00D9C0":"#7B85A8",fontFamily:"'Courier New',monospace",fontSize:13,fontWeight:700}}>{v}</div>
                <div style={{color:"#4A5070",fontSize:10,fontFamily:"'Courier New',monospace"}}>[{i}]</div>
              </div>
            ))}
            <div style={{
              width:64,height:60,border:"2px dashed rgba(255,95,110,.3)",
              background:"rgba(255,95,110,.05)",
              display:"flex",alignItems:"center",justifyContent:"center",
              borderRadius:"0 8px 8px 0",
              opacity:showOob?1:0.4,transition:"opacity 0.3s"
            }}>
              {showOob ? <span style={{color:"#FF5F6E",fontSize:20}}>💥</span> : <span style={{color:"#FF5F6E",fontSize:11,fontFamily:"'Courier New',monospace"}}>[5]</span>}
            </div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:8}}>
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{width:64,textAlign:"center",fontSize:10,color:"#4A5070",fontFamily:"'Courier New',monospace"}}>{i} step{i!==1?"s":""}</div>
            ))}
          </div>

          <div style={{fontSize:22,textAlign:"left",paddingLeft:(pos*64+22)+"px",transition:"padding-left 0.3s",marginBottom:8}}>🚶</div>
        </div>

        <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap" as const}}>
          <button onClick={() => { setPos(p => Math.max(0,p-1)); setShowOob(false); }} disabled={pos===0} style={{padding:"6px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:pos===0?"#4A5070":"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:11,cursor:pos===0?"not-allowed":"pointer"}}>← Step left</button>
          <button onClick={() => { if(pos<4){setPos(p=>p+1);setShowOob(false);}else{setShowOob(true);} }} style={{padding:"6px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:11,cursor:"pointer"}}>Step right →</button>
          <button onClick={() => { setPos(0); setShowOob(false); }} style={{padding:"6px 14px",borderRadius:7,border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:"#7B85A8",fontFamily:"'Courier New',monospace",fontSize:11,cursor:"pointer"}}>Reset</button>
        </div>

        <div style={{padding:"8px 14px",background:"rgba(0,217,192,.08)",border:"1px solid rgba(0,217,192,.2)",borderRadius:8,fontFamily:"'Courier New',monospace",color:"#00D9C0",fontSize:13}}>
          {showOob ? <span style={{color:"#FF5F6E"}}>arr[5] — OUT OF BOUNDS! ⚠️ Locker doesn&apos;t exist!</span> : `arr[${pos}] = ${arr[pos]}`}
        </div>
      </div>

      <ConceptLock>The first element is always index 0. The last is always <code>(size - 1)</code>. This never changes — all C arrays start at 0.</ConceptLock>
      <Gotcha>Writing <code>array[1]</code> thinking it&apos;s the first element — it&apos;s the SECOND. <code>array[0]</code> is always first.</Gotcha>
      <CodeBlock label="index from 0" code={`int arr[5] = {10, 20, 30, 40, 50};
//            [0]  [1]  [2]  [3]  [4]
printf("%d\\n", arr[0]);  // prints 10 (first)
printf("%d\\n", arr[4]);  // prints 50 (last)
// arr[5] is OUT OF BOUNDS — undefined behaviour`} />
    </div>
  );
}

function LoopsArraysStep() {
  const [lockers, setLockers] = useState([88, 75, 92, 61, 84, 70]);
  const [running, setRunning] = useState(false);
  const [currentI, setCurrentI] = useState<number | null>(null);
  const [runningTotal, setRunningTotal] = useState(0);

  function runInspection() {
    setRunning(true);
    setCurrentI(null);
    setRunningTotal(0);
    let total = 0;
    lockers.forEach((score, i) => {
      setTimeout(() => {
        setCurrentI(i);
        total += score;
        setRunningTotal(total);
        if (i === lockers.length - 1) setTimeout(() => setRunning(false), 600);
      }, i * 700);
    });
  }

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 3 — Loops + Arrays: "The Teacher Checking Every Locker"</h3>
      <Analogy>
        The teacher starts at locker 0, checks it, moves to locker 1... all the way to the last one. She doesn&apos;t teleport randomly. A <strong>for loop</strong> does this perfectly — the counter <strong>IS</strong> the index.
      </Analogy>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:"#7B85A8",marginBottom:8,fontFamily:"'Courier New',monospace"}}>Edit locker scores, then run the inspection:</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap" as const,marginBottom:12}}>
          {lockers.map((score, i) => (
            <div key={i} style={{
              width:60,padding:"8px 4px",borderRadius:8,
              border:`2px solid ${currentI===i?"#00D9C0":"rgba(255,255,255,0.12)"}`,
              background:currentI===i?"rgba(0,217,192,.12)":"rgba(13,17,23,0.7)",
              display:"flex",flexDirection:"column" as const,alignItems:"center",gap:4,
              transition:"all 0.25s",
              boxShadow:currentI===i?"0 0 12px rgba(0,217,192,.35)":"none"
            }}>
              <div style={{fontSize:9,color:"#7B85A8",fontFamily:"'Courier New',monospace"}}>i={i}</div>
              <input
                type="number"
                value={score}
                onChange={e => { const v=[...lockers]; v[i]=Number(e.target.value)||0; setLockers(v); }}
                style={{width:46,textAlign:"center",background:"transparent",border:"1px solid rgba(255,255,255,0.15)",borderRadius:4,color:"#E9EDF8",fontFamily:"'Courier New',monospace",fontSize:13,padding:"2px 0"}}
                disabled={running}
              />
              <div style={{fontSize:9,color:"#4A5070",fontFamily:"'Courier New',monospace"}}>scores[{i}]</div>
            </div>
          ))}
        </div>

        {currentI !== null && (
          <div style={{marginBottom:10,padding:"8px 14px",background:"rgba(0,217,192,.08)",border:"1px solid rgba(0,217,192,.2)",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:12,color:"#E9EDF8"}}>
            <span style={{color:"#00D9C0"}}>i = {currentI}</span> → checking scores[{currentI}] = {lockers[currentI]}
            <span style={{marginLeft:16,color:"#A78BFA"}}>total so far: {runningTotal}</span>
          </div>
        )}

        <div style={{marginBottom:10,display:"flex",gap:6,alignItems:"center"}}>
          <div style={{fontFamily:"'Courier New',monospace",fontSize:12,color:"#E9EDF8",padding:"6px 14px",background:"rgba(0,217,192,.06)",borderRadius:7,border:"1px solid rgba(0,217,192,.15)"}}>
            {`for (i = 0; i < 6; i++)`}
          </div>
          <span style={{color:"#7B85A8",fontSize:12}}>← loop drives the index</span>
        </div>

        <button
          onClick={runInspection}
          disabled={running}
          style={{padding:"8px 20px",background:running?"rgba(0,217,192,.12)":"#00D9C0",color:running?"#00D9C0":"#003838",borderRadius:8,border:running?"1px solid #00D9C0":"none",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:12,cursor:running?"not-allowed":"pointer"}}
        >
          {running ? "🔍 Inspecting..." : "Run inspection"}
        </button>

        {!running && runningTotal > 0 && (
          <div style={{marginTop:10,padding:"8px 14px",background:"rgba(167,139,250,.08)",border:"1px solid rgba(167,139,250,.25)",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:13,color:"#A78BFA"}}>
            Total: {runningTotal}
          </div>
        )}
      </div>

      <ConceptLock>Arrays and for loops are made for each other. The loop counter acts as the index. Always loop from 0 to <code>size - 1</code>.</ConceptLock>
      <Gotcha><code>for (i = 1; i &lt;= size; i++)</code> skips locker 0 and reads past the end. Always start at 0 and use <code>&lt;</code>, not <code>&lt;=</code>.</Gotcha>
      <CodeBlock label="loops + arrays" code={`int scores[5] = {88, 75, 92, 61, 84};
int total = 0;

for (int i = 0; i < 5; i++) {
    total += scores[i];  // i is the index
    printf("Locker %d: %d\\n", i, scores[i]);
}
printf("Total: %d\\n", total);`} />
    </div>
  );
}

function TwoDStep({ onComplete }: { onComplete: (xp: number) => void }) {
  const ROWS = 4, COLS = 5;
  const [selected, setSelected] = useState<[number,number]|null>(null);
  const [filled, setFilled] = useState<number[][]>(Array.from({length:ROWS},()=>Array(COLS).fill(0)));
  const [filling, setFilling] = useState(false);
  const [fillRow, setFillRow] = useState<number|null>(null);
  const [fillCol, setFillCol] = useState<number|null>(null);

  function fillAll() {
    setFilling(true);
    setFilled(Array.from({length:ROWS},()=>Array(COLS).fill(0)));
    const cells: [number,number][] = [];
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) cells.push([r,c]);
    cells.forEach(([r,c],idx) => {
      setTimeout(() => {
        setFillRow(r); setFillCol(c);
        setFilled(prev => {
          const next = prev.map(row=>[...row]);
          next[r][c] = r*COLS+c+1;
          return next;
        });
        if(idx===cells.length-1) setTimeout(()=>{setFilling(false);setFillRow(null);setFillCol(null);},400);
      }, idx*120);
    });
  }

  return (
    <div>
      <h3 style={{color:"#00D9C0",fontFamily:"'Courier New',monospace",fontSize:15,fontWeight:700,marginBottom:12,marginTop:0}}>Sub-step 4 — 2D Arrays: "Cinema Seating"</h3>
      <Analogy>
        "Row 3, Seat 5" → <code>seats[3][5]</code>. Every seat has two coordinates. First number = which row. Second = which seat within that row. Nested loops walk through every row and every seat in order.
      </Analogy>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,color:"#7B85A8",marginBottom:10,fontFamily:"'Courier New',monospace"}}>Click any seat to see its coordinates. Then fill all seats.</div>

        <div style={{display:"flex",flexDirection:"column" as const,gap:6,marginBottom:12}}>
          {Array.from({length:ROWS},(_,r)=>(
            <div key={r} style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{width:16,fontSize:10,color:"#4A5070",fontFamily:"'Courier New',monospace",textAlign:"right"}}>R{r}</div>
              {Array.from({length:COLS},(_,c)=>{
                const isSelected = selected?.[0]===r && selected?.[1]===c;
                const isActive = fillRow===r && fillCol===c;
                const val = filled[r][c];
                return (
                  <div
                    key={c}
                    onClick={() => setSelected([r,c])}
                    style={{
                      width:50,height:40,borderRadius:6,cursor:"pointer",
                      border:`2px solid ${isActive?"#FFB800":isSelected?"#00D9C0":val?"rgba(167,139,250,.4)":"rgba(255,255,255,0.12)"}`,
                      background:isActive?"rgba(255,184,0,.15)":isSelected?"rgba(0,217,192,.12)":val?"rgba(167,139,250,.08)":"rgba(13,17,23,0.7)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"'Courier New',monospace",fontSize:12,
                      color:isActive?"#FFB800":isSelected?"#00D9C0":val?"#A78BFA":"#4A5070",
                      transition:"all 0.15s",fontWeight:700
                    }}
                  >
                    {val||`${r},${c}`}
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{display:"flex",gap:6,marginLeft:22}}>
            {Array.from({length:COLS},(_,c)=><div key={c} style={{width:50,textAlign:"center",fontSize:10,color:"#4A5070",fontFamily:"'Courier New',monospace"}}>C{c}</div>)}
          </div>
        </div>

        {selected && (
          <div style={{marginBottom:10,padding:"8px 14px",background:"rgba(0,217,192,.08)",border:"1px solid rgba(0,217,192,.2)",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:13,color:"#00D9C0"}}>
            seats[{selected[0]}][{selected[1]}] — Row {selected[0]}, Column {selected[1]}
          </div>
        )}

        {filling && fillRow!==null && fillCol!==null && (
          <div style={{marginBottom:10,padding:"8px 14px",background:"rgba(255,184,0,.08)",border:"1px solid rgba(255,184,0,.22)",borderRadius:8,fontFamily:"'Courier New',monospace",fontSize:12,color:"#FFB800"}}>
            row={fillRow}, col={fillCol} → seats[{fillRow}][{fillCol}] = {fillRow*COLS+fillCol+1}
          </div>
        )}

        <button
          onClick={fillAll}
          disabled={filling}
          style={{padding:"8px 20px",background:filling?"rgba(0,217,192,.12)":"#00D9C0",color:filling?"#00D9C0":"#003838",borderRadius:8,border:filling?"1px solid #00D9C0":"none",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:12,cursor:filling?"not-allowed":"pointer",marginBottom:8}}
        >
          {filling ? "Filling seats..." : "Fill all seats"}
        </button>
      </div>

      <ConceptLock>A 2D array is a grid. First index = row, second = column. Use nested loops — one for rows, one for columns — to visit every element.</ConceptLock>
      <Gotcha><code>int grid[3][4]</code> has rows 0-2 and columns 0-3. <code>grid[3][0]</code> and <code>grid[0][4]</code> are both out of bounds.</Gotcha>
      <CodeBlock label="2d arrays" code={`int seats[4][5];  // 4 rows, 5 seats each

for (int row = 0; row < 4; row++) {
    for (int col = 0; col < 5; col++) {
        seats[row][col] = row * 5 + col + 1;
        printf("Row %d Seat %d\\n", row, col);
    }
}`} />

      <button
        onClick={() => onComplete(60)}
        style={{marginTop:8,padding:"11px 28px",background:"linear-gradient(135deg,#00D9C0,#A78BFA)",color:"#0D1117",borderRadius:9,border:"none",fontFamily:"'Courier New',monospace",fontWeight:700,fontSize:13,cursor:"pointer"}}
      >
        Complete Arrays (+60 XP) 🎓
      </button>
    </div>
  );
}

export default function SectionArrays({ onComplete }: Props) {
  const [subStep, setSubStep] = useState(0);
  const steps = ["Row of Lockers", "Index from 0", "Loops + Arrays", "Cinema Grid"];
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
        {subStep===0 && <DeclaringStep />}
        {subStep===1 && <IndexStep />}
        {subStep===2 && <LoopsArraysStep />}
        {subStep===3 && <TwoDStep onComplete={onComplete} />}
        {subStep < 3 && (
          <button onClick={() => setSubStep(subStep+1)} style={{ marginTop:16, padding:"10px 24px", background:"#00D9C0", color:"#003838", borderRadius:9, border:"none", fontFamily:"'Courier New',monospace", fontWeight:700, fontSize:12, cursor:"pointer" }}>
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
