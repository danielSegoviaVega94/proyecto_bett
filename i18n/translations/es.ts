// Traducciones en Español (Chile)
export const es = {
  // Common
  common: {
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    edit: 'Editar',
    back: 'Volver',
    next: 'Siguiente',
    submit: 'Enviar',
    search: 'Buscar',
    filter: 'Filtrar',
    close: 'Cerrar',
    ok: 'OK',
    yes: 'Sí',
    no: 'No',
  },

  // App Title
  appName: 'APEX',
  appNameSuffix: 'RENDIMIENTO',
  appFullName: 'Plataforma APEX Rendimiento',

  // Login / Role Selection
  login: {
    title: 'APEX',
    titleSuffix: 'RENDIMIENTO',
    subtitle: 'Selecciona un rol para demostrar la plataforma.',
    coachRole: 'Entrenador',
    coachDescription: 'Gestiona bloques y visualiza tablas de riesgo',
    nutritionistRole: 'Nutricionista',
    nutritionistDescription: 'Gestiona sistemas de intercambio',
    athleteRole: 'Atleta',
    athleteDescription: 'Vista de registro móvil',
  },

  // Auth Pages
  auth: {
    welcomeBack: 'Bienvenido de Vuelta',
    signInSubtitle: 'Inicia sesión en tu cuenta de Apex Performance',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    signingIn: 'Iniciando sesión...',
    signIn: 'Iniciar Sesión',
    dontHaveAccount: '¿No tienes una cuenta?',
    signUp: 'Registrarse',
    tryDemo: 'Probar Versión Demo',
    createAccount: 'Crear Cuenta',
    joinPlatform: 'Únete a la Plataforma Apex Performance',
    fullName: 'Nombre Completo',
    iAmA: 'Soy un...',
    creatingAccount: 'Creando cuenta...',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
  },

  // Roles
  roles: {
    coach: 'Entrenador',
    nutritionist: 'Nutricionista',
    athlete: 'Atleta',
  },

  // Navigation
  nav: {
    dashboard: 'Panel',
    training: 'Entrenamiento',
    nutrition: 'Nutrición',
    athletes: 'Atletas',
    programBuilder: 'Constructor de Programas',
    signOut: 'Cerrar Sesión',
    // Mobile navigation
    dash: 'Panel',
    train: 'Entreno',
    food: 'Comida',
    exit: 'Salir',
  },

  // Coach Dashboard
  coachDashboard: {
    title: 'Panel del Entrenador',
    subtitle: 'Visión general de tus atletas.',
    newTrainingBlock: '+ Nuevo Bloque de Entrenamiento',
    highRiskAthletes: 'Atletas de Alto Riesgo',
    athleteColumn: 'Atleta',
    fatigueColumn: 'Fatiga (Prom)',
    sleepColumn: 'Sueño (Prom)',
    trendColumn: 'Tendencia',
    actionColumn: 'Acción',
    worsening: 'Empeorando',
    aiAnalyze: 'Analizar con IA',
    analyzing: 'Analizando...',
    geminiInsight: 'Análisis Gemini',
    hours: 'hrs',
  },

  // Athlete Dashboard
  athleteDashboard: {
    recoveryAlert: 'Alerta de Recuperación',
    readinessLow: 'Tu nivel de preparación está bajo (Fatiga: {fatigue}/5).',
    getAdjustment: 'Obtener Ajuste IA',
    thinking: 'Pensando...',
    coachGemini: 'Coach Gemini:',
    todaysWorkout: 'Entrenamiento de Hoy',
    block: 'Bloque',
    week: 'Semana',
    startWorkout: 'Comenzar Entrenamiento',
    dailyNutrition: 'Nutrición Diaria',
    carbs: 'Carbohidratos',
    protein: 'Proteínas',
    slots: 'Porciones',
    todaysTraining: 'Entrenamiento de Hoy',
    mealTracking: 'Registro de Comidas',
    sets: 'Series',
    rir: 'RIR',
  },

  // Wellness Check-in
  wellnessCheckin: {
    title: 'Chequeo Diario',
    subtitle: '¿Listo para rendir?',
    fatigueLabel: 'Nivel de Fatiga (1-5)',
    fatigueFresh: 'Fresco',
    fatigueExhausted: 'Agotado',
    sleepQualityLabel: 'Calidad del Sueño (1-10)',
    motivationLabel: 'Motivación (1-10)',
    submitButton: 'Enviar y Comenzar Entrenamiento',
  },

  // Training
  training: {
    exercise: 'Ejercicio',
    sets: 'Series',
    reps: 'Repeticiones',
    weight: 'Peso',
    rir: 'RIR',
    rest: 'Descanso',
    notes: 'Notas',
    addSet: 'Agregar Serie',
    completeWorkout: 'Completar Entrenamiento',
    workoutCompleted: '¡Entrenamiento completado!',
    kg: 'kg',
    lbs: 'lbs',
    repsPlaceholder: 'Reps',
    weightPlaceholder: 'Peso',
    rirPlaceholder: 'RIR',
    previous: 'Previo',
    target: 'Objetivo',
  },

  // Nutrition
  nutrition: {
    mealPlan: 'Plan de Comidas',
    breakfast: 'Desayuno',
    morningSnack: 'Colación Mañana',
    lunch: 'Almuerzo',
    afternoonSnack: 'Onces',
    dinner: 'Cena',
    eveningSnack: 'Colación Noche',
    consumed: 'Consumido',
    remaining: 'Restante',
    total: 'Total',
    addFood: 'Agregar Alimento',
    suggestIdea: 'Sugerir Idea',
    chefThinking: 'El chef está pensando...',
    slotConsumed: 'Porción consumida',
    addSlot: '+ Porción',
    selectSource: 'Seleccionar',
    portion: 'Porción',
  },

  // AI Messages (Chilean flavor)
  ai: {
    analyzing: 'Analizando los datos...',
    thinking: 'Pensando una buena recomendación...',
    generating: 'Generando análisis...',
    coachGemini: 'Coach Gemini',
    chefGemini: 'Chef Gemini',
  },

  // Alerts and Messages
  alerts: {
    recoveryAlert: 'Alerta de Recuperación',
    highFatigue: 'Fatiga alta detectada',
    lowSleep: 'Calidad de sueño baja',
    goodJob: '¡Buen trabajo!',
    keepGoing: '¡Sigue así!',
    restDay: 'Considera tomar un día de descanso',
  },

  // Errors
  errors: {
    generic: 'Ocurrió un error. Por favor intenta de nuevo.',
    network: 'Error de conexión. Verifica tu internet.',
    notFound: 'No encontrado',
    unauthorized: 'No autorizado',
    validation: 'Por favor verifica los datos ingresados',
  },

  // Time
  time: {
    seconds: 'segundos',
    minutes: 'minutos',
    hours: 'horas',
    days: 'días',
    weeks: 'semanas',
    months: 'meses',
    sec: 'seg',
    min: 'min',
    hr: 'hr',
  },

  // Food Groups
  foodGroups: {
    CARB: 'Carbohidratos',
    PROTEIN: 'Proteínas',
    FAT: 'Grasas',
    VEGGIE: 'Verduras',
    FRUIT: 'Frutas',
    DAIRY: 'Lácteos',
  },

  // Workout Types
  workoutTypes: {
    strength: 'Fuerza',
    hypertrophy: 'Hipertrofia',
    endurance: 'Resistencia',
    power: 'Potencia',
    conditioning: 'Acondicionamiento',
    mobility: 'Movilidad',
    recovery: 'Recuperación',
  },

  // Days of Week
  days: {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
  },

  // Chilean expressions
  expressions: {
    letsGo: '¡Dale!',
    awesome: '¡Bacán!',
    wellDone: '¡Bien hecho!',
    keepItUp: '¡Sigue así!',
    almostThere: '¡Ya casi!',
    youCanDoIt: '¡Tú puedes!',
  },

  // Landing Page
  landing: {
    // Hero Section
    heroTitle1: 'Coaching Profesional,',
    heroTitle2: 'Resultados Basados en Datos',
    heroSubtitle: 'La única plataforma construida sobre metodologías de auto-regulación RIR/RPE y nutrición por sistema de intercambio de porciones. Diseñada para coaches, nutricionistas y atletas que exigen precisión.',
    getStartedFree: 'Comenzar Gratis',

    // Features Section
    builtForEveryRole: 'Diseñada para Cada Rol',

    // Coach Features
    forCoaches: 'Para Entrenadores',
    forCoachesDesc: 'Crea bloques de entrenamiento basados en RIR/RPE, monitorea la preparación de atletas y rastrea la sobrecarga progresiva.',
    coachFeature1: 'Constructor de entrenamientos drag-and-drop',
    coachFeature2: 'Herramientas de periodización por bloques',
    coachFeature3: 'Alertas de riesgo de fatiga en tiempo real',
    coachFeature4: 'Rastreo de sobrecarga progresiva',

    // Nutritionist Features
    forNutritionists: 'Para Nutricionistas',
    forNutritionistsDesc: 'Gestiona bases de datos de intercambio de alimentos y crea planes de comidas basados en porciones (sin contar calorías).',
    nutritionistFeature1: 'Sistema de intercambio de porciones',
    nutritionistFeature2: 'Bases de datos personalizadas de alimentos',
    nutritionistFeature3: 'Plantillas de fórmulas de comidas',
    nutritionistFeature4: 'Análisis de adherencia',

    // Athlete Features
    forAthletes: 'Para Atletas',
    forAthletesDesc: 'Registro móvil con check-ins diarios de bienestar y recomendaciones impulsadas por IA.',
    athleteFeature1: 'Registro rápido de RIR/RPE',
    athleteFeature2: 'Rastreador de porciones nutricionales',
    athleteFeature3: 'Check-in diario de preparación',
    athleteFeature4: 'Ajustes de sesión con IA',

    // CTA Section
    ctaTitle: '¿Listo para Elevar tu Rendimiento?',
    ctaSubtitle: 'Únete a entrenadores y atletas que confían en metodologías basadas en datos en lugar de aplicaciones genéricas de fitness.',
    startFreeTrial: 'Comienza tu Prueba Gratuita',

    // Footer
    copyright: '© 2025 Plataforma Apex Performance. Todos los derechos reservados.',
  }
};
