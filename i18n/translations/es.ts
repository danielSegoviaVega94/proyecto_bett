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
  }
};
