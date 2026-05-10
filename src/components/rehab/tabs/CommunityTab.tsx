import { Trophy, Users } from "lucide-react";
import { type AppState } from "@/lib/rehab-data";
import { useRehabStats } from "../useRehabStats";

type Props = { state: AppState; selectedDate: string };

export const CommunityTab = ({ state, selectedDate }: Props) => {
  const s = useRehabStats(state, selectedDate);

  return (
    <div className="min-h-screen px-5 pt-8 pb-28 animate-fade-in">
      <div className="max-w-md mx-auto space-y-5">
        <header>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            Community
          </div>
          <h1 className="text-[26px] font-bold text-foreground tracking-tight leading-tight">
            Leaderboard
          </h1>
        </header>

        {/* Your rank card */}
        <section className="bg-gradient-primary rounded-3xl p-5 shadow-glow text-primary-foreground relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Your Rank</div>
              <div className="text-4xl font-bold tabular-nums mt-1">#{s.yourRank}</div>
            </div>
            <Trophy className="h-12 w-12 opacity-80" strokeWidth={1.5} />
          </div>
        </section>

        {/* Leaderboard */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">This week</h2>
          </div>
          <div className="space-y-2">
            {s.friends.map((friend, idx) => {
              const isYou = "isYou" in friend && friend.isYou;
              const rank = idx + 1;
              const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
              
              return (
                <div
                  key={friend.name}
                  className={`flex items-center justify-between rounded-2xl p-4 transition-smooth ${
                    isYou ? "bg-accent/10 border border-accent/30" : "bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-base font-bold ${
                      isYou ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground"
                    }`}>
                      {medal || rank}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isYou ? "text-accent-foreground" : "text-foreground"}`}>
                        {friend.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {friend.sessions} sessions · {friend.streak} day streak
                      </div>
                    </div>
                  </div>
                  <div className={`text-lg font-bold tabular-nums ${
                    isYou ? "text-accent-foreground" : "text-foreground"
                  }`}>
                    {friend.score}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Coming soon features */}
        <section className="bg-card rounded-3xl p-5 shadow-card">
          <h2 className="text-base font-bold text-foreground tracking-tight mb-3">Coming soon</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-base">👥</span>
              <span>Connect with real friends</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">💬</span>
              <span>Share progress updates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🏆</span>
              <span>Weekly challenges</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
