'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Apple, Plus, Users, Database } from 'lucide-react'
import { MOCK_FOOD_DATABASE } from '@/lib/mock-data'
import { FoodGroup } from '@/lib/types'

const GROUP_COLORS: Record<FoodGroup, string> = {
  [FoodGroup.CARB]: 'bg-amber-100 text-amber-800 border-amber-200',
  [FoodGroup.PROTEIN]: 'bg-blue-100 text-blue-800 border-blue-200',
  [FoodGroup.FAT]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [FoodGroup.VEGGIE]: 'bg-green-100 text-green-800 border-green-200',
  [FoodGroup.FRUIT]: 'bg-pink-100 text-pink-800 border-pink-200',
  [FoodGroup.DAIRY]: 'bg-slate-100 text-slate-800 border-slate-200',
}

export function NutritionistDashboard() {
  const groupedFoods = MOCK_FOOD_DATABASE.reduce((acc, food) => {
    if (!acc[food.group]) acc[food.group] = []
    acc[food.group].push(food)
    return acc
  }, {} as Record<FoodGroup, typeof MOCK_FOOD_DATABASE>)

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nutritionist Dashboard</h2>
          <p className="text-slate-500">Manage exchange portion database & meal plans.</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Food Item
        </Button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Database className="h-4 w-4" />
              Food Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{MOCK_FOOD_DATABASE.length}</div>
            <p className="text-xs text-slate-500 mt-1">In exchange database</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-xs text-slate-500 mt-1">With meal plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Apple className="h-4 w-4" />
              Meal Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-slate-500 mt-1">Active templates</p>
          </CardContent>
        </Card>
      </div>

      {/* Food Exchange Database */}
      <Card>
        <CardHeader>
          <CardTitle>Food Exchange Database</CardTitle>
          <CardDescription>
            Portion-based food items organized by macronutrient groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedFoods).map(([group, foods]) => (
              <div key={group}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${GROUP_COLORS[group as FoodGroup]}`}>
                    {group}
                  </span>
                  <span className="text-sm text-slate-500">{foods.length} items</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {foods.map((food) => (
                    <div
                      key={food.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="font-medium text-sm text-slate-900">{food.name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Portion: {food.portionSize}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
