import React from 'react'
import {Link} from 'react-router-dom';
import Salesx from '../../assets/img/bg.jfif'


const Home = () => {
  return (
    <>
       <div className="w-[100%] h-[93vh] flex flex-row bg-[#e2e2e4]">
          <div className="w-[60%] h-[100%] flex justify-start items-end">
            <img src={Salesx} alt="sales" className="w-[90%] h-auto rounded-sm" />
           </div>
           <div className="w-[50%] h-[100%] flex flex-col justify-center items-center gap-8">
              <div className="accent text-6xl fnt">Hurry Up!!</div>
              <div className="accent text-4xl"> The Sale Is Live ....</div>
              <div className="accent text-2xl fnt"> Make ur Cart full with less..</div>
              <Link to="/shop" className="w-[20%]">
                  <button type="submit" className="w-full submit px-4 py-2 text-lg">
                    Shop Now
                 </button>
               </Link>
          </div>

       </div>
    </>
  )
}
export default Home;