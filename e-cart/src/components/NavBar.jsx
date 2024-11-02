import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (user && user !== "undefined") { 
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.username) {
          setUsername(parsedUser.username);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername(null); 
    navigate("/login");
  };

  const NavLinks = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "Login", path: "/login" },
  ];

  return (
    <div className="bg-[#17181a] w-full h-16">
      <div className="flex justify-between items-center h-full px-6">
        <NavLink to="/userpage">
          <FaUser size={24} className="text-gray-400 hover:text-white transition duration-300" />
        </NavLink>

        <div className="txt font-extrabold text-3xl text-white">
          {username ? `Welcome, ${username}` : "E-Cart"}
        </div>

        <ul className="txt flex space-x-8 items-center">
          {NavLinks.map((navdata, index) => (
            <li key={index}>
              <NavLink
                to={navdata.path}
                className={({ isActive }) =>
                  isActive
                    ? 'border-b-2 border-white text-white'
                    : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-white transition duration-300'
                }
              >
                {navdata.title}
              </NavLink>
            </li>
          ))}

          <div className="flex space-x-6 items-center">
            <NavLink to="/cart">
              <FaShoppingCart size={24} className="text-gray-400 hover:text-white transition duration-300" />
            </NavLink>

            {username ? (
              <>
                <span className="text-white">{username}</span>
                <FaSignOutAlt
                  size={24}
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white cursor-pointer transition duration-300"
                />
              </>
            ) : (
              <NavLink to="/login">
                <FaSignOutAlt size={24} className="text-gray-400 hover:text-white transition duration-300" />
              </NavLink>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
