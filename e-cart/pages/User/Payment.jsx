import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, quantities, totalAmount, locationAddress, paymentMethod } = location.state;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [message, setMessage] = useState('');

  const handlePaymentConfirmation = () => {
    if ((paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (!cardNumber || !expiryDate || !cvv)) {
      setMessage('Please fill in all card details.');
      return;
    }

    setMessage('Payment successful! ');
    setTimeout(() => {
      navigate('/checkout', { state: { cartItems, quantities, totalAmount, locationAddress, paymentMethod, paymentCompleted: true } });
    }, 2000); 
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'cursive', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Payment Page</h2>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={item.id} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <p>{item.brand} - {item.name} x {quantities[index]}</p>
            <p>Total: Rs. {(quantities[index] * parseFloat(item.salePrice || item.price)).toFixed(2)}</p>
          </div>
        ))}
        <p><strong>Delivery Address:</strong> {locationAddress}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Total Amount to Pay:</strong> Rs. {totalAmount}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        {paymentMethod === 'gpay' && (
          <div style={{ textAlign: 'center' }}>
            <h3>Scan the QR code to pay via GPay</h3>
            <img 
              src="https://ik.imagekit.io/iayn5eqir/code.jfif?updatedAt=1730370099818"
              alt="GPay QR Code" 
              style={{ marginTop: '10px', width: '150px', height: '150px' }}
            />
            <p style={{ marginTop: '10px' }}>Or use UPI ID: ecart0205@rdbank</p>
          </div>
        )}
        
        {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>Enter your Card Details</h3>
            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                maxLength="5"
                style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength="3"
                style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
            </div>
          </div>
        )}
      </div>

      {message && <div style={{ color: 'green', marginTop: '20px', textAlign: 'center' }}>{message}</div>}

      <button onClick={handlePaymentConfirmation} style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}>
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
