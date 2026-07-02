"use client";

import React, { useState } from "react";
import TypeChef from "./TypeChef";
import RamTetris from "./RamTetris";
import ByteSniper from "./ByteSniper";

interface SectionDatatypesProps {
  onComplete: (xpAward: number) => void;
}

export default function SectionDatatypes({ onComplete }: SectionDatatypesProps) {
  // Sub-step: 0 = Basic Types, 1 = Type Chef, 2 = RAM Tetris, 3 = Byte Sniper
  const [subStep, setSubStep] = useState<number>(0);

  const [chefCompleted, setChefCompleted] = useState<boolean>(false);
  const [ramTetrisCompleted, setRamTetrisCompleted] = useState<boolean>(false);
  const [byteSniperCompleted, setByteSniperCompleted] = useState<boolean>(false);

  // Sub-step 0: Active type inspect
  const [selectedType, setSelectedType] = useState<"int" | "float" | "char" | "double">("int");

  // Section completion
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  const handleCompleteSection = () => {
    if (hasCompleted) return;
    setHasCompleted(true);
    onComplete(10); // Award 10 XP
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-step selector */}
      <div className="flex flex-wrap gap-2 justify-between items-center bg-surface-container-low p-2 rounded-lg border border-white/5 text-xs font-mono">
        <button
          onClick={() => setSubStep(0)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            subStep === 0 ? "bg-secondary text-on-secondary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          1. Shape Sorters 🟢
        </button>
        <button
          onClick={() => setSubStep(1)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            subStep === 1 ? "bg-secondary text-on-secondary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          2. Type Chef 🍳
        </button>
        <button
          disabled={!chefCompleted}
          onClick={() => setSubStep(2)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 2 ? "bg-secondary text-on-secondary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          3. RAM Tetris 🧱
        </button>
        <button
          disabled={!ramTetrisCompleted}
          onClick={() => setSubStep(3)}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer disabled:opacity-30 ${
            subStep === 3 ? "bg-secondary text-on-secondary font-bold" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          4. Byte Sniper 🎯
        </button>
      </div>

      {/* SUB-STEP 1: BASIC TYPES & SPECIFIERS */}
      {subStep === 0 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <section className="glass-panel p-4 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">category</span>
              Why Datatypes Exist: Shape Sorters 🟢
            </h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              Computers store different types of data in different shapes. A **datatype** tells the computer what kind of value is being stored, what **shape** of container to build in RAM, and how many spaces (measured in **Bytes**) to reserve.
            </p>
            <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-on-surface-variant/90 leading-relaxed font-sans">
              <span className="text-secondary font-bold font-mono">What is a Byte?</span>
              <br />A **Byte** is a unit of storage space. Think of it like **space slots** in a toy box. Some toys are small and take only 1 slot (like a single sticker), while other toys are big and need 4 or 8 slots (like numbers)!
            </div>
          </section>

          {/* Types grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Left side: Interactive selector buttons */}
            <div className="md:col-span-5 flex flex-col gap-2.5">
              <button
                onClick={() => setSelectedType("int")}
                className={`w-full py-3 px-4 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedType === "int"
                    ? "bg-primary/20 border-primary/40 text-primary-fixed-dim shadow"
                    : "bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>int (4 space slots)</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">%d</span>
              </button>
              <button
                onClick={() => setSelectedType("float")}
                className={`w-full py-3 px-4 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedType === "float"
                    ? "bg-primary/20 border-primary/40 text-primary-fixed-dim shadow"
                    : "bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>float (4 space slots)</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">%f</span>
              </button>
              <button
                onClick={() => setSelectedType("char")}
                className={`w-full py-3 px-4 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedType === "char"
                    ? "bg-primary/20 border-primary/40 text-primary-fixed-dim shadow"
                    : "bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>char (1 space slot)</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">%c</span>
              </button>
              <button
                onClick={() => setSelectedType("double")}
                className={`w-full py-3 px-4 rounded-xl border font-mono text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedType === "double"
                    ? "bg-primary/20 border-primary/40 text-primary-fixed-dim shadow"
                    : "bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span>double (8 space slots)</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">%lf</span>
              </button>
            </div>

            {/* Right side: Type visual details card */}
            <div className="md:col-span-7 glass-panel p-5 rounded-xl flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] font-mono text-on-surface-variant uppercase">Type Specifications</span>
                  <span className="text-xs font-mono font-bold text-secondary">Core Type</span>
                </div>

                {selectedType === "int" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary font-mono">int — Integer</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Used to store **whole numbers** (like whole apples, positive or negative, e.g. `25`, `-10`). No half-eaten pieces allowed! Takes up **4 space slots** (4 Bytes) in memory.
                    </p>
                    <div className="text-xs font-mono bg-white/5 p-2 rounded space-y-1">
                      <div><span className="text-on-surface-variant">Declaration:</span> <code className="text-primary-fixed-dim">int score;</code></div>
                      <div><span className="text-on-surface-variant">Placeholder:</span> <code className="text-secondary font-bold">%d</code> (decimal integer)</div>
                    </div>
                  </div>
                )}

                {selectedType === "float" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary font-mono">float — Floating Point</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Used to store **decimal numbers** (like half-eaten cookies or cups of milk, e.g. `3.14`, `-0.05`). Takes up **4 space slots** (4 Bytes) in memory.
                    </p>
                    <div className="text-xs font-mono bg-white/5 p-2 rounded space-y-1">
                      <div><span className="text-on-surface-variant">Declaration:</span> <code className="text-primary-fixed-dim">float price;</code></div>
                      <div><span className="text-on-surface-variant">Placeholder:</span> <code className="text-secondary font-bold">%f</code> (float decimal)</div>
                    </div>
                  </div>
                )}

                {selectedType === "char" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary font-mono">char — Character</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Holds a **single character sticker** (like `'A'` or `'$'`) inside single quotes. Takes up exactly **1 space slot** (1 Byte) in memory. Under the hood, the computer maps letters to numbers using a translator guide called the **ASCII Table**!
                    </p>
                    <div className="text-xs font-mono bg-white/5 p-2 rounded space-y-1">
                      <div><span className="text-on-surface-variant">Declaration:</span> <code className="text-primary-fixed-dim">char grade;</code></div>
                      <div><span className="text-on-surface-variant">Placeholder:</span> <code className="text-secondary font-bold">%c</code> (character)</div>
                    </div>
                  </div>
                )}

                {selectedType === "double" && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-primary font-mono">double — Double Precision</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      A **larger, super-precise decimal box** (like a massive bucket of water). It takes up **8 space slots** (8 Bytes) in memory, allowing you to store huge decimal numbers with extra accuracy!
                    </p>
                    <div className="text-xs font-mono bg-white/5 p-2 rounded space-y-1">
                      <div><span className="text-on-surface-variant">Declaration:</span> <code className="text-primary-fixed-dim">double ratio;</code></div>
                      <div><span className="text-on-surface-variant">Placeholder:</span> <code className="text-secondary font-bold">%lf</code> (long float)</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next step button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSubStep(1)}
                  className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
                >
                  NEXT: TYPE CHEF 🍳
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* SUB-STEP 2: TYPE CHEF GAME */}
      {subStep === 1 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <TypeChef onComplete={() => setChefCompleted(true)} />

          {chefCompleted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubStep(2)}
                className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
              >
                NEXT: RAM TETRIS 🧱
              </button>
            </div>
          )}

        </div>
      )}

      {/* SUB-STEP 3: RAM TETRIS */}
      {subStep === 2 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <RamTetris onComplete={() => setRamTetrisCompleted(true)} />

          {ramTetrisCompleted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSubStep(3)}
                className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg text-xs hover:bg-primary-container code-glow transition-all active:scale-95 cursor-pointer"
              >
                NEXT: BYTE SNIPER 🎯
              </button>
            </div>
          )}

        </div>
      )}

      {/* SUB-STEP 4: BYTE SNIPER */}
      {subStep === 3 && (
        <div className="space-y-6 animate-fadeIn text-left">
          
          <ByteSniper onComplete={() => setByteSniperCompleted(true)} />

          {byteSniperCompleted && (
            <div className="flex justify-end pt-2">
              <button
                disabled={hasCompleted}
                onClick={handleCompleteSection}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  hasCompleted
                    ? "bg-primary/10 text-primary-fixed-dim border border-primary/30"
                    : "bg-primary text-on-primary hover:bg-primary-container code-glow"
                }`}
              >
                {hasCompleted ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    SECTION COMPLETED
                  </>
                ) : (
                  "COMPLETE SECTION & EARN 10 XP"
                )}
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
