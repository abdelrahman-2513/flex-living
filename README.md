# Flex Living Reviews Dashboard

A modern, full-stack reviews management system for Flex Living properties. This application allows property managers to monitor, filter, and manage guest reviews from multiple booking channels (Airbnb, Booking.com, Direct bookings) and display approved reviews on a public-facing website.

![Dashboard Preview](https://via.placeholder.com/800x400.png?text=Reviews+Dashboard)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd flex-living
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```
Backend will run on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### Access the Application

- **Manager Dashboard**: http://localhost:5173/
- **Public Reviews Page**: http://localhost:5173/reviews

---

## 📋 Features

### Manager Dashboard
- 📊 **Statistics** - View total reviews, public reviews, average ratings
- 🔍 **Advanced Filtering** - Filter by property, channel, rating, and date range
- ✅ **Review Management** - Toggle review visibility for public display
- 📈 **Performance Insights** - Identify trends and recurring issues

### Public Reviews Page
- ⭐ **Beautiful Display** - Showcase approved guest reviews
- 🏠 **Property Filtering** - Filter reviews by specific properties
- 📱 **Responsive Design** - Perfect viewing on any device
- 🎨 **Modern UI** - Clean, professional design matching Flex Living brand

---

## 🛠️ Tech Stack

**Backend:**
- NestJS (TypeScript)
- Axios for HTTP requests
- Class-validator for validation

**Frontend:**
- React 19 with TypeScript
- Vite for blazing-fast builds
- Zustand for state management
- React Router for navigation
- Tailwind CSS for styling

---

## 📡 API Integration

### Hostaway API
- **Account ID**: 61148
- **Endpoint**: https://api.hostaway.com/v1
- **Fallback**: Mock data automatically loads if API is unavailable

### API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/hostaway` | Fetch all reviews with filters |
| GET | `/api/reviews/listings` | Get unique property names |
| GET | `/api/reviews/channels` | Get unique booking channels |
| PATCH | `/api/reviews/:id/visibility` | Toggle review visibility |
| GET | `/api/reviews/public` | Get public-facing reviews |

---

## 📖 Documentation

### **Complete Technical Documentation**
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Comprehensive technical documentation
- **[GOOGLE_REVIEWS_INTEGRATION.md](./GOOGLE_REVIEWS_INTEGRATION.md)** - Google Reviews integration analysis

### **Documentation Includes:**
- ✅ Complete API reference and architecture decisions
- ✅ Google Reviews integration feasibility analysis
- ✅ Development guidelines and best practices
- ✅ Deployment and infrastructure setup
- ✅ Performance optimizations and security considerations
- ✅ Future enhancement roadmap

---

## 🎯 Key Features Implemented

✅ Hostaway API integration with mock data fallback  
✅ Review normalization and data processing  
✅ Multi-channel review aggregation  
✅ Advanced filtering system  
✅ Manager dashboard with statistics  
✅ Public review display page  
✅ Responsive, modern UI design  
✅ Review visibility management  
✅ Real-time statistics and insights  

---

## 🔮 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Google Reviews API integration
- [ ] Email notifications for low ratings
- [ ] Advanced analytics and reporting
- [ ] Review response management
- [ ] Multi-user authentication
- [ ] Export to CSV/PDF

---

## 🧪 Testing

### Backend
```bash
cd backend
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

### Frontend
```bash
cd frontend
npm run build       # Production build
npm run preview     # Preview build
```

---

## 📱 Screenshots

### Manager Dashboard
- Statistics overview with key metrics
- Filter bar with multiple options
- Review cards with category ratings
- Visibility toggle buttons

### Public Reviews Page
- Hero section with overall rating
- Property filter dropdown
- Approved reviews in card layout
- Responsive grid design

---

## 🤝 Contributing

This project was built as a technical assessment for Flex Living. 

---

## 📄 License

Private - Flex Living Technical Assessment

---

## 👨‍💻 Developer Notes

### Project Structure
```
flex-living/
├── backend/          # NestJS backend
│   └── src/
│       └── reviews/  # Reviews module
├── frontend/         # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── stores/
│       └── services/
└── DOCUMENTATION.md
```

### Environment Setup
The application works out of the box with sensible defaults. For custom configuration, create `.env` files in backend and frontend directories.

### Data Persistence
Currently using in-memory storage for review visibility settings. Data resets on server restart. See DOCUMENTATION.md for database integration guide.

---

**Built with ❤️ for Flex Living**

### Access the Application

- **Manager Dashboard**: https://flex-living-s2u1.vercel.app
- **Public Reviews Page**: https://flex-living-s2u1.vercel.app/reviews