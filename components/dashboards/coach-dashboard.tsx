'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, TrendingDown, Sparkles, BrainCircuit } from 'lucide-react'
import { getUserLogs, MOCK_TRAINING_BLOCK } from '@/lib/mock-data'
import { generateAthleteAnalysis } from '@/lib/gemini'
import { useLanguage } from '@/i18n/LanguageContext'

export function CoachDashboard() {
  const { t } = useLanguage()
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [loadingAi, setLoadingAi] = useState(false)

  const handleAiAnalysis = async () => {
    setLoadingAi(true)
    const logs = getUserLogs('u3')
    const result = await generateAthleteAnalysis('Alex Athlete', logs)
    setAiAnalysis(result)
    setLoadingAi(false)
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t.coachDashboard.title}</h2>
          <p className="text-slate-500">{t.coachDashboard.subtitle}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105">
          {t.coachDashboard.newTrainingBlock}
        </Button>
      </header>

      {/* Risk Table */}
      <Card className="transition-all hover:shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle size={18} className="text-red-600" />
            {t.coachDashboard.highRiskAthletes}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                <tr>
                  <th className="p-4 text-left">{t.coachDashboard.athleteColumn}</th>
                  <th className="p-4 text-left">{t.coachDashboard.fatigueColumn}</th>
                  <th className="p-4 text-left">{t.coachDashboard.sleepColumn}</th>
                  <th className="p-4 text-left">{t.coachDashboard.trendColumn}</th>
                  <th className="p-4 text-left">{t.coachDashboard.actionColumn}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">Alex Athlete</td>
                  <td className="p-4">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                      4.2
                    </span>
                  </td>
                  <td className="p-4">5.5 {t.coachDashboard.hours}</td>
                  <td className="p-4 text-red-600 flex items-center gap-1">
                    <TrendingDown size={16} /> {t.coachDashboard.worsening}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleAiAnalysis}
                      disabled={loadingAi}
                      className="text-blue-600 hover:text-blue-700 transition-all"
                    >
                      <Sparkles size={14} className="mr-1" />
                      {loadingAi ? t.coachDashboard.analyzing : t.coachDashboard.aiAnalyze}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {aiAnalysis && (
            <div className="p-4 m-4 bg-slate-900 text-slate-200 rounded-lg animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold">
                <BrainCircuit size={18} />
                {t.coachDashboard.geminiInsight}
              </div>
              <div className="whitespace-pre-line leading-relaxed text-sm">
                {aiAnalysis}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="transition-all hover:shadow-md hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              {t.roles.athlete}s Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-slate-500 mt-1">+2 este mes</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Programas Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-slate-500 mt-1">En 3 bloques</p>
          </CardContent>
        </Card>

        <Card className="transition-all hover:shadow-md hover:scale-[1.02]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500">
              Adherencia Prom.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-green-600 mt-1">↑ 5% última semana</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
