import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"


export default function CreateYearsComponent() {

    
    
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
            <div className="py-8 px-6 flex items-center flex-col gap-12">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="year">Year</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="year" onChange={(e) => setYear(e.target.value)} />
                </div>
                <button className="btn w-[25%] btn-accent" onClick={handleAddYear} type="submit">Add</button>
            </div>
    )



}