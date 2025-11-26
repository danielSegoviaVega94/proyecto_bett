'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Users, Apple } from 'lucide-react'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useLanguage } from '@/i18n/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-black tracking-tight">
              {t.appName}<span className="text-blue-600">{t.appNameSuffix}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link href="/auth/login">
              <Button>{t.auth.signIn}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
          {t.landing.heroTitle1}<br />
          <span className="text-blue-600">{t.landing.heroTitle2}</span>
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          {t.landing.heroSubtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg">
              {t.landing.getStartedFree}
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="text-lg">
              {t.auth.tryDemo}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">{t.landing.builtForEveryRole}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coach */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>{t.landing.forCoaches}</CardTitle>
              <CardDescription>
                {t.landing.forCoachesDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {t.landing.coachFeature1}</li>
                <li>✓ {t.landing.coachFeature2}</li>
                <li>✓ {t.landing.coachFeature3}</li>
                <li>✓ {t.landing.coachFeature4}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Nutritionist */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Apple className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>{t.landing.forNutritionists}</CardTitle>
              <CardDescription>
                {t.landing.forNutritionistsDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {t.landing.nutritionistFeature1}</li>
                <li>✓ {t.landing.nutritionistFeature2}</li>
                <li>✓ {t.landing.nutritionistFeature3}</li>
                <li>✓ {t.landing.nutritionistFeature4}</li>
              </ul>
            </CardContent>
          </Card>

          {/* Athlete */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>{t.landing.forAthletes}</CardTitle>
              <CardDescription>
                {t.landing.forAthletesDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ {t.landing.athleteFeature1}</li>
                <li>✓ {t.landing.athleteFeature2}</li>
                <li>✓ {t.landing.athleteFeature3}</li>
                <li>✓ {t.landing.athleteFeature4}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">{t.landing.ctaTitle}</h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {t.landing.ctaSubtitle}
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg">
              {t.landing.startFreeTrial}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>{t.landing.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
