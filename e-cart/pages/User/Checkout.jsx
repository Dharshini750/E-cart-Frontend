import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, quantities, paymentCompleted = false } = location.state || {};

  const [locationAddress, setLocationAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(paymentCompleted);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (paymentCompleted) {
      displayConfirmationMessage('Order confirmed!');
    }
  }, [paymentCompleted]);

  const displayConfirmationMessage = (msg) => {
    setMessage(msg);
    setShowConfetti(true);
    setTimeout(() => {
      setMessage('');
      setShowConfetti(false);
    }, 3000);
  };

  const calculateGST = (price) => {
    if (price < 500) return price * 0.05;
    else if (price >= 500 && price <= 1000) return price * 0.12;
    else return price * 0.18;
  };

  const calculateItemTotal = (item, quantity) => {
    const itemPrice = parseFloat(item.salePrice || item.price);
    const gst = calculateGST(itemPrice);
    const deliveryCharges = 50;
    const codCharge = paymentMethod === 'cod' ? 10 : 0;
    return (itemPrice * quantity + gst + deliveryCharges + codCharge).toFixed(2);
  };

  const calculateTotal = () => {
    const baseTotal = cartItems.reduce((total, item, index) => {
      const itemPrice = parseFloat(item.salePrice || item.price);
      const gst = calculateGST(itemPrice);
      return total + itemPrice * quantities[index] + gst + 50;
    }, 0);
    const codCharge = paymentMethod === 'cod' ? 10 : 0;
    return (baseTotal + codCharge).toFixed(2);
  };

  const handleToPay = () => {
    if (!locationAddress || !paymentMethod) {
      setMessage('Please select a delivery location and payment method.');
      return;
    }

    if (paymentMethod === 'cod') {
      setIsOrderConfirmed(true);
      displayConfirmationMessage('Order confirmed for Cash on Delivery!');
    } else {
      const totalAmount = calculateTotal();
      navigate('/payment', { state: { cartItems, quantities, totalAmount, locationAddress, paymentMethod } });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'cursive', maxWidth: '100%', margin: '0 auto' }}>
      {showConfetti && <Confetti />}
      <h2 style={{ textAlign: 'center' }}>Checkout</h2>

      <div style={{ marginTop: '20px' }}>
        <h3>Selected Items:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartItems.map((item, index) => {
            const itemPrice = parseFloat(item.salePrice || item.price);
            const gst = calculateGST(itemPrice);
            return (
              <div key={item.id} style={{
                  display: 'flex',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  alignItems: 'center'
                }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    marginRight: '20px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4>{item.brand} - {item.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {quantities[index]}</p>
                  <p>Price: Rs. {itemPrice.toFixed(2)}</p>
                  <p>GST: Rs. {gst.toFixed(2)}</p>
                  <p>Delivery Charges: Rs. 50</p>
                  {paymentMethod === 'cod' && <p>COD Charge: Rs. 10</p>}
                  <p>Total: Rs. {calculateItemTotal(item, quantities[index])}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        <h3>Total Price: Rs. {calculateTotal()}</h3>
      </div>

      {message && (
        <div style={{
          color: 'green',
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '1.2em',
          backgroundColor: '#e0f8e0',
          padding: '10px',
          borderRadius: '5px'
        }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Select Delivery Location</h3>
        <select value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
          <option value="">Choose Location</option>
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Select Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
          <option value="">Choose Payment Method</option>
          <option value="cod">Cash on Delivery</option>
          <option value="gpay">GPay</option>
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
        </select>
      </div>

      <button onClick={handleToPay} disabled={isOrderConfirmed} style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: isOrderConfirmed ? 'gray' : '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isOrderConfirmed ? 'not-allowed' : 'pointer',
          width: '100%'
        }}>
        {isOrderConfirmed ? 'Payment Already Completed' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default Checkout;
