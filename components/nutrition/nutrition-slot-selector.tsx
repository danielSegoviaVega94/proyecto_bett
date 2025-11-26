'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Check, ChevronRight } from 'lucide-react'
import { FoodGroup, type FoodItem } from '@/lib/types'
import { MOCK_FOOD_DATABASE } from '@/lib/mock-data'

interface Props {
  mealName: string
  requiredSlots: Record<string, number> | { [key: string]: number | undefined }
  consumedSlots: Record<string, number>
  onAddSlot: (group: string) => void
}

const GROUP_COLORS: Record<string, string> = {
  [FoodGroup.CARB]: 'bg-amber-100 text-amber-800 border-amber-200',
  [FoodGroup.PROTEIN]: 'bg-blue-100 text-blue-800 border-blue-200',
  [FoodGroup.FAT]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [FoodGroup.VEGGIE]: 'bg-green-100 text-green-800 border-green-200',
  [FoodGroup.FRUIT]: 'bg-pink-100 text-pink-800 border-pink-200',
  [FoodGroup.DAIRY]: 'bg-slate-100 text-slate-800 border-slate-200',
}

export function NutritionSlotSelector({ mealName, requiredSlots, consumedSlots, onAddSlot }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const confirmFoodSelection = (food: FoodItem) => {
    onAddSlot(food.group)
    setSelectedGroup(null)
  }

  return (
    <>
      <Card className="p-4">
        <h3 className="font-semibold text-lg text-slate-800 mb-3">{mealName}</h3>

        <div className="space-y-3">
          {Object.entries(requiredSlots)
            .filter(([_, count]) => count !== undefined && count > 0)
            .map(([group, count]) => {
            const filled = (consumedSlots[group] as number) || 0
            const slots = []

            for (let i = 0; i < (count as number); i++) {
              const isFilled = i < filled
              slots.push(
                <button
                  key={i}
                  onClick={() => !isFilled && setSelectedGroup(group)}
                  disabled={isFilled}
                  className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                    ${isFilled
                      ? 'bg-slate-800 border-slate-800 text-white'
                      : 'border-slate-300 hover:border-slate-400 text-slate-400 bg-slate-50 hover:bg-slate-100'}
                  `}
                >
                  {isFilled ? <Check size={14} /> : <Plus size={14} />}
                </button>
              )
            }

            return (
              <div key={group} className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-bold ${GROUP_COLORS[group] || 'bg-gray-100'}`}>
                  {group}
                </span>
                <div className="flex gap-2">
                  {slots}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Food Selection Modal */}
      {selectedGroup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedGroup(null)}
        >
          <div
            className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h4 className="font-bold">Select {selectedGroup} Source</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGroup(null)}
              >
                Close
              </Button>
            </div>
            <div className="p-2">
              {MOCK_FOOD_DATABASE.filter(f => f.group === selectedGroup).map(food => (
                <button
                  key={food.id}
                  onClick={() => confirmFoodSelection(food)}
                  className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex justify-between items-center group transition-colors"
                >
                  <div>
                    <div className="font-medium text-slate-900">{food.name}</div>
                    <div className="text-sm text-slate-500">Portion: {food.portionSize}</div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-slate-600" size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
