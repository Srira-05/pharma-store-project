import React from 'react';
import { Link } from 'react-router-dom'; // This import is essential here

const MedicineCard = ({ medicine }) => (
  // The entire card is wrapped in a Link to make it clickable
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
        {/* We can remove the description from the card to make it cleaner if we want */}
        {/* <p className="card-description">{medicine.description}</p> */}
        <p className="card-price">₹{medicine.price.toFixed(2)}</p>
      </div>
    </div>
  </Link>
);

export default MedicineCard;