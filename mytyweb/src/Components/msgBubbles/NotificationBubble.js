import React, {useState, useEffect} from "react"

import classes from "./NotificationBubble.module.css"

export default function NotificationBubble(props){

    // useEffect(()=>{
    //     if(props.visited){   
    //         setDetailOpacity(p => 0.5)
    //     }
    // }, [props.visited ])

    const [contentDisplay, setContentDisplay] = useState("none");
    const [dotDisplay, setDotDisplay] = useState("block");
    const [detailOpacity, setDetailOpacity] = useState(1)

    const contentDisplayHandler = () => {

        if(contentDisplay === "none"){
            setContentDisplay("block")
            
            // setTimeout(()=>{
            //     setContentTransform("scaleY(100%)")
            // },100)
        }
        else{
            // setContentTransform("scaleY(0%)")
            setTimeout(()=>{
                setContentDisplay("none")
                setDetailOpacity(p => 0.5)
            },0)
        }
    }

    return <div className={classes.container} onClick={contentDisplayHandler}>
        <div className={classes.visited} style={{display: dotDisplay}}></div>
        <div className={classes.detail} style={{opacity: detailOpacity}}>
           <p className={classes.title}><strong>{props.title}</strong></p>
           <p className={classes.date}>{props.date}</p>
           <p className={classes.content} style={{display:contentDisplay}}>
            {props.content}
           </p>
        </div>
        
    </div>
}