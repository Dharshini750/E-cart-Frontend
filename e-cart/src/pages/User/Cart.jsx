import React, { useState } from 'react';

const Cart = ({ cartItems: initialCartItems }) => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [quantities, setQuantities] = useState(initialCartItems.map(() => 1)); 
  const [showBill, setShowBill] = useState(false); 

  
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item, index) => {
      const itemPrice = parseFloat(item.price.replace('$', '')); 
      return total + itemPrice * quantities[index];
    }, 0).toFixed(2);
  };
 
  const handlePurchase = () => {
    setShowBill(true); 
  };
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center primary fnt">
      <div style={{ padding: '40px',alignItems:"center" }}>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} style={{ marginBottom: '20px', border: '2px solid #ddd', padding: '20px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100px', height: '100px', objectFit:'contain' }}
                />
                <h2>{item.name}</h2>
                <p>{item.price}</p>
                <p>Size: {item.size}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p>Quantity:</p>
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    style={{ marginLeft: '20px', padding: '5px', cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <p style={{ margin: '0 10px' }}>{quantities[index]}</p>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    style={{ padding: '5px', cursor: 'pointer' }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    marginTop: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#ff4d4d',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button className='flex justify-center items-center'
              onClick={handlePurchase}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#38B2AC',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
            >
              Purchase
            </button>

            {showBill && (
              <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
                <h3>Bill Summary:</h3>
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - {quantities[index]} x {item.price}
                    </li>
                  ))}
                </ul>
                <h4>Total: ${calculateTotal()}</h4>
              </div>
            )}
          </div>
        ) : (
          <p className='flex justify-center items-center'>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
