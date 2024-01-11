import UpdateMajorComponent from "./updateMajorComp";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function UpdateMajor() {

    const id = window.location.pathname.split("/")[2];
    
   


    
    return (
        <div>
        <Navbar />
        <UpdateMajorComponent MajId={id} />
        <Footer />
        </div>
    )


}