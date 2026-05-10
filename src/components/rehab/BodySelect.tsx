import { useState } from "react";
import { ScreenHeader } from "./ScreenHeader";
import { BODY_PARTS } from "@/lib/rehab-data";

type Props = { onBack: () => void; onSelect: (id: string) => void };

// Hit-target positions on the silhouette (percent of container).
const BODY_POSITIONS: Record<string, { top: number; left: number }> = {
  neck: { top: 13, left: 50 },
  shoulder: { top: 22, left: 30 },
  elbow: { top: 36, left: 22 },
  wrist: { top: 50, left: 16 },
  back: { top: 32, left: 70 },
  hip: { top: 50, left: 50 },
  knee: { top: 70, left: 42 },
  ankle: { top: 90, left: 42 },
};

export const BodySelect = ({ onBack, onSelect }: Props) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const activeName =
    (hovered ?? selected) ? BODY_PARTS.find((p) => p.id === (hovered ?? selected))?.name ?? null : null;

  const handlePick = (id: string) => {
    setSelected(id);
    // brief delay for the glow feedback before transitioning
    window.setTimeout(() => onSelect(id), 220);
  };

  return (
    <div className="min-h-screen px-6 py-8 animate-fade-in">
      <ScreenHeader onBack={onBack} step="Step 1 of 4" />
      <div className="max-w-md mx-auto">
        <h2 className="text-[28px] font-bold text-foreground mb-2 tracking-tight text-center">
          Where do we start?
        </h2>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          Select the area where you're feeling pain or injury.
        </p>

        {/* Silhouette */}
        <div className="relative mx-auto w-full max-w-[300px] aspect-[1/2] mb-6">
          {/* Soft radial backdrop (premium feel) */}
          <div
            className="absolute inset-0 rounded-[40%] blur-3xl opacity-80"
            style={{
              background:
                "radial-gradient(ellipse at center, hsl(var(--accent) / 0.18) 0%, transparent 70%)",
            }}
          />

          {/* Premium 3D-like silhouette */}
          <svg
            viewBox="0 0 100 200"
            className="absolute inset-0 h-full w-full drop-shadow-[0_22px_36px_hsl(215_60%_22%/0.22)]"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="bodyShade" cx="34%" cy="30%" r="78%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="hsl(210 35% 96%)" />
                <stop offset="80%" stopColor="hsl(210 28% 82%)" />
                <stop offset="100%" stopColor="hsl(212 32% 70%)" />
              </radialGradient>
              <linearGradient id="bodyEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(212 35% 58%)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(212 30% 70%)" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="bodyShadow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(212 30% 72%)" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(212 35% 55%)" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <g fill="url(#bodyShade)" stroke="url(#bodyEdge)" strokeWidth="0.5">
              {/* head */}
              <ellipse cx="50" cy="14" rx="8.5" ry="9.5" />
              {/* neck */}
              <path d="M46 22 Q50 24 54 22 L54 28 Q50 29 46 28 Z" />
              {/* torso */}
              <path d="M30 30 Q50 26 70 30 Q72 50 68 70 Q66 80 50 82 Q34 80 32 70 Q28 50 30 30 Z" />
              {/* arms */}
              <path d="M30 32 Q22 50 19 78 Q18 88 22 92 Q26 90 26 80 Q30 60 34 38 Z" />
              <path d="M70 32 Q78 50 81 78 Q82 88 78 92 Q74 90 74 80 Q70 60 66 38 Z" />
              {/* hips */}
              <path d="M32 78 Q50 86 68 78 L66 96 Q50 100 34 96 Z" />
              {/* legs */}
              <path d="M36 96 Q38 130 40 165 Q40 178 44 182 L49 182 Q50 160 49 130 Q49 110 48 96 Z" />
              <path d="M64 96 Q62 130 60 165 Q60 178 56 182 L51 182 Q50 160 51 130 Q51 110 52 96 Z" />
            </g>
            {/* right-side shadow pass for depth */}
            <g fill="url(#bodyShadow)" style={{ mixBlendMode: "multiply" }}>
              <path d="M50 26 Q70 26 70 30 Q72 50 68 70 Q66 80 50 82 Z" />
              <path d="M70 32 Q78 50 81 78 Q82 88 78 92 Q74 90 74 80 Q70 60 66 38 Z" />
              <path d="M50 86 Q68 86 68 78 L66 96 Q50 100 50 100 Z" />
              <path d="M64 96 Q62 130 60 165 Q60 178 56 182 L51 182 Q50 160 51 130 Q51 110 52 96 Z" />
            </g>
            {/* crisp left highlight */}
            <ellipse cx="42" cy="48" rx="6" ry="38" fill="white" opacity="0.32" />
            <ellipse cx="46" cy="11" rx="3" ry="3.5" fill="white" opacity="0.4" />
            {/* subtle ground shadow */}
            <ellipse cx="50" cy="190" rx="22" ry="2.5" fill="hsl(212 35% 50%)" opacity="0.18" />
          </svg>

          {BODY_PARTS.map((part) => {
            const pos = BODY_POSITIONS[part.id];
            if (!pos) return null;
            const isHovered = hovered === part.id;
            const isSelected = selected === part.id;
            const isActive = isHovered || isSelected;
            return (
              <button
                key={part.id}
                type="button"
                onClick={() => handlePick(part.id)}
                onMouseEnter={() => setHovered(part.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(part.id)}
                onBlur={() => setHovered(null)}
                aria-label={part.name}
                className={`absolute -translate-x-1/2 -translate-y-1/2 h-11 w-11 rounded-full flex items-center justify-center transition-smooth active:scale-90 ${
                  isSelected
                    ? "bg-accent/35 shadow-glow scale-110"
                    : isHovered
                    ? "bg-accent/20"
                    : "bg-card/80 ring-1 ring-border"
                }`}
                style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              >
                {isSelected && (
                  <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping" />
                )}
                <span
                  className={`rounded-full transition-smooth ${
                    isActive
                      ? "h-2.5 w-2.5 bg-accent shadow-[0_0_12px_hsl(var(--accent))]"
                      : "h-1.5 w-1.5 bg-muted-foreground/50"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Hovered label — keeps layout stable */}
        <div className="h-6 text-center mb-6">
          <span
            className={`text-sm font-semibold transition-smooth ${
              activeName ? "text-primary opacity-100" : "opacity-0"
            }`}
          >
            {activeName ?? "—"}
          </span>
        </div>

        {/* Reliable tap-target list */}
        <div className="grid grid-cols-2 gap-2">
          {BODY_PARTS.map((part) => (
            <button
              key={part.id}
              type="button"
              onClick={() => handlePick(part.id)}
              onMouseEnter={() => setHovered(part.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-card hover:bg-card-elevated rounded-xl py-3 px-4 text-sm font-semibold text-foreground transition-smooth active:scale-[0.98] shadow-card ${
                selected === part.id ? "ring-2 ring-accent" : ""
              }`}
            >
              {part.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
