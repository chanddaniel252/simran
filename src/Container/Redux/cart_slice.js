import { createSlice } from "@reduxjs/toolkit";


const cartSlice= createSlice({
    name:'cart',
    initialState:{
        'cart':[]
    },
    reducers:{
        addAllItem:(state,action)=>{state.cart=action.payload},
        addItem:(state,action)=>{state.cart.push(action.payload)
        localStorage.setItem('cart',JSON.stringify(state.cart))},
        deleteFromCart:(state,action)=>{
            state.cart= state.cart.filter(f=>f.id!=action.payload)
            localStorage.setItem('cart',JSON.stringify(state.cart))
        }

    }
})

export const {addItem,addAllItem,deleteFromCart}=cartSlice.actions;
export default cartSlice.reducer;