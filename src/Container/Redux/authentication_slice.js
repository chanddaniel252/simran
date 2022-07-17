import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{
        'auth':{}
    },
    reducers:{
        addUser:(state,action)=>{state.auth=action.payload; 
        localStorage.setItem('user',JSON.stringify(state.auth))},
        deleteUser:(state,action)=>{state.auth=null; 
            localStorage.removeItem('user')}

        
    }

})
export const {addUser,deleteUser}=authSlice.actions;
export default authSlice.reducer;