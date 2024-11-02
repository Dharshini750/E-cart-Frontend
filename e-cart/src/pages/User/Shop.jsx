import React, { useEffect, useState } from 'react';
import Cart from './Cart'; 
import Checkout from './Checkout'; 
import { getproducts } from '../../services/api';

const initialProduct = [
  { id: 1, brand: "Clara's", name: 'Women Top', price: '750', salePrice: '650', image: 'https://ik.imagekit.io/iayn5eqir/p1.webp?updatedAt=1728494405503', size: 's', gender: 'female', stock: '10' },
  { id: 2, brand: 'Zudio', name: 'Winter Jacket', price: '1299', salePrice: '899', image: 'https://ik.imagekit.io/iayn5eqir/img/p2.jfif?updatedAt=1728550098652', size: 'xl', gender: 'unisex', stock: '20' },
  { id: 3, brand: 'Zudio', name: 'Crop Top', price: '499', salePrice: '199', image: 'https://ik.imagekit.io/iayn5eqir/img/p3.jfif?updatedAt=1728550098470', size: 'm', gender: 'female', stock: '13' },
  { id: 4, brand: 'Biba', name: 'Lehanga', price: '1599', salePrice: '1399', image: 'https://ik.imagekit.io/iayn5eqir/img/p4.jfif?updatedAt=1728550099107', size: 'xl', gender: 'female', stock: '15' },
  { id: 5, brand: 'Peter England', name: 'Casual Shirt', price: '599', salePrice: '399', image: 'https://ik.imagekit.io/iayn5eqir/img/p5.jfif?updatedAt=1728550099074', size: 'l', gender: 'male', stock: '100' },
  { id: 6, brand: 'Louis Philippe', name: 'Formal Pant for Men', price: '899', salePrice: '699', image: 'https://ik.imagekit.io/iayn5eqir/img/p6.jfif?updatedAt=1728550098694', size: 'm', gender: 'male', stock: '5' },
  { id: 7, brand: "Clara's", name: 'Ethnic Wear', price: '999', salePrice: '799', image: 'https://ik.imagekit.io/iayn5eqir/img/p7.jfif?updatedAt=1728550100640', size: 's', gender: 'female', stock: '10' },
  { id: 8, brand: 'Zudio', name: 'Jacket', price: '2999', salePrice: '1999', image: 'https://ik.imagekit.io/iayn5eqir/img/p8.jfif?updatedAt=1728550100896', size: 'l', gender: 'unisex', stock: '3' },
  { id: 9, brand: 'Peter England', name: 'Formal Shirt', price: '359', salePrice: '159', image: 'https://ik.imagekit.io/iayn5eqir/img/p9.jfif?updatedAt=1728550100930', size: 'xl', gender: 'male', stock: '25' },
  { id: 10, brand: 'H&M', name: 'Combo Tops', price: '999', salePrice: '599', image: 'https://ik.imagekit.io/iayn5eqir/img/p10.jfif?updatedAt=1728550095450', size: 'xl', gender: 'female', stock: '6' },
  { id: 11, brand: "Clara's", name: 'Casual Shirt', price: '499', salePrice: '299', image: 'https://ik.imagekit.io/iayn5eqir/img/p11.jfif?updatedAt=1728550095450', size: 'm', gender: 'unisex', stock: '10' },
  { id: 12, brand: 'Zudio', name: 'Tops', price: '299', salePrice: '199', image: 'https://ik.imagekit.io/iayn5eqir/img/p12.jfif?updatedAt=1728550095734', size: 's', gender: 'female', stock: '0' },
  { id: 13, brand: "Clara's", name: 'Western Top', price: '499', salePrice: '199', image: 'https://ik.imagekit.io/iayn5eqir/img/p13.jfif?updatedAt=1728550095618', size: 'xl', gender: 'female', stock: '35' },
  { id: 14, brand: 'Uniqlo', name: 'Sweater', price: '1099', salePrice: '599', image: 'https://ik.imagekit.io/iayn5eqir/img/p14.jfif?updatedAt=1728550095543', size: 'l', gender: 'unisex', stock: '22' },
  { id: 15, brand: "Clara's", name: 'Black Top', price: '899', salePrice: '659', image: 'https://ik.imagekit.io/iayn5eqir/img/p15.jfif?updatedAt=1728550095372', size: 'xxl', gender: 'female', stock: '20' },
  { id: 16, brand: 'Raymond', name: 'Suit', price: '3599', salePrice: '2599', image: 'https://ik.imagekit.io/iayn5eqir/img/p16.jfif?updatedAt=1728550095849', size: 'xl', gender: 'male', stock: '15' },
  { id: 17, brand: 'Biba', name: 'Ethnic Set', price: '1599', salePrice: '999', image: 'https://ik.imagekit.io/iayn5eqir/img/p17.jfif?updatedAt=1728550098040', size: 'xl', gender: 'female', stock: '3' },
  { id: 18, brand: 'Louis Philippe', name: 'Tees', price: '259', salePrice: '1599', image: 'https://ik.imagekit.io/iayn5eqir/img/p18.jfif?updatedAt=1728550098124', size: 'l', gender: 'male', stock: '12' },
  { id: 19, brand: 'Biba', name: 'Formal Suit', price: '1599', salePrice: '1099', image: 'https://ik.imagekit.io/iayn5eqir/img/p19.jfif?updatedAt=1728550098151', size: 'xl', gender: 'female', stock: '10' },
  { id: 20, brand: 'Uniqlo', name: 'White Shirt', price: '799', salePrice: '499', image: 'https://ik.imagekit.io/iayn5eqir/img/p20.jfif?updatedAt=1728550098387', size: 'm', gender: 'unisex', stock: '50' },
];


const Shop = ({ addToCart }) => {
    const [products, setProducts] = useState(initialProduct);
    const [sexFilter, setSexFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [cartMessage, setCartMessage] = useState(null);
  
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getproducts();
        setProducts([...initialProduct, ...data]);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    if (loading) {
      return <p className='h-[93vh] w-screen flex justify-center items-center primary fnt'>Loading products...</p>;
    }
  
    if (!loading && products.length === 0) {
      return <p className='h-[93vh] w-screen flex justify-center items-center primary fnt'>No Products Available!</p>;
    }
  
    const filterByPrice = (product) => {
      if (priceFilter === '') return true;
      const priceValue = parseFloat(product.salePrice ? product.salePrice : product.price);
      if (priceFilter === 'low') return priceValue < 500;
      if (priceFilter === 'medium') return priceValue >= 500 && priceValue <= 1000;
      if (priceFilter === 'high') return priceValue > 1000;
    };
  
    const filteredProducts = products.filter(product => {
      const matchesSex = sexFilter === '' || product.gender === sexFilter;
      const matchesSize = sizeFilter === '' || product.size === sizeFilter;
      const matchesBrand = brandFilter === '' || product.brand === brandFilter;
      const matchesPrice = filterByPrice(product);
      return matchesSex && matchesSize && matchesBrand && matchesPrice;
    });
  
    const handleAddToCart = (product) => {
      if (product.stock > 0) {
        addToCart(product);
        setProducts((prevProducts) =>
          prevProducts.map((p) => p.id === product.id ? { ...p, stock: p.stock - 1 } : p)
        );
        setCartMessage(`${product.name} added to cart!`);
        setTimeout(() => setCartMessage(null), 500); 
      } else {
        alert('Out of stock!');
      }
    };
  
    return (
      <div style={{ padding: '20px', background: 'primary', fontFamily: "cursive" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <select value={sexFilter} onChange={(e) => setSexFilter(e.target.value)} style={{ marginRight: '10px' }}>
            <option value="">Category</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="unisex">Unisex</option>
          </select>
  
          <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
            <option value="">All Sizes</option>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
            <option value="xl">X-Large</option>
            <option value="xxl">XX-Large</option>
          </select>
  
          <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} style={{ marginLeft: '10px' }}>
          <option value="">All Brands</option>
          <option value="Clara's">Clara's</option>
          <option value="Zudio">Zudio</option>
          <option value="Biba">Biba</option>
          <option value="Peter England">Peter England</option>
          <option value="Louis Philippe">Louis Philippe</option>
          <option value="H&M">H&M</option>
          <option value="Uniqlo">Uniqlo</option>
          <option value="Raymond">Raymond</option>
        </select>

  
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="">All Prices</option>
            <option value="low">Below Rs. 500</option>
            <option value="medium">Rs. 500 - Rs. 1000</option>
            <option value="high">Above Rs. 1000</option>
          </select>
        </div>
  
        {cartMessage && (
          <div style={{
            background: 'rgb(3, 77, 3)',
            color: 'white',
            padding: '10px',
            marginBottom: '10px',
            textAlign: 'center',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '80%',
            width: '150px',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            zIndex: 1000,
          }}>
            {cartMessage}
          </div>
        )}
  
        <div className="product-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', fontFamily: "cursive" }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className="product-item"
                style={{
                  padding: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                  position: 'relative',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'contain',
                  }}
                />
                <h2>{product.brand} - {product.name}</h2>
                <p style={{ textDecoration: product.salePrice ? 'line-through' : 'none' }}>Rs. {product.price}</p>
                {product.salePrice && <p style={{ color: 'red' }}>Sale Price: Rs.{product.salePrice}</p>}
                <p style={{ color: 'black' }}>Size: {product.size}</p>
                <p style={{ color: 'blue' }}>Stock available: {product.stock}</p>
  
                <div className="ratings">
                  {'★'.repeat(4)}{'☆'.repeat(1)} 
                </div>
  
                <button className="submit" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found for the selected filters.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Shop;