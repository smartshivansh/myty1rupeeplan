import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate} from "react-router-dom"

import Loader from "../loader/Loader";

import backBtn from "../../assets/backbtn.svg"

import { selectUser } from "../../store/authSlice";

import classes from "./Form100Words.module.css";

// import backBtn from "../assets/arrowleft.svg"
import apis from "../../constants/apis";

const Form100Words = () => {

    const navigate = useNavigate();

    const [popupDisplay, setPopupDisplay] = useState("none");
    
    const [loading, setLoading] = useState(false)

    const userID = localStorage.getItem("userId")
    const subdomain = localStorage.getItem("subdomain")

    // useEffect(()=>{
    //     if(!userID || !subdomain){
    //         navigate("/signup")
    //         setTimeout(()=>{
    //             window.location.reload()
    //         },100)
    //     }
    // }, []) 

    const user = useSelector(selectUser);
 
    // const history = useHistory();

    const [descryption, setDescryption] = useState("");
    const [textError, setTextError] = useState("");

    const [preview, setPreview] = useState(false);

    const [previewDisplay, setPreviewDisplay] = useState("none")

    function formSubmitHandler(e){
        e.preventDefault();
        setLoading(true)

        fetch(`${apis.setupOneRupeePlan}`, {
            method: "POST",
            body: JSON.stringify({userID: user, coverText: descryption, subdomain: subdomain}),
            headers:{
                "content-type": "application/json"
            }
        }).then(res => res.json())
        .then(res => JSON.parse(res))
        .then(res => {
            if(res.sucess){
                console.log(res)
                setLoading(false);
                setPopupDisplay("flex")
                // navigate("/")
                // history.push("/onerupeeplan/finish");
                // setTimeout(()=>{
                //   window.location.reload()
                // },100)
            }else{
                alert("Some Error occured please try again")
                setLoading(false);
            }
        })

        setPreviewDisplay(p => "block")
        
    }

    function previewOCHandler(e){
        if(descryption.length == 0){
            setTextError(p =>`This Field can't be empty`);
            return;
        }

        if(descryption.length > 150){
            setTextError(p =>`The maximum limit of accepted character is 150, and you have write ${descryption.length} characters`);
            return;
        }
        setPreview(p => !p);
    }

    return <div className={classes.container}>
        {loading && <Loader />}
        {!preview && <div>
               <h1 className={classes.heading}>Edit your design</h1>

               <form className={classes.form} onSubmit={formSubmitHandler}>
                    <h1  className={classes.formHeading}>Write a 100 characters of content about you or your  business</h1>
                    <textarea value={descryption} autoFocus className={classes.textarea} onChange={(e)=>{setDescryption(e.target.value)}} onFocus={()=> {
                        setTextError("");
                        setPreviewDisplay(p => "none")
                        }} />
                    <p className={classes.error}>{textError}</p>
                    <div className={classes.buttonCont}>
                      <button onClick={previewOCHandler} className={classes.submit}>See Preview</button>
                    </div>
                   
                   {/* <p style={{display: previewDisplay}} className={classes.preview} onClick={previewOCHandler} >See The Preview</p> */}
               </form>
               
            </div>}

        {preview && <div className={classes.previewcont}>

               <div className={classes.back} onClick={previewOCHandler}> <span><img src={backBtn} className={classes.img} /></span>Back</div>

               <h1 style={{marginTop: "1rem"}}>Preview</h1>

               <div className={classes.link}>{`https://www.${subdomain}.myty.in`}</div>

               <p className={classes.previewdesp}>
                {descryption}
               </p>

               <button className={classes.submit} onClick={formSubmitHandler}>Publish Your Link</button>

            </div>}

             {/* popup */}

             <div className={classes.popup} style={{display: popupDisplay}}>

                <div className={classes.pop}>

                    <p>Your Link is Published sucessfully</p>
                    
                    <button className={classes.finish} onClick={()=>{navigate("/")}}>Finish</button>

                </div>
             </div>
    </div>
}

export default Form100Words;