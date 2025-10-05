# Quick Start Guide - Local Testing

Before deploying to Render, test your application locally using Docker.

## 🐳 Local Docker Setup

### Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose installed (included with Docker Desktop)

### Step 1: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your local settings:
   ```env
   DB_HOST="localhost"
   DB_PORT="5432"
   DB_NAME="evershop"
   DB_USER="postgres"
   DB_PASSWORD="admin"
   DB_SSLMODE="disable"
   
   NODE_ENV="development"
   APP_BASE_URL="http://localhost:3000"
   
   JWT_SECRET="local_jwt_secret_for_testing"
   SESSION_SECRET="local_session_secret"
   
   RAZORPAY_KEY_ID="your_test_key_id"
   RAZORPAY_KEY_SECRET="your_test_key_secret"
   ```

### Step 2: Start Services with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode (background)
docker-compose up -d
```

This will start:
- **PostgreSQL database** on port 5432
- **EverShop application** on port 3000

### Step 3: Initialize Database

First time setup only:

```bash
# Access the running container
docker-compose exec app sh

# Run setup command
npm run setup

# Exit container
exit
```

### Step 4: Access Your Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### Step 5: Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

## 🧪 Testing Without Docker

If you prefer to run without Docker:

### Step 1: Install PostgreSQL

Install PostgreSQL locally:
- **Windows**: [Download installer](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE evershop;

# Exit
\q
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment

Update `.env` with your local PostgreSQL credentials.

### Step 5: Run Application

```bash
# First time setup
npm run setup

# Build the application
npm run build

# Start the application
npm start
```

## 🔍 Verify Everything Works

### Check Database Connection

```bash
# Using Docker
docker-compose exec db psql -U postgres -d evershop -c "\dt"

# Without Docker
psql -U postgres -d evershop -c "\dt"
```

### Check Application Logs

```bash
# Using Docker
docker-compose logs -f app

# Without Docker - check terminal output
```

### Test Razorpay Integration

1. Go to checkout page
2. Select Razorpay payment method
3. Use test card details from [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)

## 🐛 Common Issues

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Find process using port 3000
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000

# Kill the process or change port in docker-compose.yml
```

### Database Connection Failed

**Error**: `Connection refused` or `ECONNREFUSED`

**Solution**:
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify `DB_HOST` is correct (`localhost` or `db` for Docker)

### Build Errors

**Error**: `npm install` fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

## 📝 Next Steps

Once everything works locally:

1. ✅ Commit your changes to Git
2. ✅ Push to your repository
3. ✅ Follow the [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)
4. ✅ Deploy to Render

## 🎉 Ready to Deploy!

Your local environment is set up and tested. Now you can confidently deploy to Render!
