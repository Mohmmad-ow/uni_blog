import ViewYearComponent from "./viewYearComp.jsx";
import Navbar  from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";


export default function ViewYear() {
   
    const id = window.location.pathname.split('/')[2];




    
    return (
        <div className="bg-gray-700">
            <Navbar/>
            <ViewYearComponent id={id}/>
            <Footer/>
        </div>
    )



}