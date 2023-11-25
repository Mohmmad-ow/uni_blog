import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function CreateYears() {

    
    
    const [year, setYear] = useState("");
    const accessToken = Cookies.get("access_token");

    const handleAddYear = () => {
        axios.post("/years/create", {
            year: year
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
                    <label htmlFor="year">Year</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="year" onChange={(e) => setYear(e.target.value)} />
                </div>
                <button className="btn btn-accent" onClick={handleAddYear} type="submit">Add</button>
            </div>
        <Footer />
        </div>
    )



}