# AIops Setup Guide

## Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Docker**: 20.10+ (for containerized development)
- **Docker Compose**: 1.29+ (for local environment)
- **PostgreSQL**: 13+ (if running without Docker)
- **Redis**: 6.0+ (if running without Docker)

## Quick Start with Docker Compose

### 1. Clone the Repository

```bash
git clone https://github.com/BabaFakruddin40/AIops.git
cd AIops
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your configuration (optional for local development):

```bash
# Database
DB_USER=aiops
DB_PASSWORD=aiops_password
DB_NAME=aiops

# Backend
BACKEND_PORT=5000

# Frontend
FRONTEND_PORT=3000

# JWT
JWT_SECRET=your_secret_key_here
```

### 3. Start Services

```bash
docker-compose up -d
```

This will start:
- PostgreSQL (port 5432)
- Redis (port 6379)
- Prometheus (port 9090)
- Backend API (port 5000)
- Frontend Dashboard (port 3000)
- Grafana (port 3001)

### 4. Verify Services

```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Access services
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)
```

### 5. Stop Services

```bash
docker-compose down

# Remove volumes (careful - deletes data)
docker-compose down -v
```

## Local Development Setup (Without Docker)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Setup Databases

#### PostgreSQL

```bash
# Create database
createdb aiops

# Create user
createuser aiops
psql -c "ALTER USER aiops WITH PASSWORD 'aiops_password';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE aiops TO aiops;"
```

#### Redis

```bash
# Start Redis (on macOS with Homebrew)
brew services start redis

# Or on Linux
sudo systemctl start redis-server

# Verify Redis is running
redis-cli ping  # Should return PONG
```

### 3. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start backend
npm run dev
```

Backend will start on http://localhost:5000

### 4. Setup Frontend

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend will start on http://localhost:3000

### 5. Start Monitoring (Optional)

```bash
# Start Prometheus
docker run -d \
  -p 9090:9090 \
  -v $(pwd)/config/prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus

# Start Grafana
docker run -d \
  -p 3001:3000 \
  -e GF_SECURITY_ADMIN_PASSWORD=admin \
  grafana/grafana
```

## Database Setup

### PostgreSQL Migrations

```bash
# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback

# Create new migration
npm run db:create-migration <name>
```

### TimescaleDB (Time-Series)

If using TimescaleDB for metrics storage:

```bash
# Create TimescaleDB extension
psql -d aiops -c "CREATE EXTENSION IF NOT EXISTS timescaledb;"

# Create hypertable for metrics
psql -d aiops -c "CREATE TABLE IF NOT EXISTS metrics (
  time TIMESTAMPTZ NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value FLOAT8,
  tags JSONB,
  PRIMARY KEY (time, metric_name)
);"

psql -d aiops -c "SELECT create_hypertable('metrics', 'time', if_not_exists => TRUE);"
```

## Configuration

### Backend Configuration (.env)

```env
# Server
NODE_ENV=development
BACKEND_PORT=5000
BACKEND_HOST=0.0.0.0

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aiops
DB_USER=aiops
DB_PASSWORD=aiops_password
DB_SSL=false

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d

# Logging
LOG_LEVEL=debug

# Prometheus
PROMETHEUS_URL=http://localhost:9090
```

### Frontend Configuration (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_WS_URL=ws://localhost:5000
REACT_APP_ENV=development
```

## Development Workflow

### Available Commands

```bash
# Development
npm run dev              # Start both backend and frontend
npm run dev:api        # Start backend only
npm run dev:web        # Start frontend only

# Testing
npm run test           # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint          # Run linter
npm run format        # Format code with Prettier

# Building
npm run build         # Build for production
npm run build:api     # Build backend
npm run build:web     # Build frontend

# Database
npm run db:migrate    # Run migrations
npm run db:seed       # Seed database
npm run db:reset      # Reset database (dev only)
```

### IDE Setup

#### VS Code

Install recommended extensions:
- ESLint
- Prettier
- REST Client
- Thunder Client (for API testing)

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact"],
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### WebStorm/IntelliJ

- Built-in support for Node.js
- Configure run configurations for backend and frontend
- Enable ESLint integration

### Testing

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- backend/tests/incidents.test.js

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Debugging

#### Backend Debugging

```bash
# Using Node debugger
node --inspect-brk backend/src/index.js

# Then open chrome://inspect in Chrome
```

#### Frontend Debugging

- Open DevTools in browser (F12)
- Use React DevTools extension
- Use Redux DevTools extension (if using Redux)

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend

# Kill process
kill -9 <PID>

# Or use different ports
BACKEND_PORT=5001 npm run dev:api
FRONTEND_PORT=3001 npm run dev:web
```

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql -h localhost -U aiops -d aiops

# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# View PostgreSQL logs
tail -f /usr/local/var/log/postgres.log  # macOS
# or
sudo journalctl -u postgresql  # Linux
```

### Redis Connection Issues

```bash
# Test Redis connection
redis-cli ping

# Check Redis is running
ps aux | grep redis

# View Redis logs
redis-cli info
```

### Docker Issues

```bash
# Rebuild images
docker-compose build --no-cache

# Clean everything
docker-compose down -v
docker system prune -a

# Check logs
docker-compose logs <service-name>
```

## Production Deployment

See [Deployment Guide](./deployment.md) for production setup instructions.

## Next Steps

1. Read the [API Documentation](./api.md)
2. Explore [Architecture](./architecture.md)
3. Check the [Roadmap](./ROADMAP.md)
4. Review [Contributing Guidelines](../CONTRIBUTING.md)

## Support

For issues and questions:
- 📖 Check [Documentation](./README.md)
- 🐛 Open an [Issue](https://github.com/BabaFakruddin40/AIops/issues)
- 💬 Start a [Discussion](https://github.com/BabaFakruddin40/AIops/discussions)
