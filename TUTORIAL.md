# 📖 Tutorial: Cómo Ejecutar Apex Performance Platform

Guía paso a paso para poner en marcha la plataforma localmente. Ideal para desarrolladores que se unen al proyecto o quieren probar la aplicación.

---

## 📋 **PARTE 1: Prerequisitos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

### 1. Node.js (versión 18 o superior)

**Verificar si lo tienes instalado:**
```bash
node --version
```

Si no lo tienes o la versión es menor a 18, descárgalo desde:
- **Windows/Mac:** https://nodejs.org/ (descarga la versión LTS)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

### 2. npm (viene con Node.js)

**Verificar:**
```bash
npm --version
```

### 3. Git

**Verificar:**
```bash
git --version
```

**Instalar si no lo tienes:**
- **Windows:** https://git-scm.com/download/win
- **Mac:** `brew install git` (con Homebrew)
- **Linux:** `sudo apt-get install git`

### 4. Editor de código (recomendado)
- **Visual Studio Code:** https://code.visualstudio.com/

---

## 🚀 **PARTE 2: Clonar el Proyecto**

### Paso 1: Abrir la terminal

- **Windows:** Git Bash o PowerShell
- **Mac/Linux:** Terminal

### Paso 2: Clonar el repositorio

```bash
git clone https://github.com/danielSegoviaVega94/proyecto_bett.git
cd proyecto_bett
```

### Paso 3: Cambiar a la rama correcta

```bash
git checkout claude/coaching-platform-architecture-01XDQmLJj2NKt78t562K5dDj
```

---

## 📦 **PARTE 3: Instalar Dependencias**

Desde la raíz del proyecto, ejecuta:

```bash
npm install
```

**Esto tomará 1-2 minutos.** Verás que se instalan más de 400 paquetes.

✅ **Salida esperada:**
```
added 479 packages, and audited 480 packages in 50s
```

---

## 🗄️ **PARTE 4: Configurar Supabase (Base de Datos)**

Tienes **2 opciones**: usar Supabase (recomendado) o probar con datos de demostración.

### **Opción A: Modo Demo (Sin Base de Datos Real) - RECOMENDADO PARA EMPEZAR**

Si solo quieres **probar la aplicación rápidamente**, sigue estos pasos:

#### Paso 1: Crear archivo de variables de entorno

```bash
cp .env.example .env.local
```

#### Paso 2: Dejar las variables con valores placeholder

Abre `.env.local` y déjalo así:

```env
# Valores placeholder - suficiente para modo demo
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
GEMINI_API_KEY=placeholder-gemini-key
```

**⚠️ IMPORTANTE:** Con esta configuración, la autenticación NO funcionará, pero puedes usar la **ruta `/demo`** para probar todas las funcionalidades.

---

### **Opción B: Configuración Completa con Supabase (Para Producción)**

Si quieres usar autenticación real y base de datos persistente:

#### Paso 1: Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub (gratis)

#### Paso 2: Crear un nuevo proyecto

1. En el dashboard, haz clic en "New Project"
2. Configura:
   - **Name:** apex-performance (o el nombre que prefieras)
   - **Database Password:** Crea una contraseña **fuerte** (guárdala, la necesitarás)
   - **Region:** Elige el más cercano a ti
   - **Plan:** Free (suficiente para desarrollo)
3. Haz clic en "Create new project"
4. **Espera 2-3 minutos** mientras Supabase crea tu base de datos

#### Paso 3: Obtener las credenciales

1. En el dashboard de tu proyecto, ve a **Settings** (⚙️) en la barra lateral izquierda
2. Haz clic en **API**
3. Copia los siguientes valores:

   - **Project URL** (ejemplo: `https://abcdefgh.supabase.co`)
   - **Project API keys** → `anon` `public` (es una clave larga)

#### Paso 4: Configurar Connection String

1. En el mismo menú **Settings**, ve a **Database**
2. Busca **Connection string** → **URI**
3. Copia el string que se ve así:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.abcdefgh.supabase.co:6543/postgres
   ```
4. **Reemplaza `[YOUR-PASSWORD]`** con la contraseña que creaste en el Paso 2

#### Paso 5: Crear archivo .env.local

```bash
cp .env.example .env.local
```

Abre `.env.local` con tu editor y pega tus valores reales:

```env
# Supabase - Reemplaza con tus valores reales
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database - Reemplaza con tu connection string
DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.abcdefgh.supabase.co:6543/postgres

# Gemini AI (opcional - déjalo así si no tienes API key)
GEMINI_API_KEY=placeholder-gemini-key
```

#### Paso 6: Configurar la base de datos con Prisma

Ejecuta estos comandos en orden:

```bash
# 1. Generar el cliente de Prisma
npx prisma generate

# 2. Crear las tablas en Supabase
npx prisma db push

# 3. (Opcional) Abrir Prisma Studio para ver la base de datos
npx prisma studio
```

✅ **Salida esperada del `db push`:**
```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema
```

---

## 🎯 **PARTE 5: Ejecutar el Proyecto**

### Paso 1: Iniciar el servidor de desarrollo

```bash
npm run dev
```

✅ **Salida esperada:**
```
▲ Next.js 14.2.21
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 3.5s
```

### Paso 2: Abrir en el navegador

Ve a: **http://localhost:3000**

---

## 🎭 **PARTE 6: Probar la Aplicación**

### **Opción A: Modo Demo (Sin Autenticación)**

1. En tu navegador, ve a: **http://localhost:3000/demo**
2. Verás 3 tarjetas con roles:
   - 🧠 **Coach**
   - 🥗 **Nutritionist**
   - 🏋️ **Athlete**

3. **Haz clic en cualquier rol** para ver su dashboard

#### Ejemplo: Probar como Atleta

1. Haz clic en "Athlete"
2. Te aparecerá un formulario de **Daily Check-in**:
   - Mueve el slider de fatiga
   - Ingresa Sleep Quality (1-10)
   - Ingresa Motivation (1-10)
3. Haz clic en "Submit & Start Training"
4. Verás el dashboard del atleta con:
   - Tarjeta de entrenamiento del día
   - Sistema de registro RIR/RPE
   - Tracking de nutrición por porciones

#### Ejemplo: Probar como Coach

1. Vuelve a `/demo` (botón "Change Role")
2. Haz clic en "Coach"
3. Verás:
   - Tabla de atletas en riesgo
   - Métricas de fatiga y sueño
   - Botón "AI Analyze" (requiere Gemini API key)

---

### **Opción B: Con Autenticación Real (Requiere Supabase configurado)**

#### Paso 1: Crear una cuenta

1. Ve a: **http://localhost:3000/auth/signup**
2. Completa el formulario:
   - **Nombre:** Tu nombre
   - **Email:** tu@email.com
   - **Password:** Mínimo 6 caracteres
   - **Rol:** Selecciona Coach, Nutritionist, o Athlete
3. Haz clic en "Sign Up"

#### Paso 2: Confirmar email (solo en producción)

En desarrollo local, Supabase puede requerir confirmar el email. Tienes 2 opciones:

**Opción 1 - Usar un email real:**
- Revisa tu bandeja de entrada
- Haz clic en el link de confirmación

**Opción 2 - Desactivar confirmación de email:**
1. Ve a tu dashboard de Supabase
2. **Authentication** → **Providers** → **Email**
3. Desactiva "Confirm email"
4. Guarda cambios

#### Paso 3: Iniciar sesión

1. Ve a: **http://localhost:3000/auth/login**
2. Ingresa tu email y password
3. Serás redirigido al dashboard según tu rol

---

## 🤖 **PARTE 7: Configurar Gemini AI (Opcional)**

Las funciones de IA (análisis de atletas, sugerencias de comida) requieren una API key de Google Gemini.

### Paso 1: Obtener API Key gratuita

1. Ve a: https://ai.google.dev/
2. Haz clic en "Get API key in Google AI Studio"
3. Inicia sesión con tu cuenta de Google
4. Haz clic en "Create API Key"
5. Copia la clave (empieza con `AIza...`)

### Paso 2: Agregar a .env.local

Abre `.env.local` y reemplaza:

```env
GEMINI_API_KEY=AIzaSyD...tu-clave-real-aqui
```

### Paso 3: Reiniciar el servidor

Presiona `Ctrl + C` en la terminal y ejecuta de nuevo:

```bash
npm run dev
```

### Paso 4: Probar las funciones de IA

1. Ve a `/demo` y selecciona "Coach"
2. En la tabla de High Risk Athletes, haz clic en "AI Analyze"
3. Verás un análisis generado por Gemini

---

## 🏗️ **PARTE 8: Compilar para Producción (Opcional)**

### Paso 1: Compilar el proyecto

```bash
npm run build
```

✅ **Salida esperada:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         92.1 kB
├ ○ /auth/login                          1.8 kB         88.7 kB
├ ○ /auth/signup                         2.1 kB         89.0 kB
└ ○ /demo                                3.5 kB         90.4 kB
```

### Paso 2: Ejecutar en modo producción

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:3000**

---

## 🛠️ **PARTE 9: Comandos Útiles**

### Desarrollo
```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Compila para producción
npm start            # Ejecuta build en modo producción
npm run lint         # Revisa errores de código
```

### Prisma (Base de Datos)
```bash
npx prisma studio              # Abre interfaz visual de la base de datos
npx prisma generate            # Regenera el cliente de Prisma
npx prisma db push             # Sincroniza schema con la base de datos
npx prisma migrate dev         # Crea una migración nueva
npx prisma migrate reset       # ⚠️ RESETEA la base de datos (borra todo)
```

### Git
```bash
git status                     # Ver cambios
git pull                       # Obtener últimos cambios
git log --oneline -10          # Ver últimos 10 commits
```

---

## 🐛 **PARTE 10: Solución de Problemas**

### ❌ Error: "Module not found"

**Problema:** No se encuentran los módulos de Node.

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Error: "Port 3000 is already in use"

**Problema:** Ya hay algo corriendo en el puerto 3000.

**Solución - Opción 1 (Cambiar puerto):**
```bash
PORT=3001 npm run dev
```

**Solución - Opción 2 (Matar proceso):**
```bash
# En Mac/Linux
lsof -ti:3000 | xargs kill -9

# En Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

---

### ❌ Error: "Prisma Client did not initialize yet"

**Problema:** El cliente de Prisma no se generó.

**Solución:**
```bash
npx prisma generate
npm run dev
```

---

### ❌ Error: "Invalid `prisma.user.findMany()` invocation"

**Problema:** La base de datos no tiene las tablas creadas.

**Solución:**
```bash
npx prisma db push
```

---

### ❌ Error: "Failed to fetch font `Inter`"

**Problema:** No hay conexión a Internet para descargar fuentes.

**Solución:** Ya está resuelto en el código (usamos fuentes del sistema). Solo actualiza el código:
```bash
git pull origin claude/coaching-platform-architecture-01XDQmLJj2NKt78t562K5dDj
```

---

### ❌ La página de login no funciona (error de Supabase)

**Problema:** Variables de entorno mal configuradas.

**Solución:**
1. Verifica que `.env.local` exista
2. Confirma que las URLs de Supabase sean correctas (sin espacios)
3. Reinicia el servidor:
   ```bash
   # Presiona Ctrl + C
   npm run dev
   ```

---

### ❌ Las funciones de IA no funcionan

**Problema:** API key de Gemini incorrecta o no configurada.

**Solución:**
1. Verifica que `GEMINI_API_KEY` esté en `.env.local`
2. La clave debe empezar con `AIza`
3. Reinicia el servidor

---

## 📚 **PARTE 11: Estructura del Proyecto**

Para entender dónde está cada cosa:

```
proyecto_bett/
│
├── app/                        # Páginas de Next.js
│   ├── page.tsx               # Landing page (http://localhost:3000)
│   ├── demo/page.tsx          # Modo demo (http://localhost:3000/demo)
│   ├── auth/
│   │   ├── login/page.tsx     # Login (http://localhost:3000/auth/login)
│   │   └── signup/page.tsx    # Registro
│   └── layout.tsx             # Layout principal
│
├── components/                 # Componentes React
│   ├── dashboards/            # Dashboards por rol
│   ├── ui/                    # Componentes de Shadcn/UI
│   └── wellness-checkin.tsx   # Formulario de check-in
│
├── lib/                       # Lógica de negocio
│   ├── supabase/              # Cliente de Supabase
│   ├── gemini.ts              # Servicio de IA
│   ├── types.ts               # Tipos de TypeScript
│   └── mock-data.ts           # Datos de demostración
│
├── prisma/
│   └── schema.prisma          # Schema de la base de datos
│
├── .env.local                 # Variables de entorno (NO SUBIR A GIT)
├── package.json               # Dependencias
└── README.md                  # Documentación general
```

---

## 🎯 **PARTE 12: Próximos Pasos**

### Para Desarrolladores

1. **Explorar el código:**
   - Lee `prisma/schema.prisma` para entender la estructura de datos
   - Revisa `components/dashboards/` para ver la lógica de cada rol

2. **Agregar funcionalidades:**
   - Crea nuevas rutas en `app/`
   - Agrega componentes en `components/`
   - Extiende el schema de Prisma

3. **Contribuir:**
   - Crea una nueva rama: `git checkout -b feature/mi-nueva-funcionalidad`
   - Haz commits descriptivos
   - Abre un Pull Request

### Para Usuarios/Testers

1. **Probar todos los roles** en `/demo`
2. **Reportar bugs** si encuentras algo raro
3. **Sugerir mejoras** en la interfaz

---

## 📞 **PARTE 13: Ayuda y Soporte**

### Recursos

- **Documentación de Next.js:** https://nextjs.org/docs
- **Documentación de Prisma:** https://www.prisma.io/docs
- **Documentación de Supabase:** https://supabase.com/docs
- **Shadcn/UI Components:** https://ui.shadcn.com/

### Contacto

Si tienes problemas que no están en la sección de troubleshooting:

1. Abre un issue en GitHub
2. Incluye:
   - Sistema operativo
   - Versión de Node.js
   - Mensaje de error completo
   - Pasos para reproducir el problema

---

## ✅ **Checklist Final**

Antes de empezar a desarrollar, confirma que:

- [ ] Node.js 18+ instalado
- [ ] `npm install` ejecutado sin errores
- [ ] `.env.local` creado y configurado
- [ ] `npm run dev` corre sin errores
- [ ] Puedes acceder a http://localhost:3000
- [ ] `/demo` funciona correctamente
- [ ] (Opcional) Supabase configurado
- [ ] (Opcional) Gemini API configurada

---

## 🚀 **¡Listo!**

Ahora tienes una plataforma profesional de coaching corriendo localmente.

**Empieza por probar el modo demo:** http://localhost:3000/demo

¡Buena suerte! 💪
