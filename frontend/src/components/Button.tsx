
let buttonKinds = {
    "primary":"bg-primary-800  text-white",
    "secondary":"bg-white text-primary-800 border-2 border-primary-800"
}

function Button({text,kind}:{text:string,kind:"primary" | "secondary"}){
    return(
        <button className={`py-3 px-7  rounded-lg font-medium cursor-pointer ${buttonKinds[kind]}`}>{text}</button>
    )
}

export default Button;