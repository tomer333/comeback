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
                className="relative flex flex-col items-center justify-center gap-1 py-3 transition-all duration-200 active:scale-95 touch-manipulation min-h-[64px]"
              >
                {/* Larger tap target */}
                <div className={`flex flex-col items-center gap-1 ${isActive ? 'scale-110' : ''} transition-transform duration-200`}>
                  <Icon
                    className={`h-6 w-6 transition-all duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.6 : 2}
                  />
                  <span
                    className={`text-[10px] font-bold tracking-tight transition-all duration-200 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </span>
                </div>
                {/* Active indicator with animation */}
                {isActive && (
                  <span className="absolute -top-0.5 h-1 w-8 rounded-full bg-accent animate-in fade-in slide-in-from-bottom-2 duration-200" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};