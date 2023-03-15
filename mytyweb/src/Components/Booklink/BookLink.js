import { useState } from "react"

import BookLinkMain from "./BookLinkMain"
import LinkType from "./LinkType"

import menu from "../../assets/menu.svg"
import backbtn from "../../assets/backbtn.svg"

import classes from "./BookLink.module.css"
import Footer from "../footer/Footer"


export default function(){

    const [slideDisplay, setSlideDisplay] = useState("none");
    const [slideTransform, setSlideTransform] = useState("translateX(80%)")
    const [slideTransition, setSlideTransition] = useState("all 0.5s")
    const [slideOpacity, setSlideOpacity] = useState(0);

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

    return <div className={classes.container}>

        <header className={classes.header}>
            <img src={menu} alt="menu" className={classes.img} onClick={openNotification} />
        </header>

        <BookLinkMain />
        <LinkType />

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

        <Footer />
    </div>
}