import { Activity, Heart, TrendingUp, Trophy } from "lucide-react";
import { type AppState } from "@/lib/rehab-data";
import { useRehabStats } from "../useRehabStats";

type Props = { state: AppState; selectedDate: string };

export const ProgressTab = ({ state, selectedDate }: Props) => {
  const s = useRehabStats(state, selectedDate);

  if (!s.stage) return null;

  return (
    <div className="min-h-screen px-5 pt-8 pb-28 animate-fade-in">
      <div className="max-w-md mx-auto space-y-5">
        <header>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Insights
          </div>
          <h1 className="text-[26px] font-bold text-foreground tracking-tight leading-tight">
            Your progress
          </h1>
        </header>

        {/* Recovery score */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-1.5 mb-3">
            <Heart className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
            <h2 className="text-[12px] font-bold text-foreground tracking-tight uppercase">Recovery Score</h2>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[40px] font-bold text-foreground tabular-nums leading-none">{s.recoveryScore}</span>
            <span className="text-sm font-semibold text-muted-foreground">/ 100</span>
          </div>
          <div className="text-xs font-bold text-success mt-1">{s.recoveryLabel}</div>

          <div className="relative h-28 mt-4">
            <svg viewBox="0 0 280 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkFill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sparkLine2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
              {(() => {
                const w = 280, h = 100, pad = 10;
                const max = Math.max(...s.recoveryTrend, 100);
                const min = Math.min(...s.recoveryTrend, 0);
                const range = Math.max(1, max - min);
                const points = s.recoveryTrend.map((v, i) => {
                  const x = pad + (i * (w - pad * 2)) / (s.recoveryTrend.length - 1);
                  const y = h - pad - ((v - min) / range) * (h - pad * 2);
                  return [x, y] as const;
                });
                const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
                const fillPath = `${linePath} L${points[points.length - 1][0]},${h} L${points[0][0]},${h} Z`;
                const last = points[points.length - 1];
                return (
                  <>
                    <path d={fillPath} fill="url(#sparkFill2)" />
                    <path d={linePath} fill="none" stroke="url(#sparkLine2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((p, i) => (
                      <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 4 : 2} fill={i === points.length - 1 ? "hsl(var(--accent))" : "hsl(var(--primary))"} />
                    ))}
                    <circle cx={last[0]} cy={last[1]} r="7" fill="hsl(var(--accent) / 0.25)" />
                  </>
                );
              })()}
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            <span>7 days ago</span><span>Today</span>
          </div>
        </section>

        {/* Weekly + monthly stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">This week</div>
            <div className="text-2xl font-bold text-foreground tabular-nums mt-1">
              {s.weekDoneDays}<span className="text-sm font-medium text-muted-foreground">/{s.weeklyTarget}</span>
            </div>
            <div className="text-[11px] font-semibold text-success mt-1">{Math.round((s.weekDoneDays / s.weeklyTarget) * 100)}% done</div>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-card">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">All time</div>
            <div className="text-2xl font-bold text-foreground tabular-nums mt-1">
              {s.totalCompletedSessions}
            </div>
            <div className="text-[11px] font-semibold text-muted-foreground mt-1">sessions</div>
          </div>
        </section>

        {/* Activity summary */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-primary" strokeWidth={2.5} />
            <h2 className="text-base font-bold text-foreground tracking-tight">Activity summary</h2>
          </div>
          <div className="space-y-3">
            {[
              { icon: "⏱", label: "Total sessions", value: s.totalCompletedSessions },
              { icon: "✓", label: "Completed exercises", value: s.totalCompletedExercises },
              { icon: "🔥", label: "Current streak", value: `${state.streak} ${state.streak === 1 ? "day" : "days"}` },
              { icon: "♥", label: "Pain entries logged", value: s.totalPainEntries },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center text-base">{row.icon}</div>
                  <span className="text-sm font-medium text-foreground">{row.label}</span>
                </div>
                <span className="text-sm font-bold text-foreground tabular-nums">{row.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pain history */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground tracking-tight">Pain — last 7 days</h2>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-7 gap-1.5 items-end h-24">
            {s.week.map((d) => {
              const day = state.days[d.key];
              const pain = day?.pain ?? 0;
              const heightPct = (pain / 10) * 100;
              return (
                <div key={d.key} className="flex flex-col items-center gap-1 h-full">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${Math.max(6, heightPct)}%`,
                        background: pain >= 7 ? "hsl(var(--destructive))" : pain >= 4 ? "hsl(var(--warning))" : "hsl(var(--accent))",
                        opacity: day ? 1 : 0.25,
                      }}
                    />
                  </div>
                  <div className={`text-[9px] font-bold uppercase ${d.isToday ? "text-primary" : "text-muted-foreground"}`}>
                    {d.label.slice(0, 1)}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stage progress */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Stage progress</h2>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            <span className="text-foreground font-semibold">{s.stage.name}</span> · Stage {s.stage.id}
            {s.nextStage && (
              <> · {s.sessionsToNextStage} sessions to {s.nextStage.name}</>
            )}
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2.5 rounded-full ${i < s.stageSessionsDone ? "bg-success" : "bg-secondary"}`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
