import { User, UserRole, WellnessLog, TrainingBlock, PortionExchange, DailyNutritionLog } from '../types';

// --- Mock Data ---

export const USERS: User[] = [
  { id: 'u1', name: 'Coach Carter', role: UserRole.COACH, avatarUrl: 'https://picsum.photos/id/1/200/200' },
  { id: 'u2', name: 'Dr. Sarah (Nutri)', role: UserRole.NUTRITIONIST, avatarUrl: 'https://picsum.photos/id/64/200/200' },
  { id: 'u3', name: 'Alex Athlete', role: UserRole.ATHLETE, avatarUrl: 'https://picsum.photos/id/88/200/200' },
];

export const FOOD_DATABASE: PortionExchange[] = [
  { id: 'f1', group: 'CARB', name: 'Rice (Cooked)', quantity: '130g' },
  { id: 'f2', group: 'CARB', name: 'Oats (Raw)', quantity: '40g' },
  { id: 'f3', group: 'PROTEIN', name: 'Chicken Breast', quantity: '100g' },
  { id: 'f4', group: 'PROTEIN', name: 'Egg Whites', quantity: '200g' },
  { id: 'f5', group: 'FAT', name: 'Avocado', quantity: '50g' },
  { id: 'f6', group: 'VEGGIE', name: 'Broccoli', quantity: '1 cup' },
];

export const MOCK_WELLNESS_LOGS: WellnessLog[] = [
  { id: 'w1', date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], athleteId: 'u3', fatigue: 2, soreness: ['Legs'], motivation: 8, sleepQuality: 7 },
  { id: 'w2', date: new Date(Date.now() - 86400000).toISOString().split('T')[0], athleteId: 'u3', fatigue: 4, soreness: ['Legs', 'Back'], motivation: 5, sleepQuality: 4 },
];

export const MOCK_TRAINING_BLOCK: TrainingBlock = {
  id: 'tb1',
  name: 'Hypertrophy Phase 1',
  athleteId: 'u3',
  exercises: [
    { id: 'we1', exerciseId: 'ex1', exerciseName: 'Back Squat', sets: 3, targetReps: '6-8', targetRIR: 2, restSeconds: 180 },
    { id: 'we2', exerciseId: 'ex2', exerciseName: 'Bench Press', sets: 3, targetReps: '8-10', targetRIR: 2, restSeconds: 120 },
    { id: 'we3', exerciseId: 'ex3', exerciseName: 'Pull Ups', sets: 3, targetReps: 'AMRAP', targetRIR: 1, restSeconds: 90 },
  ]
};

export const MOCK_MEAL_PLAN = [
  { mealName: 'Breakfast', slots: { CARB: 2, PROTEIN: 1, FAT: 1 } },
  { mealName: 'Lunch', slots: { CARB: 2, PROTEIN: 2, VEGGIE: 2 } },
  { mealName: 'Dinner', slots: { PROTEIN: 2, FAT: 2, VEGGIE: 2 } },
];

// --- Service Methods ---

export const getUserLogs = (athleteId: string) => {
  return MOCK_WELLNESS_LOGS.filter(l => l.athleteId === athleteId);
};

export const getTrainingBlock = (athleteId: string) => {
  return MOCK_TRAINING_BLOCK;
};
