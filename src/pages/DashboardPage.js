import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import MedicineCard from '../components/MedicineCard';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer'; // <-- IMPORT THE NEW FOOTER
import './DashboardPage.css';
import bannerImage from '../pictures/medicine-banner.png';
import { medicineData as localMedicineData } from '../data/medicineData';

const DashboardPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://pharma-store-project.onrender.com/api/medicines');
        const combinedData = response.data.map(serverMed => {
          const localMed = localMedicineData.find(m => m.id === serverMed.id);
          return {
            ...serverMed,
            imageUrl: localMed ? localMed.imageUrl : 'https://placehold.co/300x300/ef4444/ffffff?text=No+Image',
            thumbnails: localMed ? localMed.thumbnails : [],
          };
        });
        setMedicines(combinedData);
      } catch (error) {
        console.error("Error fetching medicines from server:", error);
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = useMemo(() => {
    if (!searchQuery) return medicines;
    return medicines.filter(med => med.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, medicines]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
          <h1 className="header-title">PharmaCare</h1>
          <div className="header-actions">
            <Link to="/cart" className="cart-icon-link">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItems.length}</span>
            </Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
      </header>
      
      <div className="search-banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="search-banner-overlay">
          <h2 className="banner-title">Find Your Medicine</h2>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      <main className="main-content">
        {/* --- NEW CATEGORY SECTION --- */}
        <section className="category-section">
            <h2 className="section-title">Shop by Category</h2>
            <div className="category-grid">
                <div className="category-card"><span>💊</span><p>Medicines</p></div>
                <div className="category-card"><span>👶</span><p>Baby Care</p></div>
                <div className="category-card"><span>👩‍⚕️</span><p>Personal Care</p></div>
                <div className="category-card"><span>💪</span><p>Health & Fitness</p></div>
                <div className="category-card"><span>🏠</span><p>Home Care</p></div>
            </div>
        </section>

        {/* --- UPDATED PRODUCTS SECTION --- */}
        <section className="products-section">
            <h2 className="section-title">Featured Products</h2>
            <div className="medicine-grid">
              {filteredMedicines.map(med => (
                <MedicineCard key={med._id || med.id} medicine={med} />
              ))}
            </div>
        </section>
      </main>

      {/* --- NEW FOOTER --- */}
      <Footer />
    </div>
  );
};

export default DashboardPage;