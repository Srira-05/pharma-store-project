import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import MedicineCard from '../components/MedicineCard';
import SearchBar from '../components/SearchBar';
import './DashboardPage.css';
import bannerImage from '../pictures/medicine-banner.png';
import { medicineData as localMedicineData } from '../data/medicineData';

const DashboardPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartItems } = useCart(); // This line is now correct

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://192.168.1.4/api/medicines');
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
          <h1 className="header-title">PharmaCare Dashboard</h1>
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
        <div className="medicine-grid">
          {filteredMedicines.map(med => (
            <MedicineCard key={med._id || med.id} medicine={med} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
