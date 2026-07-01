"use client";

import React, { useState } from "react";

interface RobotSimProps {
  onComplete: (xpAward: number) => void;
}

export default function RobotSim({ onComplete }: RobotSimProps) {
  // Robot configuration states
  const [positionX, setPositionX] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [glowColor, setGlowColor] = useState<string>("#00daf3"); // Default cyan
  
  // Console logging states
  const [logs, setLogs] = useState<string[]>(["Robot terminal initialized.", "Awaiting commands..."]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  
  // Track tasks completed
  const [tasksDone, setTasksDone] = useState<Set<string>>(new Set());

  // Command button triggers
  const executeWalkCommand = () => {
    if (isRunning || showPrompt) return;
    setIsRunning(true);
    setLogs((prev) => [...prev, '> printf("WALK 3");', "Sending instruction to motors..."]);
    
    setTimeout(() => {
      setIsRunning(false);
      setPositionX((prev) => (prev >= 60 ? 0 : prev + 30));
      setLogs((prev) => [...prev, "Motor feedback: Walked 3 steps successfully."]);
      
      const newTasks = new Set(tasksDone);
      newTasks.add("walk");
      setTasksDone(newTasks);
      checkCompletion(newTasks);
    }, 1200);
  };

  const executeSpinCommand = () => {
    if (isRunning || showPrompt) return;
    setIsRunning(true);
    setLogs((prev) => [...prev, '> printf("SPIN");', "Triggering gyroscopes..."]);
    
    setTimeout(() => {
      setIsRunning(false);
      setRotation((prev) => prev + 360);
      setLogs((prev) => [...prev, "Gyroscopes feedback: Finished 360° spin."]);
      
      const newTasks = new Set(tasksDone);
      newTasks.add("spin");
      setTasksDone(newTasks);
      checkCompletion(newTasks);
    }, 1200);
  };

  const executeScanfCommand = () => {
    if (isRunning || showPrompt) return;
    setShowPrompt(true);
    setLogs((prev) => [...prev, '> scanf("%s", color);', "Awaiting terminal keyboard input..."]);
  };

  // Submit scanf keyboard text
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const colorVal = userInput.trim().toLowerCase();
    let verifiedColor = "#00daf3"; // Default cyan
    
    if (colorVal === "red") verifiedColor = "#ff4d4d";
    else if (colorVal === "green") verifiedColor = "#4dff4d";
    else if (colorVal === "yellow") verifiedColor = "#ffff4d";
    else if (colorVal === "purple") verifiedColor = "#dab9ff";
    else if (colorVal === "cyan") verifiedColor = "#00daf3";
    else {
      // Custom color fallback
      verifiedColor = colorVal;
    }

    setLogs((prev) => [...prev, `Input received: "${userInput}"`, "Setting core chest glow variable..."]);
    setShowPrompt(false);
    setUserInput("");
    setIsRunning(true);

    setTimeout(() => {
      setIsRunning(false);
      setGlowColor(verifiedColor);
      setLogs((prev) => [...prev, `Variable updated! Chest glow color set to ${colorVal.toUpperCase()}.`]);
      
      const newTasks = new Set(tasksDone);
      newTasks.add("color");
      setTasksDone(newTasks);
      checkCompletion(newTasks);
    }, 1000);
  };

  // Check all tasks
  const checkCompletion = (tasks: Set<string>) => {
    if (tasks.has("walk") && tasks.has("spin") && tasks.has("color")) {
      onComplete(10); // Award 10 XP
    }
  };

  // Reset simulation
  const resetSim = () => {
    setPositionX(0);
    setRotation(0);
    setGlowColor("#00daf3");
    setLogs(["Robot terminal initialized.", "Awaiting commands..."]);
    setIsRunning(false);
    setShowPrompt(false);
    setUserInput("");
    setTasksDone(new Set());
  };

  return (
    <section className="glass-panel p-4 rounded-xl space-y-6 border border-white/5">
      <div className="space-y-1">
        <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary" data-icon="terminal">
            terminal
          </span>
          I/O Code-a-Robot
        </h3>
        <p className="text-label-sm font-label-sm text-on-surface-variant">
          Use standard C output (`printf`) to command the robot or input (`scanf`) to configure it.
        </p>
      </div>

      {/* Visual Simulation Grid split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Side: Robot grid viewport */}
        <div className="h-44 bg-surface-container-lowest border border-white/5 rounded-xl relative overflow-hidden flex items-end justify-start p-4">
          
          {/* Animated Floor grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

          {/* SVG Robot container */}
          <div
            className="w-16 h-20 transition-all duration-1000 ease-out flex flex-col items-center justify-end"
            style={{
              transform: `translateX(${positionX}px) rotate(${rotation}deg)`,
            }}
          >
            {/* Robot Head */}
            <div className="w-8 h-6 bg-surface-container-high border-2 border-white/20 rounded-md relative flex items-center justify-around px-1">
              <div className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-primary-fixed-dim rounded-full animate-pulse"></div>
              {/* Antenna */}
              <div className="absolute -top-2 left-3 w-1 h-2.5 bg-white/30 rounded-t-full">
                <div className="w-2.5 h-2.5 bg-secondary absolute -top-1 -left-[3px] rounded-full animate-ping"></div>
              </div>
            </div>
            
            {/* Robot Body */}
            <div className="w-10 h-10 bg-surface-bright border-2 border-white/20 rounded-lg mt-0.5 flex items-center justify-center relative">
              {/* Variable color glowing chest */}
              <div
                className="w-4 h-4 rounded-full transition-colors duration-500 shadow-lg"
                style={{
                  backgroundColor: glowColor,
                  boxShadow: `0 0 10px ${glowColor}`,
                }}
              ></div>
            </div>

            {/* Robot Feet */}
            <div className="flex gap-2.5 mt-0.5">
              <div className="w-2.5 h-2 bg-surface-container-highest rounded-t-full"></div>
              <div className="w-2.5 h-2 bg-surface-container-highest rounded-t-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Log terminal output */}
        <div className="h-44 bg-black/40 border border-white/5 rounded-xl p-3 flex flex-col justify-between font-mono text-[11px]">
          <div className="overflow-y-auto space-y-1 pr-1 flex-1">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.startsWith(">")
                    ? "text-secondary font-bold"
                    : log.includes("Error")
                    ? "text-error"
                    : "text-primary-fixed-dim/80"
                }
              >
                {log}
              </div>
            ))}
            {isRunning && (
              <div className="text-outline-variant flex items-center gap-1.5">
                <span className="animate-spin w-2.5 h-2.5 border border-white/40 border-t-transparent rounded-full"></span>
                <span>Running robot instructions...</span>
              </div>
            )}
          </div>

          {/* Interactive Keyboard input panel for Scanf */}
          {showPrompt && (
            <form onSubmit={handlePromptSubmit} className="mt-2 border-t border-white/10 pt-2 flex gap-1.5">
              <span className="text-secondary select-none">$ color:</span>
              <input
                type="text"
                autoFocus
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="red, green, purple, yellow, cyan..."
                className="bg-transparent border-b border-primary text-primary focus:outline-none flex-1 font-mono text-[11px]"
              />
              <button
                type="submit"
                className="px-2 py-0.5 bg-primary text-on-primary rounded text-[10px] font-bold cursor-pointer hover:bg-primary-container"
              >
                SEND
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Button commands pool */}
      <div className="space-y-3">
        <span className="text-[10px] font-label-sm text-on-surface-variant uppercase tracking-wider block">
          Instruction Controller
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={executeWalkCommand}
            disabled={isRunning || showPrompt}
            className={`p-3 bg-surface-container-high border rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer text-left flex items-center justify-between active:scale-95 ${
              tasksDone.has("walk") ? "border-primary/40 text-primary-fixed-dim" : "border-white/10 text-on-surface"
            }`}
          >
            <div>
              <span className="font-bold font-code-md block text-xs">printf(&quot;WALK&quot;);</span>
              <span className="text-[9px] text-on-surface-variant/80 font-mono">Walk 3 Grid Spaces</span>
            </div>
            {tasksDone.has("walk") && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
          </button>

          <button
            onClick={executeSpinCommand}
            disabled={isRunning || showPrompt}
            className={`p-3 bg-surface-container-high border rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer text-left flex items-center justify-between active:scale-95 ${
              tasksDone.has("spin") ? "border-primary/40 text-primary-fixed-dim" : "border-white/10 text-on-surface"
            }`}
          >
            <div>
              <span className="font-bold font-code-md block text-xs">printf(&quot;SPIN&quot;);</span>
              <span className="text-[9px] text-on-surface-variant/80 font-mono">Perform 360° Gyro Rotation</span>
            </div>
            {tasksDone.has("spin") && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
          </button>

          <button
            onClick={executeScanfCommand}
            disabled={isRunning || showPrompt}
            className={`p-3 bg-surface-container-high border rounded-xl hover:bg-surface-container-highest transition-all cursor-pointer text-left flex items-center justify-between active:scale-95 ${
              tasksDone.has("color") ? "border-primary/40 text-primary-fixed-dim" : "border-white/10 text-on-surface"
            }`}
          >
            <div>
              <span className="font-bold font-code-md block text-xs">scanf(&quot;%s&quot;, color);</span>
              <span className="text-[9px] text-on-surface-variant/80 font-mono">Input Color Settings</span>
            </div>
            {tasksDone.has("color") && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
          </button>
        </div>
      </div>

      {/* Finished view indicator */}
      {tasksDone.size === 3 && (
        <div className="p-4 bg-primary-container/10 border border-primary/20 rounded-xl flex items-center justify-between text-xs text-primary-fixed-dim animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            <div>
              <span className="font-bold block text-sm">C I/O Configured!</span>
              Your input/output functions successfully control the robot&apos;s physical motors and lights.
            </div>
          </div>
          <button
            onClick={resetSim}
            className="px-3.5 py-1.5 border border-primary/30 rounded-lg font-bold hover:bg-primary/25 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}
