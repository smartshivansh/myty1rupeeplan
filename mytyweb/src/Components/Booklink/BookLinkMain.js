import { useNavigate } from "react-router"

import classes from "./BookLinkMain.module.css"

import mytyfeed from "../../assets/mytyfeed.svg"

export default function BookLinkMain(){

    const navigate = useNavigate();

    function onclickHandler(){
        navigate("/booklinkform")
    }

    return <div className={classes.container}>

        <h1 className={classes.heading}>Book your myty link <br/> Before someone else</h1>
        <p className={classes.content}>Lorem ipsum dolor sit amet consectetur. Augue at feugiat ac nullam. Faucibus vestibulum tortor in gravida at aenean urna aliquam</p>

        <button className={classes.button} onClick={onclickHandler}>Book link</button>
    </div>
}