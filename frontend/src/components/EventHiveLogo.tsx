import { SiHoneygain } from "react-icons/si";
export default function EventHiveLogo({type}:{
    type:"blue" | "white"
}){
    return(
        <>
                <SiHoneygain className={`size-8  ${type=="blue"? "text-blue-500":"text-white"}`}/>
        </>
    )
}