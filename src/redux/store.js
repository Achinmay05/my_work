import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../redux/feature/login/loginSlice'

export const store = configureStore({
    reducer: {
        login: loginReducer, // 'login' matches the name used in useSelector
      },
    });



