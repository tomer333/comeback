import { useEffect, useState } from "react";
import {
  type AppState,
  type StageKey,
  type ExerciseDifficulty,
  type DayEntry,
  getExercisesFor,
  INITIAL_STATE,
  EMPTY_DAY,
  loadState,
  resetState,
  saveState,
  todayKey,
} from "@/lib/rehab-data";
import { Onboarding } from "@/components/rehab/Onboarding";
import { BodySelect } from "@/components/rehab/BodySelect";
import { InjurySelect } from "@/components/rehab/InjurySelect";
import { GoalSelect } from "@/components/rehab/GoalSelect";
import { StageSelect } from "@/components/rehab/StageSelect";
import { AppShell } from "@/components/rehab/AppShell";

const Index = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [selectedDate, setSelectedDate] = useState<string>(todayKey());

  // Load on mount + recompute streak based on `days` map
  useEffect(() => {
    try {
      const loaded = loadState();
      const today = todayKey();
      loaded.lastActiveDate = today;
      // Recompute streak: consecutive completed days ending today/yesterday
      let streak = 0;
      const cursor = new Date();
      for (let i = 0; i < 365; i++) {
        const k = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
        if (loaded.days[k]?.completed) streak++;
        else if (i > 0) break; // today not yet complete is fine
        cursor.setDate(cursor.getDate() - 1);
      }
      loaded.streak = streak;
      saveState(loaded);
      setState(loaded);
    } catch {
      resetState();
      setState(INITIAL_STATE);
    }
  }, []);

  const update = (patch: Partial<AppState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      saveState(next);
      return next;
    });
  };

  const updateDay = (dateKey: string, mutator: (d: DayEntry) => DayEntry) => {
    setState((prev) => {
      const current = prev.days[dateKey] ?? { ...EMPTY_DAY };
      const nextDay = mutator(current);
      // Recompute completed flag
      const exercises = getExercisesFor(prev.bodyId, prev.injury, prev.stageKey);
      const doneCount = exercises.filter(
        (e) => nextDay.exercises[e.name]?.status === "done"
      ).length;
      nextDay.completed = exercises.length > 0 && doneCount === exercises.length;

      const days = { ...prev.days, [dateKey]: nextDay };

      // Recompute streak
      let streak = 0;
      const cursor = new Date();
      for (let i = 0; i < 365; i++) {
        const k = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
        if (days[k]?.completed) streak++;
        else if (i > 0) break;
        cursor.setDate(cursor.getDate() - 1);
      }

      const next: AppState = {
        ...prev,
        days,
        streak,
        lastActiveDate: todayKey(),
      };
      saveState(next);
      return next;
    });
  };

  const goToBody = () => update({ step: "body" });
  const back = (to: AppState["step"]) => update({ step: to });

  const onBodySelect = (id: string) => update({ bodyId: id, injury: null, step: "injury" });
  const onInjurySelect = (injury: string) => update({ injury, step: "goal" });
  const onGoalSelect = (id: string) => update({ goalId: id, step: "stage" });
  const onStageSelect = (key: StageKey) =>
    update({
      stageKey: key,
      step: "dashboard",
      lastActiveDate: todayKey(),
    });

  // Cycle: not-set -> partial -> done -> not-set (per selected day)
  const onCycleExercise = (name: string) => {
    updateDay(selectedDate, (day) => {
      const next = { ...day, exercises: { ...day.exercises } };
      const current = next.exercises[name];
      if (!current) next.exercises[name] = { status: "partial" };
      else if (current.status === "partial") next.exercises[name] = { ...current, status: "done" };
      else delete next.exercises[name];
      return next;
    });
  };

  const onSetDifficulty = (name: string, difficulty: ExerciseDifficulty) => {
    updateDay(selectedDate, (day) => {
      const current = day.exercises[name];
      if (!current) return day;
      return {
        ...day,
        exercises: { ...day.exercises, [name]: { ...current, difficulty } },
      };
    });
  };

  const onSetPain = (n: number) => {
    updateDay(selectedDate, (day) => ({ ...day, pain: n }));
  };

  const onSelectDate = (dateKey: string) => setSelectedDate(dateKey);

  const onReset = () => {
    resetState();
    setState(INITIAL_STATE);
    setSelectedDate(todayKey());
  };

  try {
    switch (state.step) {
      case "onboarding":
        return <Onboarding onStart={goToBody} />;
      case "body":
        return <BodySelect onBack={() => back("onboarding")} onSelect={onBodySelect} />;
      case "injury":
        if (!state.bodyId) {
          return <BodySelect onBack={() => back("onboarding")} onSelect={onBodySelect} />;
        }
        return (
          <InjurySelect
            bodyId={state.bodyId}
            onBack={() => back("body")}
            onSelect={onInjurySelect}
          />
        );
      case "goal":
        return <GoalSelect onBack={() => back("injury")} onSelect={onGoalSelect} />;
      case "stage":
        return <StageSelect onBack={() => back("goal")} onSelect={onStageSelect} />;
      case "dashboard":
        if (!state.bodyId || !state.injury || !state.goalId || !state.stageKey) {
          return <Onboarding onStart={goToBody} />;
        }
        return (
          <AppShell
            state={state}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            onCycleExercise={onCycleExercise}
            onSetDifficulty={onSetDifficulty}
            onSetPain={onSetPain}
            onReset={onReset}
          />
        );
      default:
        return <Onboarding onStart={goToBody} />;
    }
  } catch {
    return <Onboarding onStart={goToBody} />;
  }
};

export default Index;
