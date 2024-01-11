import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

export default function CreateTagsComponent() {

    
    
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
        <div className="py-8 px-6 flex items-center justify-center flex-col gap-12">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="tag">Tag</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="tag" onChange={(e) => setTag(e.target.value)} />
                </div>
                <button className="btn w-[25%] btn-accent" onClick={handleAddTag} type="submit">Add</button>
            </div>
    )



}