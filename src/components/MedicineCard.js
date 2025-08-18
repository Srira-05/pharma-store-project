import React from 'react';
import { Link } from 'react-router-dom';

const MedicineCard = ({ medicine }) => (
  <Link to={`/product/${medicine.id}`} className="medicine-card-link">
    <div className="medicine-card">
      <img 
        src={medicine.imageUrl} 
        alt={medicine.name} 
        className="card-image"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x300/ef4444/ffffff?text=Image+Error'; }}
      />
      <div className="card-body">
        <h3 className="card-title">{medicine.name}</h3>
        <p className="card-price">₹{medicine.price.toFixed(2)}</p>
      </div>
    </div>
  </Link>
);
export default MedicineCard;
