import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa'; 

const Navbar = () => {
  const NavLinks = [
    {
      title: "Home",
      path: "/home"
    },
    {
      title: "Shop",
      path: "/shop"
    },
    {
      title: "About Us",
      path: "/contact"
    }
  ];

  return (
    <>
      <div className="bg-[#4A5568] w-full h-16">
        <div className="flex justify-between items-center h-full px-4">
          <div className="txt font-extrabold text-3xl">
            E-Cart
          </div>
          
          <ul className="txt flex space-x-6">
            {NavLinks.map((navdata, index) => (
              <li key={index}>
                <NavLink
                  to={navdata.path}
                  className={({ isActive }) =>
                    isActive 
                      ? 'border-b-2 border-[#38B2AC]'
                      : 'hover:text-white hover:border-b-2 hover:border-[#38B2AC] transition duration-300'
                  }
                >
                  {navdata.title}
                </NavLink>
              </li>
            ))}
            <div className="flex space-x-4 txt justify-center items-center ">
            <NavLink to="/cart">
              <FaShoppingCart size={24} className="hover:text-white hover:border-b-2 hover:border-[#38B2AC] transition duration-300" />
            </NavLink>
            <NavLink to="/">
            <button type="submit" className="submit hover:text-white hover:border-b-2 hover:border-[#38B2AC] transition duration-300">Logout</button>
            </NavLink>
          </div>
          </ul>

          
        </div>
      </div>
    </>
  );
};

export default Navbar;
