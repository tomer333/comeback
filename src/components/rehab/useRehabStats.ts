import { useEffect, useMemo, useRef, useState } from "react";
import {
  type AppState,
  type DayEntry,
  BODY_PARTS,
  GOALS,
  STAGES,
  getExercisesFor,
  EMPTY_DAY,
  getWeekDays,
  todayKey,
} from "@/lib/rehab-data";

export const REQUIRED_DONE_DAYS_PER_STAGE = 5;
export const XP_PER_PARTIAL = 5;
export const XP_PER_DONE = 15;
export const XP_SESSION_BONUS = 25;

export function useRehabStats(state: AppState, selectedDate: string) {
  const part = BODY_PARTS.find((p) => p.id === state.bodyId);
  const goal = GOALS.find((g) => g.id === state.goalId);
  const stage = STAGES.find((s) => s.key === state.stageKey);
  const nextStage = stage ? STAGES.find((s) => s.id === stage.id + 1) : null;

  const tKey = todayKey();
  const isToday = selectedDate === tKey;
  const isFuture = selectedDate > tKey;

  const exercises = useMemo(
    () => getExercisesFor(state.bodyId, state.injury, state.stageKey),
    [state.bodyId, state.injury, state.stageKey]
  );
  const total = exercises.length;

  const selectedDay: DayEntry = state.days[selectedDate] ?? EMPTY_DAY;
  const dayExercises = selectedDay.exercises;

  const doneCount = exercises.filter((e) => dayExercises[e.name]?.status === "done").length;
  const partialCount = exercises.filter((e) => dayExercises[e.name]?.status === "partial").length;
  const dayProgress =
    total > 0 ? Math.round(((doneCount + partialCount * 0.5) / total) * 100) : 0;
  const dayCompleted = total > 0 && doneCount === total;
  const dayHasAny = doneCount > 0 || partialCount > 0;
  const remainingExercises = total - doneCount;

  const week = getWeekDays();
  const weeklyTarget = state.weeklyTarget ?? 5;
  const weekDoneDays = week.filter((d) => state.days[d.key]?.completed).length;
  const weekMissed = week.filter((d) => d.key < tKey && !state.days[d.key]?.completed).length;
  const remainingSessions = Math.max(0, weeklyTarget - weekDoneDays);

  const stageProgress = stage ? ((stage.id - 1) / STAGES.length) * 100 : 0;
  const weekScore = (weekDoneDays / weeklyTarget) * 100;
  const streakBonus = Math.min(state.streak * 4, 20);
  const painPenalty = (selectedDay.pain - 3) * 2;
  const recoveryScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        stageProgress * 0.5 +
          weekScore * 0.3 +
          streakBonus +
          dayProgress * 0.1 -
          Math.max(0, painPenalty)
      )
    )
  );

  const stageSessionsDone = Math.min(state.streak, REQUIRED_DONE_DAYS_PER_STAGE);
  const sessionsToNextStage = Math.max(0, REQUIRED_DONE_DAYS_PER_STAGE - stageSessionsDone);

  const totalXP = useMemo(() => {
    let xp = 0;
    for (const day of Object.values(state.days)) {
      const ex = day?.exercises ?? {};
      for (const e of Object.values(ex)) {
        if (e?.status === "done") xp += XP_PER_DONE;
        else if (e?.status === "partial") xp += XP_PER_PARTIAL;
      }
      if (day?.completed) xp += XP_SESSION_BONUS;
    }
    return xp;
  }, [state.days]);

  const totalCompletedSessions = useMemo(
    () => Object.values(state.days).filter((d) => d?.completed).length,
    [state.days]
  );

  const totalCompletedExercises = useMemo(() => {
    let n = 0;
    for (const d of Object.values(state.days)) {
      n += Object.values(d?.exercises ?? {}).filter((e) => e?.status === "done").length;
    }
    return n;
  }, [state.days]);

  const totalPainEntries = useMemo(
    () => Object.values(state.days).filter((d) => d && d.pain !== EMPTY_DAY.pain).length,
    [state.days]
  );

  const recoveryTrend = useMemo(() => {
    const out: number[] = [];
    const cursor = new Date();
    cursor.setDate(cursor.getDate() - 6);
    for (let i = 0; i < 7; i++) {
      const k = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
      const day = state.days[k];
      const exCount = day ? Object.keys(day.exercises).length : 0;
      const doneEx = day ? Object.values(day.exercises).filter((e) => e?.status === "done").length : 0;
      const partialEx = day ? Object.values(day.exercises).filter((e) => e?.status === "partial").length : 0;
      const dayPct = exCount > 0 ? ((doneEx + partialEx * 0.5) / exCount) * 100 : 0;
      const pain = day?.pain ?? 3;
      const score = Math.max(20, Math.min(100, Math.round(40 + dayPct * 0.5 + (5 - pain) * 4)));
      out.push(score);
      cursor.setDate(cursor.getDate() + 1);
    }
    out[6] = recoveryScore;
    return out;
  }, [state.days, recoveryScore]);

  const friends = useMemo(() => {
    const base = [
      { name: "Maya", score: 82, streak: 6, sessions: 5 },
      { name: "Tomer", score: 71, streak: 3, sessions: 4 },
      { name: "Daniel", score: 64, streak: 2, sessions: 3 },
      { name: "Noa", score: 58, streak: 4, sessions: 3 },
    ];
    const you = {
      name: "You",
      score: recoveryScore,
      streak: state.streak,
      sessions: weekDoneDays,
      isYou: true as const,
    };
    return [...base, you].sort((a, b) => b.score - a.score);
  }, [recoveryScore, state.streak, weekDoneDays]);
  const yourRank = friends.findIndex((f) => "isYou" in f && f.isYou) + 1;

  const badges = useMemo(
    () => [
      { id: "first", label: "First step", icon: "🌱", goal: 1, value: totalCompletedSessions, desc: "Complete your first session" },
      { id: "three", label: "3 in a row", icon: "🔥", goal: 3, value: state.streak, desc: "Reach a 3-day streak" },
      { id: "five", label: "5 sessions", icon: "⚡", goal: 5, value: totalCompletedSessions, desc: "Finish 5 total sessions" },
      { id: "week", label: "7-day streak", icon: "🏆", goal: 7, value: state.streak, desc: "Reach a 7-day streak" },
      { id: "ten", label: "10 sessions", icon: "💎", goal: 10, value: totalCompletedSessions, desc: "Finish 10 total sessions" },
      { id: "twenty", label: "20 sessions", icon: "👑", goal: 20, value: totalCompletedSessions, desc: "Finish 20 total sessions" },
    ],
    [state.streak, totalCompletedSessions]
  );

  const recoveryLabel =
    recoveryScore >= 80 ? "Excellent" : recoveryScore >= 65 ? "Good" : recoveryScore >= 45 ? "Fair" : "Building";

  return {
    part, goal, stage, nextStage,
    tKey, isToday, isFuture,
    exercises, total,
    selectedDay, dayExercises,
    doneCount, partialCount, dayProgress, dayCompleted, dayHasAny, remainingExercises,
    week, weeklyTarget, weekDoneDays, weekMissed, remainingSessions,
    stageProgress, recoveryScore, recoveryLabel,
    stageSessionsDone, sessionsToNextStage,
    totalXP, totalCompletedSessions, totalCompletedExercises, totalPainEntries,
    recoveryTrend,
    friends, yourRank,
    badges,
  };
}

// Celebration & toast hook (separate so it only fires on Home)
export function useSessionCelebration(opts: {
  isToday: boolean;
  dayCompleted: boolean;
  recoveryScore: number;
  streak: number;
}) {
  const [celebrate, setCelebrate] = useState(false);
  const prev = useRef(false);
  useEffect(() => {
    if (!opts.isToday) {
      prev.current = opts.dayCompleted;
      return;
    }
    if (opts.dayCompleted && !prev.current) {
      setCelebrate(true);
      const t = setTimeout(() => setCelebrate(false), 2400);
      prev.current = true;
      return () => clearTimeout(t);
    }
    prev.current = opts.dayCompleted;
  }, [opts.dayCompleted, opts.isToday]);
  return { celebrate, dismiss: () => setCelebrate(false) };
}

export const ENCOURAGEMENTS = ["Nice 💪", "Keep going", "Strong work", "On a roll", "That's it"];
