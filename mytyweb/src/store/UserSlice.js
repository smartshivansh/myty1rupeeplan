import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        mobile: "",
        email: "",
        chat:[],
        prompt:"",
        isLogedIn: false
    },
    reducers:{
        chatUpdate: (state, action) => {
            state.chat = [...state.chat, action.payload.chat],
            state.prompt = action.payload.prompt
        },

        userUpdate: (state, action) => {
            console.log(action.payload)
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.isLogedIn = action.payload.isLogedIn
        },
    }
})
export const {chatUpdate, userUpdate} = UserSlice.actions;
export default UserSlice;