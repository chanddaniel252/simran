import {createSlice} from '@reduxjs/toolkit';

const toastSlice= createSlice({
    name:'toast',
    initialState:{
        'toast':false
    },
    reducers:{
        change_toast_state:(state,action)=>{state.toast=action.payload}
    }
})

export const {change_toast_state}=toastSlice.actions;
export default toastSlice.reducer;