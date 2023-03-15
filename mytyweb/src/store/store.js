import { configureStore } from "@reduxjs/toolkit";
import NotificationSlice from "./NotificationSlice";
import UserSlice from "./UserSlice";
import authSlice from "./authSlice";


const store = configureStore({
    reducer: {
        notification: NotificationSlice.reducer,
        user: UserSlice.reducer,
        auth: authSlice,
    }
})

export default store;