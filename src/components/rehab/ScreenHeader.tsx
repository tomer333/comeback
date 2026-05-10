import { ChevronLeft } from "lucide-react";

type Props = {
  onBack?: () => void;
  step?: string;
  title?: string;
};

export const ScreenHeader = ({ onBack, step, title }: Props) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <button
        type="button"
        onClick={onBack}
        disabled={!onBack}
        className="h-10 w-10 rounded-full bg-card flex items-center justify-center text-foreground shadow-soft disabled:opacity-30 disabled:cursor-not-allowed transition-smooth hover:bg-card-elevated"
        aria-label="Back"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
        {step}
      </div>
      <div className="h-10 w-10" />
    </header>
  );
};