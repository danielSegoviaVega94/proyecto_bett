// Core type definitions for Apex Performance Platform

export enum UserRole {
  COACH = 'COACH',
  NUTRITIONIST = 'NUTRITIONIST',
  ATHLETE = 'ATHLETE'
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
}

// --- Wellness Domain ---
export interface WellnessLog {
  id: string
  date: string
  athleteId: string
  fatigue: number // 1-5
  soreness: string[]
  motivation: number // 1-10
  sleepQuality: number // 1-10
  notes?: string
}

// --- Training Domain (RIR/RPE) ---
export interface Exercise {
  id: string
  name: string
  targetMuscle: string
  description?: string
  videoUrl?: string
}

export interface TrainingBlock {
  id: string
  name: string
  athleteId: string
  coachId: string
  weeks: Week[]
  isActive: boolean
}

export interface Week {
  id: string
  weekNumber: number
  trainingBlockId: string
  workouts: Workout[]
}

export interface Workout {
  id: string
  weekId: string
  dayNumber: number
  name: string
  exercises: WorkoutExercise[]
}

export interface WorkoutExercise {
  id: string
  workoutId: string
  exerciseId: string
  exerciseName: string
  orderIndex: number
  sets: number
  targetReps: string
  targetRIR: number
  restSeconds: number
  notes?: string
}

export interface ExerciseLog {
  id: string
  date: string
  athleteId: string
  exerciseId: string
  setNumber: number
  weightKg: number
  reps: number
  actualRIR: number
  rpe?: number
  previousLogId?: string
  notes?: string
}

// --- Nutrition Domain (Exchange System) ---
export enum FoodGroup {
  CARB = 'CARB',
  PROTEIN = 'PROTEIN',
  FAT = 'FAT',
  VEGGIE = 'VEGGIE',
  FRUIT = 'FRUIT',
  DAIRY = 'DAIRY'
}

export interface FoodItem {
  id: string
  group: FoodGroup
  name: string
  portionSize: string
  description?: string
  isPublic: boolean
}

export interface MealPlan {
  id: string
  name: string
  athleteId: string
  meals: Meal[]
  isActive: boolean
}

export interface Meal {
  id: string
  mealPlanId: string
  mealName: string
  orderIndex: number
  slots: MealSlot[]
}

export interface MealSlot {
  id: string
  mealId: string
  foodGroup: FoodGroup
  quantity: number
}

export interface DailyNutritionLog {
  id: string
  date: string
  athleteId: string
  mealName: string
  foodGroup: FoodGroup
  foodItemId?: string
  portionsConsumed: number
  notes?: string
}

// --- UI Types ---
export interface CheckinForm {
  fatigue: number
  sleepQuality: number
  motivation: number
}
