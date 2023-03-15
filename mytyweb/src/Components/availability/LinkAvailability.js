import { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classes from "./LinkAvailability.module.css"

import Footer from "../footer/Footer"
import PaymentButton from "../payment/Payment";

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"
import xicon from "../../assets/xicon.svg"

import { isValidSubdomain,textToSubdomainString,
    TitleToSlug,
    validateSubdomain, } from "../TitleToSlugGen";

import { setSubdomain } from "../../store/1RupeePlanState";

import { selectUser,loadUserAsync,selectAuthed } from "../../store/authSlice";
import { Link } from "react-router-dom";
import apis, {api} from "../../constants/apis";

export default function LinkAvailability(){

    localStorage.removeItem("password")

    const Authed = useSelector(selectAuthed);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [slideDisplay, setSlideDisplay] = useState("none");
    const [slideTransform, setSlideTransform] = useState("translateX(80%)")
    const [slideTransition, setSlideTransition] = useState("all 0.5s")
    const [slideOpacity, setSlideOpacity] = useState(0);

    const [error, setError] = useState("");
    const [errorColor, setErrorColor] = useState("")

    const [bookLinkDisplay, setBookLinkDisplay] = useState("none");

    const [popupDisplay, setPopupDisplay] = useState("flex");
    const [cpopupDisplay, setcPopupDisplay] = useState("none");

    const [subdomain, setSubDomain] = useState("");
    const [validity, setValidity] = useState(true);
    const [availibility, setAvailibility] = useState(null);

    const userId = localStorage.getItem("userId")

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

    const formSubmitHandler = (e) => {

        e.preventDefault();

        if(subdomain.length < 8){
            setErrorColor(p => "red");
            setError(p => "please write more than 8 characters")
            return;
        }

            console.log(subdomain);
            setValidity(true);
        
            const subdomainValidity = isValidSubdomain(subdomain);
            if (!subdomainValidity) {
              setValidity(false);
              return;
            }
        
            axios.get(`${apis.availableDomain}/${subdomain}`).then((res) => {
              console.log(res.data.result);
              if (res.data.result === null) {
                setAvailibility(true);
                setBookLinkDisplay(p => "block")
                setErrorColor(p => "#10BA01");
                setError(p => "Available");
              } else {
                setAvailibility(false);
                // setBookLinkDisplay(p => "block")
                setErrorColor(p => "red");
                setError(p => "Not Available");
              }
            });
        
    }

    function onclickHandler(){
        setcPopupDisplay(p => "flex")
    }

    const usernameHandler = (e) => {
        setSubDomain(p => e.target.value)
    }

    const closePopupHandler = (e) => {
      setcPopupDisplay(p => "none")
    }

    const paymentSucessHandler = async (paymentResData) => {
      
      localStorage.setItem("subdomain", subdomain)

      try {
        await axios.patch(`${api}/onersplan/booksubdomain`, {userID: userId, subdomain})
      } catch (error) {
        console.log(error);
      }

      try {
        const planSubmitRes = await axios.patch(
          `${api}/auth/signup/submit-plan-after-payment`,
          { user_id: userId, plan: "rs-1-plan", paymentInfo: paymentResData }
        );
        dispatch(loadUserAsync());
        // setShowDialog(false);
        setcPopupDisplay(p => "flex")
      } catch (error) {
        console.log(error);
      }
    }

    return <div className={classes.container}>

             <header className={classes.header}>
                 <img src={menu} alt="menu" className={classes.img} onClick={openNotification} />
             </header>

             <div className={classes.subContainer}>
             <h1 className={classes.heading}>Search the availability of your link</h1>

             <p className={classes.content}>Search and buy available domain names</p>
             <p className={classes.condition}>Minimum 8 character, Only lowercase alphanumeric hyphens and underscores are allowed.</p>

             <form className={classes.form} onSubmit={formSubmitHandler}>
                <input type='text' className={classes.input} placeholder="Search here" value={subdomain} onChange={usernameHandler} onFocus={()=>{setBookLinkDisplay("none"); setError("")}} />
                <button className={classes.button}>Search</button>
             </form>
             <p className={classes.sublink}>{`http://${subdomain}.myty.in`}</p>

             <p className={classes.condition} style={{marginTop: "1rem"}}>
             Link will get approved, subjected to KYC verification
             </p>

             <p className={classes.error} style={{color: errorColor}}>{error}</p>

             {/* <button style={{display: bookLinkDisplay}} className={classes.booklink} onClick={onclickHandler}>Apply Now</button> */}
               <PaymentButton label={"Book Now"} callback={paymentSucessHandler} plan="rs-1-plan" display={bookLinkDisplay}  />
             </div>

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


             {/* popup */}

             <div className={classes.popup} style={{display: popupDisplay}}>

                <div className={classes.pop}>
                    <p>Make sure the link you are searching should have KYC.</p>
                    <p>Only KYC approved links are available</p>

                    <img className={classes.xicon} alt="close" src={xicon} onClick={()=> setPopupDisplay("none")} />
                </div>
             </div>

             {/* Completepopup */}

             <div className={classes.popup} style={{display: cpopupDisplay}} >

                <div className={classes.pop}>
                    <p>Payment Sucessfull</p>
                    <p>Link booked sucessfully</p>
                    <p>Click the button Below to edit your design</p>
                    
                    <div className={classes.booklink}>
                      <Link to="/preview">Edit your design</Link>
                    </div>
                    
                </div>
             </div>

             {/* <div className={classes.footer}><Footer /></div> */}

           </div>
}