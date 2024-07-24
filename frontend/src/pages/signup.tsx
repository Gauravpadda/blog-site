import { FormComponenet } from "../components/form"
import { Quote } from "../components/Quote"

export const Signup=()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2 h-dvh">
        <div className="items-center flex justify-center"><FormComponenet type="signup" /></div>
        <div className="items-center flex justify-center invisible lg:visible"><Quote/></div>
    </div>
}