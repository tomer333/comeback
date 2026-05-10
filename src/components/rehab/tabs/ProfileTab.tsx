import { ChevronRight, RotateCcw } from "lucide-react";
import logo from "@/assets/logo.svg";
import { type AppState, BODY_PARTS, GOALS, STAGES } from "@/lib/rehab-data";
import { useRehabStats } from "../useRehabStats";

type Props = { state: AppState; selectedDate: string; onReset: () => void };

export const ProfileTab = ({ state, selectedDate, onReset }: Props) => {
  const s = useRehabStats(state, selectedDate);
  const part = BODY_PARTS.find((p) => p.id === state.bodyId);
  const goal = GOALS.find((g) => g.id === state.goalId);
  const stage = STAGES.find((st) => st.key === state.stageKey);

  return (
    <div className="min-h-screen px-5 pt-8 pb-28 animate-fade-in">
      <div className="max-w-md mx-auto space-y-5">
        <header>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Account</div>
          <h1 className="text-[26px] font-bold text-foreground tracking-tight leading-tight">Profile</h1>
        </header>

        {/* Identity card */}
        <section className="bg-card rounded-3xl p-5 shadow-card flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-primary shadow-glow flex items-center justify-center overflow-hidden">
            <img src={logo} alt="Stride" className="h-14 w-14 object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-foreground">You</div>
            <div className="text-xs text-muted-foreground">
              Recovery {s.recoveryScore} · Streak {state.streak}
            </div>
          </div>
        </section>

        {/* Plan summary */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <h2 className="text-base font-bold text-foreground tracking-tight mb-3">Your plan</h2>
          <div className="space-y-2.5">
            <Row label="Injury" value={state.injury ?? "—"} />
            <Row label="Body area" value={part?.name ?? "—"} />
            <Row label="Goal" value={goal?.name ?? "—"} />
            <Row label="Stage" value={stage ? `${stage.id}. ${stage.name}` : "—"} />
            <Row label="Weekly target" value={`${state.weeklyTarget} sessions`} />
          </div>
        </section>

        {/* Settings (mock) */}
        <section className="bg-card rounded-3xl p-2 shadow-card">
          {[
            "Notifications",
            "Reminders",
            "Privacy",
            "Help & support",
          ].map((label) => (
            <button
              key={label}
              type="button"
              className="w-full flex items-center justify-between py-3 px-3 rounded-2xl hover:bg-card-elevated transition-smooth"
            >
              <span className="text-sm font-medium text-foreground">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </section>

        <button
          type="button"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-smooth py-3"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restart setup
        </button>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-1.5">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold text-foreground text-right max-w-[60%] truncate">{value}</span>
  </div>
);
