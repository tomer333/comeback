import { ScreenHeader } from "./ScreenHeader";
import { GOALS } from "@/lib/rehab-data";

type Props = { onBack: () => void; onSelect: (id: string) => void };

export const GoalSelect = ({ onBack, onSelect }: Props) => {
  return (
    <div className="min-h-screen px-6 py-8 animate-fade-in">
      <ScreenHeader onBack={onBack} step="Step 3 of 4" />
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">What's your goal?</h2>
        <p className="text-muted-foreground mb-8">Pick what you're working toward.</p>
        <div className="grid grid-cols-2 gap-3">
          {GOALS.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelect(g.id)}
              className="bg-card hover:bg-card-elevated rounded-2xl p-5 text-left shadow-soft transition-smooth active:scale-[0.98] border border-transparent hover:border-primary/30"
            >
              <div className="text-3xl mb-3">{g.emoji}</div>
              <div className="text-sm font-semibold text-foreground leading-snug">{g.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};