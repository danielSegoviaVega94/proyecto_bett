# 🚀 Guía Completa de Configuración Supabase

## 📋 Tabla de Contenidos

1. [¿Qué es Supabase?](#qué-es-supabase)
2. [Requisitos Previos](#requisitos-previos)
3. [Creación de Proyecto en Supabase](#creación-de-proyecto-en-supabase)
4. [Configuración de Variables de Entorno](#configuración-de-variables-de-entorno)
5. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
6. [Configuración de Autenticación](#configuración-de-autenticación)
7. [Despliegue del Schema con Prisma](#despliegue-del-schema-con-prisma)
8. [Verificación de la Configuración](#verificación-de-la-configuración)
9. [Troubleshooting](#troubleshooting)

---

## 🔍 ¿Qué es Supabase?

**Supabase** es una alternativa open-source a Firebase que proporciona:

- **Base de datos PostgreSQL** alojada y gestionada
- **Autenticación** integrada (email/password, OAuth, magic links)
- **Storage** para archivos
- **APIs RESTful y GraphQL** generadas automáticamente
- **Realtime subscriptions** (opcional)

En este proyecto, Supabase se utiliza para:
1. **Autenticación de usuarios** (coaches, atletas, nutricionistas)
2. **Base de datos PostgreSQL** para almacenar datos de la aplicación

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta de Supabase (gratis en https://supabase.com)
- [ ] Node.js 18+ instalado
- [ ] Prisma CLI instalado (`npm install prisma --save-dev`)
- [ ] Acceso a internet para conectarse a Supabase
- [ ] Credenciales de API de Gemini (para features de IA)

---

## 🆕 Creación de Proyecto en Supabase

### Paso 1: Crear una Cuenta

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"**
3. Regístrate con GitHub, Gmail o email

### Paso 2: Crear un Nuevo Proyecto

1. En el dashboard de Supabase, haz clic en **"New Project"**
2. Completa los siguientes campos:
   - **Name:** `apex-performance` (o el nombre que prefieras)
   - **Database Password:** Genera una contraseña segura (**GUÁRDALA - la necesitarás después**)
   - **Region:** Elige la región más cercana a tus usuarios (ej: `South America (São Paulo)`)
   - **Pricing Plan:** Selecciona **Free** para desarrollo

3. Haz clic en **"Create new project"**
4. Espera 2-3 minutos mientras Supabase provisiona tu proyecto

### Paso 3: Obtener las Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** (⚙️) en la barra lateral izquierda
2. Selecciona **API**
3. Copia las siguientes credenciales:

```bash
# Project URL
URL: https://xxxxxxxxxxxxx.supabase.co

# anon/public key (para el cliente)
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# service_role key (para operaciones del servidor - MANTENER SECRETA)
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Ve a **Settings > Database** y copia la **Connection String** en modo **"URI"**:

```bash
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
```

---

## 🔐 Configuración de Variables de Entorno

### Paso 1: Crear Archivo `.env.local`

En la raíz del proyecto, crea un archivo `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database URL for Prisma
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"

# Gemini AI (opcional - para features de IA)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### Paso 2: Configurar Prisma

El proyecto ya incluye un archivo `prisma/schema.prisma` configurado. Verifica que tenga:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**Nota sobre las URLs:**
- `DATABASE_URL`: Usa **pgbouncer=true** para connection pooling (recomendado en producción)
- `DIRECT_URL`: Conexión directa sin pooling (necesaria para migraciones de Prisma)

---

## 🗄️ Configuración de la Base de Datos

### Paso 1: Verificar el Schema de Prisma

El proyecto incluye 14 modelos de Prisma. Verifica que exista el archivo `prisma/schema.prisma`:

```bash
ls -la prisma/schema.prisma
```

Debería contener modelos como:
- `User` - Usuarios del sistema
- `Athlete` - Datos de atletas
- `WellnessLog` - Registros de bienestar
- `Exercise` - Ejercicios
- `TrainingBlock` - Bloques de entrenamiento
- `FoodItem` - Base de datos de alimentos
- `MealPlan` - Planes de comidas
- Y más...

### Paso 2: Generar el Cliente de Prisma

```bash
npx prisma generate
```

Este comando:
- Lee el schema de Prisma
- Genera el cliente de TypeScript
- Crea tipos para todas las tablas

### Paso 3: Crear las Tablas en Supabase

Ejecuta la migración para crear todas las tablas:

```bash
npx prisma db push
```

**Alternativa (más recomendada para producción):**

```bash
# Crear una migración
npx prisma migrate dev --name init

# Aplicar la migración
npx prisma migrate deploy
```

**¿Qué hace este comando?**
- Lee el schema de Prisma
- Se conecta a Supabase usando `DIRECT_URL`
- Crea todas las tablas, relaciones e índices
- Configura las foreign keys y constraints

### Paso 4: (Opcional) Insertar Datos de Prueba

Si quieres poblar la base de datos con datos de ejemplo:

```bash
# Crear archivo prisma/seed.ts con datos de ejemplo
npx prisma db seed
```

O puedes usar los datos mock que ya existen en `lib/mock-data.ts` para desarrollo local.

---

## 🔒 Configuración de Autenticación

### Paso 1: Habilitar Proveedores de Autenticación

1. En el dashboard de Supabase, ve a **Authentication > Providers**
2. Habilita **Email** (ya está habilitado por defecto)
3. (Opcional) Configura proveedores OAuth:
   - Google
   - GitHub
   - Discord
   - Etc.

### Paso 2: Configurar Políticas de RLS (Row Level Security)

**⚠️ IMPORTANTE:** Supabase usa Row Level Security para proteger los datos.

Ve a **Authentication > Policies** y crea políticas para cada tabla.

#### Ejemplo: Política para tabla `User`

```sql
-- Permitir que usuarios lean solo su propio perfil
CREATE POLICY "Users can view own profile"
ON "User"
FOR SELECT
USING (auth.uid()::text = id);

-- Permitir que usuarios actualicen solo su propio perfil
CREATE POLICY "Users can update own profile"
ON "User"
FOR UPDATE
USING (auth.uid()::text = id);
```

#### Ejemplo: Política para tabla `WellnessLog`

```sql
-- Atletas pueden ver solo sus propios logs
CREATE POLICY "Athletes can view own wellness logs"
ON "WellnessLog"
FOR SELECT
USING (
  "athleteId" IN (
    SELECT id FROM "Athlete" WHERE "userId" = auth.uid()::text
  )
);

-- Coaches pueden ver logs de sus atletas
CREATE POLICY "Coaches can view their athletes' wellness logs"
ON "WellnessLog"
FOR SELECT
USING (
  "athleteId" IN (
    SELECT a.id
    FROM "Athlete" a
    JOIN "TrainingBlock" tb ON tb."athleteId" = a.id
    WHERE tb."coachId" = auth.uid()::text
  )
);
```

### Paso 3: Configurar Email Templates (Opcional)

Para personalizar los emails de confirmación:

1. Ve a **Authentication > Email Templates**
2. Personaliza:
   - Confirm signup
   - Magic link
   - Reset password
   - Change email address

---

## 📊 Despliegue del Schema con Prisma

### Estructura Completa del Schema

El proyecto tiene **14 modelos** organizados en 3 dominios:

#### 1. **Dominio de Usuarios y Autenticación**
```prisma
model User {
  id       String   @id @default(uuid())
  email    String   @unique
  name     String
  role     UserRole
  athletes Athlete[]
  // ... más campos
}
```

#### 2. **Dominio de Entrenamiento**
```prisma
model Athlete {
  id            String         @id @default(uuid())
  userId        String
  user          User           @relation(...)
  wellnessLogs  WellnessLog[]
  trainingBlocks TrainingBlock[]
  // ... más campos
}

model WellnessLog {
  id           String   @id @default(uuid())
  date         DateTime
  athleteId    String
  fatigue      Int      // 1-5
  sleepQuality Int      // 1-10
  motivation   Int      // 1-10
  // ... más campos
}

model TrainingBlock {
  id        String  @id @default(uuid())
  name      String
  athleteId String
  coachId   String
  weeks     Week[]
  isActive  Boolean
  // ... más campos
}
```

#### 3. **Dominio de Nutrición**
```prisma
model FoodItem {
  id          String    @id @default(uuid())
  group       FoodGroup
  name        String
  portionSize String
  isPublic    Boolean
  // ... más campos
}

model MealPlan {
  id        String @id @default(uuid())
  athleteId String
  meals     Meal[]
  // ... más campos
}
```

### Comandos Útiles de Prisma

```bash
# Ver el estado de la base de datos
npx prisma db pull

# Visualizar la base de datos en navegador
npx prisma studio

# Validar el schema
npx prisma validate

# Formatear el schema
npx prisma format

# Resetear la base de datos (¡CUIDADO! Borra todos los datos)
npx prisma migrate reset
```

---

## ✅ Verificación de la Configuración

### Test 1: Verificar Conexión a Base de Datos

Crea un archivo de test `scripts/test-db.ts`:

```typescript
import { prisma } from '../lib/prisma'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Conexión a base de datos exitosa')

    const userCount = await prisma.user.count()
    console.log(`📊 Usuarios en base de datos: ${userCount}`)

    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Error de conexión:', error)
    process.exit(1)
  }
}

testConnection()
```

Ejecutar:
```bash
npx tsx scripts/test-db.ts
```

### Test 2: Verificar Autenticación de Supabase

Inicia la aplicación:

```bash
npm run dev
```

1. Ve a `http://localhost:3000/auth/signup`
2. Crea una cuenta de prueba
3. Verifica que recibas el email de confirmación
4. Confirma la cuenta
5. Inicia sesión en `http://localhost:3000/auth/login`

Si puedes iniciar sesión, ¡la configuración es correcta! ✅

### Test 3: Verificar Prisma Client

```typescript
import { prisma } from '@/lib/prisma'

// Debe funcionar sin errores
const users = await prisma.user.findMany()
```

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"

**Causas comunes:**
1. La `DATABASE_URL` está mal configurada
2. El password de la base de datos es incorrecto
3. La base de datos aún está inicializándose

**Soluciones:**
```bash
# Verificar la conexión
npx prisma db pull

# Si falla, revisa:
# 1. Que la URL esté entre comillas en .env.local
# 2. Que el password no contenga caracteres especiales sin escapar
# 3. Que uses el formato correcto: postgresql://postgres:[PASSWORD]@...
```

### Error: "Prepared statement already exists"

**Causa:** Conflicto con pgBouncer en transaction mode.

**Solución:** Asegúrate de que `DATABASE_URL` incluya `?pgbouncer=true&connection_limit=1`

```env
DATABASE_URL="postgresql://...?pgbouncer=true&connection_limit=1"
```

### Error: "Auth session missing"

**Causa:** El usuario no está autenticado o la sesión expiró.

**Solución:**
1. Verificar que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` estén correctas
2. Revisar que el middleware de autenticación esté configurado (`middleware.ts`)
3. Limpiar cookies y volver a iniciar sesión

### Error: "Migration failed: permission denied"

**Causa:** Intentando ejecutar migraciones con `DATABASE_URL` en lugar de `DIRECT_URL`.

**Solución:** Asegúrate de que `DIRECT_URL` esté configurada sin `pgbouncer=true`:

```env
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres"
```

### Tablas no aparecen en Supabase Dashboard

**Solución:**
1. Ve a **Database > Tables** en Supabase
2. Si no ves las tablas, ejecuta:
   ```bash
   npx prisma db push --force-reset
   ```
3. Refresca el dashboard de Supabase

---

## 🚀 Próximos Pasos

Una vez completada la configuración:

1. **Configurar RLS Policies** para todas las tablas (CRÍTICO para seguridad)
2. **Crear datos de prueba** usando `prisma/seed.ts`
3. **Configurar Gemini AI** para features de análisis de atletas
4. **Probar todos los flujos**:
   - Registro de usuario
   - Check-in de bienestar
   - Creación de bloques de entrenamiento
   - Planes de comidas
5. **Configurar CI/CD** para despliegue automático

---

## 📚 Recursos Adicionales

- **Documentación de Supabase:** https://supabase.com/docs
- **Documentación de Prisma:** https://www.prisma.io/docs
- **Next.js + Supabase Guide:** https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security
- **Prisma + Supabase:** https://www.prisma.io/docs/guides/database/supabase

---

## 🔐 Seguridad

### ⚠️ NUNCA subas a Git:
- ❌ `.env.local`
- ❌ `.env`
- ❌ Archivos con contraseñas o API keys

### ✅ Buenas prácticas:
- ✅ Usa variables de entorno para todas las credenciales
- ✅ Configura RLS (Row Level Security) en todas las tablas
- ✅ Usa `service_role` key solo en el servidor
- ✅ Rota las API keys periódicamente
- ✅ Habilita 2FA en tu cuenta de Supabase

---

## 💡 Consejos Finales

1. **Desarrollo Local:** Usa los datos mock de `lib/mock-data.ts` para desarrollo sin necesitar base de datos
2. **Testing:** Crea un proyecto de Supabase separado para testing
3. **Producción:** Usa un proyecto de Supabase diferente para producción
4. **Backups:** Configura backups automáticos en Settings > Database > Backups
5. **Monitoring:** Revisa regularmente Database > Logs para detectar problemas

---

¿Tienes preguntas? Revisa la sección de [Troubleshooting](#troubleshooting) o consulta la documentación oficial de Supabase.

**¡Buena suerte con tu proyecto APEX Performance! 🚀**
