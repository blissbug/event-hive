interface InputProps{
    placeholder:string,
}
function InputElement({placeholder}:InputProps){
    return(
        <input type="text" 
        className="w-full p-2 border-gray-200 border-2 rounded-lg my-3"
        placeholder={placeholder}
        />
    )
}

export default InputElement;