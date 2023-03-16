import { useState } from "react";
import { useDispatch } from "react-redux";
import { userUpdate } from "../../store/UserSlice";
import { setAuthState } from "../../store/authSlice";

import axios from "axios";

import classes from "./login.module.css";

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"
import Loader from "../loader/Loader"

import Footer from "../footer/Footer";
import { api } from "../../constants/apis"

import { useNavigate } from "react-router";

export default function Login(){

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)

    const [slideDisplay, setSlideDisplay] = useState("none");
    const [slideTransform, setSlideTransform] = useState("translateX(80%)")
    const [slideTransition, setSlideTransition] = useState("all 0.5s")
    const [slideOpacity, setSlideOpacity] = useState(0);

    const [error, setError] = useState("");

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const openNotification = () => {   
        setSlideDisplay(p => "block");
        setTimeout(()=>{
            setSlideTransform(p => "translateX(0%)")
            setSlideTransition(p => p)
            setSlideOpacity(p => 1)
        }, 100)
    }

    const closeNotification = () => {
        setSlideTransform(p => "translateX(80%)")
        setSlideTransition(p => p)
        setSlideOpacity(p => 0)
        setTimeout(()=>{
            setSlideDisplay(p => "none");
        }, 1000)
    }

    const LoginSubmit = (e) => {

      e.preventDefault()

      const data = Number(emailOrPhone)
        ? { mobile: emailOrPhone, password, email: null }
        : { email: emailOrPhone, password, mobile: null };
      console.log("data", data);
  
      setLoading(true);
      axios
        .post(`${api}/login`, data)
        .then((res) => {
          console.log("LOGIN --", res.data);
          dispatch(
            setAuthState({
              newAuthedState: true,
              newToken: res.data.token,
              newUser: res.data.user,
            })
          );
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.user._id);
          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("userName", res.data.user.name);
          localStorage.setItem("subDomain", res.data.user.subdomain);

          localStorage.setItem("isLogedIn", true)
  
          setLoading(false);
          setTimeout(()=>{
            window.location.reload()
          },100)
          navigate("/")
        })
        .catch((err) => {
          if (err.response.data.msg === "USER_DOES_NOT_EXIST") {
            setError("This Email or Mobile is not registered");
          } else if (err.response.data.msg === "INVALID_PASSWORD") {
            setError("This Password is incorrect");
          }
  
          setLoading(false);
        });
    };

    return <div className={classes.container} >

              {loading && <Loader />}

              <header className={classes.header}>
                 <img src={menu} alt="menu" className={classes.img} onClick={openNotification} />
              </header>

              <h1 className={classes.heading}>Log In</h1>

              <form className={classes.form} onSubmit={LoginSubmit}>

                <p className={classes.fromHeading}>Enter ypuy mobile Number to continue </p>

                <input required className={classes.input} placeholder="mobile/Email" value={emailOrPhone} onChange={(e)=>{setEmailOrPhone(p=>e.target.value)}}  />
                <p style={{display: `${error == "" ? "none" : "block"}`}} className={classes.error}>{error}</p>

                <input required type="password" className={classes.input} placeholder="Password" value={password} onChange={(e)=>{setPassword(p=>e.target.value)}}  />

                <button type="submit" className={classes.button}>Log In</button>

              </form>

                {/* menu slide */}

              <div className={classes.menuslide} style={{opacity: slideOpacity ,transform: slideTransform, display: slideDisplay, transition: slideTransition}}>
               <header className={classes.menuheader}>
                 <img src={backbtn} alt="menu" id={classes.backbtn} className={classes.img} onClick={closeNotification} />
                 <img src={menu} alt="menu" className={classes.img} />
               </header>

               <div>
                 <h1 className={classes.menuheading}>Contact Us</h1>
                 <ul>
                     <li><a href="tel:9323722268" className={classes.link}>9329722268</a></li>
                     <li><a href="mailto:care@myty.in" className={classes.link}>care@myty.in</a></li>
                 </ul>
               </div>
             </div>

             {/* <Footer /> */}
          </div>
}