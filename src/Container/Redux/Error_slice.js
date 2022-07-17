import { createSlice } from "@reduxjs/toolkit";


const errorSlice= createSlice({
    name:'error',
    initialState:{
        'error':{}
    },
    reducers:{
        addError:(state,action)=>{state.error=action.payload}
    }
})

export const {addError}=errorSlice.actions;
export default errorSlice.reducer;