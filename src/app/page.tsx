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
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-surface-dim/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto w-full h-16 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 select-none">
            <span className="material-symbols-outlined text-primary-fixed-dim" data-icon="terminal">
              terminal
            </span>
            <span 
              className="text-headline-lg-mobile font-bold tracking-normal"
              style={{ fontFamily: "var(--font-share-tech-mono), monospace" }}
            >
              <span className="text-secondary">Ko</span>
              <span className="text-primary-fixed-dim">dly</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full border border-white/5">
              <span className="text-label-sm font-label-sm text-on-surface">
                {xp.toLocaleString()} XP
              </span>
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
                
                {/* Left Column: Learning Syllabus modules list */}
                <div className="md:col-span-8 space-y-6">
                  
                  <section className="space-y-1">
                    <span className="text-label-sm font-label-sm text-primary uppercase tracking-widest">
                      Chapters
                    </span>
                    <h1 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">
                      Learning Syllabus
                    </h1>
                  </section>

                  {/* Modules map list */}
                  <div className="space-y-6">
                    {modules.map((mod) => {
                      // Module 2 unlocks after lesson_1_3 is completed
                      const isModLocked = mod.locked &&
                        !(mod.id === "mod_2" ? unlockedLessons.has("lesson_2_1") : unlockedLessons.has("lesson_1_2"));

                      return (
                        <section key={mod.id} className="space-y-3">
                          <h2 className="text-xs font-mono font-bold text-outline-variant uppercase tracking-wider flex items-center gap-1.5">
                            {isModLocked ? (
                              <span className="material-symbols-outlined text-[16px] text-outline-variant/60">lock</span>
                            ) : (
                              <span className="material-symbols-outlined text-[16px] text-primary">circle</span>
                            )}
                            {mod.title}
                          </h2>

                          <div className="space-y-2.5">
                            {mod.lessons.map((lesson) => {
                              const isLessonUnlocked = unlockedLessons.has(lesson.id) || lesson.id === "lesson_1_1";
                              const isCompleted = completedLessons.has(lesson.id);

                              return (
                                <div
                                  key={lesson.id}
                                  onClick={() => isLessonUnlocked && handleOpenLesson(lesson.id)}
                                  className={`glass-panel p-4 rounded-xl flex items-center justify-between border transition-all ${
                                    isLessonUnlocked
                                      ? "cursor-pointer border-white/5 hover:border-primary/30 hover:bg-white/10 active:scale-[0.99]"
                                      : "opacity-45 cursor-not-allowed border-white/5 bg-white/0"
                                  }`}
                                >
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-outline-variant">
                                      {isLessonUnlocked
                                        ? lesson.id.replace("lesson_", "MODULE ").replace("_", " — LESSON ").toUpperCase()
                                        : "LOCKED"}
                                    </span>
                                    <h3 className="text-xs font-bold text-on-surface text-left">
                                      {lesson.title}
                                    </h3>
                                  </div>

                                  {/* Status icons */}
                                  <div className="flex items-center gap-2">
                                    {isCompleted ? (
                                      <span className="material-symbols-outlined text-primary text-[20px]">
                                        verified
                                      </span>
                                    ) : isLessonUnlocked ? (
                                      <span className="material-symbols-outlined text-primary-fixed-dim text-[20px] animate-pulse">
                                        play_circle
                                      </span>
                                    ) : (
                                      <span className="material-symbols-outlined text-outline-variant/50 text-[18px]">
                                        lock
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                </div>

                {/* Right Column: Profile & Stats Sidebar (Visible on desktop) */}
                <div className="hidden md:block md:col-span-4 space-y-6">
                  
                  {/* Profile & XP Status Card */}
                  <div className="glass-panel p-4 rounded-xl space-y-4">
                    <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">account_circle</span>
                      Progress Panel
                    </h3>
                    <div className="space-y-2.5 text-xs font-mono text-outline-variant">
                      <div className="flex justify-between items-center">
                        <span>Current Rank:</span>
                        <span className="text-primary-fixed-dim font-bold">C Apprentice</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>XP Earned:</span>
                        <span className="text-primary-fixed-dim font-bold">{xp.toLocaleString()} XP</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Daily Streak:</span>
                        <span className="text-secondary font-bold">{streak} Days 🔥</span>
                      </div>
                    </div>
                  </div>

                  {/* Syllabus Tips Card */}
                  <div className="glass-panel p-4 rounded-xl space-y-2">
                    <h3 className="text-xs font-mono font-bold text-secondary uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                      Programming Tip
                    </h3>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      In C programming, declarations reserve exact bytes in RAM (e.g. 4 bytes for an <code className="text-secondary font-bold">int</code>, 1 byte for a <code className="text-secondary font-bold">char</code>). Always use appropriate types to save system memory!
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
                    <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setActiveLessonId(null)}
                          className="flex items-center gap-1 text-xs font-mono font-bold text-on-surface-variant hover:text-primary cursor-pointer active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
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
      <nav className="fixed bottom-0 left-0 w-full z-50 border-t border-white/10 bg-surface-container-lowest/90 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto w-full flex justify-around items-center px-4 py-2">
          <button
            onClick={() => setActiveTab("learn")}
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all ${
              activeTab === "learn"
                ? "text-primary-fixed-dim font-bold bg-primary/10"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              data-icon="school"
              style={{ fontVariationSettings: `'FILL' ${activeTab === "learn" ? 1 : 0}` }}
            >
              school
            </span>
            <span className="text-label-sm font-label-sm">Learn</span>
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all ${
              activeTab === "practice"
                ? "text-secondary font-bold bg-secondary-container/20"
                : "text-on-surface-variant hover:text-secondary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              data-icon="extension"
              style={{ fontVariationSettings: `'FILL' ${activeTab === "practice" ? 1 : 0}` }}
            >
              extension
            </span>
            <span className="text-label-sm font-label-sm">Practice</span>
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all ${
              activeTab === "code"
                ? "text-primary-fixed-dim font-bold bg-primary/10"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              data-icon="keyboard"
              style={{ fontVariationSettings: `'FILL' ${activeTab === "code" ? 1 : 0}` }}
            >
              keyboard
            </span>
            <span className="text-label-sm font-label-sm">Code</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`flex flex-col items-center justify-center rounded-xl px-4 py-1 transition-all ${
              activeTab === "stats"
                ? "text-tertiary font-bold bg-tertiary/10"
                : "text-on-surface-variant hover:text-tertiary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              data-icon="insights"
              style={{ fontVariationSettings: `'FILL' ${activeTab === "stats" ? 1 : 0}` }}
            >
              insights
            </span>
            <span className="text-label-sm font-label-sm">Stats</span>
          </button>
        </div>
      </nav>
    </>
  );
}
