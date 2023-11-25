import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function CreateTags() {

    
    
    const [tag, setTag] = useState("");
    const accessToken = Cookies.get("access_token");

    const handleAddTag = () => {
        axios.post("/tags/create", {
            tag: tag
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
                    <label htmlFor="tag">Tag</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="tag" onChange={(e) => setTag(e.target.value)} />
                </div>
                <button className="btn btn-accent" onClick={handleAddTag} type="submit">Add</button>
            </div>
        <Footer />
        </div>
    )



}