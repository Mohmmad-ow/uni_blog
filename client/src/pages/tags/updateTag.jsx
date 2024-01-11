import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import UpdateTagComponent from "./updateTagComp";

export default function UpdateTag() {

    const id = window.location.pathname.split("/")[2];
    
    


    return (
        <div>
        <Navbar />
        <UpdateTagComponent tagId={id} />
        <Footer />
        </div>
    )


}