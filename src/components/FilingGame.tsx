"use client";

import React, { useState } from "react";

interface TargetBox {
  id: string;
  name: string;
  type: string;
  address: string;
  expectedValue: string;
  currentValue: string | null;
}

interface ValueItem {
  value: string;
  label: string;
}

interface FilingGameProps {
  onComplete: (xpAward: number) => void;
}

export default function FilingGame({ onComplete }: FilingGameProps) {
  // Variables/Memory Boxes
  const [boxes, setBoxes] = useState<TargetBox[]>([
    { id: "age", name: "age", type: "int", address: "0x001A", expectedValue: "25", currentValue: null },
    { id: "temp", name: "temp", type: "float", address: "0x001B", expectedValue: "98.6", currentValue: null },
    { id: "grade", name: "grade", type: "char", address: "0x001C", expectedValue: "'A'", currentValue: null },
  ]);

  // Available draggable/clickable literal items
  const [items, setItems] = useState<ValueItem[]>([
    { value: "25", label: "25 (Integer)" },
    { value: "98.6", label: "98.6 (Floating Point)" },
    { value: "'A'", label: "'A' (Character)" },
    { value: '"Hello"', label: '"Hello" (String Literal)' }, // Distractor item!
  ]);

  const [selectedItem, setSelectedItem] = useState<ValueItem | null>(null);
  const [errorBoxId, setErrorBoxId] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  // Click handler to select an item
  const handleSelectItem = (item: ValueItem) => {
    if (gameFinished) return;
    setSelectedItem(selectedItem?.value === item.value ? null : item);
  };

  // Click handler for target box
  const handleBoxClick = (box: TargetBox) => {
    if (gameFinished || !selectedItem) return;

    // Check correctness
    if (selectedItem.value === box.expectedValue) {
      // Correct match!
      const updatedBoxes = boxes.map((b) =>
        b.id === box.id ? { ...b, currentValue: selectedItem.value } : b
      );
      setBoxes(updatedBoxes);
      
      // Remove item from choices
      setItems(items.filter((i) => i.value !== selectedItem.value));
      setSelectedItem(null);

      // Check if all correct boxes are completed
      const allComplete = updatedBoxes.every((b) => b.currentValue !== null);
      if (allComplete) {
        setGameFinished(true);
        onComplete(10); // Award 10 XP
      }
    } else {
      // Incorrect match!
      setErrorBoxId(box.id);
      setTimeout(() => setErrorBoxId(null), 800);
    }
  };

  // Reset Game
  const resetGame = () => {
    setBoxes([
      { id: "age", name: "age", type: "int", address: "0x001A", expectedValue: "25", currentValue: null },
      { id: "temp", name: "temp", type: "float", address: "0x001B", expectedValue: "98.6", currentValue: null },
      { id: "grade", name: "grade", type: "char", address: "0x001C", expectedValue: "'A'", currentValue: null },
    ]);
    setItems([
      { value: "25", label: "25 (Integer)" },
      { value: "98.6", label: "98.6 (Floating Point)" },
      { value: "'A'", label: "'A' (Character)" },
      { value: '"Hello"', label: '"Hello" (String Literal)' },
    ]);
    setSelectedItem(null);
    setErrorBoxId(null);
    setGameFinished(false);
  };

  return (
    <section className="glass-panel p-4 rounded-xl space-y-6 border border-white/5">
      <div className="space-y-1">
        <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" data-icon="inventory">
            inventory
          </span>
          Memory Filing Game
        </h3>
        <p className="text-label-sm font-label-sm text-on-surface-variant">
          Click a literal value below, then click the correct memory variable box to allocate it.
        </p>
      </div>

      {/* Memory Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {boxes.map((box) => {
          const hasValue = box.currentValue !== null;
          const isError = errorBoxId === box.id;

          return (
            <div
              key={box.id}
              onClick={() => handleBoxClick(box)}
              className={`border-2 rounded-xl p-4 flex flex-col items-center justify-center min-h-[120px] relative transition-all duration-300 cursor-pointer ${
                hasValue
                  ? "border-primary bg-primary/10 shadow-[0_0_12px_rgba(0,218,243,0.2)]"
                  : isError
                  ? "border-error bg-error/15 animate-shake"
                  : selectedItem
                  ? "border-dashed border-secondary/40 bg-secondary/5 hover:border-secondary hover:bg-secondary/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {/* Address Hex label */}
              <span className="text-[10px] font-label-sm absolute top-2 left-2 text-outline">
                {box.address}
              </span>
              
              {/* Variable declaration header */}
              <div className="text-center space-y-1 mt-2">
                <div className="text-[11px] font-mono text-on-surface-variant">
                  <span className="text-secondary font-bold">{box.type}</span> {box.name};
                </div>
                
                {/* Visual slot */}
                <div className={`mx-auto w-16 h-10 border rounded-md flex items-center justify-center mt-2 transition-all ${
                  hasValue
                    ? "border-solid border-primary bg-primary/20 text-primary-fixed-dim font-bold font-code-md"
                    : "border-dashed border-white/25 text-on-surface-variant/40 text-xs"
                }`}>
                  {hasValue ? box.currentValue : "empty"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Choice values deck */}
      {!gameFinished && (
        <div className="space-y-3">
          <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider block">
            Literal Pool
          </span>
          <div className="flex flex-wrap gap-2.5">
            {items.map((item) => {
              const isSelected = selectedItem?.value === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleSelectItem(item)}
                  className={`px-4 py-2 bg-surface-container-high border rounded-lg font-code-md text-code-md transition-all active:scale-95 cursor-pointer ${
                    isSelected
                      ? "border-secondary bg-secondary-container/30 text-secondary-fixed shadow-[0_0_8px_rgba(218,185,255,0.4)]"
                      : "border-white/10 hover:bg-surface-container-highest text-on-surface"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Finished game panel */}
      {gameFinished && (
        <div className="p-4 bg-primary-container/10 border border-primary/20 rounded-xl flex items-center justify-between text-xs text-primary-fixed-dim animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            <div>
              <span className="font-bold block text-sm">Perfect File!</span>
              All literal values have been stored inside their correct memory locations.
            </div>
          </div>
          <button
            onClick={resetGame}
            className="px-3.5 py-1.5 border border-primary/30 rounded-lg font-bold hover:bg-primary/25 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}
