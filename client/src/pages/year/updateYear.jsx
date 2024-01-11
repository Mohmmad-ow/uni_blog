import UpdateYearComponent from "./updateYearComp";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function UpdateYear() {

    const id = window.location.pathname.split("/")[2];
    


    

    return (
        <div>
        <Navbar />
        <UpdateYearComponent id={id} />
        <Footer />
        </div>
    )


}