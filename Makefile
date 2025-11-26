# Makefile for Apex Performance Platform
# Quick commands for Docker and development

.PHONY: help install dev build start stop restart logs clean db-push db-studio docker-build

# Default target
help:
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║        Apex Performance Platform - Commands                ║"
	@echo "╚════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "🐳 Docker Commands:"
	@echo "  make up          - Start all containers (app + database)"
	@echo "  make down        - Stop all containers"
	@echo "  make build       - Rebuild and start containers"
	@echo "  make restart     - Restart all containers"
	@echo "  make logs        - View app logs (follow mode)"
	@echo "  make clean       - Stop and remove all containers & volumes"
	@echo ""
	@echo "🗄️  Database Commands:"
	@echo "  make db-push     - Push Prisma schema to database"
	@echo "  make db-studio   - Open Prisma Studio (database GUI)"
	@echo "  make db-reset    - Reset database (⚠️  deletes all data)"
	@echo "  make pgadmin     - Open pgAdmin (http://localhost:5050)"
	@echo ""
	@echo "📦 Development Commands:"
	@echo "  make install     - Install dependencies locally"
	@echo "  make dev         - Run dev server locally (no Docker)"
	@echo "  make lint        - Run linter"
	@echo ""

# Docker commands
up:
	@echo "🚀 Starting Apex Performance Platform..."
	docker-compose up -d
	@echo "✅ Platform running at http://localhost:3000"
	@echo "✅ pgAdmin at http://localhost:5050 (admin@apex.local / admin)"

down:
	@echo "🛑 Stopping containers..."
	docker-compose down

build:
	@echo "🔨 Building and starting containers..."
	docker-compose up -d --build

restart:
	@echo "🔄 Restarting containers..."
	docker-compose restart

logs:
	@echo "📋 Showing app logs (Ctrl+C to exit)..."
	docker-compose logs -f app

clean:
	@echo "🧹 Cleaning up containers and volumes..."
	docker-compose down -v
	@echo "✅ Cleanup complete"

# Database commands
db-push:
	@echo "📊 Pushing Prisma schema to database..."
	docker-compose exec app npx prisma db push
	@echo "✅ Database schema updated"

db-studio:
	@echo "🎨 Opening Prisma Studio..."
	@echo "Visit: http://localhost:5555"
	docker-compose exec app npx prisma studio

db-reset:
	@echo "⚠️  WARNING: This will delete ALL data!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	docker-compose down -v
	docker-compose up -d postgres
	@sleep 5
	docker-compose up -d app
	@sleep 3
	docker-compose exec app npx prisma db push
	@echo "✅ Database reset complete"

pgadmin:
	@echo "🎨 Opening pgAdmin..."
	@echo "URL: http://localhost:5050"
	@echo "Email: admin@apex.local"
	@echo "Password: admin"
	@which open > /dev/null && open http://localhost:5050 || xdg-open http://localhost:5050 || echo "Please open http://localhost:5050 in your browser"

# Development commands (without Docker)
install:
	@echo "📦 Installing dependencies..."
	npm install

dev:
	@echo "🚀 Starting development server..."
	npm run dev

lint:
	@echo "🔍 Running linter..."
	npm run lint
