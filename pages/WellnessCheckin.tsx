import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '../i18n/LanguageContext';

const checkinSchema = z.object({
  fatigue: z.number().min(1).max(5),
  sleepQuality: z.number().min(1).max(10),
  motivation: z.number().min(1).max(10),
});

export type CheckinForm = z.infer<typeof checkinSchema>;

interface Props {
  onComplete: (data: CheckinForm) => void;
}

export const WellnessCheckin: React.FC<Props> = ({ onComplete }) => {
  const { t } = useLanguage();
  const { register, handleSubmit } = useForm<CheckinForm>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { fatigue: 3, sleepQuality: 7, motivation: 7 }
  });

  const onSubmit = (data: CheckinForm) => {
    onComplete(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white text-center">
          <h2 className="text-xl font-bold">{t.wellnessCheckin.title}</h2>
          <p className="text-slate-400 text-sm mt-1">{t.wellnessCheckin.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Fatigue */}
          <div className="transition-all">
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.wellnessCheckin.fatigueLabel}</label>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{t.wellnessCheckin.fatigueFresh}</span>
              <span>{t.wellnessCheckin.fatigueExhausted}</span>
            </div>
            <input
              type="range" min="1" max="5" step="1"
              {...register('fatigue', { valueAsNumber: true })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent transition-all"
            />
          </div>

          {/* Sleep */}
          <div className="transition-all">
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.wellnessCheckin.sleepQualityLabel}</label>
            <input
              type="number" min="1" max="10"
              {...register('sleepQuality', { valueAsNumber: true })}
              className="w-full p-3 border border-slate-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>

           {/* Motivation */}
           <div className="transition-all">
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.wellnessCheckin.motivationLabel}</label>
            <input
              type="number" min="1" max="10"
              {...register('motivation', { valueAsNumber: true })}
              className="w-full p-3 border border-slate-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95">
            {t.wellnessCheckin.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
};