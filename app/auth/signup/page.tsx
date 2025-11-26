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
import { UserRole } from '@/lib/types'
import { useLanguage } from '@/i18n/LanguageContext'
import { LanguageSelector } from '@/components/LanguageSelector'

export default function SignupPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: UserRole.ATHLETE,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          role: formData.role,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
    } else {
      router.push('/auth/login?message=Check your email to confirm your account')
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
          <CardTitle className="text-2xl">{t.auth.createAccount}</CardTitle>
          <CardDescription>
            {t.auth.joinPlatform}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.auth.fullName}</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{t.auth.iAmA}</Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              >
                <option value={UserRole.ATHLETE}>{t.roles.athlete}</option>
                <option value={UserRole.COACH}>{t.roles.coach}</option>
                <option value={UserRole.NUTRITIONIST}>{t.roles.nutritionist}</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.auth.creatingAccount : t.auth.signUp}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">{t.auth.alreadyHaveAccount} </span>
            <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
              {t.auth.signIn}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
