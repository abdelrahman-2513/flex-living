import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard';
import { PublicReviews } from './pages/PublicReviews';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Unauthorized } from './pages/Unauthorized';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './stores/authStore';
import './App.css';

function Navigation() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();
  
  const isActive = (path: string) => location.pathname === path;
  
  if (!isAuthenticated) {
    return null; // Don't show navigation on auth pages
  }
  
  return (
    <nav className="bg-[#F8F8F8] border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
                <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#4A7C70] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h1 className="text-lg sm:text-xl font-medium text-[#333333]">
                  the flex.
                </h1>
              </div>
            </div>
            <div className="hidden sm:flex sm:space-x-6">
              <Link
                to="/"
                className={`px-2 py-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  isActive('/')
                    ? 'text-[#2F5C54] border-b-2 border-[#2F5C54]'
                    : 'text-[#333333] hover:text-[#2F5C54]'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/reviews"
                className={`px-2 py-2 sm:px-3 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  isActive('/reviews')
                    ? 'text-[#2F5C54] border-b-2 border-[#2F5C54]'
                    : 'text-[#333333] hover:text-[#2F5C54]'
                }`}
              >
                Reviews
              </Link>
                </div>
              </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#2F5C54] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs sm:text-sm font-medium text-[#333333]">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-3 py-2 text-sm font-medium text-[#333333] hover:text-[#2F5C54] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
            </div>
          </div>
        </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F8F8]">
        <Navigation />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reviews" 
            element={<PublicReviews />}
          />
        </Routes>
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FDFBF5',
              color: '#333333',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#2F5C54',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#DC2626',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
