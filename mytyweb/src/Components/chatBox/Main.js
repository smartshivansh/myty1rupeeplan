
import Header from "./Header";
import classes from "./Main.module.css"
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { userUpdate } from "../../store/UserSlice";


import {setNotificationVisited} from "../../store/NotificationSlice"

import sendBtn from "../../assets/sendBtn.svg"
import backBtn from "../../assets/backbtn.svg"
import mytyIcon from "../../assets/mytyIcon.svg"

import SendBubble from "../msgBubbles/SendBubble";
import ReplyBubble from "../msgBubbles/ReplyBubble";
import NotificationBubble from "../msgBubbles/NotificationBubble";
import Loader from "../loader/Loader";
import MeanuBar from "../menuBar/MenuBar";

import { chatUpdate } from "../../store/UserSlice";

import { socket } from "../Socket/Socket";


export default function Main(){

    const navigate = useNavigate();

    const pro = useSelector(s => s.user.prompt);
    const chats = useSelector(s => s.user.chat);

    const user = {
        prompt: "",
        data: ""
    }
    const dispatch = useDispatch()
    
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState(chats);
    const [prompt, setPrompt] = useState(pro);

    const [notfDisplay, setNotfDisplay] = useState("none");
    const [notfTransform, setNotfTransform] = useState("translateX(80%)")
    const [notfTransition, setNotfTransition] = useState("all 0.5s")
    const [notfOpacity, setNotfOpacity] = useState(0);

    const [menuDisplay, setMenuDisplay] = useState("none");
    const [menuTransform, setMenuTransform] = useState("translateX(80%)")
    const [menuTransition, setMenuTransition] = useState("all 0.5s")
    const [menuOpacity, setMenuOpacity] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const notifications = useSelector(s => s.notification.Notifications)

    const end = useRef();

    const name = useSelector(s => s.user.name);
    const isLogedIn  = useSelector(s => s.user.isLogedIn);

    useEffect(()=>{
        setMessages(p => chats);
        setPrompt(p => pro)
        
    },[])
   

    const fromSubmitHandler = async (e) =>{

        e.preventDefault();

        setPrompt(p => p+"Human:" + value + " " + "AI:")

        // user.prompt = user.prompt + "Human:" + value + " " + "AI:"
        socket.emit("msgTextReq", {text: "Human:" + value + " " + "AI:", value});
        setMessages(p => [...p, {type: "text", content: value}])
        dispatch(chatUpdate({chat: {type: "text", content: value}, prompt}))
        setValue("");
        console.log(prompt)

        // fetch("http://localhost:8080/api/chatupdate",{
        //     method: "POST",
        //     body: JSON.stringify({email, chatvalue:{type: "text", content: value}, prompt: prompt+"Human:" + value + " " + "AI:"}),
        //     headers:{
        //         "content-type": "application/json"
        //     }
        // }).then(res => res.json())
        // .then(res => JSON.parse(res))
        // .then(res => {
        //     console.log(res)
        // })
        

        socket.on('msgTextRes', function(data) {
            // user.prompt += user.prompt + data.response;
            setPrompt(p => p+ data.response)
            setMessages(p => [...p, {type: "reply", content: data.response}])
            // dispatch(chatUpdate({chat: {type: "reply", content: data.response}, prompt}))
            user.data = data.response
            socket.off()

            // fetch("http://localhost:8080/api/chatupdate",{
            // method: "POST",
            // body: JSON.stringify({email, chatvalue: {type: "reply", content: data.response}, prompt: prompt+ data.response}),
            // headers:{
            //     "content-type": "application/json"
            // }
            // }).then(res => res.json())
            // .then(res => JSON.parse(res))
            // .then(res => {
            //     console.log(res)
            // })
        }); 

        
        

        setInterval(()=>{
            socket.on();
        },1000)
    }

    const openNotification = () => {   
        setNotfDisplay(p => "block");
        setTimeout(()=>{
            setNotfTransform(p => "translateX(0%)")
            setNotfTransition(p => p)
            setNotfOpacity(p => 1)
        }, 100)
    }

    const closeNotification = () => {
        setNotfTransform(p => "translateX(80%)")
        setNotfTransition(p => p)
        setNotfOpacity(p => 0)
        dispatch(setNotificationVisited())
        setTimeout(()=>{
            setNotfDisplay(p => "none");
        }, 1000)
    }

    const openMenuBar = () => {     
        setIsOpen(p => true)
    }

    const closeMenuBar = () => {
        setIsOpen(p => false)
    }


    const inputChangeHandler = (e) => {
        setValue(p => e.target.value)
    }

    const logoutHandler = () => {
        localStorage.clear();
        dispatch(userUpdate({name: "", email: "", isLogedIn: false}))
        localStorage.setItem("isLogedIn", false)
        setTimeout(()=>{
            window.location.reload()
        },100)
    }

    return <div className={classes.body}>
    
    <div className={classes.container}>
        {/* <Loader /> */}
        <Header onBellClick={openNotification} onMenuClick={openMenuBar} />
        <div className={classes.main}>
            <div id="submain" ref={end} className={classes.subMain}>
            {messages.map(ele => {
                if(ele.type === "text"){
                    return <SendBubble>{ele.content}</SendBubble>
                }
                else if(ele.type === "reply"){
                    return <ReplyBubble>{ele.content}</ReplyBubble>
                }
            })}
            <div ref={end}></div>
            </div>
            
        </div>
        <form className={classes.form} onSubmit={fromSubmitHandler}>
           <input type='text' autoFocus className={classes.input} value={value} placeholder="Type text here" onChange={inputChangeHandler} />
           <button className={classes.sendBtn}><img src={sendBtn} alt="send" /></button>
        </form>

         {/* notification bar */}

         {/* //style={{opacity: notfOpacity ,transform: notfTransform, display: notfDisplay, transition: notfTransition}} */}

         <div className={classes.notification} style={{opacity: notfOpacity ,transform: notfTransform, display: notfDisplay, transition: notfTransition}} >

            <header className={classes.notificationHeader} >
                <img src={backBtn} className={classes.img} alt="back" onClick={closeMenuBar} style={{transform: "rotate(180deg"}} />
                <img src={mytyIcon} className={classes.img} alt="myty" />
            </header>

            <main className={classes.notificationMain}>
                {notifications.map(ele => {
                    return <NotificationBubble visited={ele.visited} title={ele.title} date={ele.date} content={ele.content} />
                })}
            </main>
            
         </div>

         {/* menu bar */}

         <MeanuBar isOpen={isOpen} closeMenuBar={closeMenuBar} />

         {/* <div className={classes.notification} style={{opacity: menuOpacity ,transform: menuTransform, display: menuDisplay, transition: menuTransition}} >

            <header className={classes.notificationHeader} >
                <img src={backBtn} className={classes.img} alt="back" onClick={closeMenuBar} style={{transform: "rotate(180deg"}} />
                <img src={mytyIcon} className={classes.img} alt="myty" />
            </header>

            <main className={classes.menuMain}>
                
                <p className={classes.name}>{name}</p>

                <div style={{display: isLogedIn ? "none" : "flex"}} className={classes.sign}>
                   <a className={classes.menuBtn} href="/signup">Signup</a>
                   <a className={classes.menuBtn} href="/login">login</a>
                </div>
                  <a className={classes.menuBtn} href="/">Home</a>
                  <a className={classes.menuBtn} href="https://app.myty.in/privacy-policy" target="_blank">Privacy Policy</a>
                  <a className={classes.menuBtn} href="https://app.myty.in/terms-conditions" target="_blank">Terms and Condition</a>
                <div style={{display: isLogedIn ? "block" : "none"}}>
                    <p className={classes.menuBtn} onClick={logoutHandler}>logout</p>
                </div>
            </main>
            
         </div> */}
    </div>
    </div>
}