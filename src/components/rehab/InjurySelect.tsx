import { ScreenHeader } from "./ScreenHeader";
import { BODY_PARTS } from "@/lib/rehab-data";
import { ChevronRight } from "lucide-react";

type Props = { bodyId: string; onBack: () => void; onSelect: (injury: string) => void };

export const InjurySelect = ({ bodyId, onBack, onSelect }: Props) => {
  const part = BODY_PARTS.find((p) => p.id === bodyId);
  if (!part) return null;
  return (
    <div className="min-h-screen px-6 py-8 animate-fade-in">
      <ScreenHeader onBack={onBack} step="Step 2 of 4" />
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Which injury?
        </h2>
        <p className="text-muted-foreground mb-8">
          For your <span className="text-primary font-medium">{part.name.toLowerCase()}</span>.
        </p>
        <div className="space-y-3">
          {part.injuries.map((inj) => (
            <button
              key={inj}
              type="button"
              onClick={() => onSelect(inj)}
              className="w-full bg-card hover:bg-card-elevated rounded-2xl p-5 flex items-center justify-between shadow-soft transition-smooth active:scale-[0.98] border border-transparent hover:border-primary/30"
            >
              <span className="text-base font-semibold text-foreground">{inj}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};