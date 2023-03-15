import classes from "./LinkType.module.css"

import business from "../../assets/bussiness.svg";
import personal from "../../assets/personal.svg";

export default function LinkType(){

    return <div className={classes.container}>

        <h1 className={classes.heading}>PERSONAL LINK</h1>
        <p  className={classes.content}>Lorem ipsum dolor sit amet consectetur. Augue at feugiat ac nullam. Faucibus vestibulum tortor in gravida at aenean urna aliquam.</p>
        <h1 className={classes.heading}>BUSINESS LINK</h1>
        <p className={classes.content}>Lorem ipsum dolor sit amet consectetur. Augue at feugiat ac nullam. Faucibus vestibulum tortor in gravida at aenean urna aliquam.</p>
        
    </div>
}