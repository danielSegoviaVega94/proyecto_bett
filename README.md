# Apex Performance Platform

A professional, scalable **High-Performance Coaching SaaS** platform built with Next.js 14, designed for Coaches, Nutritionists, and Athletes.

## 🎯 Vision

Solve the problem of generic fitness apps by providing a platform based on professional methodologies:
- **RIR/RPE Auto-regulation** for training
- **Exchange Portion System** for nutrition (not calorie counting)

---

## 🏗️ Tech Stack

### Framework & Core
- **Next.js 14** (App Router) + TypeScript
- **React 18.3** with Server & Client Components

### Database & ORM
- **Supabase** (PostgreSQL) - Authentication & Database
- **Prisma** - Type-safe ORM with comprehensive schema

### Styling & UI
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Professional component library (Radix UI primitives)

### State & Data Fetching
- **TanStack Query (React Query)** - Server state management

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### AI Integration
- **Google Gemini** - AI-powered athlete analysis and recommendations

---

## 📦 Project Structure

```
apex-performance-platform/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── demo/                # Demo mode (no auth required)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── dashboards/          # Role-specific dashboards
│   │   ├── coach-dashboard.tsx
│   │   ├── athlete-dashboard.tsx
│   │   └── nutritionist-dashboard.tsx
│   ├── training/            # Training module components
│   │   └── rir-input-row.tsx
│   ├── nutrition/           # Nutrition module components
│   │   └── nutrition-slot-selector.tsx
│   ├── ui/                  # Shadcn/UI base components
│   ├── providers.tsx        # React Query provider
│   └── wellness-checkin.tsx # Daily check-in component
├── lib/
│   ├── supabase/           # Supabase client utilities
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── middleware.ts   # Session refresh
│   ├── gemini.ts           # AI service
│   ├── prisma.ts           # Prisma client
│   ├── types.ts            # TypeScript definitions
│   ├── utils.ts            # Utility functions
│   └── mock-data.ts        # Demo data
├── prisma/
│   └── schema.prisma       # Database schema
├── middleware.ts           # Next.js middleware (auth, RBAC)
└── tailwind.config.ts      # Tailwind configuration
```

---

## 🚀 Getting Started

### **🐳 QUICK START WITH DOCKER (Recommended)**

**Prerequisites:** Docker Desktop installed
- Windows/Mac: https://www.docker.com/products/docker-desktop
- Linux: `curl -fsSL https://get.docker.com | sh`

**Start in 3 commands:**
```bash
# 1. Start everything (database + app)
make up
# or: npm run docker:up

# 2. Setup database
make db-push
# or: npm run docker:prisma:push

# 3. Open http://localhost:3000/demo
```

✅ **That's it!** No need to install PostgreSQL or configure Supabase.

📖 **Full Docker Guide:** See [DOCKER.md](./DOCKER.md)

---

### **📦 Manual Setup (Without Docker)**

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works)
- Gemini API key (optional, for AI features)

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Database (from Supabase dashboard)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Gemini AI (optional)
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (development)
npx prisma db push

# Or run migrations (production)
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎭 Demo Mode

Visit `/demo` to explore the platform without authentication:
- Select a role (Coach/Nutritionist/Athlete)
- Interact with sample data
- Test AI features (requires Gemini API key)

---

## 👥 User Roles (RBAC)

### 🧠 Coach
- Create training blocks with RIR/RPE targets
- Monitor athlete fatigue & readiness (risk table)
- View progressive overload analytics
- AI-powered athlete analysis

### 🥗 Nutritionist
- Manage food exchange database
- Create meal plans with portion slots
- Track client adherence
- No calorie counting

### 🏋️ Athlete
- Daily wellness check-in (fatigue, sleep, motivation)
- Log workouts (weight, reps, RIR)
- Track nutrition via portion slots
- AI session adjustments based on readiness

---

## 🗄️ Database Schema Highlights

### Core Entities
- **User** - Authentication & role assignment
- **Athlete** - Profile linking coaches & nutritionists
- **WellnessLog** - Daily check-ins (fatigue, sleep, etc.)

### Training Domain (RIR/RPE)
- **TrainingBlock** → **Week** → **Workout** → **WorkoutExercise**
- **ExerciseLog** - Records with progressive overload tracking

### Nutrition Domain (Exchange Portions)
- **FoodItem** - Grouped by macros (CARB, PROTEIN, FAT, etc.)
- **MealPlan** → **Meal** → **MealSlot**
- **DailyNutritionLog** - Slot consumption tracking

See `prisma/schema.prisma` for complete schema.

---

## 🔐 Authentication Flow

1. User signs up via Supabase Auth
2. Metadata stored in `User` table (name, role)
3. Middleware refreshes session on each request
4. Protected routes check authentication status
5. RBAC enforced at UI and API levels

---

## 🤖 AI Features

### Powered by Google Gemini
- **Athlete Analysis** - Trends & recommendations from wellness logs
- **Session Adjustments** - RIR/RPE modifications based on readiness
- **Meal Suggestions** - Creative meal ideas from portion slots

Configure in `.env.local`:
```env
GEMINI_API_KEY=your-api-key
```

---

## 🧪 Key Features

### ✅ Implemented
- Next.js 14 App Router architecture
- Supabase authentication
- Prisma database schema
- Role-based dashboards
- RIR/RPE training logging
- Exchange portion nutrition
- Daily wellness check-ins
- AI integrations (Gemini)
- Responsive design (mobile-first for athletes)

### 🚧 Roadmap
- Drag-and-drop workout builder
- Block periodization tools
- Real-time coach-athlete chat
- Analytics dashboards
- Mobile app (React Native)
- PDF report generation

---

## 🛠️ Development

### Build for Production
```bash
npm run build
npm start
```

### Prisma Commands
```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Code Quality
```bash
npm run lint
```

---

## 📚 Business Logic

### Training: RIR/RPE Auto-Regulation
- **RIR (Reps In Reserve)**: How many more reps could be performed
- **Progressive Overload**: System tracks previous session data
- **Adaptive Programming**: Coaches set RIR targets, athletes adjust based on readiness

### Nutrition: Exchange Portion System
- **Not calorie counting** - Focuses on portion adherence
- **Flexibility**: Athletes choose foods within each macro group
- **Simplicity**: "Fill 2 CARB slots" vs. "calculate 80g carbs"

### Wellness: Check-in System
- **Daily gate**: Athletes must complete check-in before training
- **Risk monitoring**: Coaches see fatigue trends
- **AI guidance**: Auto-adjustments for low-readiness days

---

## 🤝 Contributing

This is a professional SaaS platform. For feature requests or bugs, please document thoroughly with:
- Expected behavior
- Actual behavior
- Steps to reproduce
- Screenshots (if UI-related)

---

## 📄 License

Proprietary - Apex Performance Platform © 2025

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Google Gemini](https://ai.google.dev/)

---

**Apex Performance** - Where data meets results.
