# ⚡ Inicio Rápido - Apex Performance Platform

**3 formas de ejecutar el proyecto. Elige la que prefieras:**

---

## 🐳 **OPCIÓN 1: Docker (MÁS FÁCIL - RECOMENDADO)**

### Prerequisito: Docker Desktop
- Windows/Mac: https://www.docker.com/products/docker-desktop
- Linux: `curl -fsSL https://get.docker.com | sh`

### Ejecutar (3 comandos):

**Con Makefile (Mac/Linux):**
```bash
make up          # Inicia todo (app + base de datos)
make db-push     # Configura base de datos
```

**Con npm (Todos los sistemas):**
```bash
npm run docker:up            # Inicia todo
npm run docker:prisma:push   # Configura base de datos
```

**Abrir:** http://localhost:3000/demo

**Documentación completa:** [DOCKER.md](./DOCKER.md)

---

## 💻 **OPCIÓN 2: Local sin Docker (Tradicional)**

### Prerequisitos:
- Node.js 18+
- Cuenta de Supabase (gratis)

### Pasos:

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase

# 3. Ejecutar
npm run dev
```

**Abrir:** http://localhost:3000/demo

**Documentación completa:** [TUTORIAL.md](./TUTORIAL.md)

---

## 🎮 **OPCIÓN 3: Solo Probar (Sin Instalación)**

### Demo en Vivo
Si solo quieres ver cómo funciona sin instalar nada, contacta para obtener acceso al demo en producción.

---

## 📊 **Comparación**

| Característica | Docker | Local | Demo |
|----------------|--------|-------|------|
| **Tiempo setup** | 5 min | 30 min | 0 min |
| **Necesita instalar** | Solo Docker | Node + DB | Nada |
| **Base de datos** | ✅ Incluida | ❌ Debes configurar | ✅ Ya configurada |
| **Editar código** | ✅ Sí | ✅ Sí | ❌ No |
| **Offline** | ✅ Sí | ✅ Sí | ❌ No |

---

## 🎯 **¿Cuál elegir?**

- **Nuevo en el proyecto?** → Docker
- **Prefieres control total?** → Local
- **Solo quieres ver cómo funciona?** → Demo
- **Vas a desarrollar features?** → Docker o Local
- **Estás en Windows?** → Docker (más fácil)

---

## 📚 **Documentación Completa**

- **README.md** - Visión general del proyecto
- **DOCKER.md** - Guía completa de Docker (500+ líneas)
- **TUTORIAL.md** - Tutorial paso a paso tradicional (600+ líneas)
- **TUTORIAL_DOCKER_ADDENDUM.md** - Tutorial Docker en español (400+ líneas)

---

## 🆘 **Ayuda Rápida**

### Docker no funciona
```bash
# Verificar que Docker está corriendo
docker --version

# Ver logs
make logs

# Reiniciar todo
make down
make up
```

### Local no funciona
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install

# Verificar variables de entorno
cat .env.local
```

---

## ✅ **Verificación Exitosa**

Sabes que está funcionando cuando:

✅ http://localhost:3000 carga sin errores
✅ http://localhost:3000/demo muestra 3 roles (Coach, Nutritionist, Athlete)
✅ Puedes seleccionar un rol y ver su dashboard

---

## 🚀 **Siguiente Paso**

Después de tener el proyecto corriendo:

1. Ve a http://localhost:3000/demo
2. Selecciona el rol "Athlete"
3. Completa el Daily Check-in
4. Explora el dashboard de entrenamiento y nutrición

**¡Disfruta!** 🎉
