import {useState, useEffect} from "react";
import { useSelector } from "react-redux";

import backBtn from "../../assets/backbtn.svg"
import mytyIcon from "../../assets/mytyIcon.svg"

import classes from "./MenuBar.module.css"


const MeanuBar = (props) => {


    useEffect(()=>{
        if(props.isOpen){
            setMenuDisplay(p => "block");
            setTimeout(()=>{
                setMenuTransform(p => "translateX(0%)")
                setMenuTransition(p => p)
                setMenuOpacity(p => 1)
            }, 100)
        }
        else{
            closeMenuBar();
        }
    },[props.isOpen])

    const [menuDisplay, setMenuDisplay] = useState("none");
    const [menuTransform, setMenuTransform] = useState("translateX(80%)")
    const [menuTransition, setMenuTransition] = useState("all 0.5s")
    const [menuOpacity, setMenuOpacity] = useState(0);

    
    const name = useSelector(s => s.user.name);
    const isLogedIn  = useSelector(s => s.user.isLogedIn);

    const logoutHandler = () => {
        localStorage.clear();
        dispatch(userUpdate({name: "", email: "", isLogedIn: false}))
        localStorage.setItem("isLogedIn", false)
        setTimeout(()=>{
            window.location.reload()
        },100)
    }

    const closeMenuBar = () => {
        setMenuTransform(p => "translateX(80%)")
        setMenuTransition(p => p)
        setMenuOpacity(p => 0)
        // setIsOpen(p => false)
        props.closeMenuBar()
        setTimeout(()=>{
            setMenuDisplay(p => "none");
        }, 1000)
    }

    return <div className={classes.notification} style={{opacity: menuOpacity ,transform: menuTransform, display: menuDisplay, transition: menuTransition}} >

    <header className={classes.notificationHeader} >
        <img src={backBtn} className={classes.img} alt="back" onClick={closeMenuBar} style={{transform: "rotate(180deg"}} />
        <img src={mytyIcon} className={classes.img} alt="myty" />
    </header>

    <main className={classes.menuMain}>
        
        <p className={classes.name}>{name}</p>

        <a className={classes.menuBtn} href="/">Home</a>

        <div style={{display: isLogedIn ? "none" : "flex"}} className={classes.sign}>
           <a className={classes.menuBtn} href="/signup">Signup</a>
           <a className={classes.menuBtn} href="/login">Login</a>
        </div>
          
          <a className={classes.menuBtn} href="https://app.myty.in/privacy-policy" target="_blank">Privacy Policy</a>
          <a className={classes.menuBtn} href="https://app.myty.in/terms-conditions" target="_blank">Terms and Condition</a>
        <div style={{display: isLogedIn ? "block" : "none"}}>
            <p className={classes.menuBtn} onClick={logoutHandler}>logout</p>
        </div>
    </main>
    
 </div>
}

export default MeanuBar