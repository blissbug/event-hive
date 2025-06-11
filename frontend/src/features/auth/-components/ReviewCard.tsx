function ReviewCard(){
    return(
        <div className="bg-primary-900 rounded-lg p-4 ">
            <div className="text-[12px] mb-5 mt-1">
                Lorem ipsum dolor sit amet consetur adiping elit. Autem at velit nihil cum facere, quidem dolorum. Rem dis sed volupte?
            </div>
            <div className="flex items-center my-1">
                <img 
                className="size-10 mr-3 rounded-lg"
                src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <div>
                    <p className="text-sm">Timson K</p>
                    <p className="text-[9px]">freelancer</p>                    
                </div>
            </div>
        </div>
    )
}

export default ReviewCard;