'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dumbbell, FileText, ArrowRight, Zap, Sparkles } from 'lucide-react'
import type { CheckinForm } from '@/lib/types'
import { RIRInputRow } from '@/components/training/rir-input-row'
import { NutritionSlotSelector } from '@/components/nutrition/nutrition-slot-selector'
import { MOCK_TRAINING_BLOCK, MOCK_MEAL_PLAN } from '@/lib/mock-data'
import { generateSessionAdjustment, generateMealSuggestion } from '@/lib/gemini'
import { useLanguage } from '@/i18n/LanguageContext'

interface Props {
  dailyWellness: CheckinForm | null
}

export function AthleteDashboard({ dailyWellness }: Props) {
  const { t } = useLanguage()
  const [consumedSlots, setConsumedSlots] = useState<Record<string, number>>({})
  const [mealSuggestions, setMealSuggestions] = useState<Record<string, string>>({})
  const [loadingMeal, setLoadingMeal] = useState<string | null>(null)
  const [readinessTip, setReadinessTip] = useState<string | null>(null)
  const [loadingAi, setLoadingAi] = useState(false)

  const handleAddSlot = (group: string) => {
    setConsumedSlots(prev => ({
      ...prev,
      [group]: (prev[group] || 0) + 1
    }))
  }

  const handleGetMealSuggestion = async (mealName: string, slots: Record<string, number>) => {
    setLoadingMeal(mealName)
    const suggestion = await generateMealSuggestion(mealName, slots)
    setMealSuggestions(prev => ({ ...prev, [mealName]: suggestion }))
    setLoadingMeal(null)
  }

  const handleReadinessCheck = async () => {
    if (!dailyWellness) return
    setLoadingAi(true)
    const tip = await generateSessionAdjustment(
      dailyWellness.fatigue,
      dailyWellness.sleepQuality,
      MOCK_TRAINING_BLOCK.name
    )
    setReadinessTip(tip)
    setLoadingAi(false)
  }

  return (
    <div className="space-y-6">
      {/* Recovery Alert */}
      {dailyWellness && (dailyWellness.fatigue >= 4 || dailyWellness.sleepQuality <= 5) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-amber-800 font-bold flex items-center gap-2">
                <Zap size={18} className="fill-amber-500 text-amber-500" />
                {t.athleteDashboard.recoveryAlert}
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                {t.athleteDashboard.readinessLow.replace('{fatigue}', dailyWellness.fatigue.toString())}
              </p>
            </div>
            {!readinessTip && (
              <Button
                onClick={handleReadinessCheck}
                disabled={loadingAi}
                size="sm"
                variant="outline"
                className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 transition-all transform hover:scale-105"
              >
                <Sparkles size={12} className="mr-1" />
                {loadingAi ? t.athleteDashboard.thinking : t.athleteDashboard.getAdjustment}
              </Button>
            )}
          </div>

          {readinessTip && (
            <div className="mt-3 p-3 bg-white/50 rounded-lg text-sm text-amber-900 font-medium border border-amber-100 animate-in fade-in slide-in-from-top-2">
              <span className="font-bold">{t.athleteDashboard.coachGemini}</span> {readinessTip}
            </div>
          )}
        </div>
      )}

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Workout Card */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Leg Day (Hypertrophy)</h2>
            <p className="text-slate-400 mb-6">{t.athleteDashboard.block} 1 • {t.athleteDashboard.week} 3</p>
            <Button className="bg-blue-600 hover:bg-blue-500 transition-all transform hover:scale-105">
              {t.athleteDashboard.startWorkout} <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          <Dumbbell
            className="absolute -right-4 -bottom-4 text-slate-700 opacity-20 transform rotate-[-15deg]"
            size={150}
          />
        </Card>

        {/* Nutrition Card */}
        <Card className="p-6 transition-all hover:shadow-md">
          <h3 className="font-bold text-slate-800 mb-4">{t.athleteDashboard.dailyNutrition}</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>{t.athleteDashboard.carbs}</span>
                <span>4/6 {t.athleteDashboard.slots}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-2/3 transition-all duration-500"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-500">
                <span>{t.athleteDashboard.protein}</span>
                <span>3/5 {t.athleteDashboard.slots}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/5 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Training Log Section */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Dumbbell size={20} /> {t.athleteDashboard.todaysTraining}
        </h2>
        <Card className="transition-all hover:shadow-md">
          <div className="bg-slate-50 px-4 py-3 border-b flex justify-between items-center">
            <span className="font-bold text-slate-700">Back Squat</span>
            <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">
              3 {t.athleteDashboard.sets} • 2 {t.athleteDashboard.rir}
            </span>
          </div>
          <div className="p-4 space-y-2">
            {[0, 1, 2].map(i => (
              <RIRInputRow
                key={i}
                setIndex={i}
                exercise={MOCK_TRAINING_BLOCK.exercises[0]}
              />
            ))}
          </div>
        </Card>
      </section>

      {/* Nutrition Log Section */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FileText size={20} /> {t.athleteDashboard.mealTracking}
        </h2>
        {MOCK_MEAL_PLAN.map(meal => (
          <div key={meal.mealName} className="mb-4">
            <div className="flex justify-between items-center mb-2 px-1">
              <div className="flex-1"></div>
              {!mealSuggestions[meal.mealName] ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleGetMealSuggestion(meal.mealName, meal.slots as unknown as Record<string, number>)}
                  disabled={loadingMeal === meal.mealName}
                  className="text-blue-600 hover:text-blue-700 transition-all transform hover:scale-105"
                >
                  <Sparkles size={12} className="mr-1" />
                  {loadingMeal === meal.mealName ? t.nutrition.chefThinking : t.nutrition.suggestIdea}
                </Button>
              ) : (
                <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
                  <Sparkles size={12} className="mt-0.5 shrink-0" />
                  <span>{mealSuggestions[meal.mealName]}</span>
                </div>
              )}
            </div>

            <NutritionSlotSelector
              mealName={meal.mealName}
              requiredSlots={meal.slots}
              consumedSlots={consumedSlots}
              onAddSlot={handleAddSlot}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
