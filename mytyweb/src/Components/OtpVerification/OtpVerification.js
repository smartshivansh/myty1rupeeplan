import React, {useState} from "react";
import OTPInput from "otp-input-react";
import { confirmOTP, submitUserInformation, requestForVerificationOTP } from "../signup.function";

import Loader from "../loader/Loader";
import MeanuBar from "../menuBar/MenuBar";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import classes from "./OtpVerification.module.css";

import xicon from "../../assets/xicon.svg"
import menu from "../../assets/menu.svg"

export default function OtpVerification(){

    const [loading, setLoading] = useState(false)

    const [otp, setOtp] = useState("");
    const [popDisplay, setPopDisplay] = useState("none");
    const [OTPError, setOTPError] = useState("");

    const email = localStorage.getItem("email")
    const mobile = localStorage.getItem("mobile")
    const name = localStorage.getItem("name");
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password")

    const [isOpen, setIsOpen] = useState(false);

    const userDetails = {email, username, name, password, mobile}

    const navigate = useNavigate();
    // console.log(userDetails)

    function closePopHandler(){
        navigate("/");
    }

    function bookLinkHandler(){
        navigate("/available");
    }

    async function submitBasicForm(values) {
        setLoading(true);
        try {
          const res = await submitUserInformation(values);
          if (res) {
            console.log(res)
            console.log("Moving next Page in submitBasicForm");
            return res;
          }
        } catch (error) {
          console.log(error.message);
          return false;
        } finally {
          setLoading(false);
        }
    }

    async function submitOTPForm(e) {
        setOTPError("");
        // setOtpMsg("");
        setLoading(true);
    
        e.preventDefault();
        const values = {
          otp: otp,
        };
        console.log(values);
        // setLoading(true);
    
        try {
          const res = await confirmOTP({email,mobile, otp});
          if (res) {
            // setLoading(false);
            localStorage.setItem("isLogedIn", true)
            console.log("Moving next Page");
            await submitBasicForm(userDetails);
            setLoading(false);
            setTimeout(()=>{window.location.reload()},100)
            navigate("/available")
            // setDisable(true);
          } else {
            setLoading(false);
            setOTPError("Some Error occured, maybe internet connection.");
          }
        } catch (error) {
          setOTPError(error.message);
          setLoading(false);
        //   setDisable(true);
        }
    }
    
    async function handleChange(otp) {
        setOtp(otp);
        if (otp) {
          if (otp.length < 6) {
            setOTPError("Enter 6 digit");
          }
          if (otp.length === 6) {
            setOTPError("");
            setDisable(false);
          }
        }
    }

    async function resendOTP() {
        setLoading(true);
        setOTPError("");
        let emailOrPhone = email ? mobile : email;
        console.log(emailOrPhone)
        let values = {
          name: userDetails.name,
          emailOrPhone,
        };
        try {
          const res = await requestForVerificationOTP(values);
          if (res) {
            setOTPError("We have sent an OTP on your registered mobile/email");
            return res;
          } else {
            setLoading(false);
            setOTPError("something went wrong please try again later");
            return false;
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
          setOTPError("something went wrong please try again later");
          return false;
        }
    }

    const openMenuBar = () => {     
      setIsOpen(p => true)
    }

    const closeMenuBar = () => {
      setIsOpen(p => false)
    }
    

    return <div className={classes.container}>

        {loading && <Loader />}

        <header className={classes.header}>
            <img src={menu} alt="menu" className={classes.img} onClick={openMenuBar} />
        </header>

        <form className={classes.form} onSubmit={submitOTPForm}>

            <p className={classes.heading}>OTP verification</p>

            <p className={classes.content}>Please enter the OTP we have sent on your registered mobile/email.</p>

            <div className={classes.otp}>
               <OTPInput value={otp} onChange={setOtp} onFocus={()=>{setOTPError("")}} autoFocus OTPLength={6} otpType="number" inputStyles={{width:"2rem", height:"2rem", fontSize:"1rem"}} inputClassName={classes.input} />
               <p style={{marginTop:"1rem", alignSelf:"flex-start"}}>{OTPError}</p>
            </div>

            <button type="submit" className={classes.book} style={{marginTop: "2rem"}}>Submit OTP</button>

            <button className={classes.resend} onClick={resendOTP}>Resend OTP</button>

        </form>

        <MeanuBar isOpen={isOpen} closeMenuBar={closeMenuBar} />

        <div className={classes.popup} style={{display: popDisplay}}>

            <div className={classes.pop}>
                <div style={{textAlign: "center"}}>
                   <p>Sign Up completed.</p>
                   <p>Do you want to book your myty link.</p>
                </div>

                <div className={classes.buttoncont}>
                    <button className={classes.maybe} onClick={closePopHandler}>May be later</button>
                    <button className={classes.book} onClick={bookLinkHandler}>Book now</button>
                </div>

                <img src={xicon} alt="close" className={classes.xicon} onClick={closePopHandler} />
            </div>

        </div>

    </div>
}