import { Link, useNavigate } from "react-router-dom"
import { Inputbox } from "./input"
import { useState } from "react"
import { SignupSchema} from "@gauravpadda/common"
import axios from "axios"
import { DatabaseUrl } from "../assets/config"

export const FormComponenet=({type}:{type:"signin" | "signup"})=>{
    const [credentials,setcredentials]=useState<SignupSchema>({
        email:"",
        name:"",
        password:""
    })
    const navigate=useNavigate();
    async function sendReq() {
        try{
            const req=await axios.post(`${DatabaseUrl}/api/v1/user/${type==="signup" ? "signup" :"signin"}`,credentials)
            const token:string=req.data.token;
            localStorage.setItem("token" , token);
            console.log(req);
            navigate("/blogs")

        }catch{}
        
        
    }
    
    return <div className="bg-white h-screen flex flex-col items-center justify-center max-w-lg "> 
    <div className="text-left text-3xl font-bold">{type==="signup" ?"Create an account to sign in" : "log in into your account"} </div>
    <div className="text-left text-md">
        {type==="signup" ? "Already have account?" : "Don't have account? "}
        <Link to={type=="signin"?"/signup":"/signin "} className="pl-2 underline">{type==="signup" ? "login":"Signup"}</Link>
    </div>
    {type==="signup"?<Inputbox title="Username" onChange={(e)=>{setcredentials({
        ...credentials,
        name:e.target.value
    })}} type="text"/> : null}
    <Inputbox title="Email"onChange={(e)=>{setcredentials({
        ...credentials,
        email:e.target.value
    })}} type="email"/>

    <Inputbox title="Password" onChange={(e)=>{setcredentials({
        ...credentials,
        password:e.target.value
    })}} type="password" />
    <div className="w-full mt-2">
        <button onClick={sendReq} type="button" className="text-white bg-black hover:bg-slate-700 focus:ring-4 
        focus:ring-gray-400 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 text-sm w-full">{type==="signup"? "Signup":"Signin"}</button>
    </div>
    
    </div>
}