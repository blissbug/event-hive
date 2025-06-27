export default function Banner(){
    return(
        <div className="w-full relative h-[91vh] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1710951403189-4ddcabb7df65?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
            className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute m-18 ">
                <h1 className="text-white text-7xl font-normal text-wrap m-2">Get The Tickets <br />Now Or Never</h1>
            </div>
            
        </div>
    )
}