import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems: initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [quantities, setQuantities] = useState(initialCartItems.map(() => 1));
  const navigate = useNavigate();

  const updateQuantity = (index, amount) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((quantity, i) =>
        i === index ? Math.max(1, quantity + amount) : quantity
      )
    );
  };

  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    setQuantities(prevQuantities => prevQuantities.filter((_, i) => i !== index));
  };
  const handleCheckout = (item, quantity) => {
    navigate('/checkout', { state: { cartItems: [item], quantities: [quantity] } });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'cursive' }}>
      {cartItems.length > 0 ? (
        <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="product-item"
              style={{
                flex: '1 1 calc(25% - 20px)',
                boxSizing: 'border-box',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'contain',
                }}
              />
              <h2>{item.brand} - {item.name}</h2>
              <p style={{ textDecoration: item.salePrice ? 'line-through' : 'none' }}>
                Rs. {item.price}
              </p>
              {item.salePrice && <p style={{ color: 'red' }}>Sale Price: Rs. {item.salePrice}</p>}
              <p>Size: {item.size}</p>
              <p>Quantity Selected: {quantities[index]}</p>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <button
                  onClick={() => updateQuantity(index, -1)}
                  style={{
                    padding: '5px 10px',
                    color: 'black',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginRight: '5px',
                  }}
                >
                  -
                </button>
                <span style={{ padding: '0 10px', lineHeight: '32px' }}>{quantities[index]}</span>
                <button
                  onClick={() => updateQuantity(index, 1)}
                  style={{
                    padding: '5px 10px',
                    color: 'black',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    marginLeft: '5px',
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: 'black',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                Remove
              </button>
              <button
                onClick={() => handleCheckout(item, quantities[index])}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: 'green',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
