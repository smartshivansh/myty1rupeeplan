import classes from "./ReplyBubble.module.css"

export default function ReplyBubble(props){

    return <div className={classes.container}>
        {props.children}
    </div>
}