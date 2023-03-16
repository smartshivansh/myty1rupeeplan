import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { userUpdate, chatUpdate } from "./store/UserSlice";

import Main from "./Components/chatBox/Main";
import BookLink from "./Components/Booklink/BookLink";
import LinkAvailability from "./Components/availability/LinkAvailability";
import BookLinkForm from "./Components/signup/BookLinkForm";
import PaymentButton from "./Components/payment/Payment";
import OtpVerification from "./Components/OtpVerification/OtpVerification";
import Protected from "./Components/protected/Protected";
import Login from "./Components/login/login";
import Form100Words from "./Components/1rupeePlan/Form100Words";
import Loader from "./Components/Loader";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import {api} from "./constants/apis"


function App() {

  const dispatch = useDispatch();

  const [chat, setChat] = useState(null);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");

    if(userId){
      fetch(`${api}/find/userbyId/${userId}`,{
        method: "POST",
        body: JSON.stringify({userId}),
        headers:{
          "content-type": "application/json"
        }
      }).then(res => res.json())
      .then(res => JSON.parse(res))
      .then(res => {
        if(res.sucess){
          dispatch(userUpdate({name: res.user.name, email: res.user.email, isLogedIn: true}))
          localStorage.setItem("isLogedIn", true)
          console.log(res)
        }
        else{
          // chatUpdate({chat: {type: "reply", content: "Hello! How are you"}})
        }
      })

      // setChat(p => [{type: "reply", content: "Hello! How are you"}])
    }
  },[])

  


  
  return (
    <div>
    <Router>
      <Routes>

        <Route exact path="/" element={
           (<Protected><Main /></Protected>) 
        } />

        <Route exact path="/booklink" element={<BookLink />} /> 

        <Route exact path="/available" element={<LinkAvailability />} />

        <Route exact path="/signup" element={<BookLinkForm />} />

        <Route exact path="/payment" element={<PaymentButton label={"365"} />} />

        <Route exact path="/otpverify" element={<OtpVerification />} />

        <Route exact path="/login" element={<Login />} />

        <Route exact path="/preview" element={<Form100Words />} />

        <Route exact path="/loader" element={<Loader />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
