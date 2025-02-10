// import React, { useState } from "react";
// import Salex from "../../assets/img/bg2.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../../services/api"; 

// const Signup = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const validateEmail = (email) => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const isValidPhoneNumber = (phone) => {
//     return phone.length === 10 && !isNaN(phone); 
//   };

//   const validateInputs = () => {
//     let isValid = true;
//     setError(""); 

//     const usernameRegex = /^[A-Za-z\s]+$/; 
//     if (username.trim() === '') {
//       setError("Username is required.");
//       isValid = false;
//     } else if (!usernameRegex.test(username)) {
//       setError("Username must contain only letters and spaces.");
//       isValid = false;
//     }

//     if (email.trim() === '') {
//       setError("Email is required.");
//       isValid = false;
//     } else if (!validateEmail(email)) {
//       setError("Provide a valid email address.");
//       isValid = false;
//     }

//     if (phone.trim() === '') {
//       setError("Phone number is required.");
//       isValid = false;
//     } else if (!isValidPhoneNumber(phone)) {
//       setError("Phone number must be exactly 10 digits.");
//       isValid = false;
//     }

//     if (password.trim() === '') {
//       setError("Password is required.");
//       isValid = false;
//     } else if (password.length < 8) {
//       setError("Password must be at least 8 characters.");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateInputs()) return; 
//     try {
//       const userData = { username, email, phone, password };
//       const response = await registerUser(userData); 
//       if (response.status === 201) {
//         localStorage.setItem("token", response.data?.token);
//         navigate("/"); 
//       } else if (response.status === 422) {
//         alert("Email already exists!");
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//     }
//   };

//   return (
//     <div className="w-full h-screen overflow-auto flex justify-center items-center relative">
//       <img src={Salex} alt="sales" className="w-full h-full object-cover absolute" />
//       <div className="w-[35%] h-auto max-h-[90%] bg-white bg-opacity-50 rounded-lg p-8 flex flex-col justify-center items-center z-10 shadow-lg">
//         <form className="form" onSubmit={handleSubmit}>
//           <p className="form-title text-xl font-semibold mb-4">Sign up to create an account</p>
//           {error && <p className="text-red-500 mb-4">{error}</p>} 

//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="email"
//               placeholder="Email Id"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="string"
//               placeholder="Phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="submit">
//             Sign up
//           </button>
//           <p className="signup-link">
//             Already have an account?
//             <Link to="/login"> Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import Salex from "../../assets/img/bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isValidPhoneNumber = (phone) => {
    return phone.length === 10 && !isNaN(phone);
  };

  const validateInputs = () => {
    let validationErrors = [];
    const usernameRegex = /^[A-Za-z\s]+$/;

    if (username.trim() === "") {
      validationErrors.push("Username is required.");
    } else if (!usernameRegex.test(username)) {
      validationErrors.push("Username must contain only letters and spaces.");
    }

    if (email.trim() === "") {
      validationErrors.push("Email is required.");
    } else if (!validateEmail(email)) {
      validationErrors.push("Provide a valid email address.");
    }

    if (phone.trim() === "") {
      validationErrors.push("Phone number is required.");
    } else if (!isValidPhoneNumber(phone)) {
      validationErrors.push("Phone number must be exactly 10 digits.");
    }

    if (password.trim() === "") {
      validationErrors.push("Password is required.");
    } else if (password.length < 8) {
      validationErrors.push("Password must be at least 8 characters.");
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const userData = { username, email, phone, password };
      const response = await registerUser(userData);
      const { data } = response; 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 
      navigate("/user");
    } catch (error) {
      setErrors([error.response?.data.message || "Signup failed."]);
    }
  };

  return (
    <div className="w-full h-screen overflow-auto bg-opacity-50 flex justify-center items-center relative">
      <img src={Salex} alt="sales" className="w-full h-full object-cover absolute" />
      <div className="w-[35%] h-auto max-h-[90%] bg-white bg-opacity-50 rounded-lg p-8 flex flex-col justify-center items-center z-10 shadow-lg">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-title text-xl font-semibold mb-4">Sign up to create an account</p>
          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">{error}</p>
              ))}
            </div>
          )}

          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit" className="submit">
            Sign up
          </button>
          <p className="signup-link">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;



// import React, { useState } from "react";
// import Salex from "../../assets/img/bg2.jpg";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../../services/api";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [formData, setFormData] = useState({
//     username: "", email: "", phone: "", password: ""
//   });
//   const [errors, setErrors] = useState([]); // Change to an array to hold multiple errors

//   const validateEmail = (email) => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const isValidPhoneNumber = (phone) => {
//     return phone.length === 10 && !isNaN(phone);
//   };

//   const validateInputs = () => {
//     let validationErrors = [];
//     const usernameRegex = /^[A-Za-z\s]+$/;

//     if (username.trim() === "") {
//       validationErrors.push("Username is required.");
//     } else if (!usernameRegex.test(username)) {
//       validationErrors.push("Username must contain only letters and spaces.");
//     }

//     if (email.trim() === "") {
//       validationErrors.push("Email is required.");
//     } else if (!validateEmail(email)) {
//       validationErrors.push("Provide a valid email address.");
//     }

//     if (phone.trim() === "") {
//       validationErrors.push("Phone number is required.");
//     } else if (!isValidPhoneNumber(phone)) {
//       validationErrors.push("Phone number must be exactly 10 digits.");
//     }

//     if (password.trim() === "") {
//       validationErrors.push("Password is required.");
//     } else if (password.length < 8) {
//       validationErrors.push("Password must be at least 8 characters.");
//     }

//     setErrors(validationErrors);
//     return validationErrors.length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateInputs()) return;

//     try {
//       const userData = { username, email, phone, password }; 
//       const response = await registerUser(userData);
//       const { data } = await registerUser(formData);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       navigate("/user");
//     } catch (error) {
//       setErrors([error.response?.data.message || "Signup failed."]);
//     }
//   };

//   return (
//     <div className="w-full h-screen overflow-auto bg-opacity-50 flex justify-center items-center relative">
//       <img src={Salex} alt="sales" className="w-full h-full object-cover absolute" />
//       <div className="w-[35%] h-auto max-h-[90%] bg-white bg-opacity-50 rounded-lg p-8 flex flex-col justify-center items-center z-10 shadow-lg">
//         <form className="form" onSubmit={handleSubmit}>
//           <p className="form-title text-xl font-semibold mb-4">Sign up to create an account</p>
//           {errors.length > 0 && (
//             <div className="mb-4">
//               {errors.map((error, index) => (
//                 <p key={index} className="text-red-500">{error}</p>
//               ))}
//             </div>
//           )}

//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="email"
//               placeholder="Email Id"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               type="text"
//               placeholder="Phone number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="input-container">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} 
//               required
//             />
//           </div>
//           <button type="submit" className="submit">
//             Sign up
//           </button>
//           <p className="signup-link">
//             Already have an account?
//             <Link to="/login"> Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
