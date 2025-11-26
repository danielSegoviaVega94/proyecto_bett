import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { User, UserRole } from './types';
import { USERS, MOCK_TRAINING_BLOCK, MOCK_MEAL_PLAN, getUserLogs } from './services/mockDatabase';
import { WellnessCheckin, CheckinForm } from './pages/WellnessCheckin';
import { RIRInputRow } from './components/RIRInputRow';
import { NutritionSlotSelector } from './components/NutritionSlotSelector';
import { generateAthleteAnalysis, generateSessionAdjustment, generateMealSuggestion } from './services/geminiService';
import { Sparkles, AlertCircle, TrendingDown, ArrowRight, BrainCircuit, Dumbbell, FileText, Zap } from 'lucide-react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// --- Dashboard Component (Inline for simplicity given file limit) ---
const Dashboard: React.FC<{ user: User; dailyWellness?: CheckinForm | null }> = ({ user, dailyWellness }) => {
  const { t } = useLanguage();
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
            <h2 className="text-2xl font-bold text-slate-900">{t.coachDashboard.title}</h2>
            <p className="text-slate-500">{t.coachDashboard.subtitle}</p>
          </div>
          <button className="bg-accent text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 transition-all transform hover:scale-105">
            {t.coachDashboard.newTrainingBlock}
          </button>
        </header>

        {/* Risk Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <AlertCircle size={18} className="text-danger" />
              {t.coachDashboard.highRiskAthletes}
            </h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="p-4">{t.coachDashboard.athleteColumn}</th>
                <th className="p-4">{t.coachDashboard.fatigueColumn}</th>
                <th className="p-4">{t.coachDashboard.sleepColumn}</th>
                <th className="p-4">{t.coachDashboard.trendColumn}</th>
                <th className="p-4">{t.coachDashboard.actionColumn}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Alex Athlete</td>
                <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded">4.2</span></td>
                <td className="p-4">5.5 {t.coachDashboard.hours}</td>
                <td className="p-4 text-red-600 flex items-center gap-1"><TrendingDown size={16} /> {t.coachDashboard.worsening}</td>
                <td className="p-4">
                  <button
                    onClick={handleAiAnalysis}
                    className="text-accent hover:underline flex items-center gap-1 transition-all"
                    disabled={loadingAi}
                  >
                   <Sparkles size={14} /> {loadingAi ? t.coachDashboard.analyzing : t.coachDashboard.aiAnalyze}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {aiAnalysis && (
            <div className="p-4 bg-slate-900 text-slate-200 text-sm m-4 rounded-lg animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-2 mb-2 text-accent font-bold">
                    <BrainCircuit size={18} />
                    {t.coachDashboard.geminiInsight}
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
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 animate-in slide-in-from-top-4 duration-500">
           <div className="flex justify-between items-start">
             <div>
                <h3 className="text-amber-800 font-bold flex items-center gap-2">
                  <Zap size={18} className="fill-amber-500 text-amber-500" />
                  {t.athleteDashboard.recoveryAlert}
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  {t.athleteDashboard.readinessLow.replace('{fatigue}', dailyWellness.fatigue.toString())}
                </p>
             </div>
             {!readinessTip && (
                <button
                  onClick={handleReadinessCheck}
                  disabled={loadingAi}
                  className="text-xs bg-amber-100 text-amber-800 font-semibold px-3 py-2 rounded-lg hover:bg-amber-200 transition-all transform hover:scale-105 flex items-center gap-1"
                >
                  <Sparkles size={12} /> {loadingAi ? t.athleteDashboard.thinking : t.athleteDashboard.getAdjustment}
                </button>
             )}
           </div>

           {readinessTip && (
             <div className="mt-3 p-3 bg-white/50 rounded-lg text-sm text-amber-900 font-medium border border-amber-100 animate-in fade-in slide-in-from-top-2">
               <span className="font-bold">{t.athleteDashboard.coachGemini}</span> {readinessTip}
             </div>
           )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-xl">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Leg Day (Hypertrophy)</h2>
            <p className="text-slate-400 mb-6">{t.athleteDashboard.block} 1 • {t.athleteDashboard.week} 3</p>
            <button className="bg-accent hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105">
              {t.athleteDashboard.startWorkout} <ArrowRight size={18} />
            </button>
          </div>
          <Dumbbell className="absolute -right-4 -bottom-4 text-slate-700 opacity-20 transform rotate-[-15deg]" size={150} />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 transition-all hover:shadow-md">
            <h3 className="font-bold text-slate-800 mb-4">{t.athleteDashboard.dailyNutrition}</h3>
            <div className="space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>{t.athleteDashboard.carbs}</span>
                        <span>4/6 {t.athleteDashboard.slots}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-2/3 transition-all duration-500"></div>
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>{t.athleteDashboard.protein}</span>
                        <span>3/5 {t.athleteDashboard.slots}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/5 transition-all duration-500"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const AppContent: React.FC = () => {
  const { t } = useLanguage();
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">{t.appName}<span className="text-accent">{t.appNameSuffix}</span></h1>
            <p className="text-slate-500 mt-2">{t.login.subtitle}</p>
          </div>

          <div className="space-y-3">
            <button onClick={() => login(UserRole.COACH)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-accent hover:bg-blue-50 transition-all transform hover:scale-[1.02] text-left flex items-center gap-4 group">
               <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">🧠</div>
               <div>
                 <div className="font-bold text-slate-800">{t.login.coachRole}</div>
                 <div className="text-xs text-slate-500">{t.login.coachDescription}</div>
               </div>
            </button>
            <button onClick={() => login(UserRole.NUTRITIONIST)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all transform hover:scale-[1.02] text-left flex items-center gap-4 group">
               <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">🥗</div>
               <div>
                 <div className="font-bold text-slate-800">{t.login.nutritionistRole}</div>
                 <div className="text-xs text-slate-500">{t.login.nutritionistDescription}</div>
               </div>
            </button>
            <button onClick={() => login(UserRole.ATHLETE)} className="w-full p-4 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all transform hover:scale-[1.02] text-left flex items-center gap-4 group">
               <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition-colors">🏋️</div>
               <div>
                 <div className="font-bold text-slate-800">{t.login.athleteRole}</div>
                 <div className="text-xs text-slate-500">{t.login.athleteDescription}</div>
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
              <Dumbbell size={20} /> {t.athleteDashboard.todaysTraining}
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                 <span className="font-bold text-slate-700">Back Squat</span>
                 <span className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">3 {t.athleteDashboard.sets} • 2 {t.athleteDashboard.rir}</span>
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
              <FileText size={20} /> {t.athleteDashboard.mealTracking}
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
                        className="text-xs text-accent hover:text-blue-700 font-medium flex items-center gap-1 mb-2 transition-all transform hover:scale-105"
                      >
                         <Sparkles size={12} />
                         {loadingMeal === meal.mealName ? t.nutrition.chefThinking : t.nutrition.suggestIdea}
                      </button>
                   ) : (
                      <div className="text-xs text-emerald-600 font-medium mb-3 bg-emerald-50 px-3 py-2 rounded-lg flex items-start gap-2 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
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

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;