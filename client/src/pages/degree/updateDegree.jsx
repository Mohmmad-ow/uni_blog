import UpdateDegreeComponent from "./updateDegreeComp"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function UpdateDegree() {
    const id = window.location.pathname.split("/")[2];
    
    return (
        <div>
        <Navbar />
           <UpdateDegreeComponent DegId={id} />
        <Footer />
        </div>
    )


}