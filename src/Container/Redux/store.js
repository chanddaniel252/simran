import { configureStore } from "@reduxjs/toolkit";
import authentication_slice from "./authentication_slice";
import cart_slice from "./cart_slice";
import Error_slice from "./Error_slice";
import toast_slice from "./toast_slice";


const store= configureStore({
    reducer:{
        cart:cart_slice,
        auth:authentication_slice,
        toast:toast_slice,
        error:Error_slice

    }
})

export default store;