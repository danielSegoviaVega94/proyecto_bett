export enum UserRole {
  COACH = 'COACH',
  NUTRITIONIST = 'NUTRITIONIST',
  ATHLETE = 'ATHLETE'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
}

// --- Wellness Domain ---
export interface WellnessLog {
  id: string;
  date: string; // ISO Date
  athleteId: string;
  fatigue: number; // 1-5
  soreness: string[]; // Body parts
  motivation: number; // 1-10
  sleepQuality: number; // 1-10
}

// --- Training Domain (RIR/RPE) ---
export interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
}

export interface TrainingBlock {
  id: string;
  name: string;
  athleteId: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  targetReps: string; // e.g. "8-10"
  targetRIR: number; // Reps In Reserve
  restSeconds: number;
}

export interface ExerciseLog {
  id: string;
  date: string;
  exerciseId: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  actualRIR: number;
  note?: string;
}

// --- Nutrition Domain (Exchange System) ---
export type FoodGroup = 'CARB' | 'PROTEIN' | 'FAT' | 'VEGGIE' | 'FRUIT' | 'DAIRY';

export interface PortionExchange {
  id: string;
  group: FoodGroup;
  name: string;
  quantity: string; // e.g., "130g" or "1 slice"
}

export interface MealPlanSlot {
  mealName: string; // e.g., "Breakfast"
  slots: Record<FoodGroup, number>; // { CARB: 2, PROTEIN: 1 }
}

export interface DailyNutritionLog {
  date: string;
  athleteId: string;
  consumedSlots: Record<string, Record<FoodGroup, number>>; // MealName -> Group -> Count
}
