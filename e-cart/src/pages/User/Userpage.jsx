import React, { useState, useEffect } from 'react';

const UserPage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        gender: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        } else {
            console.log("No user data found in localStorage.");
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
           
            await saveUserData(user);
            localStorage.setItem('user', JSON.stringify(user)); 
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    const saveUserData = async (userData) => {
        try {
            const response = await fetch('/api/save-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to save user data');
            }

            console.log('User data saved successfully');
        } catch (error) {
            console.error("Error during API call:", error);
            throw error; 
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">User Profile</h1>
            {user ? (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`border rounded w-full py-2 px-3 ${!isEditing && 'bg-gray-200'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`border rounded w-full py-2 px-3 ${!isEditing && 'bg-gray-200'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`border rounded w-full py-2 px-3 ${!isEditing && 'bg-gray-200'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`border rounded w-full py-2 px-3 ${!isEditing && 'bg-gray-200'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`border rounded w-full py-2 px-3 ${!isEditing && 'bg-gray-200'}`}
                        />
                    </div>
                    <button
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
};

export default UserPage;
