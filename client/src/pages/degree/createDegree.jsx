import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function CreateDegree() {

    
    
    const [degree, setDegree] = useState("");
    const accessToken = Cookies.get("access_token");

    const handleAddDegree = () => {
        axios.post("/degrees/create", {
            degree: degree
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }


    return (
        <div>
        <Navbar />
            <div>
                <div>
                    <label htmlFor="degree">Degree</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="degree" onChange={(e) => setDegree(e.target.value)} />
                </div>
                <button className="btn btn-accent" onClick={handleAddDegree} type="submit">Add</button>
            </div>
        <Footer />
        </div>
    )



}