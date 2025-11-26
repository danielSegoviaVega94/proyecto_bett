import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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
  const { register, handleSubmit } = useForm<CheckinForm>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { fatigue: 3, sleepQuality: 7, motivation: 7 }
  });

  const onSubmit = (data: CheckinForm) => {
    onComplete(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-6 text-white text-center">
          <h2 className="text-xl font-bold">Daily Check-in</h2>
          <p className="text-slate-400 text-sm mt-1">Ready to perform?</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Fatigue */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Fatigue Level (1-5)</label>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Fresh</span>
              <span>Exhausted</span>
            </div>
            <input 
              type="range" min="1" max="5" step="1"
              {...register('fatigue', { valueAsNumber: true })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>

          {/* Sleep */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sleep Quality (1-10)</label>
            <input 
              type="number" min="1" max="10"
              {...register('sleepQuality', { valueAsNumber: true })}
              className="w-full p-3 border border-slate-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>

           {/* Motivation */}
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Motivation (1-10)</label>
            <input 
              type="number" min="1" max="10"
              {...register('motivation', { valueAsNumber: true })}
              className="w-full p-3 border border-slate-300 rounded-lg text-center font-bold text-lg focus:ring-2 focus:ring-accent outline-none"
            />
          </div>

          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">
            Submit & Start Training
          </button>
        </form>
      </div>
    </div>
  );
};