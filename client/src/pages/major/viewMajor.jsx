import ViewMajorComponent from "./viewMajorComp.jsx";
import Navbar  from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";


export default function ViewMajor() {
   
    const id = window.location.pathname.split('/')[2];





   

    return (
        <div className="bg-gray-700">
            <Navbar/>
            <ViewMajorComponent MajId={id}/>
            <Footer/>
        </div>
    )



}