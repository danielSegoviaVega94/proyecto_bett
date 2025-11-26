import React, { useState } from 'react';
import { FoodGroup, PortionExchange } from '../types';
import { FOOD_DATABASE } from '../services/mockDatabase';
import { Plus, Check, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  mealName: string;
  requiredSlots: Record<string, number>;
  consumedSlots: Record<string, number>;
  onAddSlot: (group: string) => void;
}

const GROUP_COLORS: Record<string, string> = {
  CARB: 'bg-amber-100 text-amber-800 border-amber-200',
  PROTEIN: 'bg-blue-100 text-blue-800 border-blue-200',
  FAT: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  VEGGIE: 'bg-green-100 text-green-800 border-green-200',
  FRUIT: 'bg-pink-100 text-pink-800 border-pink-200',
  DAIRY: 'bg-slate-100 text-slate-800 border-slate-200',
};

export const NutritionSlotSelector: React.FC<Props> = ({ mealName, requiredSlots, consumedSlots, onAddSlot }) => {
  const { t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleSlotClick = (group: string) => {
    setSelectedGroup(group);
  };

  const confirmFoodSelection = (food: PortionExchange) => {
    onAddSlot(food.group);
    setSelectedGroup(null);
  };

  const getMealTranslation = (meal: string) => {
    const mealMap: Record<string, string> = {
      'Breakfast': t.nutrition.breakfast,
      'Morning Snack': t.nutrition.morningSnack,
      'Lunch': t.nutrition.lunch,
      'Afternoon Snack': t.nutrition.afternoonSnack,
      'Dinner': t.nutrition.dinner,
      'Evening Snack': t.nutrition.eveningSnack,
    };
    return mealMap[meal] || meal;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-4 transition-all hover:shadow-md">
      <h3 className="font-semibold text-lg text-slate-800 mb-3">{getMealTranslation(mealName)}</h3>

      <div className="space-y-3">
        {Object.entries(requiredSlots).map(([group, count]) => {
          const filled = (consumedSlots[group] as number) || 0;
          const slots = [];

          for (let i = 0; i < count; i++) {
            const isFilled = i < filled;
            slots.push(
              <button
                key={i}
                onClick={() => !isFilled && handleSlotClick(group)}
                disabled={isFilled}
                className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all transform
                  ${isFilled
                    ? 'bg-slate-800 border-slate-800 text-white scale-100'
                    : 'border-slate-300 hover:border-slate-400 hover:scale-110 text-slate-400 bg-slate-50'}
                `}
              >
                {isFilled ? <Check size={14} /> : <Plus size={14} />}
              </button>
            );
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
          );
        })}
      </div>

      {/* Food Database Modal/Drawer Simulation */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h4 className="font-bold">{t.nutrition.addFood} ({selectedGroup})</h4>
              <button onClick={() => setSelectedGroup(null)} className="text-sm text-slate-500 hover:text-slate-700 transition-colors">{t.common.close}</button>
            </div>
            <div className="p-2">
              {FOOD_DATABASE.filter(f => f.group === selectedGroup).map(food => (
                <button
                  key={food.id}
                  onClick={() => confirmFoodSelection(food)}
                  className="w-full text-left p-3 hover:bg-slate-50 rounded-lg flex justify-between items-center group transition-all"
                >
                  <div>
                    <div className="font-medium text-slate-900">{food.name}</div>
                    <div className="text-sm text-slate-500">{t.nutrition.consumed}: {food.quantity}</div>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-slate-600 transition-colors" size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};