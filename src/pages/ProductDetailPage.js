import React, { useState, useEffect } from 'react'; // Added useEffect
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios'; // Import axios to get the latest data
import './ProductDetailPage.css';
import { medicineData as localMedicineData } from '../data/medicineData'; // For local images

const ProductDetailPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the medicine data from our local file to get the images
    const localMed = localMedicineData.find(m => m.id == id);
    if (localMed) {
        setMedicine(localMed);
        setMainImage(localMed.imageUrl);
    }
  }, [id]);


  const handleAddToCart = () => {
    addToCart(medicine);
    alert(`${medicine.name} has been added to your cart!`);
  };

  // Show a loading message while we wait for the data
  if (!medicine) {
    return <div className="pdp-page"><p>Loading product...</p></div>;
  }

  return (
    <div className="pdp-page">
      <header className="pdp-header">
        <Link to="/dashboard" className="header-logo">PharmaCare</Link>
        <div className="header-nav">
          <Link to="/dashboard">Health Store</Link>
          <Link to="/dashboard">Pharmacy</Link>
          <Link to="/dashboard">Doctors</Link>
        </div>
      </header>
      <main className="pdp-main-content">
        <div className="pdp-left-column">
          <div className="pdp-image-gallery">
            <div className="pdp-thumbnails">
              {medicine.thumbnails.map((thumb, index) => (
                <div key={index} className={`pdp-thumbnail-item ${thumb === mainImage ? 'active' : ''}`} onMouseOver={() => setMainImage(thumb)}>
                  <img src={thumb} alt={`thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="pdp-main-image">
              <img src={mainImage} alt={medicine.name} />
            </div>
          </div>
        </div>
        <div className="pdp-right-column">
          <h1 className="pdp-title">{medicine.name}</h1>
          <div className="pdp-meta-info">
            <span>Country of Origin: {medicine.country}</span>
            <span>Seller: {medicine.seller}</span>
          </div>
          <div className="pdp-price-section">
            <span className="pdp-mrp">MRP ₹{medicine.mrp.toFixed(2)}</span>
            <span className="pdp-price">Member Price ₹{medicine.price.toFixed(2)}</span>
          </div>
          <button className="pdp-add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <p className="pdp-description">{medicine.description}</p>
        </div>
        <div className="pdp-offers-column">
            <div className="pdp-offers-box">
                <h3 className="pdp-offers-title">Applicable Offers</h3>
                <ul>
                    {medicine.offers.map((offer, index) => (
                        <li key={index}>{offer}</li>
                    ))}
                </ul>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
