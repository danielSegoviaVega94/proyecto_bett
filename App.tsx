import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { User, UserRole } from './types';
import { USERS, MOCK_TRAINING_BLOCK, MOCK_MEAL_PLAN, getUserLogs } from './services/mockDatabase';
import { WellnessCheckin, CheckinForm } from './pages/WellnessCheckin';
import { RIRInputRow } from './components/RIRInputRow';
import { NutritionSlotSelector } from './components/NutritionSlotSelector';
import { generateAthleteAnalysis, generateSessionAdjustment, generateMealSuggestion } from './services/geminiService';
import { Sparkles, AlertCircle, TrendingDown, ArrowRight, BrainCircuit, Dumbbell, FileText, Zap } from 'lucide-react';

// --- Dashboard Component (Inline for simplicity given file limit) ---
const Dashboard: React.FC<{ user: User; dailyWellness?: CheckinForm | null }> = ({ user, dailyWellness }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [readinessTip, setReadinessTip] = useState<string | null>(null);

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    // Simulating analyzing Athlete "u3"
    const logs = getUserLogs('u3');
    const result = await generateAthleteAnalysis('Alex Athlete', logs);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  const handleReadinessCheck = async () => {
    if (!dailyWellness) return;
    setLoadingAi(true);
    const tip = await generateSessionAdjustment(dailyWellness.fatigue, dailyWellness.sleepQuality, MOCK_TRAINING_BLOCK.name);
    setReadinessTip(tip);
    setLoadingAi(false);
  };

  if (user.role === UserRole.COACH) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Coach Dashboard</h2>
            <p className="text-slate-500">Overview of your athlete roster.</p>
          </div>
          <button className="bg-accent text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600">
            + New Training Block
          </button>
        </header>

        {/* Risk Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <AlertCircle size={18} className="text-danger" />
              High Risk Athletes
            </h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="p-4">Athlete</th>
                <th className="p-4">Fatigue (Aug)</th>
                <th className="p-4">Sleep (Avg)</th>
                <th className="p-4">Trend</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-900">Alex Athlete</td>
                <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded">4.2</span></td>
                <td className="p-4">5.5 hrs</td>
                <td className="p-4 text-red-600 flex items-center gap-1"><TrendingDown size={16} /> Worsening</td>
                <td className="p-4">
                  <button 
                    onClick={handleAiAnalysis}
                    className="text-accent hover:underline flex items-center gap-1"
                    disabled={loadingAi}
                  >
                   <Sparkles size={14} /> {loadingAi ? 'Analyzing...' : 'AI Analyze'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
          {aiAnalysis && (
            <div className="p-4 bg-slate-900 text-slate-200 text-sm m-4 rounded-lg animate-in fade-in">
                <div className="flex items-center gap-2 mb-2 text-accent font-bold">
                    <BrainCircuit size={18} />
                    Gemini Insight
                </div>
                <div className="whitespace-pre-line leading-relaxed">
                    {aiAnalysis}
                </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Athlete Dashboard
  return (
    <div className="space-y-6">
      {dailyWellness && (dailyWellness.fatigue >= 4 || dailyWellness.sleepQuality <= 5) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-in slide-in-from-top-4">
           <div className="flex justify-between items-start">
             <div>
                <h3 className="text-amber-800 font-bold flex items-center gap-2">
                  <Zap size={18} className="fill-amber-500 text-amber-500" /> 
                  Recovery Alert
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  Your readiness score is low (Fatigue: {dailyWellness.fatigue}/5).
                </p>
             </div>
             {!readinessTip && (
                <button 
                  onClick={handleReadinessCheck}
                  disabled={loadingAi}
                  className="text-xs bg-amber-100 text-amber-800 font-semibold px-3 py-2 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-1"
                >
                  <Sparkles size={12} /> {loadingAi ? 'Thinking...' : 'Get AI Adjustment'}
                </button>
             )}
           </div>
           
           {readinessTip && (
             <div className="mt-3 p-3 bg-white/50 rounded-lg text-sm text-amber-900 font-medium border border-amber-100">
               <span className="font-bold">Coach Gemini:</span> {readinessTip}
             </div>
           )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Leg Day (Hypertrophy)</h2>
            <p className="text-slate-400 mb-6">Block 1 • Week 3</p>
            <button className="bg-accent hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all">
              Start Workout <ArrowRight size={18} />
            </button>
          </div>
          <Dumbbell className="absolute -right-4 -bottom-4 text-slate-700 opacity-20 transform rotate-[-15deg]" size={150} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Daily Nutrition</h3>
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Carbs</span>
                        <span>4/6 Slots</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-2/3"></div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Protein</span>
                        <span>3/5 Slots</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/5"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [dailyWellness, setDailyWellness] = useState<CheckinForm | null>(null);
  const [consumedSlots, setConsumedSlots] = useState<Record<string, number>>({});
  
  // State for specific meal suggestions
  const [mealSuggestions, setMealSuggestions] = useState<Record<string, string>>({});
  const [loadingMeal, setLoadingMeal] = useState<string | null>(null);

  const login = (role: UserRole) => {
    const user = USERS.find(u => u.role === role);
    if (user) setCurrentUser(user);
    // Reset state for demo
    setCheckedIn(role !== UserRole.ATHLETE);
    setDailyWellness(null);
    setConsumedSlots({});
    setMealSuggestions({});
  };

  const handleAddSlot = (group: string) => {
    setConsumedSlots(prev => ({
      ...prev,
      [group]: (prev[group] || 0) + 1
    }));
  };

  const handleGetMealSuggestion = async (mealName: string, slots: Record<string, number>) => {
    setLoadingMeal(mealName);
    const suggestion = await generateMealSuggestion(mealName, slots);
    setMealSuggestions(prev => ({...prev, [mealName]: suggestion}));
    setLoadingMeal(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">APEX<span className="text-accent">PERFORMANCE</span></h1>
            <p className="text-slate-500 mt-2">Select a role to demo the platform logic.</p>
          </div>
          
          <div className="space-y-3">
            <button onClick={() => login(UserRole.COACH)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-accent hover:bg-blue-50 transition-all text-left flex items-center gap-4 group">
               <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">🧠</div>
               <div>
                 <div className="font-bold text-slate-800">Coach</div>
                 <div className="text-xs text-slate-500">Manage blocks & view risk tables</div>
               </div>
            </button>
            <button onClick={() => login(UserRole.NUTRITIONIST)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all text-left flex items-center gap-4 group">
               <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">🥗</div>
               <div>
                 <div className="font-bold text-slate-800">Nutritionist</div>
                 <div className="text-xs text-slate-500">Manage exchange systems</div>
               </div>
            </button>
            <button onClick={() => login(UserRole.ATHLETE)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all text-left flex items-center gap-4 group">
               <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">🏋️</div>
               <div>
                 <div className="font-bold text-slate-800">Athlete</div>
                 <div className="text-xs text-slate-500">Mobile logging view</div>
               </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Athlete Flow Check
  if (currentUser.role === UserRole.ATHLETE && !checkedIn) {
    return <WellnessCheckin onComplete={(data) => {
      setDailyWellness(data);
      setCheckedIn(true);
    }} />;
  }

  return (
    <Layout user={currentUser} onLogout={() => setCurrentUser(null)}>
      <Dashboard user={currentUser} dailyWellness={dailyWellness} />

      {/* RENDER DEMO SECTIONS BASED ON ROLE BELOW DASHBOARD */}
      
      {currentUser.role === UserRole.ATHLETE && (
        <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Training Log Section */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Dumbbell size={20} /> Today's Training
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                 <span className="font-bold text-slate-700">Back Squat</span>
                 <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">3 Sets • 2 RIR</span>
              </div>
              <div className="p-4 space-y-2">
                {[0, 1, 2].map(i => (
                  <RIRInputRow key={i} setIndex={i} exercise={MOCK_TRAINING_BLOCK.exercises[0]} />
                ))}
              </div>
            </div>
          </section>

          {/* Nutrition Log Section */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText size={20} /> Meal Tracking
            </h2>
            {MOCK_MEAL_PLAN.map(meal => (
              <div key={meal.mealName} className="relative">
                <div className="flex justify-between items-center mb-1 px-1">
                   {/* Suggestion Button for Meal */}
                   <div className="flex-1"></div>
                   {!mealSuggestions[meal.mealName] ? (
                      <button 
                        onClick={() => handleGetMealSuggestion(meal.mealName, meal.slots)}
                        disabled={loadingMeal === meal.mealName}
                        className="text-xs text-accent hover:text-blue-700 font-medium flex items-center gap-1 mb-2 transition-colors"
                      >
                         <Sparkles size={12} /> 
                         {loadingMeal === meal.mealName ? 'Chef is thinking...' : 'Suggest Idea'}
                      </button>
                   ) : (
                      <div className="text-xs text-emerald-600 font-medium mb-3 bg-emerald-50 px-3 py-2 rounded-lg flex items-start gap-2 border border-emerald-100">
                         <Sparkles size={12} className="mt-0.5 shrink-0" />
                         <span>{mealSuggestions[meal.mealName]}</span>
                      </div>
                   )}
                </div>
                
                <NutritionSlotSelector 
                  mealName={meal.mealName}
                  requiredSlots={meal.slots}
                  consumedSlots={consumedSlots}
                  onAddSlot={handleAddSlot}
                />
              </div>
            ))}
          </section>
        </div>
      )}
    </Layout>
  );
};

export default App;