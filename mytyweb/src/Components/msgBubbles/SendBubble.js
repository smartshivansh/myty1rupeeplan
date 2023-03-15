import classes from "./SendBubble.module.css"

export default function SendBubble(props){

    return <div className={classes.container}>
        {props.children}
    </div>
}