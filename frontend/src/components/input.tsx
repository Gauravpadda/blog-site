import { ChangeEvent } from "react"

interface inputProps{
    title:string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void,
    type:string
}

export const Inputbox=({title,onChange,type}:inputProps)=>{
    return <div className="w-full ">
       
        <label className="block mb-2 text-normal font-medium text-black">{title}</label>
        <input type={type} className="bg-gray-50 border border-gray-300
        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full" 
        placeholder={`Enter Your ${title}`}
        onChange={onChange} required />
       
        
    </div> 
}