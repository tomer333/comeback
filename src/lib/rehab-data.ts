export type BodyPart = {
  id: string;
  name: string;
  emoji: string;
  injuries: string[];
};

export const BODY_PARTS: BodyPart[] = [
  { id: "neck", name: "Neck", emoji: "🦴", injuries: ["Neck strain", "Whiplash", "Tension"] },
  { id: "shoulder", name: "Shoulder", emoji: "💪", injuries: ["Rotator cuff", "Impingement", "Frozen shoulder"] },
  { id: "back", name: "Back", emoji: "🧍", injuries: ["Lower back pain", "Disc herniation", "Muscle strain"] },
  { id: "elbow", name: "Elbow", emoji: "🤝", injuries: ["Tennis elbow", "Golfer's elbow", "Bursitis"] },
  { id: "wrist", name: "Wrist", emoji: "✋", injuries: ["Sprain", "Carpal tunnel", "Tendonitis"] },
  { id: "hip", name: "Hip", emoji: "🕴️", injuries: ["Hip flexor strain", "Bursitis", "Labral tear"] },
  { id: "knee", name: "Knee", emoji: "🦵", injuries: ["ACL recovery", "Meniscus tear", "Runner's knee", "Patellar tendonitis"] },
  { id: "ankle", name: "Ankle", emoji: "🦶", injuries: ["Sprain", "Achilles tendonitis", "Stress fracture"] },
];

export const GOALS = [
  { id: "walk", name: "Walk pain-free", emoji: "🚶" },
  { id: "run5", name: "Run 5km", emoji: "🏃" },
  { id: "run10", name: "Run 10km", emoji: "🏃‍♂️" },
  { id: "sport", name: "Return to sport", emoji: "⚽" },
  { id: "strength", name: "Build strength", emoji: "🏋️" },
  { id: "daily", name: "Daily activities", emoji: "🌿" },
];

export const STAGES = [
  { id: 1, key: "early", name: "Early recovery", desc: "Reduce pain and inflammation" },
  { id: 2, key: "mobility", name: "Mobility", desc: "Restore range of motion" },
  { id: 3, key: "bands", name: "Resistance bands", desc: "Light controlled loading" },
  { id: 4, key: "strength", name: "Strength", desc: "Build muscle support" },
  { id: 5, key: "balance", name: "Balance", desc: "Proprioception & control" },
  { id: 6, key: "running", name: "Running", desc: "Return to impact" },
  { id: 7, key: "sport", name: "Return to sport", desc: "Full performance" },
] as const;

export type StageKey = typeof STAGES[number]["key"];

export type Exercise = {
  name: string;
  sets: string;
  description?: string;
  tip?: string;
  imageUrl?: string;
};

export const EXERCISES_BY_STAGE: Record<StageKey, Exercise[]> = {
  early: [
    { name: "Gentle isometric hold", sets: "3 × 20s" },
    { name: "Ice & elevation", sets: "15 min" },
    { name: "Slow ankle pumps", sets: "3 × 15" },
  ],
  mobility: [
    { name: "Range of motion circles", sets: "3 × 10" },
    { name: "Assisted stretch", sets: "3 × 30s" },
    { name: "Foam roll", sets: "5 min" },
  ],
  bands: [
    { name: "Band resisted extension", sets: "3 × 12" },
    { name: "Band lateral walks", sets: "3 × 10" },
    { name: "Band pull-aparts", sets: "3 × 15" },
  ],
  strength: [
    { name: "Bodyweight squats", sets: "3 × 12" },
    { name: "Glute bridges", sets: "3 × 15" },
    { name: "Calf raises", sets: "3 × 20" },
  ],
  balance: [
    { name: "Single leg stand", sets: "3 × 30s" },
    { name: "Bosu balance", sets: "3 × 45s" },
    { name: "Eyes-closed balance", sets: "3 × 20s" },
  ],
  running: [
    { name: "Easy jog intervals", sets: "5 × 2 min" },
    { name: "Dynamic warm-up", sets: "10 min" },
    { name: "Stride drills", sets: "4 × 30m" },
  ],
  sport: [
    { name: "Plyometric jumps", sets: "4 × 8" },
    { name: "Agility ladder", sets: "5 rounds" },
    { name: "Sport-specific drills", sets: "20 min" },
  ],
};

// Curated, injury-specific plans. Each stage returns exactly 3 progressive,
// logical exercises for that injury. Used when we have a matching plan;
// otherwise we fall back to EXERCISES_BY_STAGE.
type ExercisePlan = Record<StageKey, Exercise[]>;

const ANKLE_SPRAIN_PLAN: ExercisePlan = {
  early: [
    { name: "Ankle pumps", sets: "3 × 15", description: "Boosts circulation & reduces swelling", tip: "Move through full range", imageUrl: "" },
    { name: "Ice & elevation", sets: "15 min", description: "Calms inflammation in early healing", tip: "Elevate above heart", imageUrl: "" },
    { name: "Isometric inversion/eversion", sets: "3 × 10s", description: "Activates stabilizers without strain", tip: "Press gently, no pain", imageUrl: "" },
  ],
  mobility: [
    { name: "Ankle alphabet", sets: "2 × full", description: "Restores multi-direction mobility", tip: "Draw large letters", imageUrl: "" },
    { name: "Towel calf stretch", sets: "3 × 30s", description: "Lengthens tight calf tissue", tip: "Keep knee straight", imageUrl: "" },
    { name: "Seated dorsiflexion rocks", sets: "3 × 12", description: "Improves forward ankle bend", tip: "Knee over toes", imageUrl: "" },
  ],
  bands: [
    { name: "Band dorsiflexion", sets: "3 × 12", description: "Strengthens shin stabilizers", tip: "Slow, controlled movement", imageUrl: "" },
    { name: "Band eversion", sets: "3 × 12", description: "Rebuilds outer ankle strength", tip: "Keep heel planted", imageUrl: "" },
    { name: "Band inversion", sets: "3 × 12", description: "Rebuilds inner ankle strength", tip: "Move only the foot", imageUrl: "" },
  ],
  strength: [
    { name: "Double-leg calf raises", sets: "3 × 15", description: "Builds calf and ankle power", tip: "Pause at the top", imageUrl: "" },
    { name: "Heel walks", sets: "3 × 20m", description: "Strengthens front shin muscles", tip: "Toes high, stay tall", imageUrl: "" },
    { name: "Toe walks", sets: "3 × 20m", description: "Loads calves dynamically", tip: "Heels high, small steps", imageUrl: "" },
  ],
  balance: [
    { name: "Single-leg stand", sets: "3 × 30s", description: "Retrains ankle proprioception", tip: "Soft knee, tall spine", imageUrl: "" },
    { name: "Single-leg reach", sets: "3 × 10", description: "Challenges balance in motion", tip: "Hinge from the hip", imageUrl: "" },
    { name: "Eyes-closed balance", sets: "3 × 20s", description: "Sharpens neuromuscular control", tip: "Breathe, stay relaxed", imageUrl: "" },
  ],
  running: [
    { name: "Jog-walk intervals", sets: "5 × 2 min", description: "Eases tendons back into impact", tip: "Land soft, stay relaxed", imageUrl: "" },
    { name: "Single-leg hops (low)", sets: "3 × 8", description: "Builds elastic ankle strength", tip: "Quiet, controlled landings", imageUrl: "" },
    { name: "Lateral bounds", sets: "3 × 10", description: "Prepares for side-to-side load", tip: "Stick each landing", imageUrl: "" },
  ],
  sport: [
    { name: "Cutting drills (figure-8)", sets: "4 × 30s", description: "Trains direction changes at speed", tip: "Push off outside leg", imageUrl: "" },
    { name: "Box jumps", sets: "4 × 6", description: "Develops explosive ankle power", tip: "Soft, stable landings", imageUrl: "" },
    { name: "Agility ladder", sets: "5 rounds", description: "Sharpens foot speed & control", tip: "Eyes up, quick feet", imageUrl: "" },
  ],
};

const KNEE_PAIN_PLAN: ExercisePlan = {
  early: [
    { name: "Quad sets (isometric)", sets: "3 × 10s", description: "Wakes up the quads safely", tip: "Press knee down firmly", imageUrl: "" },
    { name: "Straight leg raises", sets: "3 × 10", description: "Builds quad strength with no knee load", tip: "Keep knee locked straight", imageUrl: "" },
    { name: "Heel slides", sets: "3 × 12", description: "Restores gentle knee bend", tip: "Move within pain-free range", imageUrl: "" },
  ],
  mobility: [
    { name: "Knee flex/extend (supine)", sets: "3 × 12", description: "Improves full knee range", tip: "Move slow and smooth", imageUrl: "" },
    { name: "Hamstring stretch", sets: "3 × 30s", description: "Relieves tension behind the knee", tip: "Keep back flat", imageUrl: "" },
    { name: "Quad stretch", sets: "3 × 30s", description: "Lengthens the front of the thigh", tip: "Tuck pelvis under", imageUrl: "" },
  ],
  bands: [
    { name: "Band terminal knee extension", sets: "3 × 12", description: "Strengthens the inner quad (VMO)", tip: "Lock knee at the end", imageUrl: "" },
    { name: "Band clamshells", sets: "3 × 12", description: "Activates glutes to protect the knee", tip: "Feet together, hips still", imageUrl: "" },
    { name: "Band monster walks", sets: "3 × 10", description: "Builds hip stability", tip: "Stay low, small steps", imageUrl: "" },
  ],
  strength: [
    { name: "Wall sit", sets: "3 × 30s", description: "Builds quad endurance", tip: "Knees over ankles", imageUrl: "" },
    { name: "Step-ups (low box)", sets: "3 × 10", description: "Trains controlled knee loading", tip: "Drive through the heel", imageUrl: "" },
    { name: "Glute bridges", sets: "3 × 15", description: "Offloads knee by firing glutes", tip: "Squeeze at the top", imageUrl: "" },
  ],
  balance: [
    { name: "Single-leg stand", sets: "3 × 30s", description: "Trains knee & hip control", tip: "Soft knee, tall posture", imageUrl: "" },
    { name: "Single-leg Romanian deadlift", sets: "3 × 8", description: "Builds posterior chain balance", tip: "Hinge, don't squat", imageUrl: "" },
    { name: "Bosu squat", sets: "3 × 10", description: "Challenges knee stability", tip: "Keep knees tracking toes", imageUrl: "" },
  ],
  running: [
    { name: "Run-walk intervals", sets: "5 × 2 min", description: "Gradually reloads the knee", tip: "Light, quick steps", imageUrl: "" },
    { name: "Forward step-downs", sets: "3 × 10", description: "Trains eccentric quad control", tip: "Slow on the way down", imageUrl: "" },
    { name: "Split squats", sets: "3 × 8", description: "Builds single-leg strength", tip: "Front knee over mid-foot", imageUrl: "" },
  ],
  sport: [
    { name: "Lateral bounds", sets: "4 × 10", description: "Prepares knee for side loads", tip: "Land soft, hold 1s", imageUrl: "" },
    { name: "Deceleration drills", sets: "4 × 20m", description: "Teaches safe stopping mechanics", tip: "Sit hips back to stop", imageUrl: "" },
    { name: "Cutting drills", sets: "4 × 30s", description: "Rebuilds confidence changing direction", tip: "Drive off outside leg", imageUrl: "" },
  ],
};

const SHOULDER_PAIN_PLAN: ExercisePlan = {
  early: [
    { name: "Pendulum swings", sets: "3 × 30s", description: "Gently decompresses the shoulder", tip: "Let gravity do the work", imageUrl: "" },
    { name: "Scapular squeezes", sets: "3 × 12", description: "Activates upper back muscles", tip: "Pinch shoulder blades together", imageUrl: "" },
    { name: "Isometric external rotation", sets: "3 × 10s", description: "Wakes up rotator cuff safely", tip: "Press without moving", imageUrl: "" },
  ],
  mobility: [
    { name: "Wall slides", sets: "3 × 10", description: "Improves overhead mobility", tip: "Keep arms on the wall", imageUrl: "" },
    { name: "Cross-body stretch", sets: "3 × 30s", description: "Loosens the back of the shoulder", tip: "Pull gently, no pinch", imageUrl: "" },
    { name: "Sleeper stretch", sets: "3 × 30s", description: "Restores internal rotation", tip: "Stop before any pinch", imageUrl: "" },
  ],
  bands: [
    { name: "Band external rotation", sets: "3 × 12", description: "Strengthens rotator cuff", tip: "Keep elbow at your side", imageUrl: "" },
    { name: "Band internal rotation", sets: "3 × 12", description: "Balances rotator cuff strength", tip: "Slow, controlled tempo", imageUrl: "" },
    { name: "Band pull-aparts", sets: "3 × 15", description: "Builds scapular stability", tip: "Lead with the shoulder blades", imageUrl: "" },
  ],
  strength: [
    { name: "Dumbbell shoulder press (light)", sets: "3 × 10", description: "Rebuilds overhead strength", tip: "Press in a pain-free arc", imageUrl: "" },
    { name: "Prone Y-T-W raises", sets: "3 × 8 each", description: "Strengthens mid & lower traps", tip: "Thumbs up, squeeze blades", imageUrl: "" },
    { name: "Push-up plus", sets: "3 × 10", description: "Builds serratus stability", tip: "Push a little past the top", imageUrl: "" },
  ],
  balance: [
    { name: "Plank shoulder taps", sets: "3 × 10", description: "Trains shoulder stability under load", tip: "Keep hips square", imageUrl: "" },
    { name: "Bird-dog", sets: "3 × 10", description: "Builds shoulder–core control", tip: "Move slow, stay steady", imageUrl: "" },
    { name: "Bear crawl", sets: "3 × 20s", description: "Integrates shoulder stability", tip: "Hips low, knees hover", imageUrl: "" },
  ],
  running: [
    { name: "Med ball chest pass", sets: "3 × 10", description: "Introduces dynamic shoulder load", tip: "Push explosively", imageUrl: "" },
    { name: "Overhead carry", sets: "3 × 30s", description: "Builds overhead endurance", tip: "Ribs down, arms locked", imageUrl: "" },
    { name: "Arm swing drills (run form)", sets: "3 × 30s", description: "Improves running posture", tip: "Relax shoulders, drive elbows", imageUrl: "" },
  ],
  sport: [
    { name: "Med ball slams", sets: "4 × 8", description: "Builds explosive shoulder power", tip: "Full extension, then slam", imageUrl: "" },
    { name: "Plyometric push-up", sets: "4 × 6", description: "Trains reactive shoulder strength", tip: "Soft catch each rep", imageUrl: "" },
    { name: "Sport-specific throws", sets: "4 × 10", description: "Returns shoulder to sport demands", tip: "Warm up progressively", imageUrl: "" },
  ],
};

function normalize(s: string | null | undefined) {
  return (s ?? "").toLowerCase();
}

/**
 * Resolve a curated exercise plan for a given body part + injury + stage.
 * Falls back to the generic EXERCISES_BY_STAGE if no specific plan matches.
 */
export function getExercisesFor(
  bodyId: string | null,
  injury: string | null,
  stageKey: StageKey | null
): Exercise[] {
  if (!stageKey) return [];
  const b = normalize(bodyId);
  const i = normalize(injury);

  if (b === "ankle" && (i.includes("sprain") || i === "")) {
    return ANKLE_SPRAIN_PLAN[stageKey];
  }
  if (b === "knee") {
    // "knee pain" umbrella covers ACL, meniscus, runner's knee, patellar tendonitis
    return KNEE_PAIN_PLAN[stageKey];
  }
  if (b === "shoulder") {
    // "shoulder pain" umbrella covers rotator cuff, impingement, frozen shoulder
    return SHOULDER_PAIN_PLAN[stageKey];
  }
  return EXERCISES_BY_STAGE[stageKey];
}

export type AppState = {
  step: "onboarding" | "body" | "injury" | "goal" | "stage" | "dashboard";
  bodyId: string | null;
  injury: string | null;
  goalId: string | null;
  stageKey: StageKey | null;
  // dashboard data
  days: Record<string, DayEntry>;          // YYYY-MM-DD -> per-day record
  lastActiveDate: string | null;
  streak: number;
  weeklyTarget: number;                    // 3-5 sessions per week
  // Legacy (kept optional so old saved state still loads)
  doneToday?: Record<string, ExerciseEntry>;
  week?: Record<string, "done" | "missed" | "partial">;
  painLevel?: number;
};

export type ExerciseStatus = "done" | "partial";
export type ExerciseDifficulty = "easy" | "medium" | "hard";

export type ExerciseEntry = {
  status: ExerciseStatus;
  difficulty?: ExerciseDifficulty;
};

export type DayEntry = {
  exercises: Record<string, ExerciseEntry>;
  pain: number;
  completed: boolean;
};

export const EMPTY_DAY: DayEntry = { exercises: {}, pain: 3, completed: false };

export const INITIAL_STATE: AppState = {
  step: "onboarding",
  bodyId: null,
  injury: null,
  goalId: null,
  stageKey: null,
  days: {},
  lastActiveDate: null,
  streak: 0,
  weeklyTarget: 5,
};

const STORAGE_KEY = "rehab-companion-v1";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("step" in parsed)) {
      return INITIAL_STATE;
    }
    const merged: AppState = { ...INITIAL_STATE, ...parsed };
    // Migrate legacy shape -> days map
    if (!merged.days || typeof merged.days !== "object") merged.days = {};
    if (parsed.doneToday && parsed.lastActiveDate && !merged.days[parsed.lastActiveDate]) {
      const exCount = Object.keys(parsed.doneToday).length;
      const doneCount = Object.values(parsed.doneToday as Record<string, ExerciseEntry>)
        .filter((e) => e?.status === "done").length;
      merged.days[parsed.lastActiveDate] = {
        exercises: parsed.doneToday,
        pain: parsed.painLevel ?? 3,
        completed: exCount > 0 && doneCount === exCount,
      };
    }
    return merged;
  } catch {
    return INITIAL_STATE;
  }
}

export function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function resetState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getWeekDays(): { key: string; label: string; isToday: boolean }[] {
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const day = today.getDay(); // 0=Sun
  // Make Monday-first
  const monOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setDate(today.getDate() + monOffset);
  const out: { key: string; label: string; isToday: boolean }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({
      key,
      label: labels[d.getDay()],
      isToday: key === todayKey(),
    });
  }
  return out;
}

export function dayLabel(key: string): string {
  const today = todayKey();
  if (key === today) return "Today";
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const diff = Math.round((date.getTime() - todayDate.getTime()) / 86400000);
  if (diff === -1) return "Yesterday";
  if (diff === 1) return "Tomorrow";
  return date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}