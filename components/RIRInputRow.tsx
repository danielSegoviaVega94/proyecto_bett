import React from 'react';
import { WorkoutExercise } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  exercise: WorkoutExercise;
  setIndex: number;
}

export const RIRInputRow: React.FC<Props> = ({ exercise, setIndex }) => {
  const { t } = useLanguage();
  // Mock previous data for visual context
  const prevWeight = 100;
  const prevReps = 8;
  const prevRIR = 2;

  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2 border-b border-slate-100 last:border-0 transition-all hover:bg-slate-50">
      <div className="col-span-1 text-center font-bold text-slate-400">
        {setIndex + 1}
      </div>

      <div className="col-span-11 flex flex-col gap-2">
        {/* Previous History Context */}
        <div className="text-xs text-slate-400 flex justify-between px-1">
          <span>Prev: {prevWeight}{t.training.kg} x {prevReps} @ {prevRIR} {t.training.rir}</span>
          <span className="text-accent font-medium">Target: {exercise.targetRIR} {t.training.rir}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="relative">
            <input
              type="number"
              placeholder={t.training.weightPlaceholder}
              className="w-full px-2 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded text-center font-medium focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
            />
            <span className="absolute right-1 top-1.5 text-[10px] text-slate-400 pointer-events-none">{t.training.kg.toUpperCase()}</span>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder={t.training.repsPlaceholder}
              className="w-full px-2 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded text-center font-medium focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all"
            />
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder={t.training.rirPlaceholder}
              defaultValue={exercise.targetRIR}
              className={`w-full px-2 py-1.5 text-sm border rounded text-center font-bold focus:ring-2 focus:outline-none transition-all
                ${exercise.targetRIR < 2 ? 'bg-red-50 text-red-700 border-red-200 focus:ring-red-500' : 'bg-green-50 text-green-700 border-green-200 focus:ring-green-500'}
              `}
            />
            <span className="absolute right-1 top-1.5 text-[10px] opacity-50 pointer-events-none">{t.training.rir.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
