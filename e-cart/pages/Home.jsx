import React from 'react';
import { Link } from 'react-router-dom';
import Salesx from '../assets/img/bg2.jpg';

const Home = () => {
  return (
    <>
      <header className="flex gap-6 flex-col">
        <div className="w-full h-60vh flex justify-center items-center bg-[#e2e2e4]">
          <img src={Salesx} alt="Promotional Sale" className="w-full h-full rounded-sm" />
        </div>

        <section className="w-full h-60% flex flex-col justify-center items-center gap-8">
          <h1 className="accent text-6xl fnt">Hurry Up!!</h1>
          <h2 className="accent text-4xl">The Sale Is Live ....</h2>
          <p className="accent text-2xl fnt">Make your Cart full with less..</p>
          <Link to="/shop" className="w-1/5">
            <button type="submit" className="w-full submit px-4 py-2 text-lg">
              Shop Now
            </button>
          </Link>
        </section>

        <section className="w-full h-auto flex flex-col justify-center items-center bg-black">
          <div className="w-90% h-auto flex txtc flex-col justify-center gap-8">
            <h1 className="font-bold text-2xl text-center text-white">E-Cart Culture</h1>
            <p className="text-center text-lg text-white">
              E-Cart culture is steeped in fostering trust, inclusion, support, recognition, and genuine care that enables customers to create, innovate, and bring their best selves to work.
            </p>
            <h1 className="font-bold text-2xl text-center text-white">E-Cart Innovation</h1>
            <p className="text-center text-lg text-white">
              E-Cart technology drives path-breaking, customer-focused innovation that makes high-quality products accessible to Indian shoppers, besides making the online shopping experience convenient, intuitive, and seamless.
            </p>
          </div>

          <div className="w-90% h-auto txtc flex flex-col justify-center gap-8">
            <h1 className="font-bold text-2xl text-center text-white">Contact Us</h1>
            <p className="text-lg text-center text-white">
              Flipkart Help Center | 24x7 Customer Care Support
            </p>
            <ul className="flex flex-col items-center gap-6 text-center text-white">
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
        </section>
      </header>
    </>
  );
}

export default Home;
