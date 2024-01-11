import ViewTagComponent from "./viewTagComp.jsx";
import Navbar  from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";


export default function ViewTag() {
    const id = window.location.pathname.split('/')[2];
    
    return (
        <div className="bg-gray-700">
            <Navbar/>
            <ViewTagComponent tagId={id} />
            <Footer/>
        </div>
    )



}