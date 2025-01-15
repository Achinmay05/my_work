// import { useState, useEffect } from 'react'
// import './App.css'
// import { TabsDemo } from '../src/components/tabs/TabsDemo'
// import Bg from './assets/bg.jpg'
// import { useDispatch, useSelector } from 'react-redux';
// import { VortexDemo } from './components/login/loginSignup';

// function App() {
//   const isLoggedInFromState = useSelector((state) => state.isLoggedIn);
//   const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFromState);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     setIsLoggedIn(isLoggedInFromState);
//   }, [isLoggedInFromState]); 

//   return (
//     <>
//       <div className='relative h-screen w-screen'>
//         <img src={Bg} className='absolute h-screen bg-cover bg-center w-screen' alt="" />
//         <div className='w-screen h-screen absolute bg-black opacity-55'></div>
//         {isLoggedIn?<TabsDemo/>:<VortexDemo/>}
//       </div>
//     </>
//   )
// }

// export default App



import { useEffect } from "react";
import "./App.css";
import { TabsDemo } from "../src/components/tabs/TabsDemo";
import Bg from "./assets/bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { VortexDemo } from "./components/login/loginSignup";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn); // Access Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User Login Status:", isLoggedIn); // Debugging Redux state updates
  }, [isLoggedIn]);

  return (
    <>
      <div className='relative h-screen w-screen'>
        <img src={Bg} className='absolute h-screen bg-cover bg-center w-screen' alt="" />
        <div className='w-screen h-screen absolute bg-black opacity-55'></div>
        {isLoggedIn ? <TabsDemo /> : <VortexDemo />}
      </div>
    </>
  );
}

export default App;
