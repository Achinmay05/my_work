import React from "react";
import { Vortex } from "./vortex";
import Login from "./login";
import { useDispatch } from "react-redux";
import { login } from "../../redux/feature/login/loginSlice";


export function VortexDemo() {
    const dispatch = useDispatch();

    const handleLogin = () => {
      dispatch(login());
    };
  
    return (
        (<div
            className="w-screen mx-auto rounded-md  h-screen overflow-hidden">
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
                <Login/>
            </Vortex>
        </div>)
    );
}
