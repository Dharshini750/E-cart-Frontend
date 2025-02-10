import React from 'react';
import { Link } from 'react-router-dom';
import Logox from '../../public/img/logo.jpeg';

export const Index = () => {
  return (
    <div className="primary w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="w-[100%] h-[70%] flex flex-col justify-center items-center text-4xl pl-20 accent gap-10">
        <img src={Logox} alt="logo" className="w-auto h-[30%] rounded-full" />
        <p>Welcome!</p>
        <p>Easy Way To Shop !!..</p>
      </div>
      <div className="w-[100%] h-[30%] flex flex-col justify-center items-center align-middle gap-4 fnt">
        <Link to="/login">
          <button className="submit">Login</button>
        </Link>
        <Link to="/adminlogin">
          <button className="submit">Admin Login</button>
        </Link>
        <Link to="/signup">
          <button className="submit">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
