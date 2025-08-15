import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* The login page is public */}
          <Route path="/" element={<LoginPage />} />

          {/* These routes are now protected */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
          />
          <Route 
            path="/product/:id" 
            element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} 
          />
          <Route 
            path="/cart" 
            element={<ProtectedRoute><CartPage /></ProtectedRoute>} 
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;