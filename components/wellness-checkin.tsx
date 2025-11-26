'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import type { CheckinForm } from '@/lib/types'
import { useLanguage } from '@/i18n/LanguageContext'

const checkinSchema = z.object({
  fatigue: z.number().min(1).max(5),
  sleepQuality: z.number().min(1).max(10),
  motivation: z.number().min(1).max(10),
})

interface Props {
  onComplete: (data: CheckinForm) => void
  onBack?: () => void
}

export function WellnessCheckin({ onComplete, onBack }: Props) {
  const { t } = useLanguage()
  const { register, handleSubmit, watch, setValue } = useForm<CheckinForm>({
    resolver: zodResolver(checkinSchema),
    defaultValues: { fatigue: 3, sleepQuality: 7, motivation: 7 }
  })

  const fatigue = watch('fatigue')

  const onSubmit = (data: CheckinForm) => {
    onComplete(data)
  }

  return (
    <div className="max-w-md mx-auto">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.common.back}
        </Button>
      )}

      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="text-center text-xl">{t.wellnessCheckin.title}</CardTitle>
          <CardDescription className="text-slate-400 text-center">
            {t.wellnessCheckin.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Fatigue */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                {t.wellnessCheckin.fatigueLabel}: {fatigue}/5
              </Label>
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>{t.wellnessCheckin.fatigueFresh}</span>
                <span>{t.wellnessCheckin.fatigueExhausted}</span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[fatigue]}
                onValueChange={(value) => setValue('fatigue', value[0])}
                className="w-full"
              />
            </div>

            {/* Sleep */}
            <div>
              <Label htmlFor="sleepQuality" className="text-sm font-medium mb-2 block">
                {t.wellnessCheckin.sleepQualityLabel}
              </Label>
              <Input
                id="sleepQuality"
                type="number"
                min="1"
                max="10"
                {...register('sleepQuality', { valueAsNumber: true })}
                className="text-center font-bold text-lg"
              />
            </div>

            {/* Motivation */}
            <div>
              <Label htmlFor="motivation" className="text-sm font-medium mb-2 block">
                {t.wellnessCheckin.motivationLabel}
              </Label>
              <Input
                id="motivation"
                type="number"
                min="1"
                max="10"
                {...register('motivation', { valueAsNumber: true })}
                className="text-center font-bold text-lg"
              />
            </div>

            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 transition-all transform hover:scale-[1.02] active:scale-95">
              {t.wellnessCheckin.submitButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
