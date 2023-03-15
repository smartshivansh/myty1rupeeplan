import React from "react";
import { useNavigate} from "react-router";
import { useSelector } from "react-redux";


function Protected({ children }) {
    // console.log(chat)
    const chat = useSelector(s => s.user.chat);

    const navigate = useNavigate();
  
    if(chat == []){
        return <div>Loading...</div>
    }
    else{
        return children;
    }
  

}
export default Protected;