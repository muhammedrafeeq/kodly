"use client";

import React, { useState, useEffect } from "react";
import SectionVariables from "@/components/SectionVariables";
import SectionDatatypes from "@/components/SectionDatatypes";
import SectionIO from "@/components/SectionIO";
import SectionOperators from "@/components/SectionOperators";
import SectionComments from "@/components/SectionComments";
import SectionIfStatement from "@/components/SectionIfStatement";
import SectionSwitch from "@/components/SectionSwitch";

// Structure for a C Quiz Question
interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const QUIZZES: QuizQuestion[] = [
  {
    question: "In C, which symbol is used to get the memory address of a variable?",
    options: ["*", "&", "%", "#"],
    correct: "&",
    explanation: "The address-of operator (&) returns the memory location address of its operand."
  },
  {
    question: "What is the standard memory size allocated for a double data type?",
    options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"],
    correct: "8 bytes",
    explanation: "A double-precision floating point number occupies 8 bytes (64 bits) in standard modern systems."
  },
  {
    question: "Which placeholder is used in printf to display a single character?",
    options: ["%d", "%f", "%s", "%c"],
    correct: "%c",
    explanation: "%c is the formatting placeholder for character variables, while %d is for integers and %f is for floating points."
  }
];

interface LessonDetail {
  id: string;
  title: string;
  locked: boolean;
}

interface ModuleDetail {
  id: string;
  title: string;
  locked: boolean;
  lessons: LessonDetail[];
}

export default function Home() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"learn" | "practice" | "code" | "stats">("learn");

  // Curriculum Navigation states
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null); // 'lesson_1_1' or null (home)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0); // 0 (Variables), 1 (Datatypes), 2 (I/O)

  // State Management
  const [xp, setXp] = useState<number>(120);
  const [streak, setStreak] = useState<number>(7);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("+50 XP");

  // Locked/unlocked progress tracking
  const [unlockedLessons, setUnlockedLessons] = useState<Set<string>>(new Set(["lesson_1_1"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Code Playground states
  const [playgroundCode, setPlaygroundCode] = useState<string>(
    `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
  );
  const [playgroundConsole, setPlaygroundConsole] = useState<string>("Program executed successfully.");
  const [isConsoleRunning, setIsConsoleRunning] = useState<boolean>(false);

  // Practice tab states
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [practiceCompleted, setPracticeCompleted] = useState<boolean>(false);

  // Activity heatmap grid
  const [activityGrid, setActivityGrid] = useState<number[]>([]);

  // Syllabus configuration
  const modules: ModuleDetail[] = [
    {
      id: "mod_1",
      title: "Module 1: Basics",
      locked: false,
      lessons: [
        { id: "lesson_1_1", title: "Lesson 1: Variables, Datatypes & I/O Operations", locked: false },
        { id: "lesson_1_2", title: "Lesson 2: Operators & Arithmetic", locked: true },
        { id: "lesson_1_3", title: "Lesson 3: Comments & Program Structure", locked: true },
      ],
    },
    {
      id: "mod_2",
      title: "Module 2: Decision Making",
      locked: true,
      lessons: [
        { id: "lesson_2_1", title: "Lesson 1: The if Statement", locked: true },
        { id: "lesson_2_2", title: "Lesson 2: The switch Statement", locked: true },
      ],
    },
  ];

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedXp = localStorage.getItem("kodly_xp");
      const storedStreak = localStorage.getItem("kodly_streak");
      const storedUnlocked = localStorage.getItem("kodly_unlocked");
      const storedCompleted = localStorage.getItem("kodly_completed");

      if (storedXp) setXp(parseInt(storedXp, 10));
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
      if (storedUnlocked) {
        setUnlockedLessons(new Set(JSON.parse(storedUnlocked)));
      }
      if (storedCompleted) {
        setCompletedLessons(new Set(JSON.parse(storedCompleted)));
      }
    }

    // Heatmap calendar grid setup
    const grid = [];
    for (let i = 0; i < 98; i++) {
      grid.push(Math.random() > 0.75 ? Math.floor(Math.random() * 3) + 1 : 0);
    }
    setActivityGrid(grid);
  }, []);

  // Trigger XP helper
  const triggerXP = (amount: number, message: string = "+50 XP") => {
    const nextXp = xp + amount;
    setXp(nextXp);
    setToastMessage(message);
    if (typeof window !== "undefined") {
      localStorage.setItem("kodly_xp", nextXp.toString());
    }
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Click handler to open lesson
  const handleOpenLesson = (lessonId: string) => {
    // Check locked state
    if (!unlockedLessons.has(lessonId) && lessonId !== "lesson_1_1") return;
    setActiveLessonId(lessonId);
    setActiveSectionIndex(0);
  };

  // Dynamic LESSON_SECTIONS map for all lessons
  const LESSON_SECTIONS: Record<string, { label: string; index: number }[]> = {
    lesson_1_1: [
      { label: "Variables", index: 0 },
      { label: "Datatypes", index: 1 },
      { label: "I/O Operations", index: 2 },
    ],
    lesson_1_2: [
      { label: "Arithmetic", index: 0 },
      { label: "Assignment", index: 1 },
      { label: "Increment", index: 2 },
      { label: "Relational", index: 3 },
      { label: "Logical", index: 4 },
      { label: "Precedence", index: 5 },
      { label: "Capstone", index: 6 },
    ],
    lesson_1_3: [
      { label: "Sticky Notes", index: 0 },
      { label: "A Recipe", index: 1 },
      { label: "Baking the Cake", index: 2 },
    ],
    lesson_2_1: [
      { label: "The Bouncer", index: 0 },
      { label: "Two Doors", index: 1 },
      { label: "Mail Slots", index: 2 },
      { label: "Rules in Rules", index: 3 },
      { label: "Capstone", index: 4 },
    ],
    lesson_2_2: [
      { label: "Vending Machine", index: 0 },
      { label: "Falling Dominoes", index: 1 },
      { label: "Capstone", index: 2 },
    ],
  };

  // Complete section helper
  const handleSectionComplete = (xpAward: number) => {
    triggerXP(xpAward, `+${xpAward} XP (Section Complete)`);
    
    const sections = LESSON_SECTIONS[activeLessonId || ""] || [];
    const maxSectionIndex = sections.length - 1;

    // Auto advance or finish lesson
    if (activeSectionIndex < maxSectionIndex) {
      setTimeout(() => {
        setActiveSectionIndex(activeSectionIndex + 1);
      }, 1500);
    } else {
      // Finished all sections of the active lesson!
      setTimeout(() => {
        const nextCompleted = new Set(completedLessons);
        nextCompleted.add(activeLessonId || "");
        setCompletedLessons(nextCompleted);

        const nextUnlocked = new Set(unlockedLessons);
        if (activeLessonId === "lesson_1_1") nextUnlocked.add("lesson_1_2");
        else if (activeLessonId === "lesson_1_2") nextUnlocked.add("lesson_1_3");
        else if (activeLessonId === "lesson_1_3") nextUnlocked.add("lesson_2_1");
        else if (activeLessonId === "lesson_2_1") nextUnlocked.add("lesson_2_2");
        setUnlockedLessons(nextUnlocked);

        if (typeof window !== "undefined") {
          localStorage.setItem("kodly_completed", JSON.stringify(Array.from(nextCompleted)));
          localStorage.setItem("kodly_unlocked", JSON.stringify(Array.from(nextUnlocked)));
        }

        const lessonTitles: Record<string, string> = {
          lesson_1_1: "Lesson 1", lesson_1_2: "Lesson 2", lesson_1_3: "Lesson 3",
          lesson_2_1: "Module 2 — Lesson 1", lesson_2_2: "Module 2 — Lesson 2",
        };
        triggerXP(20, `+20 XP (${lessonTitles[activeLessonId ?? ""] ?? "Lesson"} Completed!)`);
        setActiveLessonId(null); // Back to syllabus homepage
      }, 2000);
    }
  };

  // Run playground code
  const handleRunPlayground = () => {
    setIsConsoleRunning(true);
    setTimeout(() => {
      setIsConsoleRunning(false);
      if (playgroundCode.includes("printf")) {
        const regex = /printf\s*\(\s*"(.*?)"\s*\)/g;
        const match = regex.exec(playgroundCode);
        if (match && match[1]) {
          setPlaygroundConsole(match[1].replace(/\\n/g, "\n") + "\n\nProgram executed successfully.");
        } else {
          setPlaygroundConsole("Program executed successfully.");
        }
      } else {
        setPlaygroundConsole("Program executed successfully.");
      }
      triggerXP(2, "+2 XP (Playground Run)");
    }, 800);
  };

  // Quiz submission
  const handleQuizSubmit = () => {
    if (!selectedQuizOption) return;
    setQuizSubmitted(true);
    const activeQuiz = QUIZZES[currentQuizIndex];
    if (selectedQuizOption === activeQuiz.correct) {
      triggerXP(10, "+10 XP (Correct Answer)");
    }
  };

  const handleNextQuiz = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    if (currentQuizIndex < QUIZZES.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setPracticeCompleted(true);
    }
  };

  return (
    <>
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel" style={{ borderBottom: "1px solid var(--border)", borderTop: "none", borderLeft: "none", borderRight: "none" }}>
        <div className="max-w-5xl mx-auto w-full h-14 px-5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5 select-none">
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(0,217,192,0.14)", border: "1px solid rgba(0,217,192,0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#00D9C0" }}>terminal</span>
            </div>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>
              <span style={{ color: "#A78BFA" }}>Ko</span><span style={{ color: "#00D9C0" }}>dly</span>
            </span>
          </div>
          {/* XP + Streak pills */}
          <div className="flex items-center gap-2">
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "rgba(0,217,192,0.10)", border: "1px solid rgba(0,217,192,0.22)", borderRadius: 99 }}>
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700, color: "#00D9C0", letterSpacing: "0.06em" }}>
                {xp.toLocaleString()} XP
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 11px", background: "rgba(255,184,0,0.10)", border: "1px solid rgba(255,184,0,0.22)", borderRadius: 99 }}>
              <span style={{ fontSize: 12 }}>🔥</span>
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700, color: "#FFB800", letterSpacing: "0.06em" }}>{streak}d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content viewport */}
      <main className="pt-20 pb-32 px-4 space-y-6 max-w-5xl mx-auto w-full">
        
        {/* LEARN VIEW */}
        {activeTab === "learn" && (
          <>
            {/* 1. MODULES CATALOG HOME PAGE VIEW */}
            {activeLessonId === null ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                {/* Left: Module cards with tree-nested lessons */}
                <div className="md:col-span-8 space-y-8">

                  {/* Page heading */}
                  <div style={{ paddingTop: 2 }}>
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00D9C0", fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ display: "inline-block", width: 20, height: 1, background: "#00D9C0", verticalAlign: "middle" }}></span>
                      C Programming · Beginner Path
                    </p>
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: "#E9EDF8", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      Learning Syllabus
                    </h1>
                    <p style={{ fontSize: 13, color: "#7B85A8", marginTop: 6, lineHeight: 1.6 }}>
                      Complete lessons in order. Each concept unlocks the next.
                    </p>
                  </div>

                  {/* Module cards */}
                  {(() => {
                    const modMeta: Record<string, { icon: string; color: string; desc: string }> = {
                      mod_1: { icon: "📦", color: "#00D9C0", desc: "Variables, types, and I/O — everything a program needs to remember and communicate." },
                      mod_2: { icon: "🚦", color: "#A78BFA", desc: "Make programs smart — branch on conditions with if, else if, and switch." },
                    };
                    return modules.map((mod, modIdx) => {
                      const meta = modMeta[mod.id] ?? { icon: "📋", color: "#5EEAD4", desc: "" };
                      const isModLocked = mod.locked &&
                        !(mod.id === "mod_2" ? unlockedLessons.has("lesson_2_1") : unlockedLessons.has("lesson_1_2"));
                      const completedCount = mod.lessons.filter(l => completedLessons.has(l.id)).length;

                      return (
                        <div
                          key={mod.id}
                          style={{
                            background: "rgba(24,29,46,0.88)",
                            border: `1px solid ${isModLocked ? "var(--border)" : `${meta.color}28`}`,
                            borderRadius: 14,
                            overflow: "hidden",
                            opacity: isModLocked ? 0.55 : 1,
                            backdropFilter: "blur(14px)",
                          }}
                        >
                          {/* Module header */}
                          <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${meta.color}18`, border: `1px solid ${meta.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                              {isModLocked ? "🔒" : meta.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9.5, letterSpacing: "0.15em", textTransform: "uppercase", color: isModLocked ? "#4A5070" : meta.color, fontWeight: 700, marginBottom: 3 }}>
                                Module {String(modIdx + 1).padStart(2, "0")} · {isModLocked ? "Locked" : `${completedCount}/${mod.lessons.length} complete`}
                              </p>
                              <h2 style={{ fontSize: 16, fontWeight: 800, color: isModLocked ? "#4A5070" : "#E9EDF8", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
                                {mod.title.replace(/^Module \d+: /, "")}
                              </h2>
                              <p style={{ fontSize: 12.5, color: "#7B85A8", marginTop: 4, lineHeight: 1.55 }}>{meta.desc}</p>
                            </div>
                          </div>

                          {/* Tree-nested lessons */}
                          <div style={{ padding: "8px 20px 12px 20px", position: "relative" }}>
                            {/* Vertical connector line */}
                            <div style={{ position: "absolute", left: 36, top: 16, bottom: 20, width: 1, background: "var(--border)" }} />
                            {mod.lessons.map((lesson, lessonIdx) => {
                              const isLast = lessonIdx === mod.lessons.length - 1;
                              const isLessonUnlocked = unlockedLessons.has(lesson.id) || lesson.id === "lesson_1_1";
                              const isCompleted = completedLessons.has(lesson.id);
                              const sectionCount = (LESSON_SECTIONS[lesson.id] || []).length;

                              return (
                                <div
                                  key={lesson.id}
                                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", position: "relative" }}
                                >
                                  {/* Tree dot */}
                                  <div style={{ width: 32, flexShrink: 0, display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
                                    <div style={{
                                      width: 10, height: 10, borderRadius: 99,
                                      background: isCompleted ? "#00D9C0" : isLessonUnlocked ? `${meta.color}80` : "var(--border)",
                                      border: `2px solid ${isCompleted ? "#00D9C0" : isLessonUnlocked ? meta.color : "#4A5070"}`,
                                    }} />
                                  </div>
                                  {/* Connector arrow symbol */}
                                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#4A5070", flexShrink: 0, userSelect: "none" }}>
                                    {isLast ? "└─" : "├─"}
                                  </span>
                                  {/* Lesson card */}
                                  <div
                                    onClick={() => isLessonUnlocked && handleOpenLesson(lesson.id)}
                                    style={{
                                      flex: 1,
                                      background: isLessonUnlocked ? "rgba(255,255,255,0.03)" : "transparent",
                                      border: `1px solid ${isCompleted ? "rgba(0,217,192,0.30)" : isLessonUnlocked ? "rgba(255,255,255,0.08)" : "transparent"}`,
                                      borderRadius: 9,
                                      padding: "9px 13px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: 8,
                                      cursor: isLessonUnlocked ? "pointer" : "default",
                                      opacity: isLessonUnlocked ? 1 : 0.4,
                                      transition: "all 0.16s ease",
                                    }}
                                    onMouseEnter={e => {
                                      if (isLessonUnlocked) {
                                        (e.currentTarget as HTMLDivElement).style.background = "rgba(0,217,192,0.06)";
                                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,217,192,0.25)";
                                      }
                                    }}
                                    onMouseLeave={e => {
                                      (e.currentTarget as HTMLDivElement).style.background = isLessonUnlocked ? "rgba(255,255,255,0.03)" : "transparent";
                                      (e.currentTarget as HTMLDivElement).style.borderColor = isCompleted ? "rgba(0,217,192,0.30)" : isLessonUnlocked ? "rgba(255,255,255,0.08)" : "transparent";
                                    }}
                                  >
                                    <div>
                                      <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: isLessonUnlocked ? meta.color : "#4A5070", fontWeight: 700, marginBottom: 3 }}>
                                        {isLessonUnlocked ? `Lesson ${lessonIdx + 1}` : "Locked"}{isLessonUnlocked && sectionCount > 0 ? ` · ${sectionCount} sections` : ""}
                                      </p>
                                      <p style={{ fontSize: 13, fontWeight: 600, color: isLessonUnlocked ? "#E9EDF8" : "#7B85A8", lineHeight: 1.3 }}>
                                        {lesson.title.replace(/^Lesson \d+: /, "")}
                                      </p>
                                    </div>
                                    <div style={{ flexShrink: 0 }}>
                                      {isCompleted ? (
                                        <div style={{ width: 26, height: 26, borderRadius: 99, background: "rgba(0,217,192,0.15)", border: "1px solid rgba(0,217,192,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                          <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#00D9C0" }}>check</span>
                                        </div>
                                      ) : isLessonUnlocked ? (
                                        <div style={{ width: 26, height: 26, borderRadius: 99, background: `${meta.color}14`, border: `1px solid ${meta.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                          <span className="material-symbols-outlined" style={{ fontSize: 14, color: meta.color }}>play_arrow</span>
                                        </div>
                                      ) : (
                                        <span className="material-symbols-outlined" style={{ fontSize: 15, color: "#4A5070" }}>lock</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    });
                  })()}

                  {/* Coming soon modules (grayed) */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                    {[
                      { icon: "🔁", title: "Loops", num: "04", color: "#5EEAD4" },
                      { icon: "📋", title: "Functions", num: "05", color: "#38BDF8" },
                      { icon: "📚", title: "Arrays & Strings", num: "06–07", color: "#FFB800" },
                      { icon: "📌", title: "Pointers & Structs", num: "08–09", color: "#FF5F6E" },
                    ].map(item => (
                      <div key={item.num} style={{ background: "rgba(13,17,23,0.70)", border: "1px solid var(--border)", borderRadius: 11, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, opacity: 0.45 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: `${item.color}0F`, border: `1px solid ${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
                          {item.icon}
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4A5070", fontWeight: 700, marginBottom: 2 }}>Module {item.num}</p>
                          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#4A5070" }}>{item.title}</p>
                        </div>
                        <div style={{ marginLeft: "auto" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#4A5070" }}>lock</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Sidebar */}
                <div className="hidden md:block md:col-span-4 space-y-4">

                  {/* Progress card */}
                  <div style={{ background: "rgba(24,29,46,0.88)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 18px 16px", backdropFilter: "blur(12px)" }}>
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A78BFA", fontWeight: 700, marginBottom: 16 }}>
                      Your Progress
                    </p>
                    {[
                      { label: "Rank", value: "C Apprentice", color: "#00D9C0" },
                      { label: "XP Earned", value: `${xp.toLocaleString()} XP`, color: "#00D9C0" },
                      { label: "Streak", value: `${streak} Days 🔥`, color: "#FFB800" },
                      { label: "Completed", value: `${completedLessons.size} Lessons`, color: "#5EEAD4" },
                    ].map(row => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#7B85A8" }}>{row.label}</span>
                        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700, color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learning path preview */}
                  <div style={{ background: "rgba(24,29,46,0.88)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px", backdropFilter: "blur(12px)" }}>
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#00D9C0", fontWeight: 700, marginBottom: 14 }}>
                      Learning Path
                    </p>
                    {[
                      { phase: "Phase 1", label: "Store, type & talk", color: "#00D9C0", done: true },
                      { phase: "Phase 2", label: "Operate on data", color: "#FFB800", done: false },
                      { phase: "Phase 3", label: "Branch & loop", color: "#A78BFA", done: false },
                      { phase: "Phase 4", label: "Organise & reuse", color: "#5EEAD4", done: false },
                      { phase: "Phase 5", label: "Pointers & memory", color: "#FF5F6E", done: false },
                      { phase: "Phase 6", label: "Algorithms & projects", color: "#38BDF8", done: false },
                    ].map((item, i, arr) => (
                      <div key={item.phase} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 16 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 99, background: item.done ? item.color : "var(--border)", border: `2px solid ${item.done ? item.color : "#4A5070"}`, marginTop: 2 }} />
                          {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: "var(--border)", minHeight: 14, marginTop: 2 }} />}
                        </div>
                        <div style={{ paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                          <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.12em", color: item.done ? item.color : "#4A5070", fontWeight: 700, textTransform: "uppercase" }}>{item.phase}</p>
                          <p style={{ fontSize: 12, color: item.done ? "#E9EDF8" : "#4A5070" }}>{item.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tip card */}
                  <div style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.18)", borderRadius: 14, padding: "14px 16px" }}>
                    <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFB800", fontWeight: 700, marginBottom: 8 }}>
                      💡 Tip
                    </p>
                    <p style={{ fontSize: 12, color: "#7B85A8", lineHeight: 1.65 }}>
                      Every section follows the same pattern: <span style={{ color: "#FFB800" }}>Analogy</span> → <span style={{ color: "#00D9C0" }}>Interact</span> → <span style={{ color: "#A78BFA" }}>Concept Lock</span> → <span style={{ color: "#00D9C0" }}>Code</span>. Understand the concept before you see the syntax.
                    </p>
                  </div>

                </div>

              </div>
            ) : (
              // 2. ACTIVE LESSON VIEWER WITH SECTIONS STEP NAVIGATION
              (() => {
                const sections = LESSON_SECTIONS[activeLessonId || ""] || [];
                const totalSections = sections.length;
                const progressPercent = totalSections > 0 ? ((activeSectionIndex + 1) / totalSections) * 100 : 0;

                return (
                  <div className="max-w-3xl mx-auto w-full space-y-6">
                    
                    {/* Lesson Header Navigation */}
                    <div style={{ background: "rgba(24,29,46,0.90)", border: "1px solid var(--border)", borderRadius: 16, padding: "14px 16px", backdropFilter: "blur(14px)", display: "flex", flexDirection: "column", gap: 12 }}>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setActiveLessonId(null)}
                          style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Courier New', monospace", fontSize: 11, fontWeight: 700, color: "#7B85A8", letterSpacing: "0.06em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.15s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#00D9C0")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#7B85A8")}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_back</span>
                          Syllabus
                        </button>
                        
                        <div className="flex items-center gap-1">
                          <button
                            disabled={activeSectionIndex === 0}
                            onClick={() => {
                              setActiveSectionIndex(activeSectionIndex - 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="p-1 hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center justify-center transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                          </button>
                          
                          <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider select-none">
                            {activeSectionIndex + 1} / {totalSections}
                          </span>

                          <button
                            disabled={activeSectionIndex === totalSections - 1}
                            onClick={() => {
                              setActiveSectionIndex(activeSectionIndex + 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="p-1 hover:text-primary disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center justify-center transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                          </button>
                        </div>
                      </div>

                      {/* Title and Progress Bar */}
                      <div className="space-y-1.5 text-left">
                        <h2 className="text-sm font-bold text-on-surface font-sans">
                          {sections[activeSectionIndex]?.label || "Active Section"}
                        </h2>
                        {/* Thin progress bar */}
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Stepper Tabs - Horizontal scrolling dots/labels */}
                      <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pt-1">
                        {sections.map((sec) => {
                          const isActive = activeSectionIndex === sec.index;
                          const isPast = sec.index < activeSectionIndex;
                          
                          let stepStyle = "border-white/10 text-on-surface-variant hover:border-white/20";
                          if (isActive) {
                            stepStyle = "border-primary bg-primary/10 text-primary-fixed-dim font-bold shadow-[0_0_10px_rgba(0,218,243,0.1)]";
                          } else if (isPast) {
                            stepStyle = "border-secondary/40 bg-secondary/5 text-secondary-fixed-dim";
                          }

                          return (
                            <button
                              key={sec.index}
                              onClick={() => setActiveSectionIndex(sec.index)}
                              className={`flex-shrink-0 px-3 py-1 border rounded-lg text-[10px] font-mono transition-all cursor-pointer ${stepStyle}`}
                            >
                              <span className="flex items-center gap-1">
                                {isPast && (
                                  <span className="material-symbols-outlined text-[12px] text-secondary">
                                    check_circle
                                  </span>
                                )}
                                {sec.index + 1}. {sec.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section views switcher */}
                    <div className="min-h-[300px]">
                      {activeLessonId === "lesson_1_1" && activeSectionIndex === 0 && (
                        <SectionVariables onComplete={handleSectionComplete} />
                      )}
                      {activeLessonId === "lesson_1_1" && activeSectionIndex === 1 && (
                        <SectionDatatypes onComplete={handleSectionComplete} />
                      )}
                      {activeLessonId === "lesson_1_1" && activeSectionIndex === 2 && (
                        <SectionIO onComplete={handleSectionComplete} />
                      )}

                      {activeLessonId === "lesson_1_2" && (
                        <SectionOperators
                          sectionIndex={activeSectionIndex}
                          onComplete={handleSectionComplete}
                        />
                      )}

                      {activeLessonId === "lesson_1_3" && (
                        <SectionComments onComplete={handleSectionComplete} />
                      )}

                      {activeLessonId === "lesson_2_1" && (
                        <SectionIfStatement onComplete={handleSectionComplete} />
                      )}

                      {activeLessonId === "lesson_2_2" && (
                        <SectionSwitch onComplete={handleSectionComplete} />
                      )}
                    </div>

                    {/* Bottom Navigator Controls */}
                    <div className="glass-panel p-3.5 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                      <button
                        disabled={activeSectionIndex === 0}
                        onClick={() => {
                          setActiveSectionIndex(activeSectionIndex - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-4 py-2 border border-white/10 text-on-surface hover:text-primary disabled:opacity-30 disabled:pointer-events-none rounded-xl text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        PREVIOUS
                      </button>

                      {/* Visual Steps Indicator (Dots) */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        {sections.map((sec) => (
                          <div 
                            key={sec.index}
                            onClick={() => setActiveSectionIndex(sec.index)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                              activeSectionIndex === sec.index
                                ? "bg-primary w-4 shadow-[0_0_8px_#00daf3]"
                                : sec.index < activeSectionIndex
                                ? "bg-secondary"
                                : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        disabled={activeSectionIndex === totalSections - 1}
                        onClick={() => {
                          setActiveSectionIndex(activeSectionIndex + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-4 py-2 border border-white/10 text-on-surface hover:text-primary disabled:opacity-30 disabled:pointer-events-none rounded-xl text-xs font-mono font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        NEXT
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>

                  </div>
                );
              })()
            )}
          </>
        )}

        {/* PRACTICE VIEW */}
        {activeTab === "practice" && (
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <section className="space-y-1">
              <span className="text-label-sm font-label-sm text-secondary uppercase tracking-widest">
                Assessments
              </span>
              <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">
                Practice Quizzes
              </h1>
            </section>

            {!practiceCompleted ? (
              <section className="glass-panel p-4 rounded-xl space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 text-label-sm font-label-sm">
                  <span className="text-secondary">
                    Question {currentQuizIndex + 1} of {QUIZZES.length}
                  </span>
                  <span className="text-primary-fixed-dim bg-primary/10 px-2 py-0.5 rounded-full">
                    +100 XP
                  </span>
                </div>

                <p className="text-body-md font-semibold text-on-surface leading-relaxed text-left">
                  {QUIZZES[currentQuizIndex].question}
                </p>

                <div className="space-y-3">
                  {QUIZZES[currentQuizIndex].options.map((option, idx) => {
                    const isSelected = selectedQuizOption === option;
                    const isCorrect = option === QUIZZES[currentQuizIndex].correct;

                    let optionBtnStyle = "border-white/10 bg-white/5";
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionBtnStyle = "border-primary bg-primary/10 text-primary-fixed-dim";
                      } else if (isSelected) {
                        optionBtnStyle = "border-error bg-error/10 text-error";
                      } else {
                        optionBtnStyle = "border-white/5 opacity-40";
                      }
                    } else if (isSelected) {
                      optionBtnStyle = "border-secondary bg-secondary/15 text-secondary";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => setSelectedQuizOption(option)}
                        className={`w-full text-left p-3.5 rounded-lg border font-code-md text-code-md transition-all active:scale-[0.99] flex justify-between items-center ${optionBtnStyle}`}
                      >
                        <span>{option}</span>
                        {quizSubmitted && isCorrect && (
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            check_circle
                          </span>
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <span className="material-symbols-outlined text-error text-[18px]">
                            cancel
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 bg-surface-container-low border border-white/5 rounded-lg text-label-sm font-label-sm space-y-1 text-left">
                    <div className="font-bold text-on-surface">Explanation:</div>
                    <div className="text-on-surface-variant/90">{QUIZZES[currentQuizIndex].explanation}</div>
                  </div>
                )}

                <div className="flex justify-end pt-2 border-t border-white/5">
                  {!quizSubmitted ? (
                    <button
                      disabled={!selectedQuizOption}
                      onClick={handleQuizSubmit}
                      className="bg-secondary text-on-secondary px-5 py-2 rounded-lg text-label-sm font-label-sm font-bold active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
                    >
                      SUBMIT
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuiz}
                      className="bg-primary text-on-primary px-5 py-2 rounded-lg text-label-sm font-label-sm font-bold active:scale-95 transition-all"
                    >
                      {currentQuizIndex < QUIZZES.length - 1 ? "NEXT" : "FINISH"}
                    </button>
                  )}
                </div>
              </section>
            ) : (
              <section className="glass-panel p-4 rounded-xl text-center space-y-6">
                <span className="material-symbols-outlined text-[48px] text-primary" data-icon="emoji_events">
                  emoji_events
                </span>
                <div className="space-y-2">
                  <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">
                    Practice Complete!
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    You have successfully answered all standard practice modules. Check out your stats!
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setPracticeCompleted(false);
                      setCurrentQuizIndex(0);
                    }}
                    className="px-4 py-2 border border-white/10 rounded-lg text-label-sm font-label-sm font-bold hover:bg-white/5"
                  >
                    RESET
                  </button>
                  <button
                    onClick={() => setActiveTab("stats")}
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg text-label-sm font-label-sm font-bold code-glow"
                  >
                    STATS
                  </button>
                </div>
              </section>
            )}
          </div>
        )}

        {/* CODE PLAYGROUND VIEW */}
        {activeTab === "code" && (
          <>
            <section className="space-y-1">
              <span className="text-label-sm font-label-sm text-primary uppercase tracking-widest">
                IDE
              </span>
              <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">
                Code Scratchpad
              </h1>
            </section>

            <section className="glass-panel rounded-xl overflow-hidden flex flex-col">
              <div className="bg-surface-container-high px-4 py-2 flex justify-between items-center border-b border-white/5">
                <span className="text-label-sm font-label-sm text-on-surface-variant">sandbox.c</span>
                <button
                  onClick={handleRunPlayground}
                  disabled={isConsoleRunning}
                  className="bg-primary text-on-primary px-4 py-1.5 rounded-lg text-label-sm font-label-sm font-bold flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]" data-icon="play_arrow">
                    play_arrow
                  </span>
                  RUN
                </button>
              </div>

              <div className="p-4 bg-surface-container-low font-code-md text-code-md min-h-[160px] flex">
                <textarea
                  value={playgroundCode}
                  onChange={(e) => setPlaygroundCode(e.target.value)}
                  className="w-full h-40 bg-transparent text-on-surface focus:outline-none resize-none font-code-md text-code-md leading-relaxed text-left"
                  spellCheck="false"
                />
              </div>

              <div className="bg-surface-container-lowest p-4 border-t border-white/5 flex flex-col gap-1">
                <span className="text-label-sm font-label-sm text-on-surface-variant/60 text-left">CONSOLE</span>
                <div className="text-code-md font-code-md text-primary-fixed-dim/90 min-h-[60px] whitespace-pre-wrap text-left">
                  {playgroundConsole}
                </div>
              </div>
            </section>
          </>
        )}

        {/* STATS VIEW */}
        {activeTab === "stats" && (
          <>
            <section className="space-y-1">
              <span className="text-label-sm font-label-sm text-tertiary uppercase tracking-widest">
                Analytics
              </span>
              <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">
                Dashboard
              </h1>
            </section>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl flex flex-col gap-1 text-left">
                <span className="text-[10px] font-label-sm text-on-surface-variant">Total XP</span>
                <span className="text-xl font-bold font-code-md text-primary-fixed-dim">
                  {xp.toLocaleString()} XP
                </span>
              </div>
              <div className="glass-panel p-4 rounded-xl flex flex-col gap-1 text-left">
                <span className="text-[10px] font-label-sm text-on-surface-variant">Streak</span>
                <span className="text-xl font-bold font-code-md text-secondary">
                  {streak} Days 🔥
                </span>
              </div>
            </div>

            {/* Graph */}
            <section className="glass-panel p-4 rounded-xl space-y-3 text-left">
              <span className="text-label-sm font-label-sm text-on-surface-variant">Growth</span>
              <div className="w-full h-32 bg-surface-container-lowest border border-white/5 rounded-lg p-2 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                  <path
                    d="M0 70 L50 65 L100 68 L150 50 L200 45 L250 30 L300 10 L300 80 L0 80 Z"
                    fill="rgba(0, 218, 243, 0.15)"
                  />
                  <path
                    d="M0 70 L50 65 L100 68 L150 50 L200 45 L250 30 L300 10"
                    fill="none"
                    stroke="#00daf3"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </section>

            {/* Heatmap */}
            <section className="glass-panel p-4 rounded-xl space-y-3 text-left">
              <span className="text-label-sm font-label-sm text-on-surface-variant">Contributions</span>
              <div className="grid grid-cols-14 gap-1">
                {activityGrid.map((val, idx) => {
                  let col = "bg-white/5";
                  if (val === 1) col = "bg-secondary-container/40 border border-secondary/10";
                  if (val === 2) col = "bg-secondary-container border border-secondary/30";
                  if (val === 3) col = "bg-secondary text-on-secondary";

                  return (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-sm transition-all ${col}`}
                    ></div>
                  );
                })}
              </div>
            </section>
          </>
        )}

      </main>

      {/* Floating XP Toast */}
      {showToast && (
        <div className="xp-toast fixed bottom-24 right-4 z-40 pointer-events-none">
          <div className="bg-primary-container/20 border border-primary/30 text-primary-fixed-dim px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 backdrop-blur-md">
            <span className="material-symbols-outlined text-[18px]" data-icon="star">
              star
            </span>
            {toastMessage}
          </div>
        </div>
      )}

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 glass-panel" style={{ borderTop: "1px solid var(--border)", borderBottom: "none", borderLeft: "none", borderRight: "none" }}>
        <div className="max-w-5xl mx-auto w-full flex justify-around items-center px-4 py-2">
          {([
            { tab: "learn",    icon: "school",    label: "Learn",    color: "#00D9C0" },
            { tab: "practice", icon: "extension", label: "Practice", color: "#A78BFA" },
            { tab: "code",     icon: "keyboard",  label: "Code",     color: "#00D9C0" },
            { tab: "stats",    icon: "insights",  label: "Stats",    color: "#5EEAD4" },
          ] as const).map(({ tab, icon, label, color }) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  padding: "6px 16px", borderRadius: 12,
                  background: active ? `${color}14` : "transparent",
                  border: "none", cursor: "pointer", transition: "all 0.18s ease",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 22, color: active ? color : "#4A5070", fontVariationSettings: `'FILL' ${active ? 1 : 0}` }}
                >
                  {icon}
                </span>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 700, color: active ? color : "#4A5070" }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
