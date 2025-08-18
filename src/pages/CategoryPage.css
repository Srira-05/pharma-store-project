import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import MedicineCard from '../components/MedicineCard';
import Footer from '../components/Footer';
import './CategoryPage.css';
import { medicineData as localMedicineData } from '../data/medicineData';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get category name from URL (e.g., 'medicines')
  const [allMedicines, setAllMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('https://pharma-store-project.onrender.com/api/medicines');
        const combinedData = response.data.map(serverMed => {
          const localMed = localMedicineData.find(m => m.id === serverMed.id);
          return {
            ...serverMed,
            category: localMed ? localMed.category : 'General', // Get category from local data
            imageUrl: localMed ? localMed.imageUrl : '',
          };
        });
        setAllMedicines(combinedData);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);

  // Filter medicines based on the category name from the URL
  const filteredMedicines = useMemo(() => {
    return allMedicines.filter(
      med => med.category.toLowerCase().replace(' ', '-') === categoryName
    );
  }, [allMedicines, categoryName]);

  // Capitalize the first letter for the title
  const pageTitle = categoryName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="category-page">
      <header className="category-header">
        <Link to="/dashboard" className="header-logo">PharmaCare</Link>
        <Link to="/dashboard" className="back-to-home-link">&larr; Back to Home</Link>
      </header>
      <main className="category-main-content">
        <h1 className="category-page-title">{pageTitle}</h1>
        {filteredMedicines.length > 0 ? (
          <div className="medicine-grid">
            {filteredMedicines.map(med => (
              <MedicineCard key={med._id || med.id} medicine={med} />
            ))}
          </div>
        ) : (
          <p className="no-products-message">No products found in this category.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;