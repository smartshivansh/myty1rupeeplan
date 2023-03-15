import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
    name: "notification",
    initialState: {Notifications: [
        {
            title: "This is a dummy Notification 1",
            content: "Lorem ipsum dolor sit amet consectetur. Id adipiscing risus egestas enim. Scelerisque at mattis praesent nulla tortor.",
            date: Date.now(),
            visited: false,
        },
        {
            title: "This is a dummy Notification 2",
            content: "Lorem ipsum dolor sit amet consectetur. Id adipiscing risus egestas enim. Scelerisque at mattis praesent nulla tortor.",
            date: Date.now(),
            visited: false,
        },
        {
            title: "This is a dummy Notification 3",
            content: "Lorem ipsum dolor sit amet consectetur. Id adipiscing risus egestas enim. Scelerisque at mattis praesent nulla tortor.",
            date: Date.now(),
            visited: false,
        },
    ]},
    reducers: {

        setNotificationVisited: (state, action)=>{
            state.Notifications = state.Notifications.map(ele => {
                ele.visited = true;
                return ele;
            })
        },

        addNotification: (state, action) => {
            state.Notifications = [action.payload, ...state.Notifications]
        }
    }
})

export const { setNotificationVisited, addNotification} = NotificationSlice.actions;

export default NotificationSlice;