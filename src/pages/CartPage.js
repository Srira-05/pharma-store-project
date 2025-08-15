import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems } = useCart();

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <Link to="/dashboard" className="cart-header-logo">PharmaCare</Link>
        <Link to="/dashboard" className="continue-shopping-link">&larr; Continue Shopping</Link>
      </header>
      <main className="cart-main">
        <h1 className="cart-title">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <p className="cart-item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
