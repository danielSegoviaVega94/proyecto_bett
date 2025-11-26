# 🪟 Guía Rápida para Windows

**Ejecutar Apex Performance Platform en Windows con Docker**

---

## ⚠️ Importante para Windows

En Windows, el comando `make` no funciona directamente en PowerShell. Tienes **3 opciones**:

### **Opción 1: Usar npm scripts (RECOMENDADO)** ✅
```powershell
npm run docker:up
npm run docker:prisma:push
```

### **Opción 2: Usar docker-compose directo**
```powershell
docker-compose up -d
docker-compose exec app npx prisma db push
```

### **Opción 3: Instalar make para Windows**
```powershell
# Con Chocolatey (package manager para Windows)
choco install make

# Luego podrás usar:
make up
make db-push
```

---

## 🚀 Inicio Rápido (Windows)

### Paso 1: Verificar Docker Desktop

Asegúrate de que **Docker Desktop** esté:
- ✅ Instalado
- ✅ Abierto y corriendo (ícono en la bandeja del sistema)

**Verificar:**
```powershell
docker --version
docker-compose --version
```

### Paso 2: Abrir PowerShell como Administrador

1. Click derecho en el botón de Windows
2. Seleccionar "Windows PowerShell (Administrador)"
3. Navegar a la carpeta del proyecto:
   ```powershell
   cd "C:\Proyecto gestion\proyecto_bett"
   ```

### Paso 3: Iniciar el proyecto

**Opción A - Con npm (FÁCIL):**
```powershell
npm run docker:up
```

**Opción B - Con docker-compose:**
```powershell
docker-compose up -d
```

Espera 2-3 minutos la primera vez (descarga imágenes).

✅ **Salida esperada:**
```
Creating apex-postgres ... done
Creating apex-pgadmin  ... done
Creating apex-app      ... done
```

### Paso 4: Configurar la base de datos

**Con npm:**
```powershell
npm run docker:prisma:push
```

**Con docker-compose:**
```powershell
docker-compose exec app npx prisma db push
```

✅ **Salida esperada:**
```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema
```

### Paso 5: Abrir en el navegador

Ve a: **http://localhost:3000/demo**

---

## 🎮 Comandos para Windows

### Iniciar/Detener

```powershell
# Iniciar
npm run docker:up

# Ver logs
npm run docker:logs

# Detener
npm run docker:down

# Reiniciar
docker-compose restart
```

### Base de Datos

```powershell
# Aplicar schema
npm run docker:prisma:push

# Abrir Prisma Studio
npm run docker:prisma:studio
# Abre: http://localhost:5555

# Ver estado
docker-compose ps
```

### Limpieza

```powershell
# Detener y borrar todo
docker-compose down -v

# Reiniciar desde cero
npm run docker:reset
```

---

## 🐛 Problemas Comunes en Windows

### ❌ "docker: command not found"

**Solución:** Docker Desktop no está en el PATH o no está instalado.

1. Abre Docker Desktop manualmente
2. Reinicia PowerShell
3. Verifica: `docker --version`

---

### ❌ "Cannot connect to the Docker daemon"

**Solución:** Docker Desktop no está corriendo.

1. Busca el ícono de Docker en la bandeja del sistema
2. Si no está, abre Docker Desktop desde el menú de Windows
3. Espera a que diga "Docker Desktop is running"

---

### ❌ "network projeto_bett_default Error"

**Solución:** Limpiar redes de Docker.

```powershell
docker-compose down
docker network prune -f
docker-compose up -d
```

---

### ❌ "Port 3000 is already allocated"

**Solución:** Matar proceso en puerto 3000.

```powershell
# Ver qué está usando el puerto
netstat -ano | findstr :3000

# Matar proceso (reemplaza PID con el número que sale)
taskkill /PID [número] /F

# Volver a iniciar
npm run docker:up
```

---

### ❌ "Error response from daemon: Conflict"

**Solución:** Contenedor ya existe.

```powershell
# Detener y borrar
docker-compose down

# Volver a crear
npm run docker:up
```

---

### ❌ Los cambios de código no se ven

**Solución:** Reiniciar contenedor de la app.

```powershell
docker-compose restart app
```

Si persiste, edita `docker-compose.override.yml` y asegúrate que tenga:

```yaml
services:
  app:
    environment:
      - CHOKIDAR_USEPOLLING=true
      - WATCHPACK_POLLING=true
```

Luego:
```powershell
docker-compose down
docker-compose up -d
```

---

## 📝 Referencia Rápida de Comandos

| Acción | Comando npm | Comando docker-compose |
|--------|-------------|------------------------|
| **Iniciar** | `npm run docker:up` | `docker-compose up -d` |
| **Detener** | `npm run docker:down` | `docker-compose down` |
| **Ver logs** | `npm run docker:logs` | `docker-compose logs -f app` |
| **Reiniciar** | - | `docker-compose restart` |
| **Estado** | - | `docker-compose ps` |
| **DB Push** | `npm run docker:prisma:push` | `docker-compose exec app npx prisma db push` |
| **DB Studio** | `npm run docker:prisma:studio` | `docker-compose exec app npx prisma studio` |
| **Limpiar** | `npm run docker:reset` | `docker-compose down -v` |

---

## ✅ Verificar que funciona

Después de ejecutar los comandos, confirma que:

1. **Docker Desktop** muestra 3 contenedores corriendo:
   - apex-app
   - apex-postgres
   - apex-pgadmin

2. **PowerShell** muestra sin errores:
   ```powershell
   docker-compose ps
   ```

3. **Navegador** abre correctamente:
   - http://localhost:3000 (debe cargar)
   - http://localhost:3000/demo (debe mostrar roles)

---

## 💡 Consejos para Windows

1. **Usa PowerShell, NO CMD**
   - PowerShell tiene mejor soporte para comandos modernos

2. **Ejecuta como Administrador**
   - Algunos comandos de Docker requieren permisos elevados

3. **Usa comillas para rutas con espacios**
   ```powershell
   cd "C:\Proyecto gestion\proyecto_bett"
   ```

4. **Mantén Docker Desktop abierto**
   - Debe estar corriendo en segundo plano siempre que uses Docker

5. **Usa WSL 2 (recomendado)**
   - Docker Desktop > Settings > General > "Use WSL 2 based engine"
   - Mejora significativa de rendimiento

---

## 🔧 Configuración Opcional: WSL 2

Para mejor rendimiento en Windows:

1. **Habilitar WSL 2:**
   ```powershell
   # En PowerShell como Administrador
   wsl --install
   ```

2. **Reiniciar computadora**

3. **Configurar Docker Desktop:**
   - Settings > General
   - ✅ "Use WSL 2 based engine"
   - Apply & Restart

4. **Usar desde WSL:**
   ```bash
   # Abrir Ubuntu (o tu distro de Linux)
   cd /mnt/c/Proyecto\ gestion/proyecto_bett

   # Ahora puedes usar make
   make up
   make db-push
   ```

---

## 📚 Documentación Adicional

- **DOCKER.md** - Guía completa de Docker
- **TUTORIAL.md** - Tutorial completo paso a paso
- **QUICK_START.md** - Comparación de opciones
- **README.md** - Visión general del proyecto

---

## 🆘 ¿Sigues teniendo problemas?

1. **Verifica Docker Desktop:**
   - Debe decir "Docker Desktop is running" (verde)
   - Restart si está en rojo

2. **Limpia todo y empieza de cero:**
   ```powershell
   docker-compose down -v
   docker system prune -a -f
   npm run docker:up
   npm run docker:prisma:push
   ```

3. **Revisa logs:**
   ```powershell
   docker-compose logs postgres
   docker-compose logs app
   ```

4. **Abre un issue en GitHub** con:
   - Comando que ejecutaste
   - Error completo
   - Salida de `docker --version`
   - Screenshot de Docker Desktop

---

**¡Listo para desarrollar en Windows!** 🚀
