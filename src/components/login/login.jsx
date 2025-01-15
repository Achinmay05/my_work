// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../../redux/feature/login/loginSlice';

// export default function login_signup() {

//   const [username, setUsername] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSigningUp, setIsSigningUp] = useState(false);
//   const dispatch = useDispatch();

//   const handleSignUp = (event) => {
//     event.preventDefault();
//     const enteredUsername = event.target.username.value.trim();
//     const enteredPassword = event.target.password.value.trim();

//     if (!enteredUsername || !enteredPassword) {
//       setErrorMessage("Both fields are required.");
//       return;
//     }

//     if (localStorage.getItem(enteredUsername)) {
//       setErrorMessage("User already exists. Please log in.");
//       return;
//     }

//     // Save credentials to localStorage
//     localStorage.setItem(enteredUsername, enteredPassword);
//     setErrorMessage("");
//     alert("Sign-up successful! You can now log in.");
//     setIsSigningUp(false); // Switch to Login mode
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     const enteredUsername = event.target.username.value.trim();
//     const enteredPassword = event.target.password.value.trim();

//     const savedPassword = localStorage.getItem(enteredUsername);

//     if (savedPassword && savedPassword === enteredPassword) {
//       setUsername(enteredUsername);
//       dispatch(login());
//       setErrorMessage("");
//     } else {
//       setErrorMessage("Invalid username or password.");
//     }
//   };

//   const handleLogout = () => {
//     setUsername("");
//     dispatch(logout());
//   };

//   return (
//     <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md shadow-lg shadow-[rgba(30,30,30,0.5)]">
//       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//           {isSigningUp ? "Sign Up" : "Sign in to your account"}
//         </h1>
//         <form
//           className="space-y-4 md:space-y-6"
//           onSubmit={isSigningUp ? handleSignUp : handleLogin}>
//           <div>
//             <label
//               htmlFor="username"
//               className="block mb-2 text-sm font-medium text-white">
//               Username
//             </label>
//             <input
//               type="text"
//               name="username"
//               id="username"
//               className="bg-transparent border border-gray-100 text-white rounded-lg block w-full p-2.5"
//               placeholder="Enter username"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-white">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//           {errorMessage && (
//             <p className="text-sm font-light text-red-500">{errorMessage}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full text-white p-3 border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold"
//           >
//             {isSigningUp ? "Sign Up" : "Sign In"}
//           </button>
//           <div className="text-sm font-light text-gray-500 dark:text-gray-400">
//             {isSigningUp ? (
//               <div className="text-white">Already have an account? <button type="button" className="font-medium text-white hover:underline" onClick={() => setIsSigningUp(false)}>Log In</button></div>
//             ) : (
//               <div className="text-white">Don’t have an account yet? <button type="button" className="font-medium text-white hover:underline " onClick={() => setIsSigningUp(true)}>Sign Up</button></div>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }





// **************************************************************************************
// **************************************************************************************






// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../../redux/feature/login/loginSlice"; // Ensure the correct path to your loginSlice.js

// export default function login_signup() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.login.isLoggedIn); // Ensure 'login' matches your Redux slice name
//   const [username, setUsername] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isSigningUp, setIsSigningUp] = useState(false);
//   const [gender, setGender] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const extractUsername = (email) => {
//     const emailPrefix = email.split("@")[0];
//     return emailPrefix.replace(/[0-9]/g, "");
//   };

//   const handleSignUp = (event) => {
//     event.preventDefault();
//     const enteredEmail = event.target.email.value.trim();
//     const enteredPassword = event.target.password.value.trim();
//     const selectedGender = event.target.gender.value;
//     const extractedUsername = extractUsername(enteredEmail);

//     if (!enteredEmail || !enteredPassword || !selectedGender) {
//       setErrorMessage("All fields are required.");
//       return;
//     }

//     if (!enteredEmail.includes("@")) {
//       setErrorMessage("Please enter a valid email address.");
//       return;
//     }

//     if (localStorage.getItem(extractedUsername)) {
//       setErrorMessage("User already exists. Please log in.");
//       return;
//     }

//     localStorage.setItem(
//       extractedUsername,
//       JSON.stringify({
//         password: enteredPassword,
//         email: enteredEmail,
//         gender: selectedGender,
//       })
//     );

//     setErrorMessage("");
//     alert("Sign-up successful! You can now log in.");
//     setIsSigningUp(false);
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();
//     const enteredEmail = event.target.email.value.trim();
//     const enteredPassword = event.target.password.value.trim();
//     const extractedUsername = extractUsername(enteredEmail);

//     const userData = localStorage.getItem(extractedUsername);

//     if (userData) {
//       const { password, gender: userGender } = JSON.parse(userData);
//       if (password === enteredPassword) {
//         setUsername(extractedUsername);
//         setGender(userGender);
//         dispatch(login()); // Dispatch Redux login action
//         setErrorMessage("");
//       } else {
//         setErrorMessage("Invalid email or password.");
//       }
//     } else {
//       setErrorMessage("Invalid email or password.");
//     }
//   };

//   const handleLogout = () => {
//     setUsername("");
//     setGender("");
//     setIsDropdownOpen(false);
//     dispatch(logout()); // Dispatch Redux logout action
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       {isLoggedIn && (
//         <div className="absolute top-4 right-4" ref={dropdownRef}>
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none hover:shadow-lg hover:shadow-white"
//           >
//             <img
//               src={gender === "male" ? "/imgs/male-avatar.png" : "/imgs/female-avatar.png"}
//               alt={`${gender} avatar`}
//               className="w-full h-full object-cover"
//             />
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md shadow-lg">
//               <div className="px-4 py-3 border-b border-white/20">
//                 <p className="text-sm text-white">Signed in as</p>
//                 <p className="text-sm font-medium text-white truncate">{username}</p>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {!isLoggedIn ? (
//         <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md shadow-lg shadow-[rgba(30,30,30,0.5)]">
//           <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//             <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
//               {isSigningUp ? "Sign Up" : "Sign in to your account"}
//             </h1>
//             <form
//               className="space-y-4 md:space-y-6"
//               onSubmit={isSigningUp ? handleSignUp : handleLogin}
//             >
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-white"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className="bg-transparent border border-gray-100 text-white rounded-lg block w-full p-2.5"
//                   placeholder="name@company.com"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block mb-2 text-sm font-medium text-white"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//               {isSigningUp && (
//                 <div>
//                   <label
//                     htmlFor="gender"
//                     className="block mb-2 text-sm font-medium text-white"
//                   >
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     id="gender"
//                     className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
//                     required
//                   >
//                     <option value="">Select gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>
//               )}
//               {errorMessage && (
//                 <p className="text-sm font-light text-red-500">{errorMessage}</p>
//               )}
//               <button
//                 type="submit"
//                 className="w-full text-white p-3 border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold"
//               >
//                 {isSigningUp ? "Sign Up" : "Sign In"}
//               </button>
//               <div className="text-sm font-light text-white">
//                 {isSigningUp ? (
//                   <div>
//                     Already have an account?{" "}
//                     <button
//                       type="button"
//                       className="font-medium text-white hover:underline"
//                       onClick={() => setIsSigningUp(false)}
//                     >
//                       Log In
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     Don't have an account yet?{" "}
//                     <button
//                       type="button"
//                       className="font-medium text-white hover:underline"
//                       onClick={() => setIsSigningUp(true)}
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-white text-xl">
//           Welcome to the Dashboard!
//         </div>
//       )}
//     </div>
//   );
// }






import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/feature/login/loginSlice";

export default function LoginSignup() {
  const dispatch = useDispatch();

  // Retrieve state from Redux
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const username = useSelector((state) => state.login.username); // Fetch username from Redux
  const gender = useSelector((state) => state.login.gender); // Fetch gender from Redux

  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to extract username from email
  const extractUsername = (email) => {
    const emailPrefix = email.split("@")[0];
    return emailPrefix.replace(/[0-9]/g, "");
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const enteredEmail = event.target.email.value.trim();
    const enteredPassword = event.target.password.value.trim();
    const selectedGender = event.target.gender.value;
    const extractedUsername = extractUsername(enteredEmail);

    if (!enteredEmail || !enteredPassword || !selectedGender) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!enteredEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (localStorage.getItem(extractedUsername)) {
      setErrorMessage("User already exists. Please log in.");
      return;
    }

    localStorage.setItem(
      extractedUsername,
      JSON.stringify({
        password: enteredPassword,
        email: enteredEmail,
        gender: selectedGender,
      })
    );

    setErrorMessage("");
    alert("Sign-up successful! You can now log in.");
    setIsSigningUp(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const enteredEmail = event.target.email.value.trim();
    const enteredPassword = event.target.password.value.trim();
    const extractedUsername = extractUsername(enteredEmail);
  
    const userData = localStorage.getItem(extractedUsername);
  
    if (userData) {
      const { password, gender: userGender } = JSON.parse(userData);
      if (password === enteredPassword) {
        // Dispatch Redux login action with username and gender
        dispatch(login({ username: extractedUsername, gender: userGender }));
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };
  

  const handleLogout = () => {
    setIsDropdownOpen(false);
    dispatch(logout()); // Dispatch Redux logout action
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isLoggedIn && (
        <div className="absolute top-4 right-4" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-white focus:outline-none hover:shadow-lg hover:shadow-white"
          >
            <img
              src={gender === "male" ? "/imgs/male-avatar.png" : "/imgs/female-avatar.png"}
              alt={`${gender} avatar`}
              className="w-full h-full object-cover"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md shadow-lg">
              <div className="px-4 py-3 border-b border-white/20">
                <p className="text-sm text-white">Signed in as</p>
                <p className="text-sm font-medium text-white truncate">{username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {!isLoggedIn ? (
        <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md shadow-lg shadow-[rgba(30,30,30,0.5)]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              {isSigningUp ? "Sign Up" : "Sign in to your account"}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={isSigningUp ? handleSignUp : handleLogin}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-transparent border border-gray-100 text-white rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  required
                />
              </div>
              {isSigningUp && (
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              )}
              {errorMessage && (
                <p className="text-sm font-light text-red-500">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="w-full text-white p-3 border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold"
              >
                {isSigningUp ? "Sign Up" : "Sign In"}
              </button>
              <div className="text-sm font-light text-white">
                {isSigningUp ? (
                  <div>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="font-medium text-white hover:underline"
                      onClick={() => setIsSigningUp(false)}
                    >
                      Log In
                    </button>
                  </div>
                ) : (
                  <div>
                    Don't have an account yet?{" "}
                    <button
                      type="button"
                      className="font-medium text-white hover:underline"
                      onClick={() => setIsSigningUp(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center text-white text-xl">
          Welcome to the Dashboard!
        </div>
      )}
    </div>
  );
}
