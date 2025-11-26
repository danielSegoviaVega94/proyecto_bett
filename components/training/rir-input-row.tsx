'use client'

import { Input } from '@/components/ui/input'
import type { WorkoutExercise } from '@/lib/types'
import { useLanguage } from '@/i18n/LanguageContext'

interface Props {
  exercise: WorkoutExercise
  setIndex: number
}

export function RIRInputRow({ exercise, setIndex }: Props) {
  const { t } = useLanguage()
  // Mock previous data for progressive overload context
  const prevWeight = 100
  const prevReps = 8
  const prevRIR = 2

  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2 border-b border-slate-100 last:border-0">
      <div className="col-span-1 text-center font-bold text-slate-400">
        {setIndex + 1}
      </div>

      <div className="col-span-11 flex flex-col gap-2">
        {/* Previous History Context */}
        <div className="text-xs text-slate-400 flex justify-between px-1">
          <span>{t.training.previous}: {prevWeight}{t.training.kg} x {prevReps} @ {prevRIR} RIR</span>
          <span className="text-blue-600 font-medium">{t.training.target}: {exercise.targetRIR} RIR</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="relative">
            <Input
              type="number"
              placeholder={t.training.kg}
              className="text-center font-medium"
            />
            <span className="absolute right-2 top-2.5 text-[10px] text-slate-400 pointer-events-none">
              {t.training.kg.toUpperCase()}
            </span>
          </div>

          <div className="relative">
            <Input
              type="number"
              placeholder={t.training.repsPlaceholder}
              className="text-center font-medium"
            />
          </div>

          <div className="relative">
            <Input
              type="number"
              placeholder={t.training.rirPlaceholder}
              defaultValue={exercise.targetRIR}
              className={`text-center font-bold ${
                exercise.targetRIR < 2
                  ? 'bg-red-50 text-red-700 border-red-200 focus-visible:ring-red-500'
                  : 'bg-green-50 text-green-700 border-green-200 focus-visible:ring-green-500'
              }`}
            />
            <span className="absolute right-2 top-2.5 text-[10px] opacity-50 pointer-events-none">
              {t.training.rirPlaceholder.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
