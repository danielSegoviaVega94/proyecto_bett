'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserRole, type User, type CheckinForm } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Users, Apple, ArrowLeft } from 'lucide-react'
import { CoachDashboard } from '@/components/dashboards/coach-dashboard'
import { AthleteDashboard } from '@/components/dashboards/athlete-dashboard'
import { NutritionistDashboard } from '@/components/dashboards/nutritionist-dashboard'
import { WellnessCheckin } from '@/components/wellness-checkin'

// Mock users for demo
const MOCK_USERS: User[] = [
  { id: 'demo-coach', name: 'Coach Carter', email: 'coach@demo.com', role: UserRole.COACH, avatarUrl: 'https://picsum.photos/id/1/200/200' },
  { id: 'demo-nutritionist', name: 'Dr. Sarah (Nutri)', email: 'sarah@demo.com', role: UserRole.NUTRITIONIST, avatarUrl: 'https://picsum.photos/id/64/200/200' },
  { id: 'demo-athlete', name: 'Alex Athlete', email: 'alex@demo.com', role: UserRole.ATHLETE, avatarUrl: 'https://picsum.photos/id/88/200/200' },
]

export default function DemoPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [checkedIn, setCheckedIn] = useState(false)
  const [dailyWellness, setDailyWellness] = useState<CheckinForm | null>(null)

  const selectRole = (role: UserRole) => {
    const user = MOCK_USERS.find(u => u.role === role)
    if (user) {
      setCurrentUser(user)
      setCheckedIn(role !== UserRole.ATHLETE)
      setDailyWellness(null)
    }
  }

  const handleReset = () => {
    setCurrentUser(null)
    setCheckedIn(false)
    setDailyWellness(null)
  }

  // Role Selection Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Dumbbell className="h-16 w-16 text-blue-600" />
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4">
                APEX<span className="text-blue-600">PERFORMANCE</span> Demo
              </h1>
              <p className="text-slate-600 text-lg">
                Explore the platform from different perspectives. Select a role to begin.
              </p>
            </div>

            <div className="space-y-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500"
                onClick={() => selectRole(UserRole.COACH)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Coach</CardTitle>
                      <CardDescription>
                        Manage training blocks & view athlete analytics
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-green-500"
                onClick={() => selectRole(UserRole.NUTRITIONIST)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Apple className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Nutritionist</CardTitle>
                      <CardDescription>
                        Manage food exchange database & meal plans
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-500"
                onClick={() => selectRole(UserRole.ATHLETE)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Dumbbell className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Athlete</CardTitle>
                      <CardDescription>
                        Log workouts, track nutrition, and daily check-ins
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                This is a demo environment with sample data.
                <Link href="/auth/signup" className="text-blue-600 hover:underline ml-1">
                  Sign up
                </Link> for a real account.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Athlete Wellness Check-in Flow
  if (currentUser.role === UserRole.ATHLETE && !checkedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <WellnessCheckin
          onComplete={(data) => {
            setDailyWellness(data)
            setCheckedIn(true)
          }}
          onBack={handleReset}
        />
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dumbbell className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-black">
                APEX<span className="text-blue-600">PERFORMANCE</span>
              </h1>
              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-medium">
                DEMO MODE
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">{currentUser.name}</div>
                <div className="text-xs text-slate-500">{currentUser.role}</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>
                Change Role
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {currentUser.role === UserRole.COACH && <CoachDashboard />}
        {currentUser.role === UserRole.NUTRITIONIST && <NutritionistDashboard />}
        {currentUser.role === UserRole.ATHLETE && (
          <AthleteDashboard dailyWellness={dailyWellness} />
        )}
      </main>
    </div>
  )
}
