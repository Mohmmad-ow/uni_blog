import ViewDegreeComponent from "./viewDegreeComp.jsx";
import Navbar  from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";


export default function ViewDegree() {
   
    const id = window.location.pathname.split('/')[2];




    return (
        <div className="bg-gray-700">
            <Navbar/>
            <ViewDegreeComponent DegId={id} />
            <Footer/>
        </div>
    )



}