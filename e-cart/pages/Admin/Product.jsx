import React, { useEffect, useState } from 'react';
import { getproducts, addproduct, deleteProduct, updateProductStock } from '../../services/api';

const Product= () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    salePrice: 0,
    brand: '',
    size: '',
    image: '',
    stock: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getproducts();
      setProducts(data);
    } catch (error) {
      console.warn('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addproduct(newProduct);
      alert('Product added successfully!');
      setNewProduct({ name: '', price: 0, salePrice: 0, brand: '', size: '', image: '', stock: 0 });
      fetchProducts(); 
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleStockChange = async (productId, newStock) => {
    try {
      await updateProductStock(productId, newStock);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, stock: newStock } : product
        )
      );
      alert('Stock updated successfully!');
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center primary fnt text-xl p-4">
      <form onSubmit={handleAddProduct} className="flex flex-col w-full max-w-lg bg-gray-100 border border-black rounded-md shadow-lg p-6 mb-6 gap-4">
        <h2 className="text-2xl font-bold">Add New Product</h2>
        <input type="text" name="name" value={newProduct.name} onChange={handleProductChange} placeholder="Product Name" required className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <input type="text" name="brand" value={newProduct.brand} onChange={handleProductChange} placeholder="Brand Name" className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <input type="number" name="price" value={newProduct.price} onChange={handleProductChange} placeholder="Price" required className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <input type="number" name="salePrice" value={newProduct.salePrice} onChange={handleProductChange} placeholder="Sale Price" className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <input type="text" name="size" value={newProduct.size} onChange={handleProductChange} placeholder="Size" className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <input type="text" name="image" value={newProduct.image} onChange={handleProductChange} placeholder="Image URL" className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <input type="number" name="stock" value={newProduct.stock} onChange={handleProductChange} placeholder="Stock" className="p-2 bg-gray-200 rounded focus:outline-none focus:border-b-2 focus:border-gray-600" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-800">Add Product</button>
      </form>

      <div className="grid grid-cols-4 gap-4 w-full">
        {products.map((product) => (
          <div key={product.id} className="border rounded-md p-4 text-center">
            <img src={product.image} alt={product.name} className="w-full h-48 object-contain mb-2" />
            <h2>{product.brand} - {product.name}</h2>
            <p className="line-through">Rs. {product.price}</p>
            {product.salePrice && <p className="text-red-600 font-bold">Rs. {product.salePrice}</p>}
            <p>{product.stock > 0 ? `Stock: ${product.stock}` : <span className="text-red-600">Out of Stock</span>}</p>
            
            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-2 rounded mt-2 hover:bg-red-700">Delete Product</button>
            <div className="mt-2">
              <input
                type="number"
                value={product.stock}
                onChange={(e) => handleStockChange(product.id, Number(e.target.value))}
                className="border p-1 text-center w-16"
              />
              <label className="ml-2">Update Stock</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
