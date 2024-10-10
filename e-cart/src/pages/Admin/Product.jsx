
import React, { useState } from 'react';
import { addproduct } from '../../services/api';
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    salePrice: 0,
    brand: '',
    size: '',
    image:'',
    stock: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addproduct(product);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center primary fnt text-xl'>

      <form onSubmit={handleSubmit} className='flex flex-col h-[50%] w-[30%] justify-center items-center bg-gray-100 border-solid border-black rounded-md shadow-lg gap-[1rem]'>
        <input type="text" name="name" onChange={handleChange} placeholder="Product Name" required className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        <input type="text" name="brand" onChange={handleChange} placeholder="Brand Name" className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        <input type="number" name="price" onChange={handleChange} placeholder="Price" required className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        <input type="number" name="salePrice" onChange={handleChange} placeholder="Sale Price" className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        <input type="text" name="size" onChange={handleChange} placeholder="Size" className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        <input type="text" name="image" onChange={handleChange} placeholder="Image Url" className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        <input type="text" name="stock" onChange={handleChange} placeholder="Stock" className='p-1 w-[70%] h-[3rem] bg-gray-200 focus:outline-none focus:border-b-2 focus:border-gray-600' />
        
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
