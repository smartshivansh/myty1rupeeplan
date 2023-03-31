import classes from "./ReplyBubble.module.css"
import {  useEffect, useRef } from "react";
export default function ReplyBubble(props){
    const bubble = useRef(0);

    useEffect(() => {
        bubble.current?.scrollIntoView({behaviour:"smooth"})
      },[]);
    return <div ref={bubble} className={classes.container}>
        {props.children}
    </div>
}