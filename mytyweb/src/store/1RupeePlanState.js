import { createSlice } from "@reduxjs/toolkit";


const OneRupeePlanState = createSlice({
    name: "OneRupeePlan",
    initialState: {
        coverText: "",
        subdomain: "",
        userId: ""
    },
    reducers: {
        setDescryption: (state, action) =>{
            state.descryption = action.payload;
        },
        setUserId: (state, action) =>{
            state.descryption = action.payload;
        },
        setSubdomain: (state, action) =>{
            state.descryption = action.payload;
        }
    } 
})

export const {setDescryption, setUserId, setSubdomain} = OneRupeePlanState.actions;
export default OneRupeePlanState;