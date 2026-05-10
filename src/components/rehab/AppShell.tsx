import { useState } from "react";
import { type AppState, type ExerciseDifficulty } from "@/lib/rehab-data";
import { BottomNav, type TabKey } from "./BottomNav";
import { HomeTab } from "./tabs/HomeTab";
import { ProgressTab } from "./tabs/ProgressTab";
import { CommunityTab } from "./tabs/CommunityTab";
import { AchievementsTab } from "./tabs/AchievementsTab";
import { ProfileTab } from "./tabs/ProfileTab";

type Props = {
  state: AppState;
  selectedDate: string;
  onSelectDate: (k: string) => void;
  onCycleExercise: (name: string) => void;
  onSetDifficulty: (name: string, d: ExerciseDifficulty) => void;
  onSetPain: (n: number) => void;
  onReset: () => void;
};

export const AppShell = (props: Props) => {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <div className="min-h-screen bg-background">
      {tab === "home" && (
        <HomeTab
          state={props.state}
          selectedDate={props.selectedDate}
          onSelectDate={props.onSelectDate}
          onCycleExercise={props.onCycleExercise}
          onSetDifficulty={props.onSetDifficulty}
        />
      )}
      {tab === "progress" && (
        <ProgressTab state={props.state} selectedDate={props.selectedDate} />
      )}
      {tab === "community" && (
        <CommunityTab state={props.state} selectedDate={props.selectedDate} />
      )}
      {tab === "achievements" && (
        <AchievementsTab state={props.state} selectedDate={props.selectedDate} />
      )}
      {tab === "profile" && (
        <ProfileTab
          state={props.state}
          selectedDate={props.selectedDate}
          onReset={props.onReset}
        />
      )}
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
};
