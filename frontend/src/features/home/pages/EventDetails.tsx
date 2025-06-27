import Banner from "../-components/Banner";
import Footer from "../-components/Footer";
import Navbar from "../-components/Navbar";
import Search from "../-components/Search";

export default function Events(){
    return(
        <>
        <Navbar/>
            <Banner/>
            <div className="bg-blue-500 my-2 h-16">
            </div>
            <Search/>
        <Footer/>
        </>
        
    )
}