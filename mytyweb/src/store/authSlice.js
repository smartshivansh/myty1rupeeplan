import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadUserInit = () => {
  if (localStorage.getItem("userId") && localStorage.getItem("token")) {
    return localStorage.getItem("userId");
  }
  return null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authed: false,
    token: "",
    user: loadUserInit(),
    userLoading: false,
  },
  reducers: {
    setAuthState: (state, action) => {
      const { newAuthedState, newToken, newUser } = action.payload;
      // console.log({ newAuthedState, newToken, newUser });
      state.authed = newAuthedState;
      state.token = newToken;
      state.user = newUser;
    },
    editUser: (state, action) => {
      const { newUser } = action.payload;
      state.user = newUser;
    },
    loadUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.authed = true;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
  },
});

export const { setAuthState, editUser, loadUser, setUserLoading } =
  authSlice.actions;

export const loadUserAsync = () => (dispatch) => {
  dispatch(setUserLoading(true));
  axios
    .get(`/api/user`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      // console.log(res.data);
      if (res.status === 200) {
        dispatch(loadUser(res.data));
      }
    })
    .catch((error) => {})
    .finally(() => {
      dispatch(setUserLoading(false));
    });
};

export const selectAuthed = (state) => state.auth.authed;
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectUserLoading = (state) => state.auth.userLoading;

export default authSlice.reducer;
