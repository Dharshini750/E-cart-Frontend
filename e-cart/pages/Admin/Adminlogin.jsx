import React, { useState } from 'react';
import Logox from '../../assets/img/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Sales from '../../assets/img/bg2.jpg';

const Adminlogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
      
        if (email === 'admin@gmail.com' && password === 'admin') {
            navigate('/product');
        } else {
            setError('Invalid Admin ID or Password'); 
        }
    };

    return (
        <div className="w-full h-screen flex bg-opacity-50 justify-center items-center primary relative">
            <img src={Sales} alt="sales" className="w-full h-full object-cover absolute" />
            <div className="w-[35%] h-auto max-h-[90%] bg-white bg-opacity-50 rounded-lg p-8 flex flex-col justify-center items-center z-10 shadow-lg">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="form-title">Login as Admin</p>
                    <div className="input-container">
                        <input 
                            type="email" 
                            placeholder="Admin Id" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-container">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>} 
                    <button type="submit" className="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default Adminlogin;

