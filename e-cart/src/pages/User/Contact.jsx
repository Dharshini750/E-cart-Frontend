import React from 'react';

const Contact = () => {
  return (
    <>
      <div className="w-full h-[93vh] primary flex justify-center items-center flex-col">
      
        <div className="w-[90%] h-[50%] flex txtc flex-col justify-center gap-8">
          <h1 className='font-bold text-2xl text-center'>E-Cart Culture</h1>
          <p className='text-center text-lg'>
            E-Cart culture is steeped in fostering trust, inclusion, support, recognition, and genuine care 
            that enables customers to create, innovate, and bring their best selves to work.
          </p>

          <h1 className='font-bold text-2xl text-center'>E-Cart Innovation</h1>
          <p className='text-center text-lg'>
            E-Cart technology drives path-breaking, customer-focused innovation that makes high-quality products 
            accessible to Indian shoppers, besides making the online shopping experience convenient, intuitive, and seamless.
          </p>
        </div>

       
        <div className="w-[90%] h-[50%] txtc flex flex-col justify-center gap-8">
          <h1 className='font-bold text-2xl text-center'>
            Contact Us
          </h1>
          <p className='text-lg text-center'>
            Flipkart Help Center | 24x7 Customer Care Support
          </p>

          
          <ul className="flex flex-col items-center gap-6 text-center">
            <li className="flex flex-col items-center">
              <a href="mailto:ecart2024@gmail.com" className="text-lg flex items-center gap-2">
                <i className="fa-solid fa-envelope text-xl"></i>
                Email
              </a>
            </li>

            <li className="flex flex-col items-center">
              <a href="tel:+9876543210" className="text-lg flex items-center gap-2">
                <i className="fa-solid fa-phone text-xl"></i>
                Helpline Number
              </a>
            </li>

            <li className="flex flex-col items-center">
              <a href="#" className="text-lg flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-xl"></i>
                Saibaba Colony, Coimbatore
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
