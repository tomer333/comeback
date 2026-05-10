import { ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/logo.svg";

type Props = { onStart: () => void };

export const Onboarding = ({ onStart }: Props) => {
  return (
    <div className="relative min-h-screen flex flex-col px-8 pt-20 pb-10 bg-background animate-fade-in">
      <div className="relative max-w-md w-full mx-auto flex-1 flex flex-col items-center">
        {/* BIG centered logo */}
        <div className="flex items-center justify-center w-full">
          <img
            src={logo}
            alt="Comeback"
            className="w-[92%] max-w-[380px] h-auto object-contain drop-shadow-[0_12px_28px_hsl(215_60%_20%/0.10)]"
          />
        </div>

        {/* Wordmark */}
        <h2 className="mt-3 text-center text-[30px] font-extrabold tracking-tight text-primary">
          Comeback
        </h2>

        {/* Headline + subtext */}
        <div className="text-center px-2 mt-6">
          <div className="flex items-center justify-center gap-2 mb-3 text-accent">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Recovery, reimagined
            </span>
          </div>
          <h1 className="text-[44px] leading-[1.02] font-extrabold tracking-tight text-foreground">
            Stronger.<br />
            <span className="text-primary">Every day.</span>
          </h1>
          <p className="text-[15px] leading-relaxed text-muted-foreground mt-4">
            Your personal recovery companion.
          </p>
        </div>

        {/* CTA */}
        <div className="w-full mt-auto pt-10">
          <button
            type="button"
            onClick={onStart}
            className="w-full h-14 rounded-2xl bg-gradient-primary text-primary-foreground text-base font-bold shadow-glow transition-smooth active:scale-[0.97] active:shadow-card hover:brightness-105 flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
};
