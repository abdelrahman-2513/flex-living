# Docker Setup for Flex Living (Development)

This document provides instructions for running the Flex Living application using Docker in development mode.

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)
- Git (to clone the repository)

## 🚀 Quick Start

### Development Environment

```bash
# Start development containers with hot reload
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Commands

```bash
# Build and start containers
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up --build --force-recreate
```

## 📁 Project Structure

```
flex-living/
├── docker-compose.yml          # Development configuration
├── .dockerignore               # Root dockerignore
├── backend/
│   ├── Dockerfile              # Development backend image
│   └── .dockerignore           # Backend-specific ignores
└── frontend/
    ├── Dockerfile              # Development frontend image
    └── .dockerignore           # Frontend-specific ignores
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory to customize the configuration:

```env
# Backend Configuration
HOSTAWAY_API_URL=https://api.hostaway.com/v1
HOSTAWAY_ACCOUNT_ID=your_account_id
HOSTAWAY_API_KEY=your_api_key
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:3001
```

### Ports

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## 🏗️ Docker Images

### Backend Image

- **Base**: Node.js 18 Alpine
- **Development**: Includes all dependencies with hot reload
- **Command**: `npm run start:dev`

### Frontend Image

- **Base**: Node.js 18 Alpine
- **Development**: Vite dev server with hot reload
- **Command**: `npm run dev -- --host 0.0.0.0`

## 🔍 Development Features

Both services include development features:

- **Hot Reload**: Code changes reflect immediately
- **Volume Mounting**: Source code is mounted for live editing
- **Dev Dependencies**: All development tools included
- **Debugging**: Easy access to container logs

## 📊 Monitoring

### View Container Status

```bash
# Using docker-compose
docker-compose ps

# Using Docker directly
docker ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Resource Usage

```bash
# Real-time stats
docker stats
```

## 🧹 Cleanup

### Stop and Remove Containers

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Complete Cleanup

```bash
# Remove containers, images, volumes, and networks
docker-compose down --rmi all --volumes --remove-orphans

# Clean up unused Docker resources
docker system prune -a
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   lsof -i :3001
   lsof -i :5173
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Permission Issues (Linux/Mac)**
   ```bash
   # Make script executable
   chmod +x docker-scripts.sh
   
   # Fix Docker permissions
   sudo usermod -aG docker $USER
   ```

3. **Build Failures**
   ```bash
   # Clean build
   docker-compose build --no-cache
   
   # Or using script
   ./docker-scripts.sh cleanup
   ./docker-scripts.sh start-prod
   ```

4. **Container Won't Start**
   ```bash
   # Check logs
   docker-compose logs [service-name]
   
   # Check container status
   docker-compose ps
   
   # Restart specific service
   docker-compose restart [service-name]
   ```

### Debug Mode

```bash
# Run containers in foreground to see logs
docker-compose up

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 🔄 Development Workflow

### Hot Reload Development

1. Start development environment:
   ```bash
   docker-compose up --build -d
   ```

2. Make changes to your code
3. Changes are automatically reflected (hot reload)
4. View logs for any errors:
   ```bash
   docker-compose logs -f
   ```

### Development Testing

1. Access the application at http://localhost:5173
2. Backend API available at http://localhost:3001
3. Check logs for any issues:
   ```bash
   docker-compose logs -f
   ```

## 📝 Notes

- The development environment includes hot reload for both frontend and backend
- Source code is mounted as volumes for live editing
- All containers are configured with automatic restart policies
- Environment variables can be customized through `.env` files
- Both services run in development mode with full debugging capabilities

## 🆘 Support

If you encounter any issues:

1. Check the logs: `./docker-scripts.sh logs`
2. Verify Docker is running: `docker info`
3. Check container status: `./docker-scripts.sh status`
4. Try a clean rebuild: `./docker-scripts.sh cleanup && ./docker-scripts.sh start-prod`
