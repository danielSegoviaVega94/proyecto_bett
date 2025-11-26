# 🐳 Guía Docker - Apex Performance Platform

Dockerización completa del proyecto para desarrollo local simplificado.

---

## 🎯 **¿Por qué Docker?**

✅ **No necesitas instalar PostgreSQL** - Todo corre en contenedores
✅ **Configuración instantánea** - Un comando y estás listo
✅ **Entorno reproducible** - Mismo setup para todo el equipo
✅ **Fácil reset** - Borra y recrea todo en segundos

---

## 📋 **Prerequisito: Instalar Docker**

### Windows
1. Descarga **Docker Desktop**: https://www.docker.com/products/docker-desktop
2. Instala y reinicia tu computadora
3. Abre Docker Desktop (debe estar corriendo)

### Mac
```bash
# Con Homebrew
brew install --cask docker

# O descarga desde:
# https://www.docker.com/products/docker-desktop
```

### Linux (Ubuntu/Debian)
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar tu usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión o ejecutar:
newgrp docker

# Instalar Docker Compose
sudo apt-get install docker-compose-plugin
```

**Verificar instalación:**
```bash
docker --version
docker-compose --version
```

---

## 🚀 **INICIO RÁPIDO (3 pasos)**

### **Opción A: Con Makefile (Recomendado - Mac/Linux)**

```bash
# 1. Ver todos los comandos disponibles
make help

# 2. Levantar todo el proyecto (automático)
make up

# 3. Configurar la base de datos
make db-push
```

✅ **¡Listo!** Ve a http://localhost:3000/demo

---

### **Opción B: Con npm scripts (Funciona en todos los OS)**

```bash
# 1. Levantar contenedores
npm run docker:up

# 2. Ver logs para confirmar que todo funciona
npm run docker:logs

# 3. Configurar la base de datos (en otra terminal)
npm run docker:prisma:push
```

✅ **¡Listo!** Ve a http://localhost:3000/demo

---

### **Opción C: Con Docker Compose directo**

```bash
# 1. Levantar contenedores
docker-compose up -d

# 2. Configurar base de datos
docker-compose exec app npx prisma db push

# 3. Ver logs (opcional)
docker-compose logs -f app
```

---

## 🏗️ **Arquitectura de Contenedores**

El proyecto usa **3 servicios** en Docker:

### 1. **postgres** - Base de Datos PostgreSQL
- **Puerto:** 5432
- **Usuario:** `postgres`
- **Password:** `apex_dev_password_123`
- **Database:** `apex_performance`
- **Volumen:** Persistente (los datos se mantienen al reiniciar)

### 2. **app** - Aplicación Next.js
- **Puerto:** 3000
- **Hot Reload:** ✅ Activado (cambios en código se reflejan automáticamente)
- **Variables de entorno:** Configuradas automáticamente

### 3. **pgadmin** - Interfaz Web para PostgreSQL (Opcional)
- **Puerto:** 5050
- **URL:** http://localhost:5050
- **Email:** `admin@apex.local`
- **Password:** `admin`

---

## 📦 **Comandos Principales**

### **Gestión de Contenedores**

```bash
# Iniciar todo
make up                    # o: npm run docker:up

# Detener todo (sin borrar datos)
make down                  # o: npm run docker:down

# Ver logs en tiempo real
make logs                  # o: npm run docker:logs

# Reiniciar contenedores
make restart               # o: docker-compose restart

# Reconstruir y reiniciar (después de cambios en Dockerfile)
make build                 # o: npm run docker:build
```

### **Base de Datos**

```bash
# Aplicar schema de Prisma a PostgreSQL
make db-push               # o: npm run docker:prisma:push

# Abrir Prisma Studio (GUI para ver/editar datos)
make db-studio             # o: npm run docker:prisma:studio

# Abrir pgAdmin (otro GUI para PostgreSQL)
make pgadmin               # Abre http://localhost:5050

# Resetear base de datos (⚠️ borra todos los datos)
make db-reset
```

### **Limpieza**

```bash
# Detener y borrar contenedores + volúmenes
make clean                 # o: docker-compose down -v

# Resetear completamente (borrar todo y reconstruir)
npm run docker:reset
```

---

## 🔧 **Configuración Detallada**

### **Estructura de Archivos Docker**

```
proyecto_bett/
├── docker-compose.yml           # Configuración principal
├── docker-compose.override.yml  # Customizaciones locales (auto-cargado)
├── Dockerfile                   # Imagen de producción
├── Dockerfile.dev               # Imagen de desarrollo
├── .dockerignore                # Archivos a ignorar en build
├── .env.docker                  # Variables de entorno para Docker
└── Makefile                     # Comandos rápidos (make up, make down, etc)
```

### **Variables de Entorno**

El archivo `.env.docker` ya está configurado con valores por defecto:

```env
DATABASE_URL=postgresql://postgres:apex_dev_password_123@postgres:5432/apex_performance
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
GEMINI_API_KEY=placeholder-gemini-key
```

**Para usar Gemini AI:**
1. Obtén tu API key: https://ai.google.dev/
2. Edita `.env.docker` y reemplaza `placeholder-gemini-key`
3. Reinicia: `make restart`

---

## 🎓 **Flujo de Trabajo con Docker**

### **Día a día (Desarrollo Normal)**

```bash
# 1. Iniciar el proyecto (una sola vez al día)
make up

# 2. Ver la app en el navegador
# http://localhost:3000/demo

# 3. Editar código normalmente
# Los cambios se reflejan automáticamente (hot reload)

# 4. Ver logs si hay errores
make logs

# 5. Al terminar (opcional - puedes dejarlo corriendo)
make down
```

### **Después de Cambios en Prisma Schema**

```bash
# 1. Edita prisma/schema.prisma

# 2. Aplica los cambios
make db-push

# 3. (Opcional) Ver los cambios en Prisma Studio
make db-studio
```

### **Trabajar con la Base de Datos**

```bash
# Opción 1: Prisma Studio (Recomendado)
make db-studio
# Abre http://localhost:5555

# Opción 2: pgAdmin (Más completo)
make pgadmin
# Abre http://localhost:5050
# Email: admin@apex.local / Password: admin

# Configurar conexión en pgAdmin:
# Host: postgres
# Port: 5432
# Database: apex_performance
# Username: postgres
# Password: apex_dev_password_123
```

---

## 🐛 **Solución de Problemas Docker**

### ❌ Error: "Cannot connect to the Docker daemon"

**Problema:** Docker Desktop no está corriendo.

**Solución:**
- **Windows/Mac:** Abre Docker Desktop desde el menú de aplicaciones
- **Linux:** `sudo systemctl start docker`

---

### ❌ Error: "port is already allocated"

**Problema:** El puerto 3000, 5432 o 5050 ya está en uso.

**Solución - Opción 1 (Cambiar puerto):**
Edita `docker-compose.yml`:
```yaml
services:
  app:
    ports:
      - "3001:3000"  # Cambiar primer número
```

**Solución - Opción 2 (Matar proceso):**
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

---

### ❌ Error: "no configuration file provided"

**Problema:** Ejecutando comandos desde carpeta incorrecta.

**Solución:**
```bash
# Asegúrate de estar en la raíz del proyecto
cd /ruta/al/proyecto_bett

# Verifica que exista docker-compose.yml
ls docker-compose.yml
```

---

### ❌ Los cambios de código no se reflejan

**Problema:** Hot reload no funciona en Windows.

**Solución:**
Edita `docker-compose.override.yml` y agrega:
```yaml
services:
  app:
    environment:
      - CHOKIDAR_USEPOLLING=true
      - WATCHPACK_POLLING=true
```

Luego: `make restart`

---

### ❌ Error: "Container is unhealthy"

**Problema:** PostgreSQL no inició correctamente.

**Solución:**
```bash
# Ver logs de postgres
docker-compose logs postgres

# Reiniciar solo postgres
docker-compose restart postgres

# Si persiste, resetear todo
make clean
make up
make db-push
```

---

### ❌ La base de datos está vacía después de reiniciar

**Problema:** Ejecutaste `docker-compose down -v` (borró los volúmenes).

**Solución:**
```bash
# Volver a aplicar el schema
make db-push

# Si necesitas datos de prueba, créalos en /demo
```

---

## 📊 **Inspeccionar Contenedores**

### **Ver estado de contenedores**
```bash
docker-compose ps
```

Salida esperada:
```
NAME            STATUS    PORTS
apex-app        running   0.0.0.0:3000->3000/tcp
apex-postgres   running   0.0.0.0:5432->5432/tcp
apex-pgadmin    running   0.0.0.0:5050->80/tcp
```

### **Ver logs de un servicio específico**
```bash
docker-compose logs app       # Logs de Next.js
docker-compose logs postgres  # Logs de PostgreSQL
docker-compose logs -f app    # Seguir logs en tiempo real
```

### **Ejecutar comandos dentro de contenedores**
```bash
# Abrir bash en el contenedor de la app
docker-compose exec app sh

# Ejecutar comando específico
docker-compose exec app npm run lint
docker-compose exec app npx prisma studio
```

### **Ver recursos utilizados**
```bash
docker stats
```

---

## 🏭 **Producción (Deploy)**

### **Build para Producción**

```bash
# 1. Crear imagen de producción
docker build -t apex-performance:latest .

# 2. Ejecutar en producción
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXT_PUBLIC_SUPABASE_URL="..." \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="..." \
  apex-performance:latest
```

### **Desplegar en Railway/Render/Fly.io**

Estos servicios detectan automáticamente el `Dockerfile` y lo usan para deployment.

**Railway:**
```bash
railway login
railway init
railway up
```

**Variables de entorno a configurar en la plataforma:**
- `DATABASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`

---

## 🎯 **Mejores Prácticas**

### ✅ **DO's**
- Usa `make up` para iniciar rápido
- Mantén Docker Desktop corriendo mientras desarrollas
- Usa `make db-studio` para explorar datos
- Haz `make clean` si algo se rompe y no sabes qué

### ❌ **DON'Ts**
- No uses `docker-compose down -v` a menos que quieras borrar datos
- No edites archivos dentro de los contenedores (usa hot reload)
- No expongas passwords de producción en docker-compose.yml

---

## 📚 **Recursos Adicionales**

- **Docker Docs:** https://docs.docker.com/
- **Docker Compose Docs:** https://docs.docker.com/compose/
- **Prisma with Docker:** https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- **Next.js Docker:** https://github.com/vercel/next.js/tree/canary/examples/with-docker

---

## ✅ **Checklist Docker**

Antes de empezar a desarrollar, confirma que:

- [ ] Docker Desktop está instalado y corriendo
- [ ] `docker --version` funciona
- [ ] `docker-compose --version` funciona
- [ ] Ejecutaste `make up` (o `npm run docker:up`)
- [ ] http://localhost:3000 carga correctamente
- [ ] http://localhost:3000/demo funciona
- [ ] `make db-push` se ejecutó sin errores
- [ ] Prisma Studio funciona (`make db-studio`)

---

## 🚀 **¡Todo Listo!**

Ahora tienes un entorno de desarrollo completamente dockerizado.

**Comandos más usados:**
```bash
make up          # Iniciar
make logs        # Ver qué pasa
make db-push     # Actualizar DB
make db-studio   # Ver datos
make down        # Detener
```

**Empezar a desarrollar:**
1. `make up`
2. Edita código
3. Ve cambios en http://localhost:3000
4. `make down` al terminar (opcional)

¡Disfruta el desarrollo sin configuraciones complejas! 🎉
