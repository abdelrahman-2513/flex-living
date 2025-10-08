# 🚀 Vercel Deployment Guide - NestJS Backend

## ✅ **Issues Fixed**

### 1. **Serverless Function Export**
- ✅ Updated `main.ts` with proper Vercel serverless function export
- ✅ Added Express adapter for serverless compatibility
- ✅ Implemented app caching for better performance

### 2. **MongoDB Connection**
- ✅ Fixed configuration to use `MONGODB_URI` environment variable
- ✅ Added retry logic for database connections
- ✅ Updated app.module.ts to use correct config path

### 3. **Vercel Configuration**
- ✅ Updated `vercel.json` with proper routing
- ✅ Added `.vercelignore` file
- ✅ Fixed build script in `package.json`

## 🔧 **Required Environment Variables in Vercel**

Set these in your Vercel project dashboard:

### **Required Variables:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
```

### **Optional Variables:**
```bash
PORT=3001
HOSTAWAY_API_URL=https://api.hostaway.com/v1
HOSTAWAY_ACCOUNT_ID=your-account-id
HOSTAWAY_API_KEY=your-api-key
CORS_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:5173
JWT_EXPIRES_IN=24h
```

## 🗄️ **MongoDB Atlas Setup**

### **Step 1: Update IP Whitelist**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Navigate to your project → **Network Access**
3. Click **"Add IP Address"**
4. **Add `0.0.0.0/0`** (allows all IPs - for Vercel)
5. Click **"Confirm"**

### **Step 2: Get Connection String**
1. Go to **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<dbname>` with your database name

**Example:**
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/flex-living?retryWrites=true&w=majority
```

## 🚀 **Deployment Steps**

### **Method 1: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from backend directory
cd backend
vercel --prod
```

### **Method 2: Git Integration**
1. Push your code to GitHub/GitLab
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

## 🔍 **Troubleshooting**

### **Common Issues:**

#### **1. "No exports found in module"**
- ✅ **Fixed**: Added proper serverless function export in `main.ts`

#### **2. "MongoDB connection failed"**
- ✅ **Fixed**: Updated configuration and IP whitelist
- **Check**: Environment variables are set correctly
- **Check**: MongoDB Atlas IP whitelist includes `0.0.0.0/0`

#### **3. "CORS errors"**
- ✅ **Fixed**: Updated CORS configuration
- **Check**: `CORS_ORIGINS` environment variable includes your frontend domain

#### **4. "Build failed"**
- ✅ **Fixed**: Updated build script and dependencies
- **Check**: All dependencies are in `package.json`

### **Debug Steps:**
1. **Check Vercel logs** in the dashboard
2. **Verify environment variables** are set
3. **Test MongoDB connection** locally first
4. **Check CORS origins** match your frontend domain

## 📝 **File Changes Made**

### **backend/src/main.ts**
- Added serverless function export
- Added Express adapter
- Added app caching
- Conditional local/production bootstrap

### **backend/src/config/configuration.ts**
- Added database configuration
- Added JWT configuration
- Support for multiple environment variable names

### **backend/src/app.module.ts**
- Updated MongoDB connection configuration
- Added retry logic
- Fixed config path reference

### **backend/vercel.json**
- Simplified routing configuration
- Added NODE_ENV environment variable

### **backend/package.json**
- Fixed vercel-build script
- Added express dependency

### **backend/.vercelignore**
- Added to exclude unnecessary files from deployment

## 🎯 **Next Steps**

1. **Set environment variables** in Vercel dashboard
2. **Update MongoDB Atlas IP whitelist** to `0.0.0.0/0`
3. **Deploy to Vercel** using CLI or Git integration
4. **Test your API endpoints** to ensure they work
5. **Update frontend** to use the new Vercel backend URL

## 🔗 **Testing Your Deployment**

Once deployed, test these endpoints:
- `GET https://your-app.vercel.app/` - Health check
- `POST https://your-app.vercel.app/auth/register` - User registration
- `POST https://your-app.vercel.app/auth/login` - User login
- `GET https://your-app.vercel.app/reviews` - Get reviews

## 📞 **Need Help?**

If you still encounter issues:
1. Check Vercel function logs
2. Verify all environment variables
3. Test MongoDB connection string locally
4. Ensure CORS origins are correct
