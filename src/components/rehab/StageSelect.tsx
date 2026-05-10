import { ScreenHeader } from "./ScreenHeader";
import { STAGES, type StageKey } from "@/lib/rehab-data";

type Props = { onBack: () => void; onSelect: (key: StageKey) => void };

export const StageSelect = ({ onBack, onSelect }: Props) => {
  return (
    <div className="min-h-screen px-6 py-8 animate-fade-in">
      <ScreenHeader onBack={onBack} step="Step 4 of 4" />
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">Where are you now?</h2>
        <p className="text-muted-foreground mb-8">Pick the stage that fits today. You can move up later.</p>
        <div className="space-y-3">
          {STAGES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => onSelect(s.key)}
              className="w-full bg-card hover:bg-card-elevated rounded-2xl p-5 flex items-center gap-4 shadow-soft transition-smooth active:scale-[0.98] text-left border border-transparent hover:border-primary/30"
            >
              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary font-bold">
                {s.id}
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold text-foreground">{s.name}</div>
                <div className="text-sm text-muted-foreground">{s.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};