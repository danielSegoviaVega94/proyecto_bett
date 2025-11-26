import { UserRole, FoodGroup, type User, type TrainingBlock, type FoodItem, type WellnessLog } from './types'

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Coach Carter', email: 'coach@apex.com', role: UserRole.COACH, avatarUrl: 'https://picsum.photos/id/1/200/200' },
  { id: 'u2', name: 'Dr. Sarah (Nutri)', email: 'sarah@apex.com', role: UserRole.NUTRITIONIST, avatarUrl: 'https://picsum.photos/id/64/200/200' },
  { id: 'u3', name: 'Alex Athlete', email: 'alex@apex.com', role: UserRole.ATHLETE, avatarUrl: 'https://picsum.photos/id/88/200/200' },
]

export const MOCK_FOOD_DATABASE: FoodItem[] = [
  { id: 'f1', group: FoodGroup.CARB, name: 'Rice (Cooked)', portionSize: '130g', isPublic: true },
  { id: 'f2', group: FoodGroup.CARB, name: 'Oats (Raw)', portionSize: '40g', isPublic: true },
  { id: 'f3', group: FoodGroup.CARB, name: 'Sweet Potato', portionSize: '150g', isPublic: true },
  { id: 'f4', group: FoodGroup.PROTEIN, name: 'Chicken Breast', portionSize: '100g', isPublic: true },
  { id: 'f5', group: FoodGroup.PROTEIN, name: 'Egg Whites', portionSize: '200g', isPublic: true },
  { id: 'f6', group: FoodGroup.PROTEIN, name: 'Tuna', portionSize: '100g', isPublic: true },
  { id: 'f7', group: FoodGroup.FAT, name: 'Avocado', portionSize: '50g', isPublic: true },
  { id: 'f8', group: FoodGroup.FAT, name: 'Olive Oil', portionSize: '1 tbsp', isPublic: true },
  { id: 'f9', group: FoodGroup.VEGGIE, name: 'Broccoli', portionSize: '1 cup', isPublic: true },
  { id: 'f10', group: FoodGroup.VEGGIE, name: 'Spinach', portionSize: '2 cups', isPublic: true },
  { id: 'f11', group: FoodGroup.FRUIT, name: 'Banana', portionSize: '1 medium', isPublic: true },
  { id: 'f12', group: FoodGroup.FRUIT, name: 'Apple', portionSize: '1 medium', isPublic: true },
]

export const MOCK_WELLNESS_LOGS: WellnessLog[] = [
  {
    id: 'w1',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    athleteId: 'u3',
    fatigue: 2,
    soreness: ['Legs'],
    motivation: 8,
    sleepQuality: 7
  },
  {
    id: 'w2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    athleteId: 'u3',
    fatigue: 4,
    soreness: ['Legs', 'Back'],
    motivation: 5,
    sleepQuality: 4
  },
]

export const MOCK_TRAINING_BLOCK = {
  id: 'tb1',
  name: 'Hypertrophy Phase 1',
  athleteId: 'u3',
  coachId: 'u1',
  isActive: true,
  exercises: [
    {
      id: 'we1',
      exerciseId: 'ex1',
      exerciseName: 'Back Squat',
      sets: 3,
      targetReps: '6-8',
      targetRIR: 2,
      restSeconds: 180,
      workoutId: 'w1',
      orderIndex: 0
    },
    {
      id: 'we2',
      exerciseId: 'ex2',
      exerciseName: 'Bench Press',
      sets: 3,
      targetReps: '8-10',
      targetRIR: 2,
      restSeconds: 120,
      workoutId: 'w1',
      orderIndex: 1
    },
    {
      id: 'we3',
      exerciseId: 'ex3',
      exerciseName: 'Pull Ups',
      sets: 3,
      targetReps: 'AMRAP',
      targetRIR: 1,
      restSeconds: 90,
      workoutId: 'w1',
      orderIndex: 2
    },
  ]
}

export const MOCK_MEAL_PLAN = [
  {
    mealName: 'Breakfast',
    slots: {
      [FoodGroup.CARB]: 2,
      [FoodGroup.PROTEIN]: 1,
      [FoodGroup.FAT]: 1
    }
  },
  {
    mealName: 'Lunch',
    slots: {
      [FoodGroup.CARB]: 2,
      [FoodGroup.PROTEIN]: 2,
      [FoodGroup.VEGGIE]: 2
    }
  },
  {
    mealName: 'Dinner',
    slots: {
      [FoodGroup.PROTEIN]: 2,
      [FoodGroup.FAT]: 2,
      [FoodGroup.VEGGIE]: 2
    }
  },
]

export const getUserLogs = (athleteId: string) => {
  return MOCK_WELLNESS_LOGS.filter(l => l.athleteId === athleteId)
}
