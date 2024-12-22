import {createSlice} from "@reduxjs/toolkit"

const INITIAL_STATE={
    userLoggedIn:false,
    initialized: false,
}

const userSlice = createSlice({
    name:'user',
    initialState:INITIAL_STATE,
    reducers:{
        saveUserData:(state,action)=>{
            state.userLoggedIn=true
            state.initialized=true
        },
        clearUserData:(state,action)=>{
            state.userLoggedIn=false
            state.initialized=true
        }
    }
})

export const {saveUserData,clearUserData}=userSlice.actions
export default userSlice.reducer;