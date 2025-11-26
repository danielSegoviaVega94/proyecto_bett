// English Translations
export const en = {
  // Common
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    close: 'Close',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
  },

  // App Title
  appName: 'APEX',
  appNameSuffix: 'PERFORMANCE',
  appFullName: 'APEX Performance Platform',

  // Login / Role Selection
  login: {
    title: 'APEX',
    titleSuffix: 'PERFORMANCE',
    subtitle: 'Select a role to demo the platform logic.',
    coachRole: 'Coach',
    coachDescription: 'Manage blocks & view risk tables',
    nutritionistRole: 'Nutritionist',
    nutritionistDescription: 'Manage exchange systems',
    athleteRole: 'Athlete',
    athleteDescription: 'Mobile logging view',
  },

  // Auth Pages
  auth: {
    welcomeBack: 'Welcome Back',
    signInSubtitle: 'Sign in to your Apex Performance account',
    email: 'Email',
    password: 'Password',
    signingIn: 'Signing in...',
    signIn: 'Sign In',
    dontHaveAccount: "Don't have an account?",
    signUp: 'Sign up',
    tryDemo: 'Try Demo Version',
    createAccount: 'Create Account',
    joinPlatform: 'Join Apex Performance Platform',
    fullName: 'Full Name',
    iAmA: 'I am a...',
    creatingAccount: 'Creating account...',
    alreadyHaveAccount: 'Already have an account?',
  },

  // Roles
  roles: {
    coach: 'Coach',
    nutritionist: 'Nutritionist',
    athlete: 'Athlete',
  },

  // Navigation
  nav: {
    dashboard: 'Dashboard',
    training: 'Training',
    nutrition: 'Nutrition',
    athletes: 'Athletes',
    programBuilder: 'Program Builder',
    signOut: 'Sign Out',
    // Mobile navigation
    dash: 'Dash',
    train: 'Train',
    food: 'Food',
    exit: 'Exit',
  },

  // Coach Dashboard
  coachDashboard: {
    title: 'Coach Dashboard',
    subtitle: 'Overview of your athlete roster.',
    newTrainingBlock: '+ New Training Block',
    highRiskAthletes: 'High Risk Athletes',
    athleteColumn: 'Athlete',
    fatigueColumn: 'Fatigue (Aug)',
    sleepColumn: 'Sleep (Avg)',
    trendColumn: 'Trend',
    actionColumn: 'Action',
    worsening: 'Worsening',
    aiAnalyze: 'AI Analyze',
    analyzing: 'Analyzing...',
    geminiInsight: 'Gemini Insight',
    hours: 'hrs',
  },

  // Athlete Dashboard
  athleteDashboard: {
    recoveryAlert: 'Recovery Alert',
    readinessLow: 'Your readiness score is low (Fatigue: {fatigue}/5).',
    getAdjustment: 'Get AI Adjustment',
    thinking: 'Thinking...',
    coachGemini: 'Coach Gemini:',
    todaysWorkout: "Today's Workout",
    block: 'Block',
    week: 'Week',
    startWorkout: 'Start Workout',
    dailyNutrition: 'Daily Nutrition',
    carbs: 'Carbs',
    protein: 'Protein',
    slots: 'Slots',
    todaysTraining: "Today's Training",
    mealTracking: 'Meal Tracking',
    sets: 'Sets',
    rir: 'RIR',
  },

  // Wellness Check-in
  wellnessCheckin: {
    title: 'Daily Check-in',
    subtitle: 'Ready to perform?',
    fatigueLabel: 'Fatigue Level (1-5)',
    fatigueFresh: 'Fresh',
    fatigueExhausted: 'Exhausted',
    sleepQualityLabel: 'Sleep Quality (1-10)',
    motivationLabel: 'Motivation (1-10)',
    submitButton: 'Submit & Start Training',
  },

  // Training
  training: {
    exercise: 'Exercise',
    sets: 'Sets',
    reps: 'Reps',
    weight: 'Weight',
    rir: 'RIR',
    rest: 'Rest',
    notes: 'Notes',
    addSet: 'Add Set',
    completeWorkout: 'Complete Workout',
    workoutCompleted: 'Workout completed!',
    kg: 'kg',
    lbs: 'lbs',
    repsPlaceholder: 'Reps',
    weightPlaceholder: 'Weight',
    rirPlaceholder: 'RIR',
    previous: 'Prev',
    target: 'Target',
  },

  // Nutrition
  nutrition: {
    mealPlan: 'Meal Plan',
    breakfast: 'Breakfast',
    morningSnack: 'Morning Snack',
    lunch: 'Lunch',
    afternoonSnack: 'Afternoon Snack',
    dinner: 'Dinner',
    eveningSnack: 'Evening Snack',
    consumed: 'Consumed',
    remaining: 'Remaining',
    total: 'Total',
    addFood: 'Add Food',
    suggestIdea: 'Suggest Idea',
    chefThinking: 'Chef is thinking...',
    slotConsumed: 'Slot consumed',
    addSlot: '+ Slot',
    selectSource: 'Select',
    portion: 'Portion',
  },

  // AI Messages
  ai: {
    analyzing: 'Analyzing data...',
    thinking: 'Thinking about a good recommendation...',
    generating: 'Generating analysis...',
    coachGemini: 'Coach Gemini',
    chefGemini: 'Chef Gemini',
  },

  // Alerts and Messages
  alerts: {
    recoveryAlert: 'Recovery Alert',
    highFatigue: 'High fatigue detected',
    lowSleep: 'Low sleep quality',
    goodJob: 'Good job!',
    keepGoing: 'Keep going!',
    restDay: 'Consider taking a rest day',
  },

  // Errors
  errors: {
    generic: 'An error occurred. Please try again.',
    network: 'Connection error. Check your internet.',
    notFound: 'Not found',
    unauthorized: 'Unauthorized',
    validation: 'Please check the entered data',
  },

  // Time
  time: {
    seconds: 'seconds',
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
    weeks: 'weeks',
    months: 'months',
    sec: 'sec',
    min: 'min',
    hr: 'hr',
  },

  // Food Groups
  foodGroups: {
    CARB: 'Carbohydrates',
    PROTEIN: 'Protein',
    FAT: 'Fats',
    VEGGIE: 'Vegetables',
    FRUIT: 'Fruits',
    DAIRY: 'Dairy',
  },

  // Workout Types
  workoutTypes: {
    strength: 'Strength',
    hypertrophy: 'Hypertrophy',
    endurance: 'Endurance',
    power: 'Power',
    conditioning: 'Conditioning',
    mobility: 'Mobility',
    recovery: 'Recovery',
  },

  // Days of Week
  days: {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  },

  // Expressions
  expressions: {
    letsGo: "Let's go!",
    awesome: 'Awesome!',
    wellDone: 'Well done!',
    keepItUp: 'Keep it up!',
    almostThere: 'Almost there!',
    youCanDoIt: 'You can do it!',
  },

  // Landing Page
  landing: {
    // Hero Section
    heroTitle1: 'Professional Coaching,',
    heroTitle2: 'Data-Driven Results',
    heroSubtitle: 'The only platform built on RIR/RPE auto-regulation and Exchange Portion nutrition methodology. Designed for coaches, nutritionists, and athletes who demand precision.',
    getStartedFree: 'Get Started Free',

    // Features Section
    builtForEveryRole: 'Built for Every Role',

    // Coach Features
    forCoaches: 'For Coaches',
    forCoachesDesc: 'Create RIR/RPE-based training blocks, monitor athlete readiness, and track progressive overload.',
    coachFeature1: 'Drag-and-drop workout builder',
    coachFeature2: 'Block periodization tools',
    coachFeature3: 'Real-time fatigue risk alerts',
    coachFeature4: 'Progressive overload tracking',

    // Nutritionist Features
    forNutritionists: 'For Nutritionists',
    forNutritionistsDesc: 'Manage food exchange databases and create slot-based meal plans (no calorie counting).',
    nutritionistFeature1: 'Exchange portion system',
    nutritionistFeature2: 'Custom food databases',
    nutritionistFeature3: 'Meal formula templates',
    nutritionistFeature4: 'Adherence analytics',

    // Athlete Features
    forAthletes: 'For Athletes',
    forAthletesDesc: 'Mobile-first logging with daily wellness check-ins and AI-powered recommendations.',
    athleteFeature1: 'Quick RIR/RPE logging',
    athleteFeature2: 'Nutrition slot tracker',
    athleteFeature3: 'Daily readiness check-in',
    athleteFeature4: 'AI session adjustments',

    // CTA Section
    ctaTitle: 'Ready to Elevate Your Performance?',
    ctaSubtitle: 'Join coaches and athletes who trust data-driven methodologies over generic fitness apps.',
    startFreeTrial: 'Start Your Free Trial',

    // Footer
    copyright: '© 2025 Apex Performance Platform. All rights reserved.',
  }
};
