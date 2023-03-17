import { useState } from "react";
import { useDispatch } from "react-redux";
import {validate} from "email-validator";
import { userUpdate } from "../../store/UserSlice";

import { requestForVerificationOTP } from "../signup.function";

import classes from "./BookLinkForm.module.css";

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"

import Footer from "../footer/Footer";
import Loader from "../loader/Loader"
import MeanuBar from "../menuBar/MenuBar";

import apis from "../../constants/apis";

import { useNavigate } from "react-router";
import axios from "axios"

export default function BookLinkForm(){

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)

    const [slideDisplay, setSlideDisplay] = useState("none");
    const [slideTransform, setSlideTransform] = useState("translateX(80%)")
    const [slideTransition, setSlideTransition] = useState("all 0.5s")
    const [slideOpacity, setSlideOpacity] = useState(0);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [accept, setAccept] = useState(false)
    const [type, setType] = useState("none");

    const [user, setUser] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate()

    const emailValidator = (email) => {

      if (validate(email)) {
        setEmailError(null);
        setType(p => "email")
        return true;
      } else {
        if (isNaN(email)) {
          setEmailError("Invalid email Address");
          return false;
        }
        if (email.length !== 10) {
          setEmailError("Mobile number must have 10 digit");
          return false;
        } else {
          setEmailError(null);
          setType(p => "mobile")
          return true;
        }
      }
    };

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

    async function submitContactForm(values) {
      setLoading(true);
      // console.log(values);
      setEmailError("");
      setUsernameError("");
  
      try {
        const res = await requestForVerificationOTP(values);
        if (res) {
          console.log("Moving next Page in submitContactForm");
          navigate("/otpverify")
          return res;
        } else {
          setLoading(false);
          setEmailError("Some Error occured, maybe internet connection.");
          return false;
        }
      } catch (error) {
        setLoading(false);
        // console.log(error);
        setEmailError(error.message);
        return false;
      }
    }

    const formSubmitHandler = async (e) => {

        e.preventDefault()

        setLoading(true)

        if(!accept){
          alert("please accept terms and condition");
          setLoading(false)
          return;
        }

        const validate =  emailValidator(email);

        if(!validate){
          setLoading(false)
          return;
        }

        let options;

        if(type=="email"){
          options = {
            emailOrPhone:email,
            isEmail: true,
            username,
            password,
            name
          }
        }else{
          options = {
            emailOrPhone:email,
            isEmail: false,
            username,
            password,
            name
          }
        }

        try {
          const res = await axios.post(`${apis.checkUser}`,options);
          console.log(res)
          if (res.status === 201) {
            setUser(res.data.user);
            if(type=="email"){
              localStorage.setItem("email", options.emailOrPhone)
              localStorage.setItem("name", options.name)
              localStorage.setItem("username", options.username)
              localStorage.setItem("password", options.password)
              localStorage.setItem("mobile", null)
            }
            else{
              localStorage.setItem("mobile", options.emailOrPhone)
              localStorage.setItem("email", null)
              localStorage.setItem("name", options.name)
              localStorage.setItem("username", options.username)
              localStorage.setItem("password", options.password)
            }
            await submitContactForm(options);
            setLoading(false);
            console.log(res)
            return res;
          }
          setLoading(false);
    
          return false;
        } catch (error) {
          setLoading(false)
          console.log(error)
        }
    }

    const openMenuBar = () => {     
      setIsOpen(p => true)
    }

    const closeMenuBar = () => {
      setIsOpen(p => false)
    }

    return <div className={classes.container} onSubmit={formSubmitHandler}>

              {loading && <Loader />}

              <header className={classes.header}>
                 <img src={menu} alt="menu" className={classes.img} onClick={openMenuBar} />
              </header>

              <h1 className={classes.heading}>SignUp</h1>

              <form className={classes.form}>

                <p className={classes.fromHeading}>Your are just one step away from reserving your link </p>

                <input required type="text" className={classes.input} placeholder="Name" value={name} onChange={(e)=>{setName(p=>e.target.value)}} />
                <p style={{display: `${nameError == "" ? "none" : "block"}`}}  className={classes.error}>{nameError}</p>

                <input required className={classes.input} placeholder="E-mail/Mobile" value={email} onChange={(e)=>{setEmail(p=>e.target.value)}}  />
                <p style={{display: `${emailError == "" ? "none" : "block"}`}} className={classes.error}>{emailError}</p>

                <input required className={classes.input} placeholder="Username(to be used as brand name)" onChange={(e)=>{setUsername(e.target.value)}} />
                <p style={{display: `${usernameError == "" ? "none" : "block"}`}} className={classes.error}>{usernameError}</p>

                <input required type="password" className={classes.input} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                <p style={{display: `${passwordError == "" ? "none" : "block"}`}} className={classes.error}>{passwordError}</p>

                <input required type="password" className={classes.input} placeholder="Confirm Password" onChange={(e)=>{setCpassword(e.target.value)}} />
                
                <p className={classes.radio} >
                <input type='checkbox' style={{marginRight: "0.5rem", width: "1rem", height: "1rem"}} onChange={(e)=>{setAccept(p=>e.target.checked)}} />
                By creating the account you are agreeing to our <a target="_blank" href="https://app.myty.in/terms-conditions" className={classes.links}>Terms and Conditions</a> and <a target="_blank" href="https://app.myty.in/privacy-policy" className={classes.links}>Privacy Policy</a>
                </p>

                <button type="submit" className={classes.button} onClick={formSubmitHandler}>Sign Up</button>
                
                <p className={classes.radio}> Already Have an account? click header to <a className={classes.links} href="/login">login</a></p>

                 
              </form>

                {/* menu slide */}
              
                <MeanuBar isOpen={isOpen} closeMenuBar={closeMenuBar} />

              {/* <div className={classes.menuslide} style={{opacity: slideOpacity ,transform: slideTransform, display: slideDisplay, transition: slideTransition}}>
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
             </div> */}

             {/* <Footer /> */}
          </div>
}