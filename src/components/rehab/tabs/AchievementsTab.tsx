import { Award, Flame, Trophy, Zap } from "lucide-react";
import { type AppState } from "@/lib/rehab-data";
import { useRehabStats } from "../useRehabStats";

type Props = { state: AppState; selectedDate: string };

export const AchievementsTab = ({ state, selectedDate }: Props) => {
  const s = useRehabStats(state, selectedDate);
  const earnedCount = s.badges.filter((b) => b.value >= b.goal).length;
  const milestones = [
    { day: 3, label: "3-day streak", reached: state.streak >= 3 },
    { day: 7, label: "7-day streak", reached: state.streak >= 7 },
    { day: 14, label: "2-week streak", reached: state.streak >= 14 },
    { day: 30, label: "30-day streak", reached: state.streak >= 30 },
  ];

  return (
    <div className="min-h-screen px-5 pt-8 pb-28 animate-fade-in">
      <div className="max-w-md mx-auto space-y-5">
        <header>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Rewards</div>
          <h1 className="text-[26px] font-bold text-foreground tracking-tight leading-tight">Achievements</h1>
        </header>

        {/* XP & summary */}
        <section
          className="rounded-3xl p-5 shadow-glow text-primary-foreground relative overflow-hidden"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-2xl" />
          <div className="relative grid grid-cols-3 gap-3">
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-80">
                <Zap className="h-3 w-3" /> XP
              </div>
              <div className="text-2xl font-bold tabular-nums mt-1">{s.totalXP}</div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-80">
                <Award className="h-3 w-3" /> Badges
              </div>
              <div className="text-2xl font-bold tabular-nums mt-1">
                {earnedCount}<span className="text-sm opacity-80">/{s.badges.length}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider opacity-80">
                <Flame className="h-3 w-3" /> Streak
              </div>
              <div className="text-2xl font-bold tabular-nums mt-1">{state.streak}</div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-foreground tracking-tight">Badges</h2>
            <span className="text-xs font-semibold text-muted-foreground">{earnedCount}/{s.badges.length}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {s.badges.map((b) => {
              const earned = b.value >= b.goal;
              const pct = Math.min(100, Math.round((b.value / b.goal) * 100));
              return (
                <div
                  key={b.id}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-smooth ${
                    earned ? "bg-accent/15 border border-accent/40" : "bg-secondary border border-transparent"
                  }`}
                >
                  <div className={`text-3xl ${earned ? "" : "grayscale opacity-60"}`}>{b.icon}</div>
                  <div className="text-[11px] font-bold text-foreground text-center leading-tight">{b.label}</div>
                  <div className="text-[9px] text-muted-foreground text-center leading-tight">{b.desc}</div>
                  {!earned && (
                    <div className="w-full h-1 rounded-full bg-card overflow-hidden mt-0.5">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Streak milestones */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-4 w-4 text-warning" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Streak milestones</h2>
          </div>
          <div className="space-y-2">
            {milestones.map((m) => (
              <div
                key={m.day}
                className={`flex items-center justify-between rounded-2xl p-3 ${
                  m.reached ? "bg-success/10 border border-success/30" : "bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                    m.reached ? "bg-success text-success-foreground" : "bg-card text-muted-foreground"
                  }`}>
                    {m.day}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{m.label}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {m.reached ? "Unlocked" : `${m.day - state.streak} days to go`}
                    </div>
                  </div>
                </div>
                {m.reached && <Trophy className="h-4 w-4 text-success" />}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
