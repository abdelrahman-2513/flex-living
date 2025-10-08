# Vercel Deployment Guide

## Backend Deployment Issues Fixed

### 1. UUID ES Module Issue
- **Problem**: `uuid` v13+ is an ES Module, but NestJS compiles to CommonJS
- **Solution**: Updated to `uuid` v11.1.0 which supports CommonJS imports
- **Files changed**: `backend/package.json`

### 2. Vercel Serverless Function Issue
- **Problem**: Vercel expects a serverless function export, not a traditional server
- **Solution**: Modified `main.ts` to support both serverless (Vercel) and traditional server (local dev)
- **Files changed**: `backend/src/main.ts`, `backend/vercel.json`

## Deployment Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Make sure your Vercel project has these environment variables set:
- `PORT` (optional, defaults to 6002)
- `HOSTAWAY_API_URL`
- `HOSTAWAY_ACCOUNT_ID`
- `HOSTAWAY_API_KEY`
- `CORS_ORIGINS` (comma-separated list of allowed origins)
- `JWT_SECRET` (for authentication)
- `MONGODB_URI` (if using MongoDB)

### 3. Deploy to Vercel
```bash
# If using Vercel CLI
vercel --prod

# Or push to your connected Git repository
git add .
git commit -m "Fix Vercel deployment issues"
git push
```

## Key Changes Made

### main.ts
- Added serverless function export for Vercel
- Added caching for better performance
- Maintained local development server functionality
- Uses Express adapter for serverless compatibility

### vercel.json
- Simplified routing configuration
- Added NODE_ENV environment variable
- Removed unnecessary method specifications

### package.json
- Updated uuid to v11.1.0 (CommonJS compatible)
- Added express dependency
- Updated @types/express to v4.17.21

## Testing Locally

The application will work in both modes:
- **Local development**: Runs as a traditional server on the configured port
- **Production (Vercel)**: Runs as a serverless function

## Troubleshooting

If you still encounter issues:

1. **Check Vercel logs** for specific error messages
2. **Verify environment variables** are set correctly in Vercel dashboard
3. **Ensure all dependencies** are properly installed
4. **Check CORS origins** match your frontend domain

## Frontend Configuration

Update your frontend's API base URL to point to your Vercel deployment:
```typescript
// In frontend/src/config/env.ts
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://your-vercel-app.vercel.app',
  // ... other config
}
```
