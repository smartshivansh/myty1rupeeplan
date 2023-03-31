import classes from "./SendBubble.module.css"
import {  useEffect, useRef } from "react";

export default function SendBubble(props){
    const bubble = useRef(0);

    useEffect(() => {
        bubble.current?.scrollIntoView({behaviour:"smooth"})
      },[]);
    return <div ref={bubble} className={classes.container}>
        {props.children}
    </div>
}