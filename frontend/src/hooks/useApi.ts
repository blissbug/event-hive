import { useEffect, useState } from "react";
import axios from "axios";

function useApi({url}:{
    url:string
}){
    const [result,setResult] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        setError(null);
        try{
            async function getData(){
                let resp = await axios.get(url);
                let data = resp.data.data;
                setResult(data);
            }
            getData();
        }
        catch(err:any){
            setError(err.message);
            setResult(null);
        }
        finally{
            setLoading(false);
        }
    },[url])

    return {result,loading,error};
}

export default useApi;