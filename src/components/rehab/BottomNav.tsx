import { Home, BarChart3, Users, Award, User } from "lucide-react";

export type TabKey = "home" | "progress" | "community" | "achievements" | "profile";

const TABS: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "progress", label: "Progress", icon: BarChart3 },
  { key: "community", label: "Community", icon: Users },
  { key: "achievements", label: "Awards", icon: Award },
  { key: "profile", label: "Profile", icon: User },
];

type Props = {
  active: TabKey;
  onChange: (k: TabKey) => void;
};

export const BottomNav = ({ active, onChange }: Props) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <div className="max-w-md mx-auto px-4 pb-3 pointer-events-auto">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-glow border border-border/60 grid grid-cols-5">
          {TABS.map((t) => {
            const isActive = active === t.key;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onChange(t.key)}
                aria-label={t.label}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center justify-center gap-1 py-2.5 transition-smooth active:scale-95"
              >
                <Icon
                  className={`h-5 w-5 transition-smooth ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.6 : 2}
                />
                <span
                  className={`text-[10px] font-bold tracking-tight transition-smooth ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t.label}
                </span>
                {isActive && (
                  <span className="absolute -top-0.5 h-1 w-7 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
