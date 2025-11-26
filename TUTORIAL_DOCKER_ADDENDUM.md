# 🐳 Adendum al Tutorial: Instalación con Docker (LA FORMA MÁS FÁCIL)

**¿Ya leíste el [TUTORIAL.md](./TUTORIAL.md) completo?** Si es tu primera vez, léelo primero.

Este adendum te muestra la forma **MÁS RÁPIDA Y SENCILLA** de correr el proyecto usando Docker.

---

## 🎯 **¿Por Qué Docker?**

El tutorial original requiere:
- ❌ Instalar Node.js manualmente
- ❌ Configurar PostgreSQL (o Supabase)
- ❌ Configurar variables de entorno
- ❌ Ejecutar múltiples comandos

**Con Docker:**
- ✅ Todo se configura automáticamente
- ✅ Un solo comando para iniciar
- ✅ Base de datos incluida (no necesitas Supabase para desarrollo)
- ✅ Mismo ambiente para todo el equipo

---

## 📋 **PARTE 1: Instalar Docker**

### Windows
1. Descarga **Docker Desktop** desde: https://www.docker.com/products/docker-desktop
2. Ejecuta el instalador
3. Reinicia tu computadora
4. Abre Docker Desktop (debe quedarse corriendo en el fondo)

### Mac
```bash
# Opción 1: Con Homebrew (recomendado)
brew install --cask docker

# Opción 2: Descarga directa
# https://www.docker.com/products/docker-desktop
```

Después de instalar, abre Docker Desktop.

### Linux (Ubuntu/Debian)
```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar tu usuario al grupo docker (para no usar sudo)
sudo usermod -aG docker $USER

# Cerrar sesión y volver a entrar, o ejecutar:
newgrp docker

# Instalar Docker Compose
sudo apt-get install docker-compose-plugin
```

**Verificar que funciona:**
```bash
docker --version
# Salida esperada: Docker version 24.x.x

docker-compose --version
# Salida esperada: Docker Compose version v2.x.x
```

---

## 🚀 **PARTE 2: Ejecutar el Proyecto (¡3 Comandos!)**

### Paso 1: Clonar el repositorio (si no lo hiciste)
```bash
git clone https://github.com/danielSegoviaVega94/proyecto_bett.git
cd proyecto_bett
git checkout claude/coaching-platform-architecture-01XDQmLJj2NKt78t562K5dDj
```

### Paso 2: Iniciar todo con Docker

**Opción A - Con Makefile (Mac/Linux - Recomendado):**
```bash
make up
```

**Opción B - Con npm (Windows/Mac/Linux):**
```bash
npm run docker:up
```

**Opción C - Docker Compose directo:**
```bash
docker-compose up -d
```

**¿Qué hace esto?**
- 🐘 Descarga e inicia PostgreSQL (base de datos)
- 🚀 Construye la aplicación Next.js
- 🎨 Inicia pgAdmin (interfaz para ver la base de datos)
- 📦 Instala todas las dependencias automáticamente

**Tiempo:** 2-5 minutos la primera vez (descarga imágenes de Docker)

✅ **Salida esperada:**
```
Creating apex-postgres ... done
Creating apex-pgadmin  ... done
Creating apex-app      ... done
```

### Paso 3: Configurar la base de datos

**Opción A - Con Makefile:**
```bash
make db-push
```

**Opción B - Con npm:**
```bash
npm run docker:prisma:push
```

**Opción C - Docker Compose:**
```bash
docker-compose exec app npx prisma db push
```

✅ **Salida esperada:**
```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema
```

### Paso 4: ¡Abrir en el navegador!

Ve a: **http://localhost:3000/demo**

---

## 🎉 **¡Listo! Eso es todo.**

No necesitaste:
- ❌ Instalar Node.js
- ❌ Instalar PostgreSQL
- ❌ Configurar Supabase
- ❌ Editar archivos .env
- ❌ Ejecutar npm install

Todo está corriendo dentro de contenedores Docker.

---

## 🎮 **PARTE 3: Comandos Básicos**

### Ver logs de la aplicación
```bash
make logs                    # Mac/Linux
npm run docker:logs          # Todos los sistemas
docker-compose logs -f app   # Docker directo
```

### Detener el proyecto
```bash
make down                    # Mac/Linux
npm run docker:down          # Todos los sistemas
docker-compose down          # Docker directo
```

### Ver la base de datos (Prisma Studio)
```bash
make db-studio               # Mac/Linux
npm run docker:prisma:studio # Todos los sistemas
```

Abre automáticamente: http://localhost:5555

### Ver estado de contenedores
```bash
docker-compose ps
```

Deberías ver 3 contenedores corriendo:
- `apex-app` (Next.js) en puerto 3000
- `apex-postgres` (PostgreSQL) en puerto 5432
- `apex-pgadmin` (GUI para DB) en puerto 5050

---

## 🛠️ **PARTE 4: Workflow Diario**

### Día típico de desarrollo

```bash
# 1. Iniciar el proyecto (al comenzar el día)
make up

# 2. Ver que está corriendo
docker-compose ps

# 3. Abrir en el navegador
# http://localhost:3000/demo

# 4. Editar código normalmente en tu editor
# Los cambios se reflejan automáticamente (hot reload)

# 5. Ver logs si algo falla
make logs

# 6. Al terminar (opcional - puedes dejarlo corriendo)
make down
```

### Después de cambios en Prisma Schema

```bash
# 1. Edita: prisma/schema.prisma

# 2. Aplica cambios a la base de datos
make db-push

# 3. (Opcional) Ver los cambios
make db-studio
```

---

## 🐛 **PARTE 5: Solución de Problemas**

### ❌ "Cannot connect to the Docker daemon"

**Solución:** Docker Desktop no está corriendo.
- Windows/Mac: Abre Docker Desktop desde el menú
- Linux: `sudo systemctl start docker`

---

### ❌ "port 3000 is already allocated"

**Solución:** Algo ya está usando el puerto 3000.

```bash
# Detener contenedores
make down

# Matar proceso en puerto 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Matar proceso en puerto 3000 (Windows PowerShell)
netstat -ano | findstr :3000
taskkill /PID [número] /F

# Volver a iniciar
make up
```

---

### ❌ Los cambios de código no se ven

**Solución 1:** Verifica que Docker Desktop esté corriendo.

**Solución 2:** Reinicia contenedores:
```bash
make restart
# o: docker-compose restart app
```

**Solución 3 (Windows):** Edita `docker-compose.override.yml` y asegúrate que tenga:
```yaml
services:
  app:
    environment:
      - CHOKIDAR_USEPOLLING=true
```

Luego: `make restart`

---

### ❌ "Database error: Table does not exist"

**Solución:** No ejecutaste `make db-push`

```bash
make db-push
```

---

### ❌ Quiero borrar todo y empezar de cero

```bash
# Esto borra contenedores y volúmenes (base de datos)
make clean

# Volver a iniciar
make up
make db-push
```

---

## 📊 **PARTE 6: Herramientas Incluidas**

### pgAdmin - Interfaz Gráfica para PostgreSQL

1. Ve a: http://localhost:5050
2. Login:
   - **Email:** admin@apex.local
   - **Password:** admin

3. Agregar servidor:
   - Right-click "Servers" → Create → Server
   - **Name:** Apex Local
   - Tab "Connection":
     - **Host:** postgres
     - **Port:** 5432
     - **Database:** apex_performance
     - **Username:** postgres
     - **Password:** apex_dev_password_123
   - Save

Ahora puedes ver tablas, ejecutar queries SQL, etc.

### Prisma Studio (Más Fácil)

```bash
make db-studio
```

Abre: http://localhost:5555

Aquí puedes:
- Ver todas las tablas
- Editar datos directamente
- Agregar registros nuevos
- Buscar y filtrar

---

## 🎯 **PARTE 7: Comandos Rápidos de Referencia**

```bash
# INICIAR/DETENER
make up          # Iniciar todo
make down        # Detener todo
make restart     # Reiniciar

# LOGS
make logs        # Ver logs en tiempo real

# BASE DE DATOS
make db-push     # Aplicar schema de Prisma
make db-studio   # Abrir Prisma Studio
make pgadmin     # Abrir pgAdmin

# LIMPIEZA
make clean       # Borrar todo (contenedores + datos)

# VER ESTADO
docker-compose ps              # Estado de contenedores
docker stats                   # Uso de recursos
```

---

## 🆚 **Docker vs Manual: ¿Cuál usar?**

| Característica | Docker | Manual |
|----------------|--------|--------|
| **Tiempo de setup** | 5 minutos | 30+ minutos |
| **Base de datos** | ✅ Incluida | ❌ Debes configurar Supabase |
| **Reproducibilidad** | ✅ 100% | ⚠️ Depende de tu sistema |
| **Facilidad** | ✅✅✅ | ⚠️⚠️ |
| **Para producción** | ✅ Recomendado | ✅ También funciona |
| **Windows** | ✅ Funciona perfecto | ⚠️ Más complejo |

**Recomendación:** Usa Docker para desarrollo local, especialmente si:
- Eres nuevo en el proyecto
- Estás en Windows
- Quieres evitar configuraciones complejas
- Trabajas en equipo (mismo ambiente para todos)

---

## ✅ **Checklist Final**

Antes de empezar a desarrollar, confirma:

- [ ] Docker Desktop instalado y corriendo
- [ ] `docker --version` funciona
- [ ] `make up` ejecutado sin errores (o `npm run docker:up`)
- [ ] http://localhost:3000 carga
- [ ] http://localhost:3000/demo funciona
- [ ] `make db-push` ejecutado correctamente
- [ ] Prisma Studio funciona (`make db-studio`)

---

## 🚀 **Siguiente Paso**

Ahora que tienes todo corriendo, lee la **Parte 6** del [TUTORIAL.md](./TUTORIAL.md) para aprender a usar la aplicación.

O ve directamente a probar:
- **Coach:** http://localhost:3000/demo → Click en "Coach"
- **Nutritionist:** http://localhost:3000/demo → Click en "Nutritionist"
- **Athlete:** http://localhost:3000/demo → Click en "Athlete"

---

## 📚 **Más Información**

- **Guía completa de Docker:** [DOCKER.md](./DOCKER.md)
- **Tutorial completo:** [TUTORIAL.md](./TUTORIAL.md)
- **README general:** [README.md](./README.md)

---

**¡Disfruta del desarrollo sin complicaciones!** 🎉
