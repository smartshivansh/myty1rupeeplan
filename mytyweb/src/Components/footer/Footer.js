

import classes from "./Footer.module.css"

import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import globe from "../../assets/globe.svg"

const Footer = () => {

    return <div className={classes.footer}>
        <div className={classes.contact}>
            <div className={classes.col}>
                <h1 className={classes.heading}>Company</h1>
                <a className={classes.link}>About US</a>
            </div>
            <div className={classes.col}>
                <h1 className={classes.heading}>Contact Us</h1>
                <a className={classes.link} href="tel:9329722268">9329722268</a>
                <a className={classes.link} href="mailto:care@myty.in">care@myty.in</a>
            </div>
        </div>

        <div className={classes.socialLinks}>

            <a className={classes.link}><img src={globe} alt="website" className={classes.img} /></a>
            <a className={classes.link}><img src={instagram} alt="instagram" className={classes.img} /></a>
            <a className={classes.link}><img src={facebook} alt="facebook" className={classes.img} /></a>
            
        </div>
    </div>
} 

export default Footer;