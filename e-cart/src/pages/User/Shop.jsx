import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { getproducts } from '../../services/api';

const initialproduct = [
      { id: 1, brand: "Clara's", name: 'Women Top', price: '$35.99', salePrice: '$29.99', image: 'https://ik.imagekit.io/iayn5eqir/p1.webp?updatedAt=1728494405503', size: 's', gender: 'female', type: 'dress' },
      { id: 2, brand: 'Zudio', name: 'Winter Jacket', price: '$55.99', salePrice: '$45.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p2.jfif?updatedAt=1728550098652', size: 'xl', gender: 'unisex', type: 'dress' },
      { id: 3, brand: 'Zudio', name: 'Crop Top', price: '$15.99', salePrice: '$12.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p3.jfif?updatedAt=1728550098470', size: 'm', gender: 'female', type: 'dress' },
      { id: 4, brand: 'Biba', name: 'Lehanga', price: '$89.99', salePrice: '$79.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p4.jfif?updatedAt=1728550099107', size: 'xl', gender: 'female', type: 'dress' },
      { id: 5, brand: 'Peter England', name: 'Casual Shirt', price: '$25.99', salePrice: '$19.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p5.jfif?updatedAt=1728550099074', size: 'l', gender: 'male', type: 'dress' },
      { id: 6, brand: 'Louis Philippe', name: 'Formal Pant for Men', price: '$45.99', salePrice: '$39.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p6.jfif?updatedAt=1728550098694', size: 'm', gender: 'male', type: 'dress' },
      { id: 7, brand: 'Clara\'s', name: 'Ethnic Wear', price: '$69.99', salePrice: '$59.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p7.jfif?updatedAt=1728550100640', size: 's', gender: 'female', type: 'dress' },
      { id: 8, brand: 'Zudio', name: 'Jacket', price: '$79.99', salePrice: '$69.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p8.jfif?updatedAt=1728550100896', size: 'l', gender: 'unisex', type: 'dress' },
      { id: 9, brand: 'Peter England', name: 'Formal Shirt', price: '$9.99', salePrice: '$7.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p9.jfif?updatedAt=1728550100930', size: 'xl', gender: 'male', type: 'dress' },
      { id: 10, brand: 'H&M', name: 'Combo Tops', price: '$39.99', salePrice: '$34.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p10.jfif?updatedAt=1728550095450', size: 'xl', gender: 'female', type: 'dress' },
      { id: 11, brand: 'Clara\'s', name: 'Casual Shirt', price: '$8.99', salePrice: '$6.99', image: 'src/assets/img/p11.jfifhttps://ik.imagekit.io/iayn5eqir/img/p10.jfif?updatedAt=1728550095450', size: 'm', gender: 'unisex', type: 'dress' },
      { id: 12, brand: 'Zudio', name: 'Tops', price: '$25.99', salePrice: '$20.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p12.jfif?updatedAt=1728550095734', size: 's', gender: 'female', type: 'dress' },
      { id: 13, brand: 'Clara\'s', name: 'Western Top', price: '$19.99', salePrice: '$14.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p13.jfif?updatedAt=1728550095618', size: 'xl', gender: 'female', type: 'dress' },
      { id: 14, brand: 'Uniqlo', name: 'Sweater', price: '$34.99', salePrice: '$29.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p14.jfif?updatedAt=1728550095543', size: 'l', gender: 'unisex', type: 'dress' },
      { id: 15, brand: 'Clara\'s', name: 'Black Top', price: '$17.99', salePrice: '$13.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p15.jfif?updatedAt=1728550095372', size: 'xxl', gender: 'female', type: 'dress' },
      { id: 16, brand: 'Raymond', name: 'Suit', price: '$99.99', salePrice: '$89.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p16.jfif?updatedAt=1728550095849', size: 'xl', gender: 'male', type: 'dress' },
      { id: 17, brand: 'Biba', name: 'Ethnic Set', price: '$75.99', salePrice: '$65.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p17.jfif?updatedAt=1728550098040', size: 'xl', gender: 'female', type: 'dress' },
      { id: 18, brand: 'Louis Philippe', name: 'Tees', price: '$29.99', salePrice: '$24.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p18.jfif?updatedAt=1728550098124', size: 'l', gender: 'male', type: 'dress' },
      { id: 19, brand: 'Biba', name: 'Formal Suit', price: '$49.99', salePrice: '$39.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p19.jfif?updatedAt=1728550098151', size: 'xl', gender: 'female', type: 'dress' },
      { id: 20, brand: 'Uniqlo', name: 'White Shirt', price: '$59.99', salePrice: '$49.99', image: 'https://ik.imagekit.io/iayn5eqir/img/p20.jfif?updatedAt=1728550098387', size: 'm', gender: 'unisex', type: 'dress' },
    ];
  
const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState(initialproduct);
  const [sexFilter, setSexFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [loading, setLoading] = useState(true);

  const fetchproducts = async () => {
    setLoading(true);
    try {
      const { data } = await getproducts();
      setProducts([...initialproduct, ...data]);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.warn(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  if (loading) {
    return <p className='h-[93vh] w-screen flex justify-center items-center primary fnt'>Loading products...</p>;
  }

  if (!loading && products.length === 0) {
    return <p className='h-[93vh] w-screen flex justify-center items-center primary fnt'>No Products Available!</p>;
  }
  const filterByPrice = (product) => {
    if (priceFilter === '') return true;
    const priceValue = parseFloat(product.salePrice ? product.salePrice.slice(1) : product.price.slice(1));
    if (priceFilter === 'low') return priceValue < 30;
    if (priceFilter === 'medium') return priceValue >= 30 && priceValue <= 60;
    if (priceFilter === 'high') return priceValue > 60;
  };

  const filteredProducts = products.filter(product => {
    const matchesSex = sexFilter === '' || product.gender === sexFilter;
    const matchesSize = sizeFilter === '' || product.size === sizeFilter;
    const matchesBrand = brandFilter === '' || product.brand === brandFilter;
    const matchesPrice = filterByPrice(product);
    return matchesSex && matchesSize && matchesBrand && matchesPrice;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div style={{ padding: '20px' ,background:'primary',fontFamily:"cursive"}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <select value={sexFilter} onChange={(e) => setSexFilter(e.target.value)} style={{ marginRight: '10px' }}>
          <option value="">All Gender</option>
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

        <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} style={{ marginLeft: '10px' ,fontFamily:"cursive"}}>
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

        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} style={{ marginLeft: '10px' ,fontFamily:"cursive"}}>
          <option value="">All Prices</option>
          <option value="low">Below $30</option>
          <option value="medium">$30 - $60</option>
          <option value="high">Above $60</option>
        </select>
      </div>

      <div className="product-list " style={{ display: 'flex', flexWrap: 'wrap', gap: '10px',fontFamily:"cursive" }}>
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div
              key={product._id || product.id}
              className="product-item"
              style={{
                flex: '1 1 calc(25% - 20px)',
                boxSizing: 'border-box',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                textAlign: 'center',
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
              <p style={{ textDecoration: product.salePrice ? 'line-through' : 'none' }}>{product.price}</p>
              {product.salePrice && <p style={{ color: 'red' }}>Sale: {product.salePrice}</p>}
              <p style={{ color: 'black' }}>Size: {product.size}</p>
              <button className="submit"onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found for the selected filters.</p>
        )}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            style={{
              margin: '0 5px',
              padding: '10px',
              backgroundColor: currentPage === index + 1 ? '#007bff' : '#ccc',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Shop;