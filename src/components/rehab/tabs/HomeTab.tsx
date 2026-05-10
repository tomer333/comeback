import { useRef } from "react";
import { toast } from "sonner";
import { Bell, Check, Dumbbell, Flame, Minus, Play, Sparkles } from "lucide-react";
import logo from "@/assets/logo.svg";
import {
  type AppState,
  type ExerciseDifficulty,
  EMPTY_DAY,
  STAGES,
  dayLabel,
} from "@/lib/rehab-data";
import { ENCOURAGEMENTS, useRehabStats, useSessionCelebration } from "../useRehabStats";

type Props = {
  state: AppState;
  selectedDate: string;
  onSelectDate: (k: string) => void;
  onCycleExercise: (name: string) => void;
  onSetDifficulty: (name: string, d: ExerciseDifficulty) => void;
};

export const HomeTab = ({
  state,
  selectedDate,
  onSelectDate,
  onCycleExercise,
  onSetDifficulty,
}: Props) => {
  const s = useRehabStats(state, selectedDate);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { celebrate, dismiss } = useSessionCelebration({
    isToday: s.isToday,
    dayCompleted: s.dayCompleted,
    recoveryScore: s.recoveryScore,
    streak: state.streak,
  });

  if (!s.part || !s.goal || !s.stage) return null;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  const handleCycle = (name: string) => {
    if (s.isFuture) return;
    const current = s.dayExercises[name]?.status;
    onCycleExercise(name);
    if (!current) {
      const left = s.remainingExercises;
      toast(left > 1 ? `Partial logged · ${left - 1} to finish` : "One more to finish 💪", { duration: 1400 });
    } else if (current === "partial") {
      const willComplete = s.doneCount + 1 === s.total;
      if (!willComplete) {
        toast(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)], { duration: 1200 });
      } else {
        toast.success("Session complete 🔥", {
          description: `Recovery score now ${s.recoveryScore}`,
        });
      }
    }
  };

  const startSession = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const next = s.exercises.find((e) => s.dayExercises[e.name]?.status !== "done");
    if (next) toast(`Up next: ${next.name}`, { duration: 1500 });
  };

  const ringR = 38;
  const ringC = 2 * Math.PI * ringR;

  return (
    <div className="min-h-screen px-6 pt-9 pb-28 animate-fade-in">
      {celebrate && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm animate-fade-in cursor-pointer"
        >
          {/* soft confetti dots */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="absolute h-2 w-2 rounded-full animate-fade-in"
                style={{
                  left: `${(i * 73) % 100}%`,
                  top: `${(i * 41) % 100}%`,
                  background: i % 2 ? "hsl(var(--accent))" : "hsl(var(--primary))",
                  opacity: 0.7,
                  animationDelay: `${(i % 6) * 80}ms`,
                }}
              />
            ))}
          </div>
          <div className="relative bg-card rounded-3xl px-8 py-7 shadow-glow text-center animate-scale-in max-w-xs mx-4">
            <div className="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-60" style={{ background: "var(--gradient-mint)" }} />
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-xl font-bold text-foreground">Session complete</div>
            <div className="text-sm text-muted-foreground mt-1">
              Recovery +10 · Streak +1
            </div>
            <div
              onClick={(e) => { e.stopPropagation(); dismiss(); }}
              className="mt-5 inline-flex items-center justify-center w-full h-11 rounded-2xl bg-gradient-primary text-primary-foreground text-sm font-bold shadow-glow active:scale-[0.98] transition-smooth"
            >
              Continue
            </div>
            <div className="text-[10px] text-muted-foreground mt-2">Tap anywhere to close</div>
          </div>
        </button>
      )}

      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 rounded-2xl bg-card shadow-card flex items-center justify-center shrink-0 overflow-hidden">
              <img src={logo} alt="Stride" className="h-10 w-10 object-contain" />
            </div>
            <div className="min-w-0">
              <div className="text-[21px] font-extrabold text-foreground leading-tight tracking-tight truncate">
                {greeting} <span aria-hidden>👋</span>
              </div>
              <div className="text-[11px] font-semibold text-muted-foreground/90 uppercase tracking-[0.14em] truncate mt-0.5">
                {state.injury} · {s.part.name}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="relative h-10 w-10 rounded-2xl bg-card shadow-card flex items-center justify-center shrink-0 transition-smooth active:scale-90 hover:shadow-soft"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-foreground" strokeWidth={2.2} />
            {state.streak > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
            )}
          </button>
        </header>

        {/* HERO — current stage + recovery ring */}
        <section
          className="relative overflow-hidden rounded-[28px] p-5 text-primary-foreground shadow-glow"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/30 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-75">
                Current stage
              </div>
              <div className="text-[26px] font-bold leading-tight mt-0.5 truncate">
                {s.stage.name}
              </div>
              <div className="text-xs opacity-80 mt-0.5">
                Stage {s.stage.id} of {STAGES.length}
              </div>
            </div>
            <div className="relative shrink-0">
              <svg width="86" height="86" viewBox="0 0 100 100" className="-rotate-90">
                <circle cx="50" cy="50" r={ringR} fill="none" stroke="hsl(0 0% 100% / 0.18)" strokeWidth="9" />
                <circle
                  cx="50" cy="50" r={ringR}
                  fill="none"
                  stroke="hsl(168 60% 70%)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={ringC}
                  strokeDashoffset={ringC - (ringC * s.recoveryScore) / 100}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl font-bold tabular-nums">{s.recoveryScore}%</div>
              </div>
            </div>
          </div>

          {/* slim stage path */}
          <div className="relative mt-5">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary-foreground/15 rounded-full" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent rounded-full transition-all duration-500"
              style={{ width: `${((s.stage.id - 1) / (STAGES.length - 1)) * 100}%` }}
            />
            <div className="relative flex justify-between">
              {STAGES.map((st) => {
                const done = st.id < s.stage!.id;
                const current = st.id === s.stage!.id;
                return (
                  <div
                    key={st.id}
                    className={`h-2.5 w-2.5 rounded-full transition-smooth ${
                      done
                        ? "bg-primary-foreground"
                        : current
                        ? "bg-accent ring-4 ring-primary-foreground/25 scale-150"
                        : "bg-primary-foreground/25"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="relative mt-4 text-[13px] font-medium opacity-90">
            {s.dayCompleted
              ? "Today's session is done 🔥"
              : s.dayHasAny
              ? `${s.remainingExercises} exercise${s.remainingExercises === 1 ? "" : "s"} left today`
              : "Today's session is ready"}
          </div>
        </section>

        {/* CTA */}
        {s.isToday && !s.dayCompleted && (
          <button
            type="button"
            onClick={startSession}
            className="w-full flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-bold text-[15px] rounded-2xl py-4 transition-smooth active:scale-[0.97] active:shadow-card hover:brightness-105 shadow-glow"
          >
            <Play className="h-4 w-4 fill-primary-foreground" />
            {s.dayHasAny ? "Continue session" : "Start today's session"}
          </button>
        )}
        {s.isToday && s.dayCompleted && (
          <div className="w-full flex items-center justify-center gap-2 bg-success/15 text-success font-bold text-sm rounded-2xl py-4">
            <Check className="h-4 w-4" strokeWidth={3} />
            Done for today
          </div>
        )}

        {/* Today's mission */}
        <section ref={sectionRef} className="bg-card rounded-3xl p-5 shadow-card scroll-mt-4">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-base font-bold text-foreground tracking-tight">Today's mission</h2>
            <span className="text-xs font-semibold text-muted-foreground tabular-nums">
              {s.doneCount} of {s.total}
            </span>
          </div>

          <div className="space-y-2">
            {s.exercises.map((ex) => {
              const entry = s.dayExercises[ex.name];
              const status = entry?.status;
              const isDone = status === "done";
              const isPartial = status === "partial";
              return (
                <div key={ex.name}>
                  <button
                    type="button"
                    onClick={() => handleCycle(ex.name)}
                    disabled={s.isFuture}
                    className={`w-full flex items-center gap-3 rounded-2xl p-3.5 text-left transition-all duration-200 ease-out active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed ${
                      isDone
                        ? "bg-success/10 border border-success/20"
                        : isPartial
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-card-elevated border border-transparent hover:bg-secondary"
                    }`}
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 ease-out shrink-0 ${
                        isDone
                          ? "bg-success text-success-foreground scale-110"
                          : isPartial
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border-2 border-border text-muted-foreground"
                      }`}
                    >
                      {isDone && <Check className="h-4 w-4 animate-scale-in" strokeWidth={3} />}
                      {isPartial && <Minus className="h-4 w-4 animate-scale-in" strokeWidth={3} />}
                    </div>
                    {/* Thumbnail (image support — empty string falls back to placeholder) */}
                    <div className="h-11 w-11 rounded-xl bg-secondary border border-border/60 overflow-hidden shrink-0 flex items-center justify-center">
                      {ex.imageUrl ? (
                        <img
                          src={ex.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <Dumbbell className="h-4 w-4 text-muted-foreground/70" strokeWidth={2} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {ex.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{ex.sets}</div>
                      {ex.description && (
                        <div className="text-[11px] text-muted-foreground/90 mt-0.5 truncate">
                          → {ex.description}
                        </div>
                      )}
                      {ex.tip && (
                        <div className="text-[10px] text-primary/80 font-semibold mt-0.5 truncate">
                          Tip: {ex.tip}
                        </div>
                      )}
                    </div>
                  </button>

                  {entry && !s.isFuture && (
                    <div className="mt-1.5 ml-3 flex items-center gap-1.5 animate-fade-in">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Felt</span>
                      {(["easy", "medium", "hard"] as ExerciseDifficulty[]).map((d) => {
                        const active = entry.difficulty === d;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onSetDifficulty(ex.name, d); }}
                            className={`text-[10px] font-semibold rounded-full px-2 py-0.5 transition-smooth capitalize ${
                              active ? "bg-foreground text-background" : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {s.dayCompleted && s.isToday && (
            <div
              className="mt-4 rounded-2xl p-3.5 flex items-center gap-3 animate-scale-in"
              style={{ background: "var(--gradient-success)" }}
            >
              <Sparkles className="h-4 w-4 text-success-foreground shrink-0" />
              <div className="text-sm font-semibold text-success-foreground">
                Great job! Recovery score now {s.recoveryScore}.
              </div>
            </div>
          )}
        </section>

        {/* Weekly preview */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <h2 className="text-base font-bold text-foreground tracking-tight">This week</h2>
              <div className="text-xs text-muted-foreground mt-0.5">
                {s.weekDoneDays} of {s.weeklyTarget} sessions completed
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-warning/15">
              <Flame className="h-3.5 w-3.5 text-warning" />
              <span className="text-xs font-bold text-foreground tabular-nums">{state.streak}</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {s.week.map((d) => {
              const dayData = state.days[d.key];
              const completed = !!dayData?.completed;
              const partial = !completed && dayData && Object.keys(dayData.exercises).length > 0;
              const past = d.key < s.tKey;
              const future = d.key > s.tKey;
              const missed = past && !completed && !partial;
              const isSelected = d.key === selectedDate;
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => onSelectDate(d.key)}
                  className={`flex flex-col items-center gap-1.5 py-1.5 rounded-2xl transition-smooth active:scale-95 ${
                    isSelected ? "bg-card-elevated" : "hover:bg-card-elevated/60"
                  }`}
                >
                  <div className={`text-[9px] font-bold uppercase tracking-wider ${d.isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {d.label.slice(0, 1)}
                  </div>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-smooth ${
                      completed
                        ? "bg-success text-success-foreground"
                        : partial
                        ? "bg-primary/15 text-primary border-2 border-primary/40"
                        : missed
                        ? "bg-destructive/10 text-destructive/70"
                        : future
                        ? "bg-secondary text-muted-foreground/40"
                        : "bg-secondary text-muted-foreground"
                    } ${isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                  >
                    {completed ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : d.key.slice(-2)}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-3 text-[11px] font-semibold text-muted-foreground text-center">
            <span className="text-foreground">{s.remainingSessions}</span> left this week
          </div>
        </section>
      </div>
    </div>
  );
};
