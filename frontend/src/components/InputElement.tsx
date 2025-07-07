interface InputProps{
    placeholder:string,
    gotRef:React.Ref<HTMLInputElement> | undefined
}
function InputElement({placeholder,gotRef}:InputProps){
    return(
        <input type="text" 
        className="w-full p-2 border-gray-200 border-2 rounded-lg my-3"
        placeholder={placeholder}
        ref={gotRef}
        />
    )
}

export default InputElement;