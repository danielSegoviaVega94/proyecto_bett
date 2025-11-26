'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { LanguageSelector } from '@/components/LanguageSelector'

export default function LoginPage() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Dumbbell className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t.auth.welcomeBack}</CardTitle>
          <CardDescription>
            {t.auth.signInSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="coach@apex.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.auth.signingIn : t.auth.signIn}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">{t.auth.dontHaveAccount} </span>
            <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
              {t.auth.signUp}
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/demo" className="text-sm text-slate-500 hover:text-slate-700">
              {t.auth.tryDemo}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
