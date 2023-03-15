import classes from "./Header.module.css"

import bellIcon from "../../assets/bellicon.svg"
import mytyLogo from "../../assets/mytyIcon.svg"
import menuBtn from "../../assets/menu.svg"

import { useNavigate } from "react-router"

export default function Header(props){

    const navigate = useNavigate();
    const isLogedin = localStorage.getItem("isLogedIn")

    return <div className={classes.header}>
        <img src={mytyLogo} className={classes.img} alt="myty logo" />

        <div style={{height: "100%", display:"flex", alignItems:"center "}}>
           <button className={classes.book} onClick={()=>{navigate(`${isLogedin == "true" ? "/available" : "/signup"}`)}} >BookLink</button>
           <img src={menuBtn} className={classes.img} alt="menu" onClick={props.onMenuClick} />
        </div>
        
    </div>
}