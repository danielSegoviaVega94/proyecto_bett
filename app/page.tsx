import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Users, Apple } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-black tracking-tight">
              APEX<span className="text-blue-600">PERFORMANCE</span>
            </h1>
          </div>
          <Link href="/auth/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Professional Coaching,<br />
          <span className="text-blue-600">Data-Driven Results</span>
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          The only platform built on RIR/RPE auto-regulation and Exchange Portion nutrition methodology.
          Designed for coaches, nutritionists, and athletes who demand precision.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg">
              Get Started Free
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline" className="text-lg">
              Try Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Built for Every Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coach */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>For Coaches</CardTitle>
              <CardDescription>
                Create RIR/RPE-based training blocks, monitor athlete readiness, and track progressive overload.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Drag-and-drop workout builder</li>
                <li>✓ Block periodization tools</li>
                <li>✓ Real-time fatigue risk alerts</li>
                <li>✓ Progressive overload tracking</li>
              </ul>
            </CardContent>
          </Card>

          {/* Nutritionist */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Apple className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>For Nutritionists</CardTitle>
              <CardDescription>
                Manage food exchange databases and create slot-based meal plans (no calorie counting).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Exchange portion system</li>
                <li>✓ Custom food databases</li>
                <li>✓ Meal formula templates</li>
                <li>✓ Adherence analytics</li>
              </ul>
            </CardContent>
          </Card>

          {/* Athlete */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>For Athletes</CardTitle>
              <CardDescription>
                Mobile-first logging with daily wellness check-ins and AI-powered recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Quick RIR/RPE logging</li>
                <li>✓ Nutrition slot tracker</li>
                <li>✓ Daily readiness check-in</li>
                <li>✓ AI session adjustments</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Elevate Your Performance?</h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join coaches and athletes who trust data-driven methodologies over generic fitness apps.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2025 Apex Performance Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
